using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;

using Azure.Core;
using CuahangtraicayAPI.DTO;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;
using System.Security.Claims;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonvitinhController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DonvitinhController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Lấy danh sách của đơn vị tính sản phẩm
        /// </summary>
        /// <returns> Lấy danh sách của đơn vị tính sản phẩm</returns>

        // GET: api/Donvitinh
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Donvitinh>>>> GetDonvitinh()
        {
            //ActionResult là một lớp trong ASP.NET Core, được sử dụng để trả về các kết quả HTTP từ controller.
            // api có thể trả về một danh sách các đối tượng trong Donvitinh
            var danhmucs = await _context.donvitinhs.ToListAsync();
            //foreach (var danhmuc in danhmucs)
            //{
            //    // Truy vấn riêng để lấy các sản phẩm thuộc về đơn vị tính này
            //    danhmuc.Sanpham = await _context.Sanpham
            //                                  .Where(s => s.Donvitinh_id == danhmuc.ID)
            //                                  .ToListAsync();
            //}

            return new BaseResponseDTO<IEnumerable<Donvitinh>>
            {
                Data = danhmucs,
                Message = "success"
            };

        }



        /// <summary>
        /// Lấy danh sách đơn vị tính sản phẩm theo {id}
        /// </summary>
        /// <returns> Lấy danh sách đơn vị tính sản phẩm theo {id}</returns>

        // GET: api/Donvitinh/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO<Donvitinh>>> GetDonvitinh(int id)
        {
            var Donvitinh = await _context.donvitinhs.FirstOrDefaultAsync(dm => dm.ID == id);



            if (Donvitinh == null)
            {
                return new BaseResponseDTO<Donvitinh> { Code = 404, Message = "đơn vị tính không tồn tại" };
            }

            return new BaseResponseDTO<Donvitinh>
            {
                Data = Donvitinh,
                Message = "success"
            };
        }


        /// <summary>
        ///  Thêm mới 1 đơn vị tính sản phẩm
        /// </summary>
        /// <returns> Thêm mới 1 đơn vị tính sản phẩm </returns>

        // POST: api/Donvitinh
        [HttpPost]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<Donvitinh>>> PostDonvitinh([FromBody] DvtDTO.PostDvtDTO dto)
        {
            // Kiểm tra xem tên đơn vị tính đã tồn tại chưa
            var exists = await _context.donvitinhs.AnyAsync(dm => dm.name == dto.Name);
            if (exists)
            {
                return BadRequest(new BaseResponseDTO<Donvitinh>
                {
                    Data = null,
                    Code = 404,
                    Message = "Tên đơn vị tính đã tồn tại "

                });
            }
            // Lấy thông tin "hoten" từ token
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin


            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Donvitinh>
                {
                    Data = null,
                    Message = "không thể xác định người dùng từ token"
                });
            }

            var Donvitinh = new Donvitinh
            {
                name = dto.Name,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken
            };

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Thêm mới DVT " + " " + Donvitinh.name,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            _context.donvitinhs.Add(Donvitinh);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<Donvitinh>
            {
                Data = Donvitinh,
                Message = "Success"
            };
        }


        /// <summary>
        /// Chỉnh sửa đơn vị tính sản phẩm theo {id}
        /// </summary>
        /// <returns> Chỉnh sửa đơn vị tính sản phẩm theo {id}</returns>

        // PUT: api/Donvitinh/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<Donvitinh>>> PutDonvitinh(int id, [FromBody] DvtDTO.PutDvtDTO dto)
        {
            // Lấy thông tin "hoten" từ token
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Donvitinh>
                {
                    Data = null,
                    Message = " Không thể xác định người dùng từ token"
                });
            }



            // Cập nhật đơn vị tính
            var Donvitinh = await _context.donvitinhs.FindAsync(id);
            if (Donvitinh == null)
            {
                return new BaseResponseDTO<Donvitinh>
                {
                    Code = 404,
                    Message = " đơn vị tính không tồn tại "
                };
            }

            // kiểm tra xem tên đơn vị tính đã tồn tại chưa
            var tendanhmuc = await _context.donvitinhs.AnyAsync(dm => dm.name == dto.Name && dm.ID != id);
            if (tendanhmuc)
            {
                return BadRequest(new BaseResponseDTO<Donvitinh>
                {
                    Code = 400,
                    Message = "Tên đơn vị tính đã tồn tại"
                });
            }


            Donvitinh.name = dto.Name;
            Donvitinh.UpdatedBy = hotenToken;
            Donvitinh.Updated_at = DateTime.Now;

            var log = new Logs
            {
                UserId = users,
                HanhDong = "Chỉnh sửa DVT" + " " + Donvitinh.name,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };


            _context.Entry(Donvitinh).State = EntityState.Modified;
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Donvitinh>
            {
                Data = Donvitinh,
                Message = "Success"
            });
        }




        /// <summary>
        /// Xóa 1 đơn vị tính sản phẩm theo {id}
        /// </summary>
        /// <returns> Xóa 1 đơn vị tính sản phẩm theo {id}</returns>

        // DELETE: api/Donvitinh/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Donvitinh>>> DeleteDonvitinh(int id)
        {

            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            var users = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Xác định chức vụ từ Roles trong Token

            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            string chucVu = roles.Contains("Admin") ? "Admin" : "Employee"; // Mặc định là Employee nếu không phải Admin

            // Tìm đơn vị tính sản phẩm theo ID
            var Donvitinh = await _context.donvitinhs.FindAsync(id);
            if (Donvitinh == null)
            {
                return NotFound(new BaseResponseDTO<Donvitinh>
                {
                    Code = 401,
                    Message = "đơn vị tính không tồn tại"
                });
            }

            // Kiểm tra xem đơn vị tính này có sản phẩm nào hay không
            var hasActiveProducts = await _context.Sanpham
                .Where(sp => sp.don_vi_tinh == id)
                .AnyAsync(sp => sp.Xoa == false); // Chỉ kiểm tra sản phẩm chưa bị xóa (Xoa == 0)

            if (hasActiveProducts)
            {
                return BadRequest(new BaseResponseDTO<Donvitinh>
                {
                    Code = 404,
                    Message = "Không thể xóa vì đơn vị tính này đang chứa sản phẩm chưa được xóa."

                });
            }
            var log = new Logs
            {
                UserId = users,
                HanhDong = "Xóa DVT " + " " + Donvitinh.name,
                CreatedBy = hotenToken,
                Chucvu = chucVu,
            };

            // Xóa đơn vị tính nếu không có sản phẩm nào chưa bị xóa
            _context.donvitinhs.Remove(Donvitinh);
            _context.Logss.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Donvitinh>
            {
                Data = Donvitinh,
                Message = "Success"
            });
        }



        private bool DonvitinhExists(int id)
        {
            return _context.donvitinhs.Any(e => e.ID == id);
        }
    }
}