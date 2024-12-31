using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model; // Đảm bảo đúng namespace của model Admin
using BCrypt.Net;
using CuahangtraicayAPI.DTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AdminController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        /// <summary>
        ///login Admin
        /// </summary>
        /// <returns>login Admin</returns>
        // POST: api/Admin/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO.LoginRequest request)
        {
            // Tìm kiếm user trong cơ sở dữ liệu dựa trên username
            var admin = await _context.Admins.SingleOrDefaultAsync(a => a.Username == request.Username);

            // Nếu user tồn tại và mật khẩu hợp lệ, tiến hành tạo token
            if (admin != null && BCrypt.Net.BCrypt.Verify(request.Password, admin.Password))
            {
                // Tạo JWT token
                var token = GenerateJwtToken(admin.Username);

                return Ok(new
                {
                    status = "Đăng nhập thành công",
                    token = token,
                    hoten = admin.hoten
                });
            }

            // Nếu không thành công, trả về lỗi xác thực
            return Unauthorized(new { status = "error", message = "Thông tin không hợp lệ, vui lòng kiểm tra lại" });
        }


        private string GenerateJwtToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        /// <summary>
        ///Thêm mới tài khoản Admin
        /// </summary>
        /// <returns>Thêm mới tài khoản Admin</returns>
        // POST: api/Admin/add
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddAdmin([FromBody] LoginDTO.AddRequest request)
        {
            // Kiểm tra username đã tồn tại chưa
            var existingAdmin = await _context.Admins.SingleOrDefaultAsync(a => a.Username == request.Username);
            if (existingAdmin != null)
            {
                return Conflict(new { status = "error", message = "Username đã tồn tại" });
            }

            // Hash mật khẩu bằng BCrypt
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Tạo đối tượng admin mới
            var newAdmin = new Admin
            {
                hoten = request.hoten,
                Username = request.Username,
                Password = hashedPassword
            };

            // Lưu vào cơ sở dữ liệu
            _context.Admins.Add(newAdmin);
            await _context.SaveChangesAsync();

            return Ok(new { status = "success", message = "Admin đã được thêm thành công" });
        }
        /// <summary>
        /// Xóa tài khoản Admin
        /// </summary>
        /// <returns>Xóa tài khoản Admin</returns>
        // DELETE: api/Admin/delete/{username}
        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            // Tìm kiếm admin trong cơ sở dữ liệu dựa trên id
            var admin = await _context.Admins.SingleOrDefaultAsync(a => a.Id == id);

            // Nếu không tìm thấy admin, trả về lỗi không tìm thấy
            if (admin == null)
            {
                return NotFound(new { status = "error", message = "Admin không tồn tại" });
            }

            // Xóa admin khỏi cơ sở dữ liệu
            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return Ok(new { status = "success", message = "Admin đã được xóa thành công" });
        }
    }

   
}
