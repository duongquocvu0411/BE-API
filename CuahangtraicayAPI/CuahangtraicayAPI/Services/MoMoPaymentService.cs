using System.Security.Cryptography;
using System.Text;
using CuahangtraicayAPI.Model;
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

    private string GenerateSignature(string rawHash, string secretKey)
    {
        using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
        {
            byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawHash));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}

public class MoMoResponse
{
    public int ErrorCode { get; set; }
    public string Message { get; set; }
    public string PayUrl { get; set; }

}

public class OrderInfoModel
{
    public string FullName { get; set; }
    public double Amount { get; set; }
    public string OrderInfo { get; set; }
    public string OrderCode { get; set; }
}
