﻿using Microsoft.AspNetCore.Authorization;
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
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using static CuahangtraicayAPI.DTO.SanphamDTO;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanphamController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SanphamController(AppDbContext context, IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
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
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Sanpham>>>> GetSanphams()
        {

            var sanphams = await _context.Sanpham
                .Where(s => s.Xoa == false)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.Images)
                .Include(s => s.Donvitinhs)
                .Include(s => s.ChiTiet)
                .Include(s => s.SanphamSales)
                .OrderBy(s => s.Danhmucsanpham.ID)
                .ToListAsync();

            // Cập nhật Hinhanh cho từng sản phẩm
            //foreach (var sanpham in sanphams)
            //{
            //    sanpham.Hinhanh = !string.IsNullOrEmpty(sanpham.Hinhanh) ? GetImageUrl(sanpham.Hinhanh) : string.Empty;
            //    foreach (var image in sanpham.Images)
            //    {
            //        image.hinhanh = !string.IsNullOrEmpty(image.hinhanh) ? GetImageUrl(image.hinhanh) : string.Empty;
            //    }
            //}

            return Ok(new BaseResponseDTO<IEnumerable<Sanpham>>
            {
                Data = sanphams,
                Message = "Success"
            });
        }


        /// <summary>
        /// Lấy sản phẩm theo {id} xem chi tiết sản phẩm
        /// </summary>
        /// <returns> Lấy sản phẩm theo {id} xem chi tiết sản phẩm </returns>

        // GET: api/Sanpham/{id}

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO<Sanpham>>> GetSanphamById(int id)
        {
            var sanpham = await _context.Sanpham
                .Include(s => s.ChiTiet)
                .Include(s => s.Images)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.Donvitinhs)
                .Include(s => s.Danhgiakhachhangs) // Include đánh giá khách hàng
                    .ThenInclude(dg => dg.PhanHoi) // Include phản hồi của từng đánh giá
                .Include(s => s.SanphamSales)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sanpham == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại" });
            }

            // Cập nhật Hinhanh và các đường dẫn ảnh
            //sanpham.Hinhanh = !string.IsNullOrEmpty(sanpham.Hinhanh) ? GetImageUrl(sanpham.Hinhanh) : string.Empty;
            //foreach (var img in sanpham.Images)
            //{
            //    img.hinhanh = !string.IsNullOrEmpty(img.hinhanh) ? GetImageUrl(img.hinhanh) : string.Empty;
            //}

            return Ok(new BaseResponseDTO<Sanpham>
            {
                Data = sanpham,
                Message = "Success"
            });
        }


        [HttpGet("{id}/sanphamlienquan")]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Sanpham>>>> GetRelatedSanphams(int id)
        {
            // Lấy sản phẩm hiện tại
            var spht = await _context.Sanpham
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.Donvitinhs)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (spht == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại" });
            }

            // Lấy danh sách sản phẩm liên quan
            var relatedProducts = await _context.Sanpham
                .Include(s => s.SanphamSales)
                .Include(s => s.Donvitinhs)
                .Where(s =>
                    s.Id != id && // Loại trừ sản phẩm hiện tại
                    s.Xoa == false && // Chỉ lấy sản phẩm không bị xóa
                    s.danhmucsanpham_id == spht.danhmucsanpham_id) // Cùng danh mục sản phẩm
                .OrderByDescending(s => s.SanphamSales.Any(sale => sale.trangthai == "Đang áp dụng")) // Ưu tiên sản phẩm có giảm giá
                .ThenBy(r => Guid.NewGuid()) // Random danh sách
                .Take(6) // Lấy tối đa 6 sản phẩm
                .ToListAsync();

            return Ok(new BaseResponseDTO<IEnumerable<Sanpham>>
            {
                Data = relatedProducts,
                Message = "Success"
            });
        }

        private string GenerateMa_sanpham()
        {
            string masanpham;

            do
            {
                // Sử dụng Guid để tạo mã duy nhất
                masanpham = "SP" + Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper(); // Lấy 8 ký tự đầu tiên từ GUID

                // Kiểm tra trong database xem mã sản phẩm đã tồn tại chưa
            } while (_context.Sanpham.Any(sp => sp.ma_sanpham == masanpham));

            return masanpham;
        }


        /// <summary>
        /// Thêm mới sản phẩm
        /// </summary>
        /// <returns>  Thêm mới sản phẩm</returns>

        // POST: api/Sanpham
        [HttpPost]
        [Authorize(Roles = "Admin,Employee")]
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
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin


            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Sanpham>
                {
                    Data = null,
                    Message = "không thể xác định người dùng từ token"
                });
            }
            var masanpham = GenerateMa_sanpham();
            // Tạo đối tượng sản phẩm mới
            var sanpham = new Sanpham
            {
                Tieude = request.Tieude,
                Giatien = request.Giatien,
                Soluong = request.so_luong,
                Trangthai = request.so_luong > 0 ? "Còn hàng" : "Hết hàng", // Kiểm tra số lượng,
                don_vi_tinh = request.DonViTinh,
                danhmucsanpham_id = request.DanhmucsanphamId,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken,
                ma_sanpham = masanpham,
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
            var logsanpham = new Logs
            {
                UserId = users,
                HanhDong = "Thêm sản phẩm " + " " + sanpham.ma_sanpham,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };
            // Lưu thông tin sản phẩm vào cơ sở dữ liệu
            _context.Sanpham.Add(sanpham);
            _context.Logss.Add(logsanpham);
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
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<Sanpham>>> PutSanpham(int id, [FromForm] SanphamDTO.SanphamUpdateRequest request)
        {
            // Tìm sản phẩm trong cơ sở dữ liệu
            var sanpham = await _context.Sanpham
                .Include(s => s.ChiTiet)
                .Include(s => s.Images)
                .Include(s => s.SanphamSales)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sanpham == null)
                return NotFound(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Sản phẩm không tồn tại" });

            // Kiểm tra giá gốc hợp lệ
            if (request.Giatien < 1000)
            {
                return BadRequest(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Giá gốc của sản phẩm phải lớn hơn hoặc bằng 1000." });
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;
            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee";

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Sanpham>
                {
                    Data = null,
                    Message = "không thể xác định người dùng từ token"
                });
            }

            // Cập nhật thông tin sản phẩm
            if (!string.IsNullOrEmpty(request.Tieude)) sanpham.Tieude = request.Tieude;
            if (request.Giatien != 0) sanpham.Giatien = request.Giatien;
            if (!string.IsNullOrEmpty(request.Trangthai)) sanpham.Trangthai = request.Trangthai;
            if (request.DonViTinh != 0) sanpham.don_vi_tinh = request.DonViTinh;
            if (request.DanhmucsanphamId != 0) sanpham.danhmucsanpham_id = request.DanhmucsanphamId;
            sanpham.UpdatedBy = hotenToken;
            sanpham.Xoa = request.Xoasp;


            // Kiểm tra và cập nhật số lượng
            if (request.So_luong.HasValue)
            {
                // Kiểm tra so_luong_tam_giu
                if (request.so_luong_tam_giu.HasValue)
                {
                    if (request.so_luong_tam_giu < 0)
                    {
                        return BadRequest(new BaseResponseDTO<Sanpham>
                        {
                            Code = 400,
                            Message = "Số lượng tạm giữ không được nhỏ hơn 0."
                        });
                    }

                    if (request.so_luong_tam_giu > request.So_luong)
                    {
                        return BadRequest(new BaseResponseDTO<Sanpham>
                        {
                            Code = 400,
                            Message = "Số lượng tạm giữ không được lớn hơn số lượng sản phẩm."
                        });
                    }

                    // Tính tổng số lượng tạm giữ cho các đơn hàng COD có trạng thái khác delivered và Hủy đơn
                    var pendingCodQuantity = await _context.HoaDonChiTiets
                        .Include(hdct => hdct.HoaDon)
                        .Where(hdct => hdct.sanpham_ids == id &&
                                       hdct.HoaDon.Thanhtoan == "cod" &&
                                       hdct.HoaDon.status != "delivered" &&
                                       hdct.HoaDon.status != "Hủy đơn")
                        .SumAsync(hdct => hdct.quantity);

                    // Kiểm tra nếu số lượng tạm giữ MỚI nhỏ hơn pendingCodQuantity, báo lỗi
                    if (request.so_luong_tam_giu < pendingCodQuantity)
                    {
                        return BadRequest(new BaseResponseDTO<Sanpham>
                        {
                            Code = 400,
                            Message = $"Số lượng tạm giữ mới ({request.so_luong_tam_giu}) phải lớn hơn hoặc bằng số lượng đang được giữ trong các đơn hàng COD chưa hoàn thành ({pendingCodQuantity}). Vui lòng điều chỉnh số lượng tạm giữ."
                        });
                    }


                    sanpham.Soluongtamgiu = request.so_luong_tam_giu.Value;
                }
                else
                {
                    // Nếu không cung cấp so_luong_tam_giu, gán giá trị hiện tại vào nó
                    sanpham.Soluongtamgiu = sanpham.Soluongtamgiu;
                }

                // Nếu số lượng tạm giữ lớn hơn số lượng mới muốn cập nhật, trả về lỗi
                if (sanpham.Soluongtamgiu > request.So_luong.Value)
                {
                    return BadRequest(new BaseResponseDTO<Sanpham>
                    {
                        Code = 400,
                        Message = $"Số lượng tạm giữ ({sanpham.Soluongtamgiu}) lớn hơn số lượng bạn muốn cập nhật ({request.So_luong.Value})."
                    });
                }

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
                var fileExtension = Path.GetExtension(request.Hinhanh.FileName);
                var imagePath = Path.Combine(_environment.WebRootPath, "sanpham", Guid.NewGuid().ToString() + fileExtension);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await request.Hinhanh.CopyToAsync(stream);
                }
                sanpham.Hinhanh = Path.Combine("sanpham", Path.GetFileName(imagePath));
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
                var imagesToDelete = sanpham.Images
                    .Where(img => !request.ExistingImageIds.Contains(img.Id))
                    .ToList();
                _context.HinhAnhSanPhams.RemoveRange(imagesToDelete);
            }
            else
            {
                _context.HinhAnhSanPhams.RemoveRange(sanpham.Images);
            }

            if (request.Images != null)
            {
                foreach (var image in request.Images)
                {
                    var fileExtension = Path.GetExtension(image.FileName);
                    var uniqueFileName = Guid.NewGuid().ToString() + fileExtension;
                    var imagePath = Path.Combine(_environment.WebRootPath, "hinhanhphu", uniqueFileName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    sanpham.Images.Add(new HinhAnhSanPham { hinhanh = Path.Combine("hinhanhphu", uniqueFileName) });
                }
            }

            // Kiểm tra giá sale và thời gian nếu có
            if (request.Sale != null)
            {
                if (request.Sale.Giasale <= 0)
                {
                    return BadRequest(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Giá sale phải là số dương lớn hơn 0." });
                }

                if (request.Sale.Giasale >= sanpham.Giatien)
                {
                    return BadRequest(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Giá sale phải nhỏ hơn giá gốc của sản phẩm." });
                }

                if (request.Sale.Giasale < 1000)
                {
                    return BadRequest(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Giá sale phải nhỏ hơn 1000." });
                }

                if (request.Sale.Thoigianketthuc <= request.Sale.Thoigianbatdau)
                {
                    return BadRequest(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu." });
                }

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

            var logEditsp = new Logs
            {
                UserId = users,
                HanhDong = "Chỉnh sửa sản phẩm " + " " + sanpham.ma_sanpham,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };
            _context.Logss.Add(logEditsp);

            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Sanpham>
            {
                Message = "Sản phẩm đã được cập nhật thành công.",
                Data = sanpham,
            });
        }



        /// <summary>
        ///  Xóa sản phẩm theo {id}
        /// </summary>
        /// <returns> Xóa sản phẩm theo {id}  </returns>

        // DELETE: api/Sanpham/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Sanpham>>> DeleteSanpham(int id)
        {
            var sanpham = await _context.Sanpham
                .Include(s => s.Images)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sanpham == null)
            {
                return NotFound(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Sản phẩm không tồn tại" });
            }

            if (sanpham.Xoa == true)
            {
                return new BaseResponseDTO<Sanpham>
                {
                    Code = 404,
                    Message = $"Sản phẩm {sanpham.Id} đã được xóa trước đó"
                };
            }

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            // Kiểm tra sản phẩm có liên quan đến đơn hàng chưa hoàn thành không
            var hoaDonChiTiets = await _context.HoaDonChiTiets
                 //.Where(hdct => hdct.sanpham_ids.Contains(id.ToString()))
                 .Where(hdct => hdct.sanpham_ids == id)
                .Include(hdct => hdct.HoaDon)
                .ToListAsync();

            // Lấy danh sách order_code của các đơn hàng chưa hoàn thành
            var orderCodesChuaHoanThanh = new List<string>();
            foreach (var chiTiet in hoaDonChiTiets)
            {
                if (chiTiet.HoaDon.status != "delivered" && chiTiet.HoaDon.status != "Hủy đơn")
                {
                    orderCodesChuaHoanThanh.Add(chiTiet.HoaDon.order_code);
                }
            }

            // Nếu có đơn hàng chưa hoàn thành, trả về thông báo lỗi và danh sách order_code
            if (orderCodesChuaHoanThanh.Any())
            {
                return BadRequest(new
                {
                    message = $"Sản phẩm này liên quan đến các đơn hàng chưa hoàn thành, không thể xóa. Mã đơn hàng: ",
                    order_codes = orderCodesChuaHoanThanh // Thêm danh sách order_code vào response
                });
            }

            // "Ẩn" sản phẩm thay vì xóa
            sanpham.Xoa = true;
            sanpham.UpdatedBy = hotenToken;

            var LogDLT = new Logs
            {
                UserId = users,
                HanhDong = "Xóa sản phẩm " + " " + sanpham.ma_sanpham,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };
            _context.Logss.Add(LogDLT);
            // Cập nhật thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Sanpham>
            {
                Data = sanpham,
                Message = "Success"
            });
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
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Sanpham>>>> GetSanphamsByDanhMuc(int danhmucId)
        {
            var sanphams = await _context.Sanpham
                .Where(s => s.danhmucsanpham_id == danhmucId && s.Xoa == false)
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.Donvitinhs)
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

            return Ok(new BaseResponseDTO<IEnumerable<Sanpham>>
            {
                Data = sanphams,
                Message = "Success"
            });
        }

        /// <summary>
        /// Lấy sản phẩm theo danh mục {danhmucid} nhưng không bao gồm sản phẩm có sale "Đang áp dụng"
        /// </summary>
        /// <returns>Danh sách sản phẩm theo danh mục nhưng không có sale "Đang áp dụng"</returns>
        [HttpGet("danhmuc-khongsale/{danhmucId}")]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Sanpham>>>> GetSanphamsByDanhMucWithoutActiveSale(int danhmucId)
        {
            var sanphams = await _context.Sanpham
                .Where(s => s.danhmucsanpham_id == danhmucId && s.Xoa == false && s.SanphamSales.All(sale => sale.trangthai == "Không áp dụng"))
                .Include(s => s.Danhmucsanpham)
                .Include( s => s.Donvitinhs)
                .Include(s => s.SanphamSales)

                .Include(s => s.ChiTiet)
                .ToListAsync();

            if (!sanphams.Any())
            {
                return NotFound(new BaseResponseDTO<Sanpham> { Code = 404, Message = "Không có sản phẩm nào thuộc danh mục này." });
            }

            return Ok(new BaseResponseDTO<IEnumerable<Sanpham>>
            {
                Data = sanphams,
                Message = "Success"

            });
        }


        /// <summary>
        ///  lấy Tổng sản phẩm đang có trong bảng
        /// </summary>
        /// <returns> lấy Tổng sản phẩm đang có trong bảng  </returns>

        // GET: api/Sanpham/TongSanPham
        [HttpGet("TongSanPham")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<object>>> GetTongSanPham()
        {
            // Tính tổng số sản phẩm
            var tongSanPham = await _context.Sanpham.Where(sp => sp.Xoa == false).CountAsync();

            // Chuẩn bị dữ liệu trả về
            var result = new
            {
                TongSanPham = tongSanPham
            };

            // Trả về kết quả qua BaseResponseDTO
            return Ok(new BaseResponseDTO<object>
            {
                Code = 0,
                Message = "Success",
                Data = result
            });
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
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Sanpham>>>> GetSanphamkhongsal()
        {
            // Lấy danh sách sản phẩm và thông tin sale
            var sanphams = await _context.Sanpham
               .Where(s => s.Xoa == false && s.SanphamSales.All(sale => sale.trangthai == "Không áp dụng"))
                .Include(s => s.Danhmucsanpham)
                .Include(s => s.ChiTiet)
                .Include(s => s.SanphamSales)
                 .Include(s => s.Donvitinhs)
                .OrderBy(s => s.Danhmucsanpham.ID)
                .ToListAsync();


            // Trả về kết quả
            return Ok(new BaseResponseDTO<IEnumerable<Sanpham>>
            {
                Data = sanphams,
                Message = "Success"
            });
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
                 .Include(s => s.Donvitinhs)
                .Include(s => s.SanphamSales)
               .Where(s => s.Xoa == false && s.SanphamSales.Any(sale => sale.trangthai == "Đang áp dụng"))// Include thông tin sale
                .ToListAsync();


            // Trả về kết quả
            return Ok(new BaseResponseDTO<IEnumerable<Sanpham>>
            {
                Data = sanphams,
                Message = "Success"
            });
        }

    }

}