using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChitietsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChitietsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// lấy toàn bộ danh sách chitiets sản phẩm
        /// </summary>
        /// <returns> lấy toàn bộ danh sách chitiets</returns>
        // GET: api/Chitiets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChiTiet>>> GetChitiets()
        {
            return await _context.ChiTiets.ToListAsync();
        }

        /// <summary>
        /// xem chitiet theo id của sanpham_id {id}
        /// </summary>
        /// <returns> xem chitiet theo id của sanpham_id {id}</returns>
        // GET: api/Chitiets/{sanphamsId}

        [HttpGet("{sanphamsId}")]
        public async Task<ActionResult<ChiTiet>> GetChitiet(int sanphamsId)
        {
            var chitiet = await _context.ChiTiets.FirstOrDefaultAsync(c => c.sanphams_id == sanphamsId);

            if (chitiet == null)
            {
                return NotFound(new { message = "Chi tiết sản phẩm không tồn tại" });
            }

            return chitiet;
        }
      
    }
}
