import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HeaderUsers from "../HeaderUsers";
import Footerusers from "../Footerusers";
import { FaEnvelope, FaKey, FaLock, FaPhone, FaUser } from 'react-icons/fa';

const Dangky = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        hoten: "",
        sodienthoai: ""
    });
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const [cookies] = useCookies(["userToken"]);

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        if (cookies.userToken) {
            toast.info("Bạn đã đăng nhập!", {
                position: "top-center",
                autoClose: 3000,
            });
            navigate("/"); // Chuyển hướng về trang chủ
        }
    }, [cookies, navigate]);


    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({ ...formData, password: password });
        const errors = validatePassword(password);
        setPasswordErrors(errors);
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

    const handleRegister = async (e) => {
        e.preventDefault();
        const errors = validatePassword(formData.password);
        setPasswordErrors(errors);

        if (errors.length > 0) return;

        if (formData.password !== formData.confirmPassword) {
            toast.error("Mật khẩu nhập lại không khớp!", { position: "top-right", autoClose: 3000 });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/authenticate/register`, formData);
            toast.success(response.data.message, { position: "top-right", autoClose: 3000 });
            toast.success("OTP đã được gửi tới email!");
            setIsOtpSent(true); // Chuyển sang nhập OTP
        } catch (error) {
            console.log(formData);
            // Kiểm tra xem có response.data.message không, nếu có thì sử dụng nó
            const errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
        }
    };


    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-register-otp`,
                `"${otp}"`, // Gửi OTP dưới dạng chuỗi JSON
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Xác thực OTP thành công!", { position: "top-right", autoClose: 3000 });
            navigate("/loginuser"); // Chuyển hướng đến trang đăng nhập
        } catch (error) {
            console.error("Lỗi xác thực OTP:", error);
            toast.error(error.response?.data?.message || "Xác thực OTP thất bại!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };



    return (
        <>
            <HeaderUsers />
            <div className="py-5"></div>
            <div className="py-4"></div>


            <div className="container py-5">
                <div className="row justify-content-center align-self-center w-100">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-header text-bg-primary text-center">
                                <h4 className="card-title mb-0 text-center">Đăng Ký Tài Khoản</h4>
                            </div>
                            <div className="card-body">
                                {!isOtpSent ? (
                                    <form onSubmit={handleRegister}>
                                        <div className="mb-3">
                                            <label className="form-label"><FaUser /> Họ tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.hoten}
                                                onChange={(e) => setFormData({ ...formData, hoten: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><FaPhone /> Số điện thoại</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.sodienthoai}
                                                onInput={(e) => {
                                                    let value = e.target.value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
                                                    if (value.length > 11) {
                                                        value = value.slice(0, 11); // Giới hạn tối đa 11 ký tự
                                                    }
                                                    setFormData({ ...formData, sodienthoai: value });
                                                }}
                                                placeholder="Nhập số điện thoại"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label"><FaUser /> Tên đăng nhập</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><FaEnvelope /> Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Chỉ cập nhật state
                                                required
                                            />

                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><FaLock /> Mật khẩu</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                            {passwordErrors.map((error, index) => (
                                                <span key={index} className="text-danger d-block">{error}</span>
                                            ))}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><FaLock /> Nhập lại mật khẩu</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100"
                                        >
                                            {isOtpSent ? "Xác nhận OTP" : "Đăng ký"}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyOtp}>
                                        <div className="mb-3">
                                            <label className="form-label"><FaKey /> Nhập mã OTP</label>
                                            <input
                                                type="text" 
                                                className="form-control"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100"
                                        >
                                            {isOtpSent ? "Xác nhận OTP" : "Đăng ký"}
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

            </div>
            <ToastContainer />
            <Footerusers />
        </>
    );
};

export default Dangky;