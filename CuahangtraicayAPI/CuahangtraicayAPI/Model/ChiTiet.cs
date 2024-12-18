using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CuahangtraicayAPI.Model
{
    [Table("chitiets")]
    public class ChiTiet: BaseModel
    {
        [Key]
        public int Id { get; set; }

        //[ForeignKey("sanphams")] 

        public int sanphams_id { get; set; }

   
        public string mo_ta_chung { get; set; }
       


        public string? bai_viet { get; set; }

        [ForeignKey("sanphams_id")]
        [JsonIgnore]
        // Quan hệ ngược với Sanpham
        public virtual Sanpham Sanpham { get; set; }
    }
}

