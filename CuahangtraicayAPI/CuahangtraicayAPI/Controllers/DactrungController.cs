using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using System.IO;
using static CuahangtraicayAPI.DTO.DactrungDTO;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.DTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DactrungController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public DactrungController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
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
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO< Dactrung>>> PostDactrung([FromForm] DactrungCreateDTO dto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Dactrung>
                {
                    Code = 404,
                    Message = "Không thể xác định người dùng từ token"
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

            // Lưu đối tượng vào cơ sở dữ liệu
            _context.Dactrungs.Add(dactrung);
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
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO<Dactrung>>> PutDactrung(int id, [FromForm] DactrungUpdateDTO dto)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);
            if (dactrung == null)
            {
                return BadRequest( new BaseResponseDTO<Dactrung>
                {
                    Code = 404,
                    Message = "Đặc trưng không tồn tại trong hệ thông"
                }); // Trả về 404 nếu không tìm thấy bản ghi
            }
            var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var hotenToken = jwtToken.Claims.FirstOrDefault(c => c.Type == "hoten")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Dactrung>
                {
                    Code = 404,
                    Message = "Không thể xác định người dùng từ token"
                });
            }

            // Cập nhật các trường từ DTO
            if (!string.IsNullOrEmpty(dto.Tieude))
            {
                dactrung.Tieude = dto.Tieude; // Cập nhật tiêu đề
            }
            if (!string.IsNullOrEmpty(dto.Phude))
            {
                dactrung.Phude = dto.Phude; // Cập nhật phú đề
            }
            if (dto.Thutuhienthi.HasValue && dto.Thutuhienthi > 0)
            {
                dactrung.Thutuhienthi = dto.Thutuhienthi.Value; // Cập nhật thứ tự hiển thị (nếu có)
            }
            dactrung.UpdatedBy=hotenToken;
            dactrung.Updated_at=DateTime.Now;

            // Xử lý file icon mới (nếu có)
            if (dto.IconFile != null)
            {
                // Xóa icon cũ nếu có
                if (!string.IsNullOrEmpty(dactrung.Icon))
                {
                    var oldFilePath = Path.Combine(_environment.WebRootPath, dactrung.Icon);
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath); // Xóa file cũ
                    }
                }

                // Lưu icon mới và cập nhật đường dẫn
                dactrung.Icon = await SaveIconFileAsync(dto.IconFile);
            }

            // Cập nhật thời gian sửa đổi
            dactrung.Updated_at = DateTime.UtcNow;

            // Đánh dấu đối tượng là đã thay đổi
            _context.Entry(dactrung).State = EntityState.Modified;

            try
            {
                // Lưu thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Kiểm tra nếu bản ghi không tồn tại
                if (!DactrungExists(id))
                {
                    return NotFound(); // Trả về 404 nếu không tìm thấy bản ghi
                }
                else
                {
                    throw; // Nếu có lỗi khác thì ném lại ngoại lệ
                }
            }

            return Ok( new BaseResponseDTO<Dactrung>
            {
                Data = dactrung,
                Message = "Success"
            }); // Trả về đối tượng đã được cập nhật
        }

        /// <summary>
        /// Xóa Đặc trưng theo {id}
        /// </summary>
        /// <returns>Xóa Đặc trưng theo {id}</returns>

        // DELETE: api/Dactrung/5
        [HttpDelete("{id}")]
        [Authorize]
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

            // Xóa tệp tin icon nếu có
            if (!string.IsNullOrEmpty(dactrung.Icon))
            {
                var filePath = Path.Combine(_environment.WebRootPath, dactrung.Icon);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.Dactrungs.Remove(dactrung);
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
