﻿using CuahangtraicayAPI.Model;
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
        /// Tạo mới một Website.
        /// </summary>
        /// <param name="createDto">Dữ liệu của Website cần tạo.</param>
        /// <returns>Website vừa được tạo.</returns>

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] CreateTenWebSiteDto createDto)
        {
            var newTenWebSite = new TenwebSite
            {
                Tieu_de = createDto.TieuDe,
                Phu_de = createDto.PhuDe,
                Email = createDto.Email,
                Diachi = createDto.Diachi,
                Sdt = createDto.Sodienthoai,
                CreatedBy = createDto.Created_By,
                UpdatedBy = createDto.Updated_By,
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
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromForm] TenwebSiteDTO.UpdateTenWebSiteDto updateDto)
        {
            var edit = await _context.TenwebSites.FindAsync(id);
            if (edit == null)
                return NotFound();

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

            edit.UpdatedBy = updateDto.Updated_By;
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

            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Xóa một Website.
        /// </summary>
        /// <param name="id">ID của Website cần xóa.</param>
        /// <returns>Trạng thái xóa.</returns>

        [HttpDelete("{id}")]
        [Authorize]
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

    }
}

