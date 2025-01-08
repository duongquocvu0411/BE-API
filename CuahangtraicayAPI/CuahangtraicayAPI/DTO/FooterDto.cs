using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class FooterDto
    {
        public class FooterCreateDto
        {
            [Required]
            public string NoiDungFooter { get; set; }
            //public string UpdatedBy { get; set; }
            [Required]
            public byte Trangthai { get; set; } = 1;
            //[Required]
            //public string Created_By { get; set; }
            //[Required]  
            //public string Updated_By { get; set; }
        }
        public class FooterUpdateDto
        {
            public string? NoiDungFooter { get; set; }
            //public string? UpdatedBy { get; set; }
            public byte? Trangthai { get; set; } 

            //public string Updated_By { get; set; }
        }
        public class SetFooterDTO
        {
            //[Required]
            //public string Updated_By { get; set; }
        }
    }
}
