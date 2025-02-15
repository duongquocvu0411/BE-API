using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using System.IO;
using static CuahangtraicayAPI.DTO.DactrungDTO;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DactrungController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DactrungController(AppDbContext context, IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Xem danh sách Đặc trưng
        /// </summary>
        /// <returns>Xem danh sách Đặc trưng</returns>
        // GET: api/Dactrung
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<Dactrung>>>> GetDactrungs()
        {
            var dt = await _context.Dactrungs.OrderBy(dt => dt.Thutuhienthi).ToListAsync();

            return new BaseResponseDTO<IEnumerable<Dactrung>>()
            {
                Data = dt,
                Message = "Success"
            };
        }


        /// <summary>
        /// Xem Đặc trưng theo {id}
        /// </summary>
        /// <returns>Xem Đặc trưng theo {id}</returns>

        // GET: api/Dactrung/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO< Dactrung>>> GetDactrung(int id)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);

            if (dactrung == null)
            {
                return BadRequest(new BaseResponseDTO<Dactrung>
                {
                    Code =404,
                    Message = "Đặc trưng không tồn tại trong hệ thống"
                });
            }

            return Ok(new BaseResponseDTO<Dactrung>
            {
                Data = dactrung,
                Message = "Success"
            });
        }

        /// <summary>
        /// Thêm mới Đặc trưng
        /// </summary>
        /// <returns>Thêm mới Đặc trưng</returns>

        // POST: api/Dactrung
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO< Dactrung>>> PostDactrung([FromForm] DactrungCreateDTO dto)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin


            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Dactrung>
                {
                    Code = 404,
                    Message = "Không thể xác định người dùng từ token"
                });
            }
            var exists = await _context.Dactrungs.AnyAsync(mn => mn.Thutuhienthi == dto.Thutuhienthi);
            if (exists)
            {
                return BadRequest(new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Số thứ tự đã tồn tại trong hệ thống"
                });
            }

            var dactrung = new Dactrung
            {
                Tieude = dto.Tieude,
                Phude = dto.Phude,
                Thutuhienthi = dto.Thutuhienthi,
                CreatedBy = hotenToken ,
                UpdatedBy = hotenToken ,
            };

            // Xử lý lưu file icon nếu có
            if (dto.IconFile != null)
            {
                // Lưu file icon và gán đường dẫn cho trường Icon
                dactrung.Icon = await SaveIconFileAsync(dto.IconFile);
            }
            var log = new Logs
            {
                UserId = users,
                HanhDong = "Thêm mới  đặc trưng" + " " + dactrung.Tieude,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };
            
            // Lưu đối tượng vào cơ sở dữ liệu
            _context.Dactrungs.Add(dactrung);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            // Trả về đối tượng vừa được tạo
            return Ok(new BaseResponseDTO<Dactrung>
            {
                Data = dactrung,
                Message = "Success"

            });
        }

        /// <summary>
        /// Chỉnh sửa Đặc trưng theo {id}
        /// </summary>
        /// <returns>Chỉnh sửa Đặc trưng theo {id}</returns>

        // PUT: api/Dactrung/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Dactrung>>> PutDactrung(int id, [FromForm] DactrungUpdateDTO dto)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);
            if (dactrung == null)
            {
                return BadRequest(new BaseResponseDTO<Dactrung>
                {
                    Code = 404,
                    Message = "Đặc trưng không tồn tại trong hệ thống"
                });
            }

            // Kiểm tra nếu Số thứ tự hiển thị thay đổi thì mới kiểm tra trùng lặp
            if (dto.Thutuhienthi.HasValue && dto.Thutuhienthi.Value != dactrung.Thutuhienthi)
            {
                var exists = await _context.Dactrungs.AnyAsync(mn => mn.Thutuhienthi == dto.Thutuhienthi);
                if (exists)
                {
                    return BadRequest(new BaseResponseDTO<Dactrung>
                    {
                        Code = 400,
                        Message = "Số thứ tự đã tồn tại trong hệ thống"
                    });
                }
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee";

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Dactrung>
                {
                    Code = 401,
                    Message = "Không thể xác định người dùng từ token"
                });
            }

            // Cập nhật các trường từ DTO
            if (!string.IsNullOrEmpty(dto.Tieude))
            {
                dactrung.Tieude = dto.Tieude;
            }
            if (!string.IsNullOrEmpty(dto.Phude))
            {
                dactrung.Phude = dto.Phude;
            }
            if (dto.Thutuhienthi.HasValue && dto.Thutuhienthi.Value > 0)
            {
                dactrung.Thutuhienthi = dto.Thutuhienthi.Value;
            }
            dactrung.UpdatedBy = hotenToken;
            dactrung.Updated_at = DateTime.UtcNow;

            // Xử lý file icon mới (nếu có)
            if (dto.IconFile != null)
            {
                if (!string.IsNullOrEmpty(dactrung.Icon))
                {
                    var oldFilePath = Path.Combine(_environment.WebRootPath, dactrung.Icon);
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }
                dactrung.Icon = await SaveIconFileAsync(dto.IconFile);
            }

            _context.Entry(dactrung).State = EntityState.Modified;

            try
            {
                var log = new Logs
                {
                    UserId = users,
                    HanhDong = "Cập nhật đặc trưng " + dactrung.Tieude,
                    CreatedBy = hotenToken,
                    Chucvu = chucVu,
                };
                _context.Logss.Add(log);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DactrungExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new BaseResponseDTO<Dactrung>
            {
                Data = dactrung,
                Message = "Success"
            });
        }


        /// <summary>
        /// Xóa Đặc trưng theo {id}
        /// </summary>
        /// <returns>Xóa Đặc trưng theo {id}</returns>

        // DELETE: api/Dactrung/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Dactrung>>> DeleteDactrung(int id)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);
            if (dactrung == null)
            {
                return BadRequest( new BaseResponseDTO<Dactrung>
                {
                    Code = 404,
                    Message = "Đặc trưng không tồn tại trong hệ thống"
                });
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            // Xóa tệp tin icon nếu có
            if (!string.IsNullOrEmpty(dactrung.Icon))
            {
                var filePath = Path.Combine(_environment.WebRootPath, dactrung.Icon);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            var log = new Logs
            {
                UserId = users,
                HanhDong = "Xóa đặc trưng " + " " + dactrung.Tieude,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Dactrungs.Remove(dactrung);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok( new BaseResponseDTO<Dactrung>
            {
                Data = dactrung,
                Message = "Success"
            });
        }

        private bool DactrungExists(int id)
        {
            return _context.Dactrungs.Any(e => e.ID == id);
        }
        // Hàm lưu trữ tệp tin icon vào thư mục wwwroot/icon và trả về chuỗi đường dẫn
        private async Task<string> SaveIconFileAsync(IFormFile iconFile)
        {
            // Đường dẫn thư mục icon
            var folderPath = Path.Combine(_environment.WebRootPath, "icon");

            // Kiểm tra và tạo thư mục nếu chưa tồn tại
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Tạo tên file duy nhất bằng cách sử dụng GUID và phần mở rộng của file
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(iconFile.FileName)}";

            // Đường dẫn đầy đủ của file
            var filePath = Path.Combine(folderPath, fileName);

            // Lưu file vào thư mục
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await iconFile.CopyToAsync(stream);
            }

            // Trả về chuỗi đường dẫn tương đối (để lưu vào cơ sở dữ liệu), sử dụng dấu "/" thay vì "\"
            return Path.Combine("icon", fileName).Replace("\\", "/");
        }


    }
}
