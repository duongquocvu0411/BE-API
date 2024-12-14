using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("menuFooter")]
    public class MenuFooter:BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string Tieu_de {  get; set; }
        public string Noi_dung {  get; set; }
        public int Thutuhienthi { get; set; }
    }
}
