using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Services;
using System.Globalization;

using CuahangtraicayAPI.Model.Order;
using CuahangtraicayAPI.Model.VnPay;


namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailHelper _emailHelper;
        private readonly IVnPayService _vnPayService;
        private readonly MoMoPaymentService _momoService;

        public HoaDonController(AppDbContext context, EmailHelper emailHelper, IVnPayService vnPayService, MoMoPaymentService momoService)
        {
            _context = context;
            _emailHelper = emailHelper;
            _vnPayService = vnPayService;
            _momoService = momoService;
        }

        /// <summary>
        /// Lấy danh sách hóa đơn
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetHoaDons()
        {
            var hoadons = await _context.HoaDons.ToListAsync();
            var result = new List<object>();

            foreach (var hd in hoadons)
            {
                result.Add(new
                {
                    hd.Id,
                    hd.khachhang_id,
                    hd.total_price,
                    hd.Thanhtoan,
                    hd.order_code,
                    hd.UpdatedBy,
                    hd.status,
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
        /// Tạo hóa đơn mới
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> CreateHoaDon(HoadonDTO.HoaDonDto hoaDonDto)
        {
            var orderCode = GenerateOrderCode(); // Tạo mã đơn hàng
            var totalPrice = 0m;

            // Tính tổng giá trị đơn hàng
            for (int i = 0; i < hoaDonDto.SanphamIds.Count; i++)
            {
                var sanpham = await _context.Sanpham
                    .Include(sp => sp.SanphamSales)
                    .FirstOrDefaultAsync(sp => sp.Id == hoaDonDto.SanphamIds[i]);

                if (sanpham == null)
                {
                    return BadRequest(new { message = $"Sản phẩm với ID {hoaDonDto.SanphamIds[i]} không tồn tại." });
                }

                var activeSale = sanpham.SanphamSales.FirstOrDefault(sale => sale.trangthai == "Đang áp dụng");
                var gia = activeSale != null ? activeSale.giasale : sanpham.Giatien;

                if (sanpham.Soluong < hoaDonDto.Quantities[i])
                {
                    return BadRequest(new { message = $"Số lượng sản phẩm '{sanpham.Tieude}' không đủ." });
                }

                totalPrice += (gia) * hoaDonDto.Quantities[i];
            }

            // Tạo hóa đơn trước khi thanh toán
            var bill = new HoaDon
            {
                khachhang_id = hoaDonDto.KhachHangId,
                total_price = totalPrice,
                order_code = orderCode,
                Thanhtoan = hoaDonDto.PaymentMethod,
                status = hoaDonDto.PaymentMethod == "VnPay" || hoaDonDto.Thanhtoan == "Momo" ? "Chờ thanh toán" : "Chờ xử lý", // Xử lý đúng trạng thái
                UpdatedBy = hoaDonDto.Updated_By ?? "Chưa có tác động"
            };

            _context.HoaDons.Add(bill);
            await _context.SaveChangesAsync();

            // Xử lý chi tiết hóa đơn
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
                    // Trừ số lượng sản phẩm trong kho nếu không phải thanh toán qua VnPay
                    //if (hoaDonDto.PaymentMethod == "VnPay" || hoaDonDto.PaymentMethod == "Momo")
                    //{
                    //    sanpham.Soluong -= hoaDonDto.Quantities[i];
                    //    if (sanpham.Soluong <= 0)
                    //    {
                    //        sanpham.Soluong = 0; // Đảm bảo số lượng không bị âm
                    //        sanpham.Trangthai = "Hết hàng"; // Cập nhật trạng thái thành "Hết hàng"
                    //    }
                    //    _context.Sanpham.Update(sanpham);
                    //}
                    _context.HoaDonChiTiets.Add(chiTiet);
                }
            }

            await _context.SaveChangesAsync(); // Lưu thông tin hóa đơn và chi tiết hóa đơn

            // Gửi email thông báo hóa đơn                             
            await GuiEmailHoaDon(bill, totalPrice, orderCode);

            // Xử lý phương thức thanh toán
            if (hoaDonDto.PaymentMethod == "VnPay")
            {
                // Tạo URL thanh toán VnPay
                var paymentInfo = new PaymentInformationModel
                {
                    OrderType = "billpayment",
                    Amount = (double)totalPrice,
                    OrderDescription = $"Thanh toán hóa đơn {orderCode}",
                    Name = "Khách hàng",
                    OrderCode = orderCode
                };

                var paymentUrl = _vnPayService.CreatePaymentUrl(paymentInfo, HttpContext);

                //bill.status = "Chờ thanh toán qua VnPay";
                await _context.SaveChangesAsync();

                return Ok(new { message = "URL thanh toán VnPay được tạo thành công.", paymentUrl, bill });
            }
            else if (hoaDonDto.PaymentMethod == "Momo")
            {
                // Tạo URL thanh toán MoMo
                var momoRequest = new OrderInfoModel
                {
                    FullName = "Khách hàng",
                    Amount = (double)totalPrice,
                    OrderInfo = $"Thanh toán hóa đơn {orderCode}",
                    OrderCode = orderCode
                };

                var momoResponse = await _momoService.CreatePaymentAsync(momoRequest);

                if (momoResponse.ErrorCode == 0)
                {
                    //bill.status = "Chờ thanh toán qua Momo";
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "URL thanh toán Momo được tạo thành công.", payUrl = momoResponse.PayUrl, bill });
                }
                else
                {
                    return BadRequest(new { message = "Không thể tạo thanh toán qua Momo.", error = momoResponse.Message });
                }
            }
            else
            {
                //bill.status = "Chờ xử lý";
                await _context.SaveChangesAsync();

                return Ok(new { message = "Đơn hàng đã được tạo thành công", order_code = orderCode, bill });
            }

        }
        private async Task GuiEmailHoaDon(HoaDon bill, decimal totalPrice, string orderCode)
        {
            var Kh = await _context.KhachHangs.FirstOrDefaultAsync(kh => kh.Id == bill.khachhang_id);

            var ChudeEmail = "Thông báo: Đơn hàng mới được tạo";
            var NoidungEmail = $@"
                        <h2>Thông tin hóa đơn mới</h2>
                        <p><strong>Khách hàng:</strong> {Kh?.Ho} {Kh?.Ten}</p>
                        <p><strong>Email:</strong> {Kh?.EmailDiaChi}</p>
                        <p><strong>Số điện thoại:</strong> {Kh?.Sdt}</p>
                        <p><strong>Địa chỉ:</strong> {Kh?.DiaChiCuThe}, {Kh?.xaphuong}, {Kh?.tinhthanhquanhuyen}, {Kh?.ThanhPho}</p>
                        <p><strong>Mã đơn hàng:</strong> {orderCode}</p>
                        <h3>Chi tiết đơn hàng</h3>
                        <table style='width: 100%; border-collapse: collapse; border: 1px solid #ddd;'>
                            <thead>
                                <tr style='background-color: #f8f9fa;'>
                                    <th style='border: 1px solid #ddd; padding: 8px;'>STT</th>
                                    <th style='border: 1px solid #ddd; padding: 8px;'>Sản phẩm</th>
                                    <th style='border: 1px solid #ddd; padding: 8px;'>Số lượng</th>
                                    <th style='border: 1px solid #ddd; padding: 8px;'>Đơn giá</th>
                                    <th style='border: 1px solid #ddd; padding: 8px;'>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>";

            int stt = 1;
            foreach (var chiTiet in _context.HoaDonChiTiets.Where(ct => ct.bill_id == bill.Id))
            {
                var sanphamId = int.Parse(chiTiet.sanpham_ids);
                var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == sanphamId);

                NoidungEmail += $@"
                            <tr>
                                <td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>{stt++}</td>
                                <td style='border: 1px solid #ddd; padding: 8px;'>{sanpham?.Tieude ?? "Sản phẩm đã bị xóa"}</td>
                                <td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>{chiTiet.quantity}</td>
                                <td style='border: 1px solid #ddd; padding: 8px; text-align: right;'>{(chiTiet.price / chiTiet.quantity).ToString("N0", new CultureInfo("vi-VN"))} VND</td>
                                <td style='border: 1px solid #ddd; padding: 8px; text-align: right;'>{chiTiet.price.ToString("N0", new CultureInfo("vi-VN"))} VND</td>
                            </tr>";
            }

            NoidungEmail += $@"
                            <tr style='background-color: #f8f9fa; font-weight: bold;'>
                                <td colspan='5' style='border: 1px solid #ddd; padding: 8px; text-align: right;'>Tổng cộng: {totalPrice.ToString("N0", new CultureInfo("vi-VN"))} VND</td>
                          
                            </tr>
                        </tbody>
                    </table>";

            // Gửi email bất đồng bộ
#pragma warning disable CS4014
            Task.Run(async () =>
            {
                try
                {
                    await _emailHelper.GuiEmailAsync("quocvu0411@gmail.com", ChudeEmail, NoidungEmail); // gửi mail chính cho mail quocvu0411@gmail.com 
                    if (!string.IsNullOrEmpty(Kh?.EmailDiaChi))
                    {
                        await _emailHelper.GuiEmailAsync(Kh.EmailDiaChi, ChudeEmail, NoidungEmail); // gửi mail cho người mua hàng 
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                }
            });
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
                hoaDon.Thanhtoan,

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
        public async Task<ActionResult> UpdateStatus(int id, [FromBody] HoadonDTO.UpdateStatusDto dto)
        {
            // Tìm hóa đơn và bao gồm thông tin khách hàng
            var bill = await _context.HoaDons
                .Include(h => h.KhachHang)
                .Include(ct => ct.HoaDonChiTiets)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (bill == null)
                return NotFound(new { message = "Không tìm thấy đơn hàng" });

            Console.WriteLine($"Phương thức thanh toán: {bill.Thanhtoan}");

            if (string.Equals(bill.Thanhtoan.Trim(), "VnPay", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(bill.Thanhtoan.Trim(), "Momo", StringComparison.OrdinalIgnoreCase))
            {
                // Đơn hàng thanh toán qua VnPay hoặc MoMo, chỉ cập nhật trạng thái mà không thay đổi số lượng
                Console.WriteLine("Đơn hàng thanh toán qua VnPay hoặc MoMo, không cập nhật số lượng sản phẩm.");
            }
            else
            {
                // Cập nhật số lượng sản phẩm nếu không phải VnPay hoặc MoMo
                if (dto.Status == "Đã giao thành công")
                {
                    foreach (var chiTiet in bill.HoaDonChiTiets)
                    {
                        var sanphamId = int.Parse(chiTiet.sanpham_ids);
                        var sanpham = await _context.Sanpham.FirstOrDefaultAsync(sp => sp.Id == sanphamId);

                        if (sanpham != null)
                        {
                            sanpham.Soluong -= chiTiet.quantity;

                            if (sanpham.Soluong <= 0)
                            {
                                sanpham.Soluong = 0;
                                sanpham.Trangthai = "Hết hàng";
                            }

                            _context.Sanpham.Update(sanpham);
                        }
                    }
                }
            }

            // Cập nhật trạng thái hóa đơn
            if (bill.status != dto.Status)
            {
                bill.status = dto.Status;
                bill.UpdatedBy = dto.Updated_By;
                bill.Updated_at = DateTime.Now;
            }

            // Lưu thay đổi vào database
            try
            {
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Số bản ghi được cập nhật: {rowsAffected}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lưu thay đổi: {ex.Message}");
                return BadRequest(new { message = "Lỗi khi lưu thay đổi trạng thái." });
            }

            // Lấy email của khách hàng
            var khEmail = bill.KhachHang?.EmailDiaChi;
            Console.WriteLine($"Đang kiểm tra email khách hàng: {khEmail}");

            if (!string.IsNullOrEmpty(khEmail))
            {
                var EmailSub = "Cập nhật trạng thái đơn hàng";
                var emailNoidung = $"Đơn hàng của bạn (Mã đơn: {bill.order_code}) đã được cập nhật trạng thái thành: {bill.status}.";

                // Gửi email trong nền không cần phải chờ gữi mail trước rồi mới cập nhật trạng thái sau
                Task.Run(async () =>
                {
                    try
                    {
                        Console.WriteLine($"Đang gửi email đến: {khEmail}");
                        await _emailHelper.GuiEmailAsync(khEmail, EmailSub, emailNoidung);
                        Console.WriteLine("Gửi email thành công!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                    }
                });
            }
            else
            {
                Console.WriteLine("Không có email khách hàng để gửi thông báo.");
            }

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
        [Authorize]
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
