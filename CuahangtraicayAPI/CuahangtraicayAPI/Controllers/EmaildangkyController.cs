using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmaildangkyController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;



        public EmaildangkyController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }


        /// <summary>
        /// Xem danh sách Email đăng ký nhận thông báo
        /// </summary>
        /// <returns>Xem danh sách Email đăng ký nhận thông báo</returns>
        [Authorize(Roles ="Admin,Employee")]
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<EmaildangkyTB>>>> GetEmailDangkyTBS()
        {
          

            var data = await _context.emaildangkyTBs.ToListAsync();
            return new BaseResponseDTO<IEnumerable<EmaildangkyTB>>
            {
                Data = data,
                Message = "Success"
            };
        }


        /// <summary>
        /// Xem Email nhận thông báo theo {id}
        /// </summary>
        /// <param name="id">Xem Email nhận thông báo theo {id}</param>
        /// <returns>Xem Email nhận thông báo theo {id}</returns>


        [Authorize(Roles ="Admin,Employee")]
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO<EmaildangkyTB>>> GetIDemaildangk(int id)
        {
            var data = await _context.emaildangkyTBs.FindAsync(id);

            if (data == null)
            {
                return new BaseResponseDTO<EmaildangkyTB>
                {
                    Code = 400,
                    Message = " không tìm thấy Email trên"
                };
            }
            return new BaseResponseDTO<EmaildangkyTB>
            {
                Data = data,
                Message = "Success"
            };
        }


        /// <summary>
        /// Thêm mới 1 Email nhận thông báo của users thêm
        /// </summary>
        /// <param name="dto">Thêm mới 1 Email nhận thông báo của users thêm</param>
        /// <returns>Thêm mới 1 Email nhận thông báo của users thêm</returns>
        /// 
        [HttpPost]
        public async Task<ActionResult<BaseResponseDTO<EmaildangkyTB>>> PostEmaildangkyTB(EmaildangkytbDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            // kiểm tra xem Email đã tồn tại trong hệ thống chưa
            if(await _context.emaildangkyTBs.AnyAsync(e => e.Email == dto.Email))
            {
                return new BaseResponseDTO<EmaildangkyTB>
                {
                    Code = 409,
                    Message =" Email đã được đăng ký trước đó !!!"
                };
            }


            var data = new EmaildangkyTB
            {
                Email = dto.Email
            };
            _context.emaildangkyTBs.Add(data);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<EmaildangkyTB>
            {
                Data = data,
                Message = "Success"
            };
        }

        /// <summary>
        /// Xóa 1 Email nhận thông báo của khách hàng
        /// </summary>
        /// <param name="id">Xóa 1 Email nhận thông báo của khách hàng</param>
        /// <returns>Xóa 1 Email nhận thông báo của khách hàng</returns>

        [Authorize(Roles ="Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponseDTO<EmaildangkyTB>>> DeletEmaildangky(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var data = await _context.emaildangkyTBs.FindAsync(id);
            
            if (data == null)
            {
                return new BaseResponseDTO<EmaildangkyTB>
                {
                    Code = 404,
                    Message = " Không tồn tại Email trong hệ thống!!"
                };
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Xóa Email đăng ký TB " + " " + data.Email,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.emaildangkyTBs.Remove(data);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();
            return new BaseResponseDTO<EmaildangkyTB>
            {
                Data = data,
                Message = "Success"
            };

        }
    }
}
