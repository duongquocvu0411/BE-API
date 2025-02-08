using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Model.DB;
using Microsoft.EntityFrameworkCore;

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

                        // Lấy danh sách sản phẩm sale đã hết hạn
                        var hethan = await context.SanphamSales
                            .Where(sale => sale.thoigianketthuc <= DateTime.Now)
                            .ToListAsync(stoppingToken);

                        if (hethan.Any())
                        {
                            context.SanphamSales.RemoveRange(hethan);
                            _logger.LogInformation($"Đã xóa {hethan.Count} Sanphamsale đã hết hạn");

                            // Lưu thay đổi vào cơ sở dữ liệu
                            await context.SaveChangesAsync(stoppingToken);
                            _logger.LogInformation($"Đã lưu thay đổi vào cơ sở dữ liệu");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Lỗi khi cập nhật trạng thái sản phẩm sale: {ex.Message}");
                }

                // Chờ 1 phút trước khi kiểm tra lại
                await Task.Delay(TimeSpan.FromMinutes(50), stoppingToken);
            }

            _logger.LogInformation("SaleUpdateService is stopping.");
        }
    }
}