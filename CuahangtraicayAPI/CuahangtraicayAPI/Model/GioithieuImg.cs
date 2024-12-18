using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CuahangtraicayAPI.Model
{
    [Table("Gioithieu_img")]
    public class GioithieuImg : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public int Id_gioithieu { get; set; }

        public string URL_image { get; set; }

        [ForeignKey("Id_gioithieu")]
        [JsonIgnore]
        public Gioithieu Gioithieu { get; set; }
    }
}
