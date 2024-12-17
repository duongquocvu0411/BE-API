using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("phanhoidanhgias")]
    public class PhanHoiDanhGia : BaseModel
    {
        [Key]
        public int Id { get; set; }


        public int danhgia_id { get; set; } // Foreign key tới DanhGiaKhachHang

      
        public string noi_dung { get; set; } // Nội dung phản hồi từ Admin

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }

        // Navigation property
        [ForeignKey("danhgia_id")]
        public  DanhGiaKhachHang? DanhGia { get; set; }
    }
}
