using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace CuahangtraicayAPI.Services
{
    public class GhnService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiBaseUrl;
        private readonly string _token;
        private readonly string _shopId;
        private readonly ShopInfo _shopInfo;

        public GhnService(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _apiBaseUrl = configuration["GHN:ApiBaseUrl"];
            _token = configuration["GHN:Token"];
            _shopId = configuration["GHN:ShopId"];
            _shopInfo = configuration.GetSection("GHN:ShopInfo").Get<ShopInfo>();

        }

        public async Task<HttpResponseMessage> CreateOrderAsync(object orderData)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{_apiBaseUrl}v2/shipping-order/create");
            request.Headers.Add("Token", _token);
            request.Headers.Add("ShopId", _shopId);
            request.Content = new StringContent(JsonConvert.SerializeObject(orderData), Encoding.UTF8, "application/json");

            return await _httpClient.SendAsync(request);
        }

        public dynamic GetShopInfo()
        {
            return _shopInfo;
        }
        public class ShopInfo
        {
            public string Name { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public string WardName { get; set; }
            public string DistrictName { get; set; }
            public string ProvinceName { get; set; }
        }
    }

}
