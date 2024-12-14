using CuahangtraicayAPI.Model;
using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class DactrungDTO 
    {
        public class DactrungCreateDTO
        {
            [Required]
            public string Tieude { get; set; }
            [Required]
            public string Phude { get; set; }
            [Required]
            public int Thutuhienthi { get; set; }
            public IFormFile IconFile { get; set; } // File icon upload
            //public string Icon { get; set; } // Tên icon (nếu cần điền thủ công)
        }
        public class DactrungUpdateDTO 
        {
            public string? Tieude { get; set; }
            public string? Phude { get; set; }
            public int? Thutuhienthi { get; set; }
            public IFormFile? IconFile { get; set; } // File icon upload
            //public string? Icon { get; set; } // Tên icon (nếu cần điền thủ công)
        }
    }
}
