using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CuahangtraicayAPI.Model;
using static CuahangtraicayAPI.DTO.DanhmucsanphamDTO;
using Azure.Core;
using CuahangtraicayAPI.DTO;
using System.IdentityModel.Tokens.Jwt;
using CuahangtraicayAPI.Model.DB;

namespace CuahangtraicayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhmucsanphamController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DanhmucsanphamController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách của Danh Mục sản phẩm
        /// </summary>
        /// <returns> Lấy danh sách của Danh Mục sản phẩm</returns>

        // GET: api/Danhmucsanpham
        [HttpGet]
        public async Task<ActionResult<BaseResponseDTO<IEnumerable<Danhmucsanpham>>>> GetDanhmucsanpham()
        {
            //ActionResult là một lớp trong ASP.NET Core, được sử dụng để trả về các kết quả HTTP từ controller.
            // api có thể trả về một danh sách các đối tượng trong danhmucsanpham
            var danhmuc = await _context.Danhmucsanpham.ToListAsync();

            return new BaseResponseDTO<IEnumerable<Danhmucsanpham>>
            {
                Data = danhmuc,
                Message = "success"
            };

        }



        /// <summary>
        /// Lấy danh sách Danh mục sản phẩm theo {id}
        /// </summary>
        /// <returns> Lấy danh sách Danh mục sản phẩm theo {id}</returns>

        // GET: api/Danhmucsanpham/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponseDTO<Danhmucsanpham>>> GetDanhmucsanpham(int id)
        {
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);

            if (danhmucsanpham == null)
            {
                return new BaseResponseDTO<Danhmucsanpham> { Code = 404, Message = "Danh mục không tồn tại" };
            }

            return new BaseResponseDTO<Danhmucsanpham>
            {
                Data = danhmucsanpham,
                Message = "success"
            };
        }


        /// <summary>
        ///  Thêm mới 1 danh mục sản phẩm
        /// </summary>
        /// <returns> Thêm mới 1 danh mục sản phẩm </returns>

        // POST: api/Danhmucsanpham
        [HttpPost]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<Danhmucsanpham>>> PostDanhmucsanpham([FromBody] PostDanhmucDTO dto)
        {
            // Kiểm tra xem tên danh mục đã tồn tại chưa
            var exists = await _context.Danhmucsanpham.AnyAsync(dm => dm.Name == dto.Name);
            if (exists)
            {
                return BadRequest(new BaseResponseDTO<Danhmucsanpham>
                {
                    Data = null,
                    Code = 404,
                    Message = "Tên danh mục đã tồn tại "

                });
            }
            // Lấy thông tin "hoten" từ token
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Danhmucsanpham>
                {
                    Data = null,
                    Message = "không thể xác định người dùng từ token"
                });
            }

            var danhmucsanpham = new Danhmucsanpham
            {
                Name = dto.Name,
                CreatedBy = hotenToken,
                UpdatedBy = hotenToken
            };

            _context.Danhmucsanpham.Add(danhmucsanpham);
            await _context.SaveChangesAsync();

            return new BaseResponseDTO<Danhmucsanpham>
            {
                Data = danhmucsanpham,
                Message = "Success"
            };
        }


        /// <summary>
        /// Chỉnh sửa danh mục sản phẩm theo {id}
        /// </summary>
        /// <returns> Chỉnh sửa danh mục sản phẩm theo {id}</returns>

        // PUT: api/Danhmucsanpham/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<ActionResult<BaseResponseDTO<Danhmucsanpham>>> PutDanhmucsanpham(int id, [FromBody] PutDanhmucDTO dto)
        {
            // Lấy thông tin "hoten" từ token
            var hotenToken = User.Claims.FirstOrDefault(c => c.Type == "FullName")?.Value;

            if (hotenToken == null)
            {
                return Unauthorized(new BaseResponseDTO<Danhmucsanpham>
                {
                    Data = null,
                    Message = " Không thể xác định người dùng từ token"
                });
            }



            // Cập nhật danh mục
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);
            if (danhmucsanpham == null)
            {
                return new BaseResponseDTO<Danhmucsanpham>
                {
                    Code = 404,
                    Message = " Danh mục không tồn tại "
                };
            }

            // kiểm tra xem tên danh mục đã tồn tại chưa
            var tendanhmuc = await _context.Danhmucsanpham.AnyAsync(dm => dm.Name == dto.Name && dm.ID != id);
            if (tendanhmuc)
            {
                return BadRequest(new BaseResponseDTO<Danhmucsanpham>
                {
                    Code = 400,
                    Message = "Tên danh mục đã tồn tại"
                });
            }


            danhmucsanpham.Name = dto.Name;
            danhmucsanpham.UpdatedBy = hotenToken;
            danhmucsanpham.Updated_at = DateTime.Now;

            _context.Entry(danhmucsanpham).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Danhmucsanpham>
            {
                Data = danhmucsanpham,
                Message = "Success"
            });
        }




        /// <summary>
        /// Xóa 1 danh mục sản phẩm theo {id}
        /// </summary>
        /// <returns> Xóa 1 danh mục sản phẩm theo {id}</returns>

        // DELETE: api/Danhmucsanpham/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BaseResponseDTO<Danhmucsanpham>>> DeleteDanhmucsanpham(int id)
        {
            // Tìm danh mục sản phẩm theo ID
            var danhmucsanpham = await _context.Danhmucsanpham.FindAsync(id);
            if (danhmucsanpham == null)
            {
                return NotFound(new BaseResponseDTO<Danhmucsanpham>
                {
                    Code = 401,
                    Message = "Danh mục không tồn tại"
                });
            }

            // Kiểm tra xem danh mục này có sản phẩm nào hay không
            var hasActiveProducts = await _context.Sanpham
                .Where(sp => sp.danhmucsanpham_id == id)
                .AnyAsync(sp => sp.Xoa == false); // Chỉ kiểm tra sản phẩm chưa bị xóa (Xoa == 0)

            if (hasActiveProducts)
            {
                return BadRequest(new BaseResponseDTO<Danhmucsanpham>
                {
                    Code = 404,
                    Message = "Không thể xóa vì danh mục này đang chứa sản phẩm chưa được xóa."

                });
            }

            // Xóa danh mục nếu không có sản phẩm nào chưa bị xóa
            _context.Danhmucsanpham.Remove(danhmucsanpham);
            await _context.SaveChangesAsync();

            return Ok(new BaseResponseDTO<Danhmucsanpham>
            {
                Data = danhmucsanpham,
                Message = "Success"
            });
        }



        private bool DanhmucsanphamExists(int id)
        {
            return _context.Danhmucsanpham.Any(e => e.ID == id);
        }
    }
}