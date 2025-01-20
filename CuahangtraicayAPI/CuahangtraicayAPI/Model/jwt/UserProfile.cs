using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.Modles
{
    public class UserProfile
    {
        [Key]
        public string UserId { get; set; } // Khóa chính, liên kết với IdentityUser
        public string Hoten { get; set; }
    }
}
