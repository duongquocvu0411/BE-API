using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanphamSaleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SanphamSaleController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả chương trình sale
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _context.SanphamSales
                .Include(s => s.Sanpham) // Include để lấy thông tin sản phẩm liên quan
                .Select(s => new
                {
                    s.Id,
                    s.trangthai,
                    s.giasale,
                    s.thoigianbatdau,
                    s.thoigianketthuc,
                    Sanpham = new
                    {
                        s.Sanpham.Id,
                        s.Sanpham.Tieude,
                        s.Sanpham.Giatien,
                        s.Sanpham.Hinhanh
                    }
                })
                .ToListAsync();

            return Ok(sales);
        }

        /// <summary>
        /// Lấy chi tiết sale của một sản phẩm theo {sanphamId}
        /// </summary>
        [HttpGet("sanpham/{sanphamId}")]
        public async Task<IActionResult> GetSaleBySanphamId(int sanphamId)
        {
            var sale = await _context.SanphamSales
                .Include(s => s.Sanpham) // Include để lấy thông tin sản phẩm liên quan
                .Where(s => s.sanpham_id == sanphamId)
                .Select(s => new
                {
                    s.Id,
                    s.trangthai,
                    s.giasale,
                    s.thoigianbatdau,
                    s.thoigianketthuc,
                    Sanpham = new
                    {
                        s.Sanpham.Id,
                        s.Sanpham.Tieude,
                        s.Sanpham.Giatien,
                        s.Sanpham.Hinhanh
                    }
                })
                .FirstOrDefaultAsync();

            if (sale == null)
            {
                return NotFound(new { message = "Không tìm thấy chương trình sale cho sản phẩm này." });
            }

            return Ok(sale);
        }
    }
}
