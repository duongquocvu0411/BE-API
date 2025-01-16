namespace CuahangtraicayAPI.Model.ghn
{
    using System.Text.Json.Serialization;

    public class GhnOrderRequest
    {
        [JsonPropertyName("payment_type_id")]
        public int PaymentTypeId { get; set; } = 2; // Mặc định người nhận thanh toán

        [JsonPropertyName("note")]
        public string Note { get; set; } = "Đơn hàng từ hệ thống";

        [JsonPropertyName("required_note")]
        public string RequiredNote { get; set; } = "KHONGCHOXEMHANG";

        [JsonPropertyName("shop_id")]
        public string ShopId { get; set; }

        //[JsonPropertyName("return_ward_code")]
        //public string ReturnWardCode { get; set; } = "";

        [JsonPropertyName("client_order_code")]
        public string ClientOrderCode { get; set; } // Mã đơn hàng từ hệ thống của bạn

        //[JsonPropertyName("from_name")]
        //public string FromName { get; set; } = "TinTest124";

        //[JsonPropertyName("from_phone")]
        //public string FromPhone { get; set; } = "0987654321";

        //[JsonPropertyName("from_address")]
        //public string FromAddress { get; set; } = "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam";

        //[JsonPropertyName("from_ward_name")]
        //public string FromWardName { get; set; } = "Phường 14";

        //[JsonPropertyName("from_district_name")]
        //public string FromDistrictName { get; set; } = "Quận 10";

        //[JsonPropertyName("from_province_name")]
        //public string FromProvinceName { get; set; } = "HCM";

        [JsonPropertyName("to_name")]
        public string ToName { get; set; }

        [JsonPropertyName("to_phone")]
        public string ToPhone { get; set; }

        [JsonPropertyName("to_address")]
        public string ToAddress { get; set; }

        [JsonPropertyName("to_ward_name")]
        public string ToWardName { get; set; }

        [JsonPropertyName("to_district_name")]
        public string ToDistrictName { get; set; }

        [JsonPropertyName("to_province_name")]
        public string ToProvinceName { get; set; }

        [JsonPropertyName("cod_amount")]
        public int CodAmount { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; } = "Theo New York Times";

        [JsonPropertyName("length")]
        public int Length { get; set; } = 12;

        [JsonPropertyName("width")]
        public int Width { get; set; } = 12;

        [JsonPropertyName("height")]
        public int Height { get; set; } = 12;

        [JsonPropertyName("weight")]
        public int Weight { get; set; } = 1200;

        [JsonPropertyName("cod_failed_amount")]
        public int CodFailedAmount { get; set; } = 2000;

        [JsonPropertyName("pick_station_id")]
        public int? PickStationId { get; set; } = null;

        [JsonPropertyName("deliver_station_id")]
        public int? DeliverStationId { get; set; } = null;

        [JsonPropertyName("insurance_value")]
        public int InsuranceValue { get; set; } = 10000000;

        [JsonPropertyName("service_type_id")]
        public int ServiceTypeId { get; set; } = 2;

      

        [JsonPropertyName("pickup_time")]
        public long PickupTime { get; set; } = 1692840132;

        [JsonPropertyName("pick_shift")]
        public List<int> PickShift { get; set; } = new List<int> { 2 };

        [JsonPropertyName("items")]
        public List<GhnOrderItem> Items { get; set; }
    }

    public class GhnOrderItem
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; }

        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }

      
        [JsonPropertyName("price")]
        public int Price { get; set; }
        [JsonPropertyName("length")]
        public int Length { get; set; } = 12;

        [JsonPropertyName("width")]
        public int Width { get; set; } = 12;

        [JsonPropertyName("height")]
        public int Height { get; set; } = 12;

        [JsonPropertyName("weight")]
        public int Weight { get; set; } = 1200;

        [JsonPropertyName("category")]
        public GhnCategory Category { get; set; }
    }

    public class GhnCategory
    {
        [JsonPropertyName("level1")]
        public string Level1 { get; set; }
    }

}
