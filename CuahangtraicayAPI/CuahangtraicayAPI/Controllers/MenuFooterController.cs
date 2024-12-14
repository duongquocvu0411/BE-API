using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.MenuFooterDTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuFooterController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly AppDbContext _context;

        public MenuFooterController(AppDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        // POST: api/MenuFooter/upload-image
        [HttpPost("upload-image")]

        public async Task<IActionResult> UploadImage(IFormFile upload)
        {
            if (upload == null || upload.Length == 0)
            {
                return BadRequest(new { uploaded = false, error = new { message = "Không có tệp nào được tải lên" } });
            }

            try
            {
                // Lưu tệp vào thư mục wwwroot/upload
                var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "menuFooter");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var fileName = $"{DateTime.Now.Ticks}_{upload.FileName}";
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await upload.CopyToAsync(stream);
                }

                var url = $"{Request.Scheme}://{Request.Host}/menuFooter/{fileName}";

                return Ok(new { uploaded = true, url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { uploaded = false, error = new { message = "Lỗi khi tải lên tệp", details = ex.Message } });
            }
        }
        // GET: api/MenuFooter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuFooter>>> GetMenuFooters()
        {
            var MenuFooter = await _context.MenuFooters
              
                .OrderBy(mn => mn.Thutuhienthi)
                .ToListAsync();
            return Ok(MenuFooter);
        }

        // GET: api/MenuFooter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuFooter>> GetMenuFooter(int id)
        {
            var menuFooter = await _context.MenuFooters.FindAsync(id);

            if (menuFooter == null)
            {
                return NotFound();
            }

            var menuFooterDto = new MenuFooter
            {
                Id = menuFooter.Id,
                Tieu_de = menuFooter.Tieu_de,
                Noi_dung = menuFooter.Noi_dung,
                Thutuhienthi = menuFooter.Thutuhienthi
            };

            return Ok(menuFooterDto);
        }

        // POST: api/MenuFooter
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult<MenuFooter>> PostMenuFooter(MenuFooterCreateDto menuFooterCreateDto)
        {
            var menuFooter = new MenuFooter
            {
                Tieu_de = menuFooterCreateDto.Tieu_de,
                Noi_dung = menuFooterCreateDto.Noi_dung,
                Thutuhienthi = menuFooterCreateDto.Thutuhienthi,
               
            };

            _context.MenuFooters.Add(menuFooter);
            await _context.SaveChangesAsync();

            var menuFooterDto = new MenuFooter
            {
                Id = menuFooter.Id,
                Tieu_de = menuFooter.Tieu_de,
                Noi_dung = menuFooter.Noi_dung,
                Thutuhienthi = menuFooter.Thutuhienthi
            };

            return CreatedAtAction("GetMenuFooter", new { id = menuFooter.Id }, menuFooterDto);
        }

        // PUT: api/MenuFooter/5
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> PutMenuFooter(int id, MenuFooterUpdateDto menuFooterUpdateDto)
        {
            //if (id != menuFooterUpdateDto.Id)
            //{
            //    return BadRequest();
            //}

            var menuFooter = await _context.MenuFooters.FindAsync(id);
            if (menuFooter == null)
            {
                return NotFound();
            }

            menuFooter.Tieu_de = menuFooterUpdateDto.Tieu_de;
            menuFooter.Noi_dung = menuFooterUpdateDto.Noi_dung;
            menuFooter.Thutuhienthi = menuFooterUpdateDto.Thutuhienthi;
            menuFooter.Updated_at = DateTime.Now;

            _context.Entry(menuFooter).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/MenuFooter/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuFooter(int id)
        {
            var menuFooter = await _context.MenuFooters.FindAsync(id);
            if (menuFooter == null)
            {
                return NotFound();
            }

            _context.MenuFooters.Remove(menuFooter);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
