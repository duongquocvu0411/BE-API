using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model.DB;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VoucherController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        //  Tạo mã voucher ngẫu nhiên (6 ký tự chữ & số)
        private string GenerateVoucherCode()
        {
            string voucherCode;

            do
            {
                // Sinh mã voucher ngẫu nhiên từ GUID, lấy 6 ký tự đầu tiên
                voucherCode = "VC" + Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper(); // Lấy 6 ký tự từ GUID và chuyển thành chữ hoa

            } while (_context.Vouchers.Any(v => v.Code == voucherCode)); // Kiểm tra trong cơ sở dữ liệu xem mã voucher đã tồn tại chưa

            return voucherCode;
        }



        /// <summary>
        /// Xem danh sách Vouchers
        /// </summary>
        /// <returns>Xem danh sách Vouchers</returns>
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Voucher>>>> GetVouchers()
        {
            var vouchers = await _context.Vouchers.ToListAsync();

            return new BaseResponseDTO<IEnumerable<Voucher>>
            {
                Data = vouchers,
                Message = "Success"
            };
        }

        // 🟢 GET: api/Voucher/Active
        [HttpGet("Active")]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Voucher>>>> GetActiveVouchers()
        {
            var activeVouchers = await _context.Vouchers
                .Where(v => v.TrangthaiVoucher == true) // Lọc các voucher có TrangthaiVoucher = true
                .ToListAsync();

            return new BaseResponseDTO<IEnumerable<Voucher>>
            {
                Data = activeVouchers,
                Message = "Success"
            };
        }
        /// <summary>
        /// Xem chi tiết vouchers
        /// </summary>
        /// <param name="id">Xem chi tiết vouchers</param>
        /// <returns>Xem chi tiết vouchers</returns>

        // 🟢 GET: api/Voucher/{id}

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO<Voucher>>> GetVoucher(int id)
        {
            var voucher = await _context.Vouchers.FindAsync(id);

            if (voucher == null)
            {
                return new BaseResponseDTO<Voucher> { Code = 404, Message = "Vouchers không tồn tại" };
            }


            return new BaseResponseDTO<Voucher>
            {
                Data = voucher,
                Message = "Success"
            };
        }

        /// <summary>
        /// Tạo mới vouchers
        /// </summary>
        /// <param name="voucherDto">Tạo mới vouchers</param>
        /// <returns>Tạo mới vouchers</returns>

        [Authorize(Roles = "Admin,Employee")]
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO<Voucher>>> CreateVoucher([FromBody] VoucherDTO voucherDto)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            if (hotenToken == null)
            {
                return Unauthorized(new { message = "Không thể xác định người dùng từ token" });
            }

            //  Kiểm tra số tiền giảm giá và giá trị đơn hàng tối thiểu
            if (voucherDto.Sotiengiamgia < 1000 || voucherDto.Giatridonhang < 1000)
            {
                return BadRequest(new { message = "Số tiền giảm giá và giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 1.000." });
            }

            //  Kiểm tra ngày hết hạn phải lớn hơn ngày bắt đầu
            if (voucherDto.Ngayhethan <= voucherDto.Ngaybatdau)
            {
                return BadRequest(new { message = "Ngày kết thúc phải lớn hơn ngày bắt đầu." });
            }

            //  Tạo mã voucher ngẫu nhiên
            string newVoucherCode;
            do
            {
                newVoucherCode = GenerateVoucherCode();
            } while (await _context.Vouchers.AnyAsync(v => v.Code == newVoucherCode)); // Đảm bảo mã không trùng

            var voucher = new Voucher
            {
                Code = newVoucherCode, //  Gán mã tự động tạo
                Sotiengiamgia = voucherDto.Sotiengiamgia,
                Giatridonhang = voucherDto.Giatridonhang,
                Ngaybatdau = voucherDto.Ngaybatdau,
                Ngayhethan = voucherDto.Ngayhethan,
                Toidasudung = voucherDto.Toidasudung,
                TrangthaiVoucher = voucherDto.TrangthaiVoucher,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken
            };

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Thêm mới Voucher {voucher.Code} - trị giá {voucher.Sotiengiamgia}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };


            _context.Vouchers.Add(voucher);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<Voucher>
            {
                Data = voucher,
                Message = "Success"
            };
        }

        /// <summary>
        /// Chỉnh sửa Vouchers theo ID
        /// </summary>
        /// <param name="id"> Chỉnh sửa Vouchers theo ID</param>
        /// <param name="voucherDto"> Chỉnh sửa Vouchers theo ID</param>
        /// <returns> Chỉnh sửa Vouchers theo ID</returns>
        [Authorize(Roles = "Admin,Employee")]

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponseDTO<Voucher>>> UpdateVoucher(int id, [FromBody] VoucherDTO voucherDto)
        {
            var voucher = await _context.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return NotFound(new { message = "Voucher không tồn tại" });
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            if (hotenToken == null)
            {
                return Unauthorized(new { message = "Không thể xác định người dùng từ token" });
            }

            //  Kiểm tra số tiền giảm giá và giá trị đơn hàng tối thiểu
            if (voucherDto.Sotiengiamgia < 1000 || voucherDto.Giatridonhang < 1000)
            {
                return BadRequest(new { message = "Số tiền giảm giá và giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 1.000." });
            }

            //  Kiểm tra ngày hết hạn phải lớn hơn ngày bắt đầu
            if (voucherDto.Ngayhethan <= voucherDto.Ngaybatdau)
            {
                return BadRequest(new { message = "Ngày kết thúc phải lớn hơn ngày bắt đầu." });
            }

            // Cập nhật thông tin (không thay đổi mã voucher)
            voucher.Sotiengiamgia = voucherDto.Sotiengiamgia;
            voucher.Giatridonhang = voucherDto.Giatridonhang;
            voucher.Toidasudung = voucherDto.Toidasudung;
            voucher.Ngaybatdau = voucherDto.Ngaybatdau;
            voucher.Ngayhethan = voucherDto.Ngayhethan;
            voucher.TrangthaiVoucher = voucherDto.TrangthaiVoucher;
            voucher.UpdatedBy = hotenToken;

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Chỉnh sửa Voucher {voucher.Code}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Vouchers.Update(voucher);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<Voucher>
            {
                Data = voucher,
                Message = "Success"
            };
        }


        /// <summary>
        /// Xóa Vouchers
        /// </summary>
        /// <param name="id">Xóa Vouchers</param>
        /// <returns>Xóa Vouchers</returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseDTO<Voucher>>> DeleteVoucher(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var voucher = await _context.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return NotFound(new { message = "Voucher không tồn tại" });
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa Voucher {voucher.Code} - trị giá {voucher.Sotiengiamgia}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Vouchers.Remove(voucher);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<Voucher>
            {
                Data = voucher,
                Message = "Success"
            };
        }
    }
}
