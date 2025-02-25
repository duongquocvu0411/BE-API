/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[admins]    Script Date: 1/17/2025 4:39:51 PM ******/
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
	[Email] [nvarchar](255) NULL,
 CONSTRAINT [PK_admins] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bannerimages]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[banners]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[chitiets]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[Dactrungs]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[danhgiakhachhangs]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[danhmucsanpham]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[diachichitiets]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[FooterImg]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[Footers]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[ghn_orders]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ghn_orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ghn_order_id] [varchar](50) NOT NULL,
	[client_order_code] [varchar](50) NOT NULL,
	[status] [varchar](50) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gioithieu]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[gioithieu_img]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[hinhanh_sanpham]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[hoadonchitiets]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoadonchitiets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[bill_id] [int] NOT NULL,
	[sanpham_ids] [int] NULL,
	[price] [decimal](18, 2) NOT NULL,
	[quantity] [int] NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_hoadonchitiets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hoadons]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hoadons](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[khachhang_id] [int] NOT NULL,
	[order_code] [nvarchar](max) NOT NULL,
	[status] [nvarchar](max) NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
	[UpdatedBy] [nvarchar](255) NULL,
	[thanhtoan] [nvarchar](50) NULL,
	[Total_price] [decimal](18, 3) NULL,
	[Ghn] [nvarchar](50) NULL,
 CONSTRAINT [PK_hoadons] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[khachhangs]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[lien_hes]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[menu]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[menuFooter]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[PaymentTransactions]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentTransactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [nvarchar](50) NOT NULL,
	[TransactionId] [nvarchar](50) NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[PaymentMethod] [nvarchar](20) NULL,
	[Status] [nvarchar](50) NULL,
	[ResponseMessage] [nvarchar](255) NULL,
	[Created_at] [datetime] NULL,
	[Updated_at] [datetime] NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phanhoidanhgias]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[sanphams]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sanphams](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Tieude] [nvarchar](max) NULL,
	[Giatien] [decimal](18, 3) NULL,
	[Hinhanh] [nvarchar](max) NULL,
	[Trangthai] [nvarchar](max) NULL,
	[don_vi_tinh] [nvarchar](max) NULL,
	[danhmucsanpham_id] [int] NOT NULL,
	[Created_at] [datetime2](7) NOT NULL,
	[Updated_at] [datetime2](7) NOT NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
	[Xoa] [bit] NOT NULL,
	[Soluong] [int] NOT NULL,
 CONSTRAINT [PK_sanphams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sanphamsale]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sanphamsale](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sanpham_id] [int] NOT NULL,
	[trangthai] [nvarchar](max) NOT NULL,
	[giasale] [decimal](18, 3) NULL,
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
/****** Object:  Table [dbo].[tencuahang]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[TenFooter]    Script Date: 1/17/2025 4:39:51 PM ******/
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
/****** Object:  Table [dbo].[TenwebSite]    Script Date: 1/17/2025 4:39:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TenwebSite](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tieu_de] [nvarchar](255) NOT NULL,
	[phu_de] [nvarchar](255) NULL,
	[favicon] [nvarchar](255) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[UpdatedBy] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[Diachi] [nvarchar](255) NULL,
	[sdt] [nvarchar](255) NULL,
 CONSTRAINT [PK__TenwebSi__3213E83F0A01F584] PRIMARY KEY CLUSTERED 
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

INSERT [dbo].[admins] ([Id], [Username], [Password], [Created_at], [Updated_at], [hoten], [Email]) VALUES (12, N'khaipk22', N'$2a$11$e6Wo2gzQIz8sebPezAoz6eZD17bbighhKUZUgIS65cEz3hGnNDfT6', CAST(N'2024-12-14T00:35:34.243' AS DateTime), CAST(N'2024-12-14T00:35:34.243' AS DateTime), N'Phạm Khắc Khải', N'phamkhackhaipham@gmail.com')
INSERT [dbo].[admins] ([Id], [Username], [Password], [Created_at], [Updated_at], [hoten], [Email]) VALUES (14, N'thainq22', N'$2a$11$cpaAAjdAeA4mJ8d.QTnEMeLGYhxyqHAziJouAh4qsnTrw3xLKhuqW', CAST(N'2025-01-04T19:13:59.610' AS DateTime), CAST(N'2025-01-04T19:13:59.610' AS DateTime), N'Nguyễn Quốc Thái', N'thainq22@gmail.com')
INSERT [dbo].[admins] ([Id], [Username], [Password], [Created_at], [Updated_at], [hoten], [Email]) VALUES (19, N'quocvu', N'$2a$11$AKtVZeb6oWEqtPRHlxP5KuQCdIKYRQuwZFbULHRjhaq.WEmEyZtUi', CAST(N'2025-01-07T15:38:50.663' AS DateTime), CAST(N'2025-01-07T15:38:50.663' AS DateTime), N'Dương Quốc Vũ', N'quocvu0411@gmail.com')
SET IDENTITY_INSERT [dbo].[admins] OFF
GO
SET IDENTITY_INSERT [dbo].[bannerimages] ON 

INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (89, 24, N'banners/52034344-c885-4934-acd1-215a2c18ee0f.jpg', CAST(N'2024-12-17T17:09:59.8173048' AS DateTime2), CAST(N'2024-12-17T17:09:59.8173065' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (90, 24, N'banners/6a17c216-f442-4142-a242-6c31f9947e49.jpg', CAST(N'2024-12-17T17:09:59.8185689' AS DateTime2), CAST(N'2024-12-17T17:09:59.8185698' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (91, 24, N'banners/ffa0e3ab-237d-4af5-bdd3-08205e3f32c3.jpg', CAST(N'2024-12-17T17:09:59.8195057' AS DateTime2), CAST(N'2024-12-17T17:09:59.8195069' AS DateTime2))
INSERT [dbo].[bannerimages] ([id], [BannerId], [ImagePath], [Created_at], [Updated_at]) VALUES (92, 24, N'banners/ddfdb405-c4ee-4df1-9ee4-584ce2a7e8e7.jpg', CAST(N'2024-12-17T17:09:59.8204577' AS DateTime2), CAST(N'2024-12-17T17:09:59.8204587' AS DateTime2))
SET IDENTITY_INSERT [dbo].[bannerimages] OFF
GO
SET IDENTITY_INSERT [dbo].[banners] ON 

INSERT [dbo].[banners] ([Id], [Tieude], [Phude], [Created_at], [Updated_at], [trangthai], [CreatedBy], [UpdatedBy]) VALUES (24, N'Trái Cây Tươi', N'Cam kết 100% Trái cây tươi sạch	', CAST(N'2024-12-16T17:42:04.7913122' AS DateTime2), CAST(N'2025-01-05T04:06:19.9473947' AS DateTime2), N'đang sử dụng', N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[banners] OFF
GO
SET IDENTITY_INSERT [dbo].[chitiets] ON 

INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (21, 34, N'<p><strong>Tên sản phẩm:</strong> Cam sành&nbsp;<br><strong>Mô tả chi tiết:</strong><br>Cam sành hữu cơ là loại cam được trồng tự nhiên, không sử dụng hóa chất, mang lại vị ngọt thanh mát và đầy dinh dưỡng. Cam sành được chọn lọc từ những vườn trái cây đạt chuẩn, đảm bảo an toàn và tốt cho sức khỏe người tiêu dùng.</p><ul><li><strong>Nguồn gốc:</strong> Đồng bằng sông Cửu Long, Việt Nam</li><li><strong>Khối lượng:</strong> 1kg (~5-7 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Vỏ xanh vàng, mỏng, dễ bóc.</li><li>Thịt quả mọng nước, vị ngọt thanh, ít hạt.</li><li>Giàu vitamin C, chất xơ, và khoáng chất.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Gọt vỏ và thưởng thức.</li><li>Ép nước: Tạo ra ly nước cam tươi mát.</li><li>Làm salad: Kết hợp với rau củ để tạo món ăn dinh dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nơi thoáng mát: Ở nhiệt độ phòng từ 2-3 ngày.</li><li>Ngăn mát tủ lạnh: Từ 7-10 ngày.</li></ul></li></ul><p>Hãy thưởng thức cam sành để bổ sung năng lượng và tăng cường sức khỏe mỗi ngày!</p>', N'<p>&nbsp;</p><p>&nbsp;</p><p><strong>Tiêu đề:</strong> Lợi ích tuyệt vời từ quả cam – Trái cây vàng cho sức khỏe</p><p>Cam không chỉ là một loại trái cây quen thuộc mà còn là "người bạn" đồng hành của sức khỏe nhờ vào nguồn dinh dưỡng dồi dào.</p><p><strong>1. Tăng cường hệ miễn dịch</strong><br>Cam chứa hàm lượng lớn <strong>vitamin C</strong>, giúp cơ thể chống lại các tác nhân gây bệnh, đặc biệt là trong mùa cảm cúm. Chỉ cần một quả cam mỗi ngày, bạn đã cung cấp đủ vitamin C cần thiết cho cơ thể.</p><p><strong>2. Hỗ trợ tiêu hóa</strong><br>Chất xơ trong cam giúp cải thiện hoạt động tiêu hóa, giảm nguy cơ táo bón và hỗ trợ hệ vi khuẩn đường ruột khỏe mạnh.</p><p><strong>3. Tốt cho tim mạch</strong><br>Cam chứa các hợp chất chống oxy hóa như flavonoid, giúp giảm cholesterol xấu và cải thiện lưu thông máu, từ đó giảm nguy cơ mắc các bệnh về tim mạch.</p><p><strong>4. Làm đẹp da</strong><br>Vitamin C và chất chống oxy hóa trong cam giúp da sáng mịn, giảm thâm nám và ngăn ngừa lão hóa. Cam cũng kích thích sản xuất collagen – thành phần quan trọng giữ cho da đàn hồi.</p><p><strong>5. Hỗ trợ giảm cân</strong><br>Với hàm lượng calo thấp nhưng lại chứa nhiều nước và chất xơ, cam là sự lựa chọn hoàn hảo cho những ai muốn giảm cân.</p><p><strong>Hướng dẫn sử dụng cam:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Nhanh gọn, tiện lợi.</li><li><strong>Ép nước:</strong> Ly nước cam mát lạnh giúp cung cấp năng lượng ngay lập tức.</li><li><strong>Kết hợp món ăn:</strong> Làm sốt cam cho các món nướng hoặc salad.</li><li><figure class="image"><img style="aspect-ratio:646/185;" src="https://localhost:44384/upload/638719386553908549_z6157873858164_2089209ea7b66071f678fd13c9a12ff3.jpg" width="646" height="185"></figure></li></ul><p>Cam không chỉ là trái cây thông thường mà còn là "liều thuốc tự nhiên" giúp bạn khỏe mạnh và đầy năng lượng mỗi ngày. Hãy bổ sung cam vào thực đơn của gia đình ngay hôm nay nhé!</p>', CAST(N'2024-12-14T11:11:54.3543351' AS DateTime2), CAST(N'2024-12-14T11:11:54.3543358' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (22, 35, N'<p><strong>Tên sản phẩm:</strong> Dâu tây Đà Lạt<br>Dâu tây Đà Lạt nổi tiếng với hương vị ngọt dịu, thơm mát và độ tươi ngon đặc trưng. Đây là loại trái cây không chỉ làm mê hoặc vị giác mà còn cung cấp nhiều lợi ích cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Đà Lạt, Việt Nam</li><li><strong>Khối lượng:</strong> 500g (~20-25 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả đỏ mọng, vỏ bóng, căng mịn.</li><li>Thịt quả ngọt dịu, hơi chua, thơm tự nhiên.</li><li>Giàu vitamin C, chất chống oxy hóa, và axit folic.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Rửa sạch và ăn tươi.</li><li>Làm sinh tố: Kết hợp với sữa chua hoặc sữa tươi để tạo nên ly sinh tố thơm ngon.</li><li>Trang trí món ăn: Dùng làm topping cho bánh ngọt, kem, hoặc các món tráng miệng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Ngăn mát tủ lạnh: Bảo quản trong hộp kín, giữ được độ tươi từ 3-5 ngày.</li><li>Không rửa trước khi bảo quản để tránh quả bị úng nước.</li></ul></li></ul><p>Hãy thưởng thức dâu tây Đà Lạt để cảm nhận hương vị tự nhiên, tinh khiết của cao nguyên!</p>', N'<p><strong>Tiêu đề:</strong> Dâu tây Đà Lạt – Viên ngọc quý của cao nguyên</p><p>Dâu tây Đà Lạt không chỉ đẹp mắt mà còn chứa đựng vô vàn lợi ích cho sức khỏe và sắc đẹp. Đây là loại trái cây yêu thích của mọi gia đình, từ trẻ nhỏ đến người lớn tuổi.</p><p><strong>1. Tăng cường sức khỏe tim mạch</strong><br>Dâu tây rất giàu chất chống oxy hóa và polyphenol, hỗ trợ bảo vệ tim mạch và giảm nguy cơ mắc các bệnh liên quan đến huyết áp và cholesterol.</p><p><strong>2. Tăng cường miễn dịch</strong><br>Hàm lượng <strong>vitamin C</strong> trong dâu tây rất cao, giúp tăng cường hệ miễn dịch, chống lại cảm cúm và các bệnh nhiễm khuẩn.</p><p><strong>3. Hỗ trợ giảm cân</strong><br>Dâu tây ít calo, giàu chất xơ và chứa nhiều nước, là lựa chọn tuyệt vời cho những ai muốn kiểm soát cân nặng.</p><p><strong>4. Làm đẹp da</strong><br>Dâu tây chứa alpha hydroxy acid (AHA), giúp tẩy tế bào chết tự nhiên, làm sáng da và giảm thâm sạm. Ngoài ra, vitamin C trong dâu còn giúp kích thích sản xuất collagen, giữ da săn chắc và mịn màng.</p><p><strong>5. Tốt cho não bộ</strong><br>Các hợp chất chống oxy hóa trong dâu tây, như anthocyanin, giúp cải thiện trí nhớ và giảm nguy cơ suy giảm chức năng nhận thức khi về già.</p><p><strong>Hướng dẫn sử dụng dâu tây:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Rửa sạch, để nguyên quả hoặc cắt lát, và thưởng thức.</li><li><strong>Làm nước ép/sinh tố:</strong> Kết hợp với các loại trái cây khác như chuối, cam, hoặc xoài để tạo hương vị đa dạng.</li><li><strong>Làm món tráng miệng:</strong> Trang trí bánh ngọt, kem, hoặc sữa chua bằng dâu tây.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:44384/upload/638719387501152439_nnnnnnn.jpg" width="1024" height="768"></figure><p>Hãy thử dâu tây Đà Lạt để cảm nhận vị ngon tự nhiên của cao nguyên mát lành, đồng thời bổ sung thêm nguồn dinh dưỡng quý giá cho cả gia đình!</p>', CAST(N'2024-12-14T11:23:02.7672816' AS DateTime2), CAST(N'2024-12-14T11:23:02.7672817' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (23, 36, N'<p><strong>Tên sản phẩm:</strong> Dưa Hấu Ruột Đỏ Ngọt Lịm<br><strong>Mô tả chi tiết:</strong><br>Dưa hấu là loại trái cây được yêu thích bởi hương vị ngọt mát, chứa nhiều nước, giúp giải nhiệt và cung cấp năng lượng tức thời. Đây là lựa chọn hoàn hảo cho những ngày hè oi ả hay bất kỳ bữa ăn nhẹ nào.</p><ul><li><strong>Nguồn gốc:</strong> Đồng Tháp, Việt Nam</li><li><strong>Khối lượng:</strong> 2-3kg/quả</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Vỏ xanh sọc đẹp mắt, thịt quả đỏ rực, mọng nước.</li><li>Vị ngọt thanh, mát, và rất ít hạt.</li><li>Giàu nước, vitamin A, vitamin C và chất chống oxy hóa lycopene.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li>Dùng trực tiếp: Cắt miếng và thưởng thức.</li><li>Làm nước ép: Xay dưa hấu để tạo ra ly nước ép mát lạnh, thơm ngon.</li><li>Làm món tráng miệng: Kết hợp với sữa đặc hoặc sữa chua để tăng thêm vị béo ngậy.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nhiệt độ phòng: Dưa hấu chưa cắt có thể bảo quản từ 5-7 ngày.</li><li>Ngăn mát tủ lạnh: Sau khi cắt, bảo quản trong hộp kín để giữ tươi từ 1-2 ngày.</li></ul></li></ul><p>Dưa hấu không chỉ là món ăn ngon mà còn giúp bạn bổ sung nước và làm mát cơ thể một cách tự nhiên!</p>', N'<p><strong>Tiêu đề:</strong> Lợi ích tuyệt vời của dưa hấu – Món quà từ thiên nhiên</p><p>Dưa hấu không chỉ là loại trái cây giải khát yêu thích mà còn mang lại nhiều lợi ích đáng kinh ngạc cho sức khỏe. Hãy cùng khám phá lý do tại sao dưa hấu nên có mặt trong thực đơn hằng ngày của bạn!</p><p><strong>1. Giải nhiệt và cung cấp nước</strong><br>Với hàm lượng nước chiếm đến 92%, dưa hấu là lựa chọn tuyệt vời để bù nước cho cơ thể trong những ngày nóng bức. Một vài miếng dưa hấu sẽ giúp bạn cảm thấy mát mẻ và tràn đầy năng lượng ngay tức thì.</p><p><strong>2. Tăng cường hệ miễn dịch</strong><br>Dưa hấu giàu vitamin C, giúp tăng cường hệ miễn dịch và bảo vệ cơ thể khỏi các tác nhân gây bệnh.</p><p><strong>3. Tốt cho tim mạch</strong><br>Hợp chất lycopene trong dưa hấu không chỉ giúp giảm nguy cơ mắc các bệnh tim mạch mà còn hỗ trợ giảm huyết áp và cải thiện tuần hoàn máu.</p><p><strong>4. Cải thiện làn da</strong><br>Vitamin A và C trong dưa hấu giúp làm sáng da, cải thiện độ đàn hồi và hỗ trợ tái tạo tế bào da.</p><p><strong>5. Hỗ trợ giảm cân</strong><br>Dưa hấu ít calo nhưng giàu nước và chất xơ, giúp bạn no lâu mà không sợ tăng cân. Đây là loại trái cây lý tưởng cho những người đang theo chế độ ăn kiêng.</p><p><strong>Hướng dẫn sử dụng dưa hấu:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ, cắt miếng và thưởng thức hương vị ngọt mát.</li><li><strong>Làm sinh tố:</strong> Xay dưa hấu với một chút mật ong hoặc sữa để tạo món sinh tố bổ dưỡng.</li><li><strong>Làm kem dưa hấu:</strong> Đông lạnh nước ép dưa hấu và tận hưởng món kem mát lạnh vào những ngày hè.</li><li><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638700525813021337_dddddd.png" width="1024" height="768"></figure></li></ul><p>&nbsp;</p><p>Dưa hấu không chỉ ngon miệng mà còn là nguồn dinh dưỡng quý giá, giúp bạn giải nhiệt và cải thiện sức khỏe một cách tự nhiên. Đừng quên thêm dưa hấu vào thực đơn hằng ngày để tận hưởng những lợi ích tuyệt vời mà loại trái cây này mang lại!</p>', CAST(N'2024-12-15T23:33:28.8913802' AS DateTime2), CAST(N'2024-12-15T23:33:28.8913809' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (24, 37, N'<p><strong>Tên sản phẩm:</strong> Nho Xanh Tươi Không Hạt<br><strong>Mô tả chi tiết:</strong><br>Nho xanh tươi không hạt là lựa chọn lý tưởng cho những người yêu thích trái cây ngọt dịu và tiện lợi. Được nhập khẩu từ những vùng trồng nho nổi tiếng, sản phẩm đảm bảo chất lượng tươi ngon, giòn ngọt và giàu dinh dưỡng.</p><ul><li><strong>Nguồn gốc:</strong> Nhập khẩu từ Úc / Mỹ / Nam Phi</li><li><strong>Khối lượng:</strong> 500g - 1kg/túi</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả nho căng tròn, xanh tươi và không hạt.</li><li>Vị ngọt mát, giòn tự nhiên.</li><li>Giàu vitamin C, vitamin K, chất xơ và chất chống oxy hóa như resveratrol.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Ăn trực tiếp:</strong> Rửa sạch và thưởng thức ngay.</li><li><strong>Làm nước ép:</strong> Ép nho lấy nước để giải khát và bồi bổ cơ thể.</li><li><strong>Trang trí món ăn:</strong> Kết hợp với bánh, kem hoặc làm salad trái cây tươi mát.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Nơi khô ráo, thoáng mát hoặc trong ngăn mát tủ lạnh từ 5-7 ngày.</li><li>Không để nho tiếp xúc trực tiếp với ánh nắng mặt trời.</li></ul></li></ul><p>Nho xanh không hạt không chỉ là món ăn vặt thơm ngon mà còn mang lại nhiều lợi ích sức khỏe cho bạn và gia đình.</p>', N'<p><strong>Tiêu đề:</strong> Nho xanh không hạt – Vị ngọt thiên nhiên, sức khỏe trọn vẹn</p><p>Nho xanh không hạt là một trong những loại trái cây được yêu thích nhất không chỉ vì hương vị ngọt mát, dễ ăn mà còn bởi những lợi ích tuyệt vời cho sức khỏe.</p><p><strong>1. Cung cấp năng lượng và vitamin</strong><br>Nho xanh chứa nhiều vitamin C và K, giúp tăng cường hệ miễn dịch, cải thiện sức khỏe xương khớp và giảm mệt mỏi tức thì.</p><p><strong>2. Chống lão hóa và đẹp da</strong><br>Nhờ vào hàm lượng chất chống oxy hóa <strong>resveratrol</strong>, nho xanh giúp làm chậm quá trình lão hóa, tái tạo làn da và làm sáng da từ bên trong.</p><p><strong>3. Hỗ trợ giảm cân hiệu quả</strong><br>Nho xanh ít calo, giàu nước và chất xơ giúp bạn no lâu, hạn chế cơn thèm ăn và hỗ trợ quá trình giảm cân.</p><p><strong>4. Tốt cho hệ tiêu hóa</strong><br>Chất xơ trong nho xanh giúp cải thiện chức năng tiêu hóa và giảm tình trạng táo bón.</p><p><strong>5. Bảo vệ tim mạch</strong><br>Các hợp chất flavonoid và resveratrol có trong nho xanh giúp giảm cholesterol xấu, bảo vệ tim mạch và giảm nguy cơ xơ vữa động mạch.</p><p><strong>Hướng dẫn sử dụng:</strong></p><ul><li><strong>Ăn tươi:</strong> Rửa sạch và thưởng thức ngay, phù hợp cho cả gia đình.</li><li><strong>Nước ép:</strong> Ép nho xanh cùng một chút chanh và mật ong để tăng thêm hương vị.</li><li><strong>Làm món tráng miệng:</strong> Trang trí bánh kem, panna cotta hoặc làm topping cho sữa chua.</li><li><figure class="image"><img style="aspect-ratio:232/217;" src="https://localhost:7186/upload/638700526268861743_n6.jpg" width="232" height="217"></figure><p>&nbsp;</p></li></ul><p>&nbsp;</p><p>Hãy thêm nho xanh không hạt vào thực đơn mỗi ngày để bổ sung năng lượng, tăng cường sức khỏe và tận hưởng vị ngọt thanh mát từ thiên nhiên!</p>', CAST(N'2024-12-15T23:36:24.9423203' AS DateTime2), CAST(N'2024-12-15T23:36:24.9423209' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (25, 38, N'<p><strong>Tên sản phẩm:</strong> Rau Cải Ngọt Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau cải ngọt là loại rau xanh phổ biến trong bữa ăn hằng ngày của nhiều gia đình Việt. Không chỉ thơm ngon, dễ chế biến mà còn chứa nhiều vitamin và khoáng chất thiết yếu cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Trồng tại các vườn rau sạch Đà Lạt</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá cải xanh mướt, thân giòn, vị ngọt tự nhiên.</li><li>Giàu <strong>vitamin A, C, K</strong> và các khoáng chất như canxi, sắt, kali.</li><li>Không sử dụng hóa chất, đảm bảo an toàn và tươi sạch.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Xào tỏi:</strong> Món cải ngọt xào tỏi thơm ngon, nhanh chóng.</li><li><strong>Luộc/hấp:</strong> Giữ được vị ngọt tự nhiên và các chất dinh dưỡng.</li><li><strong>Nấu canh:</strong> Kết hợp với tôm, thịt bằm hoặc nấu cùng nấm để tạo nên món canh thanh mát, bổ dưỡng.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 3-5 ngày.</li><li>Rửa sạch trước khi sử dụng, tránh rửa trước khi bảo quản để rau không bị úng nước.</li></ul></li></ul><p>Rau cải ngọt không chỉ giúp bữa ăn thêm phần hấp dẫn mà còn cung cấp dinh dưỡng cần thiết, giúp cơ thể khỏe mạnh và tràn đầy năng lượng.</p>', N'<p><strong>Tiêu đề:</strong> Rau cải ngọt – Lợi ích vàng cho sức khỏe mỗi ngày</p><p>Rau cải ngọt là một trong những loại rau xanh được yêu thích nhất bởi hương vị thơm ngon, dễ chế biến và mang lại vô vàn lợi ích sức khỏe.</p><p><strong>1. Bổ sung dinh dưỡng thiết yếu</strong><br>Cải ngọt chứa hàm lượng lớn <strong>vitamin A, C, K</strong>, cùng với canxi và sắt, giúp tăng cường sức đề kháng, sáng mắt và cải thiện xương khớp.</p><p><strong>2. Hỗ trợ tiêu hóa</strong><br>Nhờ giàu chất xơ, cải ngọt giúp cải thiện hoạt động của hệ tiêu hóa, ngăn ngừa táo bón và làm sạch ruột một cách tự nhiên.</p><p><strong>3. Tốt cho xương khớp</strong><br>Hàm lượng canxi trong cải ngọt giúp xương chắc khỏe, đồng thời hỗ trợ phòng ngừa bệnh loãng xương hiệu quả.</p><p><strong>4. Giảm cholesterol xấu</strong><br>Cải ngọt chứa các hợp chất thực vật có khả năng giảm <strong>cholesterol xấu (LDL)</strong> trong máu, tốt cho sức khỏe tim mạch.</p><p><strong>5. Làm đẹp da</strong><br>Vitamin C trong cải ngọt giúp sản sinh collagen, giữ cho làn da mịn màng, săn chắc và giảm lão hóa.</p><p><strong>Hướng dẫn chế biến rau cải ngọt:</strong></p><ul><li><strong>Xào tỏi:</strong> Nhanh gọn, giữ nguyên độ giòn của rau và hương vị thơm ngon.</li><li><strong>Luộc hoặc hấp:</strong> Phù hợp cho người ăn kiêng, giữ lại tối đa dinh dưỡng.</li><li><strong>Nấu canh:</strong> Nấu với thịt bằm, tôm hoặc nấm, giúp món ăn thanh mát và bổ dưỡng.</li></ul><figure class="image"><img style="aspect-ratio:236/214;" src="https://localhost:7186/upload/638700527048302925_r6.jpg" width="236" height="214"></figure><p>Rau cải ngọt không chỉ là món ăn đơn giản, dễ chế biến mà còn là nguồn dinh dưỡng tuyệt vời cho cả gia đình. Hãy thêm cải ngọt vào bữa ăn mỗi ngày để tăng cường sức khỏe và tận hưởng hương vị tươi ngon từ thiên nhiên!</p>', CAST(N'2024-12-15T23:38:11.2033621' AS DateTime2), CAST(N'2024-12-15T23:38:11.2033631' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (26, 39, N'<p><strong>Tên sản phẩm:</strong> Lê Hàn Quốc Ngọt Mát Thơm Ngon<br><strong>Mô tả chi tiết:</strong><br>Lê Hàn Quốc là loại trái cây nổi tiếng với vị ngọt thanh mát, thịt quả giòn và mọng nước. Đây là lựa chọn hoàn hảo cho những ai yêu thích trái cây tươi ngon và tốt cho sức khỏe.</p><ul><li><strong>Nguồn gốc:</strong> Nhập khẩu từ Hàn Quốc</li><li><strong>Khối lượng:</strong> 1kg (~3-4 quả)</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Quả lê to, vỏ vàng nhạt, mịn, bắt mắt.</li><li>Thịt quả trắng, giòn, ngọt dịu và rất mọng nước.</li><li>Giàu vitamin C, chất xơ và khoáng chất như kali và magie.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ, cắt lát và thưởng thức vị ngọt mát tự nhiên.</li><li><strong>Làm nước ép:</strong> Ép lê tươi để tạo ra ly nước ép giải khát, thanh nhiệt cơ thể.</li><li><strong>Kết hợp với món ăn:</strong> Thêm vào salad trái cây hoặc chế biến món tráng miệng độc đáo.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản ở ngăn mát tủ lạnh để giữ độ tươi và vị ngọt trong 5-7 ngày.</li><li>Tránh để ở nơi có ánh nắng trực tiếp để lê không bị héo.</li></ul></li></ul><p>Lê Hàn Quốc không chỉ ngon miệng mà còn là nguồn dinh dưỡng quý giá giúp bổ sung năng lượng, giải nhiệt và tăng cường sức khỏe.</p>', N'<p><strong>Tiêu đề:</strong> Lê Hàn Quốc – Trái cây vàng mang đến vị ngọt tự nhiên</p><p>Lê Hàn Quốc là loại trái cây nhập khẩu cao cấp, nổi bật với hương vị thơm ngọt, giòn tan và giàu giá trị dinh dưỡng. Không chỉ là món ăn giải khát tuyệt vời, lê còn mang lại nhiều lợi ích cho sức khỏe.</p><p><strong>1. Giải nhiệt và bổ sung nước</strong><br>Lê chứa hàm lượng nước cao, giúp cơ thể giải khát và thanh lọc tự nhiên trong những ngày nắng nóng.</p><p><strong>2. Cung cấp chất xơ, hỗ trợ tiêu hóa</strong><br>Hàm lượng chất xơ trong lê giúp cải thiện hệ tiêu hóa, ngăn ngừa táo bón và hỗ trợ quá trình hấp thu dinh dưỡng hiệu quả.</p><p><strong>3. Tăng cường hệ miễn dịch</strong><br>Nhờ giàu <strong>vitamin C</strong>, lê giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi các bệnh cảm cúm thông thường và cải thiện sức khỏe tổng thể.</p><p><strong>4. Hỗ trợ giảm cân</strong><br>Lê Hàn Quốc ít calo, không chứa chất béo và giúp bạn no lâu hơn nhờ hàm lượng nước và chất xơ dồi dào. Đây là lựa chọn lý tưởng cho những ai muốn duy trì vóc dáng cân đối.</p><p><strong>5. Làm đẹp da</strong><br>Vitamin C và các chất chống oxy hóa trong lê giúp ngăn ngừa lão hóa, giữ cho làn da tươi sáng, mịn màng và khỏe khoắn từ bên trong.</p><p><strong>Hướng dẫn sử dụng lê:</strong></p><ul><li><strong>Ăn trực tiếp:</strong> Gọt vỏ và thưởng thức hương vị giòn ngọt.</li><li><strong>Làm nước ép lê:</strong> Kết hợp lê với táo hoặc cam để tạo thức uống bổ dưỡng.</li><li><strong>Làm món tráng miệng:</strong> Lê hầm với mật ong hoặc thêm vào các món salad trái cây.</li><li><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638700526424481248_l5.jpg" width="1024" height="768"></figure></li></ul><p>&nbsp;</p><p>Lê Hàn Quốc không chỉ là trái cây thơm ngon mà còn mang đến nhiều lợi ích tuyệt vời cho sức khỏe. Hãy thưởng thức ngay để cảm nhận hương vị thanh tao, ngọt mát từ thiên nhiên!</p>', CAST(N'2024-12-15T23:39:42.3507621' AS DateTime2), CAST(N'2024-12-15T23:39:42.3507634' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (27, 40, N'<p><strong>Tên sản phẩm:</strong> Rau Mồng Tơi Tươi Sạch<br><strong>Mô tả chi tiết:</strong><br>Rau mồng tơi là loại rau xanh quen thuộc trong ẩm thực Việt Nam với hương vị thanh mát, dễ ăn và giàu giá trị dinh dưỡng. Đặc biệt, đây là loại rau rất tốt cho sức khỏe nhờ hàm lượng chất xơ và khoáng chất dồi dào.</p><ul><li><strong>Nguồn gốc:</strong> Canh tác tự nhiên tại các trang trại rau sạch địa phương.</li><li><strong>Khối lượng:</strong> 500g/bó</li><li><strong>Đặc điểm nổi bật:</strong><ul><li>Lá xanh đậm, non mướt, thân giòn và mọng nước.</li><li>Giàu <strong>vitamin A, C, B3</strong>, sắt, canxi và chất xơ.</li><li>Không sử dụng thuốc trừ sâu, đảm bảo an toàn sức khỏe người dùng.</li></ul></li><li><strong>Hướng dẫn sử dụng:</strong><ul><li><strong>Nấu canh:</strong> Kết hợp với tôm, cua hoặc thịt bằm tạo nên món canh mát lành, bổ dưỡng.</li><li><strong>Xào tỏi:</strong> Món mồng tơi xào tỏi nhanh chóng và thơm ngon.</li><li><strong>Làm món luộc:</strong> Luộc chín và chấm với nước mắm hoặc kho quẹt để giữ nguyên hương vị thanh mát.</li></ul></li><li><strong>Bảo quản:</strong><ul><li>Bảo quản trong ngăn mát tủ lạnh từ 2-3 ngày.</li><li>Tránh rửa trước khi bảo quản để rau không bị úng nước.</li></ul></li></ul><p>Rau mồng tơi không chỉ là món ăn dân dã mà còn là nguồn dinh dưỡng giúp giải nhiệt, thanh lọc cơ thể và duy trì sức khỏe cho cả gia đình.</p>', N'<p><strong>Tiêu đề:</strong> Rau mồng tơi – Món ăn mát lành, dinh dưỡng cho mọi gia đình</p><p>Rau mồng tơi là loại rau quen thuộc trong ẩm thực Việt Nam, không chỉ ngon miệng mà còn mang lại nhiều lợi ích sức khỏe tuyệt vời.</p><p><strong>1. Thanh nhiệt, giải độc cơ thể</strong><br>Rau mồng tơi có tính mát, giúp thanh nhiệt và giải độc cơ thể, đặc biệt phù hợp trong những ngày hè oi bức.</p><p><strong>2. Cải thiện hệ tiêu hóa</strong><br>Hàm lượng chất xơ cao trong rau mồng tơi hỗ trợ hệ tiêu hóa khỏe mạnh, giảm táo bón và làm sạch đường ruột tự nhiên.</p><p><strong>3. Giàu vitamin và khoáng chất</strong><br>Rau mồng tơi chứa nhiều vitamin A, C, B3, sắt và canxi giúp tăng cường sức đề kháng, cải thiện thị lực và chắc khỏe xương khớp.</p><p><strong>4. Làm đẹp da và tóc</strong><br>Chất nhầy tự nhiên trong rau mồng tơi giúp cung cấp độ ẩm cho da, giảm tình trạng khô ráp và làm mượt tóc.</p><p><strong>5. Tốt cho tim mạch</strong><br>Các khoáng chất như kali và sắt trong rau mồng tơi giúp ổn định huyết áp, bảo vệ tim mạch và ngăn ngừa thiếu máu.</p><p><strong>Hướng dẫn sử dụng rau mồng tơi:</strong></p><ul><li><strong>Nấu canh:</strong> Canh mồng tơi nấu tôm hoặc cua giúp giải nhiệt và bổ sung dinh dưỡng.</li><li><strong>Xào tỏi:</strong> Nhanh gọn, giữ nguyên độ giòn và vị ngon của rau.</li><li><strong>Luộc chấm kho quẹt:</strong> Giữ được hương vị thanh mát tự nhiên, thích hợp trong các bữa cơm gia đình.</li></ul><figure class="image"><img style="aspect-ratio:1024/768;" src="https://localhost:7186/upload/638700527385061822_mmmmmm.jpg" width="1024" height="768"></figure><p>Hãy thêm rau mồng tơi vào thực đơn hằng ngày để tận hưởng hương vị tươi ngon và cải thiện sức khỏe của cả gia đình bạn!</p>', CAST(N'2024-12-15T23:40:58.1735695' AS DateTime2), CAST(N'2024-12-15T23:40:58.1735704' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (29, 46, N'<ul><li><strong>Tên gọi</strong>: Thanh Long (Dragon Fruit)</li><li><strong>Tên khoa học</strong>: Hylocereus spp.</li><li><strong>Mô tả</strong>: Thanh long là quả của cây xương rồng thuộc chi Hylocereus. Quả có hình dáng độc đáo, với vỏ ngoài màu hồng hoặc vàng, phần thịt bên trong có thể là màu trắng, đỏ hoặc vàng, và chứa nhiều hạt đen nhỏ.</li><li><strong>Kích thước</strong>: Quả thanh long thường dài từ 20-30 cm, đường kính từ 10-15 cm.</li><li><strong>Mùa vụ</strong>: Thanh long thường có quanh năm, nhưng mùa thu hoạch chính rơi vào khoảng tháng 5 đến tháng 10.</li><li><strong>Xuất xứ</strong>: Thanh long có nguồn gốc từ Trung Mỹ, nhưng hiện nay được trồng phổ biến ở các nước nhiệt đới như Việt Nam, Thái Lan, và Mexico.</li><li><strong>Hình thức sử dụng</strong>: Ăn tươi, làm sinh tố, nước ép, mứt, salad, hoặc dùng trong các món tráng miệng.</li></ul>', N'<ul><li><strong>Lợi ích sức khỏe</strong>:<ul><li><strong>Chống oxy hóa</strong>: Thanh long chứa các chất chống oxy hóa như betalains và flavonoids, giúp bảo vệ cơ thể khỏi tác hại của các gốc tự do.</li><li><strong>Tăng cường miễn dịch</strong>: Giàu vitamin C, giúp cải thiện hệ miễn dịch và ngăn ngừa cảm cúm.</li><li><strong>Hỗ trợ tiêu hóa</strong>: Với lượng chất xơ cao, thanh long giúp duy trì chức năng tiêu hóa, ngăn ngừa táo bón.</li><li><strong>Tốt cho tim mạch</strong>: Các nghiên cứu chỉ ra rằng thanh long có thể giúp giảm mức cholesterol xấu và hỗ trợ sức khỏe tim mạch.</li></ul></li><li><strong>Thành phần dinh dưỡng (trong 100g)</strong>:<ul><li>Năng lượng: 50-60 calo</li><li>Carbohydrate: 11-13g</li><li>Chất xơ: 3g</li><li>Protein: 1g</li><li>Vitamin C: 3-4mg</li><li>Canxi: 10-20mg</li><li>Sắt: 0.6mg</li></ul></li><li><strong>Loại quả</strong>:<ul><li><strong>Thanh long đỏ</strong>: Thịt đỏ, vỏ hồng, có hương vị ngọt và đậm đà.</li><li><strong>Thanh long trắng</strong>: Thịt trắng, vỏ hồng, có vị ngọt nhẹ và thanh mát.</li><li><strong>Thanh long vàng</strong>: Vỏ vàng, thịt trắng, vị ngọt hơn và ít hạt.</li></ul></li><li><strong>Phương thức trồng trọt</strong>:<ul><li>Thanh long phát triển trên cây xương rồng, yêu cầu khí hậu nóng, khô, và đất thoát nước tốt.</li><li>Cây thanh long cần ánh sáng mặt trời đầy đủ và có thể sống trong điều kiện khô hạn.</li></ul></li><li><strong>Ứng dụng khác</strong>:<ul><li><strong>Làm đẹp</strong>: Thanh long được sử dụng trong các sản phẩm làm đẹp như mặt nạ dưỡng da, nhờ vào đặc tính chống oxy hóa và cung cấp độ ẩm cho da.</li><li><strong>Dinh dưỡng cho trẻ em</strong>: Vì thanh long dễ ăn và có hàm lượng dinh dưỡng cao, nên là lựa chọn tuyệt vời cho trẻ em.</li></ul></li></ul>', CAST(N'2024-12-31T09:44:37.7703994' AS DateTime2), CAST(N'2024-12-31T09:44:37.7704000' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (31, 52, N'<ul><li><strong>Tên gọi:</strong> Sầu riêng (tên khoa học: <i>Durio zibethinus</i>).</li><li><strong>Nguồn gốc:</strong> Đông Nam Á.</li><li><strong>Đặc điểm:</strong> Trái cây nhiệt đới, nổi tiếng với mùi hương mạnh mẽ và vị béo ngọt đặc trưng.</li><li><strong>Hình dáng:</strong><ul><li>Vỏ ngoài cứng, có gai nhọn, màu xanh hoặc vàng.</li><li>Thịt quả màu vàng nhạt đến vàng đậm, mềm mịn, béo ngậy.</li><li>Hạt lớn, có thể ăn được nếu nấu chín.</li></ul></li><li><strong>Mùi hương:</strong> Đặc trưng, mạnh mẽ, gây tranh cãi—người yêu thích, kẻ không chịu nổi.</li></ul>', N'<ul><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Giàu năng lượng, carbohydrate, chất xơ.</li><li>Chứa vitamin C, B6, kali và chất chống oxy hóa.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li>Tăng cường hệ miễn dịch nhờ vitamin C.</li><li>Hỗ trợ tiêu hóa tốt hơn nhờ hàm lượng chất xơ.</li><li>Bổ sung năng lượng tức thì, đặc biệt với người hoạt động mạnh.</li></ul></li><li><strong>Các giống sầu riêng nổi tiếng:</strong><ul><li><strong>Ri6:</strong> Thịt vàng óng, vị ngọt béo, đặc sản Việt Nam.</li><li><strong>Monthong:</strong> Giống Thái Lan, ít mùi hơn, vị ngọt nhẹ.</li><li><strong>Musang King:</strong> Đặc sản Malaysia, vị đậm đà, béo ngậy.</li><li><strong>Chanee:</strong> Giống Thái Lan, vị ngọt mạnh, mùi thơm đậm.</li></ul></li><li><strong>Ứng dụng ẩm thực:</strong><ul><li>Ăn tươi.</li><li>Chế biến thành bánh, kem, sinh tố, chè, hoặc món tráng miệng.</li><li>Kết hợp làm món mặn như cơm sầu riêng.</li></ul></li><li><strong>Lưu ý khi ăn:</strong><ul><li>Không nên ăn quá nhiều, tránh gây nóng trong người.</li><li>Không ăn cùng rượu bia hoặc đồ uống có cồn.</li><li>Người có bệnh nền hoặc phụ nữ mang thai nên tham khảo ý kiến bác sĩ.</li></ul></li></ul>', CAST(N'2024-12-31T10:35:11.7906985' AS DateTime2), CAST(N'2024-12-31T10:35:11.7907001' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (32, 53, N'<ul><li><strong>Tên gọi:</strong> Chôm chôm (tên khoa học: <i>Nephelium lappaceum</i>).</li><li><strong>Nguồn gốc:</strong> Đông Nam Á.</li><li><strong>Đặc điểm:</strong><ul><li>Trái cây nhiệt đới, họ hàng gần với nhãn và vải.</li><li>Vỏ ngoài có lông mềm, dài, màu đỏ hoặc vàng.</li><li>Thịt quả trong suốt, mọng nước, vị ngọt hoặc ngọt chua nhẹ.</li><li>Hạt nhỏ nằm giữa, không ăn được.</li></ul></li></ul>', N'<ul><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Chứa nhiều vitamin C, chất xơ, canxi, kali và chất chống oxy hóa.</li><li>Ít calo, phù hợp làm món ăn vặt lành mạnh.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li>Tăng cường sức đề kháng nhờ vitamin C.</li><li>Hỗ trợ tiêu hóa và ngăn ngừa táo bón nhờ hàm lượng chất xơ.</li><li>Giúp cân bằng huyết áp nhờ lượng kali dồi dào.</li></ul></li><li><strong>Các giống chôm chôm phổ biến:</strong><ul><li><strong>Chôm chôm nhãn:</strong> Quả nhỏ, thịt giòn, vị ngọt đậm, dễ tách hạt.</li><li><strong>Chôm chôm Java (chôm chôm Thái):</strong> Quả to, thịt mềm, ngọt thanh.</li><li><strong>Chôm chôm tróc:</strong> Dễ bóc vỏ, thịt dày, thơm ngon.</li><li><strong>Chôm chôm thường:</strong> Hương vị ngọt chua nhẹ, phổ biến ở Việt Nam.</li></ul></li><li><strong>Ứng dụng ẩm thực:</strong><ul><li>Ăn tươi.</li><li>Làm siro, mứt, kem hoặc nước ép.</li><li>Kết hợp với sữa chua hoặc làm món tráng miệng.</li></ul></li><li><strong>Lưu ý khi ăn:</strong><ul><li>Ăn vừa phải để tránh khó tiêu.</li><li>Chọn quả tươi, không bị héo hoặc dập nát.</li><li>Rửa sạch trước khi ăn để đảm bảo vệ sinh.</li></ul></li></ul>', CAST(N'2024-12-31T10:37:55.6961955' AS DateTime2), CAST(N'2024-12-31T10:37:55.6961967' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (33, 54, N'<ul><li><strong>Tên gọi:</strong> Sơ ri (tên khoa học: <i>Malpighia emarginata</i>), còn gọi là "Acerola cherry" trong tiếng Anh.</li><li><strong>Nguồn gốc:</strong> Tây Ấn và Bắc Nam Mỹ, hiện được trồng rộng rãi ở vùng nhiệt đới, đặc biệt là Việt Nam.</li><li><strong>Đặc điểm:</strong><ul><li>Trái nhỏ, tròn, đường kính khoảng 1–2 cm.</li><li>Vỏ mỏng, màu xanh khi chưa chín, chuyển vàng, cam hoặc đỏ khi chín.</li><li>Thịt quả mềm, mọng nước, vị ngọt chua, chứa nhiều hạt nhỏ.</li></ul></li></ul>', N'<ul><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Rất giàu vitamin C, gấp 20–30 lần so với cam hoặc chanh.</li><li>Cung cấp vitamin A, B, kali, canxi, và chất chống oxy hóa.</li><li>Ít calo, nhiều nước, tốt cho sức khỏe.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Tăng cường miễn dịch:</strong> Vitamin C giúp cơ thể chống lại cảm cúm và nhiễm trùng.</li><li><strong>Cải thiện làn da:</strong> Chất chống oxy hóa và vitamin A hỗ trợ làm đẹp da.</li><li><strong>Tăng cường thị lực:</strong> Vitamin A giúp mắt sáng khỏe.</li><li><strong>Hỗ trợ tiêu hóa:</strong> Chất xơ trong sơ ri giúp hệ tiêu hóa hoạt động tốt hơn.</li></ul></li><li><strong>Các giống sơ ri phổ biến:</strong><ul><li><strong>Sơ ri ngọt:</strong> Vị ngọt đậm, thịt quả mềm.</li><li><strong>Sơ ri chua:</strong> Vị chua thanh, thường dùng làm nước ép.</li><li><strong>Sơ ri Đài Loan:</strong> Quả to hơn, thịt dày, vị ngọt.</li></ul></li><li><strong>Ứng dụng ẩm thực:</strong><ul><li>Ăn tươi như món tráng miệng.</li><li>Làm nước ép, sinh tố hoặc mứt.</li><li>Sử dụng trong bánh kẹo hoặc làm topping cho các món ngọt.</li></ul></li><li><strong>Lưu ý khi ăn:</strong><ul><li>Nên rửa sạch trước khi ăn để đảm bảo vệ sinh.</li><li>Quả sơ ri chín dễ dập, cần bảo quản cẩn thận trong tủ lạnh.</li><li>Không ăn quá nhiều một lúc vì hàm lượng axit cao có thể gây khó chịu dạ dày.</li></ul></li></ul>', CAST(N'2024-12-31T10:40:15.1885024' AS DateTime2), CAST(N'2024-12-31T10:40:15.1885033' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (34, 55, N'<ul><li><strong>Tên gọi:</strong> Tía tô (tên khoa học: <i>Perilla frutescens</i>), còn gọi là "Shiso" trong tiếng Nhật.</li><li><strong>Nguồn gốc:</strong> Xuất phát từ châu Á, đặc biệt là Trung Quốc, Nhật Bản, Hàn Quốc, và Việt Nam.</li><li><strong>Đặc điểm:</strong><ul><li>Là cây thân thảo, cao từ 30–90 cm.</li><li>Lá có màu xanh tím (hoặc đỏ tùy giống), hình trứng, mép lá có răng cưa.</li><li>Mùi hương đặc trưng, hơi nồng và cay, thường được dùng làm gia vị.</li></ul></li></ul>', N'<ul><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Lá tía tô rất giàu vitamin A, C, và K.</li><li>Chứa nhiều khoáng chất như canxi, sắt, và kali.</li><li>Có lượng chất xơ cao, giúp hỗ trợ tiêu hóa.</li><li>Chứa các chất chống oxy hóa và các axit béo omega-3.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Tăng cường miễn dịch:</strong> Vitamin C giúp cơ thể chống lại bệnh tật, cảm lạnh.</li><li><strong>Giảm viêm:</strong> Tía tô có tác dụng giảm viêm, hỗ trợ điều trị các bệnh viêm khớp, viêm da.</li><li><strong>Tốt cho tiêu hóa:</strong> Hỗ trợ làm dịu hệ tiêu hóa, giảm đầy hơi, khó tiêu.</li><li><strong>Giảm căng thẳng:</strong> Có tác dụng an thần, giúp giảm lo âu, căng thẳng.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Dùng làm gia vị:</strong> Thường được dùng để làm gia vị trong các món ăn như bún, phở, hay làm rau sống ăn kèm.</li><li><strong>Nấu canh:</strong> Lá tía tô có thể được sử dụng trong các món canh, đặc biệt là các món ăn hầm hoặc nấu với thịt.</li><li><strong>Làm trà:</strong> Lá tía tô tươi hoặc khô có thể pha làm trà giúp giải nhiệt, thư giãn.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li>Cẩn thận với những người có cơ địa dị ứng với các loại cây thuộc họ Lamiaceae (họ của tía tô).</li><li>Khi dùng tía tô tươi, hãy rửa sạch để loại bỏ bụi bẩn và hóa chất.</li><li>Tía tô có thể tương tác với một số loại thuốc, đặc biệt là thuốc huyết áp, vì vậy cần tham khảo ý kiến bác sĩ trước khi dùng.</li></ul></li></ul>', CAST(N'2024-12-31T10:44:16.1089823' AS DateTime2), CAST(N'2024-12-31T10:44:16.1089837' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (35, 56, N'<ul><li><strong>Tên gọi:</strong> Hành lá (tên khoa học: <i>Allium fistulosum</i>), còn gọi là "hành xanh" hay "hành tươi".</li><li><strong>Nguồn gốc:</strong> Xuất phát từ khu vực châu Á, đặc biệt là Trung Quốc và các quốc gia Đông Nam Á.</li><li><strong>Đặc điểm:</strong><ul><li>Là cây thảo mộc thân cỏ, cao từ 30-60 cm.</li><li>Lá mảnh, màu xanh sáng, có thể dài và thon.</li><li>Cây có mùi đặc trưng của hành, hơi cay nhưng nhẹ hơn hành củ.</li></ul></li></ul>', N'<p>&nbsp;</p><ol><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Hành lá chứa nhiều vitamin A, C, K và folate.</li><li>Cung cấp một lượng nhỏ chất xơ và khoáng chất như canxi, sắt, kali và magiê.</li><li>Hàm lượng thấp calo và chất béo, nhưng giàu chất chống oxy hóa và flavonoid.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Tăng cường hệ miễn dịch:</strong> Vitamin C trong hành lá giúp tăng cường sức đề kháng, bảo vệ cơ thể khỏi các bệnh cảm cúm.</li><li><strong>Tốt cho tiêu hóa:</strong> Hành lá có tác dụng làm dịu dạ dày và giúp tiêu hóa dễ dàng.</li><li><strong>Chống viêm:</strong> Các hợp chất trong hành lá có tính kháng viêm, giúp giảm các triệu chứng viêm khớp và bệnh viêm khác.</li><li><strong>Bảo vệ tim mạch:</strong> Hành lá giúp làm giảm huyết áp và cholesterol, từ đó giảm nguy cơ mắc bệnh tim mạch.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Gia vị và trang trí:</strong> Hành lá thường được sử dụng như một loại gia vị trong các món ăn như bún, phở, salad, canh, hoặc dùng để trang trí các món ăn.</li><li><strong>Dùng trong nấu canh và xào:</strong> Hành lá có thể được cắt nhỏ và thêm vào các món canh, xào, hoặc dùng để tăng hương vị cho món nướng.</li><li><strong>Làm món ăn kèm:</strong> Hành lá có thể dùng để làm món ăn kèm trong các món cuốn, bánh tráng, hoặc làm gia vị trong nước chấm.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li>Hành lá rất dễ trồng và có thể trồng ngay trong chậu nhỏ ở sân vườn hoặc ban công.</li><li>Khi sử dụng hành lá, cần chú ý cắt phần gốc để cây có thể tiếp tục mọc lên.</li><li>Cẩn thận với những người có cơ địa dị ứng với hành, vì hành lá có thể gây kích ứng cho một số người.</li></ul></li></ol>', CAST(N'2024-12-31T10:47:32.1818738' AS DateTime2), CAST(N'2024-12-31T10:47:32.1818749' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (36, 57, N'<ul><li><strong>Tên gọi:</strong> Hành tây (tên khoa học: <i>Allium cepa</i>), còn gọi là "hành củ".</li><li><strong>Nguồn gốc:</strong> Hành tây có nguồn gốc từ Trung Á và đã được sử dụng từ rất lâu trong các nền văn hóa ẩm thực trên thế giới.</li><li><strong>Đặc điểm:</strong><ul><li>Hành tây có hình cầu hoặc hình chóp, lớp vỏ ngoài khô, thường có màu vàng, đỏ hoặc trắng.</li><li>Phần thịt của hành tây có màu trắng hoặc vàng nhạt, có mùi vị cay nồng khi chưa chế biến, nhưng khi nấu chín sẽ trở nên ngọt và mềm.</li></ul></li></ul>', N'<ul><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Hành tây là nguồn cung cấp vitamin C, vitamin B6, folate và mangan.</li><li>Chứa chất xơ và ít calo, giúp hỗ trợ quá trình tiêu hóa.</li><li>Chứa các hợp chất lưu huỳnh có tác dụng kháng khuẩn, kháng viêm và chống oxy hóa.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Tăng cường sức đề kháng:</strong> Vitamin C trong hành tây giúp nâng cao hệ miễn dịch và phòng ngừa các bệnh cảm cúm.</li><li><strong>Cải thiện sức khỏe tim mạch:</strong> Các chất chống oxy hóa và lưu huỳnh trong hành tây giúp giảm huyết áp và cholesterol xấu, từ đó bảo vệ sức khỏe tim mạch.</li><li><strong>Chống viêm và kháng khuẩn:</strong> Hành tây có tính kháng viêm, kháng khuẩn mạnh, giúp giảm viêm nhiễm và hỗ trợ điều trị các bệnh như viêm khớp, viêm họng.</li><li><strong>Hỗ trợ giảm cân:</strong> Vì hành tây ít calo nhưng lại chứa nhiều chất xơ, nên nó giúp tăng cường cảm giác no lâu và hỗ trợ quá trình giảm cân.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Gia vị trong nấu ăn:</strong> Hành tây là nguyên liệu phổ biến trong rất nhiều món ăn như xào, hầm, nướng, xào, nấu canh, làm nước sốt, và gia vị trong các món salad.</li><li><strong>Món ăn đặc trưng:</strong> Hành tây được sử dụng trong nhiều món ăn nổi tiếng như bánh mì kẹp thịt, súp hành tây Pháp, nước sốt BBQ, và các món nướng.</li><li><strong>Tạo hương vị cho các món ăn:</strong> Hành tây khi được xào hoặc nướng sẽ có hương vị ngọt, tạo chiều sâu cho các món ăn như thịt hầm, thịt xào, món súp.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li>Khi cắt hành tây, nó có thể khiến mắt bị cay vì các chất lưu huỳnh bay hơi. Để giảm tình trạng này, có thể cắt hành dưới nước hoặc cho hành vào ngăn mát tủ lạnh trước khi cắt.</li><li>Hành tây có thể bảo quản trong một thời gian dài ở nhiệt độ phòng trong nơi khô ráo và thoáng mát, nhưng khi đã cắt ra, cần bảo quản trong tủ lạnh để giữ được độ tươi ngon.</li></ul></li></ul>', CAST(N'2024-12-31T10:53:16.8813321' AS DateTime2), CAST(N'2024-12-31T10:53:16.8813331' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (37, 58, N'<ul><li><strong>Tên gọi:</strong> Nấm hương (tên khoa học: <i>Lentinula edodes</i>), còn gọi là "shiitake" trong tiếng Nhật.</li><li><strong>Nguồn gốc:</strong> Nấm hương có nguồn gốc từ Đông Á, đặc biệt là Nhật Bản, Trung Quốc và Hàn Quốc. Nấm hương đã được trồng và sử dụng từ hàng nghìn năm qua trong ẩm thực và y học truyền thống.</li><li><strong>Đặc điểm:</strong><ul><li>Nấm hương có mũ nấm rộng, hình dạng dẹt và có màu nâu sẫm. Đặc biệt, nấm có hương thơm đặc trưng rất dễ nhận biết.</li><li>Thịt nấm dày, màu trắng ngà, khi nấu chín có vị ngọt thanh và rất thơm.</li><li>Nấm hương có dạng tươi và khô. Nấm khô được sử dụng rộng rãi trong ẩm thực vì hương vị của nó sẽ đậm đà hơn khi chế biến.</li></ul></li></ul>', N'<ol><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Nấm hương là nguồn cung cấp chất xơ, protein, vitamin B (đặc biệt là B2, B5, B12), vitamin D và khoáng chất như sắt, kali và mangan.</li><li>Nấm hương cũng chứa nhiều hợp chất chống oxy hóa, giúp bảo vệ cơ thể khỏi các tác động có hại của gốc tự do.</li><li>Nấm hương ít calo và có hàm lượng chất béo thấp, rất phù hợp cho những người ăn kiêng hoặc muốn duy trì sức khỏe.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Tăng cường hệ miễn dịch:</strong> Nấm hương chứa các polysaccharides như lentinans, giúp kích thích hệ thống miễn dịch và chống lại các bệnh nhiễm trùng.</li><li><strong>Chống ung thư:</strong> Các nghiên cứu cho thấy nấm hương có thể giúp ngăn ngừa một số loại ung thư nhờ vào các chất chống oxy hóa và hợp chất lentinans có trong nấm.</li><li><strong>Cải thiện sức khỏe tim mạch:</strong> Nấm hương có tác dụng giảm cholesterol xấu và cải thiện tuần hoàn máu, giúp bảo vệ sức khỏe tim mạch.</li><li><strong>Hỗ trợ giảm cân:</strong> Nấm hương ít calo nhưng giàu chất xơ, giúp tạo cảm giác no lâu và giảm cảm giác thèm ăn, hỗ trợ trong việc giảm cân.</li><li><strong>Tốt cho gan:</strong> Các nghiên cứu cũng cho thấy nấm hương có thể hỗ trợ bảo vệ gan khỏi các tác nhân gây hại.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Gia vị và thành phần trong món ăn:</strong> Nấm hương được sử dụng trong nhiều món ăn như súp, canh, xào, nướng và các món ăn chay.</li><li><strong>Món ăn đặc trưng:</strong> Một số món nổi tiếng có nấm hương như súp nấm hương, gà nấu nấm hương, nấm hương xào thịt bò, hay món lẩu nấm.</li><li><strong>Nấm khô:</strong> Nấm hương khô được sử dụng rộng rãi trong ẩm thực châu Á. Sau khi ngâm nấm khô, bạn có thể dùng phần nước ngâm để làm nước dùng hoặc nấu canh, vì nước này có vị ngọt thanh đặc trưng.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li><strong>Cách chế biến:</strong> Nếu sử dụng nấm hương khô, bạn cần ngâm nấm trong nước ấm khoảng 20-30 phút để nấm mềm và có thể sử dụng. Phần nước ngâm nấm có thể dùng làm nước dùng rất ngon.</li><li><strong>Bảo quản:</strong> Nấm hương tươi nên được bảo quản trong tủ lạnh và tiêu thụ trong vòng vài ngày. Nấm hương khô có thể bảo quản lâu dài ở nơi khô ráo và thoáng mát.</li></ul></li></ol><h3>Lưu ý khi mua nấm hương:</h3><ul><li>Khi mua nấm hương, hãy chọn những cây nấm có mũ nấm khô, không bị nứt hoặc dập nát.</li><li>Nấm tươi nên có màu sắc tươi sáng, không có mùi lạ hay hư hỏng.</li></ul>', CAST(N'2024-12-31T10:56:08.5994624' AS DateTime2), CAST(N'2024-12-31T10:56:08.5994638' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (38, 59, N'<ul><li><strong>Tên gọi:</strong> Nấm đùi gà (tên khoa học: <i>Macrolepiota procera</i>), còn gọi là "nấm đùi gà" do hình dáng của nó giống với chân gà.</li><li><strong>Nguồn gốc:</strong> Nấm đùi gà là loài nấm mọc hoang dại ở các khu rừng châu Âu, châu Á và Bắc Mỹ. Hiện nay, nấm đùi gà cũng được trồng và tiêu thụ ở nhiều nơi trên thế giới, nhất là trong các nền ẩm thực châu Á.</li><li><strong>Đặc điểm:</strong><ul><li>Nấm đùi gà có mũ nấm lớn, dạng dẹt và có màu trắng hoặc hơi ngả vàng. Phần thân nấm dài, giống như đùi gà, thường có màu trắng hoặc xám nhạt.</li><li>Mũ nấm có đường kính lớn, có các vảy nhỏ trên bề mặt, trông giống như vảy da gà.</li><li>Thịt nấm dày, chắc và có hương vị thơm ngon, khi chế biến có cảm giác giòn như thịt gà.</li></ul></li></ul>', N'<ol><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Nấm đùi gà là nguồn cung cấp nhiều dưỡng chất như chất xơ, protein, vitamin D, vitamin B, và các khoáng chất quan trọng như kali, sắt, magie.</li><li>Nó cũng chứa các axit amin thiết yếu, có lợi cho sức khỏe, giúp tăng cường sức đề kháng và hỗ trợ phục hồi cơ thể.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Cải thiện sức khỏe tim mạch:</strong> Nấm đùi gà giàu kali, giúp cân bằng huyết áp và bảo vệ sức khỏe tim mạch.</li><li><strong>Tăng cường hệ miễn dịch:</strong> Nấm đùi gà chứa các polysaccharides, có khả năng tăng cường hệ miễn dịch, giúp cơ thể chống lại bệnh tật.</li><li><strong>Hỗ trợ tiêu hóa:</strong> Với lượng chất xơ cao, nấm đùi gà giúp cải thiện hệ tiêu hóa, làm dịu dạ dày và hỗ trợ chức năng ruột.</li><li><strong>Chống oxy hóa:</strong> Các hợp chất trong nấm đùi gà có khả năng chống lại các gốc tự do, giúp giảm nguy cơ mắc các bệnh mãn tính và lão hóa sớm.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Món ăn đặc trưng:</strong> Nấm đùi gà có thể được chế biến thành nhiều món ăn khác nhau, từ nướng, xào, nấu canh cho đến làm món salad.</li><li><strong>Sử dụng trong các món ăn chay:</strong> Nấm đùi gà là lựa chọn lý tưởng trong các món ăn chay nhờ có kết cấu thịt chắc, giòn và hương vị hấp dẫn, dễ dàng thay thế cho thịt.</li><li><strong>Các món nướng và xào:</strong> Nấm đùi gà thường được xào với các nguyên liệu khác như rau củ, thịt gà, hoặc thịt bò. Cũng có thể nướng nấm với gia vị cho hương vị đậm đà.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li><strong>Cách chế biến:</strong> Nấm đùi gà có thể được chế biến tươi hoặc khô. Khi chế biến nấm tươi, cần phải làm sạch và loại bỏ các phần không ăn được. Nấm đùi gà khô có thể ngâm trong nước ấm trước khi sử dụng.</li><li><strong>Bảo quản:</strong> Nấm đùi gà tươi cần bảo quản trong tủ lạnh và nên sử dụng trong vòng vài ngày. Nếu nấm khô, có thể bảo quản ở nơi khô ráo và thoáng mát, sử dụng trong thời gian dài hơn.</li></ul></li></ol><h3>Lưu ý khi mua nấm đùi gà:</h3><ul><li>Chọn nấm đùi gà có mũ sáng màu, không có dấu hiệu hư hỏng hay nấm mốc.</li><li>Tránh mua nấm đùi gà nếu có dấu hiệu nấm bị nứt hoặc có màu sắc không đều.</li></ul>', CAST(N'2024-12-31T11:00:10.1242963' AS DateTime2), CAST(N'2024-12-31T11:00:10.1242975' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (39, 60, N'<ul><li><strong>Tên gọi:</strong> Nấm tuyết (tên khoa học: <i>Tremella fuciformis</i>), còn gọi là "nấm đông cô tuyết" hay "nấm bạch tuyết".</li><li><strong>Nguồn gốc:</strong> Nấm tuyết là loài nấm ăn được, mọc hoang dại trên các cây gỗ mục trong các khu rừng nhiệt đới và cận nhiệt đới, chủ yếu ở châu Á, đặc biệt là Trung Quốc, Nhật Bản và các khu vực Đông Nam Á.</li><li><strong>Đặc điểm:</strong><ul><li>Nấm tuyết có hình dáng đặc biệt với các sợi nấm mảnh, trắng như tuyết, mềm mại và trong suốt.</li><li>Khi tươi, nấm có màu trắng, mềm và có kết cấu như gel. Khi khô, nấm tuyết có màu trắng đục và giòn.</li><li>Nấm tuyết thường được thu hoạch khi còn tươi hoặc sau khi đã được làm khô.</li></ul></li></ul>', N'<ol><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Nấm tuyết rất giàu chất xơ, giúp hỗ trợ hệ tiêu hóa và cải thiện chức năng ruột.</li><li>Nấm tuyết cũng cung cấp nhiều vitamin B, vitamin D và các khoáng chất như sắt, kali, và magiê.</li><li>Ngoài ra, nấm tuyết còn chứa các polysaccharides, đặc biệt là β-glucan, có tác dụng nâng cao khả năng miễn dịch.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Cải thiện sức khỏe da:</strong> Nấm tuyết có tính chất giữ ẩm và chống lão hóa, giúp làn da mềm mịn, săn chắc và có thể làm giảm các nếp nhăn.</li><li><strong>Chống oxy hóa:</strong> Với khả năng chống oxy hóa mạnh mẽ, nấm tuyết giúp ngăn ngừa tổn thương tế bào và hỗ trợ cơ thể chống lại các bệnh mãn tính.</li><li><strong>Hỗ trợ hệ miễn dịch:</strong> Các hợp chất polysaccharides trong nấm tuyết có tác dụng kích thích hệ miễn dịch, giúp cơ thể chống lại vi khuẩn và virus.</li><li><strong>Tăng cường sức khỏe tim mạch:</strong> Nấm tuyết giúp giảm mức cholesterol xấu (LDL), bảo vệ tim mạch và tăng cường tuần hoàn máu.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Món ăn đặc trưng:</strong> Nấm tuyết thường được sử dụng trong các món canh, cháo, chè, và các món hầm. Nó được biết đến trong các món ăn châu Á, đặc biệt là Trung Quốc và Việt Nam.</li><li><strong>Chế biến với các nguyên liệu khác:</strong> Nấm tuyết có thể được chế biến cùng với các nguyên liệu như long nhãn, táo đỏ, hạt sen trong các món chè ngọt hoặc nấu chung với thịt gà, sườn heo trong các món canh bổ dưỡng.</li><li><strong>Món tráng miệng:</strong> Nấm tuyết thường được dùng trong các món tráng miệng, đặc biệt là trong các món chè thanh mát, có tác dụng giải nhiệt rất tốt trong mùa hè.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li><strong>Cách chế biến:</strong> Khi chế biến nấm tuyết, nấm khô thường được ngâm trong nước ấm khoảng 30 phút để phục hồi lại hình dáng và kết cấu ban đầu. Sau khi nấm được làm mềm, có thể thêm vào các món canh, chè hoặc các món hầm.</li><li><strong>Bảo quản:</strong> Nấm tuyết khô có thể được bảo quản trong thời gian dài ở nơi khô ráo, thoáng mát. Nấm tươi cần được bảo quản trong tủ lạnh và nên được sử dụng trong vài ngày sau khi mua.</li></ul></li></ol><h3>Lưu ý khi mua nấm tuyết:</h3><ul><li>Chọn nấm tuyết tươi có màu trắng sáng, không có vết thâm hoặc mốc. Nấm khô nên có màu trắng đục, không có dấu hiệu hư hỏng.</li><li>Khi mua nấm khô, có thể nhìn vào độ giòn của nấm. Nếu nấm mềm hoặc có mùi lạ, nên tránh mua.</li></ul>', CAST(N'2024-12-31T11:03:37.2185250' AS DateTime2), CAST(N'2024-12-31T11:03:37.2185269' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (40, 61, N'<ul><li><strong>Tên gọi:</strong> Nấm Matsutake (tên khoa học: <i>Tricholoma matsutake</i>), là một trong những loại nấm quý hiếm và đắt giá nhất trên thế giới.</li><li><strong>Nguồn gốc:</strong> Nấm Matsutake chủ yếu được tìm thấy ở các khu vực Đông Á, đặc biệt là Nhật Bản, Hàn Quốc và Trung Quốc. Nó cũng xuất hiện ở Bắc Mỹ và châu Âu, nhưng số lượng rất ít.</li><li><strong>Đặc điểm:</strong><ul><li>Nấm Matsutake có hình dáng tương tự như một cây nấm thông thường nhưng có mũ nấm hình chóp, màu nâu nhạt hoặc đỏ tía, với chân nấm cao và dày.</li><li>Mùi hương của nấm Matsutake rất đặc trưng và mạnh mẽ, được miêu tả là hương thơm của rừng thông, có sự kết hợp của hương vị cay, thơm và ngọt.</li><li>Nấm Matsutake thường mọc dưới đất trong các khu rừng thông, đặc biệt là trong môi trường rừng có độ ẩm cao.</li></ul></li></ul>', N'<ol><li><strong>Giá trị dinh dưỡng:</strong><ul><li>Nấm Matsutake rất giàu protein và các axit amin thiết yếu, cung cấp năng lượng và dinh dưỡng cho cơ thể.</li><li>Loại nấm này còn chứa nhiều khoáng chất như kali, phốt pho, sắt và magiê, có lợi cho sức khỏe tổng thể.</li><li>Cũng giống như nhiều loại nấm khác, nấm Matsutake chứa các chất chống oxy hóa, giúp bảo vệ tế bào khỏi tổn thương do các gốc tự do.</li></ul></li><li><strong>Lợi ích sức khỏe:</strong><ul><li><strong>Tăng cường miễn dịch:</strong> Nấm Matsutake có khả năng tăng cường hệ miễn dịch nhờ các hợp chất polysaccharides, giúp cơ thể chống lại bệnh tật và nhiễm trùng.</li><li><strong>Chống ung thư:</strong> Nấm Matsutake chứa các hợp chất như acid tricholomic và các polysaccharides có khả năng làm chậm sự phát triển của tế bào ung thư.</li><li><strong>Hỗ trợ tiêu hóa:</strong> Các chất xơ trong nấm Matsutake giúp cải thiện chức năng tiêu hóa và tăng cường sức khỏe ruột.</li><li><strong>Chống viêm:</strong> Nấm Matsutake có đặc tính chống viêm, giúp giảm các triệu chứng viêm nhiễm và đau nhức.</li></ul></li><li><strong>Ứng dụng trong ẩm thực:</strong><ul><li><strong>Món ăn đặc trưng:</strong> Nấm Matsutake được sử dụng trong các món ăn cao cấp, đặc biệt là trong các món như cơm nấm Matsutake (matsutake gohan), súp nấm (matsutake soup) hoặc nướng nấm cùng với các nguyên liệu khác.</li><li><strong>Chế biến:</strong> Với hương vị đặc trưng, nấm Matsutake thường được chế biến một cách đơn giản để giữ nguyên hương vị tự nhiên. Một trong những cách chế biến phổ biến là nấu cơm với nấm Matsutake hoặc chế biến nấm trong các món súp thanh đạm.</li><li><strong>Giới hạn sử dụng:</strong> Vì giá trị cao và hương vị đặc biệt, nấm Matsutake thường được sử dụng trong các dịp đặc biệt và là một nguyên liệu quý trong ẩm thực Nhật Bản và các nền ẩm thực Á Đông khác.</li></ul></li><li><strong>Lưu ý khi sử dụng:</strong><ul><li><strong>Cách chế biến:</strong> Nấm Matsutake có mùi hương rất đặc trưng, vì vậy chỉ cần chế biến một cách đơn giản để giữ được hương vị tự nhiên. Nấm có thể được nướng, xào hoặc chế biến cùng với cơm.</li><li><strong>Bảo quản:</strong> Nấm Matsutake tươi rất dễ hỏng, vì vậy cần được sử dụng ngay sau khi mua. Nếu không sử dụng ngay, nấm Matsutake có thể được bảo quản trong tủ lạnh trong vòng 2-3 ngày.</li><li><strong>Sử dụng nấm khô:</strong> Nấm Matsutake khô có thể bảo quản lâu hơn và thường được sử dụng trong các món ăn cao cấp. Khi sử dụng nấm khô, nên ngâm nấm trong nước ấm trước khi chế biến.</li></ul></li></ol><h3>Lưu ý khi mua nấm Matsutake:</h3><ul><li><strong>Chọn nấm tươi:</strong> Nấm Matsutake tươi có màu sắc tươi sáng, không bị héo hay khô. Hương thơm đặc trưng của nấm cũng là dấu hiệu cho thấy nấm còn tươi.</li><li><strong>Chọn nấm khô:</strong> Khi chọn nấm Matsutake khô, bạn nên chọn những miếng nấm khô cứng, không có dấu hiệu mốc hoặc ẩm ướt. Nấm khô thường có hương thơm mạnh mẽ hơn so với nấm tươi.</li></ul><h3>Giá trị cao:</h3><p>Nấm Matsutake có giá trị rất cao trên thị trường, thường được coi là một món quà quý giá ở Nhật Bản, đặc biệt vào mùa thu. Vì sự khan hiếm và khó thu hoạch, nấm Matsutake có thể có giá hàng nghìn USD mỗi kilogram.</p>', CAST(N'2024-12-31T11:08:29.0534196' AS DateTime2), CAST(N'2024-12-31T11:08:29.0534203' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (41, 62, N'<ul><li><strong>Tên sản phẩm:</strong> Bia Tiger</li><li><strong>Nhà sản xuất:</strong> Asia Pacific Breweries (APB) - nay thuộc sở hữu của Heineken.</li><li><strong>Nguồn gốc:</strong> Bia Tiger được sản xuất lần đầu tiên tại Singapore vào năm 1932.</li><li><strong>Loại bia:</strong> Bia lager, với đặc trưng là vị đắng nhẹ, mùi thơm đặc trưng và sự kết hợp giữa hương vị ngọt và đắng.</li></ul>', N'<ul><li><strong>Tên sản phẩm:</strong> Bia Tiger</li><li><strong>Nhà sản xuất:</strong> Asia Pacific Breweries (APB) - nay thuộc sở hữu của Heineken.</li><li><strong>Nguồn gốc:</strong> Bia Tiger được sản xuất lần đầu tiên tại Singapore vào năm 1932.</li><li><strong>Loại bia:</strong> Bia lager, với đặc trưng là vị đắng nhẹ, mùi thơm đặc trưng và sự kết hợp giữa hương vị ngọt và đắng.</li></ul><h3>Đặc điểm của Bia Tiger:</h3><ol><li><strong>Màu sắc:</strong><ul><li>Bia Tiger có màu vàng nhạt trong suốt, với lớp bọt trắng mịn khi rót ra.</li></ul></li><li><strong>Vị:</strong><ul><li>Bia Tiger nổi bật với vị đắng nhẹ, không quá gắt, nhưng lại rất mượt mà và dễ uống. Có sự kết hợp của một chút ngọt và chút đắng, giúp tạo nên hương vị cân bằng.</li></ul></li><li><strong>Nồng độ cồn:</strong><ul><li>Bia Tiger có nồng độ cồn khoảng 5%, một mức vừa phải, phù hợp để thưởng thức trong các bữa tiệc hoặc dịp giải trí.</li></ul></li><li><strong>Đóng gói:</strong><ul><li>Bia Tiger thường được bán trong các chai 330ml, lon 330ml hoặc 500ml. Sản phẩm cũng có thể được đóng thùng với các dung tích lớn hơn.</li></ul></li></ol><h3>Lịch sử và phát triển:</h3><p>Bia Tiger ra đời vào năm 1932 tại Singapore, trở thành một trong những thương hiệu bia nổi tiếng ở khu vực Đông Nam Á. Thương hiệu này thuộc sở hữu của Asia Pacific Breweries (APB), một công ty được thành lập vào năm 1931 và hiện nay là một phần của Heineken. Bia Tiger đã trở thành biểu tượng không chỉ ở Singapore mà còn tại nhiều quốc gia trong khu vực và trên thế giới.</p><h3>Sự nổi tiếng:</h3><p>Bia Tiger không chỉ phổ biến ở Singapore mà còn ở nhiều quốc gia khác như Malaysia, Thái Lan, Việt Nam và các quốc gia trong khu vực Đông Nam Á. Nó được biết đến với sự kết hợp hoàn hảo giữa chất lượng và giá trị, là một trong những loại bia tiêu biểu của Đông Nam Á.</p><h3>Ứng dụng và kết hợp ẩm thực:</h3><ul><li><strong>Món ăn phù hợp:</strong> Bia Tiger thường được thưởng thức cùng với các món ăn nướng, hải sản, các món ăn nhẹ hoặc trong các buổi tiệc bạn bè, gặp gỡ. Vị bia nhẹ nhàng của nó giúp làm tăng sự ngon miệng khi kết hợp với các món ăn giàu gia vị.</li><li><strong>Thưởng thức:</strong> Bia Tiger ngon nhất khi được uống lạnh. Đặc biệt là khi đi cùng với không khí thư giãn, hoặc các buổi tiệc ngoài trời.</li></ul><h3>Các loại bia Tiger:</h3><ul><li><strong>Bia Tiger Lager:</strong> Là sản phẩm bia chính của thương hiệu, bia Tiger Lager nổi bật với vị đắng nhẹ nhàng và dễ uống.</li><li><strong>Bia Tiger Crystal:</strong> Là một phiên bản bia nhẹ hơn, phù hợp cho những ai yêu thích loại bia ít đắng và ít calo.</li><li><strong>Bia Tiger Black:</strong> Đây là một phiên bản bia đen (stout) với vị đậm đà và hơi ngọt, khác biệt so với các dòng bia lager.</li></ul>', CAST(N'2024-12-31T11:13:22.2265244' AS DateTime2), CAST(N'2024-12-31T11:13:22.2265244' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (42, 63, N'<ul><li><strong>Tên sản phẩm:</strong> Heineken Lùn (Heineken Mini Keg)</li><li><strong>Nhà sản xuất:</strong> Heineken N.V.</li><li><strong>Nguồn gốc:</strong> Heineken là một trong những thương hiệu bia nổi tiếng thế giới, được thành lập tại Hà Lan vào năm 1864 bởi Gerard Adriaan Heineken. Sản phẩm Heineken Lùn (còn gọi là Heineken Mini Keg) là một phiên bản bia đặc biệt của Heineken, được đóng trong thùng nhỏ gọn (mini keg) với dung tích 5L.</li></ul>', N'<ol><li><strong>Màu sắc:</strong><ul><li>Bia Heineken Lùn có màu vàng nhạt, trong suốt và sáng, với lớp bọt trắng mịn khi được rót ra.</li></ul></li><li><strong>Vị:</strong><ul><li>Heineken nổi bật với vị bia lager đặc trưng, hơi đắng, kết hợp với hương thơm nhẹ nhàng và mượt mà. Vị bia này phù hợp cho những ai yêu thích sự nhẹ nhàng, dễ uống.</li></ul></li><li><strong>Nồng độ cồn:</strong><ul><li>Heineken Lùn có nồng độ cồn khoảng 5%, tương tự như Heineken truyền thống.</li></ul></li><li><strong>Đóng gói:</strong><ul><li>Heineken Lùn được đóng trong thùng mini keg dung tích 5L, giúp người dùng có thể thưởng thức bia tươi trong thời gian dài mà không lo ngại bia bị hư hỏng. Thùng này có thể dễ dàng sử dụng với thiết bị rót bia chuyên dụng hoặc đơn giản là mở nắp và rót vào ly.</li></ul></li></ol><h3>Ưu điểm của Heineken Lùn:</h3><ol><li><strong>Tiện lợi và tiết kiệm:</strong><ul><li>Heineken Lùn rất tiện lợi cho các buổi tiệc, sự kiện gia đình hoặc bạn bè, vì dung tích 5L phù hợp với nhu cầu của một nhóm nhỏ hoặc vừa.</li></ul></li><li><strong>Giữ được độ tươi:</strong><ul><li>Thùng mini keg giúp bảo quản bia tươi lâu hơn, bạn có thể thưởng thức bia trong vài ngày mà không lo bia bị mất đi hương vị.</li></ul></li><li><strong>Dễ dàng sử dụng:</strong><ul><li>Heineken Lùn có thể dễ dàng rót ra ly và thưởng thức ngay, giúp bạn tận hưởng bia tươi mà không cần phải đi đến quán bar hay mua bia chai thông thường.</li></ul></li></ol><h3>Sự nổi bật của Heineken Lùn:</h3><ul><li><strong>Phong cách thú vị:</strong> Heineken Lùn không chỉ mang đến một trải nghiệm bia tươi tuyệt vời, mà còn mang lại sự thú vị khi sử dụng thùng bia nhỏ gọn này trong các buổi tiệc hoặc dịp đặc biệt.</li><li><strong>Dễ dàng bảo quản:</strong> Do đóng gói trong thùng 5L, Heineken Lùn có thể được bảo quản trong tủ lạnh hoặc nơi thoáng mát mà không lo bia bị biến chất nhanh chóng.</li></ul><h3>Ứng dụng và kết hợp ẩm thực:</h3><ul><li><strong>Món ăn phù hợp:</strong> Heineken Lùn rất thích hợp để thưởng thức cùng các món ăn như pizza, đồ nướng, hải sản, hay các món ăn nhẹ trong các buổi tiệc ngoài trời.</li><li><strong>Thưởng thức:</strong> Bia Heineken Lùn ngon nhất khi được uống lạnh, giúp mang lại sự sảng khoái và dễ chịu khi thưởng thức.</li></ul><h3>Tổng kết:</h3><p>Heineken Lùn (Heineken Mini Keg) là lựa chọn lý tưởng cho những ai yêu thích bia tươi của Heineken và muốn tận hưởng bia trong không gian riêng tư hoặc trong các buổi tụ họp bạn bè. Thùng mini keg không chỉ giúp bảo quản bia lâu dài mà còn mang lại trải nghiệm uống bia thú vị, tiện lợi và dễ dàng sử dụng.</p>', CAST(N'2024-12-31T11:17:06.4276041' AS DateTime2), CAST(N'2024-12-31T11:17:06.4276052' AS DateTime2))
INSERT [dbo].[chitiets] ([Id], [sanphams_id], [mo_ta_chung], [bai_viet], [Created_at], [Updated_at]) VALUES (43, 64, N'<p>asd</p>', N'<p>asd</p>', CAST(N'2025-01-08T10:11:23.6433164' AS DateTime2), CAST(N'2025-01-08T10:11:23.6433165' AS DateTime2))
SET IDENTITY_INSERT [dbo].[chitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[Dactrungs] ON 

INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (5, N'icon/ae5d4857-9009-4dc9-af0d-1c90e604d99a.webp', N'Miễn phí vận chuyển toàn quốc', N'Nhận ngay ưu đãi giao hàng miễn phí cho mọi đơn hàng từ 200.000 VNĐ	', 1, CAST(N'2024-12-16T17:30:09.7101009' AS DateTime2), CAST(N'2024-12-17T10:04:09.8558077' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (6, N'icon/da0ce9d6-d95a-4c57-bd78-02e28249af39.webp', N'Đổi trả dễ dàng trong 7 ngày', N'Yên tâm mua sắm với chính sách đổi trả miễn phí trong 7 ngày đầu tiên', 2, CAST(N'2024-12-16T17:30:35.3753168' AS DateTime2), CAST(N'2024-12-17T10:04:05.7037071' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (7, N'icon/278ff881-2cd6-4935-9677-770aecce9d64.jpg', N'Siêu khuyến mãi - Giảm giá lên đến 50%', N'Mua sắm ngay hôm nay để nhận ưu đãi lớn trên tất cả các sản phẩm yêu thích của bạn', 3, CAST(N'2024-12-16T17:32:48.3770465' AS DateTime2), CAST(N'2025-01-05T03:19:05.8188205' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[Dactrungs] ([ID], [Icon], [Tieude], [Phude], [Thutuhienthi], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'icon/0f3c4fba-f580-4637-9e3c-dc3e656b2571.webp', N'Sản phẩm chất lượng - An toàn cho sức khỏe', N'Cam kết mang đến cho bạn những sản phẩm đạt chuẩn chất lượng, nguồn gốc rõ ràng', 4, CAST(N'2024-12-16T17:34:21.7506897' AS DateTime2), CAST(N'2024-12-17T10:04:18.4803655' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[Dactrungs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] ON 

INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (23, 37, N'Nguyễn Văn A', N'Nho ngọt', 5, N'Nho ngon ngọt chua vừa tốt', CAST(N'2024-12-17T22:53:21.9716450' AS DateTime2), CAST(N'2024-12-17T22:53:21.9716468' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (24, 40, N'Nguyễn Văn B', N'Rau tươi', 5, N'rau tươi shop bán hàng chất lượng giao hàng nhanh', CAST(N'2024-12-18T14:13:51.9396561' AS DateTime2), CAST(N'2024-12-18T14:13:51.9396575' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (31, 35, N'Dương Quốc Vũ', N'Trái cây ngon', 4, N'Dâu ngon  ngọt nhưng  giao hàng bị dập cho 4 sao ', CAST(N'2024-12-18T21:40:48.9504784' AS DateTime2), CAST(N'2024-12-18T21:40:48.9504809' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (32, 61, N'khai', N'ngon', 5, N'ngon nhung hoi mac', CAST(N'2024-12-31T11:09:55.5748253' AS DateTime2), CAST(N'2024-12-31T11:09:55.5748265' AS DateTime2))
INSERT [dbo].[danhgiakhachhangs] ([Id], [sanphams_id], [ho_ten], [tieude], [so_sao], [noi_dung], [Created_at], [Updated_at]) VALUES (33, 34, N'Quốc Vũ', N'Sản phẩm tốt', 5, N'Cam ngon ngọt tươi như quảng cáo', CAST(N'2025-01-04T14:51:14.5445022' AS DateTime2), CAST(N'2025-01-04T14:51:14.5445039' AS DateTime2))
SET IDENTITY_INSERT [dbo].[danhgiakhachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[danhmucsanpham] ON 

INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (1, N'Trái cây tươi ', CAST(N'2024-11-23T15:41:48.5484627' AS DateTime2), CAST(N'2025-01-12T16:57:08.6719502' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (2, N'Rau củ ', CAST(N'2024-11-23T15:42:34.5048992' AS DateTime2), CAST(N'2024-11-23T15:42:34.5048993' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (21, N'Nấm các loại', CAST(N'2024-12-28T17:44:11.4992947' AS DateTime2), CAST(N'2024-12-28T17:44:11.4992955' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[danhmucsanpham] ([ID], [Name], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (23, N'Nước uống có cồn', CAST(N'2024-12-28T17:44:31.5533776' AS DateTime2), CAST(N'2024-12-28T17:44:31.5533788' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
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

INSERT [dbo].[Footers] ([Id], [NoiDungFooter], [Created_at], [Updated_at], [TrangThai], [updatedBy], [CreatedBy]) VALUES (21, N'<p>Trái Cây Tươi - Tất cả các quyền được bảo hộ. Thiết kế bởi HTML Codex và phân phối bởi ThemeWagon. V1.1.5</p>', CAST(N'2024-12-16T17:48:50.080' AS DateTime), CAST(N'2025-01-09T13:19:19.570' AS DateTime), 1, N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[Footers] OFF
GO
SET IDENTITY_INSERT [dbo].[ghn_orders] ON 

INSERT [dbo].[ghn_orders] ([id], [ghn_order_id], [client_order_code], [status], [created_at], [updated_at], [UpdatedBy]) VALUES (14, N'LPG9Y8', N'GW9H2UUQ', N'picked', CAST(N'2025-01-16T12:55:27.373' AS DateTime), CAST(N'2025-01-16T12:55:27.373' AS DateTime), N'Dương Quốc Vũ')
INSERT [dbo].[ghn_orders] ([id], [ghn_order_id], [client_order_code], [status], [created_at], [updated_at], [UpdatedBy]) VALUES (15, N'LPG9YY', N'RRE5M2MY', N'returned', CAST(N'2025-01-16T13:21:51.917' AS DateTime), CAST(N'2025-01-16T13:21:51.917' AS DateTime), N'Dương Quốc Vũ')
INSERT [dbo].[ghn_orders] ([id], [ghn_order_id], [client_order_code], [status], [created_at], [updated_at], [UpdatedBy]) VALUES (17, N'LPGKEL', N'OR3RY0S2', N'delivered', CAST(N'2025-01-16T17:35:45.980' AS DateTime), CAST(N'2025-01-16T17:35:45.980' AS DateTime), N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[ghn_orders] OFF
GO
SET IDENTITY_INSERT [dbo].[gioithieu] ON 

INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'Câu chuyện thương hiệu', N'Morning Fruit là đơn vị chuyên cung cấp trái cây tươi chất lượng cao, từ các nhà vườn trong nước và nhập khẩu. Sứ mệnh của chúng tôi là mang đến những sản phẩm trái cây tươi ngon, giàu dinh dưỡng, đảm bảo an toàn vệ sinh thực phẩm cho khách hàng.', N'<p>Morning Fruit được hình thành từ niềm đam mê với nông nghiệp và sức khỏe cộng đồng. Chúng tôi hiểu rằng, mỗi quả táo, chùm nho hay từng quả bơ không chỉ là thực phẩm, mà còn là những món quà từ thiên nhiên, mang lại giá trị về sức khỏe và tinh thần.</p><p><strong>Tại sao chọn Morning Fruit?</strong></p><ul><li><strong>Chất lượng đảm bảo</strong>: Tất cả các sản phẩm đều được lựa chọn kỹ lưỡng từ các nhà vườn uy tín, trải qua quy trình kiểm tra nghiêm ngặt.</li><li><strong>Nguồn gốc rõ ràng</strong>: Trái cây của chúng tôi được nhập từ những quốc gia nổi tiếng về nông nghiệp như Úc, Mỹ, Nhật Bản và các nhà vườn trong nước.</li><li><strong>Dịch vụ tận tâm</strong>: Morning Fruit luôn đặt sự hài lòng của khách hàng lên hàng đầu. Chúng tôi không chỉ cung cấp sản phẩm mà còn mang đến trải nghiệm mua sắm thân thiện, tiện lợi.</li></ul><p><strong>Sứ mệnh của chúng tôi</strong><br>Morning Fruit hướng tới mục tiêu không chỉ trở thành một thương hiệu trái cây mà còn là người bạn đồng hành của mọi gia đình trong hành trình chăm sóc sức khỏe. Chúng tôi tin rằng, sức khỏe là tài sản quý giá nhất và mỗi trái cây tươi ngon mà chúng tôi mang đến sẽ là một phần trong hành trình gìn giữ tài sản này.</p><p><strong>Định hướng tương lai</strong><br>Morning Fruit không ngừng cải tiến và mở rộng, với mong muốn đưa sản phẩm Việt Nam vươn xa và tiếp cận với khách hàng trên toàn thế giới. Chúng tôi hy vọng có thể lan tỏa tình yêu trái cây đến mọi người, mọi nhà.</p><p><strong>Morning Fruit - Trái cây sạch, yêu thương trao tay!</strong></p>', 1, CAST(N'2024-12-16T18:00:02.103' AS DateTime), CAST(N'2024-12-16T18:00:02.103' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[gioithieu] ([id], [tieu_de], [phu_de], [noi_dung], [trang_thai], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'Khám Phá Câu Chuyện Đằng Sau Thành Công Của Chúng Tôi', N'Chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến những giá trị ý nghĩa cho cộng đồng.', N'<p><strong>Hành trình bắt đầu từ những điều giản dị</strong><br>Morning Fruit được khởi nguồn từ niềm đam mê với nông sản và mong muốn lan tỏa giá trị tốt đẹp đến từng gia đình. Chúng tôi hiểu rằng mỗi trái cây không chỉ đơn thuần là thực phẩm mà còn mang theo tình yêu và công sức của người nông dân.</p><p><strong>Cam kết của chúng tôi</strong></p><ul><li><strong>Đồng hành cùng nông dân</strong>: Morning Fruit hỗ trợ các nhà vườn địa phương trong việc cải thiện chất lượng sản phẩm, đưa nông sản Việt đến gần hơn với người tiêu dùng trong và ngoài nước.</li><li><strong>Đóng góp cho cộng đồng</strong>: Chúng tôi luôn hướng tới các hoạt động ý nghĩa như hỗ trợ thực phẩm cho những hoàn cảnh khó khăn, thúc đẩy lối sống lành mạnh với trái cây sạch.</li></ul><p><strong>Sức mạnh từ sự ủng hộ của khách hàng</strong><br>Sự thành công của Morning Fruit không thể thiếu đi niềm tin và sự đồng hành từ khách hàng. Từng đơn hàng được hoàn thành không chỉ là một giao dịch mà còn là một lời cảm ơn chân thành từ chúng tôi.</p><p><strong>Những giá trị chúng tôi mang lại</strong><br>Không chỉ dừng lại ở sản phẩm chất lượng, Morning Fruit luôn hy vọng mỗi sản phẩm của mình sẽ trở thành một phần kỷ niệm đẹp trong cuộc sống hàng ngày của khách hàng.</p><p><strong>Hành trình tương lai</strong><br>Morning Fruit sẽ tiếp tục đổi mới và phát triển để không chỉ trở thành một thương hiệu, mà còn là một nguồn cảm hứng cho lối sống xanh, bền vững và tràn đầy năng lượng tích cực.</p>', 0, CAST(N'2024-12-16T18:00:41.670' AS DateTime), CAST(N'2024-12-16T18:00:41.670' AS DateTime), N'Phạm Khắc Khải', N'Dương Quốc Vũ')
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
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (174, 46, N'hinhanhphu\94b07a5e-3f2d-4320-af73-d5020ae691b6.jpg', CAST(N'2024-12-31T09:42:42.0729974' AS DateTime2), CAST(N'2024-12-31T09:42:42.0730006' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (175, 46, N'hinhanhphu\273201e2-130f-4608-80d3-50e36061b2e1.jpg', CAST(N'2024-12-31T09:42:42.0736828' AS DateTime2), CAST(N'2024-12-31T09:42:42.0736838' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (176, 46, N'hinhanhphu\3e6af65e-afea-4cdd-9387-1d76ebf2c940.jpg', CAST(N'2024-12-31T09:42:42.0752148' AS DateTime2), CAST(N'2024-12-31T09:42:42.0752158' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (177, 52, N'hinhanhphu\2f758b06-5180-46a6-bd2b-a6bbd05968d5.jpg', CAST(N'2024-12-31T10:35:11.7918859' AS DateTime2), CAST(N'2024-12-31T10:35:11.7918869' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (178, 52, N'hinhanhphu\9d752a4d-99ae-4a00-bc0a-d54163febb9a.jpg', CAST(N'2024-12-31T10:35:11.7924964' AS DateTime2), CAST(N'2024-12-31T10:35:11.7924968' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (179, 52, N'hinhanhphu\de2503c7-58e4-452a-a12c-b8e6d627efe4.jpg', CAST(N'2024-12-31T10:35:11.7932110' AS DateTime2), CAST(N'2024-12-31T10:35:11.7932116' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (180, 53, N'hinhanhphu\a29d90b3-ad68-4098-8ecc-18c10cc718d2.jpg', CAST(N'2024-12-31T10:37:55.7002691' AS DateTime2), CAST(N'2024-12-31T10:37:55.7002702' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (181, 53, N'hinhanhphu\1f6a642c-690a-4d7b-ac05-db0b5c009b4d.jpg', CAST(N'2024-12-31T10:37:55.7015496' AS DateTime2), CAST(N'2024-12-31T10:37:55.7015506' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (182, 53, N'hinhanhphu\0d3c06cb-56cc-46dd-a196-d6e8e6f90755.jpg', CAST(N'2024-12-31T10:37:55.7075591' AS DateTime2), CAST(N'2024-12-31T10:37:55.7075611' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (183, 54, N'hinhanhphu\ac76a4cf-d612-4886-9d58-5895cac0ffcf.jpg', CAST(N'2024-12-31T10:40:15.1895930' AS DateTime2), CAST(N'2024-12-31T10:40:15.1895935' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (184, 54, N'hinhanhphu\5c7ab02a-ff58-4b26-9690-cec80341de7b.jpg', CAST(N'2024-12-31T10:40:15.1901957' AS DateTime2), CAST(N'2024-12-31T10:40:15.1901962' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (185, 54, N'hinhanhphu\05a66f7a-a088-4e31-909d-61418c09c838.jpg', CAST(N'2024-12-31T10:40:15.1907790' AS DateTime2), CAST(N'2024-12-31T10:40:15.1907794' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (186, 55, N'hinhanhphu\7b53f016-17e7-4d86-8d7b-5262c8f02dce.jpg', CAST(N'2024-12-31T10:44:16.1101542' AS DateTime2), CAST(N'2024-12-31T10:44:16.1101551' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (187, 55, N'hinhanhphu\543eab8b-5901-4649-bc07-90f5e7bfd6d8.jpg', CAST(N'2024-12-31T10:44:16.1110131' AS DateTime2), CAST(N'2024-12-31T10:44:16.1110138' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (188, 56, N'hinhanhphu\4acc3bb6-b8fb-423a-a15a-3fc3da364789.jpg', CAST(N'2024-12-31T10:47:32.1826207' AS DateTime2), CAST(N'2024-12-31T10:47:32.1826212' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (189, 56, N'hinhanhphu\ba2b6759-10aa-40f3-9913-761378e5737f.jpg', CAST(N'2024-12-31T10:47:32.1835455' AS DateTime2), CAST(N'2024-12-31T10:47:32.1835468' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (190, 56, N'hinhanhphu\dcbef824-5583-40c5-a9b0-307bb4f88c4c.jpg', CAST(N'2024-12-31T10:47:32.1881122' AS DateTime2), CAST(N'2024-12-31T10:47:32.1881135' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (191, 57, N'hinhanhphu\dcd8bae2-1aeb-41dd-b691-6b6eeac524a2.jpg', CAST(N'2024-12-31T10:53:16.8826542' AS DateTime2), CAST(N'2024-12-31T10:53:16.8826556' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (192, 57, N'hinhanhphu\1d080349-9aa8-4455-9030-1e192711b11f.jpg', CAST(N'2024-12-31T10:53:16.8832967' AS DateTime2), CAST(N'2024-12-31T10:53:16.8832973' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (193, 57, N'hinhanhphu\f090ec1e-6958-42d4-9fff-dac348651346.webp', CAST(N'2024-12-31T10:53:16.8867450' AS DateTime2), CAST(N'2024-12-31T10:53:16.8867462' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (194, 58, N'hinhanhphu\16a68e67-9a21-4b58-bb7c-a73802090934.jpg', CAST(N'2024-12-31T10:56:08.6006350' AS DateTime2), CAST(N'2024-12-31T10:56:08.6006358' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (195, 58, N'hinhanhphu\30f189d8-c799-4a7e-9ac7-f8258b2a8d55.jpg', CAST(N'2024-12-31T10:56:08.6020336' AS DateTime2), CAST(N'2024-12-31T10:56:08.6020342' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (196, 58, N'hinhanhphu\bd53d77a-4857-491a-81ce-a4f5de3b1f3a.webp', CAST(N'2024-12-31T10:56:08.6027661' AS DateTime2), CAST(N'2024-12-31T10:56:08.6027667' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (197, 59, N'hinhanhphu\b7dbf2f8-64b2-45dc-a762-c68587d1f0b1.jpg', CAST(N'2024-12-31T11:00:10.1253463' AS DateTime2), CAST(N'2024-12-31T11:00:10.1253480' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (198, 59, N'hinhanhphu\bc711bbd-9881-429b-9ed6-1ad60214293f.jpg', CAST(N'2024-12-31T11:00:10.1259572' AS DateTime2), CAST(N'2024-12-31T11:00:10.1259582' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (199, 59, N'hinhanhphu\b14e3795-b9a5-4360-9cf5-928360ca0d30.jpg', CAST(N'2024-12-31T11:00:10.1265874' AS DateTime2), CAST(N'2024-12-31T11:00:10.1265879' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (200, 60, N'hinhanhphu\3cf20bce-83a9-4edb-bd6e-f3399297b78c.jpg', CAST(N'2024-12-31T11:03:37.2192075' AS DateTime2), CAST(N'2024-12-31T11:03:37.2192085' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (201, 60, N'hinhanhphu\b4d7cb1f-7fd8-4809-8740-bf1f81959afe.jpg', CAST(N'2024-12-31T11:03:37.2201300' AS DateTime2), CAST(N'2024-12-31T11:03:37.2201308' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (202, 60, N'hinhanhphu\17ab68da-52b1-4399-bdeb-a93721e1ad7f.jpg', CAST(N'2024-12-31T11:03:37.2219481' AS DateTime2), CAST(N'2024-12-31T11:03:37.2219490' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (203, 61, N'hinhanhphu\e97a0ebf-0bb1-4c45-84d6-7b007d0997c8.jpg', CAST(N'2024-12-31T11:08:29.0541230' AS DateTime2), CAST(N'2024-12-31T11:08:29.0541238' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (204, 61, N'hinhanhphu\ffa27d0e-6692-4ba9-804b-3d68dee411a9.webp', CAST(N'2024-12-31T11:08:29.0548034' AS DateTime2), CAST(N'2024-12-31T11:08:29.0548040' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (205, 61, N'hinhanhphu\cd771261-5d99-48c9-bd28-46a438c1d41b.jpg', CAST(N'2024-12-31T11:08:29.0552475' AS DateTime2), CAST(N'2024-12-31T11:08:29.0552478' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (206, 62, N'hinhanhphu\f9c1c3cd-28fb-4bc3-b549-e7afedc6051b.jpg', CAST(N'2024-12-31T11:12:29.0651478' AS DateTime2), CAST(N'2024-12-31T11:12:29.0651491' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (207, 62, N'hinhanhphu\5b52eeff-01f4-4911-bb65-13fc89525beb.jpg', CAST(N'2024-12-31T11:12:29.0663695' AS DateTime2), CAST(N'2024-12-31T11:12:29.0663718' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (208, 62, N'hinhanhphu\35d55663-a4d7-467d-b669-f820823d39d6.jpg', CAST(N'2024-12-31T11:12:29.0677887' AS DateTime2), CAST(N'2024-12-31T11:12:29.0677896' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (209, 63, N'hinhanhphu\0cca49b4-6578-4e6d-aecd-1731c1cd0156.jpg', CAST(N'2024-12-31T11:17:06.4294779' AS DateTime2), CAST(N'2024-12-31T11:17:06.4294787' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (210, 63, N'hinhanhphu\db6f581d-f4ff-405b-bfcf-d9d9895a2bc4.jpg', CAST(N'2024-12-31T11:17:06.4301230' AS DateTime2), CAST(N'2024-12-31T11:17:06.4301237' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (211, 64, N'hinhanhphu\eeb9b6f5-0bb3-4034-91da-e6f34e1198b9.jpg', CAST(N'2025-01-08T10:11:08.5152768' AS DateTime2), CAST(N'2025-01-08T10:11:08.5152779' AS DateTime2))
INSERT [dbo].[hinhanh_sanpham] ([Id], [sanphams_id], [hinhanh], [Created_at], [Updated_at]) VALUES (212, 65, N'hinhanhphu\d0ef3ba4-5fb4-423c-9c3f-f07a0614edfe.jpg', CAST(N'2025-01-08T10:15:19.1840881' AS DateTime2), CAST(N'2025-01-08T10:15:19.1840912' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hinhanh_sanpham] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadonchitiets] ON 

INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (18, 18, 35, CAST(250000.00 AS Decimal(18, 2)), 1, CAST(N'2025-01-16T12:55:15.6599561' AS DateTime2), CAST(N'2025-01-16T12:55:15.6599583' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (19, 19, 35, CAST(250000.00 AS Decimal(18, 2)), 1, CAST(N'2025-01-16T13:21:43.6522183' AS DateTime2), CAST(N'2025-01-16T13:21:43.6522197' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (20, 20, 34, CAST(350000.00 AS Decimal(18, 2)), 1, CAST(N'2025-01-16T17:21:59.9557730' AS DateTime2), CAST(N'2025-01-16T17:21:59.9557737' AS DateTime2))
INSERT [dbo].[hoadonchitiets] ([Id], [bill_id], [sanpham_ids], [price], [quantity], [Created_at], [Updated_at]) VALUES (21, 21, 35, CAST(250000.00 AS Decimal(18, 2)), 1, CAST(N'2025-01-16T17:33:25.8879612' AS DateTime2), CAST(N'2025-01-16T17:33:25.8879622' AS DateTime2))
SET IDENTITY_INSERT [dbo].[hoadonchitiets] OFF
GO
SET IDENTITY_INSERT [dbo].[hoadons] ON 

INSERT [dbo].[hoadons] ([Id], [khachhang_id], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy], [thanhtoan], [Total_price], [Ghn]) VALUES (18, 18, N'GW9H2UUQ', N'picked', CAST(N'2025-01-16T12:55:15.5853319' AS DateTime2), CAST(N'2025-01-16T12:55:15.5853335' AS DateTime2), N'Chưa có tác động', N'cod', CAST(250000.000 AS Decimal(18, 3)), N'ready_to_pick')
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy], [thanhtoan], [Total_price], [Ghn]) VALUES (19, 19, N'RRE5M2MY', N'returned', CAST(N'2025-01-16T13:21:43.5638932' AS DateTime2), CAST(N'2025-01-16T16:50:13.0392637' AS DateTime2), N'Dương Quốc Vũ', N'cod', CAST(250000.000 AS Decimal(18, 3)), N'Đã lên đơn')
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy], [thanhtoan], [Total_price], [Ghn]) VALUES (20, 20, N'D46BI6WI', N'Chờ xử lý', CAST(N'2025-01-16T17:21:59.9307686' AS DateTime2), CAST(N'2025-01-16T17:21:59.9307688' AS DateTime2), N'Chưa có tác động', N'cod', CAST(350000.000 AS Decimal(18, 3)), N'Chưa lên đơn')
INSERT [dbo].[hoadons] ([Id], [khachhang_id], [order_code], [status], [Created_at], [Updated_at], [UpdatedBy], [thanhtoan], [Total_price], [Ghn]) VALUES (21, 21, N'OR3RY0S2', N'delivered', CAST(N'2025-01-16T17:33:25.8588870' AS DateTime2), CAST(N'2025-01-16T17:33:25.8588878' AS DateTime2), N'Dương Quốc Vũ', N'cod', CAST(250000.000 AS Decimal(18, 3)), N'Đã lên đơn')
SET IDENTITY_INSERT [dbo].[hoadons] OFF
GO
SET IDENTITY_INSERT [dbo].[khachhangs] ON 

INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (18, N'Vũ', N'Dương Quốc', N'1/3 đường 106', N'Lào Cai', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2025-01-16T12:55:15.2742227' AS DateTime2), CAST(N'2025-01-16T12:55:15.2742239' AS DateTime2), N'Huyện Bảo Thắng', N'Xã Bản Cầm')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (19, N'Vũ', N'Dương Quốc', N'1/3 đường 106', N'Cà Mau', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2025-01-16T13:21:43.2581884' AS DateTime2), CAST(N'2025-01-16T13:21:43.2581894' AS DateTime2), N'Huyện U Minh', N'Xã Khánh Hòa')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (20, N'Vũ', N'Dương Quốc', N'1/3 đường 106', N'Lạng Sơn', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2025-01-16T17:21:59.8239733' AS DateTime2), CAST(N'2025-01-16T17:21:59.8239743' AS DateTime2), N'Huyện Cao Lộc', N'Xã Gia Cát')
INSERT [dbo].[khachhangs] ([Id], [Ten], [Ho], [DiaChiCuThe], [ThanhPho], [Sdt], [EmailDiaChi], [GhiChu], [Created_at], [Updated_at], [tinhthanhquanhuyen], [xaphuong]) VALUES (21, N'Vũ', N'Dương Quốc', N'1/3 đường 106', N'Hồ Chí Minh', N'0778719281', N'quocvu0411@gmail.com', N'', CAST(N'2025-01-16T17:33:25.7438639' AS DateTime2), CAST(N'2025-01-16T17:33:25.7438654' AS DateTime2), N'Huyện Củ Chi', N'Xã Phú Hòa Đông')
SET IDENTITY_INSERT [dbo].[khachhangs] OFF
GO
SET IDENTITY_INSERT [dbo].[lien_hes] ON 

INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (2, N'Dương Quốc', N'quocvu0411@gmail.com', N'0778719281', N'aaa', CAST(N'2025-01-10T10:48:19.6483008' AS DateTime2), CAST(N'2025-01-10T10:48:19.6483030' AS DateTime2))
INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (3, N'asd', N'quocvu0411@gmail.com', N'0778719281', N'123213', CAST(N'2025-01-10T10:53:32.6760225' AS DateTime2), CAST(N'2025-01-10T10:53:32.6760274' AS DateTime2))
INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (4, N'asd', N'quocvu0411@gmail.com', N'12321312313', N'sdasd', CAST(N'2025-01-10T10:53:57.8729622' AS DateTime2), CAST(N'2025-01-10T10:53:57.8729633' AS DateTime2))
INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (5, N'asd', N'quocvu0411@gmail.com', N'0778719281', N'a', CAST(N'2025-01-10T10:54:22.3638819' AS DateTime2), CAST(N'2025-01-10T10:54:22.3638827' AS DateTime2))
INSERT [dbo].[lien_hes] ([id], [ten], [email], [sdt], [ghichu], [Created_at], [Updated_at]) VALUES (6, N'Dương quốc vũ', N'quocvu0411@gmail.com', N'0778719281', N'asdsadsadas', CAST(N'2025-01-10T10:54:57.3294317' AS DateTime2), CAST(N'2025-01-10T10:54:57.3294327' AS DateTime2))
SET IDENTITY_INSERT [dbo].[lien_hes] OFF
GO
SET IDENTITY_INSERT [dbo].[menu] ON 

INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (7, N'Trang chủ', 1, N'/', CAST(N'2024-12-16T17:00:24.5240739' AS DateTime2), CAST(N'2025-01-10T08:03:51.8578650' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (8, N'Cửa hàng', 2, N'/cuahang', CAST(N'2024-12-16T17:02:02.5581818' AS DateTime2), CAST(N'2025-01-10T08:01:25.7093758' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'Giỏ hàng', 3, N'/giohang', CAST(N'2024-12-16T17:02:15.6621513' AS DateTime2), CAST(N'2024-12-16T17:02:15.6621531' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (10, N'Giới thiệu', 4, N'/gioithieu', CAST(N'2024-12-16T17:02:28.4781788' AS DateTime2), CAST(N'2024-12-16T17:02:28.4781796' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (11, N'Liên hệ', 5, N'/lienhe', CAST(N'2024-12-16T17:02:38.1187511' AS DateTime2), CAST(N'2024-12-16T17:02:38.1187518' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menu] ([Id], [Name], [Thutuhien], [Url], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (12, N'Tra cứu đơn hàng', 6, N'/tracuu', CAST(N'2024-12-16T17:02:49.9704474' AS DateTime2), CAST(N'2024-12-16T17:02:49.9704482' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[menu] OFF
GO
SET IDENTITY_INSERT [dbo].[menuFooter] ON 

INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (19, N'Tại sao bạn chọn chúng tôi?', N'<p>Chúng tôi cung cấp các loại trái cây và rau củ tươi sạch, chất lượng cao, được chọn lọc kỹ lưỡng.</p><p>Đảm bảo an toàn thực phẩm và nguồn gốc rõ ràng, đem đến bữa ăn bổ dưỡng cho gia đình bạn.</p><p>&nbsp;</p>', 1, CAST(N'2024-12-16T17:43:15.973' AS DateTime), CAST(N'2025-01-05T10:20:56.433' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (20, N'Thông tin cửa hàng', N'<p>- Liên hệ<br>- Chính sách bảo mật<br>- Điều khoản &amp; điều kiện<br>- Chính sách hoàn trả<br>- Câu hỏi thường gặp &amp; Hỗ trợ</p>', 2, CAST(N'2024-12-16T17:43:28.473' AS DateTime), CAST(N'2024-12-18T14:03:59.750' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (21, N'Tài khoản', N'<p>- Cửa hàng của chúng tôi<br>- Giới thiệu về cửa hàng<br>- Liên hệ với chúng tôi<br>- Tra cứu đơn hàng của bạn<br>- Giỏ hàng của bạn</p>', 3, CAST(N'2024-12-16T17:43:38.247' AS DateTime), CAST(N'2024-12-18T14:04:07.613' AS DateTime), N'Dương Quốc Vũ', N'Phạm Khắc Khải')
INSERT [dbo].[menuFooter] ([id], [Tieu_de], [noi_dung], [thutuhienthi], [created_at], [updated_at], [CreatedBy], [UpdatedBy]) VALUES (22, N'Liên Hệ', N'<p>- Địa chỉ: Ấp 10 xã Tân Thạnh Đông Huyện Củ Chi TP.HCM</p><p>- Email: Quocvu0411@gmail.com</p><p>- Điện thoại: 0778719281</p><p>- Phương thức thanh toán</p><figure class="image"><img style="aspect-ratio:318/34;" src="https://localhost:7186/menuFooter/638727080537949222_footer_payment_img.webp" width="318" height="34"></figure><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>', 4, CAST(N'2024-12-16T17:44:00.230' AS DateTime), CAST(N'2025-01-17T10:54:22.283' AS DateTime), N'Dương Quốc Vũ', N'Dương Quốc Vũ')
SET IDENTITY_INSERT [dbo].[menuFooter] OFF
GO
SET IDENTITY_INSERT [dbo].[PaymentTransactions] ON 

INSERT [dbo].[PaymentTransactions] ([Id], [OrderId], [TransactionId], [Amount], [PaymentMethod], [Status], [ResponseMessage], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (9, N'H5MI7RHJ', N'3287802376', CAST(2500000.00 AS Decimal(18, 2)), N'Momo', N'Đã hoàn tiền', N'Hoàn tiền thành công', CAST(N'2025-01-14T11:26:55.577' AS DateTime), CAST(N'2025-01-14T11:27:32.367' AS DateTime), N'Khách hàng', N'Dương Quốc Vũ')
INSERT [dbo].[PaymentTransactions] ([Id], [OrderId], [TransactionId], [Amount], [PaymentMethod], [Status], [ResponseMessage], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (10, N'FFD5TPX9', N'3287823315', CAST(250000.00 AS Decimal(18, 2)), N'Momo', N'Success', N'Thanh toán thành công', CAST(N'2025-01-14T18:45:01.193' AS DateTime), CAST(N'2025-01-14T18:45:01.193' AS DateTime), N'Khách hàng', N'chưa có tác động')
INSERT [dbo].[PaymentTransactions] ([Id], [OrderId], [TransactionId], [Amount], [PaymentMethod], [Status], [ResponseMessage], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (11, N'MCV3K2T4', N'3287903917', CAST(250000.00 AS Decimal(18, 2)), N'Momo', N'Đã hoàn tiền', N'Hoàn tiền thành công', CAST(N'2025-01-15T13:00:54.537' AS DateTime), CAST(N'2025-01-15T13:55:34.530' AS DateTime), N'Khách hàng', N'Dương Quốc Vũ')
INSERT [dbo].[PaymentTransactions] ([Id], [OrderId], [TransactionId], [Amount], [PaymentMethod], [Status], [ResponseMessage], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (12, N'WXJW8OK0', N'3287914437', CAST(350000.00 AS Decimal(18, 2)), N'Momo', N'Success', N'Thanh toán thành công', CAST(N'2025-01-16T09:42:34.017' AS DateTime), CAST(N'2025-01-16T09:42:34.017' AS DateTime), N'Khách hàng', N'chưa có tác động')
INSERT [dbo].[PaymentTransactions] ([Id], [OrderId], [TransactionId], [Amount], [PaymentMethod], [Status], [ResponseMessage], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy]) VALUES (13, N'L1DIUR1X', N'14795112', CAST(500000.00 AS Decimal(18, 2)), N'VnPay', N'Success', N'Thanh toán thành công', CAST(N'2025-01-16T11:25:00.217' AS DateTime), CAST(N'2025-01-16T11:25:00.213' AS DateTime), N'Khách hàng', N'Chưa có tác động')
SET IDENTITY_INSERT [dbo].[PaymentTransactions] OFF
GO
SET IDENTITY_INSERT [dbo].[phanhoidanhgias] ON 

INSERT [dbo].[phanhoidanhgias] ([Id], [danhgia_id], [noi_dung], [CreatedBy], [UpdatedBy], [Created_at], [Updated_at]) VALUES (23, 31, N'Cám ơn bạn  ❤️ ❤️ ❤️ ', N'Dương Quốc Vũ', N'Dương Quốc Vũ', CAST(N'2024-12-18T22:20:20.920' AS DateTime), CAST(N'2024-12-18T22:20:20.920' AS DateTime))
INSERT [dbo].[phanhoidanhgias] ([Id], [danhgia_id], [noi_dung], [CreatedBy], [UpdatedBy], [Created_at], [Updated_at]) VALUES (25, 23, N'Shop xin chân thành cám ơn bạn nhé ', N'Dương Quốc Vũ', N'Dương Quốc Vũ', CAST(N'2024-12-21T09:21:48.780' AS DateTime), CAST(N'2024-12-21T09:21:48.780' AS DateTime))
INSERT [dbo].[phanhoidanhgias] ([Id], [danhgia_id], [noi_dung], [CreatedBy], [UpdatedBy], [Created_at], [Updated_at]) VALUES (26, 33, N' 😊 😊 😊 😊 😊', N'Dương Quốc Vũ', N'Dương Quốc Vũ', CAST(N'2025-01-06T13:43:08.807' AS DateTime), CAST(N'2025-01-06T13:43:08.807' AS DateTime))
SET IDENTITY_INSERT [dbo].[phanhoidanhgias] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphams] ON 

INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (34, N'Cam ', CAST(350000.000 AS Decimal(18, 3)), N'sanpham\20b763fe-0958-4862-beea-1966251feb11.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-14T11:11:54.3532852' AS DateTime2), CAST(N'2024-12-14T11:11:54.3532858' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 9)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (35, N'Dâu Đà Lạt', CAST(250000.000 AS Decimal(18, 3)), N'sanpham\f63b6b95-904d-4c97-baa4-c2b9cfba6bf8.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-14T11:22:30.0797344' AS DateTime2), CAST(N'2024-12-14T11:22:30.0797349' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 6)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (36, N'Dưa hấu đỏ', CAST(40000.000 AS Decimal(18, 3)), N'sanpham\d7d4581f-a0b1-42ca-a6ef-5aef6a850504.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:33:28.8894561' AS DateTime2), CAST(N'2024-12-15T23:33:28.8894570' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 10)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (37, N'Nho xanh ', CAST(150000.000 AS Decimal(18, 3)), N'sanpham\dcb5ac48-5bd7-4b00-9d32-984ea4099226.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:36:24.9411271' AS DateTime2), CAST(N'2024-12-15T23:36:24.9411282' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 10)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (38, N'Rau cải ngọt', CAST(1000.000 AS Decimal(18, 3)), N'sanpham\45ab3cc8-6c88-439f-aa89-fafd7a69dc18.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:38:11.2022837' AS DateTime2), CAST(N'2024-12-15T23:38:11.2022846' AS DateTime2), N'Dương Quốc Vũ', N'undefined', 0, 39)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (39, N'Lê Hàn Quốc', CAST(60000.000 AS Decimal(18, 3)), N'sanpham\6c312081-9059-4b92-b3f6-99676e0844d0.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-15T23:39:42.3493976' AS DateTime2), CAST(N'2024-12-15T23:39:42.3493983' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 10)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (40, N'Rau Mồng tơi', CAST(10000.000 AS Decimal(18, 3)), N'sanpham\c509b89a-5b8a-4ea0-b682-8ae23609ec2b.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-15T23:40:58.1723053' AS DateTime2), CAST(N'2024-12-15T23:40:58.1723059' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 45)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (46, N'Thanh Long', CAST(60000.000 AS Decimal(18, 3)), N'sanpham\8e2bb45f-7c78-4bf4-b0f1-1ecbd980425b.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-31T09:42:42.0616748' AS DateTime2), CAST(N'2024-12-31T09:42:42.0616763' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 100)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (47, N' Vú Sữa ', CAST(50000.000 AS Decimal(18, 3)), N'sanpham\88e02163-6697-49c1-afc8-325fddffde47.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-31T09:54:41.9681992' AS DateTime2), CAST(N'2024-12-31T09:54:41.9682002' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 72)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (52, N'Sầu riêng', CAST(250000.000 AS Decimal(18, 3)), N'sanpham\f3b537a3-c00b-4e3e-b60a-99822e54fb1d.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-31T10:35:11.7885157' AS DateTime2), CAST(N'2024-12-31T10:35:11.7885174' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 80)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (53, N'Chôm chôm,', CAST(90000.000 AS Decimal(18, 3)), N'sanpham\1c9a6a65-4a1b-4535-9099-27c3dd185ff2.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-31T10:37:55.6946545' AS DateTime2), CAST(N'2024-12-31T10:37:55.6946555' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 90)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (54, N'sơ ri', CAST(50000.000 AS Decimal(18, 3)), N'sanpham\d75b7e9d-1788-435d-9a52-86551da5f18c.jpg', N'Còn hàng', N'kg', 1, CAST(N'2024-12-31T10:40:15.1865363' AS DateTime2), CAST(N'2024-12-31T10:40:15.1865379' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 20)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (55, N'Tía tô', CAST(5000.000 AS Decimal(18, 3)), N'sanpham\f7ebfb2d-68e9-4b79-b7bb-c8a5255d1515.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-31T10:44:16.1051314' AS DateTime2), CAST(N'2024-12-31T10:44:16.1051321' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 20)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (56, N'Hành Lá', CAST(3000.000 AS Decimal(18, 3)), N'sanpham\1fb4d919-9f90-4087-8695-c3e9a5bd0228.jpg', N'Còn hàng', N'bó', 2, CAST(N'2024-12-31T10:47:32.1800419' AS DateTime2), CAST(N'2024-12-31T10:47:32.1800430' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 10)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (57, N'Hành Tây', CAST(1000.000 AS Decimal(18, 3)), N'sanpham\cade1122-e50c-4b0c-900b-39afd30bd76e.jpg', N'Còn hàng', N'kg', 2, CAST(N'2024-12-31T10:53:16.8801668' AS DateTime2), CAST(N'2024-12-31T10:53:16.8801678' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 30)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (58, N'Nấm hương', CAST(50000.000 AS Decimal(18, 3)), N'sanpham\6f10f7a5-9d34-4135-b825-8b2801e89dc7.jpg', N'Còn hàng', N'kg', 21, CAST(N'2024-12-31T10:56:08.5971703' AS DateTime2), CAST(N'2024-12-31T10:56:08.5971716' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 20)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (59, N'Nấm đùi gà', CAST(50000.000 AS Decimal(18, 3)), N'sanpham\5f8fd845-b28a-48ec-85a6-ec5ee3f61343.jpg', N'Còn hàng', N'kg', 21, CAST(N'2024-12-31T11:00:10.1233373' AS DateTime2), CAST(N'2024-12-31T11:00:10.1233389' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 50)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (60, N'Nấm tuyết', CAST(400000.000 AS Decimal(18, 3)), N'sanpham\215da0cb-c9a1-4a11-9f46-2072a4cfde6d.jpg', N'Còn hàng', N'kg', 21, CAST(N'2024-12-31T11:03:37.2164268' AS DateTime2), CAST(N'2024-12-31T11:03:37.2164284' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 10)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (61, N'Nấm Matsutake', CAST(500000.000 AS Decimal(18, 3)), N'sanpham\782e01e7-df01-47fa-b3aa-9c230278b8f0.jpg', N'Còn hàng', N'gram', 21, CAST(N'2024-12-31T11:08:29.0524040' AS DateTime2), CAST(N'2024-12-31T11:08:29.0524052' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 3)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (62, N'Bia Tiger', CAST(380000.000 AS Decimal(18, 3)), N'sanpham\751b114b-edd9-4c12-aa7b-510f24e97a74.jpg', N'Còn hàng', N'thùng', 23, CAST(N'2024-12-31T11:12:29.0622989' AS DateTime2), CAST(N'2024-12-31T11:12:29.0623005' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 100)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (63, N'heineken', CAST(420000.000 AS Decimal(18, 3)), N'sanpham\713f263c-6a3b-44eb-9033-742a735c3cc0.jpg', N'Còn hàng', N'thùng', 23, CAST(N'2024-12-31T11:17:06.4266648' AS DateTime2), CAST(N'2024-12-31T11:17:06.4266658' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 0, 49)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (64, N'neu', CAST(10000.000 AS Decimal(18, 3)), N'sanpham\c38e2932-ecbf-4000-825b-d67bbbccb289.jpg', N'Còn hàng', N'kg', 1, CAST(N'2025-01-08T10:11:08.5053485' AS DateTime2), CAST(N'2025-01-08T10:11:08.5053496' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1, 5)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (65, N'asd', CAST(13333.000 AS Decimal(18, 3)), N'sanpham\41d047ec-b894-416b-8e9e-3ae3cd7c1679.jpg', N'Còn hàng', N'thùng', 1, CAST(N'2025-01-08T10:15:19.1778766' AS DateTime2), CAST(N'2025-01-08T10:15:19.1781030' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1, 123)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (66, N'new', CAST(1000.000 AS Decimal(18, 3)), N'sanpham\d92f8ab3-bd80-4cb5-aef5-3ced139afb6b.png', N'Còn hàng', N'Kg', 1, CAST(N'2025-01-09T14:43:24.8268031' AS DateTime2), CAST(N'2025-01-09T14:43:24.8268058' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1, 1)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (67, N'asd', CAST(5000.000 AS Decimal(18, 3)), N'sanpham\56a71197-97ae-42c0-a216-026855a4e67c.jpg', N'Còn hàng', N'thùng', 1, CAST(N'2025-01-10T07:52:57.2784804' AS DateTime2), CAST(N'2025-01-10T07:52:57.2784816' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1, 123)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (68, N'asd', CAST(1000.000 AS Decimal(18, 3)), N'sanpham\e564aed7-4749-44d0-ad0a-3b19bc7a5e0e.webp', N'Còn hàng', N'bó', 1, CAST(N'2025-01-12T16:54:46.0549214' AS DateTime2), CAST(N'2025-01-12T16:54:46.0549228' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1, 1)
INSERT [dbo].[sanphams] ([Id], [Tieude], [Giatien], [Hinhanh], [Trangthai], [don_vi_tinh], [danhmucsanpham_id], [Created_at], [Updated_at], [CreatedBy], [UpdatedBy], [Xoa], [Soluong]) VALUES (69, N'123', CAST(1000.000 AS Decimal(18, 3)), N'sanpham\2973c75d-b532-4318-a0c7-e9734da19488.jpg', N'Còn hàng', N'kg', 1, CAST(N'2025-01-12T16:56:25.8618474' AS DateTime2), CAST(N'2025-01-12T16:56:25.8618487' AS DateTime2), N'Dương Quốc Vũ', N'Dương Quốc Vũ', 1, 1)
SET IDENTITY_INSERT [dbo].[sanphams] OFF
GO
SET IDENTITY_INSERT [dbo].[sanphamsale] ON 

INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (152, 38, N'Không áp dụng', CAST(10.000 AS Decimal(18, 3)), CAST(N'2024-12-17T11:35:00.0000000' AS DateTime2), CAST(N'2024-12-19T11:35:00.0000000' AS DateTime2), CAST(N'2024-12-26T19:27:49.6300492' AS DateTime2), CAST(N'2024-12-26T19:27:49.6300505' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (172, 46, N'Đang áp dụng', CAST(12000.000 AS Decimal(18, 3)), CAST(N'2024-12-31T09:42:00.0000000' AS DateTime2), CAST(N'2025-02-01T12:12:00.0000000' AS DateTime2), CAST(N'2024-12-31T09:44:37.7748036' AS DateTime2), CAST(N'2024-12-31T09:44:37.7748050' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (200, 63, N'Đang áp dụng', CAST(400000.000 AS Decimal(18, 3)), CAST(N'2024-12-31T11:16:00.0000000' AS DateTime2), CAST(N'2025-02-01T11:11:00.0000000' AS DateTime2), CAST(N'2025-01-05T11:07:50.9209280' AS DateTime2), CAST(N'2025-01-05T11:07:50.9209283' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (227, 35, N'Không áp dụng', CAST(170000.000 AS Decimal(18, 3)), CAST(N'2025-01-09T11:22:00.0000000' AS DateTime2), CAST(N'2025-01-10T23:22:00.0000000' AS DateTime2), CAST(N'2025-01-14T07:54:19.0571091' AS DateTime2), CAST(N'2025-01-14T07:54:19.0571094' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (228, 36, N'Không áp dụng', CAST(35000.000 AS Decimal(18, 3)), CAST(N'2024-12-25T17:36:00.0000000' AS DateTime2), CAST(N'2024-12-26T17:36:00.0000000' AS DateTime2), CAST(N'2025-01-14T07:54:26.3812264' AS DateTime2), CAST(N'2025-01-14T07:54:26.3812266' AS DateTime2))
INSERT [dbo].[sanphamsale] ([Id], [sanpham_id], [trangthai], [giasale], [thoigianbatdau], [thoigianketthuc], [Created_at], [Updated_at]) VALUES (229, 34, N'Không áp dụng', CAST(290000.000 AS Decimal(18, 3)), CAST(N'2024-12-24T20:53:00.0000000' AS DateTime2), CAST(N'2025-01-14T11:08:00.0000000' AS DateTime2), CAST(N'2025-01-14T07:54:54.0442977' AS DateTime2), CAST(N'2025-01-14T07:54:54.0442978' AS DateTime2))
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

INSERT [dbo].[TenwebSite] ([id], [tieu_de], [phu_de], [favicon], [created_at], [updated_at], [CreatedBy], [UpdatedBy], [Email], [Diachi], [sdt]) VALUES (21, N'Trái Cây Tươi Sạch', N'Cam kết 100% Trái cây tươi sạch mới', N'/tenwebsite/a0e42fae-75b4-40d8-ae2a-20c3d116d085.png', CAST(N'2024-12-25T10:00:15.177' AS DateTime), CAST(N'2025-01-11T21:55:57.480' AS DateTime), N'Phạm Khắc Khải', N'Dương Quốc Vũ', N'quocvu0411@gmail.com', N'1/3 đường 106 ấp 10', N'0778719281')
SET IDENTITY_INSERT [dbo].[TenwebSite] OFF
GO
ALTER TABLE [dbo].[Footers] ADD  DEFAULT (getdate()) FOR [Created_at]
GO
ALTER TABLE [dbo].[Footers] ADD  DEFAULT (getdate()) FOR [Updated_at]
GO
ALTER TABLE [dbo].[Footers] ADD  DEFAULT ((1)) FOR [TrangThai]
GO
ALTER TABLE [dbo].[ghn_orders] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[ghn_orders] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[ghn_orders] ADD  DEFAULT (getdate()) FOR [updated_at]
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
ALTER TABLE [dbo].[PaymentTransactions] ADD  DEFAULT (getdate()) FOR [Created_at]
GO
ALTER TABLE [dbo].[phanhoidanhgias] ADD  DEFAULT (getdate()) FOR [Created_at]
GO
ALTER TABLE [dbo].[phanhoidanhgias] ADD  DEFAULT (getdate()) FOR [Updated_at]
GO
ALTER TABLE [dbo].[sanphams] ADD  DEFAULT ((0)) FOR [Xoa]
GO
ALTER TABLE [dbo].[sanphams] ADD  DEFAULT ((0)) FOR [Soluong]
GO
ALTER TABLE [dbo].[TenwebSite] ADD  CONSTRAINT [DF__TenwebSit__creat__74AE54BC]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[TenwebSite] ADD  CONSTRAINT [DF__TenwebSit__updat__75A278F5]  DEFAULT (getdate()) FOR [updated_at]
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
ALTER TABLE [dbo].[hoadonchitiets]  WITH CHECK ADD  CONSTRAINT [FK_HoaDonChiTiet_SanPham] FOREIGN KEY([sanpham_ids])
REFERENCES [dbo].[sanphams] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[hoadonchitiets] CHECK CONSTRAINT [FK_HoaDonChiTiet_SanPham]
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
