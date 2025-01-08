using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace CuahangtraicayAPI.Services
{
    public class GHNService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GHNService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;

            // Thêm Token và ShopId vào Header
            _httpClient.DefaultRequestHeaders.Add("Token", _configuration["GHN:Token"]);
            _httpClient.DefaultRequestHeaders.Add("ShopId", _configuration["GHN:ShopId"]);
        }

        public async Task<string> CreateOrderAsync(object requestData)
        {
            var apiUrl = $"{_configuration["GHN:ApiBaseUrl"]}v2/shipping-order/create";
            var content = new StringContent(JsonSerializer.Serialize(requestData), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(apiUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Lỗi từ GHN API: {error}");
            }

            return await response.Content.ReadAsStringAsync();
        }
    }
}
