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

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VoucherController(AppDbContext context)
        {
            _context = context;
        }

        //  Tạo mã voucher ngẫu nhiên (6 ký tự chữ & số)
        private string GenerateVoucherCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());
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

            _context.Vouchers.Add(voucher);
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

            _context.Vouchers.Update(voucher);
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
            var voucher = await _context.Vouchers.FindAsync(id);
            if (voucher == null)
            {
                return NotFound(new { message = "Voucher không tồn tại" });
            }

            _context.Vouchers.Remove(voucher);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<Voucher>
            {
                Data = voucher,
                Message = "Success"
            };
        }
    }
}
