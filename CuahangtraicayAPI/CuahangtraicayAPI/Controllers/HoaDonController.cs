using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HoaDonController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách hóa đơn
        /// </summary>
        /// <returns>  Lấy danh sách hóa đơn</returns>

        // GET: api/HoaDon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetHoaDons()
        {
            // Lấy tất cả các hóa đơn và chi tiết hóa đơn
            var hoadons = await _context.HoaDons
                //.Include(hd => hd.HoaDonChiTiets)
                .ToListAsync();

            var result = new List<object>();

            // Lặp qua các hóa đơn và chi tiết hóa đơn
            foreach (var hd in hoadons)
            {

                // Thêm hóa đơn và chi tiết vào kết quả
                result.Add(new
                {
                    hd.Id,
                    hd.khachhang_id,
                    hd.total_price,
                    hd.order_code,
                    hd.status,
                   
                    //HoaDonChiTiets = hoaDonChiTiets
                });
            }

            return Ok(result);
        }

        // Lấy thông tin sản phẩm từ SanPhamIds
        private async Task<(string SanphamNames, string SanphamDonViTinh)> GetSanPhamDetails(string sanPhamIds)
        {
            // Loại bỏ dấu ngoặc vuông và tách chuỗi thành các ID sản phẩm
            var ids = sanPhamIds.Trim('[', ']').Split(',').Select(int.Parse).ToList();

            // Truy vấn thông tin sản phẩm từ database
            var sanphams = await _context.Sanpham
                .Where(sp => ids.Contains(sp.Id))
                .Select(sp => new
                {
                    sp.Tieude, // Lấy Tên sản phẩm
                    sp.don_vi_tinh // Lấy Đơn vị tính
                })
                .ToListAsync();

            // Gộp tất cả tên sản phẩm thành một chuỗi (nếu có nhiều sản phẩm)
            string sanphamNames = string.Join(", ", sanphams.Select(sp => sp.Tieude));

            // Lấy tất cả đơn vị tính, sẽ lấy đơn vị tính đầu tiên hoặc gộp lại nếu có nhiều đơn vị tính
            string donViTinh = sanphams.Select(sp => sp.don_vi_tinh).FirstOrDefault(); // Lấy đơn vị tính đầu tiên

            // Trả về tên sản phẩm và đơn vị tính dưới dạng chuỗi đơn giản
            return (sanphamNames, donViTinh);
        }


        /// <summary>
        ///  Thêm mới hóa đơn 
        /// </summary>
        /// <returns> Thêm mới hóa đơn  </returns>

        // POST: api/HoaDon
        [HttpPost]
        public async Task<ActionResult> CreateHoaDon(HoadonDTO.HoaDonDto hoaDonDto)
        {
            var orderCode = GenerateOrderCode();

            // Tính tổng giá trị của hóa đơn
            var totalPrice = 0m;

            for (int i = 0; i < hoaDonDto.SanphamIds.Count; i++)
            {
                var sanpham = await _context.Sanpham
                    .Include(sp => sp.SanphamSales) // Bao gồm thông tin khuyến mãi
                    .FirstOrDefaultAsync(sp => sp.Id == hoaDonDto.SanphamIds[i]);

                if (sanpham != null)
                {
                    // Kiểm tra nếu sản phẩm có khuyến mãi "active"
                    var activeSale = sanpham.SanphamSales.FirstOrDefault(sale => sale.trangthai == "Đang áp dụng");
                    var gia = activeSale != null ? activeSale.giasale : sanpham.Giatien; // Ưu tiên giá khuyến mãi nếu có

                    totalPrice += (gia) * hoaDonDto.Quantities[i];
                }
            }

            // Tạo hóa đơn mới
            var bill = new HoaDon
            {
                khachhang_id = hoaDonDto.KhachHangId,
                total_price = totalPrice,
                order_code = orderCode,
                status = "Chờ xử lý",
              
            };
            _context.HoaDons.Add(bill);
            await _context.SaveChangesAsync();

            // Tạo chi tiết hóa đơn
            for (int i = 0; i < hoaDonDto.SanphamIds.Count; i++)
            {
                var sanpham = await _context.Sanpham
                    .Include(sp => sp.SanphamSales)
                    .FirstOrDefaultAsync(sp => sp.Id == hoaDonDto.SanphamIds[i]);

                if (sanpham != null)
                {
                    var activeSale = sanpham.SanphamSales.FirstOrDefault(sale => sale.trangthai == "Đang áp dụng");
                    var gia = activeSale != null ? activeSale.giasale : sanpham.Giatien;

                    var chiTiet = new HoaDonChiTiet
                    {
                        bill_id = bill.Id,
                        sanpham_ids = hoaDonDto.SanphamIds[i].ToString(),
                        price = (gia) * hoaDonDto.Quantities[i],
                        quantity = hoaDonDto.Quantities[i]
                    };
                    _context.HoaDonChiTiets.Add(chiTiet);
                }
            }
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đơn hàng đã được tạo", order_code = orderCode, bill });
        }



        /// <summary>
        /// Tra cứu theo mã của hóa đơn
        /// </summary>
        /// <returns>Tra cứu theo mã của hóa đơn</returns>
        // GET: api/HoaDon/TraCuu/{orderCode}
        [HttpGet("TraCuu/{orderCode}")]
        public async Task<ActionResult<object>> GetHoaDonByOrderCode(string orderCode)
        {
            // Tìm hóa đơn dựa trên OrderCode
            var hoaDon = await _context.HoaDons
                .Include(hd => hd.HoaDonChiTiets) // Bao gồm chi tiết hóa đơn
                .FirstOrDefaultAsync(hd => hd.order_code == orderCode);

            if (hoaDon == null)
            {
                return NotFound(new { message = "Không tìm thấy hóa đơn với mã đơn hàng này." });
            }

            // Chuẩn bị danh sách chi tiết hóa đơn với tên sản phẩm
            var chiTietHoaDon = new List<object>();

            foreach (var ct in hoaDon.HoaDonChiTiets)
            {
                // Lấy thông tin sản phẩm dựa trên SanPhamIds
                var sanphamId = int.Parse(ct.sanpham_ids);
                var sanpham = await _context.Sanpham.FindAsync(sanphamId);

                chiTietHoaDon.Add(new
                {
                    ct.Id,
                    ct.bill_id,
                    SanPhamNames = sanpham?.Tieude, // Lấy tên sản phẩm từ bảng Sanpham
                    SanPhamDonViTinh = sanpham?.don_vi_tinh, // Lấy đơn vị tính từ bảng Sanpham
                    ct.price,
                    ct.quantity
                });
            }

            var result = new
            {
                hoaDon.Id,
                hoaDon.khachhang_id,
                hoaDon.Created_at,
                hoaDon.total_price,
                hoaDon.order_code,
                hoaDon.status,

                HoaDonChiTiets = chiTietHoaDon
            };

            return Ok(result);
        }


        /// <summary>
        /// tra cứu đơn và hủy đơn hàng 
        /// </summary>
        /// <returns>tra cứu đơn và hủy đơn hàng </returns>

        // PUT: api/HoaDon/TraCuu/{orderCode}/HuyDon
        [HttpPut("TraCuu/{orderCode}/HuyDon")]
        public async Task<ActionResult> CancelOrder(string orderCode)
        {
            // Tìm hóa đơn dựa trên OrderCode
            var hoaDon = await _context.HoaDons.FirstOrDefaultAsync(hd => hd.order_code == orderCode);

            if (hoaDon == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng với mã này." });
            }

            // Kiểm tra trạng thái hiện tại của đơn hàng
            if (hoaDon.status == "Hủy đơn")
            {
                return BadRequest(new { message = "Đơn hàng đã bị hủy trước đó." });
            }
            if (hoaDon.status != "Chờ xử lý")
            {
                return BadRequest(new { message = "Đơn hàng đã được xử lý và không thể hủy." });
            }

            // Cập nhật trạng thái đơn hàng thành "Hủy đơn"
            hoaDon.status = "Hủy đơn";
            hoaDon.Updated_at = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đơn hàng đã được hủy thành công." });
        }


        /// <summary>
        /// Chỉnh sửa status của hóa đơn
        /// </summary>
        /// <returns> Chỉnh sửa status của hóa đơn </returns>

        // PUT: api/HoaDon/UpdateStatus/{id}
        [HttpPut("UpdateStatus/{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateStatus(int id, [FromBody] HoadonDTO.UpdateStatusDto dto)
        {
            var bill = await _context.HoaDons.FindAsync(id);
            if (bill == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng" });

            bill.status = dto.Status;
            bill.Updated_at=DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Trạng thái đơn hàng đã được cập nhật", bill });
        }

        /// <summary>
        /// Lấy danh thu theo ngày hiện tại
        /// </summary>
        /// <returns> Lấy danh thu theo ngày hiện tại </returns>

        [HttpGet("DoanhThuHomNay")]
        [Authorize]
        public async Task<ActionResult<object>> GetDoanhThuHomNay()
        {
            // Lấy ngày hiện tại và thiết lập mốc thời gian đầu và cuối của ngày
            DateTime today = DateTime.Today;
            DateTime tomorrow = today.AddDays(1);

            // Tính tổng doanh thu của các hóa đơn có ngày tạo là hôm nay
            var doanhThuHomNay = await _context.HoaDons
                .Where(hd => hd.Created_at >= today && hd.Created_at < tomorrow)
                .SumAsync(hd => hd.total_price);

            return Ok(new { Ngay = today.ToString("yyyy-MM-dd"), TongDoanhThu = doanhThuHomNay });
        }

        /// <summary>
        /// Lấy toàn bộ danh thu của các tháng
        /// </summary>
        /// <returns> Lấy toàn bộ danh thu của các tháng </returns>

        // GET: api/HoaDon/DoanhThuTheoTungThang
        [HttpGet("DoanhThuTheoTungThang")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<object>>> GetDoanhThuTheoTungThang()
        {
            var doanhThuThang = await _context.HoaDons
                .GroupBy(hd => new { hd.Created_at.Year, hd.Created_at.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TotalRevenue = g.Sum(hd => hd.total_price)
                })
                .OrderBy(res => res.Year)
                .ThenBy(res => res.Month)
                .ToListAsync();

            return Ok(doanhThuThang);
        }

        // Sinh mã đơn hàng duy nhất
        private string GenerateOrderCode()
        {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var madonhang = new string(Enumerable.Repeat(characters, 8)
                .Select(s => s[new Random().Next(s.Length)]).ToArray());

            if (_context.HoaDons.Any(hd => hd.order_code == madonhang))
                return GenerateOrderCode();

            return madonhang;
        }

        /// <summary>
        /// Lấy danh sách sản phẩm bán chạy trong tháng và năm hiện tại
        /// </summary>
        /// <returns>Danh sách sản phẩm bán chạy trong tháng và năm hiện tại</returns>
        [HttpGet("SanPhamBanChayHienTai")]
        public async Task<ActionResult<IEnumerable<object>>> GetSanPhamBanChayHienTai()
        {
            // Lấy năm và tháng hiện tại
            var currentYear = DateTime.Now.Year;
            var currentMonth = DateTime.Now.Month;

            // Tính tổng số lượng sản phẩm bán ra trong tháng và năm hiện tại
            var sanPhamBanChay = await _context.HoaDonChiTiets
                .Where(hdct => hdct.HoaDon.Created_at.Year == currentYear && hdct.HoaDon.Created_at.Month == currentMonth)
                .GroupBy(hdct => hdct.sanpham_ids)
                .Select(g => new
                {
                    SanPhamIds = g.Key,
                    TotalQuantity = g.Sum(hdct => hdct.quantity),
                })
                .OrderByDescending(res => res.TotalQuantity)
                .ToListAsync();

            // Lấy chi tiết sản phẩm từ các sanpham_ids
            var result = new List<object>();

            foreach (var item in sanPhamBanChay)
            {
                var sanphamIds = item.SanPhamIds.Split(',').Select(int.Parse).ToList();
                var sanphams = await _context.Sanpham
                    .Where(sp => sanphamIds.Contains(sp.Id))
                    .Select(sp => new { sp.Tieude, sp.don_vi_tinh })
                    .ToListAsync();

                result.Add(new
                {
                    SanPhamIds = item.SanPhamIds,
                    SanPhamNames = string.Join(", ", sanphams.Select(sp => sp.Tieude)),
                    TotalQuantity = item.TotalQuantity,
                    SanPhamDonViTinh = string.Join(", ", sanphams.Select(sp => sp.don_vi_tinh)),
                });
            }

            return Ok(result);
        }


    }
}
