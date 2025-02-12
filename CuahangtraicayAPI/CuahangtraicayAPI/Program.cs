
using CuahangtraicayAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using CuahangtraicayAPI.Model.Momo;
using System.Text;
using System.Text.Json.Serialization;
using CuahangtraicayAPI.Model.ConfigMomo;
using CuahangtraicayAPI.token;
using CuahangtraicayAPI.Model.ghn;
using CuahangtraicayAPI.Services.gn;

using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using CuahangtraicayAPI.Model.DB;




namespace CuahangtraicayAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigurationManager configuration = builder.Configuration;

            // Add services to the container.

            // For Entity Framework
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // For Identity
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
            

            // Thêm AppDbContext với SQL Server
            //builder.Services.AddDbContext<AppDbContext>(options =>
            //    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
            //);
            builder.Services.Configure<MomoOptionModel>(builder.Configuration.GetSection("MomoAPI"));
            // Đọc cấu hình từ appsettings.json
            builder.Services.Configure<MoMoConfig>(builder.Configuration.GetSection("MoMoConfig"));
            // Thêm MoMoPaymentService
            builder.Services.AddScoped<MoMoPaymentService>();
            //builder.Services.AddScoped<IMomoService, MomoService>();

            // Đăng ký dịch vụ IMemoryCache lưu bộ nhớ mã xác thực và username trong adminController
            builder.Services.AddMemoryCache();
            // Đọc cấu hình GHN từ `appsettings.json`
            builder.Services.Configure<GhnSettings>(builder.Configuration.GetSection("GHN"));
            builder.Services.AddScoped<ISyncGhnStatusService, SyncGhnStatusService>();
            builder.Services.AddHostedService<GhnSyncBackgroundService>();
            // Đăng ký HttpClient cho IGhnService
            builder.Services.AddHttpClient<IGhnService, GhnService>();
            // đăng ký VnPay service
            builder.Services.AddScoped<IVnPayService, VnPayService>();
            // đang ký email
            builder.Services.AddSingleton<EmailHelper>();

            // đăng ký backroud service 
            builder.Services.AddHostedService<SaleUpdateService>();

            builder.Services.AddHostedService<VoucherUpdateService>();

            // đăng ký phản hồi tự động

            builder.Services.AddHostedService<AutoPhanHoiService>();

            // đăng ký tự động gữi mail cho users đăng ký nhận thông báo sản phẩm sales

            builder.Services.AddHostedService<SanphamSaleCheckerService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("allApi", builder =>
                {
                    builder
                        .SetIsOriginAllowed(origin => true) // Cho phép tất cả domain
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials(); // Cho phép gửi cookies/token
                });
            });

            //Thêm dịch vụ cho các controller và cấu hình JSON để bỏ qua vòng lặp
            builder.Services.AddControllers()
              .AddJsonOptions(options =>
              {
                  // Bỏ qua các tham chiếu vòng
                  options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

                  // Loại bỏ các giá trị null
                  options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

                  // Các tùy chọn khác (nếu cần)
                  // options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
              });

            //builder.Services.AddControllers()
            //.AddJsonOptions(options =>
            //    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles

            //    );
            // Cấu hình Swagger với tài liệu XML
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1",
                    Description = "API mô tả các chức năng của ứng dụng"
                });

                // Bao gồm chú thích XML trong Swagger
                var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                // Cấu hình để Swagger có thể sử dụng JWT token ổ khóa 
                //c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                //{
                //    In = ParameterLocation.Header,
                //    Description = "Vui lòng nhập token JWT với định dạng Bearer {token}",
                //    Name = "Authorization",
                //    //Type = SecuritySchemeType.ApiKey, // phải thêm bearer và mã token 
                //    Type = SecuritySchemeType.Http, // không cần phải thêm bearer
                //    Scheme = "Bearer"
                //});
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter 'Bearer' [space] and then your token in the text input below.\n\nExample: 'Bearer abcdef12345'"
                });

                //            c.AddSecurityRequirement(new OpenApiSecurityRequirement
                //{
                //    {
                //                    // cấu hình jwt sau mổi controller 
                //        new OpenApiSecurityScheme
                //        {
                //            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                //        },
                //        Array.Empty<string>()
                //    }
                //});
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });

            });


            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnChallenge = context =>
                    {
                        context.HandleResponse(); // Tắt thông báo lỗi mặc định
                        context.Response.StatusCode = StatusCodes.Status403Forbidden; // Đảm bảo trả về mã 403
                        context.Response.ContentType = "application/json"; // Đảm bảo content type là application/json

                        // Trả về thông báo lỗi chi tiết
                        var result = System.Text.Json.JsonSerializer.Serialize(new { status = "error", message = "Bạn không có quyền thực hiện hành động này." });
                        return context.Response.WriteAsync(result);
                    }
                };
            });

            // Cấu hình xác thực JWT
            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //    {
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuer = true,
            //            ValidateAudience = true,
            //            ValidateLifetime = true,
            //            ValidateIssuerSigningKey = true,
            //            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            //            ValidAudience = builder.Configuration["Jwt:Audience"],
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),

            //        };

            //        // Tùy chỉnh thông báo lỗi khi không có quyền truy cập
            //        options.Events = new JwtBearerEvents
            //        {
            //            OnChallenge = context =>
            //            {
            //                context.HandleResponse(); // Tắt thông báo lỗi mặc định
            //                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //                context.Response.ContentType = "application/json";
            //                var result = System.Text.Json.JsonSerializer.Serialize(new { status = "error", message = "Bạn không có quyền với hành động này" });

            //                return context.Response.WriteAsync(result);
            //            }
            //        };
            //    });

            builder.Services.AddControllers();
            var app = builder.Build();

            // Kiểm tra môi trường và kích hoạt Swagger UI
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {

                    c.DefaultModelsExpandDepth(-1); // Đây là dòng cấu hình ẩn Schemas

                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
            }


            app.UseCors("allApi");
            app.UseHttpsRedirection();
            app.UseMiddleware<TokenRevocationMiddleware>();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.MapControllers();


            app.Run();

        }
    }
}
