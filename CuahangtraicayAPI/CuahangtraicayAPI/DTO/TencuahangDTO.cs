using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class TencuahangDTO
    {
        public class CreateTencuahangDTO
        {
            [Required]
            public string Name { get; set; }
            [Required]
            public string Created_By { get; set; }
            [Required]
            public string Updated_By { get; set; }
        }
        public class UpdateTencuahangDTO
        {
            public string? Name { get; set; }
            public string Updated_By { get; set; }

        }

        public class SetTencuahangDto
        {
            public string Updated_By { get; set; } // Người thực hiện cập nhật
        }

    }
}
