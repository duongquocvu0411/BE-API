// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children, congkhai = false }) => {
//   // Kiểm tra trạng thái đăng nhập bằng cách kiểm tra sự tồn tại của token
//   const daDangNhap = localStorage.getItem('adminToken') !== null;
//   const location = useLocation(); // Lấy tuyến đường hiện tại

//   // Chuyển hướng người dùng đã đăng nhập khỏi trang đăng nhập
//   if (daDangNhap && location.pathname === '/admin/login') {
//     return <Navigate to="/admin/trangchu" />;
//   }

//   // Cho phép truy cập nếu đó là trang công khai hoặc người dùng đã đăng nhập
//   if (congkhai || daDangNhap) {
//     return children;
//   }

//   // Chuyển hướng người dùng chưa đăng nhập đến trang đăng nhập
//   return <Navigate to="/admin/login" />;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children, congkhai = false }) => {
  const [cookies, , removeCookie] = useCookies(['adminToken', 'loginTime', 'isAdminLoggedIn']);
  const location = useLocation();
  const [daDangNhap, setDaDangNhap] = useState(false);

  useEffect(() => {
    // Kiểm tra giá trị `isAdminLoggedIn` từ cookies
    const loggedIn = cookies.isAdminLoggedIn === 'true' || cookies.isAdminLoggedIn === true;

    // Kiểm tra giá trị loginTime
    const loginTime = cookies.loginTime;
    const sessionTimeout = loggedIn && cookies.adminToken ? 3 * 60 * 60 * 1000  : 7 * 24 * 60 * 60 * 1000; // 1 phút hoặc 7 ngày

    if (!cookies.adminToken || !loggedIn) {
      // Nếu không có token hoặc chưa đăng nhập
      setDaDangNhap(false);
    } else {
      setDaDangNhap(true);
    }

    if (loginTime && new Date().getTime() - new Date(loginTime).getTime() > sessionTimeout) {
      // Hết hạn, xóa cookies
      removeCookie('adminToken', { path: '/' });
      removeCookie('loginTime', { path: '/' });
      removeCookie('isAdminLoggedIn', { path: '/' });
      // removeCookie('loginhoten', { path: '/' });
      setDaDangNhap(false);
    }
  }, [cookies, removeCookie]);

  // Chuyển hướng người dùng đã đăng nhập khỏi trang đăng nhập
  if (daDangNhap && location.pathname === '/admin/login') {
    return <Navigate to="/admin/trangchu" />;
  }

  // Cho phép truy cập nếu đó là trang công khai hoặc người dùng đã đăng nhập
  if (congkhai || daDangNhap) {
    return children;
  }

  // Chuyển hướng người dùng chưa đăng nhập đến trang đăng nhập
  return <Navigate to="/admin/login" />;
};

export default ProtectedRoute;

