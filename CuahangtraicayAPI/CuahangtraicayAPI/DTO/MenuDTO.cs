using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class MenuDTO
    {
        public class MenuCreateDTO
        {
            [Required]
            public string Name { get; set; }

            [Required]
            public int Thutuhien { get; set; }

            [Required]
            public string Url { get; set; }
        }
        public class MenuUpdateDTO
        {
            public string Name { get; set; }
            public int? Thutuhien { get; set; } // Nullable để có thể không truyền giá trị này khi cập nhật
            public string Url { get; set; }
        }
    }
}
