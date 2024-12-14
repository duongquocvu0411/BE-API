using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("FooterImg")]
    public class FooterImgs
    {
        [Key]
        public int Id { get; set; }

        public int Footer_ID { get; set; }
        public string ImagePath { get; set; }
       
        public string link { get; set; }
        [ForeignKey("Footer_ID")]
        public TenFooters? TenFooters { get; set; }
    }
}
