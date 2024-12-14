using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class TencuahangDTO
    {
        public class CreateTencuahangDTO
        {
            [Required]
            public string Name { get; set; }
        }
        public class UpdateTencuahangDTO
        {
            public string? Name { get; set; }
           
        }

    }
}
