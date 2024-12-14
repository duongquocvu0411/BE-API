using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.TencuahangDTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TencuahangController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TencuahangController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả tên cửa hàng.
        /// </summary>
        /// <returns>Danh sách các đối tượng Tencuahang</returns>
        /// 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tencuahang>>> Index()
        {
            return await _context.Tencuahangs.ToListAsync();
        }

        /// <summary>
        /// Lấy thông tin chi tiết của tên cửa hàng theo id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Tencuahang>> Show(int id)
        {
            var cuahang = await _context.Tencuahangs.FindAsync(id);

            if (cuahang == null)
            {
                return NotFound(new { message = "Không tìm thấy cửa hàng với id này" });
            }

            return Ok(cuahang);
        }


        /// <summary>
        /// Thêm một tên cửa hàng mới.
        /// </summary>
        /// 

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Tencuahang>> Store(CreateTencuahangDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cuahang = new Tencuahang
            {
                Name = dto.Name,
                Trangthai = "không sử dụng"
            };

            _context.Tencuahangs.Add(cuahang);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Show), new { id = cuahang.Id }, cuahang);
        }


        /// <summary>
        /// Chỉnh sửa thông tin của một tên cửa hàng theo id.
        /// </summary>

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, Tencuahang cuahang)
        {
            // Tìm cửa hàng theo ID
            var existingCuaHang = await _context.Tencuahangs.FindAsync(id);

            if (existingCuaHang == null)
            {
                return NotFound(new { message = "Không tìm thấy cửa hàng với id này" });
            }

            // Chỉ cập nhật các thuộc tính nếu chúng không null
            if (!string.IsNullOrEmpty(cuahang.Name))
            {
                existingCuaHang.Name = cuahang.Name;
            }

            // Nếu client không gửi `Trangthai`, giữ nguyên giá trị cũ
            if (!string.IsNullOrEmpty(cuahang.Trangthai))
            {
                existingCuaHang.Trangthai = cuahang.Trangthai;
            }

            // Đánh dấu entity là đã thay đổi
            _context.Entry(existingCuaHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TencuahangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingCuaHang);
        }

        /// <summary>
        /// Xóa một tên cửa hàng theo id.
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Destroy(int id)
        {
            var cuahang = await _context.Tencuahangs.FindAsync(id);

            if (cuahang == null)
            {
                return NotFound(new { message = "Không tìm thấy cửa hàng với id này" });
            }

            _context.Tencuahangs.Remove(cuahang);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa tên cửa hàng thành công" });
        }

        /// <summary>
        /// Đặt một tên cửa hàng có trạng thái "đang sử dụng" theo id.
        /// </summary>
        [HttpPost("setTencuahang/{id}")]
        [Authorize]
        public async Task<IActionResult> SetTencuahang(int id)
        {
            await _context.Tencuahangs.ForEachAsync(c => c.Trangthai = "không sử dụng");
            await _context.SaveChangesAsync();

            var cuahang = await _context.Tencuahangs.FindAsync(id);
            if (cuahang == null)
            {
                return NotFound(new { message = "Không tìm thấy cửa hàng với id này" });
            }

            cuahang.Trangthai = "đang sử dụng";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Tên cửa hàng đã được chọn làm đang sử dụng" });
        }

        /// <summary>
        /// Lấy tên cửa hàng đang có trạng thái "đang sử dụng".
        /// </summary>
        [HttpGet("getHien")]
        public async Task<ActionResult<Tencuahang>> GetHien()
        {
            var cuahang = await _context.Tencuahangs.FirstOrDefaultAsync(c => c.Trangthai == "đang sử dụng");

            if (cuahang == null)
            {
                return NotFound(new { message = "Không có tên cửa hàng đang sử dụng" });
            }

            return cuahang;
        }

        private bool TencuahangExists(int id)
        {
            return _context.Tencuahangs.Any(e => e.Id == id);
        }
    }
}
    

