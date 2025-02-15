using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Services;
using CuahangtraicayAPI.Model.ghn;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;



namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IGhnService _ghnService;
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public KhachHangController(AppDbContext context, IGhnService ghnService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _ghnService = ghnService;
            _httpContextAccessor = httpContextAccessor;
        }



        /// <summary>
        /// Lấy danh sách của Khách hàng và hóa đơn
        /// </summary>
        /// <returns> Lấy danh sách của Khách hàng và hóa đơn</returns>

        // GET: api/KhachHang
        [HttpGet]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<KhachHang>>>> GetKhachHangs()
        {
            var khachHangs = await _context.KhachHangs
                .Where(kh => kh.Xoa == false)
                .Include(kh => kh.HoaDons)

                .ToListAsync();



            return Ok(new BaseResponseDTO<IEnumerable<KhachHang>>
            {
                Data = khachHangs,
                Message = " Success"
            });
        }


        /// <summary>
        /// Xem lịch sử giao dịch Admin toàn quyền
        /// </summary>
        /// <param name="userId">Xem lịch sử giao dịch Admin toàn quyền</param>
        /// <returns>Xem lịch sử giao dịch Admin toàn quyền</returns>

        [HttpGet]
        [Route("user-orders/{userId}")]
        [Authorize] // Yêu cầu xác thực
        public async Task<ActionResult<KhachHang>> GetUserOrders(string userId)
        {
            // Kiểm tra xem người dùng hiện tại có vai trò Admin hay không
            var isAdmin = _httpContextAccessor.HttpContext.User.IsInRole("Admin");

            // Lấy UserId của người dùng hiện tại (nếu không phải Admin)
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Nếu không phải Admin và UserId trong route không khớp với UserId hiện tại, từ chối
            if (!isAdmin && userId != currentUserId)
            {
                return Unauthorized(new { status = "error", message = "Không có quyền xem thông tin của người dùng khác." });
            }

            // Xây dựng query dựa trên vai trò và UserId
            IQueryable<KhachHang> khachHangQuery = _context.KhachHangs;
            if (!isAdmin)
            {
                khachHangQuery = khachHangQuery.Where(kh => kh.UserNameLogin == userId); // Lọc cho user hiện tại
            }

            // Tìm danh sách khách hàng theo UserId
            var customers = await _context.KhachHangs
                .Where(kh => kh.UserNameLogin == userId)
                .Select(kh => new
                {
                    kh.Id,
                    kh.Ten,
                    kh.Ho,
                    kh.DiaChiCuThe,
                    kh.ThanhPho,
                    kh.tinhthanhquanhuyen,
                    kh.xaphuong,
                    kh.Sdt,
                    kh.EmailDiaChi,
                    kh.GhiChu,
                    kh.UserNameLogin,

                    Orders = _context.HoaDons
                        .Where(hd => hd.khachhang_id == kh.Id)
                        .Select(hd => new
                        {
                            hd.Id,
                            hd.order_code,
                            hd.total_price,
                            hd.status,
                            hd.Thanhtoan,
                            hd.Ghn,
                            hd.Created_at,
                            // Thêm mã giao dịch từ bảng PaymentTransactions
                            TransactionId = _context.PaymentTransactions
                                .Where(pt => pt.OrderId == hd.order_code) // Giả sử OrderId trong PaymentTransactions khớp với order_code trong HoaDons
                                .Select(pt => pt.TransactionId)
                                .FirstOrDefault(), // Lấy mã giao dịch đầu tiên nếu có

                            // lấy thêm trạng thái mã giao dịch

                            ResponseMessage = _context.PaymentTransactions
                                .Where(gd => gd.OrderId == hd.order_code)
                                .Select(gd => gd.ResponseMessage)
                                .FirstOrDefault()
                        })
                        .ToList()
                })
                .ToListAsync();  // Sử dụng ToListAsync để tránh blocking

            if (customers.Count == 0)
            {
                return Ok(new
                {
                    status = "success",
                    message = "Tài khoản không có khách hàng hoặc đơn hàng.",
                    data = new
                    {
                        userId,
                        totalOrders = 0,
                        totalSpent = 0,
                        totalWaitingConfirmOrders = 0,  // Thêm
                        totalCanceledOrders = 0, // Thêm
                        customers = new List<object>()
                    }
                });
            }

            // Tính tổng số đơn hàng và tổng số tiền đã chi tiêu
            var totalOrders = customers.Sum(c => c.Orders.Count);
            var totalSpent = customers.Sum(c => c.Orders
                                                   .Where(hd => hd.status == "delivered")
                                                   .Sum(o => o.total_price));

            // Tính tổng số đơn hàng ở trạng thái "Chờ xử lý"
            var tongsodonChoXuLy = customers.Sum(c => c.Orders
                                                                .Count(o => o.status == "Chờ xử lý"));

            // Tính tổng số đơn hàng ở trạng thái "Hủy đơn"
            var tongsodonHuyDon = customers.Sum(c => c.Orders
                                                            .Count(o => o.status == "Hủy đơn"));

            // Tính tổng số đơn hàng ở trạng thái vận chuyển (đang giao + đã giao)
            var totalDelivering = customers.Sum(c => c.Orders
                                                               .Count(o => o.status == "delivering"));
            var totalDelivered = customers.Sum(c => c.Orders
                                                                .Count(o => o.status == "delivered"));

            // Tính tổng số đơn hàng ở trạng thái vận chuyển (đang giao + đã giao)
            var tongSoDangGiaoVaDaGiao = totalDelivering + totalDelivered;

            return Ok(new
            {
                status = "success",
                message = "Thông tin khách hàng và đơn hàng của tài khoản.",
                data = new
                {
                    userId,
                    totalOrders,           // Tổng số đơn hàng
                    totalSpent,            // Tổng số tiền đã chi tiêu
                    tongsodonChoXuLy,   // Thêm
                    tongsodonHuyDon, // Thêm
                    //tongSoDangGiaoVaDaGiao,
                    totalDelivering,
                    totalDelivered,
                    customers           // Danh sách khách hàng
                }
            });
        }

        /// <summary>
        /// Xem khách hàng theo id có hóa đơn, hóa đơn chi tiết
        /// </summary>
        /// <returns> xem khách hàng theo id có hóa đơn , hóa đơn chi tiết </returns>

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<Object>>> GetKhachHang(int id)
        {
            var khachHang = await _context.KhachHangs

                .Include(kh => kh.HoaDons)
                    .ThenInclude(hd => hd.HoaDonChiTiets)
                    .ThenInclude(sp => sp.SanPham)
                    .ThenInclude(sp => sp.Donvitinhs)

                .FirstOrDefaultAsync(kh => kh.Id == id);

            if (khachHang == null)
            {
                return NotFound(new BaseResponseDTO<KhachHang> { Code = 404, Message = "Không tìm thấy khách hàng với ID này." });
            }

            // lấy danh sách bảng ghn theo mã order_code
            var or = khachHang.HoaDons.Select(hd => hd.order_code).ToList();

            // truy vấn 
            var ghn = await _context.GhnOrders
               .Where(g => or.Contains(g.Client_order_code))
               .ToListAsync();

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
                    id = hd.Id,
                    ngaytao = hd.Created_at,
                    total_price = hd.total_price,
                    order_code = hd.order_code,
                    ghn = ghn.FirstOrDefault(r => r.Client_order_code == hd.order_code),
                    thanhtoan = hd.Thanhtoan,
                    ma_voucher = hd.ma_voucher,
                    vouchergiamgia = hd.voucher_giamgia,
                    status = hd.status,

                    hoaDonChiTiets = hd.HoaDonChiTiets.Select(hdct => new
                    {
                        Ma_Sp = hdct.SanPham?.ma_sanpham,
                        tieude = hdct.SanPham?.Tieude,
                        don_vi_tinh = hdct.SanPham.Donvitinhs.name,
                        price = hdct.price,
                        quantity = hdct.quantity,
                        id = hdct.Id,
                        bill_id = hdct.bill_id
                    })
                })
            };

            return Ok(new BaseResponseDTO<Object>
            {
                Data = response,
                Message = " Success"
            });
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <returns> Thêm mới khách hàng</returns>

        // POST: api/KhachHang
        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO<KhachHang>>> PostKhachHang(DTO.KhachHangCreateDto kh)
        {
            // Kiểm tra tính hợp lệ của dữ liệu
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Trả về lỗi nếu không hợp lệ
            }

            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var emailFromToken = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            // Kiểm tra trạng thái tài khoản
            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(u => u.UserId == userId);
            var admin = await _context.AdminProfiles.FirstOrDefaultAsync(u => u.UserId == userId);
            if (userProfile == null && admin == null)
            {
                return Unauthorized(new BaseResponseDTO<KhachHang>
                {
                    Data = null,
                    Message = "Tài khoản không tồn tại."
                });
            }

            if (userProfile != null && userProfile.TrangThaiTK == 0) // 0: Bị khóa
            {
                return Unauthorized(new BaseResponseDTO<KhachHang>
                {
                    Data = null,
                    Message = "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên."
                });
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
                EmailDiaChi = emailFromToken,
                GhiChu = kh.GhiChu,
                UserNameLogin = userId,
                CreatedBy = "Khách hàng",
                UpdatedBy = "Chưa tác động",
              
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
        /// Tạo đơn giao hàng nhanh
        /// </summary>
        /// <param name="id"></param>
        /// <param name="idShop"></param>
        /// <returns>Tạo đơn giao hàng nhanh</returns>
        [HttpPost("{id_khachhang}/create-order")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> CreateOrder(int id_khachhang)
        {
            // Lấy thông tin khách hàng
            var khachHang = GetKhachHangById(id_khachhang);
            if (khachHang == null)
                return NotFound(new { message = "Khách hàng không tồn tại." });

            // Lấy hóa đơn đầu tiên của khách hàng
            var hoaDon = khachHang.HoaDons.FirstOrDefault();
            if (hoaDon == null)
                return BadRequest(new { message = "Khách hàng không có hóa đơn hợp lệ." });

            // Kiểm tra trạng thái hóa đơn
            if (hoaDon.status == "Hủy đơn")
                return BadRequest(new { message = "Không thể lên đơn hàng với trạng thái 'Hủy đơn'." });

            // Kiểm tra nếu ClientOrderCode đã tồn tại trong GhnOrders
            var existingOrder = await _context.GhnOrders
                .FirstOrDefaultAsync(o => o.Client_order_code == hoaDon.order_code);

            if (existingOrder != null)
            {
                // Nếu mã đã tồn tại, trả về lỗi và không cho phép lên đơn
                return BadRequest(new
                {
                    message = "Mã đơn hàng này đã được sử dụng để tạo đơn GHN.",
                    //existingOrderId = existingOrder.ghn_order_id // Trả về mã GHN đã tồn tại nếu cần
                });
            }

            // Tiếp tục xử lý lên đơn nếu mã không tồn tại
            int codAmount = (hoaDon.Thanhtoan == "Momo" || hoaDon.Thanhtoan == "VnPay") ? 0 : (int)hoaDon.total_price;
            var shopid = _ghnService.GetShopid();
            var request = new GhnOrderRequest
            {
                ShopId = shopid,
                ToName = $"{khachHang.Ho} {khachHang.Ten}",
                ToPhone = khachHang.Sdt,
                ToAddress = khachHang.DiaChiCuThe,
                ToWardName = khachHang.xaphuong,
                ToDistrictName = khachHang.tinhthanhquanhuyen,
                ToProvinceName = khachHang.ThanhPho,
                ClientOrderCode = hoaDon.order_code,
                CodAmount = codAmount,
                InsuranceValue = hoaDon.total_price > 5000000 ? 5000000 : (int)hoaDon.total_price,
                Items = hoaDon.HoaDonChiTiets.Select(hdct => new GhnOrderItem
                {
                    Name = hdct.SanPham?.Tieude ?? "Sản phẩm",
                    Code = $"SP{hdct.Id}",
                    Quantity = hdct.quantity,
                    Price = (int)hdct.price,
                    Category = new GhnCategory { Level1 = "Thực phẩm" }
                }).ToList()
            };

            // Gửi yêu cầu tạo đơn hàng GHN
            var ghnResponse = await _ghnService.CreateOrderAsync(request);

            // Lấy mã đơn hàng GHN từ phản hồi
            var ghnOrderId = ghnResponse.Data.OrderCode;
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            // Lưu thông tin đơn hàng GHN vào cơ sở dữ liệu

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var ghnOrder = new GhnOrder
            {
                ghn_order_id = ghnOrderId,
                Client_order_code = hoaDon.order_code,
                Status = "Created",
                UpdatedBy = hotenToken,
                Created_at = DateTime.Now,
                Updated_at = DateTime.Now
            };

            _context.GhnOrders.Add(ghnOrder);

            // Cập nhật trạng thái GHN của hóa đơn
            hoaDon.Ghn = "Đã lên đơn";
            hoaDon.status = "Chờ lấy hàng";
            hoaDon.UpdatedBy = hotenToken;
            _context.HoaDons.Update(hoaDon);

            var logs = new Logs
            {
                UserId = users,
                HanhDong = $"Lên đơn GHN {ghnOrder.ghn_order_id} - mã đơn hàng oreder_code: {hoaDon.order_code}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,

            };
            _context.Logss.Add(logs);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Tạo đơn hàng thành công.", ghn_order_id = ghnOrderId });
        }




        // Hàm lấy thông tin khách hàng
        private KhachHang GetKhachHangById(int id)
        {
            return _context.KhachHangs
                .Include(kh => kh.HoaDons)
                .ThenInclude(hd => hd.HoaDonChiTiets)
                .ThenInclude(hdct => hdct.SanPham)
                .ThenInclude(hdct => hdct.Donvitinhs)
                .FirstOrDefault(kh => kh.Id == id);
        }
        /// <summary>
        /// Xóa khách hàng theo {id} 
        /// </summary>
        /// <returns> Xóa khách hàng theo {id} </returns>

        // DELETE: api/KhachHang/5
        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin,Employee")]
        public async Task<IActionResult> DeleteKhachHang(int id)
        {
            // Tìm khách hàng theo ID
            var khachHang = await _context.KhachHangs.FindAsync(id);
            // Lấy thông tin "hoten" từ token
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            // Kiểm tra nếu không tìm thấy khách hàng
            if (khachHang == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng với ID này" });
            }

            // Cập nhật cột 'xoa' thành true
            khachHang.Xoa = true;
            khachHang.UpdatedBy = hotenToken;
            khachHang.Updated_at = DateTime.Now;

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa khách hàng {khachHang.Id} - {khachHang.Ho} {khachHang.Ten}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Logss.Add(log);
            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { message = "Khách hàng đã được đánh dấu là đã xoá" });
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

    }
}