using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("tencuahang")]
    public class Tencuahang:BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Trangthai { get; set; } = "không sử dụng"; // Giá trị mặc định
    }
}
