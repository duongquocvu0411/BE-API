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
//    public class GhnController : ControllerBase
//    {
//        private readonly GhnService _ghnService;
//        private readonly AppDbContext _context;

//        public GhnController(GhnService ghnService, AppDbContext context)
//        {
//            _ghnService = ghnService;
//            _context = context;
//        }

//        [HttpPost("create-order")]
//        public async Task<IActionResult> CreateOrder(int khachHangId)
//        {
//            var khachHang = await _context.KhachHangs
//                .Include(kh => kh.HoaDons)
//                .ThenInclude(hd => hd.HoaDonChiTiets)
//                .ThenInclude(hdct => hdct.SanPham)
//                .FirstOrDefaultAsync(kh => kh.Id == khachHangId);

//            if (khachHang == null)
//            {
//                return NotFound(new { message = "Không tìm thấy khách hàng." });
//            }

//            var shopInfo = _ghnService.GetShopInfo();

//            var orderData = new
//            {
//                payment_type_id = 2,
//                note = khachHang.GhiChu ?? "",
//                required_note = "KHONGCHOXEMHANG",
//                return_phone = shopInfo.Phone, // Sử dụng thông tin từ cấu hình
//                return_address = shopInfo.Address,
//                return_district_name = shopInfo.DistrictName,
//                return_ward_name = shopInfo.WardName,
//                client_order_code = $"KH-{khachHang.Id}-{DateTime.UtcNow.Ticks}",
//                to_name = khachHang.Ten,
//                to_phone = khachHang.Sdt,
//                to_address = khachHang.DiaChiCuThe,
//                to_ward_name = khachHang.xaphuong,
//                to_district_name = khachHang.tinhthanhquanhuyen,
//                to_province_name = khachHang.ThanhPho,
//                cod_amount = (int)Math.Round(khachHang.HoaDons.Sum(hd => hd.total_price)),
//                length = 10,
//                width = 10,
//                height = 10,
//                weight = 1000,
//                items = khachHang.HoaDons.SelectMany(hd => hd.HoaDonChiTiets).Select(hdct => new
//                {
//                    name = hdct.SanPham.Tieude,
//                    code = hdct.SanPham.Id.ToString(),
//                    quantity = hdct.quantity,
//                    price = (int)Math.Round(hdct.price),
//                    length = 10,
//                    width = 10,
//                    height = 10,
//                    weight = 1000,
//                    category = new { level1 = "Sản phẩm" }
//                }).ToList()
//            };

//            var response = await _ghnService.CreateOrderAsync(orderData);
//            var responseContent = await response.Content.ReadAsStringAsync();

//            if (response.IsSuccessStatusCode)
//            {
//                return Ok(new { message = "Đơn hàng đã được tạo thành công.", data = JsonConvert.DeserializeObject(responseContent) });
//            }
//            else
//            {
//                return StatusCode((int)response.StatusCode, new { message = "Lỗi khi tạo đơn hàng.", error = responseContent });
//            }
//        }

//    }
//}