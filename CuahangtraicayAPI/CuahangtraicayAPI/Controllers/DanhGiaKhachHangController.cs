using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Model.DB;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CuahangtraicayAPI.DTO;


namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhGiaKhachHangController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DanhGiaKhachHangController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        /// <summary>
        /// lấy danh sách của Đánh giá khách hàng
        /// </summary>
        /// <returns> lấy danh sách của Đánh giá khách hàng</returns>
        // GET: api/DanhGiaKhachHang
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanhGiaKhachHang>>> GetDanhGiaKhachHang([FromQuery] int? sanphams_id)
        {
            if (sanphams_id.HasValue)
            {
                var danhgias = await _context.DanhGiaKhachHang
                    .Where(dg => dg.sanphams_id == sanphams_id.Value)
                    .Include(dg => dg.Sanpham)
                    .Include(dg => dg.PhanHoi)
                    .ToListAsync();

                if (!danhgias.Any())
                    return Ok(new { message = "Không có đánh giá cho sản phẩm này" });

                return danhgias;
            }
            else
            {
                var danhgias = await _context.DanhGiaKhachHang.Include(dg => dg.Sanpham).ToListAsync();

                if (!danhgias.Any())
                    return NoContent();

                return danhgias;
            }
        }

        /// <summary>
        /// Lấy đánh giá khách hàng theo {id_sanpham}
        /// </summary>
        /// <returns> Lấy đánh giá khách hàng theo {id_sanpham}</returns>

        // GET: api/DanhGiaKhachHang/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DanhGiaKhachHang>> GetDanhGiaKhachHangById(int id)
        {
            var danhgia = await _context.DanhGiaKhachHang.Include(dg => dg.Sanpham) .Include(dg=> dg.PhanHoi).FirstOrDefaultAsync(dg => dg.Id == id);

            if (danhgia == null)
                return NotFound(new { message = "Đánh giá không tồn tại" });

            return danhgia;
        }


        /// <summary>
        ///  Thêm mới 1 đánh giá  của {id_sanpham}
        /// </summary>
        /// <returns> Thêm mới 1 đánh giá của {id_sanpham}  </returns>

        // POST: api/DanhGiaKhachHang
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<BaseResponseDTO<DanhGiaKhachHang>>> CreateDanhGiaKhachHang([FromBody] DanhGiaKhachHangDTO dto, [FromQuery] int hoadonId)
        {
            // 1. Kiểm tra DTO hợp lệ
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // 2. Kiểm tra sản phẩm tồn tại
            if (!_context.Sanpham.Any(sp => sp.Id == dto.sanphams_id))
            {
                return BadRequest(new { message = "Sản phẩm không tồn tại" });
            }

            // 3. Lấy thông tin người dùng từ token
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || hotenToken == null)
            {
                return BadRequest(new { message = "Không lấy được thông tin người dùng từ token." });
            }

            // 4. Tìm khách hàng theo userId
            var khachhang = await _context.KhachHangs.FirstOrDefaultAsync(kh => kh.UserNameLogin == userId);
            if (khachhang == null)
            {
                return BadRequest(new { message = "Khách hàng không tồn tại." });
            }

            // 5. Kiểm tra hóa đơn tồn tại và thuộc về khách hàng
            var hoadon = await _context.HoaDons.Include(h => h.KhachHang)
                .FirstOrDefaultAsync(hd => hd.Id == hoadonId && hd.KhachHang.UserNameLogin == userId);
            if (hoadon == null)
            {
                return BadRequest(new { message = "Hóa đơn không tồn tại hoặc không thuộc về khách hàng này." });
            }

            // 6. Kiểm tra trạng thái hóa đơn (chỉ đánh giá nếu đã giao hàng)
            if (hoadon.status != "delivered")
            {
                return BadRequest(new { message = "Hóa đơn chưa giao thành công." });
            }

            // 7. kiểm tra xem quá thời gian giao hàng dược phép đánh giá chưa

            if (hoadon.Updated_at.HasValue && (DateTime.Now - hoadon.Updated_at.Value) > TimeSpan.FromHours(24))
            {
                return BadRequest(new { message = "Đã quá thời gian đánh giá (24h kể từ khi giao hàng)." });
            }

            // 8. Kiểm tra xem sản phẩm có trong chi tiết hóa đơn không
            bool damuaSPtrongDonHang = await _context.HoaDonChiTiets.AnyAsync(hdct =>
                hdct.sanpham_ids == dto.sanphams_id &&
                hdct.bill_id == hoadon.Id);

            if (!damuaSPtrongDonHang)
            {
                return BadRequest(new { message = "Sản phẩm không có trong đơn hàng này." });
            }

            // 9. Kiểm tra xem sản phẩm đã được đánh giá trong đơn hàng này chưa
            bool danhGiaSanPhamDaTonTai = await _context.DanhGiaKhachHang.AnyAsync(dg =>
                dg.hoadon_id == hoadonId && dg.sanphams_id == dto.sanphams_id);

            if (danhGiaSanPhamDaTonTai)
            {
                return BadRequest(new { message = "Bạn đã đánh giá sản phẩm này trong đơn hàng này rồi." });
            }
          

            // 10. Tạo đánh giá
            var danhgia = new DanhGiaKhachHang
            {
                sanphams_id = dto.sanphams_id,
                ho_ten = khachhang.Ho + " " + khachhang.Ten,
                User_Id = userId,
                tieude = dto.tieude,
                so_sao = dto.so_sao,
                noi_dung = dto.noi_dung,
                hoadon_id = hoadonId
            };

            _context.DanhGiaKhachHang.Add(danhgia);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<DanhGiaKhachHang>
            {
                Message = "Success",
                Data = danhgia
            };
        }



        /// <summary>
        ///  Xóa 1 đánh giá theo {id} 
        /// </summary>
        /// <returns> Xóa 1 đánh giá theo {id}  </returns>

        // DELETE: api/DanhGiaKhachHang/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDanhGiaKhachHang(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin
            var danhgia = await _context.DanhGiaKhachHang.FindAsync(id);

            if (danhgia == null)
                return NotFound(new { message = "Đánh giá không tồn tại" });

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Xóa đánh giá " + " " + danhgia.noi_dung,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

           
            _context.DanhGiaKhachHang.Remove(danhgia);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đánh giá đã được xóa thành công" });
        }
    }
}
