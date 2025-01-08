using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using static CuahangtraicayAPI.DTO.FooterDto;
using static CuahangtraicayAPI.DTO.TenFooterDTO;

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
        [Authorize]
        public async Task<ActionResult<Footer>> CreateFooter([FromBody] DTO.FooterDto.FooterCreateDto dto)
        {

            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;
            var footer = new Footer
            {
                NoiDungFooter = dto.NoiDungFooter,
                //UpdatedBy = dto.UpdatedBy,
                TrangThai = dto.Trangthai,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken,
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
        [Authorize]
        public async Task<IActionResult> UpdateFooter(int id, [FromBody] DTO.FooterDto.FooterUpdateDto footerDto)
        {
            var footer = await _context.Footers.FindAsync(id);
            if (footer == null)
            {
                return NotFound();
            }
            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;

            footer.NoiDungFooter = footerDto.NoiDungFooter;
            //footer.UpdatedBy = footerDto.UpdatedBy;
            if (footerDto.Trangthai.HasValue)
            {
                footer.TrangThai = footerDto.Trangthai.Value;
            }

            footer.UpdatedBy = hotenToken;
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
        [Authorize]
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

        ///// <summary>
        ///// Đặt trạng thái Footer được sử dụng (TrangThai = 1) và các Footer khác về trạng thái không hoạt động (TrangThai = 0).
        ///// </summary>
        ///// <param name="id">ID của Footer cần đặt làm sử dụng.</param>
        ///// <param name="setDto">Thông tin người thực hiện cập nhật.</param>
        ///// <returns>Trạng thái cập nhật.</returns>

        [HttpPost("setFooter/{id}")]
        [Authorize]
        public async Task<IActionResult> setFooter(int id, [FromBody] DTO.FooterDto.SetFooterDTO dto)
        {
            // Kiểm tra tính hợp lệ của DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy tất cả các Footer
            var allFooters = await _context.Footers.ToListAsync();

            // Tìm Footer cần cập nhật
            var footerToUpdate = allFooters.FirstOrDefault(f => f.Id == id);
            if (footerToUpdate == null)
            {
                return NotFound(new { message = "Không tìm thấy Footer với id này." });
            }
            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;
            // Cập nhật trạng thái cho tất cả các Footer
            foreach (var footer in allFooters)
            {
                footer.TrangThai = 0; // Đặt trạng thái mặc định cho tất cả

                // Chỉ cập nhật `Updated_By` cho Footer được chọn
                if (footer.Id == id)
                {
                    footer.TrangThai = 1; // Cập nhật trạng thái cho Footer được chọn
                    footer.UpdatedBy =hotenToken; // Ghi lại người thực hiện
                }
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { message = "Footer đã được chọn làm Footer đang sử dụng." });
        }

    }
}
