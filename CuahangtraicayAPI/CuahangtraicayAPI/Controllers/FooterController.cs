using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static CuahangtraicayAPI.DTO.FooterDto;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FooterController : ControllerBase
    {
        private readonly AppDbContext _context;


        public FooterController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả các Footer.
        /// </summary>
        /// <returns>Danh sách các Footer.</returns>


        [HttpGet]
        public async Task<IEnumerable<Footer>> GetFooter()
        {
            return await _context.Footers.ToListAsync();
        }

        /// <summary>
        /// Lấy danh sách các Footer đang hoạt động (TrangThai = 1).
        /// </summary>
        /// <returns>Danh sách Footer đang hoạt động.</returns>

        [HttpGet("active")]
        public async Task<IEnumerable<Footer>> GetActiveFooters()
        {
            return await _context.Footers.Where(f => f.TrangThai == 1).ToListAsync();
        }

        /// <summary>
        /// Lấy thông tin chi tiết của một Footer theo ID.
        /// </summary>
        /// <param name="id">ID của Footer cần lấy thông tin.</param>
        /// <returns>Thông tin chi tiết của Footer.</returns>

        [HttpGet("{id}")]
        public async Task<ActionResult<Footer>> GetFooter(int id)
        {
            var footer = await _context.Footers.FindAsync(id);

            if (footer == null)
            {
                return NotFound();
            }

            return Ok(footer);
        }

        /// <summary>
        /// Tạo mới một Footer.
        /// </summary>
        /// <param name="dto">Dữ liệu để tạo Footer mới.</param>
        /// <returns>Footer vừa được tạo.</returns>

        [HttpPost]
        public async Task<ActionResult<Footer>> CreateFooter([FromBody] DTO.FooterDto.FooterCreateDto dto)
        {
            var footer = new Footer
            {
                NoiDungFooter = dto.NoiDungFooter,
                UpdatedBy = dto.UpdatedBy,
                TrangThai = dto.Trangthai
            };
            _context.Footers.Add(footer);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetFooter",new { Id = footer.Id },footer);
        }

        /// <summary>
        /// Cập nhật thông tin của một Footer.
        /// </summary>
        /// <param name="id">ID của Footer cần cập nhật.</param>
        /// <param name="footerDto">Dữ liệu cần cập nhật.</param>
        /// <returns>Trạng thái cập nhật.</returns>

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFooter(int id, [FromBody] DTO.FooterDto.FooterUpdateDto footerDto)
        {
            var footer = await _context.Footers.FindAsync(id);
            if (footer == null)
            {
                return NotFound();
            }

            footer.NoiDungFooter = footerDto.NoiDungFooter;
            footer.UpdatedBy = footerDto.UpdatedBy;
            if (footerDto.Trangthai.HasValue)
            {
                footer.TrangThai = footerDto.Trangthai.Value;
            }
            footer.Updated_at = DateTime.Now;

            _context.Entry(footer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Xóa một Footer.
        /// </summary>
        /// <param name="id">ID của Footer cần xóa.</param>
        /// <returns>Trạng thái xóa.</returns>

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFooter(int id)
        {
            var footer = await _context.Footers.FindAsync(id);
            if (footer == null)
            {
                return NotFound();
            }

            _context.Footers.Remove(footer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
