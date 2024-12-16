using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("danhmucsanpham")]
    public class Danhmucsanpham : BaseModel
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }
    }
}
