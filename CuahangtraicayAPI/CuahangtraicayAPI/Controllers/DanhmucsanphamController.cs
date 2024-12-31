using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.DanhmucsanphamDTO;
using Azure.Core;
using CuahangtraicayAPI.DTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhmucsanphamController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DanhmucsanphamController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách của Danh Mục sản phẩm
        /// </summary>
        /// <returns> Lấy danh sách của Danh Mục sản phẩm</returns>

        // GET: api/Danhmucsanpham
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Danhmucsanpham>>> GetDanhmucsanpham()
        {
            //ActionResult là một lớp trong ASP.NET Core, được sử dụng để trả về các kết quả HTTP từ controller.
            // api có thể trả về một danh sách các đối tượng trong danhmucsanpham

            return await _context.Danhmucsanpham.ToListAsync();
        }



        /// <summary>
        /// Lấy danh sách Danh mục sản phẩm theo {id}
        /// </summary>
        /// <returns> Lấy danh sách Danh mục sản phẩm theo {id}</returns>

        // GET: api/Danhmucsanpham/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Danhmucsanpham>> GetDanhmucsanpham(int id)
        {
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);

            if (danhmucsanpham == null)
            {
                return NotFound();
            }

            return danhmucsanpham;
        }


        /// <summary>
        ///  Thêm mới 1 danh mục sản phẩm
        /// </summary>
        /// <returns> Thêm mới 1 danh mục sản phẩm </returns>

        // POST: api/Danhmucsanpham
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Danhmucsanpham>> PostDanhmucsanpham([FromBody] PostDanhmucDTO dto)
        {
            // Kiểm tra xem tên danh mục đã tồn tại chưa
            var exists = await _context.Danhmucsanpham.AnyAsync(dm => dm.Name == dto.Name);
            if (exists)
            {
                return BadRequest(new { message = "Tên danh mục đã tồn tại" });
            }

            var danhmucsanpham = new Danhmucsanpham
            {
                Name = dto.Name,
                CreatedBy = dto.Created_By,
                UpdatedBy = dto.Updated_By
            };

            _context.Danhmucsanpham.Add(danhmucsanpham);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDanhmucsanpham), new { id = danhmucsanpham.ID }, danhmucsanpham);
        }


        /// <summary>
        /// Chỉnh sửa danh mục sản phẩm theo {id}
        /// </summary>
        /// <returns> Chỉnh sửa danh mục sản phẩm theo {id}</returns>

        // PUT: api/Danhmucsanpham/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutDanhmucsanpham(int id, [FromBody] PutDanhmucDTO dto)
        {
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);
            if (danhmucsanpham == null)
            {
                return NotFound(new { message = "Danh mục không tồn tại" });
            }

            // Kiểm tra xem tên danh mục đã tồn tại chưa (ngoại trừ danh mục hiện tại)
            var exists = await _context.Danhmucsanpham.AnyAsync(dm => dm.Name == dto.Name && dm.ID != id);
            if (exists)
            {
                return BadRequest(new { message = "Tên danh mục đã tồn tại" });
            }

            danhmucsanpham.Name = dto.Name;
            danhmucsanpham.UpdatedBy = dto.Updated_By;

            _context.Entry(danhmucsanpham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DanhmucsanphamExists(id))
                {
                    return NotFound(new { message = "Danh mục không tồn tại trong quá trình cập nhật" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = $"Danh mục '{danhmucsanpham.Name}' đã được cập nhật thành công", danhmucsanpham });
        }



        /// <summary>
        /// Xóa 1 danh mục sản phẩm theo {id}
        /// </summary>
        /// <returns> Xóa 1 danh mục sản phẩm theo {id}</returns>

        // DELETE: api/Danhmucsanpham/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteDanhmucsanpham(int id)
        {
            // Tìm danh mục sản phẩm theo ID
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);
            if (danhmucsanpham == null)
            {
                return NotFound(new { message = "Danh mục sản phẩm không tồn tại" });
            }

            // Kiểm tra xem danh mục này có sản phẩm nào hay không
            var hasActiveProducts = await _context.Sanpham
                .Where(sp => sp.danhmucsanpham_id == id)
                .AnyAsync(sp => sp.Xoa == false); // Chỉ kiểm tra sản phẩm chưa bị xóa (Xoa == 0)

            if (hasActiveProducts)
            {
                return BadRequest(new { message = "Không thể xóa vì danh mục này đang chứa sản phẩm chưa được xóa." });
            }

            // Xóa danh mục nếu không có sản phẩm nào chưa bị xóa
            _context.Danhmucsanpham.Remove(danhmucsanpham);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa danh mục sản phẩm thành công." });
        }



        private bool DanhmucsanphamExists(int id)
        {
            return _context.Danhmucsanpham.Any(e => e.ID == id);
        }
    }
}