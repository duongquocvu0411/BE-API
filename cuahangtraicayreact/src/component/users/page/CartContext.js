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


  // const addToCart = (sanPham) => {
  //   setGiohang((giohanghientai) => {
  //     // Kiểm tra nếu sản phẩm có khuyến mãi và trạng thái khuyến mãi đang "active"
  //     const sale = Array.isArray(sanPham.sanphamSales)
  //       ? sanPham.sanphamSales.find((item) => item.trangthai === 'Đang áp dụng')
  //       : null;

  //     const giaSanPham = sale ? sale.giasale : sanPham.giatien; // Lấy giá sale nếu có, ngược lại lấy giá gốc

  //     const sanPhamTonTai = giohanghientai.find((item) => item.id === sanPham.id);
  //     let newCart;

  //     if (sanPhamTonTai) {
  //       // Cập nhật số lượng nếu sản phẩm đã tồn tại
  //       newCart = giohanghientai.map((item) =>
  //         item.id === sanPham.id
  //           ? { ...item, soLuong: item.soLuong + 1 }
  //           : item
  //       );
  //     } else {
  //       // Thêm sản phẩm mới nếu chưa có trong giỏ hàng
  //       newCart = [
  //         ...giohanghientai,
  //         {
  //           ...sanPham,
  //           soLuong: 1,
  //           gia: giaSanPham, // Thêm giá khuyến mãi hoặc giá gốc
  //         },
  //       ];
  //     }

  //     return newCart;
  //   });

  //   // Thông báo sau khi giỏ hàng đã được cập nhật
  //   toast.success(`${sanPham.tieude} đã được thêm vào giỏ hàng!`, {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });
  // };


  const addToCart = (sanPham) => {
    let success = false; // Biến kiểm soát thông báo thành công

    setGiohang((giohanghientai) => {
      const sale = Array.isArray(sanPham.sanphamSales)
        ? sanPham.sanphamSales.find((item) => item.trangthai === 'Đang áp dụng')
        : null;

      const giaSanPham = sale ? sale.giasale : sanPham.giatien;

      const sanPhamTonTai = giohanghientai.find((item) => item.id === sanPham.id);

      if (sanPhamTonTai) {
        // Nếu sản phẩm đã tồn tại, kiểm tra kho trước khi tăng số lượng
        if (sanPhamTonTai.soLuong + 1 > sanPham.soluong) {
          toast.error(
            `Số lượng sản phẩm "${sanPham.tieude}" không đủ trong kho.`,
            { position: 'top-right', autoClose: 3000 }
          );
          return giohanghientai; // Không cập nhật giỏ hàng nếu vượt quá kho
        }
        success = true; // Đánh dấu thêm thành công
        return giohanghientai.map((item) =>
          item.id === sanPham.id
            ? { ...item, soLuong: item.soLuong + 1 }
            : item
        );
      } else {
        // Nếu là sản phẩm mới, kiểm tra số lượng tồn kho
        if (1 > sanPham.soluong) {
          toast.error(
            `Sản phẩm "${sanPham.tieude}" không đủ số lượng trong kho.`,
            { position: 'top-right', autoClose: 3000 }
          );
          return giohanghientai; // Không thêm sản phẩm mới
        }
        success = true; // Đánh dấu thêm thành công
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

    // Hiển thị thông báo thành công nếu thêm được sản phẩm
    if (success) {
      toast.success(`${sanPham.tieude} đã được thêm vào giỏ hàng!`, {
        position: 'top-right',
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



  // const TangSoLuong = (sanPhamId) => {
  //   setGiohang((giohanghientai) =>
  //     giohanghientai.map((item) =>
  //       item.id === sanPhamId ? { ...item, soLuong: item.soLuong + 1 } : item
  //     )
  //   );
  // };

  const TangSoLuong = (sanPhamId) => {
    let success = false; // Biến kiểm soát thông báo thành công

    setGiohang((giohanghientai) =>
      giohanghientai.map((item) => {
        if (item.id === sanPhamId) {
          // Kiểm tra nếu số lượng vượt quá kho
          if (item.soLuong + 1 > item.soluong) {
            toast.error(
              `Số lượng sản phẩm "${item.tieude}" không đủ trong kho.`,
              { position: 'top-right', autoClose: 3000 }
            );
            return item; // Giữ nguyên nếu vượt quá kho
          }
          success = true; // Đánh dấu thành công tăng số lượng
          return { ...item, soLuong: item.soLuong + 1 };
        }
        return item;
      })
    );

    // Hiển thị thông báo thành công nếu tăng số lượng thành công
    if (success) {
      toast.success(`Tăng số lượng sản phẩm thành công!`, {
        position: 'top-right',
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

  // Hàm cập nhật số lượng trực tiếp từ ô nhập
  // const CapnhatSoLuong = (sanPhamId, soLuongMoi) => {
  //   setGiohang((giohanghientai) =>
  //     giohanghientai.map((item) =>
  //       item.id === sanPhamId ? { ...item, soLuong: parseInt(soLuongMoi) } : item
  //     )
  //   );
  // };

  // Hàm xoagiohangthanhtoanthanhcong để xóa sạch giỏ hàng


  const CapnhatSoLuong = (sanPhamId, soLuongMoi) => {
    let success = false; // Biến kiểm soát thông báo thành công

    setGiohang((giohanghientai) =>
      giohanghientai.map((item) => {
        if (item.id === sanPhamId) {
          // Kiểm tra nếu số lượng mới vượt quá số lượng trong kho
          if (soLuongMoi > item.soluong) {
            toast.error(
              `Số lượng sản phẩm "${item.tieude}" không đủ trong kho.`,
              { position: 'top-right', autoClose: 3000 }
            );
            return item; // Giữ nguyên nếu vượt quá kho
          }
          success = true; // Đánh dấu thành công cập nhật số lượng
          return { ...item, soLuong: parseInt(soLuongMoi) };
        }
        return item;
      })
    );

    // Hiển thị thông báo thành công nếu cập nhật số lượng thành công
    if (success) {
      toast.success(`Cập nhật số lượng sản phẩm thành công!`, {
        position: 'top-right',
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
