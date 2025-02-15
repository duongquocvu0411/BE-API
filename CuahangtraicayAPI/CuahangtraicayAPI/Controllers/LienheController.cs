using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LienHeController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IHttpContextAccessor _httpContextAccessor;
        public LienHeController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Lấy danh sách liên hệ
        /// </summary>
        /// <returns> Lấy danh sách liên hệ </returns>

        // GET: api/LienHe
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<Lienhe>>>> GetLienHes()
        {
            var lh =await _context.Lienhes.ToListAsync();
            return Ok(new BaseResponseDTO<IEnumerable<Lienhe>>
            {
                Data = lh,
                Message = "Success"

            });
        }

        /// <summary>
        ///  Thêm mới liên hệ
        /// </summary>
        /// <returns> Thêm mới liên hệ  </returns>

        // POST: api/LienHe
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO< Lienhe>>> PostLienHe(Lienhe lienHe)
        {
            //lienHe.created_at = DateTime.UtcNow;
            //lienHe.updated_at = DateTime.UtcNow;

            _context.Lienhes.Add(lienHe);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Lienhe>
            {
                Data= lienHe,
                Message="Success"
            });
        }

        /// <summary>
        /// Xóa liên hệ theo {id}
        /// </summary>
        /// <returns>  Xóa liên hệ theo {id} </returns>

        // DELETE: api/LienHe/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Lienhe>>> DeleteLienHe(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var lienHe = await _context.Lienhes.FindAsync(id);
            if (lienHe == null)
            {
                return BadRequest(new BaseResponseDTO<Lienhe>{ Code=404, Message= "Không tìm thấy liên hệ!" });
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa liên hệ {lienHe.id} - {lienHe.email}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };
            _context.Lienhes.Remove(lienHe);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Lienhe>{ Code=404,Message = "Liên hệ đã được xóa thành công!" });
        }
    }
}
