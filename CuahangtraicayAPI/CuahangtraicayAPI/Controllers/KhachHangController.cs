using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using CuahangtraicayAPI.DTO;


namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly AppDbContext _context;

        public KhachHangController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách của Khách hàng và hóa đơn
        /// </summary>
        /// <returns> Lấy danh sách của Khách hàng và hóa đơn</returns>

        // GET: api/KhachHang
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<KhachHang>>>> GetKhachHangs()
        {
            var khachHangs = await _context.KhachHangs
                .Include(kh => kh.HoaDons)

                .ToListAsync();

           

            return Ok(new BaseResponseDTO<IEnumerable <KhachHang>>
            {
                Data = khachHangs,
                Message =" Success"
            });
        }

        /// <summary>
        /// Xem khách hàng theo id có hóa đơn, hóa đơn chi tiết
        /// </summary>
        /// <returns> xem khách hàng theo id có hóa đơn , hóa đơn chi tiết </returns>

        // GET: api/KhachHang/5
        /// <summary>
        /// Xem khách hàng theo id có hóa đơn, hóa đơn chi tiết
        /// </summary>
        /// <returns> xem khách hàng theo id có hóa đơn , hóa đơn chi tiết </returns>


        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO<Object>>> GetKhachHang(int id)
        {
            var khachHang = await _context.KhachHangs
                .Include(kh => kh.HoaDons)
                    .ThenInclude(hd => hd.HoaDonChiTiets)
                    .ThenInclude(sp => sp.SanPham)
                .FirstOrDefaultAsync(kh => kh.Id == id);

            if (khachHang == null)
            {
                return NotFound(new BaseResponseDTO<KhachHang> { Code=404, Message = "Không tìm thấy khách hàng với ID này." });
            }
            // Xử lý dữ liệu trả về ngắn gọn
            var response = new
            {
                
                ten = khachHang.Ten,
                ho = khachHang.Ho,
                diaChiCuThe = khachHang.DiaChiCuThe,
                thanhpho = khachHang.ThanhPho,
                tinhthanh = khachHang.tinhthanhquanhuyen,
                xaphuong = khachHang.xaphuong,
                sdt = khachHang.Sdt,
                email = khachHang.EmailDiaChi,
                ghichu = khachHang.GhiChu,
                hoaDons = khachHang.HoaDons.Select(hd => new
                {
                    id=hd.Id,
                    ngaytao = hd.Created_at,
                    total_price = hd.total_price,
                    order_code = hd.order_code,
                    thanhtoan = hd.Thanhtoan,
                    status = hd.status,
                    hoaDonChiTiets = hd.HoaDonChiTiets.Select(hdct => new
                    {
                        tieude = hdct.SanPham?.Tieude,
                        don_vi_tinh = hdct.SanPham?.don_vi_tinh,
                        price = hdct.price,
                        quantity = hdct.quantity,
                        id=hdct.Id,
                        bill_id =hdct.bill_id
                    })
                })
            };

            return Ok(new BaseResponseDTO<Object>
            {
                Data =response,
                Message =" Success"
            });
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <returns> Thêm mới khách hàng</returns>

        // POST: api/KhachHang
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO< KhachHang>>> PostKhachHang(DTO.KhachHangCreateDto kh)
        { // Kiểm tra tính hợp lệ của dữ liệu
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Trả về lỗi nếu không hợp lệ
            }
            // Chuyển đổi từ DTO sang Model
            var khachHang = new KhachHang
            {
                Ten = kh.Ten,
                Ho = kh.Ho,
                DiaChiCuThe = kh.DiaChiCuThe,
                tinhthanhquanhuyen = kh.tinhthanhquanhuyen,
                ThanhPho = kh.ThanhPho,
                xaphuong = kh.xaphuong,
                Sdt = kh.Sdt,
                EmailDiaChi = kh.EmailDiaChi,
                GhiChu = kh.GhiChu
            };

            // Thêm khách hàng vào cơ sở dữ liệu
            _context.KhachHangs.Add(khachHang);
            await _context.SaveChangesAsync();

            // Trả về kết quả sau khi thêm thành công
            return Ok(new BaseResponseDTO<KhachHang>
            {
                Data = khachHang,
                Message = "Success"
            });
        }

        /// <summary>
        /// Xóa khách hàng theo {id} 
        /// </summary>
        /// <returns> Xóa khách hàng theo {id} </returns>

        // DELETE: api/KhachHang/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteKhachHang(int id)
        {

            var KhachHang = await _context.KhachHangs.FindAsync(id);

            if (KhachHang == null)
            {
                return NotFound(new { mewssage = " không tìm thấy khách hàng với id này" });
            }

            _context.KhachHangs.Remove(KhachHang);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { mesaage = " Xóa khách hàng thành công" });

        }

        /// <summary>
        /// Lấy tổng số khách hàng mới trong tháng hiện tại
        /// </summary>
        /// <returns> Tổng số khách hàng mới trong tháng hiện tại </returns>

        // GET: api/KhachHang/NewCustomersInMonth
        [HttpGet("khachhangthangmoi")]
        [Authorize]
        public async Task<ActionResult<BaseResponseDTO<object>>> LayTongKhachHangMoiTrongThang()
        {
            var thangHientai = DateTime.Now.Month;
            var namHientai = DateTime.Now.Year;

            // Lọc các khách hàng có Created_at trong tháng hiện tại
            var tongSoKhachHangMoi = await _context.KhachHangs
                .Where(kh => kh.Created_at.Month == thangHientai && kh.Created_at.Year == namHientai)
                .CountAsync();

            // Tạo đối tượng phản hồi
            var response = new
            {
                tongSoKhachHangMoi = tongSoKhachHangMoi,
                thangHienTai = thangHientai,
                namHienTai = namHientai
            };

            return Ok(new BaseResponseDTO<object>
            {
                Code = 0,
                Message = "Success",
                Data = response
            });
        }


        // Phương thức kiểm tra sự tồn tại của KhachHang
        private bool KhachHangExists(int id)
        {
            return _context.KhachHangs.Any(e => e.Id == id);
        }


        // hàm lấy tên sản phẩm và đon vị tính 
        //private async Task<(string SanphamNames, string SanphamDonViTinh, bool IsDeleted)> GetSanPhamDetails(string sanPhamIds)
        //{
        //    if (string.IsNullOrWhiteSpace(sanPhamIds))
        //    {
        //        return (null, null, false); // Nếu chuỗi rỗng hoặc chỉ có khoảng trắng, trả về null
        //    }

        //    // Tách chuỗi sanPhamIds thành danh sách các ID
        //    var ids = sanPhamIds.Trim('[', ']').Split(',')
        //        .Select(id =>
        //        {
        //            int result;
        //            return int.TryParse(id, out result) ? result : (int?)null;
        //        })
        //        .Where(id => id.HasValue)  // Lọc bỏ các giá trị null
        //        .Select(id => id.Value)
        //        .ToList();

        //    if (!ids.Any())
        //    {
        //        return (null, null, false); // Nếu không có ID hợp lệ, trả về null
        //    }

        //    // Lấy thông tin sản phẩm từ cơ sở dữ liệu, bao gồm các sản phẩm đã xóa và chưa xóa
        //    var sanphams = await _context.Sanpham
        //        .Where(sp => ids.Contains(sp.Id)) // Lấy tất cả sản phẩm theo ID
        //        .Select(sp => new
        //        {
        //            sp.Tieude,  // Tên sản phẩm
        //            sp.don_vi_tinh, // Đơn vị tính
        //            sp.Xoa // Kiểm tra xem sản phẩm có bị xóa không
        //        })
        //        .ToListAsync();

        //    if (!sanphams.Any())
        //    {
        //        return (null, null, false); // Nếu không có sản phẩm hợp lệ, trả về null
        //    }

        //    // Kiểm tra xem sản phẩm có bị xóa không và trả về tên/đơn vị tính phù hợp
        //    string sanphamNames = string.Join(", ", sanphams.Select(sp => sp.Xoa ? $"{sp.Tieude} (Đã xóa)" : sp.Tieude));
        //    string donViTinh = string.Join(", ", sanphams.Select(sp => sp.Xoa ? $"{sp.don_vi_tinh} (Đã xóa)" : sp.don_vi_tinh));

        //    // Trả về thông tin tên sản phẩm, đơn vị tính và trạng thái bị xóa
        //    return (sanphamNames, donViTinh, sanphams.Any(sp => sp.Xoa));
        //}


    }
}