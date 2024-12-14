using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class MenuFooterDTO
    {
        public class MenuFooterCreateDto
        {
            [Required]
            public string Tieu_de { get; set; }
            [Required]
            public string Noi_dung { get; set; }
            [Required]
            public int Thutuhienthi { get; set; }
        }
        public class MenuFooterUpdateDto
        {
           
            public string Tieu_de { get; set; }
            public string Noi_dung { get; set; }
            public int Thutuhienthi { get; set; }
        }
        //public class MenuFooterDto
        //{
        //    public int Id { get; set; }
        //    public string Tieu_de { get; set; }
        //    public string Noi_dung { get; set; }
        //    public int Thutuhienthi { get; set; }
        //}
    }
}
