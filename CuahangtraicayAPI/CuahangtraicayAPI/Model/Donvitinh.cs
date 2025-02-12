using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("donvitinh")]
    public class Donvitinh : BaseModel
    {
        [Key]
        public int ID { get; set; }

        public string name { get; set; }

        public string UpdatedBy { get; set; }
        public string CreatedBy { get; set; }
      


    }
}
