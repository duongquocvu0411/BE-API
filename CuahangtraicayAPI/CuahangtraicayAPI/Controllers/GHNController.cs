//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;
//using CuahangtraicayAPI.Services;
//using System.Text.Json;
//using Microsoft.EntityFrameworkCore;
//using Newtonsoft.Json;
//using System.ComponentModel.DataAnnotations;

//namespace CuahangtraicayAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class GHNController : ControllerBase
//    {
//        private readonly AppDbContext _context;
//        private readonly GHNService _ghnService;

//        public GHNController(AppDbContext context, GHNService ghnService)
//        {
//            _context = context;
//            _ghnService = ghnService;
//        }

//        [HttpPost("create-ghn-order")]
//        public async Task<IActionResult> CreateGhnOrder(int hoaDonId)
//        {
//            try
//            {
//                // Lấy thông tin hóa đơn từ cơ sở dữ liệu
//                var hoaDon = await _context.HoaDons
//                    .Include(hd => hd.HoaDonChiTiets)
//                    .FirstOrDefaultAsync(hd => hd.Id == hoaDonId);

//                if (hoaDon == null)
//                {
//                    return NotFound(new { message = $"Không tìm thấy hóa đơn với ID {hoaDonId}." });
//                }

//                // Lấy thông tin khách hàng từ hóa đơn
//                var khachHang = await _context.KhachHangs.FirstOrDefaultAsync(kh => kh.Id == hoaDon.khachhang_id);

//                if (khachHang == null)
//                {
//                    return BadRequest(new { message = $"Không tìm thấy thông tin khách hàng liên quan đến hóa đơn." });
//                }

//                // Danh sách các sản phẩm từ hóa đơn chi tiết
//                var items = new List<object>();
//                foreach (var chiTiet in hoaDon.HoaDonChiTiets)
//                {
//                    // Tách các ID sản phẩm từ chuỗi `sanpham_ids`
//                    var sanPhamIds = chiTiet.sanpham_ids
//                        .Split(',', StringSplitOptions.RemoveEmptyEntries)
//                        .Select(id => int.Parse(id.Trim()))
//                        .ToList();

//                    // Truy vấn từng sản phẩm theo ID
//                    foreach (var sanPhamId in sanPhamIds)
//                    {
//                        var sanPham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == sanPhamId);

//                        if (sanPham != null)
//                        {
//                            items.Add(new
//                            {
//                                name = sanPham.Tieude ?? "Không tên",
//                                code = sanPham.Id.ToString(),
//                                quantity = chiTiet.quantity,
//                                price = (int)chiTiet.price, // Convert sang int để phù hợp với GHN API
//                                length = 10, // Giá trị mặc định
//                                width = 10,
//                                height = 10,
//                                weight = 500
//                            });
//                        }
//                    }
//                }

//                // Payload gửi đến GHN API
//                var ghnPayload = new
//                {
//                    payment_type_id = 2,
//                    note = "Giao hàng nhanh",
//                    required_note = "KHONGCHOXEMHANG",
//                    to_name = $"{khachHang.Ho} {khachHang.Ten}",
//                    to_phone = khachHang.Sdt,
//                    to_address = khachHang.DiaChiCuThe,
//                    to_ward_name = khachHang.xaphuong,
//                    to_district_name = khachHang.tinhthanhquanhuyen,
//                    to_province_name = khachHang.ThanhPho,
//                    cod_amount = (int)hoaDon.total_price,
//                    client_order_code = hoaDon.order_code,
//                    length = 10,
//                    width = 10,
//                    height = 10,
//                    weight = 500,
//                    service_type_id = 2,
//                    items = items,
                   
//                };


//                // Gọi GHN API
//                var ghnResponse = await _ghnService.CreateOrderAsync(ghnPayload);

//                // Parse response từ GHN
//                var ghnData = JsonConvert.DeserializeObject<dynamic>(ghnResponse);

//                if (ghnData != null && ghnData.success)
//                {
//                    hoaDon.order_code = ghnData.data.order_code; // Lưu mã đơn hàng GHN vào hóa đơn
//                    await _context.SaveChangesAsync();

//                    return Ok(new { message = "Đơn hàng GHN đã được tạo thành công.", orderCode = hoaDon.order_code });
//                }
//                else
//                {
//                    return BadRequest(new { message = $"Lỗi từ GHN API: {ghnData?.message}" });
//                }
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new { message = $"Lỗi khi gọi GHN API: {ex.Message}" });
//            }
//        }

//        public class CreateGHNOrderDto
//        {
//            [Required]
//            public int KhachHangId { get; set; }
//            [Required]
//            public int HoaDonId { get; set; }
//        }
//    }
//    }