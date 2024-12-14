using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("lien_hes")]
    public class Lienhe : BaseModel
    {

        [Key]
        public int id { get; set; }

        [Required]
        public string ten { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string sdt { get; set; }
        [Required]
        public string ghichu { get; set; }
        // Sử dụng kiểu nullable DateTime?
      
        //public DateTime? created_at { get; set; } = DateTime.UtcNow;
        //public DateTime? updated_at { get; set; } = DateTime.UtcNow;
    }
}
