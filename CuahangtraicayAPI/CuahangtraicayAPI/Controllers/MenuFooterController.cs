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
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model.DB;

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
        /// <summary>
        /// Tải lên một tệp hình ảnh để sử dụng trong menu footer.
        /// Lưu tệp vào thư mục `wwwroot/menuFooter` và trả về URL của tệp.
        /// </summary>
        /// <param name="upload">Tệp được tải lên.</param>
        /// <returns>URL của hình ảnh đã tải lên hoặc thông báo lỗi nếu thất bại.</returns>

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

        /// <summary>
        /// Lấy danh sách tất cả các mục menu footer, sắp xếp theo thứ tự hiển thị.
        /// </summary>
        /// <returns>Danh sách các mục menu footer.</returns>

        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<MenuFooter>>>> GetMenuFooters()
        {
            var MenuFooter = await _context.MenuFooters
              
                .OrderBy(mn => mn.Thutuhienthi)
                .ToListAsync();
            return Ok(new BaseResponseDTO<IEnumerable< MenuFooter>>
            {
                Data = MenuFooter,
                Message = "Success"
            });
        }

        /// <summary>
        /// Lấy thông tin chi tiết của một mục menu footer dựa theo ID.
        /// </summary>
        /// <param name="id">ID của mục menu footer cần lấy.</param>
        /// <returns>Chi tiết mục menu footer hoặc lỗi 404 nếu không tìm thấy.</returns>

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO< MenuFooter>>> GetMenuFooter(int id)
        {
            var menuFooter = await _context.MenuFooters.FindAsync(id);

            if (menuFooter == null)
            {
                return BadRequest(new BaseResponseDTO<MenuFooter>
                {
                    Code = 404,
                    Message = "MenuFooter không tồn tại trong hệ thống"
                });
            }

            var menuFooterDto = new MenuFooter
            {
                Id = menuFooter.Id,
                Tieu_de = menuFooter.Tieu_de,
                Noi_dung = menuFooter.Noi_dung,
                Thutuhienthi = menuFooter.Thutuhienthi
            };

            return Ok(new BaseResponseDTO<MenuFooter>
            {
                Data = menuFooterDto,
                Message = "Success"
            });
        }

        /// <summary>
        /// Tạo một mục menu footer mới với tiêu đề, nội dung và thứ tự hiển thị được cung cấp.
        /// </summary>
        /// <param name="menuFooterCreateDto">Dữ liệu DTO chứa thông tin tiêu đề, nội dung, thứ tự hiển thị của menu footer.</param>
        /// <returns>Mục menu footer vừa được tạo.</returns>

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO< MenuFooter>>> PostMenuFooter(MenuFooterCreateDto menuFooterCreateDto)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<MenuFooter> {Code=404, Message = "Không thể xác định người dùng từ token." });
            }
            var footer = await _context.MenuFooters.AnyAsync(ft => ft.Thutuhienthi == menuFooterCreateDto.Thutuhienthi );
            if (footer)
            {
                return BadRequest(new BaseResponseDTO<MenuFooter>{Code=404 , Message = "Thứ tự hiển thị đã tồn tại trong hệ thông" });
            }

            var menuFooter = new MenuFooter
            {
                Tieu_de = menuFooterCreateDto.Tieu_de,
                Noi_dung = menuFooterCreateDto.Noi_dung,
                Thutuhienthi = menuFooterCreateDto.Thutuhienthi,
                CreatedBy = hotenToken ,
                UpdatedBy = hotenToken ,
               
            };

            _context.MenuFooters.Add(menuFooter);
            await _context.SaveChangesAsync();

            return Ok( new BaseResponseDTO<MenuFooter>
            {
                Data = menuFooter,
                Message = "Success"
            });
        }

        /// <summary>
        /// Cập nhật thông tin của một mục menu footer dựa trên ID.
        /// </summary>
        /// <param name="id">ID của mục menu footer cần cập nhật.</param>
        /// <param name="menuFooterUpdateDto">Dữ liệu DTO chứa thông tin cần cập nhật.</param>
        /// <returns>Không trả về nội dung nếu cập nhật thành công, hoặc lỗi nếu không tìm thấy mục menu footer.</returns>

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<MenuFooter>> PutMenuFooter(int id, MenuFooterUpdateDto menuFooterUpdateDto)
        {
         

            var footer = await _context.MenuFooters.AnyAsync(ft => ft.Thutuhienthi == menuFooterUpdateDto.Thutuhienthi && ft.Id != id);
            if (footer)
            {
                return BadRequest(new { message = "Thứ tự hiển thị đã tồn tại trong hệ thống" });
            }

            var menuFooter = await _context.MenuFooters.FindAsync(id);
            if (menuFooter == null)
            {
                
                return BadRequest(new BaseResponseDTO<MenuFooter>
                {
                    Code = 404,
                    Message ="MenuFooter không tồn tại torng hệ thống"
                });
               
            }
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            menuFooter.Tieu_de = menuFooterUpdateDto.Tieu_de;
            menuFooter.Noi_dung = menuFooterUpdateDto.Noi_dung;
            menuFooter.Thutuhienthi = menuFooterUpdateDto.Thutuhienthi;
            menuFooter.UpdatedBy = hotenToken;
            menuFooter.Updated_at = DateTime.Now;

            _context.Entry(menuFooter).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<MenuFooter>
            {
                Data = menuFooter,
                Message = "Success"
            });
        }

        /// <summary>
        /// Xóa một mục menu footer dựa trên ID.
        /// </summary>
        /// <param name="id">ID của mục menu footer cần xóa.</param>
        /// <returns>Trạng thái thành công hoặc lỗi nếu không tìm thấy mục menu footer.</returns>

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<MenuFooter>> DeleteMenuFooter(int id)
        {
            var menuFooter = await _context.MenuFooters.FindAsync(id);
            if (menuFooter == null)
            {
                return BadRequest(new BaseResponseDTO<MenuFooter>
                {
                    Code =404,
                    Message ="MenuFooter không tồn tại trong hệ thóng"
                });
            }

            _context.MenuFooters.Remove(menuFooter);
            await _context.SaveChangesAsync();

            return Ok( new BaseResponseDTO<MenuFooter>
            {
                Data= menuFooter,
                Message= "Success"
            });
        }
    }
}
