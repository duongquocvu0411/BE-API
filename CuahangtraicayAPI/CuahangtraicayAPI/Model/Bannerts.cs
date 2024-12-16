using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CuahangtraicayAPI.Model
{
    [Table("banners")]
    public class Bannerts:BaseModel
    {
        [Key]
        //[JsonPropertyName("Id")] // giữ đúng tên In hoa như đã khai
        public int Id { get; set; }

        [Required]
        public string Tieude { get; set; } = string.Empty;

        [Required]
        public string Phude { get; set; } = string.Empty;

        public string Trangthai { get; set; } = "không sử dụng"; // Giá trị mặc định
        public string CreatedBy {  get; set; }
        public string UpdatedBy { get; set; }


        public ICollection<BannerImages> BannerImages { get; set; } = new List<BannerImages>();

    }
}
