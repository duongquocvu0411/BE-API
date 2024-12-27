using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Model
{
    [Table("hoadons")]
    public class HoaDon : BaseModel
    {
        public int Id { get; set; }


        public int khachhang_id { get; set; }

        public decimal total_price { get; set; }

        public string order_code { get; set; }

        public string UpdatedBy { get; set; }
        public string status { get; set; }

        // Định nghĩa quan hệ với Khách Hàng
        public KhachHang KhachHang { get; set; }
        public string Thanhtoan { get; set; } // "COD" hoặc "Online"

        // Định nghĩa quan hệ một-nhiều với HoaDonChiTiet
        public ICollection<HoaDonChiTiet> HoaDonChiTiets { get; set; }
    }
}
