using System.Security.Cryptography;
using System.Text;
using CuahangtraicayAPI.Model.ConfigMomo;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;

public class MoMoPaymentService
{
    private readonly MoMoConfig _config;

    public MoMoPaymentService(IOptions<MoMoConfig> config)
    {
        _config = config.Value;
    }
    

    public async Task<MoMoResponse> CreatePaymentAsync(OrderInfoModel request)
    {
        string requestId = Guid.NewGuid().ToString();
        string rawHash = $"accessKey={_config.AccessKey}&amount={request.Amount}&extraData=&ipnUrl={_config.NotifyUrl}" +
                         $"&orderId={request.OrderCode}&orderInfo={request.OrderInfo}&partnerCode={_config.PartnerCode}" +
                         $"&redirectUrl={_config.ReturnUrl}&requestId={requestId}&requestType=captureWallet";

        string signature = GenerateSignature(rawHash, _config.SecretKey);

        var payload = new
        {
            partnerCode = _config.PartnerCode,
            accessKey = _config.AccessKey,
            requestId = requestId,
            amount = request.Amount.ToString(),
            orderId = request.OrderCode,
            orderInfo = request.OrderInfo,
            redirectUrl = _config.ReturnUrl,
            ipnUrl = _config.NotifyUrl,
            extraData = "",
            requestType = "captureWallet",
            signature
        };

        var client = new RestClient(_config.EndPoint);
        var restRequest = new RestRequest(_config.EndPoint, Method.Post);
        restRequest.AddJsonBody(payload);

        var response = await client.ExecuteAsync(restRequest);

        if (!response.IsSuccessful || string.IsNullOrEmpty(response.Content))
        {
            return new MoMoResponse
            {
                ErrorCode = -1,
                Message = "Không thể kết nối với MoMo Gateway.",
                PayUrl = null
            };
        }

        var jsonResponse = JsonConvert.DeserializeObject<MoMoResponse>(response.Content);

        return jsonResponse;
    }

    // hoàn tiền momo
    public async Task<MoMoRefundResponse> RefundAsync(string transactionId, double amount)
    {
        string requestId = Guid.NewGuid().ToString(); //là một mã duy nhất được tạo ra để xác định giao dịch hoàn tiền hiện tại
        //Guid.NewGuid(): Sinh ra một giá trị ngẫu nhiên, đảm bảo rằng mỗi giao dịch hoàn tiền có một mã nhận dạng riêng.
        string rawHash = $"accessKey={_config.AccessKey}&amount={amount}&description=Giao dịch hoàn tiền&orderId={transactionId}" +
                         $"&partnerCode={_config.PartnerCode}&requestId={requestId}&transId={transactionId}"; // dùng để tạo chữ ký 

        string signature = GenerateSignature(rawHash, _config.SecretKey);

        var payload = new
        {
            partnerCode = _config.PartnerCode,
            accessKey = _config.AccessKey,
            requestId = requestId,
            orderId = transactionId,
            amount = amount.ToString("F0"), // Số tiền cần hoàn trả F0 dùng để định dạng số thập phân
            transId = transactionId,       // Mã giao dịch gốc
            description = "Giao dịch hoàn tiền",
            signature
        };

        var client = new RestClient("https://test-payment.momo.vn/v2/gateway/api/refund");
        //RestClient: Là một đối tượng trong thư viện RestSharp, dùng để thực hiện các yêu cầu HTTP (GET, POST, PUT, DELETE, v.v.).
       
        var restRequest = new RestRequest //Đối tượng này định nghĩa cách gửi yêu cầu HTTP.
        {
            Method = Method.Post
        };
        restRequest.AddJsonBody(payload);  // gữi lên serve momo dưới dạng json dữ liệu 

        var response = await client.ExecuteAsync(restRequest);

        if (!response.IsSuccessful || string.IsNullOrEmpty(response.Content))
        // IsSuccessful của response yêu cầu thành công && thất bại 

        //string.IsNullOrEmpty kiểm tra xem nội dung phản hồi có rỗng hoặc null k nếu rỗng hoặc null thì k nhận được dữ liệu phía serve 
        {
            return new MoMoRefundResponse
            {
                ErrorCode = -1,
                Message = "Không thể kết nối với MoMo Gateway.",
            };
        }

        var jsonresponse = JsonConvert.DeserializeObject<MoMoRefundResponse>(response.Content);
        // chuyển đổi chuỗi json thành đối tượng <T>  ở đây chuyển thành đối tượng  MoMoRefundResponse là class để trả về thông báo 
        return jsonresponse;
    }


    private string GenerateSignature(string rawHash, string secretKey)
    {
        using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
        {
            byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawHash));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}

// tạo thanh toán url
public class MoMoResponse
{
    public int ErrorCode { get; set; }
    public string Message { get; set; }
    public string PayUrl { get; set; }

}

//truyền vào dữ liệu
public class OrderInfoModel
{
    public string FullName { get; set; }
    public double Amount { get; set; }
    public string OrderInfo { get; set; }
    public string OrderCode { get; set; }
}
// hoàn tièn
public class MoMoRefundResponse
{
    public int ErrorCode { get; set; }
    public string Message { get; set; }
    public string TransId { get; set; }
}

