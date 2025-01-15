namespace CuahangtraicayAPI.Model
{
    public class BaseModel
    {
        public DateTime Created_at { get; set; } = DateTime.Now;
        public DateTime? Updated_at { get; set; } = DateTime.Now;
    }
}
