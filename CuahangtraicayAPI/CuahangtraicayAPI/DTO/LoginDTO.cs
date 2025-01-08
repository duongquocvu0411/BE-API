using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class LoginDTO
    {
        public class LoginRequest
        {
            [Required]

            public string Username { get; set; }
            [Required]

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
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }
        public class VerifyOtpRequest
        {
            //public string Email { get; set; }
            public string Otp { get; set; }
        }
    }
}
