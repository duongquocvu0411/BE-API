using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.MenuDTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MenuController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Xem danh sách Menu
        /// </summary>
        /// <returns>Xem danh sách Menu</returns>

        // GET: api/Menu
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Menu>>> GetMenus()
        {
            return await _context.Menus.OrderBy(m => m.Thutuhien).ToListAsync();
        }

        /// <summary>
        /// Xem Menu theo {id}
        /// </summary>
        /// <returns>Xem Menu theo {id}</returns>

        // GET: api/Menu/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Menu>> GetMenu(int id)
        {
            var menu = await _context.Menus.FindAsync(id);

            if (menu == null)
            {
                return NotFound();
            }

            return menu;
        }

        /// <summary>
        /// Thêm mới Menu
        /// </summary>
        /// <returns>Thêm mới Menu</returns>

        // POST: api/Menu
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Menu>> CreateMenu(MenuCreateDTO menuDTO)
        {
            var menu = new Menu
            {
                Name = menuDTO.Name,
                Thutuhien = menuDTO.Thutuhien,
                Url = menuDTO.Url,
                CreatedBy = menuDTO.Created_By,
                UpdatedBy = menuDTO.Updated_By,
            };

            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMenu), new { id = menu.Id }, menu);
        }


        /// <summary>
        /// Chỉnh sửa Menu {id}
        /// </summary>
        /// <returns>Chỉnh sửa Menu {id}</returns>
        /// 
        // PUT: api/Menu/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateMenu(int id, MenuUpdateDTO menuDTO)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var editMenu = await _context.Menus.FindAsync(id);
            if (editMenu == null)
            {
                return NotFound();
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
            editMenu.UpdatedBy = menuDTO.Updated_By;

            try
            {
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

            return NoContent();
        }

        /// <summary>
        /// Xóa Menu {id}
        /// </summary>
        /// <returns>Xóa Menu {id}</returns>

        // DELETE: api/Menu/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            var menu = await _context.Menus.FindAsync(id);
            if (menu == null)
            {
                return NotFound();
            }

            _context.Menus.Remove(menu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MenuExists(int id)
        {
            return _context.Menus.Any(e => e.Id == id);
        }
    }
}
