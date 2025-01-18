using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("AdminResponse")]
    public class AdminResponse
    {
        [Key]
        public int Id { get; set; }
        public string Noidung { get; set; }

        public bool Trangthai {  get; set; }
        public DateTime? Updated_at { get; set; } = DateTime.Now;
    }
}
