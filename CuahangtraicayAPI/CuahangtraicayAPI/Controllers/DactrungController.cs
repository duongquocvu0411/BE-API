using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using System.IO;
using static CuahangtraicayAPI.DTO.DactrungDTO;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<IEnumerable<Dactrung>>> GetDactrungs()
        {
            return await _context.Dactrungs.ToListAsync();
        }


        /// <summary>
        /// Xem Đặc trưng theo {id}
        /// </summary>
        /// <returns>Xem Đặc trưng theo {id}</returns>

        // GET: api/Dactrung/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dactrung>> GetDactrung(int id)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);

            if (dactrung == null)
            {
                return NotFound();
            }

            return dactrung;
        }

        /// <summary>
        /// Thêm mới Đặc trưng
        /// </summary>
        /// <returns>Thêm mới Đặc trưng</returns>

        // POST: api/Dactrung
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Dactrung>> PostDactrung([FromForm] DactrungCreateDTO dto)
        {
            var dactrung = new Dactrung
            {
                Tieude = dto.Tieude,
                Phude = dto.Phude,
                Thutuhienthi = dto.Thutuhienthi,
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
            return CreatedAtAction("GetDactrung", new { id = dactrung.ID }, dactrung);
        }

        /// <summary>
        /// Chỉnh sửa Đặc trưng theo {id}
        /// </summary>
        /// <returns>Chỉnh sửa Đặc trưng theo {id}</returns>

        // PUT: api/Dactrung/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutDactrung(int id, [FromForm] DactrungUpdateDTO dto)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);
            if (dactrung == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy bản ghi
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

            return Ok(dactrung); // Trả về đối tượng đã được cập nhật
        }

        /// <summary>
        /// Xóa Đặc trưng theo {id}
        /// </summary>
        /// <returns>Xóa Đặc trưng theo {id}</returns>

        // DELETE: api/Dactrung/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteDactrung(int id)
        {
            var dactrung = await _context.Dactrungs.FindAsync(id);
            if (dactrung == null)
            {
                return NotFound();
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

            return NoContent();
        }

        private bool DactrungExists(int id)
        {
            return _context.Dactrungs.Any(e => e.ID == id);
        }

        // Hàm lưu trữ tệp tin icon vào thư mục wwwroot/icon
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

            // Tạo tên file duy nhất với GUID và giữ phần mở rộng của file
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(iconFile.FileName)}";

            // Đường dẫn đầy đủ của file
            var filePath = Path.Combine(folderPath, fileName);

            // Lưu file vào thư mục
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await iconFile.CopyToAsync(stream);
            }

            // Trả về chuỗi đường dẫn tương đối (để lưu vào cơ sở dữ liệu)
            return Path.Combine("icon", fileName).Replace("\\", "/");
        }

    }
}
