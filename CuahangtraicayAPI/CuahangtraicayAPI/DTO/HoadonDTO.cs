﻿using CuahangtraicayAPI.Model;
using System.ComponentModel.DataAnnotations;

namespace CuahangtraicayAPI.DTO
{
    public class HoadonDTO
    {
        public class HoaDonDto
        {
            [Required]
            public int KhachHangId { get; set; }
            [Required]
            public List<int> SanphamIds { get; set; }
            [Required]
            public List<int> Quantities { get; set; }
            public string Thanhtoan { get; set; }
            public string Updated_By { get; set; }
            public string PaymentMethod { get; set; } // Thêm thuộc tính này
        }
        public class UpdateStatusDto
        {
            public string Status { get; set; }
            [Required]
            public string Updated_By { get; set; }

        }
    }


}
