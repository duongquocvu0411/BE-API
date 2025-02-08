using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Services
{
    public class VoucherUpdateService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<VoucherUpdateService> _logger;

        public VoucherUpdateService(IServiceProvider serviceProvider, ILogger<VoucherUpdateService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("VoucherUpdateService is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                        // Lấy danh sách voucher đã hết hạn
                        var expiredVouchers = context.Vouchers
                            .Where(v => v.TrangthaiVoucher == true && v.Ngayhethan <= DateTime.Now)
                            .ToList();

                        if (expiredVouchers.Any())
                        {
                            foreach (var voucher in expiredVouchers)
                            {
                                voucher.TrangthaiVoucher = false; // Cập nhật trạng thái voucher thành "Không hoạt động"
                                voucher.UpdatedBy = "Sytem";
                                _logger.LogInformation($"Cập nhật trạng thái cho voucher mã: {voucher.Code}");
                            }

                            // Lưu thay đổi vào cơ sở dữ liệu
                            await context.SaveChangesAsync(stoppingToken);
                            _logger.LogInformation($"Đã cập nhật trạng thái cho {expiredVouchers.Count} voucher.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Lỗi khi cập nhật trạng thái voucher: {ex.Message}");
                }

                // Chờ 5 phút trước khi kiểm tra lại
                await Task.Delay(TimeSpan.FromMinutes(50), stoppingToken);
            }

            _logger.LogInformation("VoucherUpdateService is stopping.");
        }
    }
}
