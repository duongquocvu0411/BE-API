using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CuahangtraicayAPI.Model
{
    [Table("hinhanh_sanpham")]
    public class HinhAnhSanPham:BaseModel
    {
        [Key]
        public int Id { get; set; }

        public int sanphams_id { get; set; }
        public string hinhanh { get; set; }

        [ForeignKey("sanphams_id")]
        [JsonIgnore]
        // Quan hệ ngược với Sanpham
        public virtual Sanpham Sanpham { get; set; }
    }
}

