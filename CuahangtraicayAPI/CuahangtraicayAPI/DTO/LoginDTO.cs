using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class LoginDTO
    {
        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
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
