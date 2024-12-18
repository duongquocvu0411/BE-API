using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class PhanhoiDTO
    {
        public class PhanhoiPOSTDTO
        {
            [Required]
            public int danhgia_id { get; set; }

            [Required]
            public string noi_dung { get; set; }

            [Required]
            public string CreatedBy { get; set; }
            [Required]
            public string UpdatedBy { get; set; }
        }

        public class PhanhoiPUTDTO
        {
         
            public string noi_dung { get; set; }

            public string UpdatedBy { get; set; }
        }
    }
}
