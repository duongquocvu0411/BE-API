using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("Vouchers")]
    public class Voucher :BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; } // Mã voucher
        public decimal Sotiengiamgia { get; set; } // Số tiền giảm giá
        public decimal Giatridonhang { get; set; } // Giá trị đơn hàng tối thiểu để áp dụng voucher
        public DateTime Ngaybatdau { get; set; } // Ngày hết hạn
        public DateTime Ngayhethan { get; set; } // Ngày hết hạn
        public bool TrangthaiVoucher { get; set; } // Trạng thái voucher (có thể sử dụng hay không)
        public int Toidasudung { get; set; } 
        public int Solandasudung { get; set; } = 0; // Số lần đã sử dụng
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
