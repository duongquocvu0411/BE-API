using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CuahangtraicayAPI.Model;
using Newtonsoft.Json;

namespace CuahangtraicayAPI.Model
{
    [Table("khachhangs")]
    public class KhachHang : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string Ten { get; set; }

        public string Ho { get; set; }

        public string DiaChiCuThe { get; set; }

        public string tinhthanhquanhuyen { get; set; }
        public string ThanhPho { get; set; }
        public string xaphuong { get; set; }
        //public string tenThanhpho { get; set; }

        public string Sdt { get; set; }
        public string EmailDiaChi { get; set; }
        public bool Xoa { get; set; } = false;
        public string GhiChu { get; set; }

        public string UpdatedBy { get; set; }
        public string CreatedBy { get; set; }
       
        public string UserNameLogin { get; set; }
        // Định nghĩa quan hệ một-nhiều với Hóa Đơn (HoaDon)
        [JsonIgnore]
        public ICollection<HoaDon> HoaDons { get; set; }
    }
}
