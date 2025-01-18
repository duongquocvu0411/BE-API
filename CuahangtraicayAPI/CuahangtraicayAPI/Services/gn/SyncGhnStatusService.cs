using CuahangtraicayAPI.Model;
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
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
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


                //// Cập nhật trạng thái trong bảng hoadons
                //var hoadon = await _dbContext.HoaDons.FirstOrDefaultAsync(h => h.order_code == ghnOrder.Client_order_code);
                //if (hoadon != null)
                //{
                //    hoadon.status = ghnOrderDetail.Data.Status;
                //    _dbContext.HoaDons.Update(hoadon);
                //}
                var hoadon = await _dbContext.HoaDons.FirstOrDefaultAsync(h => h.order_code == ghnOrder.Client_order_code);
                if (hoadon != null)
                {
                    var trangthaitruoc = hoadon.status;
                    hoadon.status = ghnOrderDetail.Data.Status;
                    _dbContext.HoaDons.Update(hoadon);
                    // lấy trạng thái 
                    var trangthaidonhang = _statusDescriptions.ContainsKey(ghnOrderDetail.Data.Status)
                        ? _statusDescriptions[ghnOrderDetail.Data.Status]
                        : ghnOrderDetail.Data.Status;
                    if(trangthaitruoc != ghnOrderDetail.Data.Status)
                    {
                        var kh = await _dbContext.KhachHangs.FirstOrDefaultAsync(k => k.Id == hoadon.khachhang_id);
                        if(kh != null && !string.IsNullOrWhiteSpace(kh.EmailDiaChi))
                        {
                            var emailBody = $@"
                               <p> Kính gữi: {kh.Ho} {kh.Ten}</p>
                                <p>Đơn hàng: <b>{ghnOrder.Client_order_code}</b> của bạn đã được cập nhật trạng thá: <b>{trangthaidonhang}</b> </p>
                                <p>Trân trọng</p>
                                <p>Cửa hàng trái cây</p>

                                    ";
                            // gửi mail
                            // Gửi email trong nền
                           await  Task.Run(async () =>
                            {
                                try
                                {
                                    await _emailHelper.GuiEmailAsync(kh.EmailDiaChi, "Cập nhật trạng thái đơn hàng", emailBody);
                                    Console.WriteLine($"Đã gửi email thành công đến {kh.EmailDiaChi}");
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"Lỗi khi gửi email đến {kh.EmailDiaChi}: {ex.Message}");
                                }
                            });
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
