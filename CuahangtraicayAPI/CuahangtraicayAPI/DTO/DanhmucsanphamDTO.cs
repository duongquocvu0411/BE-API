using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class DanhmucsanphamDTO
    {
        public class PostDanhmucDTO
        {
            [Required]
            public string Name { get; set; }

     
            //public string Created_By { get; set; }

            //public string Updated_By { get; set; }
        }

        public class PutDanhmucDTO
        {
            public string Name { get; set; }
            //[Required]
            //public string Updated_By { get; set; }
        }
    }
}
