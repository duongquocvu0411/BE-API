import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HeaderUsers from "../HeaderUsers";
import Footerusers from "../Footerusers";

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

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) errors.push("Phải có ít nhất 1 chữ cái viết hoa.");
    if (!/[a-z]/.test(password)) errors.push("Phải có ít nhất 1 chữ cái viết thường.");
    if (!/[0-9]/.test(password)) errors.push("Phải có ít nhất 1 số.");
    if (!/[@$!%*?&#]/.test(password)) errors.push("Phải có ít nhất 1 ký tự đặc biệt.");
    if (password.length < 6) errors.push("Phải có ít nhất 8 ký tự.");
    return errors;
  };
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
      toast.error(error.response?.data?.message || "Đăng ký thất bại!", { position: "top-right", autoClose: 3000 });
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
  <HeaderUsers/>
  <div className="py-5"></div>
  <div className="py-3"></div>
    <div className="container py-5">
      <h1 className="text-center mb-4">Đăng ký</h1>
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleRegister}>
        {!isOtpSent ? (
          <>
            <div className="mb-3">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                className="form-control"
                value={formData.hoten}
                onChange={(e) => setFormData({ ...formData, hoten: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
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
              <label className="form-label">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              {passwordErrors.map((error, index) => (
                <span key={index} className="text-danger d-block">{error}</span>
              ))}
            </div>
            <div className="mb-3">
              <label className="form-label">Nhập lại mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </>
        ) : (
          <div className="mb-3">
            <label className="form-label">Nhập mã OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">
          {isOtpSent ? "Xác nhận OTP" : "Đăng ký"}
        </button>
      </form>
    </div>
    <Footerusers/>
    </>
  );
};

export default Dangky;
