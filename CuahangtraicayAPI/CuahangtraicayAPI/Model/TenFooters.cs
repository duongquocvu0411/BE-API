    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace CuahangtraicayAPI.Model
    {
        [Table("TenFooter")]
        public class TenFooters:BaseModel
        {
            [Key]
            public int Id { get; set; }
            public string tieude { get; set; }
            public string phude { get; set; }
            public string CreatedBy { get; set; }
            public string UpdatedBy { get; set; }

            public ICollection<FooterImgs> FooterIMG { get; set; } = new List<FooterImgs>();
        }
    }
