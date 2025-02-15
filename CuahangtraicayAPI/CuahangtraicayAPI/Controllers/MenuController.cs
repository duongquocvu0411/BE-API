using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.MenuDTO;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public MenuController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Xem danh sách Menu
        /// </summary>
        /// <returns>Xem danh sách Menu</returns>

        // GET: api/Menu
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<Menu>>>> GetMenus()
        {
            var menu = await _context.Menus.OrderBy(m => m.Thutuhien).ToListAsync();
            return new BaseResponseDTO< IEnumerable<Menu>>
            {
                Data = menu,
                Message = "Success"
            };
        }

        /// <summary>
        /// Xem Menu theo {id}
        /// </summary>
        /// <returns>Xem Menu theo {id}</returns>

        // GET: api/Menu/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO< Menu>>> GetMenu(int id)
        {
            var menu = await _context.Menus.FindAsync(id);

            if (menu == null)
            {
                return BadRequest( new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Menu không tồn tại trong hệ thống"
                });
            }

            return Ok ( new BaseResponseDTO<Menu>
            {
                Data = menu,
                Message = "Success"
            });
        }

        /// <summary>
        /// Thêm mới Menu
        /// </summary>
        /// <returns>Thêm mới Menu</returns>

        // POST: api/Menu
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<BaseResponseDTO< Menu>>> CreateMenu(MenuCreateDTO menuDTO)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var exists = await _context.Menus.AnyAsync(mn => mn.Thutuhien == menuDTO.Thutuhien);
            if (exists)
            {
                return BadRequest(new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Số thứ tự đã tồn tại trong hệ thống"
                });
            }

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Không thể xác định người dùng từ token"
                });
            }
            var menu = new Menu
            {
                Name = menuDTO.Name,
                Thutuhien = menuDTO.Thutuhien,
                Url = menuDTO.Url,
                CreatedBy =hotenToken ,
                UpdatedBy = hotenToken ,
            };

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Thêm mới menu {menu.Id} - {menu.Name}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Menus.Add(menu);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Menu>
            {
                Data = menu,
                Message = "Success"
            });
        }


        /// <summary>
        /// Chỉnh sửa Menu {id}
        /// </summary>
        /// <returns>Chỉnh sửa Menu {id}</returns>
        /// 
        // PUT: api/Menu/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Menu>>> UpdateMenu(int id, MenuUpdateDTO menuDTO)
        {
            if (id <= 0)
            {
                return BadRequest(new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Id không hợp lệ"
                });
            }

            var editMenu = await _context.Menus.FindAsync(id);
            if (editMenu == null)
            {
                return BadRequest( new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Menu không tồn tại trong hệ thống"
                });
            }
            var thutuhienthi = await _context.Menus.AnyAsync(mn => mn.Thutuhien == menuDTO.Thutuhien && mn.Id != id);
            if (thutuhienthi)
            {
                return BadRequest(new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Thứ tự hiển thị đã tồn tại trong hệ thống"
                });
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin


            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Không thể xác định người dùng từ token"
                });
            }

            // Chỉ cập nhật các trường không null trong DTO
            if (!string.IsNullOrEmpty(menuDTO.Name))
            {
                editMenu.Name = menuDTO.Name;
            }
            if (menuDTO.Thutuhien.HasValue)
            {
                editMenu.Thutuhien = menuDTO.Thutuhien.Value;
            }
            if (!string.IsNullOrEmpty(menuDTO.Url))
            {
                editMenu.Url = menuDTO.Url;
            }
            editMenu.UpdatedBy = hotenToken;
            editMenu.Updated_at = DateTime.Now;

            try
            {
                var log = new Logs
                {
                    UserId = users,
                    HanhDong = $"Cập nhật menu {editMenu.Id} ",
                    CreatedBy = hotenToken,
                    Chucvu = chucVu,
                };
                
                _context.Logss.Add(log);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok( new BaseResponseDTO<Menu>
            {
                Data = editMenu,
                Message = "Success"
            });
        }

        /// <summary>
        /// Xóa Menu {id}
        /// </summary>
        /// <returns>Xóa Menu {id}</returns>

        // DELETE: api/Menu/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Menu>>> DeleteMenu(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var menu = await _context.Menus.FindAsync(id);
            if (menu == null)
            {
                return BadRequest( new BaseResponseDTO<Menu>
                {
                    Code = 404,
                    Message = "Menu không tồn tại trong hệ thống"
                });
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa Menu {menu.Id} - {menu.Name}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.Menus.Remove(menu);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok( new BaseResponseDTO<Menu>
            {
                Data = menu,
                Message = "Success"
            });
        }

        private bool MenuExists(int id)
        {
            return _context.Menus.Any(e => e.Id == id);
        }
    }
}
