using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class BannersDTO
    {
        public class BannerPostDTO
        {
            [Required]
            public string Tieude { get; set; } = string.Empty;

            [Required]
            public string Phude { get; set; } = string.Empty;
            //[Required]  
            //public string Created_By { get; set; }
            //[Required]
            //public string Updated_By { get; set; }
            public List<IFormFile>? Hinhanhs { get; set; } // Nhiều file hình ảnh
            public string Trangthai { get; set; } = "không sử dụng"; // Giá trị mặc định
        }
        
        public class BannerPutDTO
        {
            public string? Tieude { get; set; }

            public string? Phude { get; set; }
          
            //public string Updated_By { get; set; }

            public string? Trangthai { get; set; }

            public List<IFormFile>? Hinhanhs { get; set; } // Nhiều file hình ảnh
        }
        public class SetBannerDTO
        {
            [Required]
            public string Updated_By { get; set; } // Người thực hiện cập nhật
        }
    }
}
