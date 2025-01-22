using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model.DB;

public class AutoPhanHoiService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(5);

    public AutoPhanHoiService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                // Kiểm tra xem AdminResponses còn nội dung hay không
                var adminResponse = await context.AdminResponses.FirstOrDefaultAsync(ar => ar.Trangthai == true);
                if (adminResponse == null)
                {
                    Console.WriteLine("Auto response service is disabled.");
                    await Task.Delay(_checkInterval, stoppingToken); // Chờ 30 giây trước khi kiểm tra lại
                    continue;
                }

                // Lấy các đánh giá mới chưa được phản hồi
                var newDanhGia = await context.DanhGiaKhachHang
                    .Where(dg => !context.PhanHoiDanhGias.Any(ph => ph.danhgia_id == dg.Id))
                    .ToListAsync();

                foreach (var danhGia in newDanhGia)
                {
                    var newPhanHoi = new PhanHoiDanhGia
                    {
                        danhgia_id = danhGia.Id,
                        noi_dung = adminResponse.Noidung,
                        CreatedBy = "System",
                        UpdatedBy = "System",
                        Created_at = DateTime.Now,
                        Updated_at = DateTime.Now
                    };

                    context.PhanHoiDanhGias.Add(newPhanHoi);
                }

                await context.SaveChangesAsync();
            }

            await Task.Delay(_checkInterval, stoppingToken); // Chờ trước lần kiểm tra tiếp theo
        }
    }
}
