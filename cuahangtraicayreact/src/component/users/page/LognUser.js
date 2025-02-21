import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import HeaderUsers from '../HeaderUsers';
import Footerusers from '../Footerusers';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaEnvelope, FaKey, FaLock, FaUser } from 'react-icons/fa';

const LoginUser = () => {
    // State cho thông tin đăng nhập
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [giaTriOtp, setGiaTriOtp] = useState('');
    const [dangXuLy, setDangXuLy] = useState(false);
    const [dangXacThucOtp, setDangXacThucOtp] = useState(false);
    const [hienThiFormOtp, setHienThiFormOtp] = useState(false);
    const [ghiNhoDangNhap, setGhiNhoDangNhap] = useState(false);
    const [hienThiFormQuenMatKhau, setHienThiFormQuenMatKhau] = useState(false);
    const [emailGiaTri, setEmailGiaTri] = useState('');
    const [hienThiFormDatLaiMatKhau, setHienThiFormDatLaiMatKhau] = useState(false);
    const [matKhauMoi, setMatKhauMoi] = useState('');
    const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
    const [otpQuenMatKhau, setOtpQuenMatKhau] = useState('');

    // state cho số lần gữi otp
    const [soLanGuiOtp, setSoLanGuiOtp] = useState(0);
    //State cho việc có thể gữi otp hay khong
    const [coTheGuiOtp, setCoTheGuiOtp] = useState(true);
    //State cho thời gian giũa 2 lần gữi otp
    const [thoiGianChoGuiOtp, setThoiGianChoGuiOtp] = useState(0);

    //Các State kiểm tra mật khẩu
    const [matKhauMoiErrors, setMatKhauMoiErrors] = useState([]);
    const [matKhauKhop, setMatKhauKhop] = useState(true);

    const dieuHuongTrang = useNavigate();
    const [cookies, setCookie] = useCookies(['userToken', 'userName', 'loginTime']);

    // const [captcha, setCaptcha] = useState(null);
    // const CaptchaRef = useRef(null); // tạo ref cho captcha

    const google = process.env.REACT_APP_APIKEYGOOGLE;
    // const CaptchCha = process.env.REACT_APP_CAPTCHAGOOGLE;
    useEffect(() => {
        if (cookies.userToken) {
            toast.info("bạn đã đăng nhập", {
                position: 'top-center',
                autoClose: 3000,
            });
            dieuHuongTrang("/");
        }
    }, [cookies, dieuHuongTrang]);

    //Hàm cho việc gữi thông tin và login
    const xuLyDangNhap = async (e) => {
        e.preventDefault();
        setDangXuLy(true);
        setCoTheGuiOtp(true);
        setThoiGianChoGuiOtp(0);

        // if (!captcha) {
        //     toast.error('Vui lòng xác minh bạn không phải là người máy.', {
        //         position: 'top-center',
        //         autoClose: 3000
        //     });
        //     setDangXuLy(false);
        //     return;
        // }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/login`, {
                username: tenDangNhap,
                password: matKhau,

            });

            if (response.data.status === 'success') {
                setHienThiFormOtp(true);
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
            setDangXuLy(false);
            // if (CaptchaRef.current) {
            //     CaptchaRef.current.reset();
            // }
            // setCaptcha(null); // reset giá trị)
        }
    };

    //hàm chọn capcha
    // const handleCaptcha = (even) => {
    //     setCaptcha(even);
    // }

    // Hàm verify
    const xuLyXacThucOtp = async (e) => {
        e.preventDefault();
        setDangXacThucOtp(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-otp`,
                JSON.stringify(giaTriOtp),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.status === 'success') {
                const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
                const fullName = decodedToken.FullName || tenDangNhap;

                const now = new Date();
                const formattedLoginTime = now.toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                const maxAge = ghiNhoDangNhap ? 7 * 24 * 60 * 60 : 3 * 60 * 60;
                setCookie('userToken', response.data.token, { path: '/', secure: true, sameSite: 'Strict', maxAge });
                setCookie('loginTime', formattedLoginTime, { path: '/', secure: true, sameSite: 'Strict', maxAge });
                setCookie('isUserLoggedIn', true, { path: '/', secure: true, sameSite: 'Strict', maxAge });

                toast.success(`Đăng nhập thành công! Chào mừng ${fullName}`, {
                    position: 'top-center',
                    autoClose: 3000,
                });

                dieuHuongTrang('/');
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
            setDangXacThucOtp(false);
        }
    };

    //Hàm login bằng google
    const xuLyDangNhapGoogle = async (response) => {
        try {
            if (response.credential) {
                const googleToken = response.credential;
                const responseData = await axios.post(
                    `${process.env.REACT_APP_BASEURL}/api/Authenticate/login-google`,
                    { accessToken: googleToken }
                );

                if (responseData.data.status === 'success') {
                    const decodedToken = JSON.parse(atob(responseData.data.token.split('.')[1]));
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

                    const maxAge = ghiNhoDangNhap ? 7 * 24 * 60 * 60 : 3 * 60 * 60;
                    setCookie('userToken', responseData.data.token, { path: '/', secure: true, sameSite: 'Strict', maxAge });
                    setCookie('loginTime', formattedLoginTime, { path: '/', secure: true, sameSite: 'Strict', maxAge });
                    setCookie('isUserLoggedIn', true, { path: '/', secure: true, sameSite: 'Strict', maxAge });

                    toast.success(`Đăng nhập thành công! Chào mừng ${fullName}`, {
                        position: 'top-center',
                        autoClose: 3000,
                    });

                    dieuHuongTrang('/');
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

    //Hàm Gữi mã xác nhận
    const xuLyQuenMatKhau = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/forgot-password`, {
                email: emailGiaTri,
            });

            if (response.data.status === 'success') {
                toast.success(response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
                setHienThiFormQuenMatKhau(false);
                setHienThiFormDatLaiMatKhau(true);
            } else {
                toast.error(response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Lỗi quên mật khẩu:', error);
            if (error.response && error.response.status === 404 && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            } else {
                toast.error('Yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại.', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }
        }
    };

    const validatePassword = (password) => {
        const errors = [];
        if (!/[A-Z]/.test(password)) errors.push("Phải có ít nhất 1 chữ cái viết hoa.");
        if (!/[a-z]/.test(password)) errors.push("Phải có ít nhất 1 chữ cái viết thường.");
        if (!/[0-9]/.test(password)) errors.push("Phải có ít nhất 1 số.");
        if (!/[@$!%*?&#]/.test(password)) errors.push("Phải có ít nhất 1 ký tự đặc biệt.");
        if (password.length < 6) errors.push("Phải có ít nhất 8 ký tự.");
        return errors;
    };

    const xuLyMatKhauMoiChange = (e) => {
        const newPassword = e.target.value;
        setMatKhauMoi(newPassword);
        const errors = validatePassword(newPassword);
        setMatKhauMoiErrors(errors);
        setMatKhauKhop(newPassword === xacNhanMatKhau); // Kiểm tra khớp ngay khi thay đổi
    };

    const xuLyXacNhanMatKhauChange = (e) => {
        const confirmPassword = e.target.value;
        setXacNhanMatKhau(confirmPassword);
        setMatKhauKhop(matKhauMoi === confirmPassword); // Kiểm tra khớp ngay khi thay đổi
    };

    const xuLyDatLaiMatKhau = async (e) => {
        e.preventDefault();
        if (!matKhauKhop) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.', {
                position: 'top-center',
                autoClose: 3000,
            });
            return;
        }
        if (matKhauMoiErrors.length > 0) {
            toast.error("Mật khẩu không đủ mạnh. Vui lòng kiểm tra các yêu cầu.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/reset-password`, {
                otp: otpQuenMatKhau,
                newPassword: matKhauMoi,
            });

            if (response.data.status === 'success') {
                toast.success(response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
                setHienThiFormDatLaiMatKhau(false);
                setHienThiFormQuenMatKhau(false);
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

    const xuLyGuiLaiOtp = async () => {
        if (!coTheGuiOtp) {
            return; // Ngăn chặn việc gửi lại ngay lập tức
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASEURL}/api/Authenticate/resend-otp`
            );

            if (response.data.status === 'success') {
                toast.success(response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
                setSoLanGuiOtp(response.data.resendCount);
                setCoTheGuiOtp(false);
                setThoiGianChoGuiOtp(30); // Bắt đầu thời gian hồi chiêu 30 giây

                const intervalId = setInterval(() => {
                    setThoiGianChoGuiOtp(prevCooldown => {
                        if (prevCooldown === 1) {
                            clearInterval(intervalId);
                            setCoTheGuiOtp(true); // Kích hoạt lại sau khi đủ 30s
                            return 0;
                        }
                        return prevCooldown - 1;
                    });
                }, 1000); // Cập nhật từng giây
            } else {
                toast.error(response.data.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Lỗi gửi lại OTP:', error);
            toast.error('Gửi lại OTP thất bại. Vui lòng thử lại.', {
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
                                {!hienThiFormQuenMatKhau && !hienThiFormDatLaiMatKhau ? (
                                    !hienThiFormOtp ? (
                                        <form onSubmit={xuLyDangNhap}>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    <FaUser /> Tên đăng nhập
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên đăng nhập"
                                                    value={tenDangNhap}
                                                    onChange={(e) => setTenDangNhap(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    <FaLock /> Mật khẩu
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
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
                                                    checked={ghiNhoDangNhap}
                                                    onChange={(e) => setGhiNhoDangNhap(e.target.checked)}
                                                />
                                                <label className="form-check-label">Lưu thông tin đăng nhập</label>
                                            </div>
                                            {/* xác thực captcha */}
                                            {/* <ReCAPTCHA
                                                sitekey={CaptchCha}
                                                onChange={handleCaptcha}
                                                ref={CaptchaRef}
                                            /> */}
                                            <button type="submit" className="btn btn-primary w-100" disabled={dangXuLy}>
                                                {dangXuLy ? 'Đang xử lý...' : 'Đăng nhập'}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-link w-100 mt-2"
                                                onClick={() => setHienThiFormQuenMatKhau(true)}
                                            >
                                                Quên mật khẩu?
                                            </button>
                                            <div className="d-flex align-items-center justify-content-center mt-3">
                                                <div style={{ borderTop: '1px solid #ccc', width: '40%' }}></div>
                                                <span className="mx-2" style={{ color: '#6c757d', fontSize: '0.9rem' }}>OR</span>
                                                <div style={{ borderTop: '1px solid #ccc', width: '40%' }}></div>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={xuLyXacThucOtp}>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    <FaKey /> Nhập mã xác thực
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập mã xác thực"
                                                    value={giaTriOtp}
                                                    onChange={(e) => setGiaTriOtp(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100" disabled={dangXacThucOtp}>
                                                {dangXacThucOtp ? 'Đang xử lý...' : 'Xác thực'}
                                            </button>
                                            {coTheGuiOtp ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-link w-100 mt-2"
                                                    onClick={xuLyGuiLaiOtp}
                                                >
                                                    Gửi lại mã OTP{soLanGuiOtp > 0 && ` (${soLanGuiOtp})`}
                                                </button>
                                            ) : (
                                                <p className="mt-3 text-center">
                                                    Vui lòng đợi {thoiGianChoGuiOtp} giây trước khi gửi lại OTP.
                                                </p>
                                            )}
                                        </form>
                                    )
                                ) : hienThiFormQuenMatKhau ? (
                                    <form onSubmit={xuLyQuenMatKhau}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <FaEnvelope /> Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Nhập email của bạn"
                                                value={emailGiaTri}
                                                onChange={(e) => setEmailGiaTri(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">
                                            Gửi mã xác thực
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary w-100 mt-2"
                                            onClick={() => setHienThiFormQuenMatKhau(false)}
                                        >
                                            Quay lại đăng nhập
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={xuLyDatLaiMatKhau}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <FaKey /> Mã xác thực
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập mã xác thực"
                                                value={otpQuenMatKhau}
                                                onChange={(e) => setOtpQuenMatKhau(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <FaLock /> Mật khẩu mới
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Nhập mật khẩu mới"
                                                value={matKhauMoi}
                                                onChange={xuLyMatKhauMoiChange}
                                                required
                                            />
                                            {matKhauMoiErrors.map((error, index) => (
                                                <span key={index} className="text-danger d-block">{error}</span>
                                            ))}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <FaLock /> Xác nhận mật khẩu mới
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Xác nhận mật khẩu mới"
                                                value={xacNhanMatKhau}
                                                onChange={xuLyXacNhanMatKhauChange}
                                                required
                                            />
                                            {!matKhauKhop && <span className="text-danger d-block">Mật khẩu không khớp.</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100" disabled={!matKhauKhop || matKhauMoiErrors.length > 0}>
                                            Đặt lại mật khẩu
                                        </button>
                                    </form>
                                )}

                                <GoogleOAuthProvider clientId={google} >
                                    <div className="mt-4">
                                        <GoogleLogin
                                            onSuccess={xuLyDangNhapGoogle}
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