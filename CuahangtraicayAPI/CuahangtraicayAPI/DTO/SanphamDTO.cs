using CuahangtraicayAPI.Controllers;
using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class SanphamDTO
    {
        public class SanphamUpdateRequest
        {
           
            public string Tieude { get; set; }
           
            public decimal Giatien { get; set; }
          
            public string Trangthai { get; set; }
        
            public string DonViTinh { get; set; }
         
            public int DanhmucsanphamId { get; set; }
       
            public IFormFile? Hinhanh { get; set; } // Main image, optional for PUT
            public IFormFileCollection? Images { get; set; } // Secondary images
            public ChiTietDto? ChiTiet { get; set; } // Product details
            public List<int>? ExistingImageIds { get; set; } // Thêm danh sách ID ảnh phụ hiện có
            public SanphamSaleCreateRequest? Sale { get; set; } // Thêm thông tin sale
        }


        public class SanphamCreateRequest
        {
            public string Tieude { get; set; }
            public decimal Giatien { get; set; } // Make this nullable
                                                 //public decimal? Giatien { get; set; } // Make this nullable
            public string Trangthai { get; set; }
            public string DonViTinh { get; set; }
            public int DanhmucsanphamId { get; set; }
            //public int? DanhmucsanphamId { get; set; } // Make this nullable
            public IFormFile Hinhanh { get; set; } // Main image
            public IFormFileCollection? Images { get; set; } // Secondary images
            public ChiTietDto? ChiTiet { get; set; } // Product details
            public SanphamSaleCreateRequest? Sale { get; set; } // Thêm thông tin sale
        }
        public class ChiTietDto
        {
            public string? MoTaChung { get; set; }
          
            public string? BaiViet { get; set; }
        }
        public class SanphamSaleCreateRequest
        {
            public string Trangthai { get; set; } // Có thể nullable, nếu không cung cấp sẽ lấy mặc định
            public decimal Giasale { get; set; }
            public DateTime Thoigianbatdau { get; set; }
            public DateTime Thoigianketthuc { get; set; }
        }

    }
}
