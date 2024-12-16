using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("diachichitiets")]
    public class Diachichitiet: BaseModel
    {
        [Key]
        public int Id { get; set; }

        //[Required]
        //[MaxLength(255)]
        public string Diachi { get; set; }

        //[Required]
        //[MaxLength(11)]
        public string Sdt { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        public string Status { get; set; } = "không sử dụng"; // Giá trị mặc định

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

    }
}
