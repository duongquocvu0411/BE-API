import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Khởi tạo giỏ hàng từ localStorage, nếu không có thì sử dụng mảng rỗng
  // const [giohang, setGiohang] = useState(() => {
  //   //Đoạn mã dưới đây giúp khởi tạo giá trị cho giohang từ localStorage. 
  //   //Nếu trong localStorage có lưu giỏ hàng (savedCart), nó sẽ được chuyển đổi từ chuỗi JSON 
  //   //thành mảng và sử dụng làm giá trị ban đầu cho giohang. Nếu không có, mảng rỗng sẽ được sử dụng.
  //   const savedCart = localStorage.getItem('giohang');
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });

  const [giohang, setGiohang] = useState(() => {
    try {
      const savedCart = localStorage.getItem('giohang');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Lỗi phân tích cú pháp JSON từ localStorage:', error);
      return [];
    }
  });

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    //Sử dụng useEffect để theo dõi sự thay đổi của giohang. Mỗi khi giohang thay đổi,
    // dữ liệu sẽ được lưu lại vào localStorage dưới dạng chuỗi JSON.
    // localStorage.setItem('giohang', JSON.stringify());

    localStorage.setItem('giohang', JSON.stringify(giohang));
  }, [giohang]);

  const laySoLuongKhaDung  = (sanPham) => {
    return sanPham.soluong - sanPham.soluongtamgiu;
  };
  
  const addToCart = (sanPham) => {
    let success = false;
  
    setGiohang((giohanghientai) => {
      const sale = Array.isArray(sanPham.sanphamSales)
        ? sanPham.sanphamSales.find((item) => item.trangthai === "Đang áp dụng")
        : null;
  
      const giaSanPham = sale ? sale.giasale : sanPham.giatien;
  
      const sanPhamTonTai = giohanghientai.find((item) => item.id === sanPham.id);
  
      const availableQuantity = laySoLuongKhaDung (sanPham);
  
      if (sanPhamTonTai) {
        if (sanPhamTonTai.soLuong + 1 > availableQuantity) {
          toast.error(
            `Sản phẩm "${sanPham.tieude}" không đủ trong kho. Chỉ còn ${availableQuantity} sản phẩm khả dụng.`,
            { position: "top-right", autoClose: 3000 }
          );
          return giohanghientai;
        }
        success = true;
        return giohanghientai.map((item) =>
          item.id === sanPham.id
            ? { ...item, soLuong: item.soLuong + 1 }
            : item
        );
      } else {
        if (1 > availableQuantity) {
          toast.error(
            `Sản phẩm "${sanPham.tieude}" không đủ trong kho. Chỉ còn ${availableQuantity} sản phẩm khả dụng.`,
            { position: "top-right", autoClose: 3000 }
          );
          return giohanghientai;
        }
        success = true;
        return [
          ...giohanghientai,
          {
            ...sanPham,
            soLuong: 1,
            gia: giaSanPham,
          },
        ];
      }
    });
  
    if (success) {
      toast.success(`${sanPham.tieude} đã được thêm vào giỏ hàng!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  


  const XoaGioHang = (sanPhamId) => {
    // Tìm sản phẩm muốn xóa
    const sanPhamXoa = giohang.find((item) => item.id === sanPhamId);

    // Cập nhật giỏ hàng trước
    setGiohang((giohanghientai) => giohanghientai.filter((item) => item.id !== sanPhamId));

    // Hiển thị thông báo sau khi cập nhật giỏ hàng
    if (sanPhamXoa) {
      toast.success(`Xóa sản phẩm ${sanPhamXoa.tieude} khỏi giỏ hàng thành công`, {
        position: "top-right",
        autoClose: 3000,
      })

    }
  };


  const TangSoLuong = (sanPhamId) => {
    let success = false;
  
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) => {
        if (item.id === sanPhamId) {
          const availableQuantity = laySoLuongKhaDung (item);
          if (item.soLuong + 1 > availableQuantity) {
            toast.error(
              `Sản phẩm "${item.tieude}" không đủ trong kho. Chỉ còn ${availableQuantity} sản phẩm khả dụng.`,
              { position: "top-right", autoClose: 3000 }
            );
            return item;
          }
          success = true;
          return { ...item, soLuong: item.soLuong + 1 };
        }
        return item;
      })
    );
  
    if (success) {
      toast.success(`Tăng số lượng sản phẩm thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  const GiamSoLuong = (sanPhamId) => {
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) =>
        item.id === sanPhamId && item.soLuong > 1
          ? { ...item, soLuong: item.soLuong - 1 }
          : item
      )
    );
  };

  // Hàm xoagiohangthanhtoanthanhcong để xóa sạch giỏ hàng


  const CapnhatSoLuong = (sanPhamId, soLuongMoi) => {
    let success = false;
  
    setGiohang((giohanghientai) =>
      giohanghientai.map((item) => {
        if (item.id === sanPhamId) {
          const availableQuantity = laySoLuongKhaDung (item);
          if (soLuongMoi > availableQuantity) {
            toast.error(
              `Sản phẩm "${item.tieude}" không đủ trong kho. Chỉ còn ${availableQuantity} sản phẩm khả dụng.`,
              { position: "top-right", autoClose: 3000 }
            );
            return item;
          }
          success = true;
          return { ...item, soLuong: parseInt(soLuongMoi) };
        }
        return item;
      })
    );
  
    if (success) {
      toast.success(`Cập nhật số lượng sản phẩm thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  



  const xoagiohangthanhtoanthanhcong = () => {
    setGiohang([]); // Đặt giỏ hàng về mảng rỗng
    localStorage.removeItem('giohang'); // Xóa giỏ hàng khỏi localStorage
  };

  // hàm xóa toàn bộ giỏ hàng

  const Xoatoanbogiohang = () => {
    if (giohang.length === 0) {
      // Nếu giỏ hàng trống, hiển thị thông báo

    } else {
      // Nếu giỏ hàng không trống, thực hiện xóa giỏ hàng
      setGiohang([]); // Đặt giỏ hàng về mảng rỗng
      localStorage.removeItem('giohang'); // Xóa giỏ hàng khỏi localStorage

    }
  };


  return (
    <CartContext.Provider value={{ giohang, addToCart, XoaGioHang, TangSoLuong, GiamSoLuong, CapnhatSoLuong, xoagiohangthanhtoanthanhcong, Xoatoanbogiohang }}>
      {children}
    </CartContext.Provider>
  );
};
