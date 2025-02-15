﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model; // Đảm bảo đúng namespace của model Admin
using BCrypt.Net;
using CuahangtraicayAPI.DTO;
using Microsoft.Extensions.Caching.Memory;
using System.Net.Mail;
using System.Net;
using static CuahangtraicayAPI.DTO.LoginDTO;
using CuahangtraicayAPI.Model.DB;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;

        public AdminController(AppDbContext context, IConfiguration configuration, IMemoryCache cache)
        {
            _context = context;
            _configuration = configuration;
            _cache = cache;
        }


        /// <summary>
        ///login Admin
        /// </summary>
        /// <returns>login Admin</returns>
        // POST: api/Admin/login
        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginDTO.LoginRequest request)
        //{
        //    // Tìm kiếm user trong cơ sở dữ liệu dựa trên username
        //    var admin = await _context.Admins.SingleOrDefaultAsync(a => a.Username == request.Username);

        //    // Nếu user tồn tại và mật khẩu hợp lệ, tiến hành tạo token
        //    if (admin != null && BCrypt.Net.BCrypt.Verify(request.Password, admin.Password))
        //    {
        //        // Tạo JWT token
        //        var token = GenerateJwtToken(admin.Username);

        //        return Ok(new
        //        {
        //            status = "Đăng nhập thành công",
        //            token = token,
        //            hoten = admin.hoten
        //        });
        //    }

        //    // Nếu không thành công, trả về lỗi xác thực
        //    return Unauthorized(new { status = "error", message = "Thông tin không hợp lệ, vui lòng kiểm tra lại" });
        //}

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO.LoginRequest request)
        {
            // Tìm admin theo username
            var admin = await _context.Admins.SingleOrDefaultAsync(a => a.Username == request.Username);

            if (admin != null && BCrypt.Net.BCrypt.Verify(request.Password, admin.Password))
            {
                // Kiểm tra email của tài khoản
                if (string.IsNullOrEmpty(admin.Email))
                {
                    return BadRequest(new { status = "error", message = "Email của tài khoản chưa được cấu hình." });
                }

                // Tạo mã OTP
                var otpCode = new Random().Next(100000, 999999).ToString();

                // Lưu OTP và Username vào MemoryCache
                _cache.Set("current-otp", otpCode, TimeSpan.FromMinutes(5));
                _cache.Set("current-username", admin.Username, TimeSpan.FromMinutes(5));

                Console.WriteLine($"[DEBUG] OTP: {otpCode}, Username: {admin.Username}, Email: {admin.Email}");

                // Gửi OTP qua email của tài khoản đăng nhập
                //await SendEmail(admin.Email, "Mã xác thực đăng nhập", $"Mã OTP của bạn là: {otpCode}");

                //gửi otp sử dụng tak run tránh việc chờ gữi mail trước 
#pragma warning disable CS4014 // bỏ qua lỗi warnings
                Task.Run(() =>
                {
                    string htmlBody = $@"
        <div style='font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;'>
            <div style='max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden;'>
                <div style='background-color: #007bff; color: #ffffff; text-align: center; padding: 20px 0;'>
                    <h2 style='margin: 0;'>Cửa hàng trái cây</h2>
                </div>
                <div style='padding: 20px;'>
                    <h3>Xin chào,</h3>
                    <p style='font-size: 16px;'>Mã xác thực OTP của bạn là:</p>
                    <p style='font-size: 24px; font-weight: bold; text-align: center; color: #007bff;'>{otpCode}</p>
                    <p style='font-size: 14px; color: #666;'>Mã này có hiệu lực trong 5 phút.</p>
                    <hr style='border: none; border-top: 1px solid #eeeeee; margin: 20px 0;' />
                    <p style='font-size: 14px; color: #666;'>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
                </div>
                <div style='background-color: #f4f4f4; text-align: center; padding: 10px 0; font-size: 12px; color: #666;'>
                    <p style='margin: 0;'>© 2024 Cửa hàng trái cây. Mọi quyền được bảo lưu.</p>
                </div>
            </div>
        </div>";

                    SendEmail(admin.Email, "Mã xác thực đăng nhập", htmlBody);
                });

                return Ok(new
                {
                    status = "success",
                    message = $"Mã xác thực đã được gửi đến email: {FormatEmailForDisplay(admin.Email)}"
                });
            }

            return Unauthorized(new { status = "error", message = "Thông tin không hợp lệ, vui lòng kiểm tra lại." });
        }


        // Hàm định dạng email giống Telegram
        private string FormatEmailForDisplay(string email)
        {
            var atIndex = email.IndexOf("@");
            if (atIndex <= 1) return email; // Nếu email không hợp lệ hoặc có ít hơn 2 ký tự trước @, trả về nguyên email

            var domain = email.Substring(atIndex); // Lấy phần sau @
            var visiblePart = email.Substring(0, 1); // Ký tự đầu tiên của email

            return visiblePart + "*****" + domain; // Chỉ hiển thị ký tự đầu và phần domain
        }

        /// <summary>
        /// Xác thực mã OTP
        /// </summary>
        /// <returns>Xác thực mã OTP</returns>
        // POST: api/Admin/verify-otp
        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] string otp)
        {
            // Lấy mã OTP từ cache
            if (_cache.TryGetValue("current-otp", out string cachedOtp) && _cache.TryGetValue("current-username", out string username))
            {
                Console.WriteLine($"[DEBUG] OTP từ cache: {cachedOtp}, OTP nhận: {otp}, Username: {username}");

                if (cachedOtp == otp)
                {
                    _cache.Remove("current-otp"); // Xóa OTP sau khi xác thực thành công
                    _cache.Remove("current-username"); // Xóa Username khỏi cache

                    // Lấy thông tin "hoten" từ cơ sở dữ liệu
                    var admin = _context.Admins.FirstOrDefault(a => a.Username == username);
                    var hoten = admin?.hoten ?? "Admin"; // Nếu không tìm thấy, trả mặc định là "Admin"

                    // Tạo JWT token
                    var token = GenerateJwtToken(username);

                    return Ok(new
                    {
                        status = "success",
                        message = "Xác thực thành công.",
                        token = token,
                        hoten = hoten // Trả thêm "hoten"
                    });
                }
            }

            return Unauthorized(new { status = "error", message = "Mã xác thực không hợp lệ hoặc đã hết hạn." });
        }



        private async Task SendEmail(string toEmail, string subject, string body)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");

            if (string.IsNullOrEmpty(emailSettings["SMTPServer"]) ||
                string.IsNullOrEmpty(emailSettings["SMTPPort"]) ||
                string.IsNullOrEmpty(emailSettings["SenderEmail"]) ||
                string.IsNullOrEmpty(emailSettings["AppPassword"]))
            {
                throw new Exception("EmailSettings configuration is incomplete. Please check appsettings.json.");
            }

            string smtpServer = emailSettings["SMTPServer"];
            string senderEmail = emailSettings["SenderEmail"];
            string senderName = emailSettings["SenderName"];
            string appPassword = emailSettings["AppPassword"];

            if (!int.TryParse(emailSettings["SMTPPort"], out int smtpPort))
            {
                throw new Exception("Invalid SMTPPort value in EmailSettings.");
            }

            var smtpClient = new SmtpClient(smtpServer)
            {
                Port = smtpPort,
                Credentials = new NetworkCredential(senderEmail, appPassword),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail, senderName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(toEmail);

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to send email: {ex.Message}");
            }
        }

        //private string GetHotenFromToken(string token)
        //{
        //    var handler = new JwtSecurityTokenHandler();
        //    var jwtToken = handler.ReadJwtToken(token);

        //    // Lấy claim "hoten" từ token
        //    var hoten = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;
        //    return hoten;
        //}


        private string GenerateJwtToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Lấy thông tin "hoten" từ cơ sở dữ liệu
            var admin = _context.Admins.FirstOrDefault(a => a.Username == username);
            var hoten = admin?.hoten ?? "Admin";

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim("hoten", hoten), // Thêm họ tên vào claims
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
        /// Thêm mới tài khoản Admin (với xác nhận OTP qua email)
        /// </summary>
        /// <returns>Thêm mới tài khoản Admin</returns>
        // POST: api/Admin/add
        [HttpPost("add")]
        public async Task<IActionResult> AddAdmin([FromBody] LoginDTO.AddRequest request)
        {
            // Kiểm tra username và email đã tồn tại
            var existingUsername = await _context.Admins.SingleOrDefaultAsync(a => a.Username == request.Username);
            if (existingUsername != null)
            {
                return Conflict(new { status = "error", message = "Username đã tồn tại" });
            }

            var existingEmail = await _context.Admins.SingleOrDefaultAsync(em => em.Email == request.Email);
            if (existingEmail != null)
            {
                return Conflict(new { status = "error", message = "Email đã tồn tại" });
            }

            // Tạo mã OTP
            var otpCode = new Random().Next(100000, 999999).ToString();

            // Lưu OTP và thông tin đăng ký vào cache
            _cache.Set("current-otp", otpCode, TimeSpan.FromMinutes(5));
            _cache.Set("current-registration", request, TimeSpan.FromMinutes(5));

            // Gửi OTP qua email
            string htmlBody = $@"
    <div style='font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;'>
        <div style='max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden;'>
            <div style='background-color: #007bff; color: #ffffff; text-align: center; padding: 20px 0;'>
                <h2 style='margin: 0;'>Cửa hàng trái cây</h2>
            </div>
            <div style='padding: 20px;'>
                <h3>Xin chào {request.hoten},</h3>
                <p style='font-size: 16px;'>Cảm ơn bạn đã đăng ký tài khoản Admin. Mã xác thực OTP của bạn là:</p>
                <p style='font-size: 24px; font-weight: bold; text-align: center; color: #007bff;'>{otpCode}</p>
                <p style='font-size: 14px; color: #666;'>Mã này có hiệu lực trong 5 phút.</p>
                <hr style='border: none; border-top: 1px solid #eeeeee; margin: 20px 0;' />
                <p style='font-size: 14px; color: #666;'>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
            </div>
            <div style='background-color: #f4f4f4; text-align: center; padding: 10px 0; font-size: 12px; color: #666;'>
                <p style='margin: 0;'>© 2025 Cửa hàng trái cây. Mọi quyền được bảo lưu.</p>
            </div>
        </div>
    </div>";
#pragma warning disable CS4014
            Task.Run(() => SendEmail(request.Email, "Xác nhận đăng ký tài khoản Admin", htmlBody));
#pragma warning restore CS4014
            return Ok(new
            {
                status = "success",
                message = "Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và xác nhận."
            });
        }

        /// <summary>
        /// Xóa tài khoản Admin
        /// </summary>
        /// <returns>Xóa tài khoản Admin</returns>
        // DELETE: api/Admin/delete/{username}
        [HttpDelete("delete/{id}")]
     
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

        /// <summary>
        /// Xác nhận OTP và hoàn tất đăng ký
        /// </summary>
        /// <returns>Xác nhận OTP</returns>
        // POST: api/Admin/verify-registration
        [HttpPost("verify-registration")]
        public async Task<IActionResult> VerifyRegistration([FromBody] VerifyOtpRequest request)
        {
            // Lấy OTP và thông tin đăng ký từ cache
            if (_cache.TryGetValue("current-otp", out string cachedOtp) &&
                _cache.TryGetValue("current-registration", out LoginDTO.AddRequest cachedRequest))
            {
                if (cachedOtp == request.Otp)
                {
                    // Hash mật khẩu bằng BCrypt
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(cachedRequest.Password);

                    // Tạo đối tượng admin mới
                    var newAdmin = new Admin
                    {
                        hoten = cachedRequest.hoten,
                        Email = cachedRequest.Email,
                        Username = cachedRequest.Username,
                        Password = hashedPassword
                    };

                    // Lưu vào cơ sở dữ liệu
                    _context.Admins.Add(newAdmin);
                    await _context.SaveChangesAsync();

                    // Xóa cache
                    _cache.Remove("current-otp");
                    _cache.Remove("current-registration");

                    return Ok(new { status = "success", message = "Đăng ký thành công" });
                }
            }

            return Unauthorized(new { status = "error", message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            // Lấy token từ header Authorization
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { status = "error", message = "Token không hợp lệ." });
            }

            // Thêm token vào danh sách bị thu hồi
            _cache.Set($"revoked-token-{token}", true, TimeSpan.FromDays(7)); // Token bị vô hiệu trong 7 ngày (hoặc thời hạn của token)

            return Ok(new { status = "success", message = "Đăng xuất thành công. Token đã bị vô hiệu hóa." });
        }

    }


}
