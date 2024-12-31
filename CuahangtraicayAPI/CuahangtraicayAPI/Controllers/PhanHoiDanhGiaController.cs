using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.DTO;
using Microsoft.AspNetCore.Authorization;

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


            // Thêm phản hồi mới
            var newPhanHoi = new PhanHoiDanhGia
            {
                danhgia_id = dto.danhgia_id,
                noi_dung = dto.noi_dung,
                CreatedBy = dto.CreatedBy,
                UpdatedBy = dto.UpdatedBy
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

            editPhanHoi.noi_dung = dto.noi_dung;
            editPhanHoi.UpdatedBy = dto.UpdatedBy;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Phản hồi đã được cập nhật thành công" });
        }

        /// <summary>
        /// Xóa phản hồi theo ID
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePhanHoi(int id)
        {
            var phanhoi = await _context.PhanHoiDanhGias.FindAsync(id);
            if (phanhoi == null)
                return NotFound(new { message = "Phản hồi không tồn tại" });

            _context.PhanHoiDanhGias.Remove(phanhoi);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Phản hồi đã được xóa thành công" });
        }
    }
}
