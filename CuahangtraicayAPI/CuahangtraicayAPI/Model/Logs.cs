using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("Logs")]
    public class Logs 
    {
        [Key]
        public long Id { get; set; }

        public string UserId { get; set; }

        public string HanhDong {  get; set; }
        
        public string Chucvu {  get; set; }
        public string CreatedBy { get; set; }

        public DateTime Created_at { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public virtual IdentityUser User { get; set; }
    }
}
