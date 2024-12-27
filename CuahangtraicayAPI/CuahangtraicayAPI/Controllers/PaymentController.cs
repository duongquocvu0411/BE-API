using Microsoft.AspNetCore.Mvc;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Services;
using Microsoft.EntityFrameworkCore;
using ProGCoder_MomoAPI.Services;

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
                // Lấy thông tin từ query string
                var queryParams = Request.Query;

                // Xử lý phản hồi từ MoMoService
                var response = _momoService.PaymentExecuteAsync(queryParams);

                if (response == null)
                {
                    return BadRequest(new { success = false, message = "Không tìm thấy thông tin giao dịch." });
                }

                // Kiểm tra trạng thái giao dịch thông qua errorCode
                var errorCode = queryParams["errorCode"];
                if (errorCode == "0") // Thành công
                {
                    // Chuẩn hóa OrderId để khớp với cột order_code trong cơ sở dữ liệu
                    var sanitizedOrderId = response.OrderId.Replace("Thanh toán hóa đơn ", "");

                    // Tìm hóa đơn dựa trên order_code (sử dụng OrderId từ MoMo đã chuẩn hóa)
                    var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == sanitizedOrderId);

                    if (hoaDon == null)
                    {
                        return NotFound(new { success = false, message = $"Không tìm thấy hóa đơn với mã {sanitizedOrderId} trong cơ sở dữ liệu." });
                    }

                    // Cập nhật trạng thái hóa đơn nếu chưa cập nhật
                    if (hoaDon.status != "Đã Thanh toán")
                    {
                        hoaDon.status = "Đã Thanh toán";
                        hoaDon.Updated_at = DateTime.Now;
                        await _context.SaveChangesAsync();
                    }

                    return Ok(new
                    {
                        success = true,
                        message = "Thanh toán thành công.",
                        data = new
                        {
                            orderId = sanitizedOrderId,
                            amount = response.Amount,
                            orderInfo = response.OrderInfo,
                            status = hoaDon.status
                        }
                    });
                }
                else // Thất bại hoặc hủy giao dịch
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Thanh toán thất bại hoặc bị hủy.",
                        errorCode = errorCode,
                        errorMessage = queryParams["message"]
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

        [HttpGet("PaymentResponse")]
        public IActionResult PaymentResponse()
        {
            try
            {
                var response = _vnPayService.PaymentExecute(Request.Query);
                if (!response.Success)
                {
                    return BadRequest(new { success = false, message = "Thanh toán thất bại.", response });
                }

                return Ok(new
                {
                    success = true,
                    message = "Thanh toán thành công.",
                    response // Trả về đầy đủ `response` từ `PaymentResponseModel`
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
