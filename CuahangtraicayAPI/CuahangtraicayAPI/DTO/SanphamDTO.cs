using CuahangtraicayAPI.Controllers;
using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class SanphamDTO
    {

        public class SanphamCreateRequest
        {
            [Required]
            public string Tieude { get; set; }

            [Required]
            public decimal Giatien { get; set; } // Make this nullable

            [Required]
            public int so_luong { get; set; }

            //[Required]
            //public string Trangthai { get; set; }

            [Required]
            public int DonViTinh { get; set; }

            [Required]
            public int DanhmucsanphamId { get; set; }

            [Required]
            public IFormFile Hinhanh { get; set; } // Main image

            //[Required]
            //public string Created_By { get; set; }

            //[Required]
            //public string Updated_By { get; set; }
            public IFormFileCollection? Images { get; set; } // Secondary images
            public ChiTietDto? ChiTiet { get; set; } // Product details
            public SanphamSaleCreateRequest? Sale { get; set; } // Thêm thông tin sale
        }
        public class SanphamUpdateRequest
        {

            public string Tieude { get; set; }
            public int? So_luong { get; set; }
            public decimal Giatien { get; set; }

            public string Trangthai { get; set; }

            public int DonViTinh { get; set; }

            public int DanhmucsanphamId { get; set; }
            public bool Xoasp { get; set; }

            public IFormFile? Hinhanh { get; set; } // Main image, optional for PUT
            //[Required]
            //public string Updated_By { get; set; }
            public IFormFileCollection? Images { get; set; } // Secondary images
            public ChiTietDto? ChiTiet { get; set; } // Product details
            public List<int>? ExistingImageIds { get; set; } // Thêm danh sách ID ảnh phụ hiện có
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
