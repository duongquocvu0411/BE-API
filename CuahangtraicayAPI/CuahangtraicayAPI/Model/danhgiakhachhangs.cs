using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Model
{
    [Table("danhgiakhachhangs")]
    public class DanhGiaKhachHang : BaseModel
    {
        [Key]
        public int Id { get; set; }

      
        public int sanphams_id { get; set; }

        [Required]
        [MaxLength(255)]
   
        public string ho_ten { get; set; }

        [MaxLength(255)]
        
        public string tieude { get; set; }

        [Range(1, 5)]
        [Column("so_sao")]
        public int so_sao { get; set; }

        [Required]
    
        public string noi_dung { get; set; }

        [ForeignKey("sanphams_id")]
        public Sanpham? Sanpham { get; set; } // Navigation property for `Sanpham`
        public virtual PhanHoiDanhGia? PhanHoi { get; set; } // Navigation property cho phản hồi

    }

}
