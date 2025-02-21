using System.Text.Json;

namespace CuahangtraicayAPI.Middleware
{
    public class NotFoundMiddleware
    {
        private readonly RequestDelegate _next;

        
        public NotFoundMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke (HttpContext context)
        {
            await _next(context);
            
            if(context.Response.StatusCode == 404 && !context.Response.HasStarted)
            {
                context.Response.ContentType = "application/json";

                var loiError = new { code = 404 , message ="Not Found", data = (object) null };

                var json = JsonSerializer.Serialize(loiError);
                
                await context.Response.WriteAsync(json);
            }
        }
    }

    public static class NotFoundMiddlewareExtensions
    {
        public static IApplicationBuilder UseNotfaundMiddleware(this IApplicationBuilder build)
        {
            return build.UseMiddleware<NotFoundMiddleware>();
        }
    }
}
