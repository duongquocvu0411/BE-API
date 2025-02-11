using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Model.DB;
using CuahangtraicayAPI.Model.ghn;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CuahangtraicayAPI.Services.gn
{
    public interface ISyncGhnStatusService
    {
        Task SyncOrderStatusesAsync();
    }
    public class GhnSyncBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public GhnSyncBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var syncService = scope.ServiceProvider.GetRequiredService<ISyncGhnStatusService>();
                    await syncService.SyncOrderStatusesAsync();
                }

                // Lặp lại sau mỗi 10 phút
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }
    }
    public class SyncGhnStatusService : ISyncGhnStatusService
    {
        private readonly AppDbContext _dbContext;
        private readonly HttpClient _httpClient;
        private readonly GhnSettings _settings;
        private readonly EmailHelper _emailHelper;

        public SyncGhnStatusService(AppDbContext dbContext, HttpClient httpClient, IOptions<GhnSettings> settings,EmailHelper emailHelper)
        {
            _dbContext = dbContext;
            _httpClient = httpClient;
            _settings = settings.Value;
            _emailHelper = emailHelper;
        }

        public async Task SyncOrderStatusesAsync()
        {
            // Lấy danh sách các đơn hàng từ bảng orderghn
            var ghnOrders = await _dbContext.GhnOrders.ToListAsync();

            foreach (var ghnOrder in ghnOrders)
            {
                // Thêm Token và ShopId vào Header
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Token", _settings.Token);
                _httpClient.DefaultRequestHeaders.Add("ShopId", _settings.ShopId);

                // Gửi yêu cầu đến GHN để lấy trạng thái đơn hàng
                var response = await _httpClient.GetAsync(
                    $"{_settings.ApiBaseUrl}v2/shipping-order/detail?order_code={ghnOrder.ghn_order_id}");

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Lỗi khi lấy trạng thái đơn hàng từ GHN: {error}");
                    continue;
                }

                // Phân tích dữ liệu phản hồi từ GHN
                var ghnOrderDetail = await response.Content.ReadFromJsonAsync<GhnOrderDetailResponse>();
                if (ghnOrderDetail?.Data == null)
                {
                    Console.WriteLine($"Không tìm thấy dữ liệu trạng thái cho đơn hàng {ghnOrder.ghn_order_id}");
                    continue;
                }

                // Cập nhật trạng thái trong bảng orderghn
                ghnOrder.Status = ghnOrderDetail.Data.Status;
                _dbContext.GhnOrders.Update(ghnOrder);

                // Tìm hóa đơn tương ứng trong bảng hoadons
                var hoadon = await _dbContext.HoaDons
                    .Include(h => h.HoaDonChiTiets) // Bao gồm chi tiết hóa đơn
                    .FirstOrDefaultAsync(h => h.order_code == ghnOrder.Client_order_code);

               

                    // Nếu trạng thái là "delivered" và thanh toán là COD, và trạng thái trước đó KHÔNG PHẢI "delivered", trừ số lượng sản phẩm
                    if (hoadon != null)
                    {
                        var trangthaitruoc = hoadon.status;
                        hoadon.status = ghnOrderDetail.Data.Status;

                        // Nếu trạng thái là "delivered" và thanh toán là COD, và trạng thái trước đó KHÔNG PHẢI "delivered"
                        if (hoadon.Thanhtoan == "cod" && ghnOrderDetail.Data.Status == "delivered" && trangthaitruoc != "delivered")
                        {
                            foreach (var chiTiet in hoadon.HoaDonChiTiets)
                            {
                                var sanpham = await _dbContext.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);

                                if (sanpham != null)
                                {
                                    // Trừ số lượng sản phẩm thực tế và số lượng tạm giữ
                                    sanpham.Soluong -= chiTiet.quantity;
                                    sanpham.Soluongtamgiu -= chiTiet.quantity;

                                    if (sanpham.Soluong <= 0)
                                    {
                                        sanpham.Soluong = 0;
                                        sanpham.Trangthai = "Hết hàng"; // Cập nhật trạng thái sản phẩm
                                    }

                                    _dbContext.Sanpham.Update(sanpham);
                                }
                            }

                            Console.WriteLine($"Đã trừ số lượng sản phẩm và cập nhật trạng thái kho cho hóa đơn {hoadon.Id}.");
                        }

                    // Nếu trạng thái là "returned" và trước đó trạng thái không phải "returned"
           
                    else if ((hoadon.Thanhtoan == "cod" || hoadon.Thanhtoan == "VnPay" || hoadon.Thanhtoan == "Momo") 
                             && ghnOrderDetail.Data.Status == "returned" && trangthaitruoc != "returned")
                    {
                        foreach (var chiTiet in hoadon.HoaDonChiTiets)
                        {
                            var sanpham = await _dbContext.Sanpham.FirstOrDefaultAsync(sp => sp.Id == chiTiet.sanpham_ids);

                            if (sanpham != null)
                            {
                                if (hoadon.Thanhtoan == "cod")
                                {
                                    // Đơn COD: Giảm số lượng tạm giữ
                                    sanpham.Soluongtamgiu -= chiTiet.quantity;

                                    // Đảm bảo không âm
                                    if (sanpham.Soluongtamgiu < 0)
                                    {
                                        sanpham.Soluongtamgiu = 0;
                                    }
                                }
                                else if (hoadon.Thanhtoan == "VnPay" || hoadon.Thanhtoan == "Momo")
                                {
                                    // Đơn VnPay hoặc MoMo: Hoàn lại số lượng thực
                                    sanpham.Soluong += chiTiet.quantity;

                                    // Cập nhật trạng thái sản phẩm nếu cần
                                    if (sanpham.Soluong > 0 && sanpham.Trangthai == "Hết hàng")
                                    {
                                        sanpham.Trangthai = "Còn hàng";
                                    }
                                }

                                // Cập nhật sản phẩm
                                _dbContext.Sanpham.Update(sanpham);
                            }
                        }

                            Console.WriteLine($"Đã xử lý trạng thái 'returned' cho hóa đơn {hoadon.Id}.");
                        }

                        // Cập nhật trạng thái hóa đơn
                        _dbContext.HoaDons.Update(hoadon);

                        Console.WriteLine($"Trạng thái đơn hàng {hoadon.Id} đã được cập nhật thành {ghnOrderDetail.Data.Status}.");


                    // Gửi email thông báo nếu trạng thái thay đổi
                    if (trangthaitruoc != ghnOrderDetail.Data.Status)
                    {
                        var kh = await _dbContext.KhachHangs.FirstOrDefaultAsync(k => k.Id == hoadon.khachhang_id);
                        if (kh != null && !string.IsNullOrWhiteSpace(kh.EmailDiaChi))
                        {
                            var trangthaidonhang = _statusDescriptions.ContainsKey(ghnOrderDetail.Data.Status)
                                ? _statusDescriptions[ghnOrderDetail.Data.Status]
                                : ghnOrderDetail.Data.Status;

                            var emailBody = $@"
                        <p>Kính gửi: {kh.Ho} {kh.Ten}</p>
                        <p>Đơn hàng: <b>{ghnOrder.Client_order_code}</b> của bạn đã được cập nhật trạng thái: <b>{trangthaidonhang}</b></p>
                        <p>Trân trọng,</p>
                        <p>Cửa hàng trái cây</p>";

                            // Gửi email thông báo
                            try
                            {
                                await _emailHelper.GuiEmailAsync(kh.EmailDiaChi, "Cập nhật trạng thái đơn hàng", emailBody);
                                Console.WriteLine($"Đã gửi email thành công đến {kh.EmailDiaChi}");
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Lỗi khi gửi email đến {kh.EmailDiaChi}: {ex.Message}");
                            }
                        }
                    }
                }
            }

            // Lưu tất cả thay đổi vào cơ sở dữ liệu
            await _dbContext.SaveChangesAsync();
        }


        // lớp ánh xạ để hiển thị trạng thái đơn hàng từ ghn
        private readonly Dictionary<string, string> _statusDescriptions = new()
{
    { "ready_to_pick", "Mới tạo đơn hàng" },
    { "picking", "Nhân viên đang lấy hàng" },
    { "cancel", "Hủy đơn hàng" },
    { "money_collect_picking", "Đang thu tiền người gửi" },
    { "picked", "Nhân viên đã lấy hàng" },
    { "storing", "Hàng đang nằm ở kho" },
    { "transporting", "Đang luân chuyển hàng" },
    { "sorting", "Đang phân loại hàng hóa" },
    { "delivering", "Nhân viên đang giao cho người nhận" },
    { "money_collect_delivering", "Nhân viên đang thu tiền người nhận" },
    { "delivered", "Nhân viên đã giao hàng thành công" },
    { "delivery_fail", "Nhân viên giao hàng thất bại" },
    { "waiting_to_return", "Đang đợi trả hàng về cho người gửi" },
    { "return", "Trả hàng" },
    { "return_transporting", "Đang luân chuyển hàng trả" },
    { "return_sorting", "Đang phân loại hàng trả" },
    { "returning", "Nhân viên đang đi trả hàng" },
    { "return_fail", "Nhân viên trả hàng thất bại" },
    { "returned", "Nhân viên trả hàng thành công" },
    { "exception", "Đơn hàng ngoại lệ không nằm trong quy trình" },
    { "damage", "Hàng bị hư hỏng" },
    { "lost", "Hàng bị mất" }
};

        public class GhnOrderDetailResponse
        {
            public int Code { get; set; }
            public string Message { get; set; }
            public GhnOrderDetailData Data { get; set; }
        }

        public class GhnOrderDetailData
        {
            public string OrderCode { get; set; }
            public string Status { get; set; }
        }

    }
}
