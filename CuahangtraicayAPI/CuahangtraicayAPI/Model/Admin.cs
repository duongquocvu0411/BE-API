using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("admins")]
    public class Admin : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string hoten { get; set; }

  public string Email { get; set; }
       
        public string Username { get; set; }
     
    
        public string Password { get; set; } // Lưu mật khẩu đã mã hóa
    }
}
