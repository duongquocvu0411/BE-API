namespace CuahangtraicayAPI.Model
{
    public class PaymentResponseModel
    {
        public string OrderId { get; set; }
        public decimal Amount { get; set; }
        public string ResultCode { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}
