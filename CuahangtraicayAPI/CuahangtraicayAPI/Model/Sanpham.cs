using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using CuahangtraicayAPI.Model;


namespace CuahangtraicayAPI.Model
{
    [Table("sanphams")]
    public class Sanpham : BaseModel
    {
        [Key]

        public int Id { get; set; }

        public int Soluongtamgiu { get; set; }
        public string Tieude { get; set; }  // Tên sản phẩm, có thể nullable nếu cơ sở dữ liệu cho phép NULL


        public decimal Giatien { get; set; } // Giá sản phẩm, nullable nếu cơ sở dữ liệu cho phép NULL


        public string Hinhanh { get; set; }  // Hình ảnh, nullable nếu cơ sở dữ liệu cho phép NULL


        public string Trangthai { get; set; } // Trạng thái của sản phẩm, nullable nếu cơ sở dữ liệu cho phép NULL

        public int Soluong { get; set; }
        public string don_vi_tinh { get; set; } // Đơn vị tính của sản phẩm, nullable nếu cơ sở dữ liệu cho phép NULL


        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }

        public bool Xoa { get; set; }

        // Foreign Key cho Danhmucsanpham


        public int danhmucsanpham_id { get; set; }

        // Liên kết với đánh giá khách hàng
        public virtual ICollection<DanhGiaKhachHang> Danhgiakhachhangs { get; set; } = new List<DanhGiaKhachHang>();

        // Liên kết với Danhmucsanpham
        [ForeignKey("danhmucsanpham_id")]
        public virtual Danhmucsanpham? Danhmucsanpham { get; set; }



        // Liên kết với chi tiết sản phẩm

        public virtual ChiTiet? ChiTiet { get; set; }

        // Quan hệ một-nhiều với Sanphamsale
        public virtual ICollection<Sanphamsale> SanphamSales { get; set; } = new List<Sanphamsale>();

        // Liên kết với hình ảnh sản phẩm
        public virtual ICollection<HinhAnhSanPham> Images { get; set; } = new List<HinhAnhSanPham>();

        // Quan hệ một-nhiều với HoaDonChiTiet
        public ICollection<HoaDonChiTiet> HoaDonChiTiets { get; set; }

    }
}
