/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[admins]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[bannerimages]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[banners]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_banners] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chitiets]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[Dactrungs]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_Dactrungs] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[danhgiakhachhangs]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[danhmucsanpham]    Script Date: 12/16/2024 11:48:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[danhmucsanpham](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_danhmucsanpham] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[diachichitiets]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_diachichitiets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FooterImg]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[Footers]    Script Date: 12/16/2024 11:48:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Footers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NoiDungFooter] [nvarchar](max) NULL,
	[Created_at] [datetime] NULL,
	[Updated_at] [datetime] NULL,
	[TrangThai] [tinyint] NOT NULL,
	[updatedBy] [nvarchar](255) NULL,
	[CreatedBy] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gioithieu]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gioithieu_img]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[hinhanh_sanpham]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[hoadonchitiets]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[hoadons]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[khachhangs]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[lien_hes]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[menu]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_menu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[menuFooter]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphams]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_sanphams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphamsale]    Script Date: 12/16/2024 11:48:32 PM ******/
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
/****** Object:  Table [dbo].[tencuahang]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_tencuahang] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TenFooter]    Script Date: 12/16/2024 11:48:32 PM ******/
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
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_TenFooter] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TenwebSite]    Script Date: 12/16/2024 11:48:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TenwebSite](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tieu_de] [nvarchar](255) NOT NULL,
	[favicon] [nvarchar](255) NOT NULL,
	[TrangThai] [tinyint] NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
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

INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (85, 24, N'banners/a44e9161-26d5-44e5-83a5-492d583027f6.jpg', CAST(N'2024-12-16T22:41:36.1740753' AS DateTime2), CAST(N'2024-12-16T22:41:36.1740765' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (86, 24, N'banners/63eb7ec6-6d16-4373-9a48-7b66aefe8021.jpg', CAST(N'2024-12-16T22:41:36.1749797' AS DateTime2), CAST(N'2024-12-16T22:41:36.1749803' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (87, 24, N'banners/0a5d1703-27c3-4b78-8fe3-f6ab4559677e.jpg', CAST(N'2024-12-16T22:41:36.1756744' AS DateTime2), CAST(N'2024-12-16T22:41:36.1756749' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (88, 24, N'banners/fb521e34-76f4-4501-a69b-9d834920dfd4.jpg', CAST(N'2024-12-16T22:41:36.1763301' AS DateTime2), CAST(N'2024-12-16T22:41:36.1763309' AS DateTime2))
SET IDENTITY_INSERT [dbo].[bannerimages] OFF
GO
SET IDENTITY_INSERT [dbo].[banners] ON 

INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai], [CreatedBy], [UpdatedBy]) VALUES (24, N'Trái Cây Tươi', N'Cam kết 100% Trái cây tươi sạch	', CAST(N'2024-12-16T17:42:04.7913122' AS DateTime2), CAST(N'2024-12-16T15:41:36.1763321' AS DateTime2), N'đang sử dụng', N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[banners] OFF
GO
SET IDENTITY_INSERT [dbo].[chitiets] ON 

INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (21, 34, N'<p><strong>Tên sản phẩm:</strong> Cam Sành Hữu Cơ<br><strong>Mô tả chi tiết:</strong><br>Cam sành hữu cơ là loại cam được trồng tự nhiên, không sử dụng hóa chất, mang lại vị ngọt thanh mát và đầy dinh dưỡng. Cam sành được chọn lọc từ những vườn trái cây đạt chuẩn, đảm bảo an toàn và tốt cho sức khỏe người tiêu dùng.</p><ul><li><strong>Nguồn gốc:</strong> Đồng bằng sông Cửu Long, Việt Nam</li><li><strong>Khối lượng:</strong> 1kg (~5-7 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Vỏ xanh vàng, mỏng, dễ bóc.</li><li>Thịt quả mọng nước, vị ngọt thanh, ít hạt.</li><li>Giàu vitamin C, chất xơ, và khoáng chất.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Gọt vỏ và thưởng thức.</li><li>Ép nước: Tạo ra ly nước cam tươi mát.</li><li>Làm salad: Kết hợp với rau củ để tạo món ăn dinh dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nơi thoáng mát: Ở nhiệt độ phòng từ 2-3 ngày.</li><li>Ngăn mát tủ lạnh: Từ 7-10 ngày.</li></ul></li></ul><p>Hãy thưởng thức cam sành để bổ sung năng lượng và tăng cường sức khỏe mỗi ngày!</p>', N'<p>&nbsp;</p><p>&nbsp;</p><p><strong>Tiêu đề:</strong> Lợi ích tuyệt vời từ quả cam – Trái cây vàng cho sức khỏe</p><p>Cam không chỉ là một loại trái cây quen thuộc mà còn là "người bạn" đồng hành của sức khỏe nhờ vào nguồn dinh dưỡng dồi dào.</p><p><strong>1. Tăng cường hệ miễn dịch</strong><br>Cam chứa hàm lượng lớn <strong>vitamin C</strong>, giúp cơ thể chống lại các tác nhân gây bệnh, đặc biệt là trong mùa cảm cúm. Chỉ cần một quả cam mỗi ngày, bạn đã cung cấp đủ vitamin C cần thiết cho cơ thể.</p><p><strong>2. Hỗ trợ tiêu hóa</strong><br>Chất xơ trong cam giúp cải thiện hoạt động tiêu hóa, giảm nguy cơ táo bón và hỗ trợ hệ vi khuẩn đường ruột khỏe mạnh.</p><p><strong>3. Tốt cho tim mạch</strong><br>Cam chứa các hợp chất chống oxy hóa như flavonoid, giúp giảm cholesterol xấu và cải thiện lưu thông máu, từ đó giảm nguy cơ mắc các bệnh về tim mạch.</p><p><strong>4. Làm đẹp da</strong><br>Vitamin C và chất chống oxy hóa trong cam giúp da sáng mịn, giảm thâm nám và ngăn ngừa lão hóa. Cam cũng kích thích sản xuất collagen – thành phần quan trọng giữ cho da đàn hồi.</p><p><strong>5. Hỗ trợ giảm cân</strong><br>Với hàm lượng calo thấp nhưng lại chứa nhiều nước và chất xơ, cam là sự lựa chọn hoàn hảo cho những ai muốn giảm cân.</p><p><strong>Hướng dẫn sử dụng cam:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Nhanh gọn, tiện lợi.</li><li><strong>Ép nước:</strong> Ly nước cam mát lạnh giúp cung cấp năng lượng ngay lập tức.</li><li><strong>Kết hợp món ăn:</strong> Làm sốt cam cho các món nướng hoặc salad.</li></ul><figure class="image"><img style="aspect-ratio:500/500;" src="https://localhost:7186/upload/638699020918045720_best-product-1.jpg" width="500" height="500"></figure><p>Cam không chỉ là trái cây thông thường mà còn là "liều thuốc tự nhiên" giúp bạn khỏe mạnh và đầy năng lượng mỗi ngày. Hãy bổ sung cam vào thực đơn của gia đình ngay hôm nay nhé!</p>', CAST(N'2024-12-14T11:11:54.3543351' AS DateTime2), CAST(N'2024-12-14T11:11:54.3543358' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (22, 35, N'<p><strong>Mô tả chi tiết:</strong><br>Dâu tây Đà Lạt nổi tiếng với hương vị ngọt dịu, thơm mát và độ tươi ngon đặc trưng. Đây là loại trái cây không chỉ làm mê hoặc vị giác mà còn cung cấp nhiều lợi ích cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Đà Lạt, Việt Nam</li><li><strong>Khối lượng:</strong> 500g (~20-25 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả đỏ mọng, vỏ bóng, căng mịn.</li><li>Thịt quả ngọt dịu, hơi chua, thơm tự nhiên.</li><li>Giàu vitamin C, chất chống oxy hóa, và axit folic.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Rửa sạch và ăn tươi.</li><li>Làm sinh tố: Kết hợp với sữa chua hoặc sữa tươi để tạo nên ly sinh tố thơm ngon.</li><li>Trang trí món ăn: Dùng làm topping cho bánh ngọt, kem, hoặc các món tráng miệng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Ngăn mát tủ lạnh: Bảo quản trong hộp kín, giữ được độ tươi từ 3-5 ngày.</li><li>Không rửa trước khi bảo quản để tránh quả bị úng nước.</li></ul></li></ul><p>Hãy thưởng thức dâu tây Đà Lạt để cảm nhận hương vị tự nhiên, tinh khiết của cao nguyên!</p>', N'<p><strong>Tiêu đề:</strong> Dâu tây Đà Lạt – Viên ngọc quý của cao nguyên</p><p>Dâu tây Đà Lạt không chỉ đẹp mắt mà còn chứa đựng vô vàn lợi ích cho sức khỏe và sắc đẹp. Đây là loại trái cây yêu thích của mọi gia đình, từ trẻ nhỏ đến người lớn tuổi.</p><p><strong>1. Tăng cường sức khỏe tim mạch</strong><br>Dâu tây rất giàu chất chống oxy hóa và polyphenol, hỗ trợ bảo vệ tim mạch và giảm nguy cơ mắc các bệnh liên quan đến huyết áp và cholesterol.</p><p><strong>2. Tăng cường miễn dịch</strong><br>Hàm lượng <strong>vitamin C</strong> trong dâu tây rất cao, giúp tăng cường hệ miễn dịch, chống lại cảm cúm và các bệnh nhiễm khuẩn.</p><p><strong>3. Hỗ trợ giảm cân</strong><br>Dâu tây ít calo, giàu chất xơ và chứa nhiều nước, là lựa chọn tuyệt vời cho những ai muốn kiểm soát cân nặng.</p><p><strong>4. Làm đẹp da</strong><br>Dâu tây chứa alpha hydroxy acid (AHA), giúp tẩy tế bào chết tự nhiên, làm sáng da và giảm thâm sạm. Ngoài ra, vitamin C trong dâu còn giúp kích thích sản xuất collagen, giữ da săn chắc và mịn màng.</p><p><strong>5. Tốt cho não bộ</strong><br>Các hợp chất chống oxy hóa trong dâu tây, như anthocyanin, giúp cải thiện trí nhớ và giảm nguy cơ suy giảm chức năng nhận thức khi về già.</p><p><strong>Hướng dẫn sử dụng dâu tây:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Rửa sạch, để nguyên quả hoặc cắt lát, và thưởng thức.</li><li><strong>Làm nước ép/sinh tố:</strong> Kết hợp với các loại trái cây khác như chuối, cam, hoặc xoài để tạo hương vị đa dạng.</li><li><strong>Làm món tráng miệng:</strong> Trang trí bánh ngọt, kem, hoặc sữa chua bằng dâu tây.</li></ul><figure class="image"><img style="aspect-ratio:282/179;" src="https://localhost:7186/upload/638699023183450793_daaaaa.jpg" width="282" height="179"></figure><p>Hãy thử dâu tây Đà Lạt để cảm nhận vị ngon tự nhiên của cao nguyên mát lành, đồng thời bổ sung thêm nguồn dinh dưỡng quý giá cho cả gia đình!</p>', CAST(N'2024-12-14T11:23:02.7672816' AS DateTime2), CAST(N'2024-12-14T11:23:02.7672817' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (23, 36, N'<p><strong>Tên sản phẩm:</strong> Dưa Hấu Ruột Đỏ Ngọt Lịm<br><strong>Mô tả chi tiết:</strong><br>Dưa hấu là loại trái cây được yêu thích bởi hương vị ngọt mát, chứa nhiều nước, giúp giải nhiệt và cung cấp năng lượng tức thời. Đây là lựa chọn hoàn hảo cho những ngày hè oi ả hay bất kỳ bữa ăn nhẹ nào.</p><ul><li><strong>Nguồn gốc:</strong> Đồng Tháp, Việt Nam</li><li><strong>Khối lượng:</strong> 2-3kg/quả</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Vỏ xanh sọc đẹp mắt, thịt quả đỏ rực, mọng nước.</li><li>Vị ngọt thanh, mát, và rất ít hạt.</li><li>Giàu nước, vitamin A, vitamin C và chất chống oxy hóa lycopene.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Cắt miếng và thưởng thức.</li><li>Làm nước ép: Xay dưa hấu để tạo ra ly nước ép mát lạnh, thơm ngon.</li><li>Làm món tráng miệng: Kết hợp với sữa đặc hoặc sữa chua để tăng thêm vị béo ngậy.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nhiệt độ phòng: Dưa hấu chưa cắt có thể bảo quản từ 5-7 ngày.</li><li>Ngăn mát tủ lạnh: Sau khi cắt, bảo quản trong hộp kín để giữ tươi từ 1-2 ngày.</li></ul></li></ul><p>Dưa hấu không chỉ là món ăn ngon mà còn giúp bạn bổ sung nước và làm mát cơ thể một cách tự nhiên!</p>', N'<p><strong>Tiêu đề:</strong> Lợi ích tuyệt vời của dưa hấu – Món quà từ thiên nhiên</p><p>Dưa hấu không chỉ là loại trái cây giải khát yêu thích mà còn mang lại nhiều lợi ích đáng kinh ngạc cho sức khỏe. Hãy cùng khám phá lý do tại sao dưa hấu nên có mặt trong thực đơn hằng ngày của bạn!</p><p><strong>1. Giải nhiệt và cung cấp nước</strong><br>Với hàm lượng nước chiếm đến 92%, dưa hấu là lựa chọn tuyệt vời để bù nước cho cơ thể trong những ngày nóng bức. Một vài miếng dưa hấu sẽ giúp bạn cảm thấy mát mẻ và tràn đầy năng lượng ngay tức thì.</p><p><strong>2. Tăng cường hệ miễn dịch</strong><br>Dưa hấu giàu vitamin C, giúp tăng cường hệ miễn dịch và bảo vệ cơ thể khỏi các tác nhân gây bệnh.</p><p><strong>3. Tốt cho tim mạch</strong><br>Hợp chất lycopene trong dưa hấu không chỉ giúp giảm nguy cơ mắc các bệnh tim mạch mà còn hỗ trợ giảm huyết áp và cải thiện tuần hoàn máu.</p><p><strong>4. Cải thiện làn da</strong><br>Vitamin A và C trong dưa hấu giúp làm sáng da, cải thiện độ đàn hồi và hỗ trợ tái tạo tế bào da.</p><p><strong>5. Hỗ trợ giảm cân</strong><br>Dưa hấu ít calo nhưng giàu nước và chất xơ, giúp bạn no lâu mà không sợ tăng cân. Đây là loại trái cây lý tưởng cho những người đang theo chế độ ăn kiêng.</p><p><strong>Hướng dẫn sử dụng dưa hấu:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ, cắt miếng và thưởng thức hương vị ngọt mát.</li><li><strong>Làm sinh tố:</strong> Xay dưa hấu với một chút mật ong hoặc sữa để tạo món sinh tố bổ dưỡng.</li><li><strong>Làm kem dưa hấu:</strong> Đông lạnh nước ép dưa hấu và tận hưởng món kem mát lạnh vào những ngày hè.</li><li><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699024020262363_dddddd.png" width="1024" height="768"></figure></li></ul><p>&nbsp;</p><p>Dưa hấu không chỉ ngon miệng mà còn là nguồn dinh dưỡng quý giá, giúp bạn giải nhiệt và cải thiện sức khỏe một cách tự nhiên. Đừng quên thêm dưa hấu vào thực đơn hằng ngày để tận hưởng những lợi ích tuyệt vời mà loại trái cây này mang lại!</p>', CAST(N'2024-12-15T23:33:28.8913802' AS DateTime2), CAST(N'2024-12-15T23:33:28.8913809' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (24, 37, N'<p><strong>Tên sản phẩm:</strong> Nho Xanh Tươi Không Hạt<br><strong>Mô tả chi tiết:</strong><br>Nho xanh tươi không hạt là lựa chọn lý tưởng cho những người yêu thích trái cây ngọt dịu và tiện lợi. Được nhập khẩu từ những vùng trồng nho nổi tiếng, sản phẩm đảm bảo chất lượng tươi ngon, giòn ngọt và giàu dinh dưỡng.</p><ul><li><strong>Nguồn gốc:</strong> Nhập khẩu từ Úc / Mỹ / Nam Phi</li><li><strong>Khối lượng:</strong> 500g - 1kg/túi</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả nho căng tròn, xanh tươi và không hạt.</li><li>Vị ngọt mát, giòn tự nhiên.</li><li>Giàu vitamin C, vitamin K, chất xơ và chất chống oxy hóa như resveratrol.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Ăn trực tiếp:</strong> Rửa sạch và thưởng thức ngay.</li><li><strong>Làm nước ép:</strong> Ép nho lấy nước để giải khát và bồi bổ cơ thể.</li><li><strong>Trang trí món ăn:</strong> Kết hợp với bánh, kem hoặc làm salad trái cây tươi mát.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nơi khô ráo, thoáng mát hoặc trong ngăn mát tủ lạnh từ 5-7 ngày.</li><li>Không để nho tiếp xúc trực tiếp với ánh nắng mặt trời.</li></ul></li></ul><p>Nho xanh không hạt không chỉ là món ăn vặt thơm ngon mà còn mang lại nhiều lợi ích sức khỏe cho bạn và gia đình.</p>', N'<p><strong>Tiêu đề:</strong> Nho xanh không hạt – Vị ngọt thiên nhiên, sức khỏe trọn vẹn</p><p>Nho xanh không hạt là một trong những loại trái cây được yêu thích nhất không chỉ vì hương vị ngọt mát, dễ ăn mà còn bởi những lợi ích tuyệt vời cho sức khỏe.</p><p><strong>1. Cung cấp năng lượng và vitamin</strong><br>Nho xanh chứa nhiều vitamin C và K, giúp tăng cường hệ miễn dịch, cải thiện sức khỏe xương khớp và giảm mệt mỏi tức thì.</p><p><strong>2. Chống lão hóa và đẹp da</strong><br>Nhờ vào hàm lượng chất chống oxy hóa <strong>resveratrol</strong>, nho xanh giúp làm chậm quá trình lão hóa, tái tạo làn da và làm sáng da từ bên trong.</p><p><strong>3. Hỗ trợ giảm cân hiệu quả</strong><br>Nho xanh ít calo, giàu nước và chất xơ giúp bạn no lâu, hạn chế cơn thèm ăn và hỗ trợ quá trình giảm cân.</p><p><strong>4. Tốt cho hệ tiêu hóa</strong><br>Chất xơ trong nho xanh giúp cải thiện chức năng tiêu hóa và giảm tình trạng táo bón.</p><p><strong>5. Bảo vệ tim mạch</strong><br>Các hợp chất flavonoid và resveratrol có trong nho xanh giúp giảm cholesterol xấu, bảo vệ tim mạch và giảm nguy cơ xơ vữa động mạch.</p><p><strong>Hướng dẫn sử dụng:</strong></p><ul><li><strong>Ăn tươi:</strong> Rửa sạch và thưởng thức ngay, phù hợp cho cả gia đình.</li><li><strong>Nước ép:</strong> Ép nho xanh cùng một chút chanh và mật ong để tăng thêm hương vị.</li><li><strong>Làm món tráng miệng:</strong> Trang trí bánh kem, panna cotta hoặc làm topping cho sữa chua.</li><li><figure class="image"><img style="aspect-ratio:232/217;" src="https://localhost:7186/upload/638699025734583237_n6.jpg" width="232" height="217"></figure><p>&nbsp;</p></li></ul><p>&nbsp;</p><p>Hãy thêm nho xanh không hạt vào thực đơn mỗi ngày để bổ sung năng lượng, tăng cường sức khỏe và tận hưởng vị ngọt thanh mát từ thiên nhiên!</p>', CAST(N'2024-12-15T23:36:24.9423203' AS DateTime2), CAST(N'2024-12-15T23:36:24.9423209' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (25, 38, N'<p><strong>Tên sản phẩm:</strong> Rau Cải Ngọt Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau cải ngọt là loại rau xanh phổ biến trong bữa ăn hằng ngày của nhiều gia đình Việt. Không chỉ thơm ngon, dễ chế biến mà còn chứa nhiều vitamin và khoáng chất thiết yếu cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Trồng tại các vườn rau sạch Đà Lạt</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá cải xanh mướt, thân giòn, vị ngọt tự nhiên.</li><li>Giàu <strong>vitamin A, C, K</strong> và các khoáng chất như canxi, sắt, kali.</li><li>Không sử dụng hóa chất, đảm bảo an toàn và tươi sạch.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Xào tỏi:</strong> Món cải ngọt xào tỏi thơm ngon, nhanh chóng.</li><li><strong>Luộc/hấp:</strong> Giữ được vị ngọt tự nhiên và các chất dinh dưỡng.</li><li><strong>Nấu canh:</strong> Kết hợp với tôm, thịt bằm hoặc nấu cùng nấm để tạo nên món canh thanh mát, bổ dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 3-5 ngày.</li><li>Rửa sạch trước khi sử dụng, tránh rửa trước khi bảo quản để rau không bị úng nước.</li></ul></li></ul><p>Rau cải ngọt không chỉ giúp bữa ăn thêm phần hấp dẫn mà còn cung cấp dinh dưỡng cần thiết, giúp cơ thể khỏe mạnh và tràn đầy năng lượng.</p>', N'<p><strong>Tiêu đề:</strong> Rau cải ngọt – Lợi ích vàng cho sức khỏe mỗi ngày</p><p>Rau cải ngọt là một trong những loại rau xanh được yêu thích nhất bởi hương vị thơm ngon, dễ chế biến và mang lại vô vàn lợi ích sức khỏe.</p><p><strong>1. Bổ sung dinh dưỡng thiết yếu</strong><br>Cải ngọt chứa hàm lượng lớn <strong>vitamin A, C, K</strong>, cùng với canxi và sắt, giúp tăng cường sức đề kháng, sáng mắt và cải thiện xương khớp.</p><p><strong>2. Hỗ trợ tiêu hóa</strong><br>Nhờ giàu chất xơ, cải ngọt giúp cải thiện hoạt động của hệ tiêu hóa, ngăn ngừa táo bón và làm sạch ruột một cách tự nhiên.</p><p><strong>3. Tốt cho xương khớp</strong><br>Hàm lượng canxi trong cải ngọt giúp xương chắc khỏe, đồng thời hỗ trợ phòng ngừa bệnh loãng xương hiệu quả.</p><p><strong>4. Giảm cholesterol xấu</strong><br>Cải ngọt chứa các hợp chất thực vật có khả năng giảm <strong>cholesterol xấu (LDL)</strong> trong máu, tốt cho sức khỏe tim mạch.</p><p><strong>5. Làm đẹp da</strong><br>Vitamin C trong cải ngọt giúp sản sinh collagen, giữ cho làn da mịn màng, săn chắc và giảm lão hóa.</p><p><strong>Hướng dẫn chế biến rau cải ngọt:</strong></p><ul><li><strong>Xào tỏi:</strong> Nhanh gọn, giữ nguyên độ giòn của rau và hương vị thơm ngon.</li><li><strong>Luộc hoặc hấp:</strong> Phù hợp cho người ăn kiêng, giữ lại tối đa dinh dưỡng.</li><li><strong>Nấu canh:</strong> Nấu với thịt bằm, tôm hoặc nấm, giúp món ăn thanh mát và bổ dưỡng.</li></ul><figure class="image"><img style="aspect-ratio:236/214;" src="https://localhost:7186/upload/638699026887596072_r6.jpg" width="236" height="214"></figure><p>Rau cải ngọt không chỉ là món ăn đơn giản, dễ chế biến mà còn là nguồn dinh dưỡng tuyệt vời cho cả gia đình. Hãy thêm cải ngọt vào bữa ăn mỗi ngày để tăng cường sức khỏe và tận hưởng hương vị tươi ngon từ thiên nhiên!</p>', CAST(N'2024-12-15T23:38:11.2033621' AS DateTime2), CAST(N'2024-12-15T23:38:11.2033631' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (26, 39, N'<p><strong>Tên sản phẩm:</strong> Lê Hàn Quốc Ngọt Mát Thơm Ngon<br><strong>Mô tả chi tiết:</strong><br>Lê Hàn Quốc là loại trái cây nổi tiếng với vị ngọt thanh mát, thịt quả giòn và mọng nước. Đây là lựa chọn hoàn hảo cho những ai yêu thích trái cây tươi ngon và tốt cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Nhập khẩu từ Hàn Quốc</li><li><strong>Khối lượng:</strong> 1kg (~3-4 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả lê to, vỏ vàng nhạt, mịn, bắt mắt.</li><li>Thịt quả trắng, giòn, ngọt dịu và rất mọng nước.</li><li>Giàu vitamin C, chất xơ và khoáng chất như kali và magie.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ, cắt lát và thưởng thức vị ngọt mát tự nhiên.</li><li><strong>Làm nước ép:</strong> Ép lê tươi để tạo ra ly nước ép giải khát, thanh nhiệt cơ thể.</li><li><strong>Kết hợp với món ăn:</strong> Thêm vào salad trái cây hoặc chế biến món tráng miệng độc đáo.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản ở ngăn mát tủ lạnh để giữ độ tươi và vị ngọt trong 5-7 ngày.</li><li>Tránh để ở nơi có ánh nắng trực tiếp để lê không bị héo.</li></ul></li></ul><p>Lê Hàn Quốc không chỉ ngon miệng mà còn là nguồn dinh dưỡng quý giá giúp bổ sung năng lượng, giải nhiệt và tăng cường sức khỏe.</p>', N'<p><strong>Tiêu đề:</strong> Lê Hàn Quốc – Trái cây vàng mang đến vị ngọt tự nhiên</p><p>Lê Hàn Quốc là loại trái cây nhập khẩu cao cấp, nổi bật với hương vị thơm ngọt, giòn tan và giàu giá trị dinh dưỡng. Không chỉ là món ăn giải khát tuyệt vời, lê còn mang lại nhiều lợi ích cho sức khỏe.</p><p><strong>1. Giải nhiệt và bổ sung nước</strong><br>Lê chứa hàm lượng nước cao, giúp cơ thể giải khát và thanh lọc tự nhiên trong những ngày nắng nóng.</p><p><strong>2. Cung cấp chất xơ, hỗ trợ tiêu hóa</strong><br>Hàm lượng chất xơ trong lê giúp cải thiện hệ tiêu hóa, ngăn ngừa táo bón và hỗ trợ quá trình hấp thu dinh dưỡng hiệu quả.</p><p><strong>3. Tăng cường hệ miễn dịch</strong><br>Nhờ giàu <strong>vitamin C</strong>, lê giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi các bệnh cảm cúm thông thường và cải thiện sức khỏe tổng thể.</p><p><strong>4. Hỗ trợ giảm cân</strong><br>Lê Hàn Quốc ít calo, không chứa chất béo và giúp bạn no lâu hơn nhờ hàm lượng nước và chất xơ dồi dào. Đây là lựa chọn lý tưởng cho những ai muốn duy trì vóc dáng cân đối.</p><p><strong>5. Làm đẹp da</strong><br>Vitamin C và các chất chống oxy hóa trong lê giúp ngăn ngừa lão hóa, giữ cho làn da tươi sáng, mịn màng và khỏe khoắn từ bên trong.</p><p><strong>Hướng dẫn sử dụng lê:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ và thưởng thức hương vị giòn ngọt.</li><li><strong>Làm nước ép lê:</strong> Kết hợp lê với táo hoặc cam để tạo thức uống bổ dưỡng.</li><li><strong>Làm món tráng miệng:</strong> Lê hầm với mật ong hoặc thêm vào các món salad trái cây.</li><li><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699027801697117_l5.jpg" width="1024" height="768"></figure></li></ul><p>&nbsp;</p><p>Lê Hàn Quốc không chỉ là trái cây thơm ngon mà còn mang đến nhiều lợi ích tuyệt vời cho sức khỏe. Hãy thưởng thức ngay để cảm nhận hương vị thanh tao, ngọt mát từ thiên nhiên!</p>', CAST(N'2024-12-15T23:39:42.3507621' AS DateTime2), CAST(N'2024-12-15T23:39:42.3507634' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (27, 40, N'<p><strong>Tên sản phẩm:</strong> Rau Mồng Tơi Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau mồng tơi là loại rau xanh quen thuộc trong ẩm thực Việt Nam với hương vị thanh mát, dễ ăn và giàu giá trị dinh dưỡng. Đặc biệt, đây là loại rau rất tốt cho sức khỏe nhờ hàm lượng chất xơ và khoáng chất dồi dào.</p><ul><li><strong>Nguồn gốc:</strong> Canh tác tự nhiên tại các trang trại rau sạch địa phương.</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá xanh đậm, non mướt, thân giòn và mọng nước.</li><li>Giàu <strong>vitamin A, C, B3</strong>, sắt, canxi và chất xơ.</li><li>Không sử dụng thuốc trừ sâu, đảm bảo an toàn sức khỏe người dùng.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Nấu canh:</strong> Kết hợp với tôm, cua hoặc thịt bằm tạo nên món canh mát lành, bổ dưỡng.</li><li><strong>Xào tỏi:</strong> Món mồng tơi xào tỏi nhanh chóng và thơm ngon.</li><li><strong>Làm món luộc:</strong> Luộc chín và chấm với nước mắm hoặc kho quẹt để giữ nguyên hương vị thanh mát.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 2-3 ngày.</li><li>Tránh rửa trước khi bảo quản để rau không bị úng nước.</li></ul></li></ul><p>Rau mồng tơi không chỉ là món ăn dân dã mà còn là nguồn dinh dưỡng giúp giải nhiệt, thanh lọc cơ thể và duy trì sức khỏe cho cả gia đình.</p>', N'<p><strong>Tiêu đề:</strong> Rau mồng tơi – Món ăn mát lành, dinh dưỡng cho mọi gia đình</p><p>Rau mồng tơi là loại rau quen thuộc trong ẩm thực Việt Nam, không chỉ ngon miệng mà còn mang lại nhiều lợi ích sức khỏe tuyệt vời.</p><p><strong>1. Thanh nhiệt, giải độc cơ thể</strong><br>Rau mồng tơi có tính mát, giúp thanh nhiệt và giải độc cơ thể, đặc biệt phù hợp trong những ngày hè oi bức.</p><p><strong>2. Cải thiện hệ tiêu hóa</strong><br>Hàm lượng chất xơ cao trong rau mồng tơi hỗ trợ hệ tiêu hóa khỏe mạnh, giảm táo bón và làm sạch đường ruột tự nhiên.</p><p><strong>3. Giàu vitamin và khoáng chất</strong><br>Rau mồng tơi chứa nhiều vitamin A, C, B3, sắt và canxi giúp tăng cường sức đề kháng, cải thiện thị lực và chắc khỏe xương khớp.</p><p><strong>4. Làm đẹp da và tóc</strong><br>Chất nhầy tự nhiên trong rau mồng tơi giúp cung cấp độ ẩm cho da, giảm tình trạng khô ráp và làm mượt tóc.</p><p><strong>5. Tốt cho tim mạch</strong><br>Các khoáng chất như kali và sắt trong rau mồng tơi giúp ổn định huyết áp, bảo vệ tim mạch và ngăn ngừa thiếu máu.</p><p><strong>Hướng dẫn sử dụng rau mồng tơi:</strong></p><ul><li><strong>Nấu canh:</strong> Canh mồng tơi nấu tôm hoặc cua giúp giải nhiệt và bổ sung dinh dưỡng.</li><li><strong>Xào tỏi:</strong> Nhanh gọn, giữ nguyên độ giòn và vị ngon của rau.</li><li><strong>Luộc chấm kho quẹt:</strong> Giữ được hương vị thanh mát tự nhiên, thích hợp trong các bữa cơm gia đình.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699028563493578_mmmmmm.jpg" width="1024" height="768"></figure><p>Hãy thêm rau mồng tơi vào thực đơn hằng ngày để tận hưởng hương vị tươi ngon và cải thiện sức khỏe của cả gia đình bạn!</p>', CAST(N'2024-12-15T23:40:58.1735695' AS DateTime2), CAST(N'2024-12-15T23:40:58.1735704' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (28, 41, N'<p><strong>Tên sản phẩm:</strong> Rau Dền Đỏ và Xanh Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau dền là loại rau dân dã quen thuộc, có hương vị ngọt thanh và chứa nhiều dinh dưỡng. Rau dền được chia làm hai loại chính: dền đỏ và dền xanh. Không chỉ ngon miệng, rau dền còn có nhiều lợi ích cho sức khỏe và dễ chế biến trong bữa ăn gia đình.</p><ul><li><strong>Nguồn gốc:</strong> Trồng tại các vườn rau sạch đạt chuẩn VietGAP.</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá rau dền mềm, xanh hoặc đỏ bắt mắt.</li><li>Vị ngọt thanh, dễ ăn và phù hợp với mọi lứa tuổi.</li><li>Giàu <strong>vitamin A, C, K</strong>, canxi, sắt và các chất chống oxy hóa.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Nấu canh:</strong> Canh rau dền nấu với tôm, thịt bằm hoặc cua đồng giúp thanh nhiệt cơ thể.</li><li><strong>Luộc chấm mắm:</strong> Giữ nguyên vị ngọt tự nhiên, ăn kèm nước mắm hoặc kho quẹt.</li><li><strong>Xào tỏi:</strong> Món rau dền xào tỏi thơm ngon, nhanh gọn và bổ dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 2-3 ngày.</li><li>Nên rửa sạch trước khi chế biến, tránh rửa trước khi bảo quản.</li></ul></li></ul><p>Rau dền không chỉ giúp bữa ăn thêm phong phú mà còn bổ sung dinh dưỡng, giúp cơ thể khỏe mạnh và giải nhiệt hiệu quả.</p>', N'<p><strong>Tiêu đề:</strong> Rau dền – Loại rau bổ dưỡng cho bữa ăn thanh mát</p><p>Rau dền là một trong những loại rau xanh quen thuộc với người Việt, đặc biệt trong những ngày hè nóng bức. Với hương vị ngọt thanh và nhiều lợi ích sức khỏe, rau dền xứng đáng có mặt trong bữa cơm gia đình bạn.</p><p><strong>1. Thanh nhiệt, giải độc cơ thể</strong><br>Rau dền có tính mát, giúp thanh nhiệt, giải độc gan và làm mát cơ thể. Món canh rau dền là lựa chọn tuyệt vời trong những ngày hè oi bức.</p><p><strong>2. Bổ sung sắt, ngăn ngừa thiếu máu</strong><br>Rau dền đỏ chứa hàm lượng sắt cao, rất tốt cho những người bị thiếu máu và cần bổ sung dinh dưỡng.</p><p><strong>3. Hỗ trợ xương chắc khỏe</strong><br>Với hàm lượng <strong>canxi</strong> và <strong>vitamin K</strong> dồi dào, rau dền giúp tăng cường sức khỏe xương khớp và ngăn ngừa loãng xương.</p><p><strong>4. Cải thiện tiêu hóa</strong><br>Rau dền chứa nhiều chất xơ, giúp hỗ trợ hệ tiêu hóa, giảm tình trạng táo bón và làm sạch đường ruột.</p><p><strong>5. Tốt cho người ăn kiêng</strong><br>Rau dền ít calo, giàu chất xơ và nước, là món ăn lý tưởng cho những ai muốn giảm cân hoặc duy trì vóc dáng.</p><p><strong>Hướng dẫn chế biến rau dền:</strong></p><ul><li><strong>Nấu canh:</strong> Kết hợp với tôm, thịt hoặc cua đồng để tạo món canh ngọt mát và bổ dưỡng.</li><li><strong>Luộc:</strong> Luộc chín và ăn kèm với nước mắm hoặc kho quẹt.</li><li><strong>Xào tỏi:</strong> Xào nhanh với tỏi để giữ được độ giòn và vị ngọt tự nhiên.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699029204362182_rdddddd.jpg" width="1024" height="768"></figure><p>Hãy thêm rau dền vào thực đơn hàng ngày để tận hưởng hương vị ngọt mát, thanh đạm và bổ sung đầy đủ dinh dưỡng cho cơ thể!</p>', CAST(N'2024-12-15T23:42:02.1129093' AS DateTime2), CAST(N'2024-12-15T23:42:02.1129099' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (29, 42, N'<p><strong>Tên sản phẩm:</strong> Nấm Kim Châm Trắng Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Nấm kim châm là một trong những loại nấm phổ biến, được yêu thích nhờ hương vị ngọt thanh, dai giòn tự nhiên và dễ chế biến trong nhiều món ăn. Đây là nguồn thực phẩm bổ dưỡng, mang lại nhiều lợi ích cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Trồng tại các nông trại nấm sạch theo tiêu chuẩn an toàn thực phẩm.</li><li><strong>Khối lượng:</strong> 200g - 500g/gói</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Nấm có thân dài, màu trắng ngà, tươi và giòn.</li><li>Hương vị ngọt tự nhiên, không đắng, dễ ăn.</li><li>Giàu <strong>protein, vitamin B, sắt, kali</strong> và chất chống oxy hóa.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Nấu lẩu:</strong> Nấm kim châm là nguyên liệu không thể thiếu trong các món lẩu.</li><li><strong>Xào tỏi/bơ:</strong> Xào nấm với tỏi hoặc bơ để tạo hương vị béo ngậy, thơm ngon.</li><li><strong>Canh nấm:</strong> Nấu với đậu phụ, thịt bằm hoặc rau củ để tạo món canh bổ dưỡng.</li><li><strong>Cuộn thịt ba chỉ:</strong> Cuộn nấm kim châm với thịt ba chỉ và nướng, món ăn thơm ngon, hấp dẫn.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản ở ngăn mát tủ lạnh từ 3-5 ngày.</li><li>Nên sử dụng trong thời gian ngắn để giữ được độ tươi ngon và hương vị tự nhiên.</li></ul></li></ul><p>Nấm kim châm không chỉ thơm ngon mà còn là nguồn dinh dưỡng quý giá cho sức khỏe, giúp bữa ăn của bạn thêm phần phong phú và bổ dưỡng.</p>', N'<p><strong>Tiêu đề:</strong> Nấm kim châm – Thực phẩm dinh dưỡng cho mọi bữa ăn</p><p>Nấm kim châm là loại thực phẩm quen thuộc trong gian bếp của mỗi gia đình. Với hương vị ngọt thanh tự nhiên, độ giòn dai hấp dẫn và giá trị dinh dưỡng cao, nấm kim châm ngày càng được ưa chuộng trong các bữa ăn hằng ngày.</p><p><strong>1. Bổ sung dinh dưỡng thiết yếu</strong><br>Nấm kim châm giàu <strong>protein</strong>, các loại vitamin nhóm B, sắt và kali, giúp bổ sung năng lượng và tăng cường sức khỏe tổng thể.</p><p><strong>2. Hỗ trợ hệ tiêu hóa</strong><br>Hàm lượng chất xơ trong nấm kim châm giúp cải thiện hệ tiêu hóa, hỗ trợ quá trình trao đổi chất và ngăn ngừa táo bón.</p><p><strong>3. Tăng cường hệ miễn dịch</strong><br>Các chất chống oxy hóa có trong nấm giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi các tác nhân gây hại từ bên ngoài.</p><p><strong>4. Hỗ trợ giảm cân hiệu quả</strong><br>Nấm kim châm chứa rất ít calo và chất béo, là lựa chọn lý tưởng cho những người muốn giảm cân hoặc ăn kiêng.</p><p><strong>5. Tốt cho tim mạch</strong><br>Nấm kim châm giúp giảm lượng cholesterol xấu trong máu, cải thiện lưu thông máu và bảo vệ sức khỏe tim mạch.</p><p><strong>Hướng dẫn chế biến nấm kim châm:</strong></p><ul><li><strong>Nấu lẩu:</strong> Nấm kim châm là món ăn không thể thiếu trong các món lẩu.</li><li><strong>Xào tỏi/bơ:</strong> Xào với tỏi và một chút bơ để tăng hương vị béo ngậy.</li><li><strong>Cuộn thịt nướng:</strong> Nấm cuộn thịt ba chỉ, nướng chín tạo nên món ăn hấp dẫn.</li><li><strong>Nấu canh:</strong> Nấu cùng đậu hũ non, cà chua và thịt bằm để có món canh thanh mát, bổ dưỡng.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699030594324872_nsssss.jpg" width="1024" height="768"></figure><p>Nấm kim châm không chỉ là món ăn ngon mà còn mang lại nhiều lợi ích cho sức khỏe. Hãy bổ sung nấm kim châm vào thực đơn mỗi ngày để tăng cường dinh dưỡng và tạo nên những món ăn ngon miệng cho cả gia đình!</p>', CAST(N'2024-12-15T23:44:21.7316085' AS DateTime2), CAST(N'2024-12-15T23:44:21.7316095' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (30, 43, N'<p><strong>Tên sản phẩm:</strong> Nấm Hương Tươi Sạch Loại Cao Cấp<br><strong>Mô tả chi tiết:</strong><br>Nấm hương tươi, còn gọi là nấm hương Nhật, là loại thực phẩm giàu dinh dưỡng, được ưa chuộng nhờ hương thơm đặc trưng và vị ngọt tự nhiên. Đây là nguyên liệu hoàn hảo cho các món ăn bổ dưỡng và hấp dẫn.</p><ul><li><strong>Nguồn gốc:</strong> Sản xuất tại các trang trại nấm sạch đạt tiêu chuẩn an toàn thực phẩm.</li><li><strong>Khối lượng:</strong> 200g - 500g/gói</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Nấm có thân màu trắng, đầu nấm tròn nâu và chắc.</li><li>Hương thơm tự nhiên, vị ngọt thanh, dễ kết hợp với nhiều món ăn.</li><li>Giàu <strong>protein, vitamin D, B, sắt và chất chống oxy hóa</strong>.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Xào nấm:</strong> Kết hợp với bơ, tỏi hoặc rau củ tạo món xào thơm ngon.</li><li><strong>Nấu lẩu:</strong> Là nguyên liệu không thể thiếu trong các món lẩu thanh đạm và bổ dưỡng.</li><li><strong>Nấu canh:</strong> Kết hợp nấm hương với thịt gà, sườn non hoặc đậu phụ để làm món canh ngọt mát.</li><li><strong>Kho chay:</strong> Kho nấm hương với nước tương, hành tỏi để làm món ăn chay đậm vị.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản ở ngăn mát tủ lạnh từ 3-5 ngày.</li><li>Không rửa nấm trước khi bảo quản để giữ được độ tươi lâu hơn.</li></ul></li></ul><p>Nấm hương tươi không chỉ giúp món ăn thêm hương vị độc đáo mà còn cung cấp dưỡng chất tuyệt vời cho cơ thể.</p>', N'<p><strong>Tiêu đề:</strong> Nấm hương tươi – Bí quyết dinh dưỡng trong gian bếp của bạn</p><p>Nấm hương tươi là một trong những loại nấm được ưa chuộng nhất nhờ hương thơm tự nhiên và vị ngọt thanh đặc trưng. Không chỉ ngon miệng, nấm hương còn mang đến nhiều lợi ích cho sức khỏe, phù hợp với mọi đối tượng, từ trẻ nhỏ đến người lớn tuổi.</p><p><strong>1. Tăng cường hệ miễn dịch</strong><br>Nấm hương chứa <strong>beta-glucan</strong> và các chất chống oxy hóa giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi bệnh tật.</p><p><strong>2. Giàu dinh dưỡng và ít calo</strong><br>Nấm hương cung cấp <strong>protein thực vật</strong>, vitamin D và các khoáng chất như sắt, kali, giúp bổ sung dinh dưỡng mà không lo tăng cân.</p><p><strong>3. Hỗ trợ sức khỏe tim mạch</strong><br>Hàm lượng <strong>eritadenine</strong> trong nấm hương giúp giảm cholesterol xấu, ổn định huyết áp và bảo vệ sức khỏe tim mạch.</p><p><strong>4. Chống oxy hóa, ngăn ngừa lão hóa</strong><br>Các chất chống oxy hóa trong nấm hương giúp làm chậm quá trình lão hóa, ngăn ngừa tổn thương tế bào và cải thiện làn da.</p><p><strong>5. Tốt cho hệ tiêu hóa</strong><br>Chất xơ trong nấm hương hỗ trợ tiêu hóa, giảm táo bón và cải thiện hoạt động đường ruột.</p><p><strong>Hướng dẫn sử dụng nấm hương tươi:</strong></p><ul><li><strong>Xào nấm:</strong> Kết hợp với rau củ, thịt hoặc tỏi bơ để tạo món xào thơm ngon.</li><li><strong>Nấu lẩu:</strong> Thêm nấm hương vào lẩu để tăng hương vị và dinh dưỡng.</li><li><strong>Canh nấm:</strong> Nấu với gà, đậu hũ hoặc thịt bằm để có món canh thanh mát và bổ dưỡng.</li><li><strong>Kho nấm chay:</strong> Kho với nước tương và hành phi tạo món ăn chay đậm đà, bổ dưỡng.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699031480221215_lcccc.jpg" width="1024" height="768"></figure><p>Nấm hương tươi không chỉ thơm ngon mà còn là nguồn dinh dưỡng tuyệt vời. Hãy thêm nấm hương vào thực đơn hằng ngày để mang đến bữa ăn ngon miệng và giàu dưỡng chất cho cả gia đình!</p>', CAST(N'2024-12-15T23:45:51.0487187' AS DateTime2), CAST(N'2024-12-15T23:45:51.0487193' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (31, 44, N'<p><strong>Tên sản phẩm:</strong> Bia Heineken Silver – Nhẹ Êm Mà Đậm Chất<br><strong>Mô tả chi tiết:</strong><br>Heineken Silver là dòng bia cao cấp của Heineken với hương vị thanh mát, nhẹ nhàng nhưng vẫn giữ được độ đậm đà đặc trưng. Được ủ từ 100% lúa mạch tự nhiên với công nghệ làm lạnh sâu độc đáo, Heineken Silver mang đến trải nghiệm sảng khoái và tinh tế trong từng giọt bia.</p><ul><li><strong>Xuất xứ:</strong> Thương hiệu Heineken – Hà Lan</li><li><strong>Dung tích:</strong> Lon 330ml / 500ml</li><li><strong>Nồng độ cồn:</strong> 4%</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Hương vị nhẹ êm, thanh mát, không gắt, phù hợp với nhiều đối tượng.</li><li>Được ủ từ 100% lúa mạch tự nhiên.</li><li>Công nghệ <strong>làm lạnh sâu ở -1°C</strong> giúp bia giữ được hương vị tươi mát và sảng khoái hơn.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Uống lạnh sẽ giúp bia giữ trọn hương vị thanh mát.</li><li>Thích hợp trong các buổi tiệc, liên hoan hoặc các dịp sum họp bạn bè.</li><li>Kết hợp cùng các món ăn nhẹ như hải sản, đồ nướng hoặc các món chiên giòn.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản ở nơi khô ráo, thoáng mát.</li><li>Ngon hơn khi uống lạnh từ 2-4°C.</li></ul></li></ul>', N'<p><strong>Tiêu đề:</strong> Heineken Silver – Lựa chọn hoàn hảo cho mọi cuộc vui</p><p>Heineken Silver là dòng bia cao cấp được ưa chuộng nhờ hương vị độc đáo, nhẹ nhàng và sảng khoái. Với nồng độ cồn 4%, Heineken Silver mang đến trải nghiệm êm dịu nhưng vẫn giữ được hương vị đậm chất đặc trưng của thương hiệu Heineken.</p><p><strong>1. Hương vị thanh mát từ công nghệ làm lạnh sâu</strong><br>Heineken Silver được ủ lạnh sâu ở nhiệt độ -1°C, giúp loại bỏ đi vị gắt của bia thông thường, mang lại trải nghiệm thanh mát và sảng khoái trong từng giọt bia.</p><p><strong>2. Phù hợp với nhiều đối tượng</strong><br>Với độ cồn nhẹ 4%, Heineken Silver là lựa chọn lý tưởng cho mọi cuộc vui, từ bữa tiệc bạn bè đến những buổi gặp gỡ nhẹ nhàng.</p><p><strong>3. Được làm từ nguyên liệu tự nhiên</strong><br>Heineken Silver được ủ từ <strong>100% lúa mạch tự nhiên</strong> cùng nguồn nước tinh khiết, đảm bảo hương vị bia tươi ngon và chất lượng đẳng cấp quốc tế.</p><p><strong>4. Thích hợp với nhiều món ăn</strong><br>Heineken Silver kết hợp hoàn hảo với các món hải sản tươi ngon, đồ nướng hoặc các món ăn nhẹ, giúp bữa tiệc của bạn thêm phần trọn vẹn.</p><p><strong>5. Thương hiệu bia toàn cầu</strong><br>Là sản phẩm đến từ thương hiệu <strong>Heineken</strong> nổi tiếng thế giới, Heineken Silver mang đến cho người thưởng thức đẳng cấp và phong cách khác biệt.</p><p><strong>Lưu ý:</strong></p><ul><li><strong>Uống có trách nhiệm.</strong></li><li><strong>Không dành cho người dưới 18 tuổi.</strong></li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699032425581830_bbbbbbb.jpg" width="1024" height="768"></figure><p>Heineken Silver không chỉ mang lại hương vị nhẹ êm mà còn là biểu tượng của những khoảnh khắc sảng khoái và kết nối bạn bè. Thưởng thức Heineken Silver để tận hưởng trọn vẹn niềm vui trong từng cuộc gặp gỡ!</p>', CAST(N'2024-12-15T23:47:24.6946345' AS DateTime2), CAST(N'2024-12-15T23:47:24.6946352' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (32, 45, N'<p><strong>Tên sản phẩm:</strong> Pepsi Không Đường Vị Chanh – Sảng Khoái Tột Đỉnh<br><strong>Mô tả chi tiết:</strong><br>Pepsi Không Calo Vị Chanh là sự kết hợp hoàn hảo giữa vị cola truyền thống và hương chanh tươi mát, mang đến trải nghiệm giải khát tuyệt đỉnh. Với công thức không đường và không calo, Pepsi vị chanh phù hợp cho những ai yêu thích thức uống sảng khoái nhưng vẫn muốn giữ dáng và đảm bảo sức khỏe.</p><ul><li><strong>Xuất xứ:</strong> Thương hiệu Pepsi – Quốc tế</li><li><strong>Dung tích:</strong> Lon 330ml / 500ml</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Hương vị cola trứ danh kết hợp với vị chanh thanh mát, độc đáo.</li><li><strong>Không đường, không calo</strong>, phù hợp cho người ăn kiêng hoặc giảm cân.</li><li>Giải khát tức thì, mang lại cảm giác sảng khoái và tràn đầy năng lượng.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Uống lạnh để tận hưởng trọn vẹn vị chanh sảng khoái và giải khát tối đa.</li><li>Thích hợp trong các bữa tiệc, sự kiện hoặc các buổi gặp gỡ bạn bè.</li><li>Kết hợp cùng các món ăn nhanh, đồ chiên hoặc đồ nướng để tạo trải nghiệm ẩm thực thú vị.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản nơi khô ráo, thoáng mát.</li><li>Ngon hơn khi uống lạnh ở nhiệt độ từ 2-4°C.</li></ul></li></ul><h3>&nbsp;</h3>', N'<p><strong>Tiêu đề:</strong> Pepsi Không Calo Vị Chanh – Bùng hết chất mình, giữ vững phong cách</p><p>Pepsi Không Đường Vị Chanh là dòng sản phẩm mới mang đến trải nghiệm độc đáo dành cho những người trẻ năng động, yêu thích sự sảng khoái mà không lo về calo.</p><p><strong>1. Sự kết hợp hoàn hảo giữa cola và chanh</strong><br>Pepsi giữ nguyên hương vị cola trứ danh, kết hợp thêm vị chanh thanh mát, giúp người dùng tận hưởng cảm giác bùng nổ và sảng khoái tức thì.</p><p><strong>2. Không đường, không calo</strong><br>Với công thức không đường và không calo, Pepsi vị chanh là lựa chọn tuyệt vời cho những ai yêu thích đồ uống có gas nhưng vẫn muốn duy trì vóc dáng cân đối.</p><p><strong>3. Phù hợp với mọi cuộc vui</strong><br>Dù là bữa tiệc sôi động, buổi gặp mặt bạn bè hay các hoạt động ngoài trời, Pepsi Không Calo Vị Chanh sẽ giúp bạn "bùng hết chất mình" và luôn tràn đầy năng lượng.</p><p><strong>4. Lý tưởng cho chế độ ăn kiêng</strong><br>Dành cho những người quan tâm đến sức khỏe nhưng vẫn muốn thưởng thức đồ uống có gas mát lạnh mà không cần lo lắng về lượng calo.</p><p><strong>5. Thưởng thức Pepsi đúng chuẩn</strong></p><ul><li>Uống lạnh để cảm nhận rõ vị chanh tươi mát và hương cola trứ danh.</li><li>Kết hợp với các món ăn nhẹ như khoai tây chiên, hamburger hoặc gà rán để tăng thêm hương vị.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638699033465236337_ppppppp.jpg" width="1024" height="768"></figure><p>Pepsi Không Calo Vị Chanh không chỉ mang lại sự sảng khoái mà còn giúp bạn luôn giữ phong cách sống lành mạnh, năng động. Hãy thưởng thức Pepsi vị chanh ngay hôm nay để “bung hết chất mình” trong mọi khoảnh khắc!</p>', CAST(N'2024-12-15T23:49:08.4553216' AS DateTime2), CAST(N'2024-12-15T23:49:08.4553225' AS DateTime2))
SET IDENTITY_INSERT [dbo].[chitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[Dactrungs] ON 

INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (5, N'icon/30ec6dec-2f21-4695-98dd-42743bd2e186.webp', N'Miễn phí vận chuyển toàn quốc', N'Nhận ngay ưu đãi giao hàng miễn phí cho mọi đơn hàng từ 200.000 VNĐ	', 1, CAST(N'2024-12-16T17:30:09.7101009' AS DateTime2), CAST(N'2024-12-16T15:43:27.1171752' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (6, N'icon/940c7e23-7c61-4e81-a110-f411f858d198.webp', N'Đổi trả dễ dàng trong 7 ngày', N'Yên tâm mua sắm với chính sách đổi trả miễn phí trong 7 ngày đầu tiên', 2, CAST(N'2024-12-16T17:30:35.3753168' AS DateTime2), CAST(N'2024-12-16T15:43:37.7223191' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (7, N'icon/4d70c3ea-51eb-41b5-bcc7-fe479c290bad.jpg', N'Siêu khuyến mãi - Giảm giá lên đến 50%', N'Mua sắm ngay hôm nay để nhận ưu đãi lớn trên tất cả các sản phẩm yêu thích của bạn', 3, CAST(N'2024-12-16T17:32:48.3770465' AS DateTime2), CAST(N'2024-12-16T15:43:51.5842394' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'icon/7844ef8c-d2c8-4200-9868-e2313c7bf7c7.webp', N'Sản phẩm chất lượng - An toàn cho sức khỏe', N'Cam kết mang đến cho bạn những sản phẩm đạt chuẩn chất lượng, nguồn gốc rõ ràng', 4, CAST(N'2024-12-16T17:34:21.7506897' AS DateTime2), CAST(N'2024-12-16T15:44:18.8652143' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[Dactrungs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] ON 

INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (15, 34, N'asd', N'asd', 5, N'asd', CAST(N'2024-12-14T11:31:10.4098734' AS DateTime2), CAST(N'2024-12-14T11:31:10.4098753' AS DateTime2))
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhmucsanpham] ON 

INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (1, N'Trái cây tươi ', CAST(N'2024-11-23T15:41:48.5484627' AS DateTime2), CAST(N'2024-11-23T15:41:48.5484629' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (2, N'Rau củ', CAST(N'2024-11-23T15:42:34.5048992' AS DateTime2), CAST(N'2024-11-23T15:42:34.5048993' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (16, N' Nấm các loại', CAST(N'2024-11-25T12:44:29.9103428' AS DateTime2), CAST(N'2024-11-25T12:44:29.9103429' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (20, N'Bia, Nước có cồn', CAST(N'2024-11-27T03:38:19.3026866' AS DateTime2), CAST(N'2024-11-27T03:38:19.3026867' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (21, N'Nước ngọt', CAST(N'2024-11-27T03:45:41.1368923' AS DateTime2), CAST(N'2024-11-27T03:45:41.1368924' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[danhmucsanpham] OFF
GO
SET IDENTITY_INSERT [dbo].[diachichitiets] ON 

INSERT [dbo].[diachichitiets] ([Id], [Diachi], [Sdt], [Email], [Status], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (5, N'Củ Chi,Thành phố Hồ Chí Minh ', N'0778719281', N'quocvu0411@gmail.com', N'đang sử dụng', CAST(N'2024-12-16T18:55:03.4968071' AS DateTime2), CAST(N'2024-12-16T18:55:03.4968083' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
SET IDENTITY_INSERT [dbo].[diachichitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[FooterImg] ON 

INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (48, 18, N'/footer/e9bfec0c8d8b4ae3b52b1a6f070f6268.jpg', N'https://vi-vn.facebook.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (49, 18, N'/footer/3780633e818548dd81f483699c2c4252.jpg', N'https://www.instagram.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (50, 18, N'/footer/8afe9b96aed44550a60da934baa7b73d.jpg', N'https://x.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (51, 18, N'/footer/9519d679caaf49b28b943a1872a55bd6.jpg', N'https://www.youtube.com/')
SET IDENTITY_INSERT [dbo].[FooterImg] OFF
GO
SET IDENTITY_INSERT [dbo].[Footers] ON 

INSERT [dbo].[Footers] ([Id], [NoiDungFooter], [Created_at], [Updated_at], [TrangThai], [updatedBy], [CreatedBy]) VALUES (21, N'<p>Trái Cây Tươi - Tất cả các quyền được bảo hộ. Thiết kế bởi HTML Codexvà phân phối bởiThemeWagon. V1.1.0</p>', CAST(N'2024-12-16T17:48:50.080' AS DateTime), CAST(N'2024-12-16T23:01:09.707' AS DateTime), 1, N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[Footers] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu] ON 

INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'Câu chuyện thương hiệu', N'Morning Fruit là đơn vị chuyên cung cấp trái cây tươi chất lượng cao, từ các nhà vườn trong nước và nhập khẩu. Sứ mệnh của chúng tôi là mang đến những sản phẩm trái cây tươi ngon, giàu dinh dưỡng, đảm bảo an toàn vệ sinh thực phẩm cho khách hàng.', N'<p>Morning Fruit được hình thành từ niềm đam mê với nông nghiệp và sức khỏe cộng đồng. Chúng tôi hiểu rằng, mỗi quả táo, chùm nho hay từng quả bơ không chỉ là thực phẩm, mà còn là những món quà từ thiên nhiên, mang lại giá trị về sức khỏe và tinh thần.</p><p><strong>Tại sao chọn Morning Fruit?</strong></p><ul><li><strong>Chất lượng đảm bảo</strong>: Tất cả các sản phẩm đều được lựa chọn kỹ lưỡng từ các nhà vườn uy tín, trải qua quy trình kiểm tra nghiêm ngặt.</li><li><strong>Nguồn gốc rõ ràng</strong>: Trái cây của chúng tôi được nhập từ những quốc gia nổi tiếng về nông nghiệp như Úc, Mỹ, Nhật Bản và các nhà vườn trong nước.</li><li><strong>Dịch vụ tận tâm</strong>: Morning Fruit luôn đặt sự hài lòng của khách hàng lên hàng đầu. Chúng tôi không chỉ cung cấp sản phẩm mà còn mang đến trải nghiệm mua sắm thân thiện, tiện lợi.</li></ul><p><strong>Sứ mệnh của chúng tôi</strong><br>Morning Fruit hướng tới mục tiêu không chỉ trở thành một thương hiệu trái cây mà còn là người bạn đồng hành của mọi gia đình trong hành trình chăm sóc sức khỏe. Chúng tôi tin rằng, sức khỏe là tài sản quý giá nhất và mỗi trái cây tươi ngon mà chúng tôi mang đến sẽ là một phần trong hành trình gìn giữ tài sản này.</p><p><strong>Định hướng tương lai</strong><br>Morning Fruit không ngừng cải tiến và mở rộng, với mong muốn đưa sản phẩm Việt Nam vươn xa và tiếp cận với khách hàng trên toàn thế giới. Chúng tôi hy vọng có thể lan tỏa tình yêu trái cây đến mọi người, mọi nhà.</p><p><strong>Morning Fruit - Trái cây sạch, yêu thương trao tay!</strong></p>', 1, CAST(N'2024-12-16T18:00:02.103' AS DateTime), CAST(N'2024-12-16T18:00:02.103' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'Khám Phá Câu Chuyện Đằng Sau Thành Công Của Chúng Tôi', N'Chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến những giá trị ý nghĩa cho cộng đồng.', N'<p><strong>Hành trình bắt đầu từ những điều giản dị</strong><br>Morning Fruit được khởi nguồn từ niềm đam mê với nông sản và mong muốn lan tỏa giá trị tốt đẹp đến từng gia đình. Chúng tôi hiểu rằng mỗi trái cây không chỉ đơn thuần là thực phẩm mà còn mang theo tình yêu và công sức của người nông dân.</p><p><strong>Cam kết của chúng tôi</strong></p><ul><li><strong>Đồng hành cùng nông dân</strong>: Morning Fruit hỗ trợ các nhà vườn địa phương trong việc cải thiện chất lượng sản phẩm, đưa nông sản Việt đến gần hơn với người tiêu dùng trong và ngoài nước.</li><li><strong>Đóng góp cho cộng đồng</strong>: Chúng tôi luôn hướng tới các hoạt động ý nghĩa như hỗ trợ thực phẩm cho những hoàn cảnh khó khăn, thúc đẩy lối sống lành mạnh với trái cây sạch.</li></ul><p><strong>Sức mạnh từ sự ủng hộ của khách hàng</strong><br>Sự thành công của Morning Fruit không thể thiếu đi niềm tin và sự đồng hành từ khách hàng. Từng đơn hàng được hoàn thành không chỉ là một giao dịch mà còn là một lời cảm ơn chân thành từ chúng tôi.</p><p><strong>Những giá trị chúng tôi mang lại</strong><br>Không chỉ dừng lại ở sản phẩm chất lượng, Morning Fruit luôn hy vọng mỗi sản phẩm của mình sẽ trở thành một phần kỷ niệm đẹp trong cuộc sống hàng ngày của khách hàng.</p><p><strong>Hành trình tương lai</strong><br>Morning Fruit sẽ tiếp tục đổi mới và phát triển để không chỉ trở thành một thương hiệu, mà còn là một nguồn cảm hứng cho lối sống xanh, bền vững và tràn đầy năng lượng tích cực.</p>', 1, CAST(N'2024-12-16T18:00:41.670' AS DateTime), CAST(N'2024-12-16T18:00:41.670' AS DateTime), N'Phạm Khắc Khải', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[gioithieu] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu_img] ON 

INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (70, 8, N'/gioithieu/olfwjn0wubr.webp', CAST(N'2024-12-16T22:33:12.413' AS DateTime), CAST(N'2024-12-16T22:33:12.413' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (71, 8, N'/gioithieu/2qpj0gt4xfy.webp', CAST(N'2024-12-16T22:33:12.413' AS DateTime), CAST(N'2024-12-16T22:33:12.413' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (72, 9, N'/gioithieu/or5krdbl2ka.webp', CAST(N'2024-12-16T22:33:27.247' AS DateTime), CAST(N'2024-12-16T22:33:27.247' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (73, 9, N'/gioithieu/z3ii4bx4uya.webp', CAST(N'2024-12-16T22:33:27.247' AS DateTime), CAST(N'2024-12-16T22:33:27.247' AS DateTime))
SET IDENTITY_INSERT [dbo].[gioithieu_img] OFF
GO
SET IDENTITY_INSERT [dbo].[hinhanh_sanpham] ON 

INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (104, 34, N'hinhanhphu\565b5946-6d93-469a-bbb2-4d7ee28f8e75.jpg', CAST(N'2024-12-15T23:29:21.3916630' AS DateTime2), CAST(N'2024-12-15T23:29:21.3916636' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (105, 34, N'hinhanhphu\ca514f44-a468-44f1-80a4-dfb98182353b.jpg', CAST(N'2024-12-15T23:29:21.3927858' AS DateTime2), CAST(N'2024-12-15T23:29:21.3927866' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (106, 34, N'hinhanhphu\04471536-f6f0-49d0-8ce8-5cd840f71f7b.jpg', CAST(N'2024-12-15T23:29:21.4357566' AS DateTime2), CAST(N'2024-12-15T23:29:21.4357578' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (107, 35, N'hinhanhphu\e6c27592-cd44-4125-8377-999a70694540.jpg', CAST(N'2024-12-15T23:32:00.0036651' AS DateTime2), CAST(N'2024-12-15T23:32:00.0036661' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (108, 35, N'hinhanhphu\c56ff252-419f-456e-8afe-cced30829f39.jpg', CAST(N'2024-12-15T23:32:00.0459958' AS DateTime2), CAST(N'2024-12-15T23:32:00.0459981' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (109, 35, N'hinhanhphu\c02762b2-828c-4d2e-ac44-fac100da6b44.jpg', CAST(N'2024-12-15T23:32:00.0470699' AS DateTime2), CAST(N'2024-12-15T23:32:00.0470706' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (110, 35, N'hinhanhphu\68b7a913-74a2-49c3-83e1-5f6140694c15.jpg', CAST(N'2024-12-15T23:32:00.0478025' AS DateTime2), CAST(N'2024-12-15T23:32:00.0478029' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (111, 36, N'hinhanhphu\1d063965-008b-40ba-88f6-ea2668bfad30.jpg', CAST(N'2024-12-15T23:33:28.8945623' AS DateTime2), CAST(N'2024-12-15T23:33:28.8945632' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (112, 36, N'hinhanhphu\2af522e1-bc31-4dbc-91b6-6755b3c150d4.jpg', CAST(N'2024-12-15T23:33:28.8966069' AS DateTime2), CAST(N'2024-12-15T23:33:28.8966085' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (113, 36, N'hinhanhphu\8eb06db4-5a01-4d7a-aa61-61f4110c9e41.jpg', CAST(N'2024-12-15T23:33:28.9003818' AS DateTime2), CAST(N'2024-12-15T23:33:28.9003824' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (114, 36, N'hinhanhphu\36e47def-d588-460a-829b-fb537a0c5be2.png', CAST(N'2024-12-15T23:33:28.9024705' AS DateTime2), CAST(N'2024-12-15T23:33:28.9024718' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (115, 37, N'hinhanhphu\19e376d5-9954-4849-b8dd-b980eaf587cf.webp', CAST(N'2024-12-15T23:36:24.9443376' AS DateTime2), CAST(N'2024-12-15T23:36:24.9443382' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (116, 37, N'hinhanhphu\b8772470-28aa-4a66-977a-7a6692dccc8f.jpg', CAST(N'2024-12-15T23:36:24.9449798' AS DateTime2), CAST(N'2024-12-15T23:36:24.9449811' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (117, 37, N'hinhanhphu\a4dfaf98-b6fb-4ec4-b654-b36085fe6a5c.jpg', CAST(N'2024-12-15T23:36:24.9456795' AS DateTime2), CAST(N'2024-12-15T23:36:24.9456810' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (118, 37, N'hinhanhphu\8bb9d48e-d296-4afd-862c-e0a8698b514c.jpg', CAST(N'2024-12-15T23:36:24.9489594' AS DateTime2), CAST(N'2024-12-15T23:36:24.9489607' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (119, 38, N'hinhanhphu\33dfb047-2de3-405a-994a-837a975bbfea.jpg', CAST(N'2024-12-15T23:38:11.2080915' AS DateTime2), CAST(N'2024-12-15T23:38:11.2080927' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (120, 38, N'hinhanhphu\36fcd119-6ff5-4c0e-8056-8c5112360e4d.jpg', CAST(N'2024-12-15T23:38:11.2087835' AS DateTime2), CAST(N'2024-12-15T23:38:11.2087841' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (121, 38, N'hinhanhphu\72d64221-febe-4660-b2e7-57b013a6e605.jpg', CAST(N'2024-12-15T23:38:11.2093464' AS DateTime2), CAST(N'2024-12-15T23:38:11.2093470' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (122, 38, N'hinhanhphu\7076ed93-dc5c-4dbb-8ba6-72e9bb6fce9c.jpg', CAST(N'2024-12-15T23:38:11.2101165' AS DateTime2), CAST(N'2024-12-15T23:38:11.2101169' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (123, 39, N'hinhanhphu\8a6d6390-c3e5-40f1-a879-a27bd37824dc.jpg', CAST(N'2024-12-15T23:39:42.3527399' AS DateTime2), CAST(N'2024-12-15T23:39:42.3527418' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (124, 39, N'hinhanhphu\5024e9cd-15d8-447e-9650-f5335f47fbf4.jpg', CAST(N'2024-12-15T23:39:42.3569113' AS DateTime2), CAST(N'2024-12-15T23:39:42.3569131' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (125, 39, N'hinhanhphu\e14f79fa-f3db-4a9e-974f-0ab0a41b64d8.jpg', CAST(N'2024-12-15T23:39:42.3579200' AS DateTime2), CAST(N'2024-12-15T23:39:42.3579210' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (126, 40, N'hinhanhphu\94a331c5-dd67-4941-ab45-298f5a5cdeeb.jpg', CAST(N'2024-12-15T23:40:58.1752134' AS DateTime2), CAST(N'2024-12-15T23:40:58.1752140' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (127, 40, N'hinhanhphu\253be47e-8d6a-481d-84c6-bb3d79e53b1d.jpg', CAST(N'2024-12-15T23:40:58.1763125' AS DateTime2), CAST(N'2024-12-15T23:40:58.1763137' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (128, 40, N'hinhanhphu\6003b427-faa4-4808-bc05-3dad27f6b545.jpg', CAST(N'2024-12-15T23:40:58.1778977' AS DateTime2), CAST(N'2024-12-15T23:40:58.1778985' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (129, 41, N'hinhanhphu\be0faa2d-4d52-48a3-924d-b7957bc87555.jpg', CAST(N'2024-12-15T23:42:02.1151763' AS DateTime2), CAST(N'2024-12-15T23:42:02.1151769' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (130, 41, N'hinhanhphu\806d8a88-3062-4052-8b3f-2736863b65dd.jpg', CAST(N'2024-12-15T23:42:02.1588402' AS DateTime2), CAST(N'2024-12-15T23:42:02.1588413' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (131, 41, N'hinhanhphu\e05ca841-8211-4ae0-88dd-ddb8d49588bf.jpg', CAST(N'2024-12-15T23:42:02.1623472' AS DateTime2), CAST(N'2024-12-15T23:42:02.1623482' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (132, 42, N'hinhanhphu\0ac18911-173f-4712-805a-467e2c5edc79.jpg', CAST(N'2024-12-15T23:44:21.7350484' AS DateTime2), CAST(N'2024-12-15T23:44:21.7350500' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (133, 42, N'hinhanhphu\7968d118-bfd1-4cd9-ae48-3fcc77646be3.jpg', CAST(N'2024-12-15T23:44:21.7373603' AS DateTime2), CAST(N'2024-12-15T23:44:21.7373610' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (134, 42, N'hinhanhphu\15628c81-8cbb-4d14-83ff-7abaac1051b3.jpg', CAST(N'2024-12-15T23:44:21.7384039' AS DateTime2), CAST(N'2024-12-15T23:44:21.7384053' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (135, 43, N'hinhanhphu\6aeb8f4d-b5a8-4271-8f90-3fff560262ac.jpg', CAST(N'2024-12-15T23:45:51.0509473' AS DateTime2), CAST(N'2024-12-15T23:45:51.0509482' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (136, 43, N'hinhanhphu\cb297373-e93b-4e0b-b2db-bde87d480a36.jpg', CAST(N'2024-12-15T23:45:51.0525323' AS DateTime2), CAST(N'2024-12-15T23:45:51.0525333' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (137, 44, N'hinhanhphu\73bfaaa4-fec1-4d09-bdfb-c26621785467.jpg', CAST(N'2024-12-15T23:47:24.6967274' AS DateTime2), CAST(N'2024-12-15T23:47:24.6967280' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (138, 44, N'hinhanhphu\f987c8a5-5e7d-4685-921f-48e8905f6cb4.jpg', CAST(N'2024-12-15T23:47:24.7395269' AS DateTime2), CAST(N'2024-12-15T23:47:24.7395279' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (139, 44, N'hinhanhphu\36a80645-8194-48b4-b7b2-f5fe9b8ceeed.jpg', CAST(N'2024-12-15T23:47:24.7402128' AS DateTime2), CAST(N'2024-12-15T23:47:24.7402141' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (140, 44, N'hinhanhphu\8762c942-76a1-44bc-af13-cd05370eb997.jpg', CAST(N'2024-12-15T23:47:24.7418242' AS DateTime2), CAST(N'2024-12-15T23:47:24.7418247' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (141, 44, N'hinhanhphu\452699d7-bbc8-4a87-8470-d6e1dfa7c9a7.jpg', CAST(N'2024-12-15T23:47:24.7423725' AS DateTime2), CAST(N'2024-12-15T23:47:24.7423731' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (142, 45, N'hinhanhphu\426fdf26-6eb9-4526-b2c1-14f1ca8a9579.jpg', CAST(N'2024-12-15T23:49:08.4584005' AS DateTime2), CAST(N'2024-12-15T23:49:08.4584012' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (143, 45, N'hinhanhphu\2db36a39-37ed-4199-8fdb-fa574961090e.jpg', CAST(N'2024-12-15T23:49:08.5025263' AS DateTime2), CAST(N'2024-12-15T23:49:08.5025360' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (144, 45, N'hinhanhphu\03f3b164-07e4-409b-9562-dda8d810713e.jpg', CAST(N'2024-12-15T23:49:08.5044650' AS DateTime2), CAST(N'2024-12-15T23:49:08.5044659' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (145, 45, N'hinhanhphu\0f08354d-c617-4ecc-8e47-80768210cce6.jpg', CAST(N'2024-12-15T23:49:08.5057789' AS DateTime2), CAST(N'2024-12-15T23:49:08.5057796' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (146, 45, N'hinhanhphu\67238e0f-ad3f-4953-bce2-e5a948291a71.jpg', CAST(N'2024-12-15T23:49:08.5074654' AS DateTime2), CAST(N'2024-12-15T23:49:08.5074662' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hinhanh_sanpham] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadonchitiets] ON 

INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (200, 122, N'36', CAST(40.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-15T23:54:02.7882826' AS DateTime2), CAST(N'2024-12-15T23:54:02.7882833' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (201, 122, N'39', CAST(60.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-15T23:54:02.7990036' AS DateTime2), CAST(N'2024-12-15T23:54:02.7990041' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (202, 122, N'35', CAST(5.00 AS Decimal(18, 2)), 5, CAST(N'2024-12-15T23:54:02.8016265' AS DateTime2), CAST(N'2024-12-15T23:54:02.8016270' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hoadonchitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadons] ON 

INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at]) VALUES (122, 124, CAST(105.00 AS Decimal(18, 2)), N'FQPUBWWQ', N'Đã giao thành công', CAST(N'2024-12-15T23:54:02.7649496' AS DateTime2), CAST(N'2024-12-15T23:54:39.6993295' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hoadons] OFF
GO
SET IDENTITY_INSERT [dbo].[khachhangs] ON 

INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (124, N'Quốc Vũ', N'Dương', N'1/3 đường 106 ấp 10', N'Thành phố Hồ Chí Minh', N'0778719281', N'quocvu0411@gmail.com', N'giao hàng nhanh cẩn thận trước 4 giờ chiều ', CAST(N'2024-12-15T23:54:02.6677374' AS DateTime2), CAST(N'2024-12-15T23:54:02.6677391' AS DateTime2), N'Huyện Củ Chi', N'Xã Tân Thạnh Đông')
SET IDENTITY_INSERT [dbo].[khachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[lien_hes] ON 

INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (6, N'Dương', N'quocvu0411@gmail.com', N'0778719281', N'vui lòng cung cấp lại cho tôi mã đơn hàng được tạo ngày 9-12-2024 qua email này
', CAST(N'2024-12-09T07:05:45.6804051' AS DateTime2), CAST(N'2024-12-09T07:05:45.6804056' AS DateTime2))
INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (7, N'Dương quốc vũ', N'quocvu0411@gmail.com', N'0778719281', N'07', CAST(N'2024-12-12T14:11:55.0547770' AS DateTime2), CAST(N'2024-12-12T14:11:55.0547784' AS DateTime2))
SET IDENTITY_INSERT [dbo].[lien_hes] OFF
GO
SET IDENTITY_INSERT [dbo].[menu] ON 

INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (7, N'Trang chủ', 1, N'/', CAST(N'2024-12-16T17:00:24.5240739' AS DateTime2), CAST(N'2024-12-16T17:00:24.5240774' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'Cửa hàng', 2, N'/cuahang', CAST(N'2024-12-16T17:02:02.5581818' AS DateTime2), CAST(N'2024-12-16T17:02:02.5581824' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'Giỏ hàng', 3, N'/giohang', CAST(N'2024-12-16T17:02:15.6621513' AS DateTime2), CAST(N'2024-12-16T17:02:15.6621531' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (10, N'Giới thiệu', 4, N'/gioithieu', CAST(N'2024-12-16T17:02:28.4781788' AS DateTime2), CAST(N'2024-12-16T17:02:28.4781796' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (11, N'Liên hệ', 5, N'/lienhe', CAST(N'2024-12-16T17:02:38.1187511' AS DateTime2), CAST(N'2024-12-16T17:02:38.1187518' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (12, N'Tra cứu đơn hàng', 6, N'/tracuu', CAST(N'2024-12-16T17:02:49.9704474' AS DateTime2), CAST(N'2024-12-16T17:02:49.9704482' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[menu] OFF
GO
SET IDENTITY_INSERT [dbo].[menuFooter] ON 

INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (19, N'Tại sao bạn chọn chúng tôi?', N'<p>Chúng tôi cung cấp các loại trái cây và rau củ tươi sạch, chất lượng cao, được chọn lọc kỹ lưỡng.</p><p>Đảm bảo an toàn thực phẩm và nguồn gốc rõ ràng, đem đến bữa ăn bổ dưỡng cho gia đình bạn.</p><p>&nbsp;</p>', 1, CAST(N'2024-12-16T17:43:15.973' AS DateTime), CAST(N'2024-12-16T19:24:31.437' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (20, N'Thông tin cửa hàng', N'<p>- Liên hệ<br>- Chính sách bảo mật<br>- Điều khoản &amp; điều kiện<br>- Chính sách hoàn trả<br>- Câu hỏi thường gặp &amp; Hỗ trợ<br><br>&nbsp;</p>', 2, CAST(N'2024-12-16T17:43:28.473' AS DateTime), CAST(N'2024-12-16T19:24:33.330' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (21, N'Tài khoản', N'<p>- Cửa hàng của chúng tôi<br>- Giới thiệu về cửa hàng<br>- Liên hệ với chúng tôi<br>- Tra cứu đơn hàng của bạn<br>- Giỏ hàng của bạn<br>&nbsp;</p>', 3, CAST(N'2024-12-16T17:43:38.247' AS DateTime), CAST(N'2024-12-16T19:15:00.277' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (22, N'Liên Hệ', N'<p>- Địa chỉ: Ấp 10 xã Tân Thạnh Đông Huyện Củ Chi TP.HCM</p><p>- Email: Quocvu0411@gmail.com</p><p>- Điện thoại: 0778719281</p><p>- Phương thức thanh toán</p><figure class="image"><img style="aspect-ratio:236/30;" src="https://localhost:7186/menuFooter/638699867714478874_payment.png" width="236" height="30"></figure>', 4, CAST(N'2024-12-16T17:44:00.230' AS DateTime), CAST(N'2024-12-16T23:00:33.007' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[menuFooter] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphams] ON 

INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (34, N'Cam ', CAST(300.00 AS Decimal(18, 2)), N'sanpham\12120e28-e9af-45fb-aadd-bd32ef00391a.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-14T11:11:54.3532852' AS DateTime2), CAST(N'2024-12-14T11:11:54.3532858' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (35, N'Dâu Đà Lạt', CAST(250.00 AS Decimal(18, 2)), N'sanpham\059705c3-aa16-4390-a485-4ee01539e6f5.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-14T11:22:30.0797344' AS DateTime2), CAST(N'2024-12-14T11:22:30.0797349' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (36, N'Dưa hấu đỏ', CAST(40.00 AS Decimal(18, 2)), N'sanpham\8522512c-aed8-4573-a44a-5347c88b65a0.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:33:28.8894561' AS DateTime2), CAST(N'2024-12-15T23:33:28.8894570' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (37, N'Nho xanh ', CAST(150.00 AS Decimal(18, 2)), N'sanpham\557a6646-82a1-4c04-b3af-0dbe0b7a3d23.jpg', N'Hết hàng', N'kg', 1, CAST(N'2024-12-15T23:36:24.9411271' AS DateTime2), CAST(N'2024-12-15T23:36:24.9411282' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (38, N'Rau cải ngọt', CAST(20.00 AS Decimal(18, 2)), N'sanpham\50dbc338-3a40-4c3c-b3f8-71e5a580ab40.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:38:11.2022837' AS DateTime2), CAST(N'2024-12-15T23:38:11.2022846' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (39, N'Lê Hàn Quốc', CAST(60.00 AS Decimal(18, 2)), N'sanpham\d54e96a1-e71c-4b44-8975-7cc87d6bc78f.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:39:42.3493976' AS DateTime2), CAST(N'2024-12-15T23:39:42.3493983' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (40, N'Rau Mồng tơi', CAST(10.00 AS Decimal(18, 2)), N'sanpham\0e731858-7454-4935-8060-a5b3aacd7e3e.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:40:58.1723053' AS DateTime2), CAST(N'2024-12-15T23:40:58.1723059' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (41, N'Rau dền tươi sạch', CAST(10.00 AS Decimal(18, 2)), N'sanpham\8e42b107-56fb-47fc-84b6-5cdca2e2298c.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:42:02.1115495' AS DateTime2), CAST(N'2024-12-15T23:42:02.1115504' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (42, N'Nấm kim châm tươi', CAST(19.00 AS Decimal(18, 2)), N'sanpham\8ad73556-f901-49a3-a259-eab9b024095a.jpg', N'Còn hàng', N'gói', 16, CAST(N'2024-12-15T23:44:21.7303127' AS DateTime2), CAST(N'2024-12-15T23:44:21.7303133' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (43, N'Nấm Hương Tươi (Nấm Hương Nhật)', CAST(25.00 AS Decimal(18, 2)), N'sanpham\29a683ae-7eac-4b93-97d6-6a5557abe249.jpg', N'Còn hàng', N'gói', 16, CAST(N'2024-12-15T23:45:51.0473376' AS DateTime2), CAST(N'2024-12-15T23:45:51.0473382' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (44, N'Bia Heineken Silver', CAST(350.00 AS Decimal(18, 2)), N'sanpham\230c4e4f-60ec-41e8-b1a2-35405e55836d.jpg', N'Còn hàng', N'thùng', 20, CAST(N'2024-12-15T23:47:24.6934330' AS DateTime2), CAST(N'2024-12-15T23:47:24.6934336' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (45, N'Pepsi Không Calo Vị Chanh', CAST(218.00 AS Decimal(18, 2)), N'sanpham\9311fc0d-3d17-4116-a072-883875da60f1.jpg', N'Còn hàng', N'thùng', 21, CAST(N'2024-12-15T23:49:08.4524848' AS DateTime2), CAST(N'2024-12-15T23:49:08.4524865' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (46, N'123', CAST(213.00 AS Decimal(18, 2)), N'sanpham\9924625f-b819-4dea-9698-bdb147c3aa27.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-16T23:43:29.5698074' AS DateTime2), CAST(N'2024-12-16T23:43:29.5698083' AS DateTime2), N'Phạm Khắc Khải', N'Phạm Khắc Khải')
SET IDENTITY_INSERT [dbo].[sanphams] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphamsale] ON 

INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (78, 35, N'Đang áp dụng', CAST(1.00 AS Decimal(18, 2)), CAST(N'2024-12-14T11:22:00.0000000' AS DateTime2), CAST(N'2024-12-24T11:22:00.0000000' AS DateTime2), CAST(N'2024-12-16T23:43:14.6736614' AS DateTime2), CAST(N'2024-12-16T23:43:14.6736619' AS DateTime2))
SET IDENTITY_INSERT [dbo].[sanphamsale] OFF
GO
SET IDENTITY_INSERT [dbo].[tencuahang] ON 

INSERT [dbo].[tencuahang] ([Id], [Name], [Trangthai], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (14, N'Trái cây tươi ', N'đang sử dụng', CAST(N'2024-12-16T17:24:47.6158610' AS DateTime2), CAST(N'2024-12-16T17:24:47.6158630' AS DateTime2), N'Phạm Khắc Khải', N'Dương Quốc Vũ')
INSERT [dbo].[tencuahang] ([Id], [Name], [Trangthai], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (15, N'Trái cây tươi ', N'không sử dụng', CAST(N'2024-12-16T18:26:12.1300787' AS DateTime2), CAST(N'2024-12-16T18:26:12.1300812' AS DateTime2), N'Phạm Khắc Khải', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[tencuahang] OFF
GO
SET IDENTITY_INSERT [dbo].[TenFooter] ON 

INSERT [dbo].[TenFooter] ([Id], [tieude], [phude], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (18, N'Trái Cây Tươi', N'Cam kết 100% Trái cây tươi sạch', CAST(N'2024-12-16T23:02:33.4275042' AS DateTime2), CAST(N'2024-12-16T23:02:33.4275056' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[TenFooter] OFF
GO
SET IDENTITY_INSERT [dbo].[TenwebSite] ON 

INSERT [dbo].[TenwebSite] ([id], [tieu_de], [favicon], [TrangThai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (14, N'Trái Cây Tươi Sạch', N'/tenwebsite/f85867a0-0f7d-4988-8892-27f8842f6a43.webp', 1, CAST(N'2024-12-16T16:50:12.447' AS DateTime), CAST(N'2024-12-16T22:37:05.567' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[TenwebSite] OFF
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
ALTER TABLE [dbo].[TenwebSite] ADD  DEFAULT ((0)) FOR [TrangThai]
GO
ALTER TABLE [dbo].[TenwebSite] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[TenwebSite] ADD  DEFAULT (getdate()) FOR [updated_at]
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
