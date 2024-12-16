using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("Dactrungs")]
    public class Dactrung : BaseModel
    {
        [Key]
        public int ID { get; set; }

        public  string Icon { get; set; }

        public string Tieude { get; set; }
        public string Phude { get; set; }
      
        public int Thutuhienthi { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
