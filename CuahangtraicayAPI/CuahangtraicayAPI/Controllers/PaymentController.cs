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
        private readonly IMomoService _momoService;

        public PaymentController(IVnPayService vnPayService, AppDbContext appDbContext, IMomoService momoService)
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
                var queryParams = Request.Query;
                var response = _momoService.PaymentExecuteAsync(queryParams);

                if (response == null)
                {
                    return BadRequest(new { success = false, message = "Không tìm thấy thông tin giao dịch." });
                }

                var errorCode = queryParams["errorCode"];
                if (errorCode == "0")
                {
                    var sanitizedOrderId = response.OrderId.Replace("Thanh toán hóa đơn ", "");
                    var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == sanitizedOrderId);

                    if (hoaDon == null)
                    {
                        return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {sanitizedOrderId}." });
                    }

                    if (hoaDon.status != "Đã Thanh toán")
                    {
                        hoaDon.status = "Đã Thanh toán";
                        hoaDon.Updated_at = DateTime.Now;

                        var chiTietHoaDons = await _context.HoaDonChiTiets.Where(ct => ct.bill_id == hoaDon.Id).ToListAsync();

                        foreach (var chiTiet in chiTietHoaDons)
                        {
                            var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == int.Parse(chiTiet.sanpham_ids));
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

                        await _context.SaveChangesAsync();
                    }

                    return Ok(new { success = true, message = "Thanh toán thành công.", data = new { orderId = sanitizedOrderId, amount = response.Amount, orderInfo = response.OrderInfo, status = hoaDon.status } });
                }
                else
                {
                    var sanitizedOrderId = queryParams["orderId"].ToString().Replace("Thanh toán hóa đơn ", "");
                    var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == sanitizedOrderId);

                    if (hoaDon != null)
                    {
                        hoaDon.status = "Thanh toán thất bại";
                        await _context.SaveChangesAsync();
                    }

                    return BadRequest(new { success = false, message = "Thanh toán thất bại hoặc bị hủy.", errorCode, errorMessage = queryParams["message"] });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Đã xảy ra lỗi khi xử lý phản hồi thanh toán.", error = ex.Message });
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
