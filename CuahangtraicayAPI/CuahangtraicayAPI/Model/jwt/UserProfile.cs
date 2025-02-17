using CuahangtraicayAPI.Model;
using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.Modles
{
    public class UserProfile: BaseModel
    {
        [Key]
        public string UserId { get; set; } // Khóa chính, liên kết với IdentityUser
        public string Hoten { get; set; }
        public string Chucvu { get; set; }
        public string Sodienthoai { get; set; }
        public int TrangThaiTK { get; set; } = 1; 
    }
}
