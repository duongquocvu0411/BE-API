using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("ghn_orders")]
    public class GhnOrder
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string ghn_order_id { get; set; }

        [Required]
        [StringLength(50)]
        public string Client_order_code { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        [Required]
        public DateTime Created_at { get; set; } = DateTime.Now; // Thời gian tạo

        [Required]
        public DateTime Updated_at { get; set; } = DateTime.Now; // Thời gian cập nhật
        [Required]
        public string UpdatedBy { get; set; }

    }
}
