using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model.jwt
{
    [Table("EmployeeProfile")]
    public class EmployeeProfile : BaseModel
    {
        [Key]
        public string UserId { get; set; } // Khóa chính, liên kết với IdentityUser
        public string Hoten { get; set; }
        public string Chucvu { get; set; }
        public string Sodienthoai { get; set; }
    }
}
