using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using CuahangtraicayAPI.DTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GioithieuController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _imageDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "gioithieu");

        public GioithieuController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả các mục giới thiệu, bao gồm thông tin hình ảnh liên quan.
        /// </summary>
        /// <returns>Danh sách các mục giới thiệu.</returns>

        [HttpGet]
        public async Task<ActionResult> GetAllGioithieu()
        {
            var gioithieuList = await _context.Gioithieu.Include(g => g.GioithieuImgs).ToListAsync();

            // Duyệt qua danh sách hình ảnh và thêm đường dẫn đầy đủ
            foreach (var gioithieu in gioithieuList)
            {
                foreach (var img in gioithieu.GioithieuImgs)
                {
                    img.URL_image = Path.Combine("gioithieu", img.URL_image); // Thêm đường dẫn thư mục
                }
            }

            return Ok(gioithieuList);
        }


        /// <summary>
        /// Lấy danh sách các mục giới thiệu đang hoạt động (Trang_thai = 1), bao gồm thông tin hình ảnh liên quan.
        /// </summary>
        /// <returns>Danh sách các mục giới thiệu đang hoạt động.</returns>

        [HttpGet("active")]
        public async Task<ActionResult> GetActiveGioithieu()
        {
            var activeGioithieuList = await _context.Gioithieu
                .Where(g => g.Trang_thai == 1)
                .Include(g => g.GioithieuImgs)
                .ToListAsync();

            // Duyệt qua danh sách hình ảnh và thêm đường dẫn đầy đủ
            foreach (var gioithieu in activeGioithieuList)
            {
                foreach (var img in gioithieu.GioithieuImgs)
                {
                    img.URL_image = Path.Combine("gioithieu", img.URL_image); // Thêm đường dẫn thư mục
                }
            }

            return Ok(activeGioithieuList);
        }



        /// <summary>
        /// Lấy thông tin chi tiết của một mục giới thiệu, bao gồm thông tin hình ảnh liên quan, dựa trên ID.
        /// </summary>
        /// <param name="id">ID của mục giới thiệu cần lấy thông tin.</param>
        /// <returns>Thông tin chi tiết của mục giới thiệu.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetGioithieu(int id)
        {
            var gioithieu = await _context.Gioithieu.Include(g => g.GioithieuImgs).FirstOrDefaultAsync(g => g.Id == id);

            if (gioithieu == null)
            {
                return NotFound();
            }

            return Ok(gioithieu);
        }

        /// <summary>
        /// Tạo mới một mục giới thiệu, bao gồm việc tải lên hình ảnh liên quan.
        /// </summary>
        /// <param name="dto">Dữ liệu để tạo mục giới thiệu mới (bao gồm tiêu đề, nội dung và hình ảnh).</param>
        /// <returns>Mục giới thiệu vừa được tạo.</returns>

        [HttpPost]
        public async Task<ActionResult> CreateGioithieu([FromForm] GioithieuCreateDTO dto)
        {
            // Kiểm tra đầu vào từ DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map từ DTO sang Entity
            var gioithieu = new Gioithieu
            {
                Tieu_de = dto.Tieu_de,
                Phu_de = dto.Phu_de,
                Noi_dung = dto.Noi_dung,
                Trang_thai = dto.Trang_thai,
            };

            // Lưu thông tin hình ảnh
            var imageUrls = new List<string>();
            if (dto.Images != null && dto.Images.Any())
            {
                foreach (var image in dto.Images)
                {
                    var filePath = Path.Combine(_imageDirectory, image.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    imageUrls.Add($"/gioithieu/{image.FileName}");
                }
            }

            _context.Gioithieu.Add(gioithieu);
            await _context.SaveChangesAsync();

            // Lưu thông tin hình ảnh vào bảng GioithieuImg
            foreach (var url in imageUrls)
            {
                _context.GioithieuImg.Add(new GioithieuImg
                {
                    Id_gioithieu = gioithieu.Id,
                    URL_image = url
                });
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGioithieu), new { id = gioithieu.Id }, gioithieu);
        }

        /// <summary>
        /// Cập nhật thông tin của một mục giới thiệu, bao gồm việc thêm mới hình ảnh nếu cần.
        /// </summary>
        /// <param name="id">ID của mục giới thiệu cần cập nhật.</param>
        /// <param name="gioithieuUpdateDTO">Dữ liệu cần cập nhật (bao gồm tiêu đề, nội dung, trạng thái và hình ảnh mới).</param>
        /// <returns>Trạng thái cập nhật.</returns>

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGioithieu(int id, [FromForm] GioithieuUpdateDTO gioithieuUpdateDTO)
        {
            var gioithieu = await _context.Gioithieu.Include(g => g.GioithieuImgs).FirstOrDefaultAsync(g => g.Id == id);
            if (gioithieu == null)
            {
                return NotFound();
            }

            // Cập nhật các trường
            gioithieu.Tieu_de = gioithieuUpdateDTO.Tieu_de ?? gioithieu.Tieu_de;
            gioithieu.Phu_de = gioithieuUpdateDTO.Phu_de ?? gioithieu.Phu_de;
            gioithieu.Noi_dung = gioithieuUpdateDTO.Noi_dung ?? gioithieu.Noi_dung;
            gioithieu.Trang_thai = gioithieuUpdateDTO.Trang_thai ?? gioithieu.Trang_thai;

            // Lưu các thay đổi về thông tin trong bảng Gioithieu
            _context.Gioithieu.Update(gioithieu);

            // Kiểm tra và xử lý hình ảnh nếu có
            if (gioithieuUpdateDTO.Images != null && gioithieuUpdateDTO.Images.Any())
            {
                var imageUrls = new List<string>();

                // Lưu hình ảnh mới
                foreach (var image in gioithieuUpdateDTO.Images)
                {
                    var filePath = Path.Combine(_imageDirectory, image.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    imageUrls.Add($"/gioithieu/{image.FileName}");
                }

                // Thêm hình ảnh mới vào cơ sở dữ liệu mà không xóa hình ảnh cũ
                foreach (var url in imageUrls)
                {
                    var gioithieuImg = new GioithieuImg
                    {
                        Id_gioithieu = gioithieu.Id,
                        URL_image = url
                    };
                    _context.GioithieuImg.Add(gioithieuImg);
                }
            }

            // Lưu tất cả các thay đổi
            await _context.SaveChangesAsync();

            return NoContent(); // Trả về trạng thái NoContent khi thành công
        }


        /// <summary>
        /// Xóa một mục giới thiệu, bao gồm tất cả các hình ảnh liên quan.
        /// </summary>
        /// <param name="id">ID của mục giới thiệu cần xóa.</param>
        /// <returns>Trạng thái xóa.</returns>

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGioithieu(int id)
        {
            var gioithieu = await _context.Gioithieu.FindAsync(id);

            if (gioithieu == null)
            {
                return NotFound();
            }

            var imagesToDelete = await _context.GioithieuImg.Where(g => g.Id_gioithieu == id).ToListAsync();
            _context.GioithieuImg.RemoveRange(imagesToDelete);

            _context.Gioithieu.Remove(gioithieu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Xóa một hình ảnh của mục giới thiệu dựa trên ID của hình ảnh.
        /// </summary>
        /// <param name="imageId">ID của hình ảnh cần xóa.</param>
        /// <returns>Trạng thái xóa hình ảnh.</returns>


        [HttpDelete("DeleteImage/{imageId}")]
        public async Task<ActionResult> DeleteImage(int imageId)
        {
            var gioithieuImg = await _context.GioithieuImg.FindAsync(imageId);
    
            if (gioithieuImg == null)
            {
                return NotFound();
            }

            // Xóa file hình ảnh khỏi thư mục (nếu cần)
            var filePath = Path.Combine(_imageDirectory, Path.GetFileName(gioithieuImg.URL_image.TrimStart('/')));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            _context.GioithieuImg.Remove(gioithieuImg);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
