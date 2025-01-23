using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;

using Microsoft.Extensions.Caching.Memory;
using CuahangtraicayAPI.Modles;
using CuahangtraicayAPI.Model.DB;
using Microsoft.AspNetCore.Authorization;
using CuahangtraicayAPI.Model.jwt;

namespace WebsiteQuanan.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        private readonly IMemoryCache _cache;

        public AuthenticateController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration ,
            AppDbContext context,
            IMemoryCache cache)
        
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
            _cache = cache;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                if (string.IsNullOrEmpty(user.Email))
                {
                    return BadRequest(new { status = "error", message = "Email của tài khoản chưa được cấu hình." });
                }
                // Kiểm tra trạng thái tài khoản trong UserProfile
                var userProfile = _context.UserProfiles.FirstOrDefault(a => a.UserId == user.Id);
                if (userProfile != null && userProfile.TrangThaiTK == 0) // 0: Bị khóa
                {
                    return Unauthorized(new
                    {
                        status = "error",
                        message = "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên."
                    });
                }
                var otpCode = new Random().Next(100000, 999999).ToString();

                // Lưu OTP và username vào MemoryCache với thời hạn 5 phút
                _cache.Set($"otp-{user.UserName}", otpCode, TimeSpan.FromMinutes(5));
                _cache.Set("current-username", user.UserName, TimeSpan.FromMinutes(5));

                Console.WriteLine($"[DEBUG] OTP: {otpCode}, Username: {user.UserName}, Email: {user.Email}");

                Task.Run(() =>
                {
                    var emailBody = $@"
            <div style='font-family: Arial, sans-serif;'>
                <h3>Xin chào {user.UserName},</h3>
                <p>Mã xác thực OTP của bạn là:</p>
                <h2 style='color: #007bff;'>{otpCode}</h2>
                <p>Vui lòng sử dụng mã này để đăng nhập. Mã OTP có hiệu lực trong 5 phút.</p>
                <hr />
                <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
            </div>";
                    SendEmail(user.Email, "Mã OTP đăng nhập", emailBody);
                });

                return Ok(new
                {
                    status = "success",
                    message = $"Mã xác thực đã được gửi đến email: {FormatEmailForDisplay(user.Email)}"
                });
            }

            return Unauthorized(new { status = "error", message = "Thông tin không hợp lệ, vui lòng kiểm tra lại." });
        }

        private string FormatEmailForDisplay(string email)
        {
            var atIndex = email.IndexOf("@");
            if (atIndex <= 1) return email; // Nếu email không hợp lệ hoặc có ít hơn 2 ký tự trước @, trả về nguyên email

            var domain = email.Substring(atIndex); // Lấy phần sau @
            var visiblePart = email.Substring(0, 1); // Ký tự đầu tiên của email

            return visiblePart + "*****" + domain; // Chỉ hiển thị ký tự đầu và phần domain
        }
        [HttpPost]
        [Route("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] string otp)
        {
            // Lấy username từ MemoryCache
            if (_cache.TryGetValue("current-username", out string username) &&
                _cache.TryGetValue($"otp-{username}", out string cachedOtp))
            {
                Console.WriteLine($"[DEBUG] OTP từ cache: {cachedOtp}, OTP nhận: {otp}, Username: {username}");

                if (cachedOtp == otp)
                {
                    // Xóa OTP và username khỏi cache sau khi xác thực thành công
                    _cache.Remove($"otp-{username}");
                    _cache.Remove("current-username");

                    // Tìm thông tin người dùng
                    var user = await _userManager.FindByNameAsync(username);

                    // Lấy vai trò của tài khoản
                    var userRoles = await _userManager.GetRolesAsync(user);
                    string hoten = "Unknown";
                    string sodienthoai = "Unknown";

                    // Kiểm tra loại tài khoản và truy vấn bảng phù hợp
                    if (userRoles.Contains("Admin"))
                    {
                        // Tài khoản Admin
                        var adminProfile = _context.AdminProfiles.FirstOrDefault(a => a.UserId == user.Id);
                        hoten = adminProfile?.Hoten ?? "Unknown";
                        sodienthoai = adminProfile?.Sodienthoai ?? "Unknown";
                    }
                    else if (userRoles.Contains("Employee"))
                    {
                        // Tài khoản Employee
                        var employeeProfile = _context.EmployeeProfiles.FirstOrDefault(e => e.UserId == user.Id);
                        hoten = employeeProfile?.Hoten ?? "Unknown";
                        sodienthoai = employeeProfile?.Sodienthoai ?? "Unknown";
                    }
                    else
                    {
                        // Tài khoản User thông thường
                        var userProfile = _context.UserProfiles.FirstOrDefault(u => u.UserId == user.Id);
                        hoten = userProfile?.Hoten ?? "Unknown";
                        sodienthoai = userProfile?.Sodienthoai ?? "Unknown";
                    }

                    // Tạo danh sách claim cho token
                    var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("FullName", hoten), // Thêm thông tin FullName
                new Claim(ClaimTypes.Email, user.Email ?? "Unknown"), // Thêm thông tin Email
                new Claim("Sodienthoai", sodienthoai) // Thêm số điện thoại
            };

                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var token = GetToken(authClaims);

                    return Ok(new
                    {
                        status = "success",
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo
                    });
                }
            }

            // Nếu không tìm thấy OTP hoặc OTP không khớp
            return Unauthorized(new { status = "error", message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
        }





        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Email already exists!" });

            // Tạo mã OTP ngẫu nhiên
            var otpCode = new Random().Next(100000, 999999).ToString();

            // Lưu thông tin đăng ký và OTP vào MemoryCache với key `register-otp-{otpCode}`
            _cache.Set($"register-otp-{otpCode}", model, TimeSpan.FromMinutes(10)); // Lưu thông tin trong 10 phút

            Console.WriteLine($"[DEBUG] OTP: {otpCode}, Email: {model.Email}");

            // Gửi OTP qua email
#pragma warning disable CS4014
            Task.Run(() =>
            {
                var emailBody = $@"
        <div style='font-family: Arial, sans-serif;'>
            <h3>Xin chào {model.Username},</h3>
            <p>Mã xác thực OTP đăng ký tài khoản của bạn là:</p>
            <h2 style='color: #007bff;'>{otpCode}</h2>
            <p>Vui lòng sử dụng mã này để hoàn tất đăng ký. Mã OTP có hiệu lực trong 10 phút.</p>
            <hr />
            <p>Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
        </div>";
                SendEmail(model.Email, "Mã OTP đăng ký tài khoản", emailBody);
            });
#pragma warning restore CS4014

            return Ok(new
            {
                status = "success",
                message = "Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra email để xác nhận."
            });
        }
        [HttpPost]
        [Route("verify-register-otp")]
        public async Task<IActionResult> VerifyRegisterOtp([FromBody] string otp)
        {
            // Kiểm tra OTP từ MemoryCache
            if (_cache.TryGetValue($"register-otp-{otp}", out RegisterModel registerModel))
            {
                Console.WriteLine($"[DEBUG] OTP nhận: {otp}, Thông tin: Username={registerModel.Username}, Email={registerModel.Email}");

                // Tạo tài khoản người dùng
                IdentityUser user = new()
                {
                    Email = registerModel.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = registerModel.Username
                };

                var result = await _userManager.CreateAsync(user, registerModel.Password);
                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please try again." });

                // Kiểm tra và tạo vai trò User nếu chưa tồn tại
                if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                {
                    await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));
                }

                // Thêm người dùng vào vai trò User
                await _userManager.AddToRoleAsync(user, UserRoles.User);

                // Lưu thông tin người dùng vào cơ sở dữ liệu
                _context.UserProfiles.Add(new UserProfile
                {
                    UserId = user.Id,
                    Hoten = registerModel.hoten,
                    Chucvu = "USER",
                    Sodienthoai= registerModel.Sodienthoai,
                    Created_at = DateTime.Now,
                    Updated_at = DateTime.Now,

                });
                await _context.SaveChangesAsync();

                // Xóa thông tin khỏi cache
                _cache.Remove($"register-otp-{otp}");

                return Ok(new Response { Status = "Success", Message = "Tài khoản đã được tạo thành công!" });
            }

            return Unauthorized(new { status = "error", message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Email already exists!" });

            // Tạo mã OTP ngẫu nhiên
            var otpCode = new Random().Next(100000, 999999).ToString();

            // Lưu thông tin đăng ký và OTP vào MemoryCache với key `register-admin-otp-{otpCode}`
            _cache.Set($"register-admin-otp-{otpCode}", model, TimeSpan.FromMinutes(10)); // Lưu thông tin trong 10 phút

            Console.WriteLine($"[DEBUG] OTP: {otpCode}, Email: {model.Email}");

            // Gửi OTP qua email
#pragma warning disable CS4014
            Task.Run(() =>
            {
                var emailBody = $@"
        <div style='font-family: Arial, sans-serif;'>
            <h3>Xin chào {model.Username},</h3>
            <p>Mã xác thực OTP đăng ký tài khoản Admin của bạn là:</p>
            <h2 style='color: #007bff;'>{otpCode}</h2>
            <p>Vui lòng sử dụng mã này để hoàn tất đăng ký. Mã OTP có hiệu lực trong 10 phút.</p>
            <hr />
            <p>Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
        </div>";
                SendEmail(model.Email, "Mã OTP đăng ký Admin", emailBody);
            });
#pragma warning restore CS4014

            return Ok(new
            {
                status = "success",
                message = "Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra email để xác nhận."
            });
        }
        [HttpPost]
        [Route("xacthuc-otp-admin")]
        public async Task<IActionResult> VerifyRegisterAdminOtp([FromBody] string otp)
        {
            // Kiểm tra OTP từ MemoryCache
            if (_cache.TryGetValue($"register-admin-otp-{otp}", out RegisterModel registerModel))
            {
                Console.WriteLine($"[DEBUG] OTP nhận: {otp}, Thông tin: Username={registerModel.Username}, Email={registerModel.Email}");

                // Tạo tài khoản admin
                IdentityUser user = new()
                {
                    Email = registerModel.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = registerModel.Username
                };

                var result = await _userManager.CreateAsync(user, registerModel.Password);
                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please try again." });

                // Kiểm tra và tạo vai trò nếu chưa tồn tại
                if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                    await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                    await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                // Gán vai trò Admin, User và Employee
                await _userManager.AddToRoleAsync(user, UserRoles.Admin);
                await _userManager.AddToRoleAsync(user, UserRoles.User);
                await _userManager.AddToRoleAsync(user, UserRoles.Employee);

                // Lưu thông tin vào bảng UserProfile
                _context.AdminProfiles.Add(new AdminProfile
                {
                    UserId = user.Id,
                    Hoten = registerModel.hoten,
                    Chucvu = "Admin",
                    Sodienthoai = registerModel.Sodienthoai,
                    Created_at = DateTime.Now,
                    Updated_at = DateTime.Now,
                });
                await _context.SaveChangesAsync();

                // Xóa thông tin khỏi cache
                _cache.Remove($"register-admin-otp-{otp}");

                return Ok(new Response { Status = "Success", Message = "Tài khoản Admin đã được tạo thành công!" });
            }

            return Unauthorized(new { status = "error", message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
        }
        [HttpPost]
        [Route("register-employee")]
        public async Task<IActionResult> RegisterEmployee([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Email already exists!" });

            // Tạo mã OTP ngẫu nhiên
            var otpCode = new Random().Next(100000, 999999).ToString();

            // Lưu thông tin đăng ký và OTP vào MemoryCache với key `register-employee-otp-{otpCode}`
            _cache.Set($"register-employee-otp-{otpCode}", model, TimeSpan.FromMinutes(10)); // Lưu thông tin trong 10 phút

            Console.WriteLine($"[DEBUG] OTP: {otpCode}, Email: {model.Email}");

            // Gửi OTP qua email
#pragma warning disable CS4014
            Task.Run(() =>
            {
                var emailBody = $@"
        <div style='font-family: Arial, sans-serif;'>
            <h3>Xin chào {model.Username},</h3>
            <p>Mã xác thực OTP đăng ký tài khoản Nhân viên của bạn là:</p>
            <h2 style='color: #007bff;'>{otpCode}</h2>
            <p>Vui lòng sử dụng mã này để hoàn tất đăng ký. Mã OTP có hiệu lực trong 10 phút.</p>
            <hr />
            <p>Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
        </div>";
                SendEmail(model.Email, "Mã OTP đăng ký Nhân viên", emailBody);
            });
#pragma warning restore CS4014

            return Ok(new
            {
                status = "success",
                message = "Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra email để xác nhận."
            });
        }
        [HttpPost]
        [Route("verify-register-employee-otp")]
        public async Task<IActionResult> VerifyRegisterEmployeeOtp([FromBody] string otp)
        {
            // Kiểm tra OTP từ MemoryCache
            if (_cache.TryGetValue($"register-employee-otp-{otp}", out RegisterModel registerModel))
            {
                Console.WriteLine($"[DEBUG] OTP nhận: {otp}, Thông tin: Username={registerModel.Username}, Email={registerModel.Email}");

                // Tạo tài khoản nhân viên
                IdentityUser user = new()
                {
                    Email = registerModel.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = registerModel.Username
                };

                var result = await _userManager.CreateAsync(user, registerModel.Password);
                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please try again." });

                // Kiểm tra và tạo vai trò nếu chưa tồn tại
                if (!await _roleManager.RoleExistsAsync(UserRoles.Employee))
                    await _roleManager.CreateAsync(new IdentityRole(UserRoles.Employee));
                if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                    await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                // Gán cả hai vai trò cho tài khoản
                await _userManager.AddToRoleAsync(user, UserRoles.Employee);
                await _userManager.AddToRoleAsync(user, UserRoles.User);

                // Lưu thông tin vào bảng UserProfile
                _context.EmployeeProfiles.Add(new EmployeeProfile
                {
                    UserId = user.Id,
                    Hoten = registerModel.hoten,
                    Chucvu="Employee",
                    Sodienthoai=registerModel.Sodienthoai,
                    Created_at=DateTime.Now,
                    Updated_at=DateTime.Now,
                });
                await _context.SaveChangesAsync();

                // Xóa thông tin khỏi cache
                _cache.Remove($"register-employee-otp-{otp}");

                return Ok(new Response { Status = "Success", Message = "Tài khoản Nhân viên đã được tạo thành công!" });
            }

            return Unauthorized(new { status = "error", message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
        }


        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(7),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
        [HttpGet]
        [Route("get-all-employees")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                // Lấy danh sách tất cả người dùng
                var users = _userManager.Users.ToList();

                var employees = new List<object>();

                foreach (var user in users)
                {
                    // Lấy tất cả vai trò của người dùng
                    var userRoles = await _userManager.GetRolesAsync(user);

                    // Chỉ lấy người dùng có vai trò "Employee" và không có vai trò "Admin"
                    if (userRoles.Contains(UserRoles.Employee) && !userRoles.Contains(UserRoles.Admin))
                    {
                        // Lấy thông tin từ bảng UserProfile nếu có
                        var userProfile = _context.EmployeeProfiles.FirstOrDefault(u => u.UserId == user.Id);

                        employees.Add(new
                        {
                            Id = user.Id,
                            Username = user.UserName,
                            Email = user.Email,
                            FullName = userProfile?.Hoten ?? "N/A",
                        });
                    }
                }

                return Ok(new
                {
                    status = "success",
                    message = "Danh sách nhân viên",
                    data = employees
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "error",
                    message = "Đã xảy ra lỗi khi lấy danh sách nhân viên.",
                    error = ex.Message
                });
            }

        }
        [HttpDelete]
        [Route("delete-employee-User/{userId}")]
        [Authorize(Roles ="Admin")]    
        public async Task<IActionResult> DeleteEmployee(string userId)
        {
            try
            {
                // Tìm người dùng trong Identity
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound(new
                    {
                        status = "error",
                        message = "Tài khoản không tồn tại."
                    });
                }

                // Lấy danh sách vai trò của người dùng
                var userRoles = await _userManager.GetRolesAsync(user);

                // Kiểm tra nếu người dùng có vai trò Admin
                if (userRoles.Contains(UserRoles.Admin))
                {
                    return BadRequest(new
                    {
                        status = "error",
                        message = "Không có quyền xóa tài khoản này vì tài khoản có vai trò Admin."
                    });
                }

                // Xóa tài khoản người dùng
                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new
                    {
                        status = "error",
                        message = "Xóa tài khoản thất bại. Vui lòng thử lại."
                    });
                }

                // Xóa thông tin trong bảng UserProfiles nếu có
                var userProfile = _context.UserProfiles.FirstOrDefault(u => u.UserId == user.Id);
                if (userProfile != null)
                {
                    _context.UserProfiles.Remove(userProfile);
                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    status = "success",
                    message = "Tài khoản đã được xóa thành công."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    status = "error",
                    message = "Đã xảy ra lỗi khi xóa tài khoản.",
                    error = ex.Message
                });
            }
        }
        [HttpGet]
        [Route("get-all-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
                // Lấy danh sách tất cả người dùng
                var users = _userManager.Users.ToList();

                var employees = new List<object>();

                foreach (var user in users)
                {
                    // Lấy tất cả vai trò của người dùng
                    var userRoles = await _userManager.GetRolesAsync(user);

                    // Chỉ lấy người dùng có vai trò "Employee" và không có vai trò "Admin"
                    if (userRoles.Contains(UserRoles.User) && !userRoles.Contains(UserRoles.Employee))
                    {
                        // Lấy thông tin từ bảng UserProfile nếu có
                        var userProfile = _context.UserProfiles.FirstOrDefault(u => u.UserId == user.Id);

                        employees.Add(new
                        {
                            Id = user.Id,
                            Username = user.UserName,
                            Email = user.Email,
                            FullName = userProfile?.Hoten ?? "N/A",
                            trangthaitk = userProfile?.TrangThaiTK
                        });
                    }
                }

                return Ok(new
                {
                    status = "success",
                    message = "Danh sách User",
                    data = employees
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "error",
                    message = "Đã xảy ra lỗi khi lấy danh sách nhân viên.",
                    error = ex.Message
                });
            }


        }
        [HttpPost]
        [Route("admin/lock-account")]
        public IActionResult LockAccount(string userId)
        {
            var user = _context.UserProfiles.FirstOrDefault(a => a.UserId == userId);
            if (user != null)
            {
                user.TrangThaiTK = 0; // Khóa tài khoản
                _context.SaveChanges();
                return Ok(new { message = "Tài khoản đã bị khóa thành công!" });
            }
            return NotFound("Không tìm thấy tài khoản.");
        }

        [HttpPost]
        [Route("admin/unlock-account")]
        public IActionResult UnlockAccount(string userId)
        {
            // Tìm tài khoản trong cơ sở dữ liệu
            var user = _context.UserProfiles.FirstOrDefault(a => a.UserId == userId);

            // Kiểm tra nếu tài khoản không tồn tại
            if (user == null)
            {
                return NotFound("Không tìm thấy tài khoản.");
            }

            // Kiểm tra nếu tài khoản đã hoạt động
            if (user.TrangThaiTK == 1)
            {
                return BadRequest(new { message = "Tài khoản đã hoạt động, không cần mở khóa." });
            }

            // Mở khóa tài khoản
            user.TrangThaiTK = 1; // Đặt trạng thái tài khoản là hoạt động
            _context.SaveChanges();

            return Ok(new { message = "Tài khoản đã được mở khóa thành công!" });
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

    }
}

