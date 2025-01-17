using CuahangtraicayAPI.Services.gn;
using Microsoft.AspNetCore.Mvc;

namespace CuahangtraicayAPI.Controllers.ghn
{
    [ApiController]
    [Route("api/[controller]")]
    public class GhnSyncController : ControllerBase
    {
        private readonly ISyncGhnStatusService _syncService;
        public GhnSyncController(ISyncGhnStatusService syncService)
        {
            _syncService = syncService;
        }
        [HttpPost("sync-statuses")]
        public async Task<IActionResult> SyncStatuses()
        {
            try
            {
                await _syncService.SyncOrderStatusesAsync();
                return Ok(new { message = "Đồng bộ trạng thái đơn hàng thành công." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi đồng bộ trạng thái đơn hàng.", details = ex.Message });
            }
        }
    }
}
