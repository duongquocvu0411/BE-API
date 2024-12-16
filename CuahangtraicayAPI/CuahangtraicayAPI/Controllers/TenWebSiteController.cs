using CuahangtraicayAPI.Model;
using Microsoft.AspNetCore.Mvc;
using static CuahangtraicayAPI.DTO.TenwebSiteDTO;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.DTO;
using Microsoft.AspNetCore.Authorization;
namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenWebSiteController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TenWebSiteController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả các Website.
        /// </summary>
        /// <returns>Danh sách Website.</returns>
       
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.TenwebSites.ToListAsync());
        }

        /// <summary>
        /// Lấy thông tin chi tiết của Website dựa trên ID.
        /// </summary>
        /// <param name="id">ID của Website.</param>
        /// <returns>Thông tin chi tiết của Website.</returns>

   
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tenWebSite = await _context.TenwebSites.FindAsync(id);
            if (tenWebSite == null)
                return NotFound();
            return Ok(tenWebSite);
        }


        /// <summary>
        /// Lấy danh sách các Website đang hoạt động (TrangThai = 1).
        /// </summary>
        /// <returns>Danh sách Website đang hoạt động.</returns>
      

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveItems()
        {
            var activeItems = await _context.TenwebSites
                .Where(t => t.TrangThai == 1)
                .ToListAsync();

            return Ok(activeItems);
        }
        /// <summary>
        /// Tạo mới một Website.
        /// </summary>
        /// <param name="createDto">Dữ liệu của Website cần tạo.</param>
        /// <returns>Website vừa được tạo.</returns>

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateTenWebSiteDto createDto)
        {
            var newTenWebSite = new TenwebSite
            {
                Tieu_de = createDto.TieuDe,
                TrangThai = createDto.TrangThai,
                CreatedBy = createDto.Created_By,
                UpdatedBy = createDto.Updated_By,
              
            };

            if (createDto.Favicon != null)
            {
                var filePath = Path.Combine("wwwroot/tenwebsite", createDto.Favicon.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await createDto.Favicon.CopyToAsync(stream);
                }
                newTenWebSite.Favicon = $"/tenwebsite/{createDto.Favicon.FileName}";
            }

            _context.TenwebSites.Add(newTenWebSite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newTenWebSite.Id }, newTenWebSite);
        }

        /// <summary>
        /// Cập nhật thông tin của một Website.
        /// </summary>
        /// <param name="id">ID của Website cần cập nhật.</param>
        /// <param name="updateDto">Dữ liệu cần cập nhật.</param>
        /// <returns>Trạng thái cập nhật.</returns>
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] TenwebSiteDTO.UpdateTenWebSiteDto updateDto)
        {
            var existing = await _context.TenwebSites.FindAsync(id);
            if (existing == null)
                return NotFound();

            if (!string.IsNullOrEmpty(updateDto.TieuDe))
                existing.Tieu_de = updateDto.TieuDe;

            //if (!string.IsNullOrEmpty(updateDto.UpdatedBy))
            //    existing.UpdatedBy = updateDto.UpdatedBy;

            if (updateDto.TrangThai.HasValue)
                existing.TrangThai = updateDto.TrangThai.Value; // Cập nhật TrangThai nếu có trong DTO

            existing.UpdatedBy = updateDto.Updated_By;
            existing.Updated_at = DateTime.Now;

            if (updateDto.Favicon != null)
            {
                // Xóa favicon cũ (nếu có)
                if (!string.IsNullOrEmpty(existing.Favicon))
                {
                    var oldFilePath = Path.Combine("wwwroot", existing.Favicon.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                        System.IO.File.Delete(oldFilePath);
                }

                // Lưu favicon mới
                var newFilePath = Path.Combine("wwwroot/tenwebsite", updateDto.Favicon.FileName);
                using (var stream = new FileStream(newFilePath, FileMode.Create))
                {
                    await updateDto.Favicon.CopyToAsync(stream);
                }
                existing.Favicon = $"/tenwebsite/{updateDto.Favicon.FileName}";
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Xóa một Website.
        /// </summary>
        /// <param name="id">ID của Website cần xóa.</param>
        /// <returns>Trạng thái xóa.</returns>
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tenWebSite = await _context.TenwebSites.FindAsync(id);
            if (tenWebSite == null)
                return NotFound();

            // Xóa favicon (nếu tồn tại)
            if (!string.IsNullOrEmpty(tenWebSite.Favicon))
            {
                var filePath = Path.Combine("wwwroot", tenWebSite.Favicon.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }

            _context.TenwebSites.Remove(tenWebSite);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpPost("setTenwebsiter/{id}")]
        [Authorize]
        public async Task<IActionResult> SetDiaChiHien(int id, SetTenwebSiteDto dto)
        {
            // Kiểm tra tính hợp lệ của DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy tất cả bản ghi
            var allTenwebSites = await _context.TenwebSites.ToListAsync();

            // Cập nhật trạng thái "không sử dụng" cho tất cả các bản ghi
            foreach (var tenweb in allTenwebSites)
            {
                tenweb.TrangThai = 0;

                // Chỉ cập nhật `UpdatedBy` cho bản ghi được chọn
                if (tenweb.Id == id)
                {
                    tenweb.UpdatedBy = dto.Updated_By; // Ghi lại người cập nhật
                }
            }

            // Tìm bản ghi với ID được chọn
            var tenwebSite = allTenwebSites.FirstOrDefault(t => t.Id == id);
            if (tenwebSite == null)
            {
                return NotFound(new { message = "Không tìm thấy TenwebSite với ID được cung cấp." });
            }

            // Cập nhật trạng thái cho bản ghi được chọn
            tenwebSite.TrangThai = 1;

            // Lưu thay đổi
            await _context.SaveChangesAsync();

            return Ok(new { message = "TenwebSite đã được chọn làm TenwebSite đang sử dụng." });
        }

    }
}

