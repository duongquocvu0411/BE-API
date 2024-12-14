using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("TenwebSite")]
    public class TenwebSite:BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Tieu_de {  get; set; }
        public string Favicon { get; set; }
        public byte TrangThai { get; set; } = 0;
        public string UpdatedBy { get; set; }
    }
}
