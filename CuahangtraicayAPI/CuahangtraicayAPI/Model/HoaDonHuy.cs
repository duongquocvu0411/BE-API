using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("hoadon_huy")]
    public class HoaDonHuy: BaseModel
    {
        [Key]
        public int Id { get; set; }
        
        public int hoadon_id {  get; set; }

        public string ly_do_huy { get; set; }

        public string Ghi_chu { get; set; } 

        public string UpdatedBy { get; set; }

        [ForeignKey("hoadon_id")]
        public HoaDon HoaDon { get; set; }
    }
}
