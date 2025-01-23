import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaPhone } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ModalAccount = ({ show, onHide, editMode, account, fetchAccounts }) => {
  const [formData, setFormData] = useState({
    username: account?.username || "",
    email: account?.email || "",
    password: "",

    sodienthoai: "",
    confirmPassword: "",
    fullName: account?.fullName || "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false); // Kiểm soát giao diện gửi OTP

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    } else if (name === "confirmPassword") {
      validateConfirmPassword(value, formData.password);
    }
  };

  // Kiểm tra mật khẩu
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!regex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Mật khẩu phải bao gồm chữ hoa, chữ thường và số, tối thiểu 6 ký tự.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, passwordError: "" }));
    }
  };

  // Kiểm tra nhập lại mật khẩu
  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPasswordError: "Mật khẩu nhập lại không khớp.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPasswordError: "" }));
    }
  };

  const handleSendOtp = async () => {
    // Nếu có lỗi trong nhập liệu, không cho gửi OTP
    if (errors.passwordError || errors.confirmPasswordError) {
      toast.error("Vui lòng kiểm tra các lỗi nhập liệu trước khi tiếp tục.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/api/Authenticate/register-employee`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        hoten: formData.fullName,
        sodienthoai:formData.sodienthoai
      });
      toast.success("OTP đã được gửi tới email!");
      setIsOtpSent(true); // Đặt trạng thái OTP đã gửi
    } catch (error) {
      console.log("Dữ liệu gửi lên server:", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        hoten: formData.fullName,
      });

      console.error("Lỗi khi gửi OTP:", error);
      toast.error("Không thể gửi OTP, vui lòng thử lại.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Gửi OTP dưới dạng chuỗi đơn giản (không phải đối tượng JSON)
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-register-employee-otp`,
        JSON.stringify(formData.otp), // Chuyển OTP thành chuỗi JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Tài khoản đã được tạo thành công!");
      fetchAccounts();
      onHide();
    } catch (error) {
      console.error("Lỗi khi xác thực OTP:", error);
      toast.error("OTP không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className="rounded-4 shadow-lg"
    >
      {/* Header */}
      <Modal.Header
        closeButton
        className="bg-success text-white border-bottom-0 rounded-top-4"
      >
        <Modal.Title className="fs-4 fw-bold">
          {editMode ? "Sửa tài khoản" : "Thêm tài khoản"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form>
          {!isOtpSent ? (
            <>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-dark">
                  <FaUser className="me-2 text-muted" />
                  Tên tài khoản
                </Form.Label>
                <InputGroup className="rounded-3">
                  <InputGroup.Text className="bg-light text-muted">
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên tài khoản"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={editMode}
                    className="rounded-3"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-dark">
                  <FaEnvelope className="me-2 text-muted" />
                  Email
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light text-muted">
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={editMode}
                    className="rounded-3"
                  />
                </InputGroup>
              </Form.Group>
              {!editMode && (
                <>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark">
                      <FaLock className="me-2 text-muted" />
                      Mật khẩu
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light text-muted">
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() =>
                          validatePassword(formData.password)
                        }
                        className="rounded-3"
                      />
                    </InputGroup>
                    {errors.passwordError && (
                      <Form.Text className="text-danger">
                        {errors.passwordError}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark">
                      <FaLock className="me-2 text-muted" />
                      Nhập lại mật khẩu
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light text-muted">
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={() =>
                          validateConfirmPassword(
                            formData.confirmPassword,
                            formData.password
                          )
                        }
                        className="rounded-3"
                      />
                    </InputGroup>
                    {errors.confirmPasswordError && (
                      <Form.Text className="text-danger">
                        {errors.confirmPasswordError}
                      </Form.Text>
                    )}
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-dark">
                  <FaUser className="me-2 text-muted" />
                  Họ tên
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light text-muted">
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="rounded-3"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-dark">
                  <FaPhone className="me-2 text-muted" />
                  Số điện thoại
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light text-muted">
                    <FaPhone />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên"
                    name="sodienthoai"
                    value={formData.sodienthoai}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
                      if (value.length > 11) {
                        value = value.slice(0, 11); // Giới hạn tối đa 11 ký tự
                      }
                      handleChange({ target: { name: "sodienthoai", value } }); // Gọi hàm handleChange với giá trị đã xử lý
                    }}
                    className="rounded-3"
                  />
                </InputGroup>
              </Form.Group>
            </>
          ) : (
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark">
                <FaCheckCircle className="me-2 text-muted" />
                Nhập mã OTP
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light text-muted">
                  <FaCheckCircle />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Nhập OTP"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="rounded-3"
                />
              </InputGroup>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      {/* Footer */}
      <Modal.Footer className="border-top-0">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          className="px-4 py-2 rounded-3"
        >
          Hủy
        </Button>
        {!isOtpSent ? (
          <Button
            variant="success"
            onClick={handleSendOtp}
            className="px-4 py-2 rounded-3"
          >
            Gửi OTP
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleVerifyOtp}
            className="px-4 py-2 rounded-3"
          >
            Xác nhận OTP
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAccount;
