using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class DvtDTO
    {
        public class PostDvtDTO
        {
            [Required]
            public string Name { get; set; }


        
        }

        public class PutDvtDTO
        {
            public string Name { get; set; }
           
        }
    }
}
