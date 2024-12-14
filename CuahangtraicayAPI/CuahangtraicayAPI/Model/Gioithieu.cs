using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("Gioithieu")]
    public class Gioithieu : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string Tieu_de {  get; set; }
        public string Phu_de { get; set; }

        public string Noi_dung { get; set; }

        public byte Trang_thai { get; set; } = 1; // Mặc định hiển thị
                                                  // Thêm danh sách các hình ảnh liên quan đến mục Gioithieu
        public ICollection<GioithieuImg> GioithieuImgs { get; set; }
    }
}
