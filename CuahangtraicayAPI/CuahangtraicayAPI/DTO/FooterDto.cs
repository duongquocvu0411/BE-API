namespace CuahangtraicayAPI.DTO
{
    public class FooterDto
    {
        public class FooterCreateDto
        {
            public string NoiDungFooter { get; set; }
            public string UpdatedBy { get; set; }
            public byte Trangthai { get; set; } = 1;
        }
        public class FooterUpdateDto
        {
            public string? NoiDungFooter { get; set; }
            public string? UpdatedBy { get; set; }
            public byte? Trangthai { get; set; } 
        }
    }
}
