using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("menu")]
    public class Menu:BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Thutuhien { get; set; }

        public string Url { get; set; }
    }
}
