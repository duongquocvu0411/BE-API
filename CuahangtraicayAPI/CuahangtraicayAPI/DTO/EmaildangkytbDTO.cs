using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class EmaildangkytbDTO
    {
        [Required(ErrorMessage ="Email không được bỏ trống")]
        [EmailAddress]
        public string Email { get; set; }
    }
}
