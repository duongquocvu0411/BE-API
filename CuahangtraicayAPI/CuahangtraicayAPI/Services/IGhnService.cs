using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.Model.ghn;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;
using static CuahangtraicayAPI.Services.GhnService;

namespace CuahangtraicayAPI.Services
{
    public interface IGhnService
    {
        Task<GhnOrderResponse> CreateOrderAsync(GhnOrderRequest orderRequest);
    }
    public class GhnService : IGhnService
    {
        private readonly AppDbContext _dbContext;
        private readonly HttpClient _httpClient;
        private readonly GhnSettings _settings;

        public GhnService(HttpClient httpClient, IOptions<GhnSettings> settings, AppDbContext dbContext)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
            _dbContext = dbContext;
        }

        public async Task<GhnOrderResponse> CreateOrderAsync(GhnOrderRequest orderRequest)
        {
            // Thêm Token và ShopId vào Header
            _httpClient.DefaultRequestHeaders.Add("Token", _settings.Token);
            _httpClient.DefaultRequestHeaders.Add("ShopId", _settings.ShopId);

            // Gửi yêu cầu tới GHN API
            var response = await _httpClient.PostAsJsonAsync(
                $"{_settings.ApiBaseUrl}v2/shipping-order/create", orderRequest);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"GHN API Error: {response.StatusCode}, Details: {error}");
            }

            // Phân tích phản hồi JSON thành GhnOrderResponse
            var responseContent = await response.Content.ReadFromJsonAsync<GhnOrderResponse>();

            if (responseContent?.Data?.OrderCode == null)
            {
                throw new Exception("Phản hồi từ GHN không chứa mã đơn hàng (OrderCode).");
            }

            // Trả về phản hồi đầy đủ từ GHN
            return responseContent;
        }



        public class GhnOrderResponse
        {
            public int Code { get; set; }
            public string Message { get; set; }
            public GhnOrderData Data { get; set; }
        }

        public class GhnOrderData
        {
            [JsonPropertyName("order_code")] // Map đúng tên trường trong JSON
            public string OrderCode { get; set; } // Tương ứng với ghn_order_id
            public string Status { get; set; }
        }


    }
}
