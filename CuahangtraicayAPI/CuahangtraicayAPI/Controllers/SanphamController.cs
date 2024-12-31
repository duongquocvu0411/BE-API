using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CuahangtraicayAPI.DTO;
using CuahangtraicayAPI.Model;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanphamController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public SanphamController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        private string GetImageUrl(string relativePath)
        {
            var relativePathWithoutRoot = relativePath.Replace("wwwroot\\", "").Replace("wwwroot/", "");
            return $"{Request.Scheme}://{Request.Host}/{relativePathWithoutRoot.Replace("\\", "/")}";
        }

        /// <summary>
        /// Lấy danh sách sản phẩm
        /// </summary>
        /// <returns> Lấy danh sách sản phẩm </returns>

        // GET: api/Sanpham

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSanphams()
        {

            var sanphams = await _context.Sanpham
                .Where(s => s.Xoa == false)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.Images)
                .Include(s => s.ChiTiet)
                .Include(s => s.SanphamSales)
                .OrderBy(s => s.Danhmucsanpham.ID)
                .ToListAsync();

            // Cập nhật Hinhanh cho từng sản phẩm
            foreach (var sanpham in sanphams)
            {
                sanpham.Hinhanh = !string.IsNullOrEmpty(sanpham.Hinhanh) ? GetImageUrl(sanpham.Hinhanh) : string.Empty;
                foreach (var image in sanpham.Images)
                {
                    image.hinhanh = !string.IsNullOrEmpty(image.hinhanh) ? GetImageUrl(image.hinhanh) : string.Empty;
                }
            }

            return Ok(sanphams);
        }


        /// <summary>
        /// Lấy sản phẩm theo {id} xem chi tiết sản phẩm
        /// </summary>
        /// <returns> Lấy sản phẩm theo {id} xem chi tiết sản phẩm </returns>

        // GET: api/Sanpham/{id}

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSanphamById(int id)
        {
            var sanpham = await _context.Sanpham
                .Include(s => s.ChiTiet)
                .Include(s => s.Images)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.Danhgiakhachhangs) // Include đánh giá khách hàng
                    .ThenInclude(dg => dg.PhanHoi) // Include phản hồi của từng đánh giá
                .Include(s => s.SanphamSales)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sanpham == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại" });
            }

            // Cập nhật Hinhanh và các đường dẫn ảnh
            sanpham.Hinhanh = !string.IsNullOrEmpty(sanpham.Hinhanh) ? GetImageUrl(sanpham.Hinhanh) : string.Empty;
            foreach (var img in sanpham.Images)
            {
                img.hinhanh = !string.IsNullOrEmpty(img.hinhanh) ? GetImageUrl(img.hinhanh) : string.Empty;
            }

            return Ok(sanpham);
        }


        /// <summary>
        /// Thêm mới sản phẩm
        /// </summary>
        /// <returns>  Thêm mới sản phẩm</returns>

        // POST: api/Sanpham
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Sanpham>> PostSanpham([FromForm] SanphamDTO.SanphamCreateRequest request)
        {
            // Kiểm tra giá gốc hợp lệ
          
            if (request.Giatien < 1000)
            {
                return BadRequest(new { message = "Giá gốc của sản phẩm phải lớn hơn hoặc bằng 1000." });
            }
            if (request.so_luong <= 0)
            {
                return BadRequest(new { message = "Số lượng sản phẩm phải lớn hơn hoặc bằng 1." });
            }



            // Tạo đối tượng sản phẩm mới
            var sanpham = new Sanpham
            {
                Tieude = request.Tieude,
                Giatien = request.Giatien,
                Soluong = request.so_luong,
                Trangthai = request.Trangthai,
                don_vi_tinh = request.DonViTinh,
                danhmucsanpham_id = request.DanhmucsanphamId,
                CreatedBy = request.Created_By,
                UpdatedBy = request.Updated_By,
            };

            // Lưu hình ảnh chính nếu có
            if (request.Hinhanh != null)
            {
                var fileExtension = Path.GetExtension(request.Hinhanh.FileName); // Lấy đuôi file
                var imagePath = Path.Combine(_environment.WebRootPath, "sanpham", Guid.NewGuid().ToString() + fileExtension); // Tạo tên file mới giữ lại đuôi
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await request.Hinhanh.CopyToAsync(stream);
                }
                sanpham.Hinhanh = Path.Combine("sanpham", Path.GetFileName(imagePath)); // Lưu đường dẫn file mới
            }

            // Lưu chi tiết sản phẩm nếu có
            if (request.ChiTiet != null)
            {
                sanpham.ChiTiet = new ChiTiet
                {
                    mo_ta_chung = request.ChiTiet.MoTaChung,
                    bai_viet = request.ChiTiet.BaiViet
                };
            }

            // Lưu ảnh phụ nếu có
            if (request.Images != null)
            {
                foreach (var image in request.Images)
                {
                    // Lấy phần mở rộng của tệp (ví dụ .jpg, .png, .jpeg)
                    var fileExtension = Path.GetExtension(image.FileName);

                    // Tạo tên file duy nhất bằng cách kết hợp GUID với phần mở rộng
                    var uniqueFileName = Guid.NewGuid().ToString() + fileExtension;

                    // Đường dẫn lưu hình ảnh
                    var imagePath = Path.Combine(_environment.WebRootPath, "hinhanhphu", uniqueFileName);

                    // Lưu file vào thư mục
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    // Thêm thông tin hình ảnh vào danh sách hình ảnh sản phẩm
                    sanpham.Images.Add(new HinhAnhSanPham { hinhanh = Path.Combine("hinhanhphu", uniqueFileName) });
                }
            }

            // Lưu thông tin sản phẩm vào cơ sở dữ liệu
            _context.Sanpham.Add(sanpham);
            await _context.SaveChangesAsync();


            // Kiểm tra giá sale và thời gian nếu có
            if (request.Sale != null)
            {
                if (request.Sale.Giasale <= 0)
                {
                    return BadRequest(new { message = "Giá sale phải là số dương lớn hơn 0." });
                }

                if (request.Sale.Giasale >= sanpham.Giatien)
                {
                    return BadRequest(new { message = "Giá sale phải nhỏ hơn giá gốc của sản phẩm." });
                }

                if (request.Sale.Giasale < 1000)
                {
                    return BadRequest(new { message = "Giá sale phải nhỏ hơn 1000." });
                }

                if (request.Sale.Thoigianketthuc <= request.Sale.Thoigianbatdau)
                {
                    return BadRequest(new { message = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu." });
                }

                // Lưu thông tin Sale
                var sale = new Sanphamsale
                {
                    sanpham_id = sanpham.Id,
                    giasale = request.Sale.Giasale,
                    trangthai = request.Sale.Trangthai ?? "Không áp dụng",
                    thoigianbatdau = request.Sale.Thoigianbatdau,
                    thoigianketthuc = request.Sale.Thoigianketthuc
                };
                _context.SanphamSales.Add(sale);
                await _context.SaveChangesAsync();
            }

            // Trả về kết quả với mã 201 (Created) và thông tin sản phẩm vừa tạo
            return CreatedAtAction(nameof(GetSanphams), new { id = sanpham.Id }, sanpham);
        }



        /// <summary>
        ///  Chỉnh sửa sản phẩm theo {id}
        /// </summary>
        /// <returns> Chỉnh sửa sản phẩm theo {id}  </returns>
        // PUT: api/Sanpham/{id} api put sản phẩm
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutSanpham(int id, [FromForm] SanphamDTO.SanphamUpdateRequest request)
        {
            // Tìm sản phẩm trong cơ sở dữ liệu
            var sanpham = await _context.Sanpham
                .Include(s => s.ChiTiet)
                .Include(s => s.Images)
                .Include(s => s.SanphamSales)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sanpham == null)
                return NotFound(new { message = "Sản phẩm không tồn tại" });

            // Kiểm tra giá gốc hợp lệ
            if (request.Giatien < 1000)
            {
                return BadRequest(new { message = "Giá gốc của sản phẩm phải lớn hơn hoặc bằng 1000." });
            }
            //if (request.So_luong <= 0)
            //{
            //    return BadRequest(new { message = "Số lượng sản phẩm phải lớn hơn hoặc bằng 1." });
            //}


            // Cập nhật thông tin sản phẩm
            if (!string.IsNullOrEmpty(request.Tieude)) sanpham.Tieude = request.Tieude;
            if (request.Giatien != 0) sanpham.Giatien = request.Giatien;
            if (!string.IsNullOrEmpty(request.Trangthai)) sanpham.Trangthai = request.Trangthai;
            if (!string.IsNullOrEmpty(request.DonViTinh)) sanpham.don_vi_tinh = request.DonViTinh;
            if (request.DanhmucsanphamId != 0) sanpham.danhmucsanpham_id = request.DanhmucsanphamId;
            sanpham.UpdatedBy = request.Updated_By;
            sanpham.Xoa = request.Xoasp;
            //if (request.So_luong !=0 ) sanpham.Soluong = request.So_luong.Value;


            // Kiểm tra và cập nhật số lượng
            if (request.So_luong.HasValue)
            {
                // Cập nhật số lượng
                sanpham.Soluong = request.So_luong.Value;

                // Nếu số lượng là 0, đặt trạng thái thành "Hết hàng"
                if (sanpham.Soluong == 0)
                {
                    sanpham.Trangthai = "Hết hàng";
                }
                // Nếu số lượng lớn hơn 0 và trạng thái hiện tại là "Hết hàng", đặt lại trạng thái thành "Còn hàng"
                else if (sanpham.Trangthai == "Hết hàng")
                {
                    sanpham.Trangthai = "Còn hàng";
                }
            }


            // Lưu ảnh chính (giống như gioithieu)
            if (request.Hinhanh != null)
            {
                // Lấy phần mở rộng của tệp
                var fileExtension = Path.GetExtension(request.Hinhanh.FileName);
                var imagePath = Path.Combine(_environment.WebRootPath, "sanpham", Guid.NewGuid().ToString() + fileExtension); // Tạo tên file duy nhất
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await request.Hinhanh.CopyToAsync(stream);
                }
                sanpham.Hinhanh = Path.Combine("sanpham", Path.GetFileName(imagePath)); // Lưu đường dẫn file mới
            }

            // Cập nhật chi tiết sản phẩm
            if (request.ChiTiet != null)
            {
                if (sanpham.ChiTiet == null)
                {
                    sanpham.ChiTiet = new ChiTiet();
                    _context.ChiTiets.Add(sanpham.ChiTiet);
                }
                sanpham.ChiTiet.mo_ta_chung = request.ChiTiet.MoTaChung;
                sanpham.ChiTiet.bai_viet = request.ChiTiet.BaiViet;
            }

            // Xử lý ảnh phụ: giữ lại ảnh hiện có, thêm mới ảnh
            if (request.ExistingImageIds != null)
            {
                // Xóa ảnh phụ không nằm trong danh sách ExistingImageIds
                var imagesToDelete = sanpham.Images
                    .Where(img => !request.ExistingImageIds.Contains(img.Id))
                    .ToList();
                _context.HinhAnhSanPhams.RemoveRange(imagesToDelete);
            }
            else
            {
                // Nếu không có ExistingImageIds, xóa tất cả ảnh phụ
                _context.HinhAnhSanPhams.RemoveRange(sanpham.Images);
            }

            if (request.Images != null)
            {
                foreach (var image in request.Images)
                {
                    // Lấy phần mở rộng của tệp
                    var fileExtension = Path.GetExtension(image.FileName);

                    // Tạo tên file duy nhất
                    var uniqueFileName = Guid.NewGuid().ToString() + fileExtension;

                    // Đường dẫn lưu hình ảnh
                    var imagePath = Path.Combine(_environment.WebRootPath, "hinhanhphu", uniqueFileName);

                    // Lưu file vào thư mục
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    // Thêm thông tin hình ảnh vào danh sách hình ảnh sản phẩm
                    sanpham.Images.Add(new HinhAnhSanPham { hinhanh = Path.Combine("hinhanhphu", uniqueFileName) });
                }
            }
            // Kiểm tra giá sale và thời gian nếu có
            if (request.Sale != null)
            {
                if (request.Sale.Giasale <= 0)
                {
                    return BadRequest(new { message = "Giá sale phải là số dương lớn hơn 0." });
                }

                if (request.Sale.Giasale >= sanpham.Giatien)
                {
                    return BadRequest(new { message = "Giá sale phải nhỏ hơn giá gốc của sản phẩm." });
                }

                if (request.Sale.Giasale < 1000)
                {
                    return BadRequest(new { message = "Giá sale phải nhỏ hơn 1000." });
                }

                if (request.Sale.Thoigianketthuc <= request.Sale.Thoigianbatdau)
                {
                    return BadRequest(new { message = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu." });
                }

                // Xử lý thông tin khuyến mãi
                if (sanpham.SanphamSales.Any())
                {
                    _context.SanphamSales.RemoveRange(sanpham.SanphamSales);
                }

                var sale = new Sanphamsale
                {
                    sanpham_id = sanpham.Id,
                    giasale = request.Sale.Giasale,
                    trangthai = request.Sale.Trangthai,
                    thoigianbatdau = request.Sale.Thoigianbatdau,
                    thoigianketthuc = request.Sale.Thoigianketthuc
                };
                _context.SanphamSales.Add(sale);
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Sản phẩm đã được cập nhật thành công.",
                sanpham
            });
        }


        /// <summary>
        ///  Xóa sản phẩm theo {id}
        /// </summary>
        /// <returns> Xóa sản phẩm theo {id}  </returns>

        // DELETE: api/Sanpham/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteSanpham(int id, [FromQuery] string UpdatedBy)
        {
            var sanpham = await _context.Sanpham
                .Include(s => s.Images)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sanpham == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại" });
            }

            // Kiểm tra sản phẩm có liên quan đến đơn hàng chưa hoàn thành không
            var hoaDonChiTiets = await _context.HoaDonChiTiets
                .Where(hdct => hdct.sanpham_ids.Contains(id.ToString()))
                .Include(hdct => hdct.HoaDon)
                .ToListAsync();

            // Kiểm tra trạng thái của các đơn hàng liên quan
            foreach (var chiTiet in hoaDonChiTiets)
            {
                if (chiTiet.HoaDon.status != "Đã giao thành công" && chiTiet.HoaDon.status != "Hủy đơn")
                {
                    return BadRequest(new { message = "Sản phẩm này liên quan đến đơn hàng chưa hoàn thành, không thể ẩn." });
                }
            }

            // "Ẩn" sản phẩm thay vì xóa
            sanpham.Xoa = true;
            sanpham.UpdatedBy = UpdatedBy;



            // Cập nhật thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return NoContent();
        }


        /// <summary>
        ///  Xóa hình ảnh phụ của sản phẩm
        /// </summary>
        /// <returns> Xóa hình ảnh phụ của sản phẩm  </returns>

        // DELETE: api/Sanpham/images/{imageId} api xóa hinhanhphu
        [HttpDelete("images/{imageId}")]

        public async Task<IActionResult> DeleteImage(int imageId)
        {
            // Tìm ảnh phụ theo ID
            var image = await _context.HinhAnhSanPhams.FindAsync(imageId);
            if (image == null)
            {
                return NotFound(new { message = "Ảnh phụ không tồn tại" });
            }

            // Xóa ảnh khỏi thư mục vật lý nếu tồn tại
            var imagePath = Path.Combine(_environment.WebRootPath, image.hinhanh);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            // Xóa ảnh khỏi cơ sở dữ liệu
            _context.HinhAnhSanPhams.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        /// <summary>
        ///  Lấy sản phẩm theo danh mục {danhmucid}
        /// </summary>
        /// <returns> Lấy sản phẩm theo danh mục {danhmucid}  </returns>

        // lấy sản phẩm theo danhmuc sản phẩm
        [HttpGet("danhmuc/{danhmucId}")]
        public async Task<ActionResult<IEnumerable<Sanpham>>> GetSanphamsByDanhMuc(int danhmucId)
        {
            var sanphams = await _context.Sanpham
                .Where(s => s.danhmucsanpham_id == danhmucId && s.Xoa == false)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.SanphamSales)
                .ToListAsync();

            if (!sanphams.Any())
            {
                return NotFound(new { message = "Không có sản phẩm nào thuộc danh mục này." });
            }

            // Chỉ trả về danh sách sản phẩm với các thông tin cơ bản mà không bao gồm chi tiết và đánh giá
            var result = sanphams.Select(s => new
            {
                s.Id,
                s.Tieude,
                s.Giatien,
                Hinhanh = !string.IsNullOrEmpty(s.Hinhanh) ? GetImageUrl(s.Hinhanh) : string.Empty,
                s.Trangthai,
                s.Soluong,
                s.don_vi_tinh,
                s.CreatedBy,
                s.UpdatedBy,
                s.danhmucsanpham_id,
                s.SanphamSales,
                DanhmucsanphamName = s.Danhmucsanpham?.Name,
            });

            return Ok(result);
        }

        /// <summary>
        /// Lấy sản phẩm theo danh mục {danhmucid} nhưng không bao gồm sản phẩm có sale "Đang áp dụng"
        /// </summary>
        /// <returns>Danh sách sản phẩm theo danh mục nhưng không có sale "Đang áp dụng"</returns>
        [HttpGet("danhmuc-khongsale/{danhmucId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetSanphamsByDanhMucWithoutActiveSale(int danhmucId)
        {
            var sanphams = await _context.Sanpham
                .Where(s => s.danhmucsanpham_id == danhmucId && s.Xoa == false)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.SanphamSales)
                .Include(s => s.ChiTiet)
                .ToListAsync();

            if (!sanphams.Any())
            {
                return NotFound(new { message = "Không có sản phẩm nào thuộc danh mục này." });
            }

            // Lọc sản phẩm theo các tiêu chí:
            // - Không có sale nào ("SanphamSales.Count == 0")
            // - Hoặc tất cả sale phải có trạng thái "Không áp dụng"
            var result = sanphams
                .Where(s => !s.SanphamSales.Any() || s.SanphamSales.All(sale => sale.trangthai == "Không áp dụng"))
                .Select(s => new
                {
                    s.Id,
                    s.Tieude,
                    s.Giatien,
                    Hinhanh = !string.IsNullOrEmpty(s.Hinhanh) ? GetImageUrl(s.Hinhanh) : string.Empty,
                    s.Trangthai,
                    s.Soluong,
                    s.don_vi_tinh,
                    s.danhmucsanpham_id,
                    s.ChiTiet?.mo_ta_chung,
                    DanhmucsanphamName = s.Danhmucsanpham?.Name,
                    SanphamSales = s.SanphamSales
                        .Where(sale => sale.trangthai == "Không áp dụng") // Chỉ giữ các sale "Không áp dụng"
                        .Select(sale => new
                        {
                            sale.Id,
                            sale.giasale,
                            sale.thoigianbatdau,
                            sale.thoigianketthuc,
                            sale.trangthai
                        })
                        .ToList()
                })
                .ToList();

            return Ok(result);
        }


        /// <summary>
        ///  lấy Tổng sản phẩm đang có trong bảng
        /// </summary>
        /// <returns> lấy Tổng sản phẩm đang có trong bảng  </returns>

        // GET: api/Sanpham/TongSanPham
        [HttpGet("TongSanPham")]
        [Authorize]
        public async Task<ActionResult<object>> GetTongSanPham()
        {
            var tongSanPham = await _context.Sanpham.CountAsync();
            return Ok(new { TongSanPham = tongSanPham });
        }


        /// <summary>
        /// thêm mới hình ảnh ở chitiet sản phẩm
        /// </summary>
        /// <returns> thêm mới hình ảnh ở chitiet sản phẩm </returns>

        // API uploadImage dành cho bài viết chi tiết
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
                var uploadPath = Path.Combine(_environment.WebRootPath, "upload");
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

                var url = $"{Request.Scheme}://{Request.Host}/upload/{fileName}";

                return Ok(new { uploaded = true, url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { uploaded = false, error = new { message = "Lỗi khi tải lên tệp", details = ex.Message } });
            }
        }
        /// <summary>
        /// Lấy danh sách sản phẩm và sale không áp dụng hoặc không có sale
        /// </summary>
        /// <returns>Danh sách sản phẩm và sale không áp dụng hoặc không có sale</returns>
        [HttpGet("spkhongsale")]
        public async Task<ActionResult<IEnumerable<object>>> GetSanphamkhongsal()
        {
            // Lấy danh sách sản phẩm và thông tin sale
            var sanphams = await _context.Sanpham
                .Where(s => s.Xoa == false)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.ChiTiet)
                .Include(s => s.SanphamSales) // Include thông tin sale
                .OrderBy(s => s.Danhmucsanpham.ID)
                .ToListAsync();

            // Lọc và tạo danh sách kết quả
            var result = sanphams.Select(s => new
            {
                s.Id,
                s.Tieude,
                s.Giatien,
                Hinhanh = !string.IsNullOrEmpty(s.Hinhanh) ? GetImageUrl(s.Hinhanh) : string.Empty,
                s.Trangthai,
                s.Soluong,
                s.don_vi_tinh,
                s.ChiTiet?.mo_ta_chung,
                DanhmucsanphamName = s.Danhmucsanpham?.Name,
                SanphamSales = s.SanphamSales
                    .Where(sale => sale.trangthai == "Không áp dụng") // Chỉ giữ các sale "Không áp dụng"
                    .Select(sale => new
                    {
                        sale.Id,
                        sale.giasale,
                        sale.thoigianbatdau,
                        sale.thoigianketthuc,
                        sale.trangthai
                    })
                    .ToList()
            }).ToList();

            // Lọc các sản phẩm:
            // - Hoặc có ít nhất một sale "Không áp dụng"
            // - Hoặc không có sale nào (SanphamSales.Count == 0)
            var filteredResult = result
                .Where(r => r.SanphamSales.Count > 0 || !sanphams.FirstOrDefault(s => s.Id == r.Id)?.SanphamSales.Any() == true)
                .ToList();

            // Trả về kết quả
            return Ok(filteredResult);
        }

        /// <summary>
        /// Lấy danh sách sản phẩm có sale "Đang áp dụng"
        /// </summary>
        /// <returns>Danh sách sản phẩm và sale "Đang áp dụng"</returns>
        [HttpGet("spcosale")]
        public async Task<ActionResult<IEnumerable<object>>> GetsanphamSale()
        {
            // Lấy danh sách sản phẩm và thông tin sale
            var sanphams = await _context.Sanpham
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.ChiTiet)
                .Include(s => s.SanphamSales) // Include thông tin sale
                .ToListAsync();

            // Lọc và tạo danh sách kết quả
            var result = sanphams
                .Where(s => s.SanphamSales.Any(sale => sale.trangthai == "Đang áp dụng")) // Chỉ giữ sản phẩm có ít nhất một sale "Đang áp dụng"
                .Select(s => new
                {
                    s.Id,
                    s.Tieude,
                    s.Giatien,
                    Hinhanh = !string.IsNullOrEmpty(s.Hinhanh) ? GetImageUrl(s.Hinhanh) : string.Empty,
                    s.Trangthai,
                    s.Soluong,
                    s.don_vi_tinh,
                    s.ChiTiet?.mo_ta_chung,
                    DanhmucsanphamName = s.Danhmucsanpham?.Name,
                    SanphamSales = s.SanphamSales
                        .Where(sale => sale.trangthai == "Đang áp dụng") // Chỉ giữ các sale "Đang áp dụng"
                        .Select(sale => new
                        {
                            sale.Id,
                            sale.giasale,
                            sale.thoigianbatdau,
                            sale.thoigianketthuc,
                            sale.trangthai
                        })
                        .ToList()
                })
                .ToList();

            // Trả về kết quả
            return Ok(result);
        }

    }

}
