using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Services;
using System.Globalization;
using CuahangtraicayAPI.Model.VnPay;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;


namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailHelper _emailHelper;
        private readonly IVnPayService _vnPayService;
        private readonly MoMoPaymentService _momoService;

        public HoaDonController(AppDbContext context, EmailHelper emailHelper, IVnPayService vnPayService, MoMoPaymentService momoService)
        {
            _context = context;
            _emailHelper = emailHelper;
            _vnPayService = vnPayService;
            _momoService = momoService;
        }

        /// <summary>
        /// Lấy danh sách hóa đơn
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<HoaDon>>>> GetHoaDons()
        {
            var hoadons = await _context.HoaDons.ToListAsync();
          

            return Ok(new BaseResponseDTO<IEnumerable< HoaDon>>
            {
                Data =hoadons,
                Message= "Success"
            });
        }

        /// <summary>
        /// Tạo hóa đơn mới
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO<HoaDon>>> CreateHoaDon(HoadonDTO.HoaDonDto hoaDonDto)
        {
            var orderCode = GenerateOrderCode(); // Tạo mã đơn hàng
            var totalPrice = 0m;

            // Tính tổng giá trị đơn hàng
            foreach (var (sanphamId, quantity) in hoaDonDto.SanphamIds.Zip(hoaDonDto.Quantities))
            {
                var sanpham = await _context.Sanpham
                    .Include(sp => sp.SanphamSales)
                    .FirstOrDefaultAsync(sp => sp.Id == sanphamId);

                if (sanpham == null)
                {
                    return BadRequest(new { message = $"Sản phẩm với ID {sanphamId} không tồn tại." });
                }

                var activeSale = sanpham.SanphamSales.FirstOrDefault(sale => sale.trangthai == "Đang áp dụng");
                var gia = activeSale != null ? activeSale.giasale : sanpham.Giatien;

                if (sanpham.Soluong < quantity)
                {
                    return BadRequest(new { message = $"Số lượng sản phẩm '{sanpham.Tieude}' không đủ." });
                }

                totalPrice += gia * quantity;
            }

            // Tạo hóa đơn
            var bill = new HoaDon
            {
                khachhang_id = hoaDonDto.KhachHangId,
                total_price = totalPrice,
                order_code = orderCode,
                Thanhtoan = hoaDonDto.PaymentMethod,
                status = hoaDonDto.PaymentMethod == "VnPay" || hoaDonDto.Thanhtoan == "Momo" ? "Chờ thanh toán" : "Chờ xử lý", // Xử lý đúng trạng thái
                Ghn = "Chưa lên đơn",
                UpdatedBy = "Chưa có tác động"
            };

            _context.HoaDons.Add(bill);
            await _context.SaveChangesAsync();

            // Thêm chi tiết hóa đơn
            foreach (var (sanphamId, quantity) in hoaDonDto.SanphamIds.Zip(hoaDonDto.Quantities))
            {
                var sanpham = await _context.Sanpham.FindAsync(sanphamId);

                if (sanpham != null)

                {
                     var activeSale = sanpham.SanphamSales.FirstOrDefault(sale => sale.trangthai == "Đang áp dụng");
                    var gia = activeSale != null ? activeSale.giasale : sanpham.Giatien;
                    var chiTiet = new HoaDonChiTiet
                    {
                        bill_id = bill.Id,
                        sanpham_ids = sanphamId,
                        //price = sanpham.Giatien * quantity,
                        price = (gia) * hoaDonDto.Quantities.FirstOrDefault(),
                        quantity = quantity
                    };

                    _context.HoaDonChiTiets.Add(chiTiet);
                }
            }

            await _context.SaveChangesAsync();
            // Gửi email nếu thanh toán COD
            if (hoaDonDto.PaymentMethod == "cod")
            {
                await Task.Run(()=> GuiEmailHoaDon(bill, totalPrice, orderCode));
            }
          

            // Xử lý thanh toán
            if (hoaDonDto.PaymentMethod == "VnPay")
            {
                // Tạo URL thanh toán VnPay
                var paymentInfo = new PaymentInformationModel
                {
                    OrderType = "billpayment",
                    Amount = (double)totalPrice,
                    OrderDescription = $"Thanh toán hóa đơn {orderCode}",
                    Name = "Khách hàng",
                    OrderCode = orderCode
                };

                var paymentUrl = _vnPayService.CreatePaymentUrl(paymentInfo, HttpContext);

                //bill.status = "Chờ thanh toán qua VnPay";
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "URL thanh toán VnPay được tạo thành công.",
                    PaymentUrl = paymentUrl,
                    Bill = new
                    {
                        bill.Id,
                        bill.order_code,
                        bill.total_price,
                        bill.status
                    }
                });
            }
            else if (hoaDonDto.PaymentMethod == "Momo")
            {
                // Tạo URL thanh toán MoMo
                var momoRequest = new OrderInfoModel
                {
                    FullName = "Khách hàng",
                    Amount = (double)totalPrice,
                    OrderInfo = $"Thanh toán hóa đơn {orderCode}",
                    OrderCode = orderCode
                };

                var momoResponse = await _momoService.CreatePaymentAsync(momoRequest);

                if (momoResponse.ErrorCode == 0)
                {
                    //bill.status = "Chờ thanh toán qua Momo";
                    await _context.SaveChangesAsync();

                    return Ok(new
                    {
                        Message = "URL thanh toán Momo được tạo thành công.",
                        PayUrl = momoResponse.PayUrl,
                        Bill = new
                        {
                            bill.Id,
                            bill.order_code,
                            bill.total_price,
                            bill.status
                        }
                    });
                }
                else
                {
                    return BadRequest(new { message = "Không thể tạo thanh toán qua Momo.", error = momoResponse.Message });
                }
            }

            // Trả về thông tin khách hàng, hóa đơn và chi tiết hóa đơn
            var khachHang = await _context.KhachHangs.FindAsync(hoaDonDto.KhachHangId);
            var chiTietHoaDon = await _context.HoaDonChiTiets
                .Where(ct => ct.bill_id == bill.Id)
                .Select(ct => new
                {
                    ct.Id,
                    ct.price,
                    ct.quantity,
                    SanPhamTitle = _context.Sanpham
                        .Where(sp => sp.Id == ct.sanpham_ids)
                        .Select(sp => sp.Tieude)
                        .FirstOrDefault()
                })
                .ToListAsync();

            var result = new
            {
                Message = "Đơn hàng đã được tạo thành công",
                OrderCode = bill.order_code,
                KhachHang = new
                {
                    khachHang.Id,
                    khachHang.Ten,
                    khachHang.Ho,
                    khachHang.DiaChiCuThe,
                    khachHang.tinhthanhquanhuyen,
                    khachHang.ThanhPho,
                    khachHang.xaphuong,
                    khachHang.Sdt,
                    khachHang.EmailDiaChi
                },
                HoaDon = new
                {
                    bill.Id,
                    bill.total_price,
                    bill.order_code,
                    bill.status,
                    bill.Thanhtoan,
                    ChiTietHoaDon = chiTietHoaDon
                }
            };

            return Ok(result);
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


        /// <summary>
        /// Tra cứu theo mã của hóa đơn
        /// </summary>
        /// <returns>Tra cứu theo mã của hóa đơn</returns>
        // GET: api/HoaDon/TraCuu/{orderCode}
        [HttpGet("TraCuu/{orderCode}")]
        public async Task<ActionResult<BaseResponseDTO<object>>> GetHoaDonByOrderCode(string orderCode)
        {
            // Tìm hóa đơn dựa trên OrderCode
            var hoaDon = await _context.HoaDons
                .Include(hd => hd.HoaDonChiTiets)
                .ThenInclude(sp => sp.SanPham)
                .FirstOrDefaultAsync(hd => hd.order_code == orderCode);

            if (hoaDon == null)
            {
                return NotFound(new { message = "Không tìm thấy hóa đơn với mã đơn hàng này." });
            }

            // Chuẩn bị phản hồi
            var response = new
            {
                hoaDon.Id,
                hoaDon.khachhang_id,
                NgayTao = hoaDon.Created_at,
                TongTien = hoaDon.total_price,
                MaDonHang = hoaDon.order_code,
                TrangThai = hoaDon.status,
                PhuongThucThanhToan = hoaDon.Thanhtoan,
                ChiTietHoaDon = hoaDon.HoaDonChiTiets.Select(ct => new
                {
                  
                  
                    TenSanPham = ct.SanPham.Tieude, // Lấy tên sản phẩm
                    DonViTinh = ct.SanPham.don_vi_tinh, // Lấy đơn vị tính
                    Gia = ct.price,
                    SoLuong = ct.quantity
                })
            };

            return Ok(new BaseResponseDTO<Object>
            {
                Data= response,
                Message = "Success"
            });
        }


        /// <summary>
        /// tra cứu đơn và hủy đơn hàng 
        /// </summary>
        /// <returns>tra cứu đơn và hủy đơn hàng </returns>

        // PUT: api/HoaDon/TraCuu/{orderCode}/HuyDon
        [HttpPut("TraCuu/{orderCode}/HuyDon")]

        public async Task<ActionResult<BaseResponseDTO<object>>> CancelOrder(string orderCode)
        {
            // Tìm hóa đơn dựa trên OrderCode
            var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == orderCode);

            if (hoaDon == null)
            {
                return NotFound(new BaseResponseDTO<object>
                {
                    Code = 404,
                    Message = "Không tìm thấy đơn hàng với mã này."
                });
            }

            // Kiểm tra trạng thái hiện tại của đơn hàng
            if (hoaDon.status == "Hủy đơn" || hoaDon.status == "Chờ xử lý hủy đơn")
            {
                return BadRequest(new BaseResponseDTO<object>
                {
                    Code = 400,
                    Message = "Đơn hàng đã được yêu cầu hủy trước đó."
                });
            }

            if (hoaDon.status == "Đã Thanh toán" && hoaDon.Thanhtoan == "Momo")
            {
                // Cập nhật trạng thái thành "Chờ xử lý hủy đơn" nếu đã thanh toán qua MoMo
                hoaDon.status = "Chờ xử lý hủy đơn";
            }
            else if (hoaDon.status == "Chờ xử lý")
            {
                // Trường hợp đơn hàng chưa thanh toán
                hoaDon.status = "Hủy đơn";
            }
            else
            {
                return BadRequest(new BaseResponseDTO<object>
                {
                    Code = 400,
                    Message = "Trạng thái đơn hàng không hợp lệ để hủy."
                });
            }

            hoaDon.Updated_at = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<object>
            {
                Code = 0,
                Message = hoaDon.status == "Chờ xử lý hủy đơn"
                    ? "Yêu cầu hủy đơn đã được ghi nhận. Chờ xử lý hoàn tiền."
                    : "Đơn hàng đã được hủy thành công.",
                Data = new
                {
                    hoaDon.order_code,
                    hoaDon.status,
                    UpdatedAt = hoaDon.Updated_at
                }
            });
        }

     
        /// <summary>
        /// Xác nhận hủy đơn hàng 
        /// </summary>
        /// <param name="orderCode"></param>
        /// <returns>Xác nhận hủy đơn hàng </returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("XacNhanHuyDon/{orderCode}")]
        public async Task<ActionResult<BaseResponseDTO<object>>> XacNhanHuyDon(string orderCode)
        {
            // Tìm hóa đơn dựa trên OrderCode
            var hoaDon = await _context.HoaDons
                .Include(h => h.KhachHang)  // Bao gồm thông tin khách hàng
                .FirstOrDefaultAsync(hd => hd.order_code == orderCode);

            if (hoaDon == null)
            {
                return NotFound(new BaseResponseDTO<object>
                {
                    Code = 404,
                    Message = "Không tìm thấy đơn hàng với mã này."
                });
            }
            // nếu hoadon khác status Chờ xữ lý hủy đơn
            if (hoaDon.status != "Chờ xử lý hủy đơn")
            {
                return BadRequest(new BaseResponseDTO<object>
                {
                    Code = 400,
                    Message = "Đơn hàng không ở trạng thái 'Chờ xử lý hủy đơn'."
                });
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new { message = "Không thể xác định người dùng từ token." });
            }

            // Tìm giao dịch liên quan trong bảng PaymentTransactions
            var giaodich = await _context.PaymentTransactions
                .FirstOrDefaultAsync(pt => pt.OrderId == orderCode && pt.Status == "Success");

            if (giaodich == null)
            {
                return BadRequest(new BaseResponseDTO<object>
                {
                    Code = 400,
                    Message = "Không tìm thấy giao dịch hợp lệ cho đơn hàng này."
                });
            }

            // Gọi API hoàn tiền của MoMo
            var refundResponse = await _momoService.RefundAsync(giaodich.TransactionId, (double)giaodich.Amount);

            if (refundResponse.ErrorCode != 0)
            {
                return BadRequest(new BaseResponseDTO<object>
                {
                    Code = 400,
                    Message = $"Hoàn tiền thất bại: {refundResponse.Message}"
                });
            }

            // Cập nhật trạng thái giao dịch thành "Đã hoàn tiền"
            giaodich.Status = "Đã hoàn tiền";
            giaodich.ResponseMessage = "Hoàn tiền thành công";
            giaodich.Updated_at = DateTime.Now;
            giaodich.UpdatedBy = hotenToken;
            _context.PaymentTransactions.Update(giaodich);

            // Hoàn lại số lượng sản phẩm
            var chiTietHoaDon = await _context.HoaDonChiTiets.Where(ct => ct.bill_id == hoaDon.Id).ToListAsync();
            foreach (var chiTiet in chiTietHoaDon)
            {
                var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);
                if (sanpham != null)
                {
                    sanpham.Soluong += chiTiet.quantity; // Hoàn lại số lượng
                    if (sanpham.Soluong > 0 && sanpham.Trangthai == "Hết hàng")
                    {
                        sanpham.Trangthai = "Còn hàng"; // Cập nhật trạng thái nếu cần
                    }

                    _context.Sanpham.Update(sanpham);
                }
            }

            // Cập nhật trạng thái hóa đơn
            hoaDon.status = "Hủy đơn";
            hoaDon.Updated_at = DateTime.Now;

            await _context.SaveChangesAsync();

            // Lấy email của khách hàng
            var khEmail = hoaDon.KhachHang?.EmailDiaChi; // Lấy email của khách hàng từ thông tin hóa đơn

            // Kiểm tra nếu có email khách hàng và gửi email thông báo
            if (!string.IsNullOrEmpty(khEmail))
            {
                var emailSub = "Thông báo hủy đơn hàng";
                var emailContent = $@"
        <html>
        <body>
            <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc;'>
                <tr>
                    <td align='center' bgcolor='#007bff' style='padding: 20px 0;'>
                        <h1 style='color: #ffffff; margin: 0;'>Cửa hàng trái cây</h1>
                    </td>
                </tr>
                <tr>
                    <td style='padding: 20px;'>
                        <p style='margin: 0; font-size: 18px;'>Xin chào,</p>
                        <p style='margin: 10px 0;'>
                            Đơn hàng của bạn: (<strong> {hoaDon.order_code}</strong>) đã được hủy 
                        </p> 
                          <p style='margin: 10px 0;'>
                            số tiền:(<strong>:{giaodich.Amount:N0} VND đã được hoàn lại qua MoMo.</strong>) 
                        </p> 

                        <p style='margin: 10px 0;'>
                            Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td align='center' bgcolor='#f8f9fa' style='padding: 20px;'>
                        <p style='margin: 0; font-size: 14px; color: #999999;'>Đây là email tự động, vui lòng không trả lời email này.</p>
                        <p style='margin: 5px 0; font-size: 14px; color: #999999;'>&copy; 2025 Cửa hàng trái cây. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>";

                // Gửi email trong nền (background)
                Task.Run(async () =>
                {
                    try
                    {
                        Console.WriteLine($"Đang gửi email đến: {khEmail}");
                        await _emailHelper.GuiEmailAsync(khEmail, emailSub, emailContent);
                        Console.WriteLine("Gửi email thành công!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                    }
                });
            }
            else
            {
                Console.WriteLine("Không có email khách hàng để gửi thông báo.");
            }

            return Ok(new BaseResponseDTO<object>
            {
                Code = 0,
                Message = "Hoàn tiền và hủy đơn hàng thành công.",
                Data = new
                {
                    hoaDon.order_code,
                    hoaDon.status,
                    UpdatedAt = hoaDon.Updated_at
                }
            });
        }


        /// <summary>
        /// Chỉnh sửa status của hóa đơn
        /// </summary>
        /// <returns> Chỉnh sửa status của hóa đơn </returns>

        // PUT: api/HoaDon/UpdateStatus/{id}
        [HttpPut("UpdateStatus/{id}")]
        public async Task<ActionResult<BaseResponseDTO<HoaDon>>> UpdateStatus(int id, [FromBody] HoadonDTO.UpdateStatusDto dto)
        {
            // Tìm hóa đơn và bao gồm thông tin khách hàng
            var bill = await _context.HoaDons
                .Include(h => h.KhachHang)
                .Include(ct => ct.HoaDonChiTiets)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (bill == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng" });

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new { message = "Không thể xác định người dùng từ token." });
            }

            Console.WriteLine($"Phương thức thanh toán: {bill.Thanhtoan}");

            if (string.Equals(bill.Thanhtoan.Trim(), "VnPay", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(bill.Thanhtoan.Trim(), "Momo", StringComparison.OrdinalIgnoreCase))
            {
                // Đơn hàng thanh toán qua VnPay hoặc MoMo, chỉ cập nhật trạng thái mà không thay đổi số lượng
                Console.WriteLine("Đơn hàng thanh toán qua VnPay hoặc MoMo, không cập nhật số lượng sản phẩm.");
            }
            else
            {
                // Cập nhật số lượng sản phẩm nếu không phải VnPay hoặc MoMo
                if (dto.Status == "Đã giao thành công")
                {
                    foreach (var chiTiet in bill.HoaDonChiTiets)
                    {
                        var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);

                        if (sanpham != null)
                        {
                            sanpham.Soluong -= chiTiet.quantity;

                            if (sanpham.Soluong <= 0)
                            {
                                sanpham.Soluong = 0;
                                sanpham.Trangthai = "Hết hàng";
                            }

                            _context.Sanpham.Update(sanpham);
                        }
                    }
                }
            }

            // Cập nhật trạng thái hóa đơn
            if (bill.status != dto.Status)
            {
                bill.status = dto.Status;
                bill.UpdatedBy = hotenToken;
                bill.Updated_at = DateTime.Now;
            }

            // Lưu thay đổi vào database
            try
            {
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Số bản ghi được cập nhật: {rowsAffected}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lưu thay đổi: {ex.Message}");
                return BadRequest(new { message = "Lỗi khi lưu thay đổi trạng thái." });
            }

            // Lấy email của khách hàng
            var khEmail = bill.KhachHang?.EmailDiaChi;
            Console.WriteLine($"Đang kiểm tra email khách hàng: {khEmail}");

            if (!string.IsNullOrEmpty(khEmail))
            {
                var EmailSub = "Cập nhật trạng thái đơn hàng";
                var emailNoidung = $@"
            <html>
            <body>
                <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc;'>
                    <tr>
                        <td align='center' bgcolor='#007bff' style='padding: 20px 0;'>
                            <h1 style='color: #ffffff; margin: 0;'>Cửa hàng trái cây</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style='padding: 20px;'>
                            <p style='margin: 0; font-size: 18px;'>Xin chào,</p>
                            <p style='margin: 10px 0;'>
                                Đơn hàng của bạn (<strong>Mã đơn: {bill.order_code}</strong>) đã được cập nhật trạng thái thành:
                            </p>
                            <p style='font-size: 20px; font-weight: bold; color: #28a745; margin: 10px 0;'>{bill.status}</p>
                            <p style='margin: 10px 0;'>
                                Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align='center' bgcolor='#f8f9fa' style='padding: 20px;'>
                            <p style='margin: 0; font-size: 14px; color: #999999;'>Đây là email tự động, vui lòng không trả lời email này.</p>
                            <p style='margin: 5px 0; font-size: 14px; color: #999999;'>&copy; 2025 Công ty TNHH. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>";

                // Gửi email trong nền không cần phải chờ gữi mail trước rồi mới cập nhật trạng thái sau
                Task.Run(async () =>
                {
                    try
                    {
                        Console.WriteLine($"Đang gửi email đến: {khEmail}");
                        await _emailHelper.GuiEmailAsync(khEmail, EmailSub, emailNoidung);
                        Console.WriteLine("Gửi email thành công!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                    }
                });
            }
            else
            {
                Console.WriteLine("Không có email khách hàng để gửi thông báo.");
            }

            return Ok(new BaseResponseDTO<HoaDon> { Data = bill,
            Message ="Success"});
        }




        /// <summary>
        /// Lấy danh thu theo ngày hiện tại
        /// </summary>
        /// <returns> Lấy danh thu theo ngày hiện tại </returns>

        [HttpGet("DoanhThuHomNay")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<object>>> GetDoanhThuHomNay()
        {
            // Lấy ngày hiện tại và thiết lập mốc thời gian đầu và cuối của ngày
            DateTime today = DateTime.Today;
            DateTime tomorrow = today.AddDays(1);

            // Tính tổng doanh thu của các hóa đơn có ngày tạo là hôm nay
            var doanhThuHomNay = await _context.HoaDons
                .Where(hd => hd.Created_at >= today && hd.Created_at < tomorrow)
                .SumAsync(hd => hd.total_price);

            // Chuẩn bị dữ liệu trả về
            var result = new
            {
                Ngay = today.ToString("yyyy-MM-dd"),
                TongDoanhThu = doanhThuHomNay
            };

            // Trả về kết quả qua BaseResponseDTO
            return Ok(new BaseResponseDTO<object>
            {
                Code = 0,
                Message = "Success",
                Data = result
            });
        }


        /// <summary>
        /// Lấy toàn bộ danh thu của các tháng
        /// </summary>
        /// <returns> Lấy toàn bộ danh thu của các tháng </returns>

        // GET: api/HoaDon/DoanhThuTheoTungThang
        [HttpGet("DoanhThuTheoTungThang")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<IEnumerable<object>>> GetDoanhThuTheoTungThang()
        {
            var doanhThuThang = await _context.HoaDons
                .GroupBy(hd => new { hd.Created_at.Year, hd.Created_at.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TotalRevenue = g.Sum(hd => hd.total_price)
                })
                .OrderBy(res => res.Year)
                .ThenBy(res => res.Month)
                .ToListAsync();

            return Ok(doanhThuThang);
        }

        // Sinh mã đơn hàng duy nhất
        private string GenerateOrderCode()
        {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var madonhang = new string(Enumerable.Repeat(characters, 8)
                .Select(s => s[new Random().Next(s.Length)]).ToArray());

            if (_context.HoaDons.Any(hd => hd.order_code == madonhang))
                return GenerateOrderCode();

            return madonhang;
        }

        /// <summary>
        /// Lấy danh sách sản phẩm bán chạy trong tháng và năm hiện tại
        /// </summary>
        /// <returns>Danh sách sản phẩm bán chạy trong tháng và năm hiện tại</returns>
        [HttpGet("SanPhamBanChayHienTai")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<object>>>> GetSanPhamBanChayHienTai()
        {
            // Lấy năm và tháng hiện tại
            var currentYear = DateTime.Now.Year;
            var currentMonth = DateTime.Now.Month;

            // Tính tổng số lượng sản phẩm bán ra trong tháng và năm hiện tại
            var sanPhamBanChay = await _context.HoaDonChiTiets
                .Where(hdct => hdct.HoaDon.Created_at.Year == currentYear && hdct.HoaDon.Created_at.Month == currentMonth)
                .GroupBy(hdct => hdct.sanpham_ids)
                .Select(g => new
                {
                    SanPhamIds = g.Key,
                    TotalQuantity = g.Sum(hdct => hdct.quantity),
                })
                .OrderByDescending(res => res.TotalQuantity)
                .ToListAsync();

            // Lấy chi tiết sản phẩm từ các sanpham_ids
            var result = new List<object>();

            foreach (var item in sanPhamBanChay)
            {
                // Truy vấn thông tin chi tiết sản phẩm theo ID
                var sanpham = await _context.Sanpham
                    .Where(sp => sp.Id == item.SanPhamIds)
                    .Select(sp => new { sp.Tieude, sp.don_vi_tinh })
                    .FirstOrDefaultAsync();

                if (sanpham != null)
                {
                    result.Add(new
                    {
                        SanPhamIds = item.SanPhamIds,
                        SanPhamName = sanpham.Tieude,
                        SanPhamDonViTinh = sanpham.don_vi_tinh,
                        TotalQuantity = item.TotalQuantity,
                    });
                }
            }

            // Trả về kết quả qua BaseResponseDTO
            return Ok(new BaseResponseDTO<IEnumerable<object>>
            {
                Code = 0,
                Message = "Lấy danh sách sản phẩm bán chạy hiện tại thành công",
                Data = result
            });
        }

    }
}
