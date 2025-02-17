import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import HeaderUsers from '../HeaderUsers';
import Footerusers from '../Footerusers';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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

  // Forgot password states
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [email, setEmail] = useState('');
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');

  useEffect(() => {
    if (cookies.userToken) {
      toast.info("bạn đã đăng nhập", {
        position: 'top-center',
        autoClose: 3000,
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

  const handleGoogleLogin = async (response) => {
    try {
        if (response.credential) {
            const googleToken = response.credential;
            const responseData = await axios.post(
                `${process.env.REACT_APP_BASEURL}/api/Authenticate/login-google`,
                { accessToken: googleToken } // Gửi token từ Google đến backend
            );

            if (responseData.data.status === 'success') {
                const decodedToken = JSON.parse(atob(responseData.data.token.split('.')[1])); // Decode JWT
                const fullName = decodedToken.FullName || 'Unknown';
                
                const now = new Date();
                const formattedLoginTime = now.toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                // Lưu token và thời gian đăng nhập vào cookies
                const maxAge = rememberLogin ? 7 * 24 * 60 * 60 : 3 * 60 * 60; // Cookie max age
                setCookie('userToken', responseData.data.token, { path: '/', secure: true, sameSite: 'Strict', maxAge });
                setCookie('loginTime', formattedLoginTime, { path: '/', secure: true, sameSite: 'Strict', maxAge });
                setCookie('isUserLoggedIn', true, { path: '/', secure: true, sameSite: 'Strict', maxAge });

                toast.success(`Đăng nhập thành công! Chào mừng ${fullName}`, {
                    position: 'top-center',
                    autoClose: 3000,
                });

                navigate('/'); // Chuyển hướng đến trang chính
            } else {
                toast.warning(responseData.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }
        } else {
            toast.error('Lỗi đăng nhập với Google. Vui lòng thử lại.', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập Google:', error);
        toast.error('Đăng nhập với Google thất bại. Vui lòng thử lại.', {
            position: 'top-center',
            autoClose: 3000,
        });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/forgot-password`, {
        email: email,
      });

      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
        setShowForgotPasswordForm(false); // Hide email form
        setShowResetPasswordForm(true); // Show OTP and new password form
      } else {
        // Display the backend's error message
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Lỗi quên mật khẩu:', error);

      // Check if the error is a 404 error, and display the backend's message if available
      if (error.response && error.response.status === 404 && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        // If it's a different type of error, display a generic message
        toast.error('Yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/reset-password`, {
        otp: forgotPasswordOtp,
        newPassword: newPassword,
      });

      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
        setShowResetPasswordForm(false); // Hide the reset password form
        setShowForgotPasswordForm(false); //hide forgot password form
        // navigate('/loginuser'); // Redirect to login page after successful password reset
      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Lỗi đặt lại mật khẩu:', error);
      toast.error('Đặt lại mật khẩu thất bại. Vui lòng thử lại.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };


  return (
    <>
      <HeaderUsers />
      <div className="py-5"></div><div className="py-5"></div>
      <div className="container py-5">
        <div className="row justify-content-center align-self-center w-100">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-header text-bg-primary text-center">
                <h4 className="card-title mb-0 text-center">User Login</h4>
              </div>
              <div className="card-body">
                {!showForgotPasswordForm && !showResetPasswordForm ? ( // Show Login or OTP form
                  !showOtpForm ? (
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
                      <button
                        type="button"
                        className="btn btn-link w-100 mt-2"
                        onClick={() => setShowForgotPasswordForm(true)}
                      >
                        Quên mật khẩu?
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
                  )
                ) : showForgotPasswordForm ? ( //Show forgot password form
                  <form onSubmit={handleForgotPassword}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Gửi mã xác thực
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={() => setShowForgotPasswordForm(false)}
                    >
                      Quay lại đăng nhập
                    </button>
                  </form>
                ) : ( // Show reset password form
                  <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                      <label className="form-label">Mã xác thực</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mã xác thực"
                        value={forgotPasswordOtp}
                        onChange={(e) => setForgotPasswordOtp(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mật khẩu mới</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Đặt lại mật khẩu
                    </button>
                  </form>
                )}


                <GoogleOAuthProvider clientId="272536894236-3sl25tri9oc80al1tjlo0tfm7l75ce0l.apps.googleusercontent.com" >
                  <div className="mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={(error) => console.error(error)}
                      useOneTap
                    />
                  </div>
                </GoogleOAuthProvider>
              </div>
              <div className="card-footer text-center py-3">
                <small className="text-muted">© 2025 Website</small>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footerusers />
    </>
  );
};

export default LoginUser;