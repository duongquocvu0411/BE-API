using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class DanhGiaKhachHangDTO
    {
        [Required]
        public int sanphams_id { get; set; }
        [Required]
        public string tieude { get; set; }

        [Required]
        [Range(1, 5)]
        public int so_sao { get; set; }

        [Required]
        public string noi_dung { get; set; }
    }
}
