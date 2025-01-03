using Microsoft.AspNetCore.Mvc;

using CuahangtraicayAPI.Services;
using Microsoft.EntityFrameworkCore;


namespace CuahangtraicayAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly AppDbContext _context;
        private readonly MoMoPaymentService _momoService;

        public PaymentController(IVnPayService vnPayService, AppDbContext appDbContext, MoMoPaymentService momoService)
        {
            _vnPayService = vnPayService;
            _context = appDbContext;
            _momoService = momoService;
        }

        [HttpGet("Paymomo")]
        public async Task<IActionResult> Paymomo()
        {
            try
            {
                // Lấy thông tin từ query string
                var queryParams = Request.Query;

                // Lấy các tham số cần thiết từ query string
                var orderId = queryParams["orderId"].ToString(); // Chuyển đổi từ StringValues sang string
                var errorCode = queryParams["resultCode"].ToString();
                var message = queryParams["message"].ToString();
                var amount = queryParams["amount"].ToString();

                if (string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(errorCode))
                {
                    return BadRequest(new { success = false, message = "Thiếu thông tin cần thiết từ MoMo callback." });
                }

                // Xử lý thành công giao dịch
                if (errorCode == "0")
                {
                    // Chuẩn hóa OrderId để khớp với cột order_code trong cơ sở dữ liệu
                    var sanitizedOrderId = orderId;

                    // Tìm hóa đơn dựa trên order_code
                    var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == sanitizedOrderId);

                    if (hoaDon == null)
                    {
                        return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {sanitizedOrderId}." });
                    }

                    if (hoaDon.status != "Đã Thanh toán")
                    {
                        // Cập nhật trạng thái hóa đơn
                        hoaDon.status = "Đã Thanh toán";
                        hoaDon.Updated_at = DateTime.Now;

                        // Giảm số lượng sản phẩm trong kho
                        var chiTietHoaDons = await _context.HoaDonChiTiets.Where(ct => ct.bill_id == hoaDon.Id).ToListAsync();

                        foreach (var chiTiet in chiTietHoaDons)
                        {
                            var sanphamId = int.Parse(chiTiet.sanpham_ids);
                            var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == sanphamId);

                            if (sanpham != null)
                            {
                                sanpham.Soluong -= chiTiet.quantity;

                                if (sanpham.Soluong <= 0)
                                {
                                    sanpham.Soluong = 0; // Đảm bảo số lượng không bị âm
                                    sanpham.Trangthai = "Hết hàng"; // Cập nhật trạng thái thành "Hết hàng"
                                }

                                _context.Sanpham.Update(sanpham);
                            }
                        }

                        await _context.SaveChangesAsync();
                    }
                    // Định dạng amount với dấu chấm
                    var formattedAmount = double.Parse(amount).ToString("N0", new System.Globalization.CultureInfo("vi-VN"));
                    return Ok(new
                    {
                        success = true,
                        message = "Thanh toán thành công.",
                        data = new
                        {
                            orderId = sanitizedOrderId,
                            amount = formattedAmount,
                            status = hoaDon.status,
                            orderInfo = hoaDon.order_code,
                            
                        }
                    });
                }
                else
                {
                    // Xử lý giao dịch thất bại
                    return BadRequest(new
                    {
                        success = false,
                        message = "Thanh toán thất bại hoặc bị hủy.",
                        errorCode,
                        errorMessage = message
                    });
                }
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

        //[HttpGet("PaymentResponse")]
        //public IActionResult PaymentResponse()
        //{
        //    try
        //    {
        //        var response = _vnPayService.PaymentExecute(Request.Query);
        //        if (!response.Success)
        //        {
        //            return BadRequest(new { success = false, message = "Thanh toán thất bại.", response });
        //        }

        //        return Ok(new
        //        {
        //            success = true,
        //            message = "Thanh toán thành công.",
        //            response // Trả về đầy đủ `response` từ `PaymentResponseModel`
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new
        //        {
        //            success = false,
        //            message = "Đã xảy ra lỗi trong quá trình xử lý giao dịch.",
        //            error = ex.Message
        //        });
        //    }
        //}
        [HttpGet("PaymentResponse")]    
        public async Task<IActionResult> PaymentResponse()
        {
            try
            {
                var response = _vnPayService.PaymentExecute(Request.Query);

                // Kiểm tra phản hồi từ VnPay
                if (!response.Success)
                {
                    // Tìm hóa đơn dựa trên OrderId
                    var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == response.OrderId);

                    if (hoaDon == null)
                    {
                        return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {response.OrderId}." });
                    }

                    // Cập nhật trạng thái thành "Thanh toán thất bại"
                    if (hoaDon.status != "Đã Thanh toán")
                    {
                        hoaDon.status = "Thanh toán thất bại";
                        hoaDon.Updated_at = DateTime.Now;
                        await _context.SaveChangesAsync();
                    }

                    return BadRequest(new { success = false, message = "Thanh toán thất bại.", response });
                }

                // Tìm hóa đơn dựa trên OrderId
                var hoaDonSuccess = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == response.OrderId);

                if (hoaDonSuccess == null)
                {
                    return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {response.OrderId}." });
                }

                if (hoaDonSuccess.status != "Đã Thanh toán")
                {
                    // Cập nhật trạng thái hóa đơn
                    hoaDonSuccess.status = "Đã Thanh toán";
                    hoaDonSuccess.Updated_at = DateTime.Now;

                    // Giảm số lượng sản phẩm trong kho
                    var chiTietHoaDons = await _context.HoaDonChiTiets.Where(ct => ct.bill_id == hoaDonSuccess.Id).ToListAsync();

                    foreach (var chiTiet in chiTietHoaDons)
                    {
                        var sanphamId = int.Parse(chiTiet.sanpham_ids);
                        var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == sanphamId);

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

                    await _context.SaveChangesAsync();
                }
               
               
                return Ok(new
                {
                    success = true,
                    message = "Thanh toán thành công.",
                    amount = response.AmountFormatted, // Số tiền định dạng
                    response
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

    }
}
