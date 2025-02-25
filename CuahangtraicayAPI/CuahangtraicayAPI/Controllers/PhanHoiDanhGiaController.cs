﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhanHoiDanhGiaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PhanHoiDanhGiaController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
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
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<PhanHoiDanhGia>> CreatePhanHoi([FromBody] PhanhoiDTO.PhanhoiPOSTDTO dto)
        {
            // Kiểm tra đánh giá tồn tại không
            var danhgia = await _context.DanhGiaKhachHang.FindAsync(dto.danhgia_id);
            if (danhgia == null)
                return BadRequest(new { message = "Đánh giá không tồn tại" });

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            // Thêm phản hồi mới
            var newPhanHoi = new PhanHoiDanhGia
            {
                danhgia_id = dto.danhgia_id,
                noi_dung = dto.noi_dung,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken
            };

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Phản hồi đánh giá {newPhanHoi.Id} - {newPhanHoi.noi_dung}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.PhanHoiDanhGias.Add(newPhanHoi);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPhanHoiByDanhGiaId), new { danhgiaId = newPhanHoi.danhgia_id }, newPhanHoi);
        }


        /// <summary>
        /// Cập nhật phản hồi
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> UpdatePhanHoi(int id, PhanhoiDTO.PhanhoiPUTDTO dto)
        {
            var editPhanHoi = await _context.PhanHoiDanhGias.FindAsync(id);
            if (editPhanHoi == null)
                return NotFound(new { message = "Phản hồi không tồn tại" });

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            editPhanHoi.noi_dung = dto.noi_dung;
            editPhanHoi.UpdatedBy = hotenToken;
            editPhanHoi.Updated_at = DateTime.Now;

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Chỉnh sử phản hồi {editPhanHoi.Id} - {editPhanHoi.noi_dung}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Logss.Add(log);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Phản hồi đã được cập nhật thành công" });
        }

        /// <summary>
        /// Xóa phản hồi theo ID
        /// </summary>
        [HttpDelete("{id}")]
       [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<PhanHoiDanhGia>>> DeletePhanHoi(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var phanhoi = await _context.PhanHoiDanhGias.FindAsync(id);
            if (phanhoi == null)
                return NotFound(new { message = "Phản hồi không tồn tại" });


            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa phản hồi {phanhoi.Id} - {phanhoi.noi_dung}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.PhanHoiDanhGias.Remove(phanhoi);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<PhanHoiDanhGia> {Code=200, Message = "Phản hồi đã được xóa thành công" });
        }
        /// <summary>
        /// Phản hồi đánh giá tự động
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>Phản hồi đánh giá tự động</returns>
        [HttpPost("Phanhoi-tudong")]
        [Authorize(Roles = "Admin")]
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
        /// <summary>
        /// tắt phản hồi đánh giá tự động
        /// </summary>
        /// <returns>tắt phản hồi đánh giá tự động</returns>

        [HttpPost("tat-phanhoi")]
        [Authorize(Roles = "Admin")]
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



        /// <summary>
        /// api xem đánh giá tự động có được bật hay k 
        /// </summary>
        /// <returns>api xem đánh giá tự động có được bật hay k </returns>

        [HttpGet("danhgiatudong")]
        public async Task<IActionResult> GetallPhanhoitudon()
        {
            var danhgia = await _context.AdminResponses.FirstOrDefaultAsync();
            return Ok(danhgia);
        }

    }
}
