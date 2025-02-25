/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[admins]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[bannerimages]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[banners]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[chitiets]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[Dactrungs]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[danhgiakhachhangs]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[danhmucsanpham]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[diachichitiets]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[FooterImg]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[Footers]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[gioithieu]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[gioithieu_img]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[hinhanh_sanpham]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[hoadonchitiets]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[hoadons]    Script Date: 12/24/2024 3:56:23 PM ******/
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
	[UpdatedBy] [nvarchar](255) NULL,
 CONSTRAINT [PK_hoadons] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[khachhangs]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[lien_hes]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[menu]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[menuFooter]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[phanhoidanhgias]    Script Date: 12/24/2024 3:56:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phanhoidanhgias](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[danhgia_id] [int] NOT NULL,
	[noi_dung] [nvarchar](max) NOT NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
	[Created_at] [datetime] NULL,
	[Updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphams]    Script Date: 12/24/2024 3:56:23 PM ******/
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
	[Xoa] [bit] NOT NULL,
 CONSTRAINT [PK_sanphams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphamsale]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[tencuahang]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[TenFooter]    Script Date: 12/24/2024 3:56:23 PM ******/
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
/****** Object:  Table [dbo].[TenwebSite]    Script Date: 12/24/2024 3:56:23 PM ******/
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

INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (89, 24, N'banners/52034344-c885-4934-acd1-215a2c18ee0f.jpg', CAST(N'2024-12-17T17:09:59.8173048' AS DateTime2), CAST(N'2024-12-17T17:09:59.8173065' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (90, 24, N'banners/6a17c216-f442-4142-a242-6c31f9947e49.jpg', CAST(N'2024-12-17T17:09:59.8185689' AS DateTime2), CAST(N'2024-12-17T17:09:59.8185698' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (91, 24, N'banners/ffa0e3ab-237d-4af5-bdd3-08205e3f32c3.jpg', CAST(N'2024-12-17T17:09:59.8195057' AS DateTime2), CAST(N'2024-12-17T17:09:59.8195069' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (92, 24, N'banners/ddfdb405-c4ee-4df1-9ee4-584ce2a7e8e7.jpg', CAST(N'2024-12-17T17:09:59.8204577' AS DateTime2), CAST(N'2024-12-17T17:09:59.8204587' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (94, 25, N'banners/24c0490b-ec4d-41bc-bfd8-5961d0756ad4.jpg', CAST(N'2024-12-18T12:21:11.1783451' AS DateTime2), CAST(N'2024-12-18T12:21:11.1783469' AS DateTime2))
SET IDENTITY_INSERT [dbo].[bannerimages] OFF
GO
SET IDENTITY_INSERT [dbo].[banners] ON 

INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai], [CreatedBy], [UpdatedBy]) VALUES (24, N'Trái Cây Tươi', N'Cam kết 100% Trái cây tươi sạch	', CAST(N'2024-12-16T17:42:04.7913122' AS DateTime2), CAST(N'2024-12-18T05:20:57.1349286' AS DateTime2), N'đang sử dụng', N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai], [CreatedBy], [UpdatedBy]) VALUES (25, N'sad', N'asd', CAST(N'2024-12-18T12:21:02.2803906' AS DateTime2), CAST(N'2024-12-18T05:21:11.1784533' AS DateTime2), N'không sử dụng', N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[banners] OFF
GO
SET IDENTITY_INSERT [dbo].[chitiets] ON 

INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (21, 34, N'<p><strong>Tên sản phẩm:</strong> Cam sành&nbsp;<br><strong>Mô tả chi tiết:</strong><br>Cam sành hữu cơ là loại cam được trồng tự nhiên, không sử dụng hóa chất, mang lại vị ngọt thanh mát và đầy dinh dưỡng. Cam sành được chọn lọc từ những vườn trái cây đạt chuẩn, đảm bảo an toàn và tốt cho sức khỏe người tiêu dùng.</p><ul><li><strong>Nguồn gốc:</strong> Đồng bằng sông Cửu Long, Việt Nam</li><li><strong>Khối lượng:</strong> 1kg (~5-7 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Vỏ xanh vàng, mỏng, dễ bóc.</li><li>Thịt quả mọng nước, vị ngọt thanh, ít hạt.</li><li>Giàu vitamin C, chất xơ, và khoáng chất.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Gọt vỏ và thưởng thức.</li><li>Ép nước: Tạo ra ly nước cam tươi mát.</li><li>Làm salad: Kết hợp với rau củ để tạo món ăn dinh dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nơi thoáng mát: Ở nhiệt độ phòng từ 2-3 ngày.</li><li>Ngăn mát tủ lạnh: Từ 7-10 ngày.</li></ul></li></ul><p>Hãy thưởng thức cam sành để bổ sung năng lượng và tăng cường sức khỏe mỗi ngày!</p>', N'<p>&nbsp;</p><p>&nbsp;</p><p><strong>Tiêu đề:</strong> Lợi ích tuyệt vời từ quả cam – Trái cây vàng cho sức khỏe</p><p>Cam không chỉ là một loại trái cây quen thuộc mà còn là "người bạn" đồng hành của sức khỏe nhờ vào nguồn dinh dưỡng dồi dào.</p><p><strong>1. Tăng cường hệ miễn dịch</strong><br>Cam chứa hàm lượng lớn <strong>vitamin C</strong>, giúp cơ thể chống lại các tác nhân gây bệnh, đặc biệt là trong mùa cảm cúm. Chỉ cần một quả cam mỗi ngày, bạn đã cung cấp đủ vitamin C cần thiết cho cơ thể.</p><p><strong>2. Hỗ trợ tiêu hóa</strong><br>Chất xơ trong cam giúp cải thiện hoạt động tiêu hóa, giảm nguy cơ táo bón và hỗ trợ hệ vi khuẩn đường ruột khỏe mạnh.</p><p><strong>3. Tốt cho tim mạch</strong><br>Cam chứa các hợp chất chống oxy hóa như flavonoid, giúp giảm cholesterol xấu và cải thiện lưu thông máu, từ đó giảm nguy cơ mắc các bệnh về tim mạch.</p><p><strong>4. Làm đẹp da</strong><br>Vitamin C và chất chống oxy hóa trong cam giúp da sáng mịn, giảm thâm nám và ngăn ngừa lão hóa. Cam cũng kích thích sản xuất collagen – thành phần quan trọng giữ cho da đàn hồi.</p><p><strong>5. Hỗ trợ giảm cân</strong><br>Với hàm lượng calo thấp nhưng lại chứa nhiều nước và chất xơ, cam là sự lựa chọn hoàn hảo cho những ai muốn giảm cân.</p><p><strong>Hướng dẫn sử dụng cam:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Nhanh gọn, tiện lợi.</li><li><strong>Ép nước:</strong> Ly nước cam mát lạnh giúp cung cấp năng lượng ngay lập tức.</li><li><strong>Kết hợp món ăn:</strong> Làm sốt cam cho các món nướng hoặc salad.</li><li><figure class="image"><img style="aspect-ratio:500/500;" src="https://localhost:7186/upload/638701265675032889_best-product-1.jpg" width="500" height="500"></figure></li></ul><p>Cam không chỉ là trái cây thông thường mà còn là "liều thuốc tự nhiên" giúp bạn khỏe mạnh và đầy năng lượng mỗi ngày. Hãy bổ sung cam vào thực đơn của gia đình ngay hôm nay nhé!</p>', CAST(N'2024-12-14T11:11:54.3543351' AS DateTime2), CAST(N'2024-12-14T11:11:54.3543358' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (22, 35, N'<p><strong>Tên sản phẩm:</strong> Dâu tây Đà Lạt<br>Dâu tây Đà Lạt nổi tiếng với hương vị ngọt dịu, thơm mát và độ tươi ngon đặc trưng. Đây là loại trái cây không chỉ làm mê hoặc vị giác mà còn cung cấp nhiều lợi ích cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Đà Lạt, Việt Nam</li><li><strong>Khối lượng:</strong> 500g (~20-25 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả đỏ mọng, vỏ bóng, căng mịn.</li><li>Thịt quả ngọt dịu, hơi chua, thơm tự nhiên.</li><li>Giàu vitamin C, chất chống oxy hóa, và axit folic.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Rửa sạch và ăn tươi.</li><li>Làm sinh tố: Kết hợp với sữa chua hoặc sữa tươi để tạo nên ly sinh tố thơm ngon.</li><li>Trang trí món ăn: Dùng làm topping cho bánh ngọt, kem, hoặc các món tráng miệng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Ngăn mát tủ lạnh: Bảo quản trong hộp kín, giữ được độ tươi từ 3-5 ngày.</li><li>Không rửa trước khi bảo quản để tránh quả bị úng nước.</li></ul></li></ul><p>Hãy thưởng thức dâu tây Đà Lạt để cảm nhận hương vị tự nhiên, tinh khiết của cao nguyên!</p>', N'<p><strong>Tiêu đề:</strong> Dâu tây Đà Lạt – Viên ngọc quý của cao nguyên</p><p>Dâu tây Đà Lạt không chỉ đẹp mắt mà còn chứa đựng vô vàn lợi ích cho sức khỏe và sắc đẹp. Đây là loại trái cây yêu thích của mọi gia đình, từ trẻ nhỏ đến người lớn tuổi.</p><p><strong>1. Tăng cường sức khỏe tim mạch</strong><br>Dâu tây rất giàu chất chống oxy hóa và polyphenol, hỗ trợ bảo vệ tim mạch và giảm nguy cơ mắc các bệnh liên quan đến huyết áp và cholesterol.</p><p><strong>2. Tăng cường miễn dịch</strong><br>Hàm lượng <strong>vitamin C</strong> trong dâu tây rất cao, giúp tăng cường hệ miễn dịch, chống lại cảm cúm và các bệnh nhiễm khuẩn.</p><p><strong>3. Hỗ trợ giảm cân</strong><br>Dâu tây ít calo, giàu chất xơ và chứa nhiều nước, là lựa chọn tuyệt vời cho những ai muốn kiểm soát cân nặng.</p><p><strong>4. Làm đẹp da</strong><br>Dâu tây chứa alpha hydroxy acid (AHA), giúp tẩy tế bào chết tự nhiên, làm sáng da và giảm thâm sạm. Ngoài ra, vitamin C trong dâu còn giúp kích thích sản xuất collagen, giữ da săn chắc và mịn màng.</p><p><strong>5. Tốt cho não bộ</strong><br>Các hợp chất chống oxy hóa trong dâu tây, như anthocyanin, giúp cải thiện trí nhớ và giảm nguy cơ suy giảm chức năng nhận thức khi về già.</p><p><strong>Hướng dẫn sử dụng dâu tây:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Rửa sạch, để nguyên quả hoặc cắt lát, và thưởng thức.</li><li><strong>Làm nước ép/sinh tố:</strong> Kết hợp với các loại trái cây khác như chuối, cam, hoặc xoài để tạo hương vị đa dạng.</li><li><strong>Làm món tráng miệng:</strong> Trang trí bánh ngọt, kem, hoặc sữa chua bằng dâu tây.</li></ul><figure class="image"><img style="aspect-ratio:282/179;" src="https://localhost:7186/upload/638700525416366928_daaaaa.jpg" width="282" height="179"></figure><p>Hãy thử dâu tây Đà Lạt để cảm nhận vị ngon tự nhiên của cao nguyên mát lành, đồng thời bổ sung thêm nguồn dinh dưỡng quý giá cho cả gia đình!</p>', CAST(N'2024-12-14T11:23:02.7672816' AS DateTime2), CAST(N'2024-12-14T11:23:02.7672817' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (23, 36, N'<p><strong>Tên sản phẩm:</strong> Dưa Hấu Ruột Đỏ Ngọt Lịm<br><strong>Mô tả chi tiết:</strong><br>Dưa hấu là loại trái cây được yêu thích bởi hương vị ngọt mát, chứa nhiều nước, giúp giải nhiệt và cung cấp năng lượng tức thời. Đây là lựa chọn hoàn hảo cho những ngày hè oi ả hay bất kỳ bữa ăn nhẹ nào.</p><ul><li><strong>Nguồn gốc:</strong> Đồng Tháp, Việt Nam</li><li><strong>Khối lượng:</strong> 2-3kg/quả</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Vỏ xanh sọc đẹp mắt, thịt quả đỏ rực, mọng nước.</li><li>Vị ngọt thanh, mát, và rất ít hạt.</li><li>Giàu nước, vitamin A, vitamin C và chất chống oxy hóa lycopene.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Cắt miếng và thưởng thức.</li><li>Làm nước ép: Xay dưa hấu để tạo ra ly nước ép mát lạnh, thơm ngon.</li><li>Làm món tráng miệng: Kết hợp với sữa đặc hoặc sữa chua để tăng thêm vị béo ngậy.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nhiệt độ phòng: Dưa hấu chưa cắt có thể bảo quản từ 5-7 ngày.</li><li>Ngăn mát tủ lạnh: Sau khi cắt, bảo quản trong hộp kín để giữ tươi từ 1-2 ngày.</li></ul></li></ul><p>Dưa hấu không chỉ là món ăn ngon mà còn giúp bạn bổ sung nước và làm mát cơ thể một cách tự nhiên!</p>', N'<p><strong>Tiêu đề:</strong> Lợi ích tuyệt vời của dưa hấu – Món quà từ thiên nhiên</p><p>Dưa hấu không chỉ là loại trái cây giải khát yêu thích mà còn mang lại nhiều lợi ích đáng kinh ngạc cho sức khỏe. Hãy cùng khám phá lý do tại sao dưa hấu nên có mặt trong thực đơn hằng ngày của bạn!</p><p><strong>1. Giải nhiệt và cung cấp nước</strong><br>Với hàm lượng nước chiếm đến 92%, dưa hấu là lựa chọn tuyệt vời để bù nước cho cơ thể trong những ngày nóng bức. Một vài miếng dưa hấu sẽ giúp bạn cảm thấy mát mẻ và tràn đầy năng lượng ngay tức thì.</p><p><strong>2. Tăng cường hệ miễn dịch</strong><br>Dưa hấu giàu vitamin C, giúp tăng cường hệ miễn dịch và bảo vệ cơ thể khỏi các tác nhân gây bệnh.</p><p><strong>3. Tốt cho tim mạch</strong><br>Hợp chất lycopene trong dưa hấu không chỉ giúp giảm nguy cơ mắc các bệnh tim mạch mà còn hỗ trợ giảm huyết áp và cải thiện tuần hoàn máu.</p><p><strong>4. Cải thiện làn da</strong><br>Vitamin A và C trong dưa hấu giúp làm sáng da, cải thiện độ đàn hồi và hỗ trợ tái tạo tế bào da.</p><p><strong>5. Hỗ trợ giảm cân</strong><br>Dưa hấu ít calo nhưng giàu nước và chất xơ, giúp bạn no lâu mà không sợ tăng cân. Đây là loại trái cây lý tưởng cho những người đang theo chế độ ăn kiêng.</p><p><strong>Hướng dẫn sử dụng dưa hấu:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ, cắt miếng và thưởng thức hương vị ngọt mát.</li><li><strong>Làm sinh tố:</strong> Xay dưa hấu với một chút mật ong hoặc sữa để tạo món sinh tố bổ dưỡng.</li><li><strong>Làm kem dưa hấu:</strong> Đông lạnh nước ép dưa hấu và tận hưởng món kem mát lạnh vào những ngày hè.</li><li><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638700525813021337_dddddd.png" width="1024" height="768"></figure></li></ul><p>&nbsp;</p><p>Dưa hấu không chỉ ngon miệng mà còn là nguồn dinh dưỡng quý giá, giúp bạn giải nhiệt và cải thiện sức khỏe một cách tự nhiên. Đừng quên thêm dưa hấu vào thực đơn hằng ngày để tận hưởng những lợi ích tuyệt vời mà loại trái cây này mang lại!</p>', CAST(N'2024-12-15T23:33:28.8913802' AS DateTime2), CAST(N'2024-12-15T23:33:28.8913809' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (24, 37, N'<p><strong>Tên sản phẩm:</strong> Nho Xanh Tươi Không Hạt<br><strong>Mô tả chi tiết:</strong><br>Nho xanh tươi không hạt là lựa chọn lý tưởng cho những người yêu thích trái cây ngọt dịu và tiện lợi. Được nhập khẩu từ những vùng trồng nho nổi tiếng, sản phẩm đảm bảo chất lượng tươi ngon, giòn ngọt và giàu dinh dưỡng.</p><ul><li><strong>Nguồn gốc:</strong> Nhập khẩu từ Úc / Mỹ / Nam Phi</li><li><strong>Khối lượng:</strong> 500g - 1kg/túi</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả nho căng tròn, xanh tươi và không hạt.</li><li>Vị ngọt mát, giòn tự nhiên.</li><li>Giàu vitamin C, vitamin K, chất xơ và chất chống oxy hóa như resveratrol.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Ăn trực tiếp:</strong> Rửa sạch và thưởng thức ngay.</li><li><strong>Làm nước ép:</strong> Ép nho lấy nước để giải khát và bồi bổ cơ thể.</li><li><strong>Trang trí món ăn:</strong> Kết hợp với bánh, kem hoặc làm salad trái cây tươi mát.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nơi khô ráo, thoáng mát hoặc trong ngăn mát tủ lạnh từ 5-7 ngày.</li><li>Không để nho tiếp xúc trực tiếp với ánh nắng mặt trời.</li></ul></li></ul><p>Nho xanh không hạt không chỉ là món ăn vặt thơm ngon mà còn mang lại nhiều lợi ích sức khỏe cho bạn và gia đình.</p>', N'<p><strong>Tiêu đề:</strong> Nho xanh không hạt – Vị ngọt thiên nhiên, sức khỏe trọn vẹn</p><p>Nho xanh không hạt là một trong những loại trái cây được yêu thích nhất không chỉ vì hương vị ngọt mát, dễ ăn mà còn bởi những lợi ích tuyệt vời cho sức khỏe.</p><p><strong>1. Cung cấp năng lượng và vitamin</strong><br>Nho xanh chứa nhiều vitamin C và K, giúp tăng cường hệ miễn dịch, cải thiện sức khỏe xương khớp và giảm mệt mỏi tức thì.</p><p><strong>2. Chống lão hóa và đẹp da</strong><br>Nhờ vào hàm lượng chất chống oxy hóa <strong>resveratrol</strong>, nho xanh giúp làm chậm quá trình lão hóa, tái tạo làn da và làm sáng da từ bên trong.</p><p><strong>3. Hỗ trợ giảm cân hiệu quả</strong><br>Nho xanh ít calo, giàu nước và chất xơ giúp bạn no lâu, hạn chế cơn thèm ăn và hỗ trợ quá trình giảm cân.</p><p><strong>4. Tốt cho hệ tiêu hóa</strong><br>Chất xơ trong nho xanh giúp cải thiện chức năng tiêu hóa và giảm tình trạng táo bón.</p><p><strong>5. Bảo vệ tim mạch</strong><br>Các hợp chất flavonoid và resveratrol có trong nho xanh giúp giảm cholesterol xấu, bảo vệ tim mạch và giảm nguy cơ xơ vữa động mạch.</p><p><strong>Hướng dẫn sử dụng:</strong></p><ul><li><strong>Ăn tươi:</strong> Rửa sạch và thưởng thức ngay, phù hợp cho cả gia đình.</li><li><strong>Nước ép:</strong> Ép nho xanh cùng một chút chanh và mật ong để tăng thêm hương vị.</li><li><strong>Làm món tráng miệng:</strong> Trang trí bánh kem, panna cotta hoặc làm topping cho sữa chua.</li><li><figure class="image"><img style="aspect-ratio:232/217;" src="https://localhost:7186/upload/638700526268861743_n6.jpg" width="232" height="217"></figure><p>&nbsp;</p></li></ul><p>&nbsp;</p><p>Hãy thêm nho xanh không hạt vào thực đơn mỗi ngày để bổ sung năng lượng, tăng cường sức khỏe và tận hưởng vị ngọt thanh mát từ thiên nhiên!</p>', CAST(N'2024-12-15T23:36:24.9423203' AS DateTime2), CAST(N'2024-12-15T23:36:24.9423209' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (25, 38, N'<p><strong>Tên sản phẩm:</strong> Rau Cải Ngọt Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau cải ngọt là loại rau xanh phổ biến trong bữa ăn hằng ngày của nhiều gia đình Việt. Không chỉ thơm ngon, dễ chế biến mà còn chứa nhiều vitamin và khoáng chất thiết yếu cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Trồng tại các vườn rau sạch Đà Lạt</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá cải xanh mướt, thân giòn, vị ngọt tự nhiên.</li><li>Giàu <strong>vitamin A, C, K</strong> và các khoáng chất như canxi, sắt, kali.</li><li>Không sử dụng hóa chất, đảm bảo an toàn và tươi sạch.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Xào tỏi:</strong> Món cải ngọt xào tỏi thơm ngon, nhanh chóng.</li><li><strong>Luộc/hấp:</strong> Giữ được vị ngọt tự nhiên và các chất dinh dưỡng.</li><li><strong>Nấu canh:</strong> Kết hợp với tôm, thịt bằm hoặc nấu cùng nấm để tạo nên món canh thanh mát, bổ dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 3-5 ngày.</li><li>Rửa sạch trước khi sử dụng, tránh rửa trước khi bảo quản để rau không bị úng nước.</li></ul></li></ul><p>Rau cải ngọt không chỉ giúp bữa ăn thêm phần hấp dẫn mà còn cung cấp dinh dưỡng cần thiết, giúp cơ thể khỏe mạnh và tràn đầy năng lượng.</p>', N'<p><strong>Tiêu đề:</strong> Rau cải ngọt – Lợi ích vàng cho sức khỏe mỗi ngày</p><p>Rau cải ngọt là một trong những loại rau xanh được yêu thích nhất bởi hương vị thơm ngon, dễ chế biến và mang lại vô vàn lợi ích sức khỏe.</p><p><strong>1. Bổ sung dinh dưỡng thiết yếu</strong><br>Cải ngọt chứa hàm lượng lớn <strong>vitamin A, C, K</strong>, cùng với canxi và sắt, giúp tăng cường sức đề kháng, sáng mắt và cải thiện xương khớp.</p><p><strong>2. Hỗ trợ tiêu hóa</strong><br>Nhờ giàu chất xơ, cải ngọt giúp cải thiện hoạt động của hệ tiêu hóa, ngăn ngừa táo bón và làm sạch ruột một cách tự nhiên.</p><p><strong>3. Tốt cho xương khớp</strong><br>Hàm lượng canxi trong cải ngọt giúp xương chắc khỏe, đồng thời hỗ trợ phòng ngừa bệnh loãng xương hiệu quả.</p><p><strong>4. Giảm cholesterol xấu</strong><br>Cải ngọt chứa các hợp chất thực vật có khả năng giảm <strong>cholesterol xấu (LDL)</strong> trong máu, tốt cho sức khỏe tim mạch.</p><p><strong>5. Làm đẹp da</strong><br>Vitamin C trong cải ngọt giúp sản sinh collagen, giữ cho làn da mịn màng, săn chắc và giảm lão hóa.</p><p><strong>Hướng dẫn chế biến rau cải ngọt:</strong></p><ul><li><strong>Xào tỏi:</strong> Nhanh gọn, giữ nguyên độ giòn của rau và hương vị thơm ngon.</li><li><strong>Luộc hoặc hấp:</strong> Phù hợp cho người ăn kiêng, giữ lại tối đa dinh dưỡng.</li><li><strong>Nấu canh:</strong> Nấu với thịt bằm, tôm hoặc nấm, giúp món ăn thanh mát và bổ dưỡng.</li></ul><figure class="image"><img style="aspect-ratio:236/214;" src="https://localhost:7186/upload/638700527048302925_r6.jpg" width="236" height="214"></figure><p>Rau cải ngọt không chỉ là món ăn đơn giản, dễ chế biến mà còn là nguồn dinh dưỡng tuyệt vời cho cả gia đình. Hãy thêm cải ngọt vào bữa ăn mỗi ngày để tăng cường sức khỏe và tận hưởng hương vị tươi ngon từ thiên nhiên!</p>', CAST(N'2024-12-15T23:38:11.2033621' AS DateTime2), CAST(N'2024-12-15T23:38:11.2033631' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (26, 39, N'<p><strong>Tên sản phẩm:</strong> Lê Hàn Quốc Ngọt Mát Thơm Ngon<br><strong>Mô tả chi tiết:</strong><br>Lê Hàn Quốc là loại trái cây nổi tiếng với vị ngọt thanh mát, thịt quả giòn và mọng nước. Đây là lựa chọn hoàn hảo cho những ai yêu thích trái cây tươi ngon và tốt cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Nhập khẩu từ Hàn Quốc</li><li><strong>Khối lượng:</strong> 1kg (~3-4 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả lê to, vỏ vàng nhạt, mịn, bắt mắt.</li><li>Thịt quả trắng, giòn, ngọt dịu và rất mọng nước.</li><li>Giàu vitamin C, chất xơ và khoáng chất như kali và magie.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ, cắt lát và thưởng thức vị ngọt mát tự nhiên.</li><li><strong>Làm nước ép:</strong> Ép lê tươi để tạo ra ly nước ép giải khát, thanh nhiệt cơ thể.</li><li><strong>Kết hợp với món ăn:</strong> Thêm vào salad trái cây hoặc chế biến món tráng miệng độc đáo.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản ở ngăn mát tủ lạnh để giữ độ tươi và vị ngọt trong 5-7 ngày.</li><li>Tránh để ở nơi có ánh nắng trực tiếp để lê không bị héo.</li></ul></li></ul><p>Lê Hàn Quốc không chỉ ngon miệng mà còn là nguồn dinh dưỡng quý giá giúp bổ sung năng lượng, giải nhiệt và tăng cường sức khỏe.</p>', N'<p><strong>Tiêu đề:</strong> Lê Hàn Quốc – Trái cây vàng mang đến vị ngọt tự nhiên</p><p>Lê Hàn Quốc là loại trái cây nhập khẩu cao cấp, nổi bật với hương vị thơm ngọt, giòn tan và giàu giá trị dinh dưỡng. Không chỉ là món ăn giải khát tuyệt vời, lê còn mang lại nhiều lợi ích cho sức khỏe.</p><p><strong>1. Giải nhiệt và bổ sung nước</strong><br>Lê chứa hàm lượng nước cao, giúp cơ thể giải khát và thanh lọc tự nhiên trong những ngày nắng nóng.</p><p><strong>2. Cung cấp chất xơ, hỗ trợ tiêu hóa</strong><br>Hàm lượng chất xơ trong lê giúp cải thiện hệ tiêu hóa, ngăn ngừa táo bón và hỗ trợ quá trình hấp thu dinh dưỡng hiệu quả.</p><p><strong>3. Tăng cường hệ miễn dịch</strong><br>Nhờ giàu <strong>vitamin C</strong>, lê giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi các bệnh cảm cúm thông thường và cải thiện sức khỏe tổng thể.</p><p><strong>4. Hỗ trợ giảm cân</strong><br>Lê Hàn Quốc ít calo, không chứa chất béo và giúp bạn no lâu hơn nhờ hàm lượng nước và chất xơ dồi dào. Đây là lựa chọn lý tưởng cho những ai muốn duy trì vóc dáng cân đối.</p><p><strong>5. Làm đẹp da</strong><br>Vitamin C và các chất chống oxy hóa trong lê giúp ngăn ngừa lão hóa, giữ cho làn da tươi sáng, mịn màng và khỏe khoắn từ bên trong.</p><p><strong>Hướng dẫn sử dụng lê:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ và thưởng thức hương vị giòn ngọt.</li><li><strong>Làm nước ép lê:</strong> Kết hợp lê với táo hoặc cam để tạo thức uống bổ dưỡng.</li><li><strong>Làm món tráng miệng:</strong> Lê hầm với mật ong hoặc thêm vào các món salad trái cây.</li><li><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638700526424481248_l5.jpg" width="1024" height="768"></figure></li></ul><p>&nbsp;</p><p>Lê Hàn Quốc không chỉ là trái cây thơm ngon mà còn mang đến nhiều lợi ích tuyệt vời cho sức khỏe. Hãy thưởng thức ngay để cảm nhận hương vị thanh tao, ngọt mát từ thiên nhiên!</p>', CAST(N'2024-12-15T23:39:42.3507621' AS DateTime2), CAST(N'2024-12-15T23:39:42.3507634' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (27, 40, N'<p><strong>Tên sản phẩm:</strong> Rau Mồng Tơi Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau mồng tơi là loại rau xanh quen thuộc trong ẩm thực Việt Nam với hương vị thanh mát, dễ ăn và giàu giá trị dinh dưỡng. Đặc biệt, đây là loại rau rất tốt cho sức khỏe nhờ hàm lượng chất xơ và khoáng chất dồi dào.</p><ul><li><strong>Nguồn gốc:</strong> Canh tác tự nhiên tại các trang trại rau sạch địa phương.</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá xanh đậm, non mướt, thân giòn và mọng nước.</li><li>Giàu <strong>vitamin A, C, B3</strong>, sắt, canxi và chất xơ.</li><li>Không sử dụng thuốc trừ sâu, đảm bảo an toàn sức khỏe người dùng.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Nấu canh:</strong> Kết hợp với tôm, cua hoặc thịt bằm tạo nên món canh mát lành, bổ dưỡng.</li><li><strong>Xào tỏi:</strong> Món mồng tơi xào tỏi nhanh chóng và thơm ngon.</li><li><strong>Làm món luộc:</strong> Luộc chín và chấm với nước mắm hoặc kho quẹt để giữ nguyên hương vị thanh mát.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 2-3 ngày.</li><li>Tránh rửa trước khi bảo quản để rau không bị úng nước.</li></ul></li></ul><p>Rau mồng tơi không chỉ là món ăn dân dã mà còn là nguồn dinh dưỡng giúp giải nhiệt, thanh lọc cơ thể và duy trì sức khỏe cho cả gia đình.</p>', N'<p><strong>Tiêu đề:</strong> Rau mồng tơi – Món ăn mát lành, dinh dưỡng cho mọi gia đình</p><p>Rau mồng tơi là loại rau quen thuộc trong ẩm thực Việt Nam, không chỉ ngon miệng mà còn mang lại nhiều lợi ích sức khỏe tuyệt vời.</p><p><strong>1. Thanh nhiệt, giải độc cơ thể</strong><br>Rau mồng tơi có tính mát, giúp thanh nhiệt và giải độc cơ thể, đặc biệt phù hợp trong những ngày hè oi bức.</p><p><strong>2. Cải thiện hệ tiêu hóa</strong><br>Hàm lượng chất xơ cao trong rau mồng tơi hỗ trợ hệ tiêu hóa khỏe mạnh, giảm táo bón và làm sạch đường ruột tự nhiên.</p><p><strong>3. Giàu vitamin và khoáng chất</strong><br>Rau mồng tơi chứa nhiều vitamin A, C, B3, sắt và canxi giúp tăng cường sức đề kháng, cải thiện thị lực và chắc khỏe xương khớp.</p><p><strong>4. Làm đẹp da và tóc</strong><br>Chất nhầy tự nhiên trong rau mồng tơi giúp cung cấp độ ẩm cho da, giảm tình trạng khô ráp và làm mượt tóc.</p><p><strong>5. Tốt cho tim mạch</strong><br>Các khoáng chất như kali và sắt trong rau mồng tơi giúp ổn định huyết áp, bảo vệ tim mạch và ngăn ngừa thiếu máu.</p><p><strong>Hướng dẫn sử dụng rau mồng tơi:</strong></p><ul><li><strong>Nấu canh:</strong> Canh mồng tơi nấu tôm hoặc cua giúp giải nhiệt và bổ sung dinh dưỡng.</li><li><strong>Xào tỏi:</strong> Nhanh gọn, giữ nguyên độ giòn và vị ngon của rau.</li><li><strong>Luộc chấm kho quẹt:</strong> Giữ được hương vị thanh mát tự nhiên, thích hợp trong các bữa cơm gia đình.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638700527385061822_mmmmmm.jpg" width="1024" height="768"></figure><p>Hãy thêm rau mồng tơi vào thực đơn hằng ngày để tận hưởng hương vị tươi ngon và cải thiện sức khỏe của cả gia đình bạn!</p>', CAST(N'2024-12-15T23:40:58.1735695' AS DateTime2), CAST(N'2024-12-15T23:40:58.1735704' AS DateTime2))
SET IDENTITY_INSERT [dbo].[chitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[Dactrungs] ON 

INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (5, N'icon/ae5d4857-9009-4dc9-af0d-1c90e604d99a.webp', N'Miễn phí vận chuyển toàn quốc', N'Nhận ngay ưu đãi giao hàng miễn phí cho mọi đơn hàng từ 200.000 VNĐ	', 1, CAST(N'2024-12-16T17:30:09.7101009' AS DateTime2), CAST(N'2024-12-17T10:04:09.8558077' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (6, N'icon/da0ce9d6-d95a-4c57-bd78-02e28249af39.webp', N'Đổi trả dễ dàng trong 7 ngày', N'Yên tâm mua sắm với chính sách đổi trả miễn phí trong 7 ngày đầu tiên', 2, CAST(N'2024-12-16T17:30:35.3753168' AS DateTime2), CAST(N'2024-12-17T10:04:05.7037071' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (7, N'icon/278ff881-2cd6-4935-9677-770aecce9d64.jpg', N'Siêu khuyến mãi - Giảm giá lên đến 50%', N'Mua sắm ngay hôm nay để nhận ưu đãi lớn trên tất cả các sản phẩm yêu thích của bạn', 3, CAST(N'2024-12-16T17:32:48.3770465' AS DateTime2), CAST(N'2024-12-18T07:41:14.9290488' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'icon/0f3c4fba-f580-4637-9e3c-dc3e656b2571.webp', N'Sản phẩm chất lượng - An toàn cho sức khỏe', N'Cam kết mang đến cho bạn những sản phẩm đạt chuẩn chất lượng, nguồn gốc rõ ràng', 4, CAST(N'2024-12-16T17:34:21.7506897' AS DateTime2), CAST(N'2024-12-17T10:04:18.4803655' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[Dactrungs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] ON 

INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (22, 34, N'Dương Quốc Vũ', N'đánh giá 5 sao', 5, N'Trái cây rất tươi giao hàng nhanh 10đ cho shop', CAST(N'2024-12-17T18:52:08.5495897' AS DateTime2), CAST(N'2024-12-17T18:52:08.5495908' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (23, 37, N'Nguyễn Văn A', N'Nho ngọt', 5, N'Nho ngon ngọt chua vừa tốt', CAST(N'2024-12-17T22:53:21.9716450' AS DateTime2), CAST(N'2024-12-17T22:53:21.9716468' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (24, 40, N'Nguyễn Văn B', N'Rau tươi', 5, N'rau tươi shop bán hàng chất lượng giao hàng nhanh', CAST(N'2024-12-18T14:13:51.9396561' AS DateTime2), CAST(N'2024-12-18T14:13:51.9396575' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (31, 35, N'Dương Quốc Vũ', N'Trái cây ngon', 4, N'Dâu ngon  ngọt nhưng  giao hàng bị dập cho 4 sao ', CAST(N'2024-12-18T21:40:48.9504784' AS DateTime2), CAST(N'2024-12-18T21:40:48.9504809' AS DateTime2))
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhmucsanpham] ON 

INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (1, N'Trái cây tươi ', CAST(N'2024-11-23T15:41:48.5484627' AS DateTime2), CAST(N'2024-11-23T15:41:48.5484629' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (2, N'Rau củ', CAST(N'2024-11-23T15:42:34.5048992' AS DateTime2), CAST(N'2024-11-23T15:42:34.5048993' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (16, N' Nấm các loại', CAST(N'2024-11-25T12:44:29.9103428' AS DateTime2), CAST(N'2024-11-25T12:44:29.9103429' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[danhmucsanpham] OFF
GO
SET IDENTITY_INSERT [dbo].[diachichitiets] ON 

INSERT [dbo].[diachichitiets] ([Id], [Diachi], [Sdt], [Email], [Status], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'Xã Tân Thạnh Đông,Củ Chi,Thành phố Hồ Chí Minh ', N'0778719281', N'quocvu0411@gmail.com', N'đang sử dụng', CAST(N'2024-12-17T17:23:23.2681678' AS DateTime2), CAST(N'2024-12-17T17:23:23.2681684' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[diachichitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[FooterImg] ON 

INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (52, 18, N'/footer/7594967205534e10a832f4a456104ecf.jpg', N'https://vi-vn.facebook.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (53, 18, N'/footer/7ccad64f745e490c924e910dc8737137.jpg', N'https://www.instagram.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (54, 18, N'/footer/6abfb39626c24d83a371f7b504fc4ff5.jpg', N'https://x.com/')
INSERT [dbo].[FooterImg] ([Id], [Footer_ID], [ImagePath], [link]) VALUES (55, 18, N'/footer/e04460d3bf984fdf89412506d3a6e55e.jpg', N'https://www.youtube.com/')
SET IDENTITY_INSERT [dbo].[FooterImg] OFF
GO
SET IDENTITY_INSERT [dbo].[Footers] ON 

INSERT [dbo].[Footers] ([Id], [NoiDungFooter], [Created_at], [Updated_at], [TrangThai], [updatedBy], [CreatedBy]) VALUES (21, N'<p>Trái Cây Tươi - Tất cả các quyền được bảo hộ. Thiết kế bởi HTML Codex và phân phối bởi ThemeWagon. V1.1.5</p>', CAST(N'2024-12-16T17:48:50.080' AS DateTime), CAST(N'2024-12-22T18:12:38.823' AS DateTime), 1, N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Footers] ([Id], [NoiDungFooter], [Created_at], [Updated_at], [TrangThai], [updatedBy], [CreatedBy]) VALUES (22, N'<p>asd</p>', CAST(N'2024-12-20T13:02:56.267' AS DateTime), CAST(N'2024-12-20T13:02:56.267' AS DateTime), 0, N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[Footers] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu] ON 

INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'Câu chuyện thương hiệu', N'Morning Fruit là đơn vị chuyên cung cấp trái cây tươi chất lượng cao, từ các nhà vườn trong nước và nhập khẩu. Sứ mệnh của chúng tôi là mang đến những sản phẩm trái cây tươi ngon, giàu dinh dưỡng, đảm bảo an toàn vệ sinh thực phẩm cho khách hàng.', N'<p>Morning Fruit được hình thành từ niềm đam mê với nông nghiệp và sức khỏe cộng đồng. Chúng tôi hiểu rằng, mỗi quả táo, chùm nho hay từng quả bơ không chỉ là thực phẩm, mà còn là những món quà từ thiên nhiên, mang lại giá trị về sức khỏe và tinh thần.</p><p><strong>Tại sao chọn Morning Fruit?</strong></p><ul><li><strong>Chất lượng đảm bảo</strong>: Tất cả các sản phẩm đều được lựa chọn kỹ lưỡng từ các nhà vườn uy tín, trải qua quy trình kiểm tra nghiêm ngặt.</li><li><strong>Nguồn gốc rõ ràng</strong>: Trái cây của chúng tôi được nhập từ những quốc gia nổi tiếng về nông nghiệp như Úc, Mỹ, Nhật Bản và các nhà vườn trong nước.</li><li><strong>Dịch vụ tận tâm</strong>: Morning Fruit luôn đặt sự hài lòng của khách hàng lên hàng đầu. Chúng tôi không chỉ cung cấp sản phẩm mà còn mang đến trải nghiệm mua sắm thân thiện, tiện lợi.</li></ul><p><strong>Sứ mệnh của chúng tôi</strong><br>Morning Fruit hướng tới mục tiêu không chỉ trở thành một thương hiệu trái cây mà còn là người bạn đồng hành của mọi gia đình trong hành trình chăm sóc sức khỏe. Chúng tôi tin rằng, sức khỏe là tài sản quý giá nhất và mỗi trái cây tươi ngon mà chúng tôi mang đến sẽ là một phần trong hành trình gìn giữ tài sản này.</p><p><strong>Định hướng tương lai</strong><br>Morning Fruit không ngừng cải tiến và mở rộng, với mong muốn đưa sản phẩm Việt Nam vươn xa và tiếp cận với khách hàng trên toàn thế giới. Chúng tôi hy vọng có thể lan tỏa tình yêu trái cây đến mọi người, mọi nhà.</p><p><strong>Morning Fruit - Trái cây sạch, yêu thương trao tay!</strong></p>', 1, CAST(N'2024-12-16T18:00:02.103' AS DateTime), CAST(N'2024-12-16T18:00:02.103' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'Khám Phá Câu Chuyện Đằng Sau Thành Công Của Chúng Tôi', N'Chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến những giá trị ý nghĩa cho cộng đồng.', N'<p><strong>Hành trình bắt đầu từ những điều giản dị</strong><br>Morning Fruit được khởi nguồn từ niềm đam mê với nông sản và mong muốn lan tỏa giá trị tốt đẹp đến từng gia đình. Chúng tôi hiểu rằng mỗi trái cây không chỉ đơn thuần là thực phẩm mà còn mang theo tình yêu và công sức của người nông dân.</p><p><strong>Cam kết của chúng tôi</strong></p><ul><li><strong>Đồng hành cùng nông dân</strong>: Morning Fruit hỗ trợ các nhà vườn địa phương trong việc cải thiện chất lượng sản phẩm, đưa nông sản Việt đến gần hơn với người tiêu dùng trong và ngoài nước.</li><li><strong>Đóng góp cho cộng đồng</strong>: Chúng tôi luôn hướng tới các hoạt động ý nghĩa như hỗ trợ thực phẩm cho những hoàn cảnh khó khăn, thúc đẩy lối sống lành mạnh với trái cây sạch.</li></ul><p><strong>Sức mạnh từ sự ủng hộ của khách hàng</strong><br>Sự thành công của Morning Fruit không thể thiếu đi niềm tin và sự đồng hành từ khách hàng. Từng đơn hàng được hoàn thành không chỉ là một giao dịch mà còn là một lời cảm ơn chân thành từ chúng tôi.</p><p><strong>Những giá trị chúng tôi mang lại</strong><br>Không chỉ dừng lại ở sản phẩm chất lượng, Morning Fruit luôn hy vọng mỗi sản phẩm của mình sẽ trở thành một phần kỷ niệm đẹp trong cuộc sống hàng ngày của khách hàng.</p><p><strong>Hành trình tương lai</strong><br>Morning Fruit sẽ tiếp tục đổi mới và phát triển để không chỉ trở thành một thương hiệu, mà còn là một nguồn cảm hứng cho lối sống xanh, bền vững và tràn đầy năng lượng tích cực.</p>', 1, CAST(N'2024-12-16T18:00:41.670' AS DateTime), CAST(N'2024-12-16T18:00:41.670' AS DateTime), N'Phạm Khắc Khải', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[gioithieu] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu_img] ON 

INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (75, 9, N'/gioithieu/e2u2duss0az.webp', CAST(N'2024-12-17T17:22:51.903' AS DateTime), CAST(N'2024-12-17T17:22:51.903' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (76, 9, N'/gioithieu/ghbe5lqf0bh.webp', CAST(N'2024-12-17T17:22:51.903' AS DateTime), CAST(N'2024-12-17T17:22:51.903' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (77, 8, N'/gioithieu/he2emgcberr.jpg', CAST(N'2024-12-17T17:23:06.707' AS DateTime), CAST(N'2024-12-17T17:23:06.707' AS DateTime))
INSERT [dbo].[gioithieu_img] ([id], [id_gioithieu], [URL_image], [created_at], [updated_at]) VALUES (78, 8, N'/gioithieu/k2s1xfi5iim.jpg', CAST(N'2024-12-17T17:23:06.707' AS DateTime), CAST(N'2024-12-17T17:23:06.707' AS DateTime))
SET IDENTITY_INSERT [dbo].[gioithieu_img] OFF
GO
SET IDENTITY_INSERT [dbo].[hinhanh_sanpham] ON 

INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (147, 34, N'hinhanhphu\4b9a8d24-d562-407d-804a-96bf95308562.jpg', CAST(N'2024-12-17T17:14:52.4273191' AS DateTime2), CAST(N'2024-12-17T17:14:52.4273199' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (148, 34, N'hinhanhphu\b7a2e33f-4528-48c6-b227-cf2d4cc93b00.jpg', CAST(N'2024-12-17T17:14:52.4281717' AS DateTime2), CAST(N'2024-12-17T17:14:52.4281730' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (149, 34, N'hinhanhphu\ae3c3dc5-2615-44a3-8f46-7acd12a32b50.jpg', CAST(N'2024-12-17T17:14:52.4289789' AS DateTime2), CAST(N'2024-12-17T17:14:52.4289802' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (150, 34, N'hinhanhphu\0cf2bc25-b46f-4f11-9dfb-e787ec357ebc.jpg', CAST(N'2024-12-17T17:14:52.4296020' AS DateTime2), CAST(N'2024-12-17T17:14:52.4296026' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (151, 35, N'hinhanhphu\6f65c726-aac2-4375-9abe-39381570fa67.jpg', CAST(N'2024-12-17T17:15:43.2690919' AS DateTime2), CAST(N'2024-12-17T17:15:43.2690928' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (152, 35, N'hinhanhphu\bf1c2717-3de6-4166-9884-d8e72815eb48.jpg', CAST(N'2024-12-17T17:15:43.2696769' AS DateTime2), CAST(N'2024-12-17T17:15:43.2696771' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (153, 35, N'hinhanhphu\8ca4c7da-d3d8-4a46-bf26-f271aa8b7c38.jpg', CAST(N'2024-12-17T17:15:43.2701980' AS DateTime2), CAST(N'2024-12-17T17:15:43.2701985' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (154, 35, N'hinhanhphu\ca8c43ab-8d08-48fe-bcc5-9c04a438ca30.jpg', CAST(N'2024-12-17T17:15:43.2707486' AS DateTime2), CAST(N'2024-12-17T17:15:43.2707490' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (155, 35, N'hinhanhphu\eba92fd3-de5a-4661-bdce-5bc4108b9333.jpg', CAST(N'2024-12-17T17:15:43.2712839' AS DateTime2), CAST(N'2024-12-17T17:15:43.2712841' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (156, 36, N'hinhanhphu\2f90083b-783a-4675-a15d-507a8f81d57c.jpg', CAST(N'2024-12-17T17:16:27.7753355' AS DateTime2), CAST(N'2024-12-17T17:16:27.7753364' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (157, 36, N'hinhanhphu\88eb7adb-c64b-44f8-ac23-73191a3ba008.jpg', CAST(N'2024-12-17T17:16:27.7772765' AS DateTime2), CAST(N'2024-12-17T17:16:27.7772779' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (158, 36, N'hinhanhphu\873b7ef7-2205-4369-a9a1-851c5798c14c.jpg', CAST(N'2024-12-17T17:16:27.7782463' AS DateTime2), CAST(N'2024-12-17T17:16:27.7782473' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (159, 36, N'hinhanhphu\e45a4c62-078a-483d-95c5-cbfeffa4a10d.png', CAST(N'2024-12-17T17:16:27.7804516' AS DateTime2), CAST(N'2024-12-17T17:16:27.7804528' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (160, 37, N'hinhanhphu\0cd6bf7d-6652-4984-b6cb-89a813e66509.jpg', CAST(N'2024-12-17T17:17:09.1428547' AS DateTime2), CAST(N'2024-12-17T17:17:09.1428566' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (161, 37, N'hinhanhphu\68d89297-c108-4e7e-947b-d58b8d00adb7.jpg', CAST(N'2024-12-17T17:17:09.1433826' AS DateTime2), CAST(N'2024-12-17T17:17:09.1433831' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (162, 37, N'hinhanhphu\4fed4776-5f1b-42b7-8e75-4bb399a7e485.jpg', CAST(N'2024-12-17T17:17:09.1438857' AS DateTime2), CAST(N'2024-12-17T17:17:09.1438861' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (163, 39, N'hinhanhphu\a33f5865-779d-4024-8bb5-193d6cf1a6e1.jpg', CAST(N'2024-12-17T17:17:46.3428291' AS DateTime2), CAST(N'2024-12-17T17:17:46.3428318' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (164, 39, N'hinhanhphu\93e667fc-764f-4b85-958e-07a3601a2898.jpg', CAST(N'2024-12-17T17:17:46.3442098' AS DateTime2), CAST(N'2024-12-17T17:17:46.3442108' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (165, 39, N'hinhanhphu\99dc7c18-80f0-45f1-a92f-f27bf3c3c1ef.jpg', CAST(N'2024-12-17T17:17:46.3452322' AS DateTime2), CAST(N'2024-12-17T17:17:46.3452330' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (166, 39, N'hinhanhphu\5c7be786-88d2-4326-b495-304b8372ff69.jpg', CAST(N'2024-12-17T17:17:46.3468506' AS DateTime2), CAST(N'2024-12-17T17:17:46.3468515' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (167, 38, N'hinhanhphu\b628104f-602d-4c3d-b934-26cf4654119b.jpg', CAST(N'2024-12-17T17:18:26.7950783' AS DateTime2), CAST(N'2024-12-17T17:18:26.7950798' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (168, 38, N'hinhanhphu\800b6e41-7700-46e0-b821-564f41e19502.jpg', CAST(N'2024-12-17T17:18:26.7958199' AS DateTime2), CAST(N'2024-12-17T17:18:26.7958209' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (169, 38, N'hinhanhphu\b699dec1-d100-4f1f-82d3-ff700c962ea9.jpg', CAST(N'2024-12-17T17:18:26.7965075' AS DateTime2), CAST(N'2024-12-17T17:18:26.7965082' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (170, 38, N'hinhanhphu\7b4cd07a-7f64-4c73-a330-fd52461515c4.jpg', CAST(N'2024-12-17T17:18:26.7995521' AS DateTime2), CAST(N'2024-12-17T17:18:26.7995534' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (171, 40, N'hinhanhphu\76dc1d52-9bb3-4c99-980c-47b63c05f0a1.jpg', CAST(N'2024-12-17T17:19:00.6358137' AS DateTime2), CAST(N'2024-12-17T17:19:00.6358151' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (172, 40, N'hinhanhphu\65cf29ee-a54d-4f8e-ac12-7dbaab222dc4.jpg', CAST(N'2024-12-17T17:19:00.6367154' AS DateTime2), CAST(N'2024-12-17T17:19:00.6367164' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (173, 40, N'hinhanhphu\15b08257-3cd2-4797-a9d2-804ff96c3e31.jpg', CAST(N'2024-12-17T17:19:00.6377904' AS DateTime2), CAST(N'2024-12-17T17:19:00.6377910' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hinhanh_sanpham] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadonchitiets] ON 

INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (263, 166, N'56', CAST(123.00 AS Decimal(18, 2)), 1, CAST(N'2024-12-24T10:44:05.8093609' AS DateTime2), CAST(N'2024-12-24T10:44:05.8093616' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (264, 167, N'57', CAST(738.00 AS Decimal(18, 2)), 6, CAST(N'2024-12-24T10:47:18.3321006' AS DateTime2), CAST(N'2024-12-24T10:47:18.3321018' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (265, 168, N'39', CAST(120.00 AS Decimal(18, 2)), 2, CAST(N'2024-12-24T10:56:52.5402005' AS DateTime2), CAST(N'2024-12-24T10:56:52.5402013' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hoadonchitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadons] ON 

INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy]) VALUES (166, 1, CAST(123.00 AS Decimal(18, 2)), N'3MM29PJ0', N'Đã giao thành công', CAST(N'2024-12-24T10:44:05.7862272' AS DateTime2), CAST(N'2024-12-24T10:44:28.5406588' AS DateTime2), N'Dương Quốc Vũ')
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy]) VALUES (167, 2, CAST(738.00 AS Decimal(18, 2)), N'WBL6OOS9', N'Đã giao thành công', CAST(N'2024-12-24T10:47:18.3239619' AS DateTime2), CAST(N'2024-12-24T10:47:27.6078969' AS DateTime2), N'Dương Quốc Vũ')
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [total_price], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy]) VALUES (168, 3, CAST(120.00 AS Decimal(18, 2)), N'1F8K2O0K', N'Đã giao thành công', CAST(N'2024-12-24T10:56:52.5175717' AS DateTime2), CAST(N'2024-12-24T10:57:07.9656909' AS DateTime2), N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[hoadons] OFF
GO
SET IDENTITY_INSERT [dbo].[khachhangs] ON 

INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (1, N'Thái', N'Nguyễn Quốc', N'1/3 đường 106', N'Tỉnh Lạng Sơn', N'0778719281', N'nguyenquocthai30012004@gmail.com', N'giao hàng nhanh', CAST(N'2024-12-24T10:44:05.7002117' AS DateTime2), CAST(N'2024-12-24T10:44:05.7002129' AS DateTime2), N'Huyện Hữu Lũng', N'Xã Tân Thành')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (2, N'Thái', N'Nguyễn Quốc', N'1/3 đường 106', N'Tỉnh Lạng Sơn', N'0778719281', N'khackhaipham@gmail.com', N'giao hàng nhanh', CAST(N'2024-12-24T10:47:18.2964579' AS DateTime2), CAST(N'2024-12-24T10:47:18.2964587' AS DateTime2), N'Huyện Văn Quan', N'Xã Bình Phúc')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (3, N'Thái', N'Nguyễn Quốc', N'1/3 đường 106', N'Tỉnh Thái Nguyên', N'0778719281', N'khackhaipham@gmail.com', N'giao hàng nhanh', CAST(N'2024-12-24T10:56:52.3521409' AS DateTime2), CAST(N'2024-12-24T10:56:52.3521420' AS DateTime2), N'Huyện Đại Từ', N'Xã Hà Thượng')
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

INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (19, N'Tại sao bạn chọn chúng tôi?', N'<p>Chúng tôi cung cấp các loại trái cây và rau củ tươi sạch, chất lượng cao, được chọn lọc kỹ lưỡng.</p><p>Đảm bảo an toàn thực phẩm và nguồn gốc rõ ràng, đem đến bữa ăn bổ dưỡng cho gia đình bạn.</p><p>&nbsp;</p>', 1, CAST(N'2024-12-16T17:43:15.973' AS DateTime), CAST(N'2024-12-18T14:04:11.157' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (20, N'Thông tin cửa hàng', N'<p>- Liên hệ<br>- Chính sách bảo mật<br>- Điều khoản &amp; điều kiện<br>- Chính sách hoàn trả<br>- Câu hỏi thường gặp &amp; Hỗ trợ</p>', 2, CAST(N'2024-12-16T17:43:28.473' AS DateTime), CAST(N'2024-12-18T14:03:59.750' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (21, N'Tài khoản', N'<p>- Cửa hàng của chúng tôi<br>- Giới thiệu về cửa hàng<br>- Liên hệ với chúng tôi<br>- Tra cứu đơn hàng của bạn<br>- Giỏ hàng của bạn</p>', 3, CAST(N'2024-12-16T17:43:38.247' AS DateTime), CAST(N'2024-12-18T14:04:07.613' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (22, N'Liên Hệ', N'<p>- Địa chỉ: Ấp 10 xã Tân Thạnh Đông Huyện Củ Chi TP.HCM</p><p>- Email: Quocvu0411@gmail.com</p><p>- Điện thoại: 0778719281</p><p>- Phương thức thanh toán</p><figure class="image"><img style="aspect-ratio:236/30;" src="https://localhost:7186/menuFooter/638701271473651674_payment.png" width="236" height="30"></figure><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>', 4, CAST(N'2024-12-16T17:44:00.230' AS DateTime), CAST(N'2024-12-18T14:03:48.610' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
SET IDENTITY_INSERT [dbo].[menuFooter] OFF
GO
SET IDENTITY_INSERT [dbo].[phanhoidanhgias] ON 

INSERT [dbo].[phanhoidanhgias] ([Id], [danhgia_id], [noi_dung], [CreatedBy], [UpdatedBy], [Created_at], [Updated_at]) VALUES (23, 31, N'Cám ơn bạn', N'Dương Quốc Vũ', N'Dương Quốc Vũ', CAST(N'2024-12-18T22:20:20.920' AS DateTime), CAST(N'2024-12-18T22:20:20.920' AS DateTime))
INSERT [dbo].[phanhoidanhgias] ([Id], [danhgia_id], [noi_dung], [CreatedBy], [UpdatedBy], [Created_at], [Updated_at]) VALUES (24, 22, N'cám ơn bạn!!!', N'Dương Quốc Vũ', N'Phạm Khắc Khải', CAST(N'2024-12-18T22:34:20.023' AS DateTime), CAST(N'2024-12-18T22:34:20.023' AS DateTime))
INSERT [dbo].[phanhoidanhgias] ([Id], [danhgia_id], [noi_dung], [CreatedBy], [UpdatedBy], [Created_at], [Updated_at]) VALUES (25, 23, N'Shop xin chân thành cám ơn bạn nhé ', N'Dương Quốc Vũ', N'Dương Quốc Vũ', CAST(N'2024-12-21T09:21:48.780' AS DateTime), CAST(N'2024-12-21T09:21:48.780' AS DateTime))
SET IDENTITY_INSERT [dbo].[phanhoidanhgias] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphams] ON 

INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (34, N'Cam ', CAST(350.00 AS Decimal(18, 2)), N'sanpham\20b763fe-0958-4862-beea-1966251feb11.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-14T11:11:54.3532852' AS DateTime2), CAST(N'2024-12-14T11:11:54.3532858' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (35, N'Dâu Đà Lạt', CAST(250.00 AS Decimal(18, 2)), N'sanpham\f63b6b95-904d-4c97-baa4-c2b9cfba6bf8.jpg', N'Hết hàng', N'kg', 1, CAST(N'2024-12-14T11:22:30.0797344' AS DateTime2), CAST(N'2024-12-14T11:22:30.0797349' AS DateTime2), N'Dương Quốc Vũ', N'Phạm Khắc Khải', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (36, N'Dưa hấu đỏ', CAST(40.00 AS Decimal(18, 2)), N'sanpham\d7d4581f-a0b1-42ca-a6ef-5aef6a850504.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:33:28.8894561' AS DateTime2), CAST(N'2024-12-15T23:33:28.8894570' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (37, N'Nho xanh ', CAST(150.00 AS Decimal(18, 2)), N'sanpham\dcb5ac48-5bd7-4b00-9d32-984ea4099226.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:36:24.9411271' AS DateTime2), CAST(N'2024-12-15T23:36:24.9411282' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (38, N'Rau cải ngọt', CAST(20.00 AS Decimal(18, 2)), N'sanpham\45ab3cc8-6c88-439f-aa89-fafd7a69dc18.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:38:11.2022837' AS DateTime2), CAST(N'2024-12-15T23:38:11.2022846' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (39, N'Lê Hàn Quốc', CAST(60.00 AS Decimal(18, 2)), N'sanpham\6c312081-9059-4b92-b3f6-99676e0844d0.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:39:42.3493976' AS DateTime2), CAST(N'2024-12-15T23:39:42.3493983' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (40, N'Rau Mồng tơi', CAST(10.00 AS Decimal(18, 2)), N'sanpham\c509b89a-5b8a-4ea0-b682-8ae23609ec2b.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:40:58.1723053' AS DateTime2), CAST(N'2024-12-15T23:40:58.1723059' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (56, N'sad', CAST(123.00 AS Decimal(18, 2)), N'sanpham\f43e4c67-f131-4509-98fb-14c8edd015e3.jpg', N'Còn hàng', N'kg', 2, CAST(N'2024-12-24T10:43:46.2383754' AS DateTime2), CAST(N'2024-12-24T10:43:46.2383769' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa]) VALUES (57, N'asd', CAST(123.00 AS Decimal(18, 2)), N'sanpham\06eef3a4-27bd-4a19-9ae1-8709167e07cc.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-24T10:46:51.0723162' AS DateTime2), CAST(N'2024-12-24T10:46:51.0723175' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1)
SET IDENTITY_INSERT [dbo].[sanphams] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphamsale] ON 

INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (85, 35, N'Đang áp dụng', CAST(200.00 AS Decimal(18, 2)), CAST(N'2024-12-14T11:22:00.0000000' AS DateTime2), CAST(N'2024-12-24T11:22:00.0000000' AS DateTime2), CAST(N'2024-12-18T14:44:12.1433838' AS DateTime2), CAST(N'2024-12-18T14:44:12.1433839' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (86, 38, N'Không áp dụng', CAST(10.00 AS Decimal(18, 2)), CAST(N'2024-12-17T11:35:00.0000000' AS DateTime2), CAST(N'2024-12-19T11:35:00.0000000' AS DateTime2), CAST(N'2024-12-23T12:59:25.9148760' AS DateTime2), CAST(N'2024-12-23T12:59:25.9148762' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (102, 36, N'Đang áp dụng', CAST(35.00 AS Decimal(18, 2)), CAST(N'2024-12-23T18:30:00.0000000' AS DateTime2), CAST(N'2024-12-24T17:30:00.0000000' AS DateTime2), CAST(N'2024-12-23T17:33:45.9250051' AS DateTime2), CAST(N'2024-12-23T17:33:45.9250051' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (113, 34, N'Đang áp dụng', CAST(290.00 AS Decimal(18, 2)), CAST(N'2024-12-24T20:53:00.0000000' AS DateTime2), CAST(N'2025-01-04T22:53:00.0000000' AS DateTime2), CAST(N'2024-12-24T15:53:38.3451221' AS DateTime2), CAST(N'2024-12-24T15:53:38.3451221' AS DateTime2))
SET IDENTITY_INSERT [dbo].[sanphamsale] OFF
GO
SET IDENTITY_INSERT [dbo].[tencuahang] ON 

INSERT [dbo].[tencuahang] ([Id], [Name], [Trangthai], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (14, N'Trái cây tươi ', N'không sử dụng', CAST(N'2024-12-16T17:24:47.6158610' AS DateTime2), CAST(N'2024-12-16T17:24:47.6158630' AS DateTime2), N'Phạm Khắc Khải', N'Dương Quốc Vũ')
INSERT [dbo].[tencuahang] ([Id], [Name], [Trangthai], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (15, N'Trái cây tươi mới', N'đang sử dụng', CAST(N'2024-12-16T18:26:12.1300787' AS DateTime2), CAST(N'2024-12-16T18:26:12.1300812' AS DateTime2), N'Phạm Khắc Khải', N'Phạm Khắc Khải')
SET IDENTITY_INSERT [dbo].[tencuahang] OFF
GO
SET IDENTITY_INSERT [dbo].[TenFooter] ON 

INSERT [dbo].[TenFooter] ([Id], [tieude], [phude], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (18, N'Trái Cây Tươi', N'Cam kết 100% Trái cây tươi sạch', CAST(N'2024-12-16T23:02:33.4275042' AS DateTime2), CAST(N'2024-12-16T23:02:33.4275056' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[TenFooter] OFF
GO
SET IDENTITY_INSERT [dbo].[TenwebSite] ON 

INSERT [dbo].[TenwebSite] ([id], [tieu_de], [favicon], [TrangThai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (14, N'Trái Cây Tươi Sạch', N'/tenwebsite/b0010f65-a38a-4d7e-96df-b7b48153792d.webp', 1, CAST(N'2024-12-16T16:50:12.447' AS DateTime), CAST(N'2024-12-23T15:04:19.527' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
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
ALTER TABLE [dbo].[phanhoidanhgias] ADD  DEFAULT (getdate()) FOR [Created_at]
GO
ALTER TABLE [dbo].[phanhoidanhgias] ADD  DEFAULT (getdate()) FOR [Updated_at]
GO
ALTER TABLE [dbo].[sanphams] ADD  DEFAULT ((0)) FOR [Xoa]
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
ALTER TABLE [dbo].[phanhoidanhgias]  WITH CHECK ADD FOREIGN KEY([danhgia_id])
REFERENCES [dbo].[danhgiakhachhangs] ([Id])
ON DELETE CASCADE
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
