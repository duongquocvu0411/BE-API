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
            public IFormFile Favicon { get; set; } // Favicon (file upload)
            [Required]
            //public string UpdatedBy { get; set; } // Người tạo (hoặc cập nhật ban đầu)
           
            public string Created_By { get; set; }
             [Required]
            public string Updated_By { get; set; }
            public byte TrangThai {  get; set; } = 0;
        }

        public class UpdateTenWebSiteDto
        {
            public string? TieuDe { get; set; } // Tiêu đề mới
            public IFormFile? Favicon { get; set; } // Favicon mới (có thể null)
            //public string? UpdatedBy { get; set; } // Người cập nhật
            public byte? TrangThai { get; set; } = 0;
            public string Updated_By { get; set; }
        }
        public class SetTenwebSiteDto
        {
            [Required]
            public string Updated_By { get; set; } // Người thực hiện cập nhật
        }
    }
}
