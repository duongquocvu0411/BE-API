using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using CuahangtraicayAPI.DTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class DiachichitietController:ControllerBase
    {
        private readonly AppDbContext _context;

        public DiachichitietController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả các địa chỉ chi tiết.
        /// </summary>
        /// <returns>Danh sách các đối tượng Diachichitiet</returns>
        // GET: api/Diachichitiet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diachichitiet>>> Index()
        {
            return await _context.Diachichitiets.ToListAsync();
        }

        /// <summary>
        /// thêm 1  địa chỉ chi tiết.
        /// </summary>
        /// <returns>thêm 1  địa chỉ chi tiết.</returns>
        // POST: api/Diachichitiet
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Diachichitiet>> Store([FromBody] DiachichitietDTO.CreateDiachichitietDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var diachi = new Diachichitiet
            {
                Diachi = dto.Diachi,
                Sdt = dto.Sdt,
                Email = dto.Email,
                Status = "không sử dụng", // Giá trị mặc định
                CreatedBy = dto.Created_By,
                UpdatedBy = dto.Updated_By
            };

            _context.Diachichitiets.Add(diachi);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Show), new { id = diachi.Id }, diachi);
        }

        /// <summary>
        /// xem id  địa chỉ chi tiết.
        /// </summary>
        /// <returns>xem id  địa chỉ chi tiết.</returns>
        // GET: api/Diachichitiet/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Diachichitiet>> Show(int id)
        {
            var diachi = await _context.Diachichitiets.FindAsync(id);
            
            if(diachi == null)
            {
                return NotFound(new { message = " không tìm thấy địa chỉ với id này " });
            }
            return Ok(diachi);
        }

        /// <summary>
        /// chỉnh sửa  địa chỉ chi tiết theo {id}.
        /// </summary>
        /// <returns>chỉnh sửa  địa chỉ chi tiết theo {id}.</returns>
        // PUT: api/Diachichitiet/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] DiachichitietDTO.UpdateDiachichitietDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tìm đối tượng trong cơ sở dữ liệu dựa trên `id` từ URL
            var existingDiachi = await _context.Diachichitiets.FindAsync(id);

            if (existingDiachi == null)
            {
                return NotFound(new { message = "Không tìm thấy địa chỉ với id này." });
            }

            // Cập nhật các thuộc tính từ DTO nếu có giá trị
            if (!string.IsNullOrEmpty(dto.Diachi))
            {
                existingDiachi.Diachi = dto.Diachi;
            }
            if (!string.IsNullOrEmpty(dto.Sdt))
            {
                existingDiachi.Sdt = dto.Sdt;
            }
            if (!string.IsNullOrEmpty(dto.Email))
            {
                existingDiachi.Email = dto.Email;
            }
            if (!string.IsNullOrEmpty(dto.Updated_By))
            {
                existingDiachi.UpdatedBy = dto.Updated_By;
            }

            // Đánh dấu thực thể là đã thay đổi
            _context.Entry(existingDiachi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiachichitietExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingDiachi);
        }


        /// <summary>
        /// Xóa địa chỉ chi tiết theo {id}.
        /// </summary>
        /// <returns>Xóa địa chỉ chi tiết theo {id}..</returns>

        // DELETE: api/Diachichitiet/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Destroy(int id)
        {
            var diachi = await _context.Diachichitiets.FindAsync(id);

            if(diachi == null)
            {
                return NotFound(new { message = " không tìm thấy địa chỉ chi tiết với id này" });
            }
            _context.Diachichitiets.Remove(diachi);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();
            // trả về thông báo nếu xóa thành công
            return Ok(new { message = "Xóa địa chỉ chi tiết thành công" });
        }


        /// <summary>
        /// post địa chỉ chi tiết {id} status thành: "đang sử dụng"
        /// </summary>
        /// <returns>post địa chỉ chi tiết {id} status thành: "đang sử dụng"</returns>
        // Custom endpoint: Set a specific address as "đang sử dụng"
        [HttpPost("setDiaChiHien/{id}")]
        [Authorize]
        public async Task<IActionResult> SetDiaChiHien(int id, [FromBody] DiachichitietDTO.SetDiachichitietDto dto)
        {
            // Kiểm tra tính hợp lệ của DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy tất cả các địa chỉ
            var allDiachis = await _context.Diachichitiets.ToListAsync();

            // Tìm địa chỉ cần cập nhật
            var diachiToUpdate = allDiachis.FirstOrDefault(d => d.Id == id);
            if (diachiToUpdate == null)
            {
                return NotFound(new { message = "Không tìm thấy địa chỉ với id này." });
            }

            // Cập nhật trạng thái cho tất cả các địa chỉ
            foreach (var diachi in allDiachis)
            {
                diachi.Status = "không sử dụng"; // Đặt trạng thái mặc định cho tất cả
                if (diachi.Id == id)
                {
                    diachi.Status = "đang sử dụng"; // Cập nhật trạng thái cho địa chỉ được chọn
                    diachi.UpdatedBy = dto.Updated_By; // Ghi lại người thực hiện
                }
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { message = "Địa chỉ đã được đặt làm đang sử dụng." });
        }


        /// <summary>
        /// lấy danh sách địa chỉ chi tiết đang có status : "đang sử dụng"
        /// </summary>
        /// <returns> lấy danh sách địa chỉ chi tiết đang có status : "đang sử dụng"</returns>
        // Custom endpoint: Get the address that is currently "đang sử dụng"
        [HttpGet("getDiaChiHien")]
        public async Task<ActionResult<Diachichitiet>> GetDiaChiHien()
        {
            var diachi = await _context.Diachichitiets.FirstOrDefaultAsync(d => d.Status == "đang sử dụng");

            if (diachi == null)
            {
                return NotFound(new { message = "Không có địa chỉ đang sử dụng" });
            }

            return diachi;
        }

        private bool DiachichitietExists(int id)
        {
            return _context.Diachichitiets.Any(e => e.Id == id);
        }
    }
}