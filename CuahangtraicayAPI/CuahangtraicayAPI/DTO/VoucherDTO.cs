using System;
using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class VoucherDTO
    {
        public int Id { get; set; }

        [Required]
      


       
        [Range(0, double.MaxValue)]
        public decimal Sotiengiamgia { get; set; } // Số tiền giảm giá

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Giatridonhang { get; set; } // Giá trị đơn hàng tối thiểu để áp dụng

        [Required]
        public DateTime Ngaybatdau { get; set; } // Ngày bắt đầu

        [Required]
        public DateTime Ngayhethan { get; set; } // Ngày hết hạn
        [Required]
        public int Toidasudung { get; set; } // Số lần tối đa được sử dụng
        public bool TrangthaiVoucher { get; set; } // Trạng thái voucher

    }
}
