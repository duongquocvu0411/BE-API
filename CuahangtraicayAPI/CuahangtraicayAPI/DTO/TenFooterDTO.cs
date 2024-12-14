using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class TenFooterDTO
    {
        public class TenFooterPostDto
        {
            [Required]
            public string Tieude { get; set; } // Bắt buộc
            [Required]
            public string Phude { get; set; } // Bắt buộc
            [Required]
            public List<IFormFile> Images { get; set; } // Danh sách hình ảnh
            [Required]
            public List<string> Links { get; set; } // Danh sách liên kết cho từng hình ảnh
        }

        public class TenFooterPuttDto
        {
            public string? Tieude { get; set; } 
            public string? Phude { get; set; }
   
            public List<IFormFile>? Images { get; set; }
            public List<string>? Links { get; set; } 
        }

    }
}
