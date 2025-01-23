import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import HeaderUsers from '../HeaderUsers';
import Footerusers from '../Footerusers';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['userToken', 'userName', 'loginTime']);

  useEffect(() => {
 
    // kiểm tra trạng thái login
    if   (cookies.userToken){
      toast.info("bạn đã đăng nhập",{
        position:'top-center',
        autoClose:3000,
      });
      navigate("/");
    }
  }, [cookies, navigate]);

 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/login`, {
        username,
        password,
      });

      if (response.data.status === 'success') {
        setShowOtpForm(true);
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.warning(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error('Đăng nhập thất bại. Vui lòng thử lại.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifyingOtp(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-otp`,
        JSON.stringify(otp),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        const decodedToken = JSON.parse(atob(response.data.token.split('.')[1])); // Decode JWT
        const fullName = decodedToken.FullName || username;

        const now = new Date();
        const formattedLoginTime = now.toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        const maxAge = rememberLogin ? 7 * 24 * 60 * 60 : 3 * 60 * 60; // Cookie max age
        setCookie('userToken', response.data.token, { path: '/', secure: true, sameSite: 'Strict', maxAge });
        setCookie('loginTime', formattedLoginTime, { path: '/', secure: true, sameSite: 'Strict', maxAge });
        setCookie('isUserLoggedIn', true, { path: '/', secure: true, sameSite: 'Strict', maxAge });

        toast.success(`Đăng nhập thành công! Chào mừng ${fullName}`, {
          position: 'top-center',
          autoClose: 3000,
        });

        navigate('/'); // Navigate to homepage
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
      setIsVerifyingOtp(false);
    }
  };

  return (
    <>
    <HeaderUsers/>
    <div className='py-5'></div><div className='py-5'></div>
    <div className="container py-5">
     
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-header text-bg-primary text-center">
              <h4 className="card-title mb-0 text-center">User Login</h4>
            </div>
            <div className="card-body">
              {!showOtpForm ? (
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={rememberLogin}
                      onChange={(e) => setRememberLogin(e.target.checked)}
                    />
                    <label className="form-check-label">Lưu thông tin đăng nhập</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={isProcessing}>
                    {isProcessing ? 'Đang xử lý...' : 'Đăng nhập'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3">
                    <label className="form-label">Nhập mã xác thực</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập mã xác thực"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={isVerifyingOtp}>
                    {isVerifyingOtp ? 'Đang xử lý...' : 'Xác thực'}
                  </button>
                </form>
              )}
            </div>
            <div className="card-footer text-center py-3">
              <small className="text-muted">© 2025 Website</small>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footerusers/>
    </>
  );
};

export default LoginUser;
