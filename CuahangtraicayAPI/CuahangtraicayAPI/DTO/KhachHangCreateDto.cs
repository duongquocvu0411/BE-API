using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class KhachHangCreateDto
    {
        [Required]
        public string Ten { get; set; }

        [Required]
        public string Ho { get; set; }

        [Required]
        public string DiaChiCuThe { get; set; }

        [Required]
        public string tinhthanhquanhuyen { get; set; }

        [Required]
        public string ThanhPho { get; set; }

        [Required]
        public string xaphuong { get; set; }

        [Phone] // Đảm bảo số điện thoại hợp lệ
        public string Sdt { get; set; }

        [EmailAddress] // Kiểm tra email hợp lệ
        public string EmailDiaChi { get; set; }

        public string GhiChu { get; set; }
    }
}
