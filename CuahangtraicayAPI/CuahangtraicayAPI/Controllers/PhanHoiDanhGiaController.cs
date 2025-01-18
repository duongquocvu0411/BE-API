using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhanHoiDanhGiaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PhanHoiDanhGiaController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy phản hồi theo đánh giá ID
        /// </summary>
        [HttpGet("{danhgiaId}")]
        public async Task<ActionResult> GetPhanHoiByDanhGiaId(int danhgiaId)
        {
            var phanhoi = await _context.PhanHoiDanhGias
                .Include(p => p.DanhGia)
                .Where(p => p.danhgia_id == danhgiaId)
                .Select(p => new
                {
                    p.Id,
                    p.danhgia_id,
                    p.noi_dung,
                    p.CreatedBy,
                    p.UpdatedBy,
                    p.Created_at,
                    p.Updated_at,
                    DanhGia = new
                    {
                        p.DanhGia.Id,
                        p.DanhGia.sanphams_id,
                        p.DanhGia.ho_ten,
                        p.DanhGia.tieude,
                        p.DanhGia.so_sao,
                        p.DanhGia.noi_dung,
                        p.DanhGia.Created_at,
                        p.DanhGia.Updated_at
                    }
                })
                .FirstOrDefaultAsync();

            if (phanhoi == null)
                return NotFound(new { message = "Phản hồi không tồn tại cho đánh giá này" });

            return Ok(phanhoi);
        }


        /// <summary>
        /// Tạo mới phản hồi cho đánh giá
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PhanHoiDanhGia>> CreatePhanHoi([FromBody] PhanhoiDTO.PhanhoiPOSTDTO dto)
        {
            // Kiểm tra đánh giá tồn tại không
            var danhgia = await _context.DanhGiaKhachHang.FindAsync(dto.danhgia_id);
            if (danhgia == null)
                return BadRequest(new { message = "Đánh giá không tồn tại" });

            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;

            // Thêm phản hồi mới
            var newPhanHoi = new PhanHoiDanhGia
            {
                danhgia_id = dto.danhgia_id,
                noi_dung = dto.noi_dung,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken
            };

            _context.PhanHoiDanhGias.Add(newPhanHoi);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPhanHoiByDanhGiaId), new { danhgiaId = newPhanHoi.danhgia_id }, newPhanHoi);
        }


        /// <summary>
        /// Cập nhật phản hồi
        /// </summary>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePhanHoi(int id, PhanhoiDTO.PhanhoiPUTDTO dto)
        {
            var editPhanHoi = await _context.PhanHoiDanhGias.FindAsync(id);
            if (editPhanHoi == null)
                return NotFound(new { message = "Phản hồi không tồn tại" });

            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;

            editPhanHoi.noi_dung = dto.noi_dung;
            editPhanHoi.UpdatedBy = hotenToken;
            editPhanHoi.Updated_at = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Phản hồi đã được cập nhật thành công" });
        }

        /// <summary>
        /// Xóa phản hồi theo ID
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO<PhanHoiDanhGia>>> DeletePhanHoi(int id)
        {
            var phanhoi = await _context.PhanHoiDanhGias.FindAsync(id);
            if (phanhoi == null)
                return NotFound(new { message = "Phản hồi không tồn tại" });

            _context.PhanHoiDanhGias.Remove(phanhoi);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<PhanHoiDanhGia> {Code=200, Message = "Phản hồi đã được xóa thành công" });
        }
        /// <summary>
        /// Phản hồi đánh giá tự động
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>Phản hồi đánh giá tự động</returns>
        [HttpPost("Phanhoi-tudong")]
        [Authorize]
        public async Task<IActionResult> SaveAdminResponse([FromBody] PhanhoiDTO.AdminResponseDTO dto)
        {
            var hientai = await _context.AdminResponses.FirstOrDefaultAsync();
            if (hientai == null)
            {
                var newResponse = new AdminResponse
                {
                    Noidung = dto.Noidung,
                    Trangthai = true,
                    Updated_at = DateTime.UtcNow,
                };
                _context.AdminResponses.Add(newResponse);
            }
            else
            {
                hientai.Noidung = dto.Noidung;
                hientai.Trangthai = true;
                hientai.Updated_at = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "phản hồi từ sytem thành công" });
        }


        [HttpPost("tat-phanhoi")]
        [Authorize]
        public async Task<IActionResult> DisAutoPhanhoi()
        {
            // Lấy nội dung phản hồi từ bảng AdminResponses
            var adminResponse = await _context.AdminResponses.FirstOrDefaultAsync();
            // Kiểm tra trạng thái hiện tại

            if (adminResponse.Trangthai == false)
            {
                return BadRequest(new { message = "Hệ thống chưa được bật" });
            }

           

           adminResponse.Trangthai = false;
            adminResponse.Updated_at = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Dịch vụ phản hồi tự động đã được tắt" });
        }

        [HttpGet("danhgiatudong")]
        public async Task<IActionResult> GetallPhanhoitudon()
        {
            var danhgia = await _context.AdminResponses.FirstOrDefaultAsync();
            return Ok(danhgia);
        }

    }
}
