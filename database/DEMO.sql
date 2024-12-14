/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[admins]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admins](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](255) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[Created_at] [datetime] NULL,
	[Updated_at] [datetime] NULL,
	[hoten] [nvarchar](255) NULL,
 CONSTRAINT [PK_admins] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bannerimages]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bannerimages](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[BannerId] [int] NOT NULL,
	[ImagePath] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_bannerimages] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[banners]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[banners](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Tieude] [nvarchar](max) NOT NULL,
	[Phude] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
	[trangthai] [nvarchar](255) NULL,
 CONSTRAINT [PK_banners] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chitiets]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chitiets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sanphams_id] [int] NOT NULL,
	[mo_ta_chung] [nvarchar](max) NULL,
	[bai_viet] [nvarchar](max) NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_chitiets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dactrungs]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dactrungs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Icon] [nvarchar](max) NOT NULL,
	[Tieude] [nvarchar](max) NOT NULL,
	[Phude] [nvarchar](max) NOT NULL,
	[Thutuhienthi] [int] NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Dactrungs] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[danhgiakhachhangs]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[danhgiakhachhangs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sanphams_id] [int] NOT NULL,
	[ho_ten] [nvarchar](255) NOT NULL,
	[tieude] [nvarchar](255) NOT NULL,
	[so_sao] [int] NOT NULL,
	[noi_dung] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_danhgiakhachhangs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[danhmucsanpham]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[danhmucsanpham](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_danhmucsanpham] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[diachichitiets]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[diachichitiets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Diachi] [nvarchar](255) NOT NULL,
	[Sdt] [nvarchar](11) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[Status] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_diachichitiets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FooterImg]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FooterImg](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Footer_ID] [int] NOT NULL,
	[ImagePath] [nvarchar](max) NOT NULL,
	[link] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_FooterImg] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Footers]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Footers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NoiDungFooter] [nvarchar](max) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
	[Created_at] [datetime] NULL,
	[Updated_at] [datetime] NULL,
	[TrangThai] [tinyint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gioithieu]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gioithieu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tieu_de] [nvarchar](255) NOT NULL,
	[phu_de] [nvarchar](max) NULL,
	[noi_dung] [nvarchar](max) NULL,
	[trang_thai] [tinyint] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gioithieu_img]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gioithieu_img](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_gioithieu] [int] NULL,
	[URL_image] [nvarchar](255) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hinhanh_sanpham]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hinhanh_sanpham](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sanphams_id] [int] NOT NULL,
	[hinhanh] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_hinhanh_sanpham] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hoadonchitiets]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoadonchitiets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[bill_id] [int] NOT NULL,
	[sanpham_ids] [nvarchar](max) NOT NULL,
	[price] [decimal](18, 2) NOT NULL,
	[quantity] [int] NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_hoadonchitiets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hoadons]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoadons](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[khachhang_id] [int] NOT NULL,
	[total_price] [decimal](18, 2) NOT NULL,
	[order_code] [nvarchar](max) NOT NULL,
	[status] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_hoadons] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[khachhangs]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[khachhangs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Ten] [nvarchar](max) NOT NULL,
	[Ho] [nvarchar](max) NOT NULL,
	[DiaChiCuThe] [nvarchar](max) NOT NULL,
	[ThanhPho] [nvarchar](max) NOT NULL,
	[Sdt] [nvarchar](max) NOT NULL,
	[EmailDiaChi] [nvarchar](max) NOT NULL,
	[GhiChu] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
	[tinhthanhquanhuyen] [nvarchar](255) NULL,
	[xaphuong] [nvarchar](255) NULL,
 CONSTRAINT [PK_khachhangs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lien_hes]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lien_hes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten] [nvarchar](max) NOT NULL,
	[email] [nvarchar](max) NOT NULL,
	[sdt] [nvarchar](max) NOT NULL,
	[ghichu] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_lien_hes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[menu]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[menu](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Thutuhien] [int] NOT NULL,
	[Url] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_menu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[menuFooter]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[menuFooter](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Tieu_de] [nvarchar](255) NOT NULL,
	[noi_dung] [nvarchar](max) NOT NULL,
	[thutuhienthi] [int] NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphams]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sanphams](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Tieude] [nvarchar](max) NULL,
	[Giatien] [decimal](18, 2) NOT NULL,
	[Hinhanh] [nvarchar](max) NULL,
	[Trangthai] [nvarchar](max) NULL,
	[don_vi_tinh] [nvarchar](max) NULL,
	[danhmucsanpham_id] [int] NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_sanphams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphamsale]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sanphamsale](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sanpham_id] [int] NOT NULL,
	[trangthai] [nvarchar](max) NOT NULL,
	[giasale] [decimal](18, 2) NOT NULL,
	[thoigianbatdau] [datetime2](7) NULL,
	[thoigianketthuc] [datetime2](7) NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_sanphamsale] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tencuahang]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tencuahang](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Trangthai] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_tencuahang] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TenFooter]    Script Date: 12/14/2024 12:50:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TenFooter](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[tieude] [nvarchar](max) NOT NULL,
	[phude] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TenFooter] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241123153209_DBContext_SQL', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241123153231_UpdateCascadeDelete', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241125083702_AddFooterRelationships', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241125084555_UpdateFooterImgStructure', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241125084751_UpdateFooterImgStructure', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241125085712_SyncWithModelChanges', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241125101041_AddDisplayOrderToBannerImages', N'9.0.0')
GO
SET IDENTITY_INSERT [dbo].[admins] ON 

INSERT [dbo].[admins] ([Id], [Username], [Password], [Created_at], [Updated_at], [hoten]) VALUES (9, N'quocvuduong', N'$2a$11$RF/RfrauVBNeUtuAzQmzcuaFVm9v04ilVTuJlONIe.Bey5J1yUujy', CAST(N'2024-12-13T18:55:33.747' AS DateTime), CAST(N'2024-12-13T18:55:33.747' AS DateTime), N'Dương Quốc Vũ')
INSERT [dbo].[admins] ([Id], [Username], [Password], [Created_at], [Updated_at], [hoten]) VALUES (11, N'', N'$2a$11$at.r8XMszWmF7czcyZOOreKxUxiExyybSbN7lGLnU.mQuTVDdwnUa', CAST(N'2024-12-13T19:01:20.677' AS DateTime), CAST(N'2024-12-13T19:01:20.677' AS DateTime), N'')
INSERT [dbo].[admins] ([Id], [Username], [Password], [Created_at], [Updated_at], [hoten]) VALUES (12, N'khaipk22', N'$2a$11$e6Wo2gzQIz8sebPezAoz6eZD17bbighhKUZUgIS65cEz3hGnNDfT6', CAST(N'2024-12-14T00:35:34.243' AS DateTime), CAST(N'2024-12-14T00:35:34.243' AS DateTime), N'Phạm Khắc Khải')
SET IDENTITY_INSERT [dbo].[admins] OFF
GO
SET IDENTITY_INSERT [dbo].[bannerimages] ON 

INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (62, 13, N'banners/604b7d36-0426-4e2e-80a8-263ea73b2509_ba.jpg', CAST(N'2024-12-06T11:16:45.0108450' AS DateTime2), CAST(N'2024-12-06T11:16:45.0108453' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (69, 13, N'banners/24d399cc-1bd3-4938-bc51-6598c6933376_2.jpg', CAST(N'2024-12-11T09:57:08.8960660' AS DateTime2), CAST(N'2024-12-11T09:57:08.8960678' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (70, 13, N'banners/5adfd56d-decd-46e7-920a-714c3ebc778f_3.jpg', CAST(N'2024-12-11T09:57:08.8970475' AS DateTime2), CAST(N'2024-12-11T09:57:08.8970486' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (71, 13, N'banners/a76f7f49-7c3a-4028-abf2-a1f2d8c175dc_4.jpg', CAST(N'2024-12-11T09:57:18.4347512' AS DateTime2), CAST(N'2024-12-11T09:57:18.4347526' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (72, 13, N'banners/36d38c4d-91a5-490d-83c4-d681c948fd76_5.jpg', CAST(N'2024-12-11T09:57:18.4353085' AS DateTime2), CAST(N'2024-12-11T09:57:18.4353089' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (73, 13, N'banners/8c41cf20-c996-4fd7-96b7-738212b431ae_7.jpg', CAST(N'2024-12-11T09:57:24.7732397' AS DateTime2), CAST(N'2024-12-11T09:57:24.7732411' AS DateTime2))
SET IDENTITY_INSERT [dbo].[bannerimages] OFF
GO
SET IDENTITY_INSERT [dbo].[banners] ON 

INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai]) VALUES (13, N'Trái Cây Tươi  ', N'Cam kết 100% Trái cây tươi sạch', CAST(N'2024-11-26T04:03:25.0878921' AS DateTime2), CAST(N'2024-12-11T04:23:06.6153686' AS DateTime2), N'đang sử dụng')
INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai]) VALUES (20, N'Cửa hàng tổng hợp ', N'Cam kết 100% Trái cây tươi sạch', CAST(N'2024-12-06T14:23:34.4680563' AS DateTime2), CAST(N'2024-12-11T03:30:34.2347341' AS DateTime2), N'không sử dụng')
INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai]) VALUES (23, N'123', N'123', CAST(N'2024-12-13T12:45:20.3119485' AS DateTime2), CAST(N'2024-12-13T12:45:20.3119497' AS DateTime2), N'không sử dụng')
SET IDENTITY_INSERT [dbo].[banners] OFF
GO
SET IDENTITY_INSERT [dbo].[chitiets] ON 

INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (21, 34, N'<p><i><strong>asd</strong></i></p>', N'<figure class="table"><table><tbody><tr><td><figure class="image"><img style="aspect-ratio:500/500;" src="https://localhost:7026/upload/638697716167811392_best-product-2.jpg" width="500" height="500"></figure></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p><strong>jhgghjsad</strong></p>', CAST(N'2024-12-14T11:11:54.3543351' AS DateTime2), CAST(N'2024-12-14T11:11:54.3543358' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (22, 35, N'<p><strong>asda</strong></p>', N'<p><i>asdasdas</i></p>', CAST(N'2024-12-14T11:23:02.7672816' AS DateTime2), CAST(N'2024-12-14T11:23:02.7672817' AS DateTime2))
SET IDENTITY_INSERT [dbo].[chitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[Dactrungs] ON 

INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at]) VALUES (1, N'icon/0d882748-4f8c-498b-aaf2-06571b6b6377.png', N'Miễn phí vận chuyển toàn quốc  ', N'Nhận ngay ưu đãi giao hàng miễn phí cho mọi đơn hàng từ 200.000 VNĐ', 1, CAST(N'2024-11-23T16:16:38.7765625' AS DateTime2), CAST(N'2024-12-11T04:21:10.9594280' AS DateTime2))
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at]) VALUES (2, N'icon/5870dc64-7867-4931-ae09-2501aaa0382b_0f8865dc-a9b9-4519-b52e-d666e186f11c.webp', N'Đổi trả dễ dàng trong 7 ngày', N'Yên tâm mua sắm với chính sách đổi trả miễn phí trong 7 ngày đầu tiên', 2, CAST(N'2024-11-23T16:17:16.8498362' AS DateTime2), CAST(N'2024-11-28T09:43:56.9738562' AS DateTime2))
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at]) VALUES (3, N'icon/08b03b9f-6871-45e8-af5d-3c014dbbec35_sa.png', N'Siêu khuyến mãi - Giảm giá lên đến 50%', N'Mua sắm ngay hôm nay để nhận ưu đãi lớn trên tất cả các sản phẩm yêu thích của bạn', 3, CAST(N'2024-11-23T16:19:02.5422336' AS DateTime2), CAST(N'2024-11-23T16:19:02.5422342' AS DateTime2))
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at]) VALUES (4, N'icon/58259cb7-5704-4b26-86cf-4f133844d8ff_ct.png', N'Sản phẩm chất lượng - An toàn cho sức khỏe', N'Cam kết mang đến cho bạn những sản phẩm đạt chuẩn chất lượng, nguồn gốc rõ ràng', 4, CAST(N'2024-11-23T16:19:46.0235620' AS DateTime2), CAST(N'2024-11-23T16:19:46.0235621' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Dactrungs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] ON 

INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (15, 34, N'asd', N'asd', 5, N'asd', CAST(N'2024-12-14T11:31:10.4098734' AS DateTime2), CAST(N'2024-12-14T11:31:10.4098753' AS DateTime2))
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhmucsanpham] ON 

INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at]) VALUES (1, N'Trái cây tươi ', CAST(N'2024-11-23T15:41:48.5484627' AS DateTime2), CAST(N'2024-11-23T15:41:48.5484629' AS DateTime2))
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at]) VALUES (2, N'Rau củ', CAST(N'2024-11-23T15:42:34.5048992' AS DateTime2), CAST(N'2024-11-23T15:42:34.5048993' AS DateTime2))
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at]) VALUES (16, N' Nấm các loại', CAST(N'2024-11-25T12:44:29.9103428' AS DateTime2), CAST(N'2024-11-25T12:44:29.9103429' AS DateTime2))
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at]) VALUES (20, N'Bia, Nước có cồn', CAST(N'2024-11-27T03:38:19.3026866' AS DateTime2), CAST(N'2024-11-27T03:38:19.3026867' AS DateTime2))
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at]) VALUES (21, N'Nước ngọt', CAST(N'2024-11-27T03:45:41.1368923' AS DateTime2), CAST(N'2024-11-27T03:45:41.1368924' AS DateTime2))
SET IDENTITY_INSERT [dbo].[danhmucsanpham] OFF
GO
SET IDENTITY_INSERT [dbo].[diachichitiets] ON 

INSERT [dbo].[diachichitiets] ([Id], [Diachi], [Sdt], [Email], [Status], [Created_at], [Updated_at]) VALUES (1, N'Xã Tân Thạnh Đông,Củ Chi,Thành phố Hồ Chí Minh ', N'0778719281', N'quocvu0411@gmail.com', N'đang sử dụng', CAST(N'2024-11-23T15:59:32.3498694' AS DateTime2), CAST(N'2024-11-23T15:59:32.3498696' AS DateTime2))
INSERT [dbo].[diachichitiets] ([Id], [Diachi], [Sdt], [Email], [Status], [Created_at], [Updated_at]) VALUES (2, N'Hóc môn ', N'0778719281', N'admin@gmail.com', N'không sử dụng', CAST(N'2024-11-23T16:10:02.4494882' AS DateTime2), CAST(N'2024-11-23T16:10:02.4494883' AS DateTime2))
SET IDENTITY_INSERT [dbo].[diachichitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[FooterImg] ON 

INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (37, 12, N'/footer/fc486676576546d380f98a6bb1885d51.jpg', N'https://www.facebook.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (38, 12, N'/footer/ac7b1518b30f4a22a47b971e596e9152.jpg', N'https://x.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (39, 12, N'/footer/517209c0a58847588a126c6583efffb1.jpg', N'https://www.instagram.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (40, 12, N'/footer/084422b0f2684bb3bc9cb862c2ce2490.jpg', N'https://www.youtube.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (41, 13, N'/footer/798a1261c51142b2812604b04def87be.jpg', N'string')
SET IDENTITY_INSERT [dbo].[FooterImg] OFF
GO
SET IDENTITY_INSERT [dbo].[Footers] ON 

INSERT [dbo].[Footers] ([Id], [NoiDungFooter], [UpdatedBy], [Created_at], [Updated_at], [TrangThai]) VALUES (11, N'<p>© 2024. Công ty cổ phần Trái Cây Tươi Việt Nam. &nbsp;<br>GPDKKD: 0123456789 do Sở KH &amp; ĐT TP.HCM cấp ngày 01/01/2024. &nbsp;<br>GPMXH: 456/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 10/02/2024. &nbsp;<br>&nbsp;</p>', N'Dương Quốc Vũ', CAST(N'2024-12-14T00:03:59.357' AS DateTime), CAST(N'2024-12-14T00:32:46.247' AS DateTime), 1)
INSERT [dbo].[Footers] ([Id], [NoiDungFooter], [UpdatedBy], [Created_at], [Updated_at], [TrangThai]) VALUES (14, N'<p><a href="http://localhost:3000/">Trái Cây Tươi</a> - Tất cả các quyền được bảo hộ. Thiết kế bởi <a href="https://htmlcodex.com/">HTML Codex</a>và phân phối bởi<a href="https://themewagon.com/">ThemeWagon</a>. V1.1.0</p>', N'Phạm Khắc Khải', CAST(N'2024-12-14T00:16:03.957' AS DateTime), CAST(N'2024-12-14T00:36:00.827' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[Footers] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu] ON 

INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at]) VALUES (6, N'Câu chuyện thương hiệu ', N'  Morning Fruit là đơn vị chuyên cung cấp trái cây tươi chất lượng cao, từ các nhà vườn trong nước và nhập khẩu.             Sứ mệnh của chúng tôi là...', N'<p><strong>Chúng tôi luôn cam kết chất lượng, nguồn gốc rõ ràng và quy trình chăm sóc kỹ lưỡng để mang đến những sản phẩm tươi ngon nhất.</strong></p><p>&nbsp;</p>', 1, CAST(N'2024-12-11T19:49:27.573' AS DateTime), CAST(N'2024-12-11T19:49:27.573' AS DateTime))
SET IDENTITY_INSERT [dbo].[gioithieu] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu_img] ON 

INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (52, 6, N'/gioithieu/avatar.jpg', CAST(N'2024-12-12T15:55:48.417' AS DateTime), CAST(N'2024-12-12T15:55:48.417' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (53, 6, N'/gioithieu/baner-1.png', CAST(N'2024-12-12T15:55:48.417' AS DateTime), CAST(N'2024-12-12T15:55:48.417' AS DateTime))
SET IDENTITY_INSERT [dbo].[gioithieu_img] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadonchitiets] ON 

INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (159, 99, N'17', CAST(200.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-05T07:49:27.5180564' AS DateTime2), CAST(N'2024-12-05T07:49:27.5180564' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (160, 99, N'23', CAST(15.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-05T07:49:27.5207556' AS DateTime2), CAST(N'2024-12-05T07:49:27.5207557' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (161, 100, N'3', CAST(600.00 AS Decimal(18, 2)), 2, CAST(N'2024-12-05T07:50:23.2375511' AS DateTime2), CAST(N'2024-12-05T07:50:23.2375513' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (162, 100, N'17', CAST(200.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-05T07:50:23.2401184' AS DateTime2), CAST(N'2024-12-05T07:50:23.2401185' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (179, 109, N'12', CAST(50.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-09T06:58:40.9915967' AS DateTime2), CAST(N'2024-12-09T06:58:40.9915968' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (180, 109, N'15', CAST(14.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-09T06:58:40.9975443' AS DateTime2), CAST(N'2024-12-09T06:58:40.9975443' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (181, 110, N'12', CAST(50.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-09T17:09:51.1436376' AS DateTime2), CAST(N'2024-12-09T17:09:51.1436376' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (182, 110, N'17', CAST(200.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-09T17:09:51.1586286' AS DateTime2), CAST(N'2024-12-09T17:09:51.1586287' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (183, 110, N'4', CAST(25.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-09T17:09:51.1624415' AS DateTime2), CAST(N'2024-12-09T17:09:51.1624415' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (195, 118, N'3', CAST(300.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-13T19:45:13.9684475' AS DateTime2), CAST(N'2024-12-13T19:45:13.9684491' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (196, 118, N'12', CAST(50.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-13T19:45:13.9955798' AS DateTime2), CAST(N'2024-12-13T19:45:13.9955805' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hoadonchitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadons] ON 

INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at]) VALUES (99, 101, CAST(215.00 AS Decimal(18, 2)), N'KH706H8D', N'Đã giao thành công', CAST(N'2024-11-05T07:49:27.5107497' AS DateTime2), CAST(N'2024-11-05T07:49:27.5107497' AS DateTime2))
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at]) VALUES (100, 102, CAST(800.00 AS Decimal(18, 2)), N'XUK3P9UU', N'Đã giao thành công', CAST(N'2024-12-05T07:50:23.2213683' AS DateTime2), CAST(N'2024-12-05T07:50:23.2213683' AS DateTime2))
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at]) VALUES (109, 111, CAST(64.00 AS Decimal(18, 2)), N'RBYJHTM0', N'Đã giao thành công', CAST(N'2024-12-09T06:58:40.9749668' AS DateTime2), CAST(N'2024-12-09T06:58:40.9749668' AS DateTime2))
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at]) VALUES (110, 112, CAST(275.00 AS Decimal(18, 2)), N'B31O09F7', N'Đã giao thành công', CAST(N'2024-12-09T17:09:51.0961944' AS DateTime2), CAST(N'2024-12-09T17:09:51.0961946' AS DateTime2))
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at]) VALUES (118, 120, CAST(350.00 AS Decimal(18, 2)), N'GSA4VHR1', N'Chờ xử lý', CAST(N'2024-12-13T19:45:13.8794925' AS DateTime2), CAST(N'2024-12-13T19:45:13.8794929' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hoadons] OFF
GO
SET IDENTITY_INSERT [dbo].[khachhangs] ON 

INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (101, N'admin', N'123', N'1/3b đường 107 ấp 10', N'Thành phố Hồ Chí Minh', N'12345678912', N'quocvu@gmail.com', N'', CAST(N'2024-12-05T07:49:27.4845803' AS DateTime2), CAST(N'2024-12-05T07:49:27.4845804' AS DateTime2), N'Huyện Hóc Môn', N'Xã Xuân Thới Đông')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (102, N'Quốc Vũ', N'Dương', N'1/3b đường 106 ấp 10', N'Thành phố Hồ Chí Minh', N'0778719281', N'quocvu0411@gmail.com', N'Giao hàng trước 3h chiều nhé', CAST(N'2024-12-05T07:50:23.1974158' AS DateTime2), CAST(N'2024-12-05T07:50:23.1974160' AS DateTime2), N'Huyện Củ Chi', N'Xã Tân Thạnh Đông')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (111, N'Quốc Vũ', N'Dương', N'Cửa hàng tổng hợp ', N'Tỉnh Phú Thọ', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2024-12-09T06:58:40.8707058' AS DateTime2), CAST(N'2024-12-09T06:58:40.8707066' AS DateTime2), N'Huyện Tam Nông', N'Xã Quang Húc')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (112, N'admin', N'dương', N'1/3 đường 106 ', N'Thành phố Hồ Chí Minh', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2024-12-09T17:09:50.8507748' AS DateTime2), CAST(N'2024-12-09T17:09:50.8507749' AS DateTime2), N'Huyện Củ Chi', N'Xã Tân Thạnh Đông')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (120, N'admin', N'123', N'213', N'Tỉnh Bắc Ninh', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2024-12-13T19:45:13.3959240' AS DateTime2), CAST(N'2024-12-13T19:45:13.3959252' AS DateTime2), N'Huyện Gia Bình', N'Xã Đông Cứu')
SET IDENTITY_INSERT [dbo].[khachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[lien_hes] ON 

INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (6, N'Dương', N'quocvu0411@gmail.com', N'0778719281', N'vui lòng cung cấp lại cho tôi mã đơn hàng được tạo ngày 9-12-2024 qua email này
', CAST(N'2024-12-09T07:05:45.6804051' AS DateTime2), CAST(N'2024-12-09T07:05:45.6804056' AS DateTime2))
INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (7, N'Dương quốc vũ', N'quocvu0411@gmail.com', N'0778719281', N'07', CAST(N'2024-12-12T14:11:55.0547770' AS DateTime2), CAST(N'2024-12-12T14:11:55.0547784' AS DateTime2))
SET IDENTITY_INSERT [dbo].[lien_hes] OFF
GO
SET IDENTITY_INSERT [dbo].[menu] ON 

INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at]) VALUES (1, N'Trang chủ', 1, N'/', CAST(N'2024-11-23T15:57:13.3022123' AS DateTime2), CAST(N'2024-11-23T15:57:13.3022125' AS DateTime2))
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at]) VALUES (2, N'Cửa hàng', 2, N'/cuahang', CAST(N'2024-11-23T15:57:23.0827309' AS DateTime2), CAST(N'2024-11-23T15:57:23.0827311' AS DateTime2))
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at]) VALUES (3, N'Giỏ hàng', 3, N'/giohang', CAST(N'2024-11-23T15:57:29.5024054' AS DateTime2), CAST(N'2024-11-23T15:57:29.5024055' AS DateTime2))
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at]) VALUES (4, N'Giới thiệu', 4, N'/gioithieu', CAST(N'2024-11-23T15:57:54.9389900' AS DateTime2), CAST(N'2024-11-23T15:57:54.9389901' AS DateTime2))
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at]) VALUES (5, N'Liên hệ', 5, N'/lienhe', CAST(N'2024-11-23T15:58:03.2519453' AS DateTime2), CAST(N'2024-11-23T15:58:03.2519453' AS DateTime2))
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at]) VALUES (6, N'Tra cứu đơn hàng', 6, N'/tracuu', CAST(N'2024-11-23T15:58:14.2768585' AS DateTime2), CAST(N'2024-11-23T15:58:14.2768586' AS DateTime2))
SET IDENTITY_INSERT [dbo].[menu] OFF
GO
SET IDENTITY_INSERT [dbo].[menuFooter] ON 

INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at]) VALUES (4, N'Thông tin cửa hàng', N'<p><br>- <strong>Liên hệ</strong><br>- <strong>Chính sách bảo mật</strong><br>- <strong>Điều khoản &amp; điều kiện</strong><br>- <strong>Chính sách hoàn trả</strong><br>- <strong>Câu hỏi thường gặp &amp; Hỗ trợ</strong><br>&nbsp;</p>', 2, CAST(N'2024-12-13T09:50:40.903' AS DateTime), CAST(N'2024-12-13T17:38:17.743' AS DateTime))
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at]) VALUES (9, N'Tài khoản', N'<p><br><strong>- Cửa hàng của chúng tôi</strong><br><strong>- Giới thiệu về cửa hàng</strong><br><strong>- Liên hệ với chúng tôi</strong><br><strong>- Tra cứu đơn hàng của bạn</strong><br><strong>- Giỏ hàng của bạn</strong></p>', 3, CAST(N'2024-12-13T13:05:39.500' AS DateTime), CAST(N'2024-12-13T18:29:22.333' AS DateTime))
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at]) VALUES (11, N'Tại sao bạn chọn chúng tôi?', N'<p>Chúng tôi cung cấp các loại trái cây và rau củ tươi sạch, chất lượng cao, được chọn lọc kỹ lưỡng.</p><p>&nbsp;Đảm bảo an toàn thực phẩm và nguồn gốc rõ ràng, đem đến bữa ăn bổ dưỡng cho gia đình bạn.</p>', 1, CAST(N'2024-12-13T13:35:46.247' AS DateTime), CAST(N'2024-12-13T19:11:00.817' AS DateTime))
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at]) VALUES (13, N'Liên Hệ', N'<p><strong>- Địa chỉ: Ấp 10 xã Tân Thạnh Đông Huyện Củ Chi TP.HCM</strong></p><p><strong>- Email: Quocvu0411@gmail.com</strong></p><p>- <strong>Điện thoại: 0778719281</strong></p><p>-<strong> Phương thức thanh toán</strong></p><figure class="image"><img style="aspect-ratio:236/30;" src="https://localhost:7026/menuFooter/638697117503036786_payment.png" width="236" height="30"></figure>', 4, CAST(N'2024-12-13T18:35:56.933' AS DateTime), CAST(N'2024-12-13T18:37:27.940' AS DateTime))
SET IDENTITY_INSERT [dbo].[menuFooter] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphams] ON 

INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at]) VALUES (34, N'123', CAST(123.00 AS Decimal(18, 2)), N'image\2fa3d907-1dd2-4bf5-8507-add33b668a4e.jpg', N'Còn hàng', N'kg', 16, CAST(N'2024-12-14T11:11:54.3532852' AS DateTime2), CAST(N'2024-12-14T11:11:54.3532858' AS DateTime2))
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at]) VALUES (35, N'asd', CAST(123.00 AS Decimal(18, 2)), N'image\47124beb-4d2d-4bfc-94f5-6ebf32aaed6b.jpg', N'Còn hàng', N'kg', 16, CAST(N'2024-12-14T11:22:30.0797344' AS DateTime2), CAST(N'2024-12-14T11:22:30.0797349' AS DateTime2))
SET IDENTITY_INSERT [dbo].[sanphams] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphamsale] ON 

INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (73, 35, N'Đang áp dụng', CAST(1.00 AS Decimal(18, 2)), CAST(N'2024-12-14T11:22:00.0000000' AS DateTime2), CAST(N'2024-12-15T11:22:00.0000000' AS DateTime2), CAST(N'2024-12-14T11:23:02.7679437' AS DateTime2), CAST(N'2024-12-14T11:23:02.7679451' AS DateTime2))
SET IDENTITY_INSERT [dbo].[sanphamsale] OFF
GO
SET IDENTITY_INSERT [dbo].[tencuahang] ON 

INSERT [dbo].[tencuahang] ([Id], [Name], [Trangthai], [Created_at], [Updated_at]) VALUES (1, N'Trái cây tươi ', N'đang sử dụng', CAST(N'2024-11-23T15:58:24.2072655' AS DateTime2), CAST(N'2024-11-23T15:58:24.2072658' AS DateTime2))
INSERT [dbo].[tencuahang] ([Id], [Name], [Trangthai], [Created_at], [Updated_at]) VALUES (8, N'Cửa hàng Tổng hợp', N'không sử dụng', CAST(N'2024-11-28T09:40:15.1478076' AS DateTime2), CAST(N'2024-11-28T09:40:15.1478081' AS DateTime2))
SET IDENTITY_INSERT [dbo].[tencuahang] OFF
GO
SET IDENTITY_INSERT [dbo].[TenFooter] ON 

INSERT [dbo].[TenFooter] ([Id], [tieude], [phude], [Created_at], [Updated_at]) VALUES (12, N'Cửa hàng tổng hợp  ', N'Cam kết 100% Trái cây tươi sạch', CAST(N'2024-11-27T03:12:56.8014950' AS DateTime2), CAST(N'2024-11-27T03:12:56.8014953' AS DateTime2))
INSERT [dbo].[TenFooter] ([Id], [tieude], [phude], [Created_at], [Updated_at]) VALUES (13, N'string', N'string', CAST(N'2024-12-14T11:52:55.4115282' AS DateTime2), CAST(N'2024-12-14T11:52:55.4115308' AS DateTime2))
SET IDENTITY_INSERT [dbo].[TenFooter] OFF
GO
ALTER TABLE [dbo].[Footers] ADD  DEFAULT (getdate()) FOR [Created_at]
GO
ALTER TABLE [dbo].[Footers] ADD  DEFAULT (getdate()) FOR [Updated_at]
GO
ALTER TABLE [dbo].[Footers] ADD  DEFAULT ((1)) FOR [TrangThai]
GO
ALTER TABLE [dbo].[gioithieu] ADD  DEFAULT ((1)) FOR [trang_thai]
GO
ALTER TABLE [dbo].[gioithieu] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[gioithieu] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[gioithieu_img] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[gioithieu_img] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[menuFooter] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[menuFooter] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[bannerimages]  WITH CHECK ADD  CONSTRAINT [FK_bannerimages_banners_BannerId] FOREIGN KEY([BannerId])
REFERENCES [dbo].[banners] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[bannerimages] CHECK CONSTRAINT [FK_bannerimages_banners_BannerId]
GO
ALTER TABLE [dbo].[chitiets]  WITH CHECK ADD  CONSTRAINT [FK_chitiets_sanphams_sanphams_id] FOREIGN KEY([sanphams_id])
REFERENCES [dbo].[sanphams] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[chitiets] CHECK CONSTRAINT [FK_chitiets_sanphams_sanphams_id]
GO
ALTER TABLE [dbo].[danhgiakhachhangs]  WITH CHECK ADD  CONSTRAINT [FK_danhgiakhachhangs_sanphams_sanphams_id] FOREIGN KEY([sanphams_id])
REFERENCES [dbo].[sanphams] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[danhgiakhachhangs] CHECK CONSTRAINT [FK_danhgiakhachhangs_sanphams_sanphams_id]
GO
ALTER TABLE [dbo].[FooterImg]  WITH CHECK ADD  CONSTRAINT [FK_FooterImg_TenFooter_Footer_ID] FOREIGN KEY([Footer_ID])
REFERENCES [dbo].[TenFooter] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FooterImg] CHECK CONSTRAINT [FK_FooterImg_TenFooter_Footer_ID]
GO
ALTER TABLE [dbo].[gioithieu_img]  WITH CHECK ADD FOREIGN KEY([id_gioithieu])
REFERENCES [dbo].[gioithieu] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[hinhanh_sanpham]  WITH CHECK ADD  CONSTRAINT [FK_hinhanh_sanpham_sanphams_sanphams_id] FOREIGN KEY([sanphams_id])
REFERENCES [dbo].[sanphams] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[hinhanh_sanpham] CHECK CONSTRAINT [FK_hinhanh_sanpham_sanphams_sanphams_id]
GO
ALTER TABLE [dbo].[hoadonchitiets]  WITH CHECK ADD  CONSTRAINT [FK_hoadonchitiets_hoadons_bill_id] FOREIGN KEY([bill_id])
REFERENCES [dbo].[hoadons] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[hoadonchitiets] CHECK CONSTRAINT [FK_hoadonchitiets_hoadons_bill_id]
GO
ALTER TABLE [dbo].[hoadons]  WITH CHECK ADD  CONSTRAINT [FK_hoadons_khachhangs_khachhang_id] FOREIGN KEY([khachhang_id])
REFERENCES [dbo].[khachhangs] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[hoadons] CHECK CONSTRAINT [FK_hoadons_khachhangs_khachhang_id]
GO
ALTER TABLE [dbo].[sanphams]  WITH CHECK ADD  CONSTRAINT [FK_sanphams_danhmucsanpham_danhmucsanpham_id] FOREIGN KEY([danhmucsanpham_id])
REFERENCES [dbo].[danhmucsanpham] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[sanphams] CHECK CONSTRAINT [FK_sanphams_danhmucsanpham_danhmucsanpham_id]
GO
ALTER TABLE [dbo].[sanphamsale]  WITH CHECK ADD  CONSTRAINT [FK_sanphamsale_sanphams_sanpham_id] FOREIGN KEY([sanpham_id])
REFERENCES [dbo].[sanphams] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[sanphamsale] CHECK CONSTRAINT [FK_sanphamsale_sanphams_sanpham_id]
GO
