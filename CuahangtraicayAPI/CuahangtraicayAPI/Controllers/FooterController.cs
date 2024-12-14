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


        [HttpGet]
        public async Task<IEnumerable<Footer>> GetFooter()
        {
            return await _context.Footers.ToListAsync();
        }

        [HttpGet("active")]
        public async Task<IEnumerable<Footer>> GetActiveFooters()
        {
            return await _context.Footers.Where(f => f.TrangThai == 1).ToListAsync();
        }

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
