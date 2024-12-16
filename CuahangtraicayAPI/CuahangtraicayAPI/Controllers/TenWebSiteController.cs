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
                //UpdatedBy = createDto.UpdatedBy,
              
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

        /// <summary>
        /// Đặt trạng thái Website được sử dụng (TrangThai = 1) và các Website khác về trạng thái không hoạt động (TrangThai = 0).
        /// </summary>
        /// <param name="id">ID của Website cần đặt làm sử dụng.</param>
        /// <param name="setDto">Thông tin người thực hiện cập nhật.</param>
        /// <returns>Trạng thái cập nhật.</returns>

        //[HttpPost("setTenwebsiter/{id}")]
        //public async Task<IActionResult> SetTenwebsiter(int id, [FromBody] UpdateTenWebSiteDto setDto)
        //{
        //    // Tìm bản ghi được yêu cầu set TrangThai == 1
        //    var tenWebSiteToSet = await _context.TenwebSites.FindAsync(id);
        //    if (tenWebSiteToSet == null)
        //        return NotFound(new { message = "Không tìm thấy website với ID này." });

        //    //// Lấy giá trị updatedBy từ DTO
        //    //var updatedBy = setDto.UpdatedBy;

        //    // Đặt tất cả các bản ghi khác TrangThai = 0
        //    var otherWebsites = await _context.TenwebSites
        //        .Where(t => t.Id != id && t.TrangThai == 1)
        //        .ToListAsync();

        //    foreach (var website in otherWebsites)
        //    {
        //        website.TrangThai = 0;
        //        //website.UpdatedBy = updatedBy; // Gán người thực hiện vào UpdatedBy
        //        website.Updated_at = DateTime.Now; // Cập nhật thời gian
        //    }

        //    // Đặt bản ghi được chỉ định thành TrangThai = 1
        //    tenWebSiteToSet.TrangThai = 1;
        //    //tenWebSiteToSet.UpdatedBy = updatedBy; // Gán người thực hiện vào UpdatedBy
        //    tenWebSiteToSet.Updated_at = DateTime.Now;

        //    // Lưu các thay đổi
        //    await _context.SaveChangesAsync();

        //    return Ok(new
        //    {
        //        message = "Đã cập nhật trạng thái website thành công.",
        //        id = tenWebSiteToSet.Id,
        //        //updatedBy = updatedBy
        //    });
        //}


        [HttpPost("setTenwebsiter/{id}")]
        [Authorize]
        public async Task<IActionResult> SetDiaChiHien(int id)
        {
            // Set tất cả Footer khác thành "không sử dụng"
            await _context.TenwebSites.ForEachAsync(d => d.TrangThai = 0);
            await _context.SaveChangesAsync();

            // Cập nhật Footer với id cụ thể thành "đang sử dụng"
            var diachi = await _context.TenwebSites.FindAsync(id);
            if (diachi == null)
            {
                return NotFound();
            }

            diachi.TrangThai = 1;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Footer đã được chọn làm Footer đang sử dụng" });
        }
    }
}
