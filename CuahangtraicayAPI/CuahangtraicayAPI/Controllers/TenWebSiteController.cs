using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Mvc;
using static CuahangtraicayAPI.DTO.TenwebSiteDTO;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;
namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenWebSiteController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TenWebSiteController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Lấy danh sách tất cả các Website.
        /// </summary>
        /// <returns>Danh sách Website.</returns>

        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable< TenwebSite>>>> GetAll()
        {
            var tenwebsite = await _context.TenwebSites.ToListAsync();
            return  new BaseResponseDTO<IEnumerable <TenwebSite>>
            {
                Data = tenwebsite,
               Message = "success"
            };
        }

        /// <summary>
        /// Lấy thông tin chi tiết của Website dựa trên ID.
        /// </summary>
        /// <param name="id">ID của Website.</param>
        /// <returns>Thông tin chi tiết của Website.</returns>


        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO<TenwebSite>>> GetById(int id)
        {
            var tenWebSite = await _context.TenwebSites.FindAsync(id);
            if (tenWebSite == null)
                return BadRequest(new BaseResponseDTO<TenwebSite>
                {
                    Code = 404,
                    Message = "Tên website không tồn tại"
                });

            return Ok(new BaseResponseDTO<TenwebSite>
            {
                Data = tenWebSite,
                Message = "success"
            });
        }

        /// <summary>
        /// Tạo mới một Website.
        /// </summary>
        /// <param name="createDto">Dữ liệu của Website cần tạo.</param>
        /// <returns>Website vừa được tạo.</returns>

        [HttpPost]
       [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<TenwebSite>>> Create([FromForm] CreateTenWebSiteDto createDto)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var newTenWebSite = new TenwebSite
            {
                Tieu_de = createDto.TieuDe,
                Phu_de = createDto.PhuDe,
                Email = createDto.Email,
                Diachi = createDto.Diachi,
                Sdt = createDto.Sodienthoai,
                CreatedBy = hotenToken ,
                UpdatedBy =  hotenToken,
            };

            if (createDto.Favicon != null)
            {
                // Tạo GUID ngẫu nhiên và lấy phần mở rộng của tệp hình ảnh gốc
                var fileExtension = Path.GetExtension(createDto.Favicon.FileName); // Lấy phần mở rộng (vd: .jpg, .png)
                var uniqueFileName = Guid.NewGuid().ToString() + fileExtension; // GUID + phần mở rộng

                var filePath = Path.Combine("wwwroot/tenwebsite", uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await createDto.Favicon.CopyToAsync(stream);
                }

                newTenWebSite.Favicon = $"/tenwebsite/{uniqueFileName}";
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Thêm mới Cấu hình Website {newTenWebSite.Id}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.TenwebSites.Add(newTenWebSite);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok( new BaseResponseDTO<TenwebSite>
            {
                Data = newTenWebSite,
                Message = "success"
            });
        }

        /// <summary>
        /// Cập nhật thông tin của một Website.
        /// </summary>
        /// <param name="id">ID của Website cần cập nhật.</param>
        /// <param name="updateDto">Dữ liệu cần cập nhật.</param>
        /// <returns>Trạng thái cập nhật.</returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<TenwebSite>>> Update(int id, [FromForm] UpdateTenWebSiteDto updateDto)
        {
            var edit = await _context.TenwebSites.FindAsync(id);
            if (edit == null)
                return BadRequest(new BaseResponseDTO<TenwebSite>
                {
                    Code =404,
                    Message = "Tê website không tồn tại trong hệ thống"
                });

            if (!string.IsNullOrEmpty(updateDto.TieuDe))
                edit.Tieu_de = updateDto.TieuDe;
            if(!string.IsNullOrEmpty(updateDto.PhuDe))
                edit.Phu_de = updateDto.PhuDe;

            if (!string.IsNullOrEmpty(updateDto.Email))
                edit.Email = updateDto.Email;

            if (!string.IsNullOrEmpty(updateDto.Diachi))
                edit.Diachi = updateDto.Diachi;

            if (!string.IsNullOrEmpty(updateDto.Sodienthoai))
                edit.Sdt = updateDto.Sodienthoai;

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            edit.UpdatedBy = hotenToken;
            edit.Updated_at = DateTime.Now;

            if (updateDto.Favicon != null)
            {
                // Xóa favicon cũ (nếu có)
                if (!string.IsNullOrEmpty(edit.Favicon))
                {
                    var oldFilePath = Path.Combine("wwwroot", edit.Favicon.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                        System.IO.File.Delete(oldFilePath);
                }

                // Tạo GUID mới và lấy phần mở rộng của tệp
                var fileExtension = Path.GetExtension(updateDto.Favicon.FileName);
                var uniqueFileName = Guid.NewGuid().ToString() + fileExtension; // GUID + phần mở rộng

                var newFilePath = Path.Combine("wwwroot/tenwebsite", uniqueFileName);
                using (var stream = new FileStream(newFilePath, FileMode.Create))
                {
                    await updateDto.Favicon.CopyToAsync(stream);
                }

                edit.Favicon = $"/tenwebsite/{uniqueFileName}";
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Chỉnh sửa cấu hình Website  {edit.Id} ",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Logss.Add(log);

            await _context.SaveChangesAsync();
            return Ok( new BaseResponseDTO<TenwebSite>
            {
                Data = edit,
                Message = "success"
            });
        }

        /// <summary>
        /// Xóa một Website.
        /// </summary>
        /// <param name="id">ID của Website cần xóa.</param>
        /// <returns>Trạng thái xóa.</returns>

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<TenwebSite>>> Delete(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var tenWebSite = await _context.TenwebSites.FindAsync(id);
            if (tenWebSite == null)
                return BadRequest(new BaseResponseDTO<TenwebSite>
                {
                    Code = 404,
                    Message = " Tên website không tồn tại trong hệ thống"
                });

            // Xóa favicon (nếu tồn tại)
            if (!string.IsNullOrEmpty(tenWebSite.Favicon))
            {
                var filePath = Path.Combine("wwwroot", tenWebSite.Favicon.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa cấu hình Website {tenWebSite.Id} - {tenWebSite.Tieu_de}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.TenwebSites.Remove(tenWebSite);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();
            return Ok( new BaseResponseDTO<TenwebSite>
            {
                Data= tenWebSite,
                Message = "success"
            });
        }

    }
}

