using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace CuahangtraicayAPI.Model
{
    [Table("bannerimages")]
    public class BannerImages : BaseModel
    {
        [Key]
        public int id{ get; set; }
       
        public int BannerId { get; set; }

        public string ImagePath { get; set; }



        [ForeignKey("BannerId")]
        [JsonIgnore]
        public Bannerts? Banner { get; set; }
    }
}
