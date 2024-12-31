using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class TenwebSiteDTO
    {
        public class CreateTenWebSiteDto
        {
            [Required]
            public string TieuDe { get; set; } // Tiêu đề trang

            [Required]
            public string PhuDe { get; set;}
            [Required]
            public IFormFile Favicon { get; set; } // Favicon (file upload)

            [Required]
            public string Email { get; set; }
            [Required]
            public string Sodienthoai { get; set; }
            [Required]
            public string Diachi { get; set; }
            [Required]
            public string Created_By { get; set; }
            [Required]
            public string Updated_By { get; set; }
            public byte TrangThai { get; set; } = 0;
        }

        public class UpdateTenWebSiteDto
        {
            public string? TieuDe { get; set; } // Tiêu đề mới
            public string? PhuDe { get; set; }
            public IFormFile? Favicon { get; set; } // Favicon mới (có thể null)
            public string? Email { get; set; }
            public string? Sodienthoai { get; set; }
            public string? Diachi { get; set; }
            public string Updated_By { get; set; }
        }
        public class SetTenwebSiteDto
        {
            [Required]
            public string Updated_By { get; set; } // Người thực hiện cập nhật
        }
    }
}
