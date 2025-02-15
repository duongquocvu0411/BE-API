﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.TenFooterDTO;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenFooterController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public TenFooterController(AppDbContext context, IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Xem danh sách Tên Footer
        /// </summary>
        /// <returns>Xem danh sách Tên Footer</returns>
        // GET: api/TenFooters
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO< IEnumerable<TenFooters>>>> GetTenFooters()
        {
            var ft =await _context.TenFooters
                .Include(tf => tf.FooterIMG)
                .ToListAsync();
           
            return  new BaseResponseDTO<IEnumerable<TenFooters>>()
            {
                Data= ft,
                Message = "Success"
            };
        }


        /// <summary>
        /// Xem Tên Footer {id}
        /// </summary>
        /// <returns>Xem Tên Footer {id}</returns>

        // GET: api/TenFooters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO< TenFooters>>> GetTenFooter(int id)
        {
            var tenFooter = await _context.TenFooters
                .Include(tf => tf.FooterIMG)
                .FirstOrDefaultAsync(tf => tf.Id == id);

            if (tenFooter == null)
            {
                return BadRequest(new BaseResponseDTO<TenFooters>
                {
                    Code = 404,
                    Message = "Tên footer không tồn tại trong hệ thông"
                });
            }

            return new BaseResponseDTO<TenFooters>
            {
                Data = tenFooter,
                Message= "Success"
            };
        }


        /// <summary>
        /// Thêm mới Tên Footer
        /// </summary>
        /// <returns>Thêm mới Tên Footer</returns> 
        /// 
        // POST: api/TenFooters
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<BaseResponseDTO<TenFooters>>> PostTenFooter([FromForm] TenFooterPostDto dto)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Danhmucsanpham>
                {
                    Data = null,
                    Message = " Không thể xác định người dùng từ token"
                });
            }
            var tenFooter = new TenFooters
            {
                tieude = dto.Tieude,
                phude = dto.Phude,
                CreatedBy=hotenToken,
                UpdatedBy=hotenToken,
            };

            if (dto.Images != null && dto.Images.Count > 0)
            {
                for (int i = 0; i < dto.Images.Count; i++)
                {
                    var image = dto.Images[i];
                    var link = dto.Links != null && dto.Links.Count > i ? dto.Links[i] : null;

                    // Lấy phần mở rộng của tệp ảnh gốc (ví dụ: .jpg, .png, v.v.)
                    var fileExtension = Path.GetExtension(image.FileName);

                    // Tạo một chuỗi duy nhất bằng GUID và kết hợp với phần mở rộng của tệp
                    var uniqueFileName = Guid.NewGuid().ToString("N") + fileExtension;

                    var filePath = Path.Combine(_environment.WebRootPath, "footer", uniqueFileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    tenFooter.FooterIMG.Add(new FooterImgs
                    {
                        ImagePath = $"/footer/{uniqueFileName}",
                        link = link
                    });
                }
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Thêm mới tênFooter {tenFooter.Id} - {tenFooter.tieude}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };


            _context.TenFooters.Add(tenFooter);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<TenFooters>
            {
                Data = tenFooter,
                Message = "Success"

            });
        }


        /// <summary>
        /// Chỉnh sửa Tên Footer {id}
        /// </summary>
        /// <returns>Chỉnh sửa Tên Footer {id}</returns>

        // PUT: api/TenFooters/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<TenFooters>> PutTenFooter(int id, [FromForm] TenFooterPuttDto dto)
        {
            var editTenFooter = await _context.TenFooters
                .Include(tf => tf.FooterIMG)
                .FirstOrDefaultAsync(tf => tf.Id == id);

            if (editTenFooter == null)
            {
                return NotFound(new BaseResponseDTO<TenFooters>
                {
                    Code = 404,
                    Message = "TenFooter không tồn tại."
                });
            }
            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Danhmucsanpham>
                {
                    Data = null,
                    Message = "Không thể xác định người dùng từ token."
                });
            }

            // Update basic fields (nếu DTO có giá trị)
            if (!string.IsNullOrWhiteSpace(dto.Tieude))
            {
                editTenFooter.tieude = dto.Tieude;
            }
            if (!string.IsNullOrWhiteSpace(dto.Phude))
            {
                editTenFooter.phude = dto.Phude;
            }

            editTenFooter.UpdatedBy = hotenToken;
            editTenFooter.Updated_at = DateTime.Now;

            // 1. Xử lý cập nhật ảnh cũ (dựa trên ImageIds)
            if (dto.ImageIds != null && dto.ImageIds.Any())
            {
                for (int i = 0; i < dto.ImageIds.Count; i++)
                {
                    var imageId = dto.ImageIds[i];
                    var existingImage = await _context.FooterImgs.FindAsync(imageId);

                    if (existingImage == null)
                    {
                        return NotFound(new BaseResponseDTO<FooterImgs>
                        {
                            Code = 404,
                            Message = $"Không tìm thấy FooterImg với ID = {imageId}."
                        });
                    }

                    // Nếu ImageId tồn tại, tiếp tục xử lý
                    if (dto.Links != null && dto.Links.Count > i)
                    {
                        existingImage.link = dto.Links[i];
                    }

                    if (dto.Images != null && dto.Images.Count > i)
                    {
                        // Xóa ảnh cũ
                        var oldFilePath = Path.Combine(_environment.WebRootPath, existingImage.ImagePath.TrimStart('/'));
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }

                        // Upload ảnh mới
                        var image = dto.Images[i];
                        var fileExtension = Path.GetExtension(image.FileName);
                        var uniqueFileName = Guid.NewGuid().ToString("N") + fileExtension;
                        var filePath = Path.Combine(_environment.WebRootPath, "footer", uniqueFileName);
                        Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        // Cập nhật ImagePath
                        existingImage.ImagePath = $"/footer/{uniqueFileName}";
                    }
                }
            }

            // 2. Xử lý thêm ảnh mới (không có ImageIds)
            if (dto.Images != null && dto.Images.Any() && (dto.ImageIds == null || !dto.ImageIds.Any()))
            {
                for (int i = 0; i < dto.Images.Count; i++)
                {
                    var image = dto.Images[i];
                    var link = dto.Links != null && dto.Links.Count > i ? dto.Links[i] : null;

                    // Xử lý upload ảnh mới và tạo FooterImgs
                    var fileExtension = Path.GetExtension(image.FileName);
                    var uniqueFileName = Guid.NewGuid().ToString("N") + fileExtension;
                    var filePath = Path.Combine(_environment.WebRootPath, "footer", uniqueFileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    var newFooterImg = new FooterImgs
                    {
                        ImagePath = $"/footer/{uniqueFileName}",
                        link = link,
                        Footer_ID = editTenFooter.Id
                    };

                    _context.FooterImgs.Add(newFooterImg); // Thêm vào context
                    editTenFooter.FooterIMG.Add(newFooterImg); // Thêm vào collection của TenFooter
                }
            }

            try
            {
                var log = new Logs
                {
                    UserId = users,
                    HanhDong = $"Chỉnh sửa TenFooter  {editTenFooter.Id}",
                    CreatedBy = hotenToken,
                    Chucvu = chucVu,
                };

                _context.Logss.Add(log);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TenFooterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new BaseResponseDTO<TenFooters>
            {
                Data = editTenFooter,
                Message = "Cập nhật thành công."
            });
        }

        /// <summary>
        /// Xóa Tên Footer {id}
        /// </summary>
        /// <returns>Xóa Tên Footer {id}</returns>

        // DELETE: api/TenFooters/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<TenFooters>> DeleteTenFooter(int id)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            var tenFooter = await _context.TenFooters
                .Include(tf => tf.FooterIMG)
                .FirstOrDefaultAsync(tf => tf.Id == id);

            if (tenFooter == null)
            {
                return BadRequest(new BaseResponseDTO<TenFooters>
                {
                    Code = 404,
                    Message = "Tên footer không tồn tại trong hệ thống"
                });
            }

            // Delete images
            foreach (var img in tenFooter.FooterIMG)
            {
                var filePath = Path.Combine(_environment.WebRootPath, img.ImagePath.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa Tenfooter {tenFooter.Id} - {tenFooter.tieude}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };


            _context.TenFooters.Remove(tenFooter);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<TenFooters>
            {
                Data = tenFooter,
                Message = "Success"
            });
        }

        /// <summary>
        /// Xóa Hình ảnh icon của Footer {imageId}
        /// </summary>
        /// <returns>Xóa Hình ảnh icon của Footer {imageId}</returns>
        
        [HttpDelete("DeleteImage/{imageId}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteImage(int imageId)
        {
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            // Tìm hình ảnh theo ID
            var image = await _context.FooterImgs.FindAsync(imageId);

            if (image == null)
            {
                return NotFound("Hình ảnh không tồn tại.");
            }

            // Xóa file hình ảnh khỏi thư mục `wwwroot/footer`
            var filePath = Path.Combine(_environment.WebRootPath, image.ImagePath.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            var log = new Logs
            {
                UserId = users,
                HanhDong = $"Xóa hình ảnh Tenfooter {image.Footer_ID} - hình ảnh {image.Id}",
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            // Xóa bản ghi trong cơ sở dữ liệu
            _context.FooterImgs.Remove(image);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok("Xóa hình ảnh thành công.");
        }

        private bool TenFooterExists(int id)
        {
            return _context.TenFooters.Any(e => e.Id == id);
        }
    }
}
