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
    public class SaleUpdateService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<SaleUpdateService> _logger;

        public SaleUpdateService(IServiceProvider serviceProvider, ILogger<SaleUpdateService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("SaleUpdateService is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                        // Lấy danh sách sản phẩm sale đạt thời gian kết thúc
                        var hethan = context.SanphamSales
                            .Where(sale => sale.trangthai == "Đang áp dụng" && sale.thoigianketthuc <= DateTime.Now)
                            .ToList();

                        if (hethan.Any())
                        {
                            foreach (var sale in hethan)
                            {
                                sale.trangthai = "Không áp dụng";
                                _logger.LogInformation($"Cập nhật trạng thái cho sản phẩm sale ID: {sale.Id}");
                            }

                            // Lưu thay đổi vào cơ sở dữ liệu
                            await context.SaveChangesAsync(stoppingToken);
                            _logger.LogInformation($"Đã cập nhật trạng thái cho {hethan.Count} sản phẩm sale.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Lỗi khi cập nhật trạng thái sản phẩm sale: {ex.Message}");
                }

                // Chờ 5 phút trước khi kiểm tra lại
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }

            _logger.LogInformation("SaleUpdateService is stopping.");
        }
    }
}
