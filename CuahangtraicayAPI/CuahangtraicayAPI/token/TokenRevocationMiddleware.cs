using Microsoft.Extensions.Caching.Memory;

namespace CuahangtraicayAPI.token
{
    // vô hiệu hóa token khi logout
    public class TokenRevocationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemoryCache _cache;
        public TokenRevocationMiddleware(RequestDelegate next, IMemoryCache cache)
        {
            _next = next;
            _cache = cache;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            Console.WriteLine($"[Middleware] Token received: {token}"); // Debug token

            if (!string.IsNullOrEmpty(token))
            {
                // Kiểm tra token có trong danh sách bị thu hồi
                if (_cache.TryGetValue($"revoked-token-{token}", out _))
                {
                    Console.WriteLine($"[Middleware] Token has been revoked: {token}"); // Debug token bị thu hồi
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Token đã bị vô hiệu hóa.");
                    return;
                }
            }

            await _next(context);
        }

    }
}
