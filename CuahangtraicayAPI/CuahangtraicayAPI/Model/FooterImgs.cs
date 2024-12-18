using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public TenFooters? TenFooters { get; set; }
    }
}
