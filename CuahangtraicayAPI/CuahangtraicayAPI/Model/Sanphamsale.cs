using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CuahangtraicayAPI.Model
{
    [Table("sanphamsale")]
    public class Sanphamsale : BaseModel
    {
        [Key]

        public int Id { get; set; }


        public int sanpham_id { get; set; }

        public string trangthai { get; set; } = "Đang áp dụng";


        public decimal giasale { get; set; }

        public DateTime? thoigianbatdau { get; set; }

        public bool DaThongBao { get; set; } = false;
        public DateTime? thoigianketthuc { get; set; }

        [ForeignKey("sanpham_id")]
        [JsonIgnore]
        // Navigation property
        public virtual Sanpham Sanpham { get; set; }
    }
}
