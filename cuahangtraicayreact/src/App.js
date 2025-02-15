import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileAdmin from "./component/admin/page/ProfileAdmin";
import Sanpham from './component/admin/page/Sanpham';

import { CartProvider } from "./component/users/page/CartContext";
import ProtectedRoute from './component/routerbaove/ProtectedRoute';
import LoginAdmin from "./component/admin/page/LoginAdmin";
import LienHe from "./component/users/page/LienHe";
import LienHeAdmin from "./component/admin/page/LienHeAdmin";
import Khachhangs from "./component/admin/page/Khachhang";
import Tracuu from "./component/users/page/Tracuu";

import Giohang from "./component/users/page/Giohang";
import Thanhtoan from "./component/users/page/Thanhtoan";
import Cuahang from "./component/users/page/Cuahang";
import TrangchuNguoidung from "./component/users/page/TrangchuNguoidung";
import Trangloi from "./component/users/page/Trangloi";
import CuahangChitiet from "./component/users/page/CuahangChitiet";
import Gioithieu from "./component/users/page/Gioithieu";
import TrangChuAdmin from "./component/admin/page/TrangchuAdmin";
import Danhmucsanpham from "./component/admin/page/Danhmucsanpham";
import Dactrung from "./component/admin/page/Dactrung";
import Banners from "./component/admin/page/Banners";
import Menu from "./component/admin/page/Menu";
import TenFooterAdmin from "./component/admin/page/TenFooterAdmin";
import GioithieuAdmin from "./component/admin/page/GioithieuAdmin";
import MenuFooter from "./component/admin/page/MenuFooter";
import QuanlyFooter from "./component/admin/page/QuanlyFooter";
import TenwebSitersAdmin from "./component/admin/page/TenwebSitersAdmin";
import PaymentResult from "./component/users/PaymentResult ";
import PaymentInfo from "./component/users/page/PaymentInfo";
import ThanhToanThanhCong from "./component/users/ThanhToanThanhCong";
import Account from "./component/admin/page/Account";
import LoginUser from "./component/users/page/LognUser";
import Dangky from "./component/users/page/Dangky";
import QuanlyUser from "./component/admin/page/QuanlyUser";
import Voucher from "./component/admin/page/Voucher";
import { useEffect, useState } from "react";
import LoadingScreen from "./component/users/page/Loadingwebsite";
import LichSuGiaoDich from "./component/users/page/Lichsugiaodich";
import EmailDangkyTB from "./component/admin/page/EmailDangkyTB";
import DonViTinh from "./component/admin/page/DonViTinh";

// import MenuFooter from "./component/admin/page/MenuFooter";

function App() {
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    const time = setTimeout(() =>{
      setLoading(false);
    },3000);
  },[]);
  return ( 

    < >
    {loading ? (
      <LoadingScreen/>
    ) : (
      <CartProvider>

      <Router>
        <Routes>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<ProtectedRoute congkhai={true}><LoginAdmin /></ProtectedRoute>} />

            <Route
            path="/admin/donvitinh"
            element={
              <ProtectedRoute>
                <DonViTinh />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/accounts"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tenfooter"
            element={
              <ProtectedRoute>
                <TenFooterAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gioithieuAdmin"
            element={
              <ProtectedRoute>
                <GioithieuAdmin />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/voucher"
            element={
              <ProtectedRoute>
                <Voucher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sanpham"
            element={
              <ProtectedRoute>
                <Sanpham />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ProfileAdmin"
            element={
              <ProtectedRoute>
                <ProfileAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/danhmucsanpham"
            element={
              <ProtectedRoute>
                <Danhmucsanpham />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dactrung"
            element={
              <ProtectedRoute>
                <Dactrung />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menuFooter"
            element={
              <ProtectedRoute>
                <MenuFooter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Banners"
            element={
              <ProtectedRoute>
                <Banners />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lienhe"
            element={
              <ProtectedRoute>
                <LienHeAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/khachhang"
            element={
              <ProtectedRoute>
                <Khachhangs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Trangchu"
            element={
              <ProtectedRoute>
                <TrangChuAdmin />
              </ProtectedRoute>
            }
          />
              <Route
            path="/admin/Footer"
            element={
              <ProtectedRoute>
                <QuanlyFooter />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/quanlyuser"
            element={
              <ProtectedRoute>
                <QuanlyUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Tenwebsiters"
            element={
              <ProtectedRoute>
                <TenwebSitersAdmin />
              </ProtectedRoute>
            }
          />
            <Route
            path="/admin/Emailnhanthongbao"
            element={
              <ProtectedRoute>
                <EmailDangkyTB />
              </ProtectedRoute>
            }
          />

          {/* Router người dùng */}
          <Route path="/" element={<TrangchuNguoidung />} />
          <Route path="/cuahang" element={<Cuahang />} />
          <Route path="/thanhtoan" element={<Thanhtoan />} />
          <Route path="/sanpham/:name/:id" element={<CuahangChitiet />} />
          <Route path="/giohang" element={<Giohang />} />
          <Route path="/gioithieu" element={<Gioithieu />} />
          <Route path="/thanhtoanthanhcong" element={<ThanhToanThanhCong />} />

          <Route path="/lienhe" element={<LienHe />} />
          <Route path="/tracuu" element={<Tracuu />} />

          {/* chuyển người dùng đến trang ErrorPage nếu dùng đường truyền router sai */}
          <Route path="*" element={<Trangloi />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/payment-info" element={<PaymentInfo  />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/register" element={<Dangky />} />
          <Route path="/lichsugiaodich" element={<LichSuGiaoDich />} />
        </Routes>
      </Router>
    </CartProvider>
    )
  }

     
    </>
  );
}

export default App;
