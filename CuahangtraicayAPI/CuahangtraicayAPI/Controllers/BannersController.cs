﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.BannersDTO;
using static CuahangtraicayAPI.DTO.TenwebSiteDTO;
using System.Reflection;
using CuahangtraicayAPI.DTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public BannersController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // Hàm lưu hình ảnh vào thư mục wwwroot/banners
        // Hàm lưu hình ảnh vào thư mục wwwroot/banners
        private async Task<string> SaveImageFileAsync(IFormFile imageFile)
        {
            // Đường dẫn thư mục lưu hình ảnh
            var folderPath = Path.Combine(_environment.WebRootPath, "banners");

            // Kiểm tra và tạo thư mục nếu chưa tồn tại
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Lấy tên file gốc và phần mở rộng (ví dụ: image.jpg)
            var fileName = Path.GetFileName(imageFile.FileName);
            var fileExtension = Path.GetExtension(fileName).ToLower();

            // Tạo tên file duy nhất, chỉ giữ lại phần mở rộng
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            // Đường dẫn đầy đủ của file trên server
            var filePath = Path.Combine(folderPath, uniqueFileName);

            // Lưu file vào thư mục
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            // Trả về đường dẫn chuỗi mà bạn sẽ lưu vào cơ sở dữ liệu
            return Path.Combine("banners", uniqueFileName).Replace("\\", "/");
        }



        /// <summary>
        /// lấy toàn bộ danh sách Banners
        /// </summary>
        /// <returns> lấy toàn bộ danh sách Banners</returns>

        // GET: api/Banners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bannerts>>> GetBanners()
        {
            var banners = await _context.Banners
                .Include(b => b.BannerImages)
                .ToListAsync();

            return banners; // Không cần xử lý thêm
        }

        /// <summary>
        /// xem theo {id}  Banners
        /// </summary>
        /// <returns> xem theo {id}  Banners</returns>

        // GET: api/Banners/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Bannerts>> GetBanner(int id)
        {
            var banner = await _context.Banners
        .Include(b => b.BannerImages)
        .FirstOrDefaultAsync(b => b.Id == id);

            if (banner == null)
            {
                return NotFound();
            }

            // Loại bỏ trường `banner` trong `BannerImages`
            foreach (var bannerImage in banner.BannerImages)
            {
                bannerImage.Banner = null; // Gán null cho trường `Banner`
            }

            return banner;
        }

        /// <summary>
        /// Thêm mới Banners
        /// </summary>
        /// <returns>  Thêm mới Banners</returns>

        // POST: api/Banners
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Bannerts>> PostBanner([FromForm] BannerPostDTO dto)
        {
            var banner = new Bannerts
            {
                Tieude = dto.Tieude,
                Phude = dto.Phude,
                Trangthai = "không sử dụng",
                CreatedBy = dto.Created_By,
                UpdatedBy = dto.Updated_By,
            };

            // Xử lý lưu hình ảnh
            if (dto.Hinhanhs != null)
            {
                foreach (var file in dto.Hinhanhs)
                {
                    var imagePath = await SaveImageFileAsync(file);
                    banner.BannerImages.Add(new BannerImages { ImagePath = imagePath });
                }
            }

            _context.Banners.Add(banner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBanner", new { id = banner.Id }, banner);
        }


        /// <summary>
        /// cập nhật {id}  Banners
        /// </summary>
        /// <returns>  cập nhật {id}  Banners</returns>
        // PUT: api/Banners/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutBanner(int id, [FromForm] BannerPutDTO dto)
        {
            var banner = await _context.Banners.Include(b => b.BannerImages).FirstOrDefaultAsync(b => b.Id == id);
            if (banner == null)
            {
                return NotFound();
            }

            // Cập nhật các trường
            if (!string.IsNullOrEmpty(dto.Tieude))
            {
                banner.Tieude = dto.Tieude;
            }
            if (!string.IsNullOrEmpty(dto.Phude))
            {
                banner.Phude = dto.Phude;
            }
            banner.UpdatedBy=dto.Updated_By;

            // Xử lý thêm mới hình ảnh
            if (dto.Hinhanhs != null)
            {
                foreach (var file in dto.Hinhanhs)
                {
                    var imagePath = await SaveImageFileAsync(file);
                    banner.BannerImages.Add(new BannerImages { ImagePath = imagePath });
                }
            }
           
            banner.Updated_at = DateTime.UtcNow;
            _context.Entry(banner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BannerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(banner);
        }


        /// <summary>
        /// Xóa {id} Banners
        /// </summary>
        /// <returns>  Xóa {id} Banners</returns>
        // DELETE: api/Banners/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var banner = await _context.Banners.Include(b => b.BannerImages).FirstOrDefaultAsync(b => b.Id == id);
            if (banner == null)
            {
                return NotFound();
            }

            // Xóa tất cả hình ảnh liên quan
            foreach (var image in banner.BannerImages)
            {
                var filePath = Path.Combine(_environment.WebRootPath, image.ImagePath);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.Banners.Remove(banner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BannerExists(int id)
        {
            return _context.Banners.Any(e => e.Id == id);
        }

       
        /// <summary>
        /// Xóa hình ảnh trong BannerImages
        /// </summary>
        /// <returns> Trả về kết quả xóa hình ảnh </returns>
        // DELETE: api/Banners/DeleteImage/{imageId}
        [HttpDelete("DeleteImage/{imageId}")]
        [Authorize]
        public async Task<IActionResult> DeleteBannerImage(int imageId)
        {
            var image = await _context.BannerImages.FirstOrDefaultAsync(i => i.id == imageId);
            if (image == null)
            {
                return NotFound("Hình ảnh không tồn tại.");
            }

            // Xóa tệp hình ảnh khỏi thư mục
            var filePath = Path.Combine(_environment.WebRootPath, image.ImagePath);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            // Xóa bản ghi hình ảnh trong cơ sở dữ liệu
            _context.BannerImages.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent(); // Trả về NoContent nếu xóa thành công
        }

        /// <summary>
        /// Cập nhật trạng thái "Đang sử dụng" cho banner, các banner khác sẽ có trạng thái "Không sử dụng".
        /// </summary>
        ///    /// <returns> Cập nhật trạng thái "Đang sử dụng" cho banner, các banner khác sẽ có trạng thái "Không sử dụng". </returns>
        [HttpPost("setTrangthai/{id}")]
        [Authorize]
        public async Task<IActionResult> SetTrangthai(int id, [FromBody] SetBannerDTO dto)
        {
            // Kiểm tra tính hợp lệ của DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy tất cả các banner
            var allBanners = await _context.Banners.ToListAsync();

            // Tìm banner với ID được chọn
            var selectedBanner = allBanners.FirstOrDefault(b => b.Id == id);
            if (selectedBanner == null)
            {
                return NotFound(new { message = "Không tìm thấy banner với id này." });
            }

            // Cập nhật trạng thái cho tất cả các banner
            foreach (var banner in allBanners)
            {
                banner.Trangthai = "không sử dụng"; // Đặt trạng thái mặc định cho tất cả
                if (banner.Id == id)
                {
                    banner.Trangthai = "đang sử dụng"; // Cập nhật trạng thái cho banner được chọn
                    banner.UpdatedBy = dto.Updated_By; // Cập nhật người thực hiện
                }
            }

            // Lưu thay đổi
            await _context.SaveChangesAsync();

            return Ok(new { message = "Trạng thái banner đã được cập nhật." });
        }

        /// <summary>
        /// Lấy banner có trạng thái "Đang sử dụng".
        /// </summary>
        [HttpGet("getTrangthaiHien")]
        public async Task<ActionResult<Bannerts>> GetTrangthaiHien()
        {
            var banner = await _context.Banners.Include(b=> b.BannerImages).FirstOrDefaultAsync(b => b.Trangthai == "đang sử dụng");

            if (banner == null)
            {
                return NotFound(new { message = "Không có banner nào đang sử dụng" });
            }

            return Ok(banner);
        }
        

    }
}
