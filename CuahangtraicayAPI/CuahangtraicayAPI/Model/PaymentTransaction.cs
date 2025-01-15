using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("PaymentTransactions ")]
    public class PaymentTransaction :BaseModel
    {
        public int Id { get; set; }
        public string OrderId { get; set; }
        public string TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public string ResponseMessage { get; set; }
        //public DateTime Created_at { get; set; } = DateTime.Now;
        //public DateTime? Updated_at { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
