using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Services;
using CuahangtraicayAPI.Model.ghn;
using System.IdentityModel.Tokens.Jwt;


namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IGhnService _ghnService;
        private readonly AppDbContext _context;

        public KhachHangController(AppDbContext context, IGhnService ghnService)
        {
            _context = context;
            _ghnService = ghnService;
        }
    


        /// <summary>
        /// Lấy danh sách của Khách hàng và hóa đơn
        /// </summary>
        /// <returns> Lấy danh sách của Khách hàng và hóa đơn</returns>

        // GET: api/KhachHang
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<KhachHang>>>> GetKhachHangs()
        {
            var khachHangs = await _context.KhachHangs
                .Include(kh => kh.HoaDons)

                .ToListAsync();

           

            return Ok(new BaseResponseDTO<IEnumerable <KhachHang>>
            {
                Data = khachHangs,
                Message =" Success"
            });
        }




        /// <summary>
        /// Xem khách hàng theo id có hóa đơn, hóa đơn chi tiết
        /// </summary>
        /// <returns> xem khách hàng theo id có hóa đơn , hóa đơn chi tiết </returns>

        // GET: api/KhachHang/5
        /// <summary>
        /// Xem khách hàng theo id có hóa đơn, hóa đơn chi tiết
        /// </summary>
        /// <returns> xem khách hàng theo id có hóa đơn , hóa đơn chi tiết </returns>


        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO<Object>>> GetKhachHang(int id)
        {
            var khachHang = await _context.KhachHangs
                .Include(kh => kh.HoaDons)
                    .ThenInclude(hd => hd.HoaDonChiTiets)
                    .ThenInclude(sp => sp.SanPham)
                .FirstOrDefaultAsync(kh => kh.Id == id);

            if (khachHang == null)
            {
                return NotFound(new BaseResponseDTO<KhachHang> { Code=404, Message = "Không tìm thấy khách hàng với ID này." });
            }
            // Xử lý dữ liệu trả về ngắn gọn
            var response = new
            {
                
                ten = khachHang.Ten,
                ho = khachHang.Ho,
                diaChiCuThe = khachHang.DiaChiCuThe,
                thanhpho = khachHang.ThanhPho,
                tinhthanh = khachHang.tinhthanhquanhuyen,
                xaphuong = khachHang.xaphuong,
                sdt = khachHang.Sdt,
                email = khachHang.EmailDiaChi,
                ghichu = khachHang.GhiChu,
                hoaDons = khachHang.HoaDons.Select(hd => new
                {
                    id=hd.Id,
                    ngaytao = hd.Created_at,
                    total_price = hd.total_price,
                    order_code = hd.order_code,
                    thanhtoan = hd.Thanhtoan,
                    status = hd.status,
                    ghn = hd.Ghn,
                    hoaDonChiTiets = hd.HoaDonChiTiets.Select(hdct => new
                    {
                        tieude = hdct.SanPham?.Tieude,
                        don_vi_tinh = hdct.SanPham?.don_vi_tinh,
                        price = hdct.price,
                        quantity = hdct.quantity,
                        id=hdct.Id,
                        bill_id =hdct.bill_id
                    })
                })
            };

            return Ok(new BaseResponseDTO<Object>
            {
                Data =response,
                Message =" Success"
            });
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <returns> Thêm mới khách hàng</returns>

        // POST: api/KhachHang
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO< KhachHang>>> PostKhachHang(DTO.KhachHangCreateDto kh)
        { // Kiểm tra tính hợp lệ của dữ liệu
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Trả về lỗi nếu không hợp lệ
            }
            // Chuyển đổi từ DTO sang Model
            var khachHang = new KhachHang
            {
                Ten = kh.Ten,
                Ho = kh.Ho,
                DiaChiCuThe = kh.DiaChiCuThe,
                tinhthanhquanhuyen = kh.tinhthanhquanhuyen,
                ThanhPho = kh.ThanhPho,
                xaphuong = kh.xaphuong,
                Sdt = kh.Sdt,
                EmailDiaChi = kh.EmailDiaChi,
                GhiChu = kh.GhiChu
            };

            // Thêm khách hàng vào cơ sở dữ liệu
            _context.KhachHangs.Add(khachHang);
            await _context.SaveChangesAsync();

            // Trả về kết quả sau khi thêm thành công
            return Ok(new BaseResponseDTO<KhachHang>
            {
                Data = khachHang,
                Message = "Success"
            });
        }


        /// <summary>
        /// Tạo đơn giao hàng nhanh
        /// </summary>
        /// <param name="id"></param>
        /// <param name="idShop"></param>
        /// <returns>Tạo đơn giao hàng nhanh</returns>

        [HttpPost("{id}/create-order")]
        public async Task<IActionResult> CreateOrder(int id, string idShop)
        {
            // Lấy thông tin khách hàng
            var khachHang = GetKhachHangById(id);
            if (khachHang == null)
                return NotFound(new { message = "Khách hàng không tồn tại." });

            // Lấy hóa đơn đầu tiên của khách hàng
            var hoaDon = khachHang.HoaDons.FirstOrDefault();
            if (hoaDon == null)
                return BadRequest(new { message = "Khách hàng không có hóa đơn hợp lệ." });

            // Kiểm tra trạng thái hóa đơn
            if (hoaDon.status == "Hủy đơn")
                return BadRequest(new { message = "Không thể lên đơn hàng với trạng thái 'Hủy đơn'." });

            // Kiểm tra nếu ClientOrderCode đã tồn tại trong GhnOrders
            var existingOrder = await _context.GhnOrders
                .FirstOrDefaultAsync(o => o.Client_order_code == hoaDon.order_code);

            if (existingOrder != null)
            {
                // Nếu mã đã tồn tại, trả về lỗi và không cho phép lên đơn
                return BadRequest(new
                {
                    message = "Mã đơn hàng này đã được sử dụng để tạo đơn GHN.",
                    //existingOrderId = existingOrder.ghn_order_id // Trả về mã GHN đã tồn tại nếu cần
                });
            }

            // Tiếp tục xử lý lên đơn nếu mã không tồn tại
            int codAmount = (hoaDon.Thanhtoan == "Momo" || hoaDon.Thanhtoan == "VnPay")  ? 0 : (int)hoaDon.total_price;

            var request = new GhnOrderRequest
            {
                ShopId = idShop,
                ToName = $"{khachHang.Ho} {khachHang.Ten}",
                ToPhone = khachHang.Sdt,
                ToAddress = khachHang.DiaChiCuThe,
                ToWardName = khachHang.xaphuong,
                ToDistrictName = khachHang.tinhthanhquanhuyen,
                ToProvinceName = khachHang.ThanhPho,
                ClientOrderCode = hoaDon.order_code,
                CodAmount = codAmount,
                InsuranceValue = hoaDon.total_price > 5000000 ? 5000000 : (int)hoaDon.total_price,
                Items = hoaDon.HoaDonChiTiets.Select(hdct => new GhnOrderItem
                {
                    Name = hdct.SanPham?.Tieude ?? "Sản phẩm",
                    Code = $"SP{hdct.Id}",
                    Quantity = hdct.quantity,
                    Price = (int)hdct.price,
                    Category = new GhnCategory { Level1 = "Thực phẩm" }
                }).ToList()
            };

            // Gửi yêu cầu tạo đơn hàng GHN
            var ghnResponse = await _ghnService.CreateOrderAsync(request);

            // Lấy mã đơn hàng GHN từ phản hồi
            var ghnOrderId = ghnResponse.Data.OrderCode;
            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler(); // dùng để trích xuất thông tin mã hóa token
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;
            // Lưu thông tin đơn hàng GHN vào cơ sở dữ liệu
            var ghnOrder = new GhnOrder
            {
                ghn_order_id = ghnOrderId,
                Client_order_code = hoaDon.order_code,
                Status = "Created",
                UpdatedBy = hotenToken,
                Created_at = DateTime.Now,
                Updated_at = DateTime.Now
            };

            _context.GhnOrders.Add(ghnOrder);

            // Cập nhật trạng thái GHN của hóa đơn
            hoaDon.Ghn = "Đã lên đơn";
            hoaDon.status = "Chờ lấy hàng";
            hoaDon.UpdatedBy = hotenToken;
            _context.HoaDons.Update(hoaDon);



            await _context.SaveChangesAsync();

            return Ok(new { message = "Tạo đơn hàng thành công.", ghn_order_id = ghnOrderId });
        }




        // Hàm lấy thông tin khách hàng
        private KhachHang GetKhachHangById(int id)
        {
            return _context.KhachHangs
                .Include(kh => kh.HoaDons)
                .ThenInclude(hd => hd.HoaDonChiTiets)
                .ThenInclude(hdct => hdct.SanPham)
                .FirstOrDefault(kh => kh.Id == id);
        }
        /// <summary>
        /// Xóa khách hàng theo {id} 
        /// </summary>
        /// <returns> Xóa khách hàng theo {id} </returns>

        // DELETE: api/KhachHang/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteKhachHang(int id)
        {

            var KhachHang = await _context.KhachHangs.FindAsync(id);

            if (KhachHang == null)
            {
                return NotFound(new { mewssage = " không tìm thấy khách hàng với id này" });
            }

            _context.KhachHangs.Remove(KhachHang);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { mesaage = " Xóa khách hàng thành công" });

        }

        /// <summary>
        /// Lấy tổng số khách hàng mới trong tháng hiện tại
        /// </summary>
        /// <returns> Tổng số khách hàng mới trong tháng hiện tại </returns>

        // GET: api/KhachHang/NewCustomersInMonth
        [HttpGet("khachhangthangmoi")]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO<object>>> LayTongKhachHangMoiTrongThang()
        {
            var thangHientai = DateTime.Now.Month;
            var namHientai = DateTime.Now.Year;

            // Lọc các khách hàng có Created_at trong tháng hiện tại
            var tongSoKhachHangMoi = await _context.KhachHangs
                .Where(kh => kh.Created_at.Month == thangHientai && kh.Created_at.Year == namHientai)
                .CountAsync();

            // Tạo đối tượng phản hồi
            var response = new
            {
                tongSoKhachHangMoi = tongSoKhachHangMoi,
                thangHienTai = thangHientai,
                namHienTai = namHientai
            };

            return Ok(new BaseResponseDTO<object>
            {
                Code = 0,
                Message = "Success",
                Data = response
            });
        }


        // Phương thức kiểm tra sự tồn tại của KhachHang
        private bool KhachHangExists(int id)
        {
            return _context.KhachHangs.Any(e => e.Id == id);
        }


        // hàm lấy tên sản phẩm và đon vị tính 
        //private async Task<(string SanphamNames, string SanphamDonViTinh, bool IsDeleted)> GetSanPhamDetails(string sanPhamIds)
        //{
        //    if (string.IsNullOrWhiteSpace(sanPhamIds))
        //    {
        //        return (null, null, false); // Nếu chuỗi rỗng hoặc chỉ có khoảng trắng, trả về null
        //    }

        //    // Tách chuỗi sanPhamIds thành danh sách các ID
        //    var ids = sanPhamIds.Trim('[', ']').Split(',')
        //        .Select(id =>
        //        {
        //            int result;
        //            return int.TryParse(id, out result) ? result : (int?)null;
        //        })
        //        .Where(id => id.HasValue)  // Lọc bỏ các giá trị null
        //        .Select(id => id.Value)
        //        .ToList();

        //    if (!ids.Any())
        //    {
        //        return (null, null, false); // Nếu không có ID hợp lệ, trả về null
        //    }

        //    // Lấy thông tin sản phẩm từ cơ sở dữ liệu, bao gồm các sản phẩm đã xóa và chưa xóa
        //    var sanphams = await _context.Sanpham
        //        .Where(sp => ids.Contains(sp.Id)) // Lấy tất cả sản phẩm theo ID
        //        .Select(sp => new
        //        {
        //            sp.Tieude,  // Tên sản phẩm
        //            sp.don_vi_tinh, // Đơn vị tính
        //            sp.Xoa // Kiểm tra xem sản phẩm có bị xóa không
        //        })
        //        .ToListAsync();

        //    if (!sanphams.Any())
        //    {
        //        return (null, null, false); // Nếu không có sản phẩm hợp lệ, trả về null
        //    }

        //    // Kiểm tra xem sản phẩm có bị xóa không và trả về tên/đơn vị tính phù hợp
        //    string sanphamNames = string.Join(", ", sanphams.Select(sp => sp.Xoa ? $"{sp.Tieude} (Đã xóa)" : sp.Tieude));
        //    string donViTinh = string.Join(", ", sanphams.Select(sp => sp.Xoa ? $"{sp.don_vi_tinh} (Đã xóa)" : sp.don_vi_tinh));

        //    // Trả về thông tin tên sản phẩm, đơn vị tính và trạng thái bị xóa
        //    return (sanphamNames, donViTinh, sanphams.Any(sp => sp.Xoa));
        //}


    }
}