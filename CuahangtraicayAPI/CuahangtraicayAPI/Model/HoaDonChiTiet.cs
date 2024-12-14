using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Model
{
    [Table("hoadonchitiets")]
    public class HoaDonChiTiet: BaseModel
    {
        public int Id { get; set; }

       
        public int bill_id { get; set; }
       
        public string sanpham_ids { get; set; }
     
        public decimal price { get; set; }
       
        public int quantity { get; set; }
        [NotMapped]
        public string SanphamNames { get; set; }

        [NotMapped]
        public List<SanPhamDetail> SanphamDonViTinh { get; set; }

        // Định nghĩa quan hệ với HoaDon
        public HoaDon HoaDon { get; set; }
       
    }
}
