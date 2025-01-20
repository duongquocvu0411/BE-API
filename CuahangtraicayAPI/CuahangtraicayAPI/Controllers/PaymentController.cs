using Microsoft.AspNetCore.Mvc;

using CuahangtraicayAPI.Services;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using System.Globalization;
using Azure;
using CuahangtraicayAPI.Model.DB;


namespace CuahangtraicayAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly AppDbContext _context;
        private readonly EmailHelper _emailHelper;
        private readonly MoMoPaymentService _momoService;


        public PaymentController(IVnPayService vnPayService, AppDbContext appDbContext, MoMoPaymentService momoService, EmailHelper emailHelper)
        {
            _vnPayService = vnPayService;
            _context = appDbContext;
            _momoService = momoService;
            _emailHelper = emailHelper;
        }
        /// <summary>
        /// Api trả về kết quả thanh toán từ Momo
        /// </summary>
        /// <returns>Api trả về kết quả thanh toán từ Momo</returns>
        [HttpGet("Paymomo")]
        public async Task<IActionResult> Paymomo()
        {
            try
            {
                // Resquest.Query chứa tất cả thâm số từ query string trong url momo trả về khi thanh toán 
                var queryParams = Request.Query;

                var orderId = queryParams["orderId"].ToString();
                var errorCode = queryParams["resultCode"].ToString();
                var message = queryParams["message"].ToString();
                var amount = queryParams["amount"].ToString();
                var transactionId = queryParams["transId"].ToString();

                if (string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(errorCode))
                {
                    return BadRequest(new { success = false, message = "Thiếu thông tin cần thiết từ MoMo callback." });
                }

                var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == orderId);
                if (hoaDon == null)
                {
                    return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {orderId}." });
                }

                // Kiểm tra xem giao dịch đã được xử lý hay chưa
                var existingTransaction = await _context.PaymentTransactions
                    .FirstOrDefaultAsync(pt => pt.TransactionId == transactionId && pt.Status == "Success");

                if (existingTransaction != null)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Giao dịch này đã được xử lý thành công trước đó.",
                        data = new
                        {
                            orderId = orderId,
                            transactionId = transactionId,
                            amount = decimal.Parse(amount).ToString("N0", new CultureInfo("vi-VN")),
                            status = hoaDon.status,
                            orderInfo = hoaDon.order_code
                        }
                    });
                }

               
                    var newTransaction = new PaymentTransaction
                    {
                        OrderId = orderId,
                        TransactionId = transactionId,
                        Amount = decimal.TryParse(amount, out var parsedAmount) ? parsedAmount : 0,
                        PaymentMethod = "Momo",
                        Status = errorCode == "0" ? "Success" : "Failed",
                        ResponseMessage = errorCode == "0" ? "Thanh toán thành công" : "Thanh toán thất bại",
                        Created_at = DateTime.Now,
                       CreatedBy = "Khách hàng",
                       UpdatedBy = "chưa có tác động"
                    };
                    _context.PaymentTransactions.Add(newTransaction);
                //}

                if (errorCode == "0")
                {
                    if (hoaDon.status == "Đã Thanh toán")
                    {
                        return Ok(new
                        {
                            success = true,
                            message = "Hóa đơn đã được thanh toán",
                            data = new
                            {
                                orderId = orderId,
                                transactionId = transactionId,
                                amount = decimal.Parse(amount).ToString("N0", new CultureInfo("vi-VN")),
                                status = hoaDon.status,
                                orderInfo = hoaDon.order_code
                            }
                        });
                    }

                    hoaDon.status = "Đã Thanh toán";
                    hoaDon.Updated_at = DateTime.Now;

                    var chiTietHoaDons = await _context.HoaDonChiTiets.Where(ct => ct.bill_id == hoaDon.Id).ToListAsync();

                    foreach (var chiTiet in chiTietHoaDons)
                    {
                        var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);

                        if (sanpham != null)
                        {
                            sanpham.Soluong -= chiTiet.quantity;

                            if (sanpham.Soluong <= 0)
                            {
                                sanpham.Soluong = 0; // Đảm bảo số lượng không bị âm
                                sanpham.Trangthai = "Hết hàng";
                            }

                            _context.Sanpham.Update(sanpham);
                        }
                    }

                    await Task.Run(() => GuiEmailHoaDon(hoaDon, hoaDon.total_price, hoaDon.order_code));
                }
                else
                {
                    hoaDon.status = "Thanh toán thất bại";
                    hoaDon.Updated_at = DateTime.Now;
                }

                await _context.SaveChangesAsync();

                return errorCode == "0"
                    ? Ok(new
                    {
                        success = true,
                        message = "Thanh toán thành công.",
                        data = new
                        {
                            orderId = orderId,
                            transactionId = transactionId,
                            amount = decimal.Parse(amount).ToString("N0", new CultureInfo("vi-VN")),
                            status = hoaDon.status,
                            orderInfo = hoaDon.order_code
                        }
                    })
                    : BadRequest(new
                    {
                        success = false,
                        message = "Thanh toán thất bại hoặc bị hủy.",
                        errorCode,
                        errorMessage = message,
                        transactionId = transactionId
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Đã xảy ra lỗi khi xử lý phản hồi thanh toán.",
                    error = ex.Message
                });
            }
        }


        /// <summary>
        /// Api trả về kết quả thanh toán từ VnPay
        /// </summary>
        /// <returns>Api trả về kết quả thanh toán từ VnPay</returns>

        [HttpGet("PaymentResponse")]
        public async Task<IActionResult> PaymentResponse()
        {
            try
            {
                var response = _vnPayService.PaymentExecute(Request.Query);

                if (response == null)
                {
                    return BadRequest(new { success = false, message = "Phản hồi từ VnPay không hợp lệ." });
                }

                // Tìm hóa đơn dựa trên OrderId
                var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == response.OrderId);

                if (hoaDon == null)
                {
                    return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {response.OrderId}." });
                }

                // Kiểm tra xem giao dịch đã được xử lý hay chưa
                var giaodichxuly = await _context.PaymentTransactions
                    .FirstOrDefaultAsync(pt => pt.TransactionId == response.TransactionId && pt.Status == "Success");

                if (giaodichxuly != null)
                {
                    // Nếu giao dịch đã thành công trước đó, trả về phản hồi
                    return Ok(new
                    {
                        success = true,
                        message = "Giao dịch này đã được xử lý thành công .",
                        data = new
                        {
                            orderId = response.OrderId,
                            amount = response.Amount.ToString("N0", new CultureInfo("vi-VN")),
                            status = hoaDon.status,
                            orderInfo = hoaDon.order_code
                        }
                    });
                }
         
                    // Tạo mới giao dịch
                    var newTransaction = new PaymentTransaction
                    {
                        OrderId = response.OrderId,
                        TransactionId = response.TransactionId ?? Guid.NewGuid().ToString(),
                        Amount = response.Amount,
                        PaymentMethod = "VnPay",
                        Status = response.Success ? "Success" : "Failed",
                        ResponseMessage = response.Success ? "Thanh toán thành công" : "Thanh toán thất bại",
                        Created_at = DateTime.Now,
                        CreatedBy ="Khách hàng",
                        UpdatedBy="Chưa có tác động"
                        
                    };
                    _context.PaymentTransactions.Add(newTransaction);
                //}

                // Cập nhật trạng thái hóa đơn
                if (response.Success)
                {
                    if (hoaDon.status == "Đã Thanh toán")
                    {
                        // Nếu hóa đơn đã thanh toán, trả về phản hồi
                        return Ok(new
                        {
                            success = true,
                            message = "Hóa đơn đã được thanh toán trước đó.",
                            data = new
                            {
                                orderId = response.OrderId,
                                amount = response.Amount.ToString("N0", new CultureInfo("vi-VN")),
                                status = hoaDon.status,
                                orderInfo = hoaDon.order_code
                            }
                        });
                    }

                    hoaDon.status = "Đã Thanh toán";
                    hoaDon.Updated_at = DateTime.Now;

                    // Giảm số lượng sản phẩm
                    var chiTietHoaDons = await _context.HoaDonChiTiets.Where(ct => ct.bill_id == hoaDon.Id).ToListAsync();
                    foreach (var chiTiet in chiTietHoaDons)
                    {
                        var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);
                        if (sanpham != null)
                        {
                            sanpham.Soluong -= chiTiet.quantity;
                            sanpham.Soluong = Math.Max(0, sanpham.Soluong);
                            if (sanpham.Soluong == 0) sanpham.Trangthai = "Hết hàng";

                            _context.Sanpham.Update(sanpham);
                        }
                    }

                    // Gửi email xác nhận hóa đơn
                    await Task.Run(() => GuiEmailHoaDon(hoaDon, hoaDon.total_price, hoaDon.order_code));
                }
                else
                {
                    hoaDon.status = "Thanh toán thất bại";
                    hoaDon.Updated_at = DateTime.Now;
                }

                await _context.SaveChangesAsync();

                // Trả về phản hồi
                return response.Success
                    ? Ok(new
                    {
                        success = true,
                        message = "Thanh toán thành công.",
                        data = new
                        {
                            orderId = response.OrderId,
                            amount = response.Amount.ToString("N0", new CultureInfo("vi-VN")),
                            status = hoaDon.status,
                            orderInfo = hoaDon.order_code
                        }
                    })
                    : BadRequest(new
                    {
                        success = false,
                        message = "Thanh toán thất bại.",
                        errorCode = response.TransactionId,
                        errorMessage = response.ResponseMessage
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Đã xảy ra lỗi trong quá trình xử lý giao dịch.",
                    error = ex.Message
                });
            }
        }


        private async Task GuiEmailHoaDon(HoaDon bill, decimal totalPrice, string orderCode)
        {
            var Kh = await _context.KhachHangs.FirstOrDefaultAsync(kh => kh.Id == bill.khachhang_id);

            var ChudeEmail = "Xác nhận đơn hàng từ cửa hàng của chúng tôi";
            var NoidungEmail = $@"
    <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
        <div style='background-color: #4CAF50; padding: 20px; text-align: center; color: #fff;'>
            <h1 style='margin: 0;'>Cửa Hàng Online</h1>
            <p style='margin: 0; font-size: 16px;'>Cảm ơn bạn đã đặt hàng!</p>
        </div>
        <div style='padding: 20px;'>
            <h2 style='color: #4CAF50; border-bottom: 2px solid #f8f9fa; padding-bottom: 10px;'>Thông tin đơn hàng</h2>
            <p><strong>Khách hàng:</strong> {Kh?.Ho} {Kh?.Ten}</p>
            <p><strong>Email:</strong> {Kh?.EmailDiaChi}</p>
            <p><strong>Số điện thoại:</strong> {Kh?.Sdt}</p>
            <p><strong>Địa chỉ:</strong> {Kh?.DiaChiCuThe}, {Kh?.xaphuong}, {Kh?.tinhthanhquanhuyen}, {Kh?.ThanhPho}</p>
             <p><strong>Phương thức thanh toán</strong> {bill.Thanhtoan}</p>
            <p><strong>Mã đơn hàng:</strong> <span style='color: #FF5722;'>{orderCode}</span></p>
        </div>
        <div style='padding: 20px;'>
            <h3 style='color: #2196F3; border-bottom: 1px solid #ddd; padding-bottom: 10px;'>Chi tiết sản phẩm</h3>
            <table style='width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;'>
                <thead>
                    <tr style='background-color: #f8f9fa; text-align: left;'>
                        <th style='border: 1px solid #ddd; padding: 10px;'>#</th>
                        <th style='border: 1px solid #ddd; padding: 10px;'>Sản phẩm</th>
                        <th style='border: 1px solid #ddd; padding: 10px;'>Số lượng</th>
                        <th style='border: 1px solid #ddd; padding: 10px;'>Đơn giá</th>
                        <th style='border: 1px solid #ddd; padding: 10px;'>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>";

            int stt = 1;
            foreach (var chiTiet in _context.HoaDonChiTiets.Where(ct => ct.bill_id == bill.Id))
            {
                var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);

                NoidungEmail += $@"
                    <tr style='border-bottom: 1px solid #ddd;'>
                        <td style='padding: 10px; text-align: center;'>{stt++}</td>
                        <td style='padding: 10px;'>{sanpham?.Tieude ?? "Sản phẩm đã bị xóa"}</td>
                        <td style='padding: 10px; text-align: center;'>{chiTiet.quantity}</td>
                        <td style='padding: 10px; text-align: right;'>{(chiTiet.price / chiTiet.quantity).ToString("N0", new CultureInfo("vi-VN"))} VND</td>
                        <td style='padding: 10px; text-align: right;'>{chiTiet.price.ToString("N0", new CultureInfo("vi-VN"))} VND</td>
                    </tr>";
            }

            NoidungEmail += $@"
                    <tr style='background-color: #f8f9fa; font-weight: bold;'>
                        <td colspan='4' style='padding: 10px; text-align: right;'>Tổng cộng:</td>
                        <td style='padding: 10px; text-align: right;'>{totalPrice.ToString("N0", new CultureInfo("vi-VN"))} VND</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style='background-color: #f8f9fa; padding: 20px; text-align: center;'>
            <p style='margin: 0; font-size: 16px; font-weight: bold;'>Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi!</p>
            <p style='margin: 0; font-size: 14px;'>Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua <a href='mailto:quocvu0411@gmail.com' style='color: #2196F3;'>quocvu0411@gmail.com</a>.</p>
        </div>
    </div>";

            // Gửi email bất đồng bộ
#pragma warning disable CS4014
            Task.Run(async () =>
            {
                try
                {
                    await _emailHelper.GuiEmailAsync("quocvu0411@gmail.com", ChudeEmail, NoidungEmail); // gửi email chính
                    if (!string.IsNullOrEmpty(Kh?.EmailDiaChi))
                    {
                        await _emailHelper.GuiEmailAsync(Kh.EmailDiaChi, ChudeEmail, NoidungEmail); // gửi email cho người mua hàng
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                }
            });
        }


    }
}
    
