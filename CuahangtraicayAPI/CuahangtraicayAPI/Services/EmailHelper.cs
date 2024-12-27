using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace CuahangtraicayAPI.Services
{
    public class EmailHelper
    {
        private readonly IConfiguration _cauHinh;

        public EmailHelper(IConfiguration cauHinh)
        {
            _cauHinh = cauHinh;
        }

        public async Task GuiEmailAsync(string denEmail, string chuDe, string noiDung)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_cauHinh["EmailSettings:SenderName"], _cauHinh["EmailSettings:SenderEmail"]));
            email.To.Add(new MailboxAddress("", denEmail));
            email.Subject = chuDe;

            var xayDungNoiDung = new BodyBuilder
            {
                HtmlBody = noiDung,
                TextBody = noiDung
            };
            email.Body = xayDungNoiDung.ToMessageBody();

            using (var smtp = new SmtpClient())
            {
                await smtp.ConnectAsync(_cauHinh["EmailSettings:SMTPServer"], int.Parse(_cauHinh["EmailSettings:SMTPPort"]), MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_cauHinh["EmailSettings:SenderEmail"], _cauHinh["EmailSettings:AppPassword"]);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
        }
    }
}
