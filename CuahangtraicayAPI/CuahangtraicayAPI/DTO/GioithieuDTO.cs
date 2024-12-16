using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class GioithieuCreateDTO
    {

        [Required]
        public string Tieu_de { get; set; }
        [Required]
        public string Phu_de { get; set; }
        [Required]
        public string Noi_dung { get; set; }
        [Required]
        public byte Trang_thai { get; set; } = 1;
        [Required]
        public string Created_By {  get; set; }

        [Required]
        public string Updated_By { get; set; }
        public List<IFormFile>? Images { get; set; }
    }

    // DTO kiểm tra dữ liệu đầu vào cho PUT
    public class GioithieuUpdateDTO
    {
    
        public string? Tieu_de { get; set; }
      
        public string? Phu_de { get; set; }
        public string? Noi_dung { get; set; }
        public byte? Trang_thai { get; set; }
        public string Updated_By { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}
