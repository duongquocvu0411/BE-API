using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

   
        public DateTime? thoigianketthuc { get; set; }

        [ForeignKey("sanpham_id")]
        // Navigation property
        public virtual Sanpham Sanpham { get; set; }
    }
}
