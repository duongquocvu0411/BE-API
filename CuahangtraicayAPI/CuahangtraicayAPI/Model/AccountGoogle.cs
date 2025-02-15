using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CuahangtraicayAPI.Model
{
    [Table("AccountGoogle")]
    public class AccountGoogle
    {
        [Key] 
        public int Id { get; set; }

        public string  UserId   { get; set; }

        public string GoogleAccountId { get; set; }

        public string Email {  get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        [ForeignKey("UserId")]
        public virtual IdentityUser User { get; set; }
    }
}
