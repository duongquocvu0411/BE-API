using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CuahangtraicayAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;
using System.Collections.Generic;
using CuahangtraicayAPI.Model.DB;

public class SanphamSaleCheckerService : BackgroundService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<SanphamSaleCheckerService> _logger;

    public SanphamSaleCheckerService(IServiceScopeFactory serviceScopeFactory, ILogger<SanphamSaleCheckerService> logger)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("SanphamSaleCheckerService is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CheckNewSalesAndSendEmails();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in SanphamSaleCheckerService: {ex.Message}");
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }

        _logger.LogInformation("SanphamSaleCheckerService is stopping.");
    }

    private async Task CheckNewSalesAndSendEmails()
    {
        using (var scope = _serviceScopeFactory.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            // Lấy các sản phẩm sale có DaThongBao == false
            var newSales = await dbContext.SanphamSales
                .Where(s => !s.DaThongBao) // Sửa đổi ở đây
                .Include(s => s.Sanpham)
                .ToListAsync();

            if (newSales.Any())
            {
                var emailList = await dbContext.emaildangkyTBs.Select(e => e.Email).ToListAsync();
                if (emailList.Any())
                {
                    await SendSaleNotificationEmail(emailList, newSales);
                }

                // Cập nhật DaThongBao thành true cho các sản phẩm đã gửi email
                foreach (var sale in newSales)
                {
                    sale.DaThongBao = true;
                }
                await dbContext.SaveChangesAsync();
            }
        }
    }

    private async Task SendSaleNotificationEmail(List<string> emailList, List<Sanphamsale> newSales)
    {
        string smtpServer = "smtp.gmail.com";
        int smtpPort = 587;
        string senderEmail = "quocvu0411@gmail.com";
        string senderName = "Cửa hàng trái cây";
        string appPassword = "cxfl thkb helo icak";

        using (SmtpClient client = new SmtpClient(smtpServer, smtpPort))
        {
            client.Credentials = new NetworkCredential(senderEmail, appPassword);
            client.EnableSsl = true;

            foreach (var email in emailList)
            {
                try
                {
                    MailMessage message = new MailMessage
                    {
                        From = new MailAddress(senderEmail, senderName),
                        Subject = "Sản phẩm đang khuyến mãi!",
                        Body = GenerateEmailBody(newSales),
                        IsBodyHtml = true
                    };

                    message.To.Add(email);

                    await client.SendMailAsync(message);
                    _logger.LogInformation($"Gửi thông báo khuyến mãi tới {email}");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Lỗi khi gửi email tới {email}: {ex.Message}");
                }
            }
        }
    }

    private string GenerateEmailBody(List<Sanphamsale> sales)
    {
        string body = $@"
    <!DOCTYPE html>
    <html lang=""vi"">
    <head>
        <meta charset=""UTF-8"">
        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
        <title>Khuyến Mãi Cực Hot</title>
        <link rel=""stylesheet"" href=""https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"">
        <link rel=""stylesheet"" href=""https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"" integrity=""sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="" crossorigin=""anonymous"" referrerpolicy=""no-referrer"" />
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                background-color: #f8f9fa;
                color: #343a40;
            }}
            .container {{
                background-color: #fff;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                margin-top: 30px;
                overflow: hidden;
                position: relative;
                animation: fadeIn 1s ease-in-out;
            }}

            @keyframes fadeIn {{
                from {{ opacity: 0; transform: translateY(-30px); }}
                to {{ opacity: 1; transform: translateY(0); }}
            }}

            h2 {{
                color: #e44d26; /* Màu cam đậm */
                text-align: center;
                padding-bottom: 20px;
                margin-bottom: 30px;
                border-bottom: 3px solid #f08080; /* Coral border */
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                position: relative;
            }}

            h2::before {{
                content: '';
                position: absolute;
                left: 50%;
                bottom: -10px;
                transform: translateX(-50%);
                width: 80px;
                height: 5px;
                background-color: #f08080;
                border-radius: 5px;
            }}

            ul {{
                list-style: none;
                padding: 0;
            }}

            li {{
                padding: 25px;
                border-bottom: 1px solid #e9ecef;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }}

            li:hover {{
                transform: translateY(-5px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }}

            li:last-child {{
                border-bottom: none;
            }}

            .sale-item {{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }}

            .sale-details {{
                flex-grow: 1;
            }}

            .product-name {{
                font-size: 1.3em;
                color: #333;
                font-weight: 600;
                margin-bottom: 8px;
            }}

            .original-price {{
                font-size: 1em;
                color: #888;
                text-decoration: line-through;
                margin-right: 10px;
            }}

            .sale-price {{
                font-size: 1.4em;
                color: #28a745;
                font-weight: bold;
            }}

            .sale-time {{
                font-style: italic;
                color: #777;
            }}

            .cta-button {{
                display: inline-block;
                padding: 12px 25px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 8px;
                transition: background-color 0.3s ease;
            }}

            .cta-button:hover {{
                background-color: #0056b3;
            }}

            p.footer {{
                margin-top: 30px;
                text-align: center;
                color: #555;
                animation: pulse 2.5s infinite alternate;
                font-weight: bold;
            }}

            @keyframes pulse {{
                from {{ transform: scale(1); }}
                to {{ transform: scale(1.07); }}
            }}

        </style>
    </head>
    <body>
        <div class=""container"">
            <h2><i class=""fas fa-gift"" style=""color: #f39c12;""></i> ƯU ĐÃI SIÊU KHỦNG - GIÁ SỐC <i class=""fas fa-tags"" style=""color: #e74c3c;""></i></h2>
            <ul>
                {string.Join("", sales.Select(sale => $@"
                    <li class=""sale-item"">
                        <div class=""sale-details"">
                            <div class=""product-name"">{sale.Sanpham.Tieude}</div>
                            <span class=""original-price"">{(sale?.Sanpham.Giatien != null ? sale.Sanpham.Giatien.ToString("N0") : "Liên hệ")} VND</span>
                            <span class=""sale-price"">{sale?.giasale:N0} VND</span>
                            <p class=""sale-time""><i class=""far fa-clock""></i> Từ {sale?.thoigianbatdau?.ToString("dd/MM/yyyy")} đến {sale?.thoigianketthuc?.ToString("dd/MM/yyyy")}</p>
                        </div>
                        <i class=""fas fa-star fa-2x"" style=""color: #ffc107;""></i>
                    </li>"))}
            </ul>
            <p class=""footer"">
                <i class=""fas fa-shopping-cart""></i> Đừng bỏ lỡ! <a href=""http://localhost:3000/"" class=""cta-button"">MUA NGAY</a> <i class=""fas fa-arrow-right""></i>
            </p>
        </div>
    </body>
    </html>
    ";
        return body;
    }
}