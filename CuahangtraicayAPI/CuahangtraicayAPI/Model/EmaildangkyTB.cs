using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("EmaildangkyTB")]
    public class EmaildangkyTB :BaseModel
    {
        [Key]
        public int id { get; set; }

        public string Email { get; set; }
    }
}
