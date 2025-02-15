﻿using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Model.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using static CuahangtraicayAPI.DTO.FooterDto;
using static CuahangtraicayAPI.DTO.TenFooterDTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FooterController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IHttpContextAccessor _httpContextAccessor;
        public FooterController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Footer>> CreateFooter([FromBody] DTO.FooterDto.FooterCreateDto dto)
        {
            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            var footer = new Footer
            {
                NoiDungFooter = dto.NoiDungFooter,
                //UpdatedBy = dto.UpdatedBy,
                TrangThai = dto.Trangthai,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken,
            };
            var log = new Logs
            {
                UserId = users,
                HanhDong = "Thêm mới Footer " + " " + footer.Id,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Footers.Add(footer);
            _context.Logss.Add(log);
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFooter(int id, [FromBody] DTO.FooterDto.FooterUpdateDto footerDto)
        {

            var footer = await _context.Footers.FindAsync(id);
            if (footer == null)
            {
                return NotFound();
            }
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            footer.NoiDungFooter = footerDto.NoiDungFooter;
            //footer.UpdatedBy = footerDto.UpdatedBy;
            if (footerDto.Trangthai.HasValue)
            {
                footer.TrangThai = footerDto.Trangthai.Value;
            }

            footer.UpdatedBy = hotenToken;
            footer.Updated_at = DateTime.Now;

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Chỉnh sửa Footer " + " " + footer.Id,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };


            _context.Entry(footer).State = EntityState.Modified;
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Xóa một Footer.
        /// </summary>
        /// <param name="id">ID của Footer cần xóa.</param>
        /// <returns>Trạng thái xóa.</returns>

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFooter(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin


            var footer = await _context.Footers.FindAsync(id);
            if (footer == null)
            {
                return NotFound();
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Xóa Footer " + " " + footer.Id,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Footers.Remove(footer);
            _context.Logss.Add(log);
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
        [Authorize(Roles = "Admin")]
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
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            // Cập nhật trạng thái cho tất cả các Footer

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

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

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Sử dụng Footer " + " " + footerToUpdate.Id,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };
            _context.Logss.Add(log);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { message = "Footer đã được chọn làm Footer đang sử dụng." });
        }

    }
}
