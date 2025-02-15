


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
const Login = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [maXacThuc, setMaXacThuc] = useState(''); // Trạng thái cho mã OTP
  const [dangXuLy, setDangXuLy] = useState(false);
  const [dangXacThuc, setDangXacThuc] = useState(false); // Trạng thái cho xử lý OTP
  const [dangHienThiOTP, setDangHienThiOTP] = useState(false); // Hiển thị form OTP
  const [luuDangNhap, setLuuDangNhap] = useState(false); // Checkbox lưu thông tin đăng nhập
  const dieuHuong = useNavigate();
  const [thongTinWebsite, setThongTinWebsite] = useState([]);
  const [cookies, setCookie] = useCookies(['adminToken', 'loginhoten', 'loginTime']);

  useEffect(() => {
    layThongTinWebsiteHoatDong();
  }, []);

  const layThongTinWebsiteHoatDong = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/tenwebsite`);
      if (response.data.data && response.data.data.length > 0) {
        const baseURL = process.env.REACT_APP_BASEURL;
        setThongTinWebsite({
          tieu_de: response.data.data[0].tieu_de,
          favicon: `${baseURL}${response.data.data[0].favicon}?v=${Date.now()}`,
        });
      }
    } catch (err) {
      console.error('Lỗi khi gọi API thông tin website:', err);
      toast.error('Lỗi khi lấy thông tin website hoạt động', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const xuLyDangNhap = async (e) => {
    e.preventDefault();
    setDangXuLy(true);

    try {
      const phanHoi = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/login`, {
        username: tenDangNhap,
        password: matKhau,
      });

      // Kiểm tra phản hồi từ backend
      if (phanHoi.data.status === 'success') {
        // Hiển thị giao diện nhập mã OTP
        setDangHienThiOTP(true);
        toast.success(phanHoi.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        // Hiển thị thông báo từ backend (thất bại)
        toast.warning(phanHoi.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);

      // Kiểm tra nếu có phản hồi từ server (error.response)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        // Thông báo mặc định khi không kết nối được server
        toast.error('Đăng nhập thất bại. Vui lòng thử lại.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } finally {
      setDangXuLy(false);
    }
  };


  // const xuLyXacThucOTP = async (e) => {
  //   e.preventDefault();
  //   setDangXacThuc(true);
  
  //   try {
  //     const phanHoi = await axios.post(
  //       `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-otp`,
  //       JSON.stringify(maXacThuc), //giúp chuyển đối tượng  (có thể chứa các giá trị như số, chuỗi, mảng, hoặc các đối tượng con) thành chuỗi JSON.
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  
  //     if (phanHoi.data.status === 'success') {
  //       // Lấy thông tin từ token
  //       const decodedToken = jwtDecode(phanHoi.data.token);
  //       const hotenFromToken = decodedToken.hoten;
  
  //       // Lấy thời gian hiện tại và định dạng ngày giờ
  //       const now = new Date();
  //       const formattedLoginTime = now.toLocaleString('vi-VN', {
  //         year: 'numeric',
  //         month: '2-digit',
  //         day: '2-digit',
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit',
  //       });
  
  //       // Thời gian sống của cookie (7 ngày hoặc 1 phút)
  //       const maxAge = luuDangNhap ? 7 * 24 * 60 * 60 : 3 * 60 * 60; // 7 ngày hoặc 3 giờ 
  //       setCookie('adminToken', phanHoi.data.token, { path: '/', secure: true, sameSite: 'Strict', maxAge });
  //       // setCookie('loginhoten', hotenFromToken, { path: '/', secure: true, sameSite: 'Strict', maxAge });
  //       setCookie('loginTime', formattedLoginTime, { path: '/', secure: true, sameSite: 'Strict', maxAge });
  //       setCookie('isAdminLoggedIn', true, { path: '/', secure: true, sameSite: 'Strict', maxAge });
  
  //       toast.success(`Đăng nhập thành công! Chào mừng ${hotenFromToken}`, {
  //         position: 'top-center',
  //         autoClose: 3000,
  //       });
  
  //       dieuHuong('/admin/trangchu');
  //     } else {
  //       toast.warning('Mã xác thực không đúng. Vui lòng kiểm tra lại.', {
  //         position: 'top-center',
  //         autoClose: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Lỗi xác thực OTP:', error);
  //     toast.error('Xác thực OTP thất bại. Vui lòng thử lại.', {
  //       position: 'top-center',
  //       autoClose: 3000,
  //     });
  //   } finally {
  //     setDangXacThuc(false);
  //   }
  // };
  
  const xuLyXacThucOTP = async (e) => {
    e.preventDefault();
    setDangXacThuc(true);
  
    try {
      const phanHoi = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-otp`,
        JSON.stringify(maXacThuc),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (phanHoi.data.status === 'success') {
        // Lấy thông tin từ token
        const decodedToken = jwtDecode(phanHoi.data.token);
        const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];
  
        // Lấy thời gian hiện tại và định dạng ngày giờ
        const now = new Date();
        const formattedLoginTime = now.toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
  
        // Thời gian sống của cookie (7 ngày hoặc 3 giờ)
        const maxAge = luuDangNhap ? 7 * 24 * 60 * 60 : 3 * 60 * 60;
        setCookie('adminToken', phanHoi.data.token, { path: '/', secure: true, sameSite: 'Strict', maxAge });
        setCookie('loginTime', formattedLoginTime, { path: '/', secure: true, sameSite: 'Strict', maxAge });
        setCookie('isAdminLoggedIn', true, { path: '/', secure: true, sameSite: 'Strict', maxAge });
  
        // Kiểm tra roles và điều hướng
        if (roles.includes('Admin') || roles.includes('Employee')) {
          dieuHuong('/admin/trangchu');
        } else {
          dieuHuong('/'); // Hoặc bất kỳ đường dẫn nào khác
          toast.warning('Bạn không có quyền truy cập.', {
            position: 'top-center',
            autoClose: 3000,
          });
        }
      } else {
        toast.warning('Mã xác thực không đúng. Vui lòng kiểm tra lại.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      toast.error('Xác thực OTP thất bại. Vui lòng thử lại.', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setDangXacThuc(false);
    }
  };

  return (
    <div className="container d-flex vh-100">
      <HelmetProvider>
        <Helmet>
          <title>{thongTinWebsite.tieu_de || 'Tên website mặc định'}</title>
          {thongTinWebsite.favicon && (
            <link rel="icon" type="image/x-icon" href={thongTinWebsite.favicon} />
          )}
        </Helmet>
      </HelmetProvider>
      <ul className="bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-header text-bg-primary text-center">
              <h4 className="card-title mb-0 text-center">
                <i className="bi-shop-window" /> Welcome To Login Admin
              </h4>
            </div>
            <div className="card-body">
              {!dangHienThiOTP ? (
                <form onSubmit={xuLyDangNhap}>
                  <div className="mb-3">
                    <label htmlFor="tenDangNhap" className="form-label">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tenDangNhap"
                      placeholder="Nhập tên đăng nhập"
                      value={tenDangNhap}
                      onChange={(e) => setTenDangNhap(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="matKhau" className="form-label">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="matKhau"
                      placeholder="Nhập mật khẩu"
                      value={matKhau}
                      onChange={(e) => setMatKhau(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="luuDangNhap"
                      checked={luuDangNhap}
                      onChange={(e) => setLuuDangNhap(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="luuDangNhap">
                      Lưu thông tin đăng nhập
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={dangXuLy}>
                    {dangXuLy ? 'Đang xử lý...' : 'Đăng nhập'}
                  </button>
                </form>
              ) : (
                <form onSubmit={xuLyXacThucOTP}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      Nhập mã xác thực
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      placeholder="Nhập mã xác thực"
                      value={maXacThuc}
                      onChange={(e) => setMaXacThuc(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={dangXacThuc}>
                    {dangXacThuc ? 'Đang xử lý...' : 'Xác thực'}
                  </button>
                </form>
              )}
            </div>
            <div className="card-footer text-center py-3">
              <small className="text-muted">© 2024 Shop Bán Trái Cây Tươi</small>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;



