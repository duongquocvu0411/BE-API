using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class AdminDTO 
    {
        public class AddRequest
        {
            [Required]
            public string hoten { get; set; }
            [Required]
            public string Username { get; set; }
            [Required]
            public string Password { get; set; }
        }
    }
}
