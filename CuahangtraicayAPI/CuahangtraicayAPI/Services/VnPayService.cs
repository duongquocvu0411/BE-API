using CuahangtraicayAPI.Model.VnPay;

namespace CuahangtraicayAPI.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _configuration;

        public VnPayService( IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //public string CreatePaymentUrl(PaymentInformationModel model, HttpContext context)
        //{
        //    var timeZoneId = _configuration["TimeZoneId"];
        //    if (string.IsNullOrEmpty(timeZoneId))
        //    {
        //        throw new ArgumentNullException(nameof(timeZoneId), "TimeZoneId is not configured.");
        //    }

        //    var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
        //    var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
        //    var tick = DateTime.Now.Ticks.ToString();
        //    var pay = new VnPayLibrary();
        //    var urlCallBack = _configuration["PaymentCallBack:ReturnUrl"];

        //    // Add request data
        //    pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
        //    pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
        //    pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
        //    pay.AddRequestData("vnp_Amount", ((int)(model.Amount * 100)).ToString());

        //    //pay.AddRequestData("vnp_Amount", ((int)model.Amount * 100).ToString());
        //    pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
        //    pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
        //    pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
        //    pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
        //    pay.AddRequestData("vnp_OrderInfo", $"{model.Name} {model.OrderDescription} {model.Amount}");
        //    pay.AddRequestData("vnp_OrderType", model.OrderType);
        //    pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
        //    pay.AddRequestData("vnp_TxnRef", tick);

        //    // Create URL
        //    var paymentUrl = pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);
        //    Console.WriteLine($"Generated Payment URL: {paymentUrl}");
        //    return paymentUrl;
        //}

        public string CreatePaymentUrl(PaymentInformationModel model, HttpContext context)
        {
            var timeZoneId = _configuration["TimeZoneId"];
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);

            var pay = new VnPayLibrary();
            var urlCallBack = _configuration["PaymentCallBack:ReturnUrl"];

            pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
            pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
            pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
            pay.AddRequestData("vnp_Amount", ((int)(model.Amount * 100)).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
            pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
            pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
            pay.AddRequestData("vnp_OrderInfo", model.OrderDescription);
            pay.AddRequestData("vnp_OrderType", model.OrderType);
            pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
            pay.AddRequestData("vnp_TxnRef", model.OrderCode);

            return pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);
        }



        //public PaymentResponseModel PaymentExecute(IQueryCollection collections)
        //{
        //    var pay = new VnPayLibrary();
        //    var response = pay.GetFullResponseData(collections, _configuration["Vnpay:HashSecret"]);

        //    return response;
        //}
        public PaymentResponseModel PaymentExecute(IQueryCollection collections)
        {
            var pay = new VnPayLibrary();

            foreach (var (key, value) in collections)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    pay.AddResponseData(key, value);
                }
            }

            var secureHash = collections["vnp_SecureHash"];
            if (!pay.ValidateSignature(secureHash, _configuration["Vnpay:HashSecret"]))
            {
                throw new Exception("Chữ ký bảo mật không hợp lệ.");
            }

            // Log OrderId từ VNPAY
            var orderId = pay.GetResponseData("vnp_TxnRef");
            Console.WriteLine($"OrderId từ VNPAY: {orderId}");

            return new PaymentResponseModel
            {
                OrderId = orderId,
                TransactionId = pay.GetResponseData("vnp_TransactionNo"),
                Success = pay.GetResponseData("vnp_ResponseCode") == "00",
                VnPayResponseCode = pay.GetResponseData("vnp_ResponseCode")
            };
        }
    }
}
