using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class DiachichitietDTO
    {
        public class CreateDiachichitietDto
        {
            [Required]

            public string Diachi { get; set; } // Địa chỉ

            [Required]
           
            public string Sdt { get; set; } // Số điện thoại

            [Required]
            
            public string Email { get; set; } // Email

            [Required]
            public string Created_By { get; set; } // Người tạo

            [Required]
            public string Updated_By { get; set; }
        }

        public class UpdateDiachichitietDto
        {
           
            public string Diachi { get; set; }

           
            public string Sdt { get; set; }

           
            public string Email { get; set; }

          
            public string Updated_By { get; set; }
        }
        public class SetDiachichitietDto
        {
            [Required]
            public string Updated_By { get; set; } // Người thực hiện cập nhật
        }
    }
}
