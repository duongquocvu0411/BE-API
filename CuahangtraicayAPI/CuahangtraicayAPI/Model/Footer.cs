using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("Footers")]
    public class Footer : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string NoiDungFooter { get; set; }
        //public string UpdatedBy { get; set; }

        public byte TrangThai { get; set; } = 1;

    }
}
