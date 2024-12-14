using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;

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
        public async Task<ActionResult<Danhmucsanpham>> PostDanhmucsanpham(Danhmucsanpham danhmucsanpham)
        {
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
        public async Task<IActionResult> PutDanhmucsanpham(int id, Danhmucsanpham danhmucsanpham)
        {
            // Tìm đối tượng trong cơ sở dữ liệu dựa trên `id` từ URL
            var danhmucsanphamid = await _context.Danhmucsanpham.FindAsync(id);

            if (danhmucsanphamid == null)
            {
                return NotFound();
            }

            // Cập nhật các thuộc tính từ `danhmucsanpham` (ngoại trừ ID)
            danhmucsanphamid.Name = danhmucsanpham.Name;

            _context.Entry(danhmucsanphamid).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DanhmucsanphamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

             return Ok(danhmucsanphamid); ;
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
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);
            if (danhmucsanpham == null)
            {
                return NotFound();
            }

            _context.Danhmucsanpham.Remove(danhmucsanpham);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa Danh mục sản phẩm  thành công" });
        }

        private bool DanhmucsanphamExists(int id)
        {
            return _context.Danhmucsanpham.Any(e => e.ID == id);
        }
    }
}