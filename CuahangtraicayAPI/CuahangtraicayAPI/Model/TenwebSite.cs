using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("TenwebSite")]
    public class TenwebSite : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Tieu_de { get; set; }
        public string Phu_de { get; set; }
        public string Favicon { get; set; }
        public string Email { get; set; }

        public string Sdt { get; set; }
        public string Diachi { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }

    }
}
