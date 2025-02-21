import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import {
  FaUser, FaClipboardList, FaMoneyBillAlt, FaBoxOpen, FaShippingFast, FaCalendarAlt, FaMapMarkerAlt,
  FaPhone, FaSearch, FaEye, FaEyeSlash, FaRegCreditCard, FaClock, FaTimesCircle, FaCheckCircle, FaReply, FaQuestionCircle,
  FaShoppingCart, FaTruck, FaCode, FaFileInvoiceDollar,
  FaRegCheckCircle,
  FaLock,
  FaKey,
  FaEnvelope,
  FaReceipt
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
// import '../Lichsugd.css'; // Import CSS
import { Button, Modal, Form } from "react-bootstrap"; // Import Modal and Form
import CoppyOrder from "../CoppyStatus/CoppyOrder";
// import { toast, ToastContainer } from "react-toastify"; // REMOVE

const LichSuGiaoDich = () => {
  const [danhSachGiaoDich, setDanhSachGiaoDich] = useState([]);
  const [danhSachGiaoDichHienThi, setDanhSachGiaoDichHienThi] = useState([]);
  const [tongSoDonHang, setTongSoDonHang] = useState(0);
  const [tongTienDaMua, setTongTienDaMua] = useState(0);
  const [userId, setUserId] = useState("");
  const [dangTai, setDangTai] = useState(true);
  const [loi, setLoi] = useState(null);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [cookies] = useCookies(["userToken", "loginhoten"]);
  const soItemsTrenTrang = 6;
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");
  const searchInputRef = useRef(null);
  const [hienThiFullUserId, setHienThiFullUserId] = useState(false);
  const [tongSoDonHangChoXuLy, setTongSoDonHangChoXuLy] = useState(0);
  const [tongSoDonHangHuy, setTongSoDonHangHuy] = useState(0);
  const [tongsodonDagiao, settongsodonDagiao] = useState(0);
  const [tongsodonDanggiao, setTongsodonDanggiao] = useState(0);

  // New state for change password modal
  const [showDoiMatKhauModal, setShowDoiMatKhauModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Thêm state xác nhận mật khẩu
  const [otp, setOtp] = useState("");
  const [doiMatKhauLoi, setDoiMatKhauLoi] = useState(null);
  const [doiMatKhauThanhCong, setDoiMatKhauThanhCong] = useState(false);
  const [daGuiOtp, setDaGuiOtp] = useState(false); // State để theo dõi đã gửi OTP hay chưa
  const [hasPassword, setHasPassword] = useState(null); // Mặc định là null

  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Thêm state để lưu thông tin khách hàng

  // Thêm mapping trạng thái GHN
  const ghnStatusMapping = {
    ready_to_pick: { text: 'Mới tạo đơn hàng', bgColor: 'badge bg-light text-dark border' },
    picking: { text: 'Nhân viên đang lấy hàng', bgColor: 'badge bg-primary text-white border' },
    cancel: { text: 'Hủy đơn hàng', bgColor: 'badge bg-danger text-white border' },
    money_collect_picking: { text: 'Đang thu tiền người gửi', bgColor: 'badge bg-warning text-dark border' },
    picked: { text: 'Nhân viên đã lấy hàng', bgColor: 'badge bg-info text-white border' },
    storing: { text: 'Hàng đang nằm ở kho', bgColor: 'badge bg-secondary text-white border' },
    transporting: { text: 'Đang luân chuyển hàng', bgColor: 'badge bg-warning text-dark border' },
    sorting: { text: 'Đang phân loại hàng hóa', bgColor: 'badge bg-primary text-white border' },
    delivering: { text: 'Đang giao hàng', bgColor: 'badge bg-warning text-dark border' },
    money_collect_delivering: { text: 'Đang thu tiền người nhận', bgColor: 'badge bg-warning text-dark border' },
    delivered: { text: 'Giao hàng thành công', bgColor: 'badge bg-success text-white border' },
    delivery_fail: { text: 'Giao hàng thất bại', bgColor: 'badge bg-danger text-white border' },
    waiting_to_return: { text: 'Đang đợi trả hàng', bgColor: 'badge bg-secondary text-white border' },
    return: { text: 'Đang trả hàng', bgColor: 'badge bg-warning text-dark border' },
    return_transporting: { text: 'Luân chuyển hàng trả', bgColor: 'badge bg-warning text-dark border' },
    return_sorting: { text: 'Phân loại hàng trả', bgColor: 'badge bg-primary text-white border' },
    returning: { text: 'Nhân viên đang trả hàng', bgColor: 'badge bg-info text-white border' },
    return_fail: { text: 'Trả hàng thất bại', bgColor: 'badge bg-danger text-white border' },
    returned: { text: 'Trả hàng thành công', bgColor: 'badge bg-success text-white border' },
    exception: { text: 'Đơn hàng ngoại lệ', bgColor: 'badge bg-dark text-white border' },
    damage: { text: 'Hàng bị hư hỏng', bgColor: 'badge bg-danger text-white border' },
    lost: { text: 'Hàng bị mất', bgColor: 'badge bg-danger text-white border' },
    waiting: { text: 'Chờ xử lý', bgColor: 'badge bg-primary text-white border' },
  };
  // Hàm chuyển đổi key trạng thái GHN sang text
  const getGhnStatusText = (statusKey) => {
    return ghnStatusMapping[statusKey]?.text || statusKey; // Trả về key nếu không tìm thấy
  };
  const giaiMaToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Lỗi giải mã JWT:", error);
      return null;
    }
  };
  const layLichSuGiaoDich = async () => {
    try {
      const token = cookies.userToken;
      if (!token) throw new Error("Không tìm thấy token.");
      const tokenDaGiaiMa = giaiMaToken(token);
      if (!tokenDaGiaiMa) throw new Error("Token không hợp lệ.");
      const userIdFromToken = tokenDaGiaiMa["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/KhachHang/user-orders/${userIdFromToken}`, {
        headers: {
          Authorization: `Bearer  ${token}`
        }
      }
      );
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu từ API.");
      const data = await response.json();

      if (!data || !data.data || !data.data.customers) {
        console.error("Dữ liệu API không hợp lệ:", data);
        setLoi("Dữ liệu trả về từ API không hợp lệ.");
        return;
      }

      setDanhSachGiaoDich(data.data.customers);
      setDanhSachGiaoDichHienThi(data.data.customers);
      setTongSoDonHang(data.data.totalOrders);
      setTongTienDaMua(data.data.totalSpent);
      setUserId(data.data.userId);
      setTongSoDonHangChoXuLy(data.data.tongsodonChoXuLy);
      setTongSoDonHangHuy(data.data.tongsodonHuyDon);
      settongsodonDagiao(data.data.totalDelivered);
      setTongsodonDanggiao(data.data.totalDelivering);
    } catch (error) {
      setLoi(error.message);
    } finally {
      setDangTai(false);
    }
  };

  useEffect(() => {
    if (cookies.userToken) {
      layLichSuGiaoDich();
      kiemTraMatKhau();
    } else {
      console.warn("Không tìm thấy token trong cookie.");
      // Xử lý khi không có token, ví dụ chuyển hướng người dùng đến trang đăng nhập
    }
  }, [cookies.userToken]);




  const kiemTraMatKhau = async () => {
    try {
      const token = cookies.userToken;
      if (!token) throw new Error("Không tìm thấy token.");

      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/has-password`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "success") {
        setHasPassword(response.data.hasPassword);

      } else {
        throw new Error(response.data.message || "Đã có lỗi xảy ra.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra mật khẩu:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo cho người dùng)
    }
  };


  const timKiemGiaoDich = (tuKhoa) => {
    setTuKhoaTimKiem(tuKhoa);
    const timKiem = tuKhoa.trim().toLowerCase();

    const ketQuaTimKiem = timKiem
      ? danhSachGiaoDich.filter((khachHang) =>
        khachHang.ho.toLowerCase().includes(timKiem) ||
        khachHang.ten.toLowerCase().includes(timKiem) ||
        khachHang.thanhPho.toLowerCase().includes(timKiem) ||
        khachHang.diaChiCuThe.toLowerCase().includes(timKiem) ||
        khachHang.sdt.includes(timKiem) ||
        khachHang.orders.some(order => order.order_code.toLowerCase().includes(timKiem))
      )
      : danhSachGiaoDich;

    setDanhSachGiaoDichHienThi(ketQuaTimKiem);
    setTrangHienTai(1);
  };

  const tongSoTrang = Math.ceil(danhSachGiaoDichHienThi.length / soItemsTrenTrang);
  const danhSachGiaoDichTrangHienTai = danhSachGiaoDichHienThi.slice(
    (trangHienTai - 1) * soItemsTrenTrang,
    trangHienTai * soItemsTrenTrang
  );

  const xuLyThayDoiTrang = (soTrang) => {
    setTrangHienTai(soTrang);
  };

  const trangThaiBadgeClass = (status) => {
    // Kiểm tra xem status có trong ghnStatusMapping hay không
    if (ghnStatusMapping[status]) {
      return ghnStatusMapping[status].bgColor; // Lấy bgColor từ mapping
    }
    // Nếu không có trong mapping, sử dụng các case cũ
    switch (status) {
      case "Chờ xử lý": return "badge bg-warning text-dark";
      case "Đang giao hàng": return "badge bg-info text-dark";
      case "Đã giao hàng": return "badge bg-success";
      case "Hủy đơn": return "badge bg-danger";
      default: return "badge bg-secondary";
    }
  };

  const userIdHienThi = hienThiFullUserId ? userId : userId.substring(0, 8) + "****";

  if (dangTai) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (loi) {
    return (
      <div className="alert alert-danger m-3 text-center" role="alert">
        <strong>Lỗi:</strong> {loi}
      </div>
    );
  }

  const getStatusInfo = (responseMessage) => {
    switch (responseMessage) {
      case "Thanh toán thành công":
        return { icon: <FaCheckCircle />, color: "text-success", tooltip: "Thanh toán thành công" };
      case "Hoàn tiền thành công":
        return { icon: <FaReply />, color: "text-info", tooltip: "Thanh toán thành công" };
      case "Thanh toán thất bại":
        return { icon: <FaTimesCircle />, color: "text-danger", tooltip: "Thanh toán thất bại" };
      default:
        return {};
    }
  };

  const validatePassword = (password) => {
    let error = "";
    if (!/(.*[A-Z].*)/.test(password)) {
      error = "Mật khẩu phải có ít nhất một chữ hoa. ";
    }
    if (!/(.*[a-z].*)/.test(password)) {
      error += "Mật khẩu phải có ít nhất một chữ thường. ";
    }
    if (!/(.*[0-9].*)/.test(password)) {
      error += "Mật khẩu phải có ít nhất một chữ số. ";
    }
    if (!/(.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*)/.test(password)) {
      error += "Mật khẩu phải có ít nhất một ký tự đặc biệt. ";
    }
    if (password.length < 6) {
      error += "Mật khẩu phải có ít nhất 6 ký tự. ";
    }
    return error;
  };

  const handleShowOrderDetails = (order) => {
    setSelectedOrder(order);

    // Tìm thông tin khách hàng tương ứng với đơn hàng được chọn
    const customer = danhSachGiaoDich.find(customer =>
      customer.orders.some(o => o.id === order.id)
    );
    setSelectedCustomer(customer || null);
  };


  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Modal event handlers
  const handleOpenDoiMatKhauModal = () => {
    setShowDoiMatKhauModal(true);
    setDaGuiOtp(false); // Reset state khi mở modal
    setDoiMatKhauLoi(null);
    setDoiMatKhauThanhCong(false);
    setNewPasswordError("");
    setConfirmNewPasswordError("");

  };

  const handleCloseDoiMatKhauModal = () => {
    setShowDoiMatKhauModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOtp("");
    setDoiMatKhauLoi(null);
    setDoiMatKhauThanhCong(false);
    setDaGuiOtp(false); // Reset state khi đóng modal
    setNewPasswordError("");
    setConfirmNewPasswordError("");

  };

  const handleRequestDoiMatKhau = async () => {
    setDoiMatKhauLoi(null);
    setDoiMatKhauThanhCong(false);

    // Validate mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmNewPassword) {
      setDoiMatKhauLoi("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    const newPasswordErrorText = validatePassword(newPassword);
    if (newPasswordErrorText) {
      setDoiMatKhauLoi(newPasswordErrorText);
      return;
    }
    try {
      const token = cookies.userToken;
      if (!token) throw new Error("Không tìm thấy token.");

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/request-change-password`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "success") {
        setDoiMatKhauThanhCong(true);
        setDaGuiOtp(true); // Chuyển sang form nhập OTP
        // setDoiMatKhauLoi("OTP đã được gửi đến email của bạn."); // Thông báo thành công bằng span
      } else {
        setDoiMatKhauLoi(response.data.message); // Lấy thông báo lỗi từ backend
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc lỗi không mong muốn khác
      if (error.response && error.response.data && error.response.data.message) {
        setDoiMatKhauLoi(error.response.data.message);
      } else {
        setDoiMatKhauLoi("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  const handleVerifyOtpAndChangePassword = async () => {
    setDoiMatKhauLoi(null);
    setDoiMatKhauThanhCong(false);

    try {
      const token = cookies.userToken;
      if (!token) throw new Error("Không tìm thấy token.");

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/verify-otp-and-change-password`,
        {
          otp: otp,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "success") {
        setDoiMatKhauThanhCong(true);
        setDoiMatKhauLoi(response.data.message); // Thông báo thành công bằng span
        handleCloseDoiMatKhauModal();
      } else {
        setDoiMatKhauLoi(response.data.message);
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc lỗi không mong muốn khác
      if (error.response && error.response.data && error.response.data.message) {
        setDoiMatKhauLoi(error.response.data.message);
      } else {
        setDoiMatKhauLoi("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };
  const handleSetPassword = async () => {
    setDoiMatKhauLoi(null);
    setDoiMatKhauThanhCong(false);

    // Validate mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmNewPassword) {
      setDoiMatKhauLoi("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    const newPasswordErrorText = validatePassword(newPassword);
    if (newPasswordErrorText) {
      setDoiMatKhauLoi(newPasswordErrorText);
      return;
    }

    try {
      const token = cookies.userToken;
      if (!token) throw new Error("Không tìm thấy token.");

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/set-password`,
        {
          newPassword: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "success") {
        setDoiMatKhauThanhCong(true);
        setDoiMatKhauLoi(response.data.message); // Thông báo thành công bằng span
        setHasPassword(true);
        handleCloseDoiMatKhauModal();
      } else {
        setDoiMatKhauLoi(response.data.message);
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc lỗi không mong muốn khác
      if (error.response && error.response.data && error.response.data.message) {
        setDoiMatKhauLoi(error.response.data.message);
      } else {
        setDoiMatKhauLoi("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setNewPasswordError(validatePassword(password));
  };

  const handleConfirmNewPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmNewPassword(confirmPassword);

    if (newPassword !== confirmPassword) {
      setConfirmNewPasswordError("Mật khẩu không khớp");
    } else {
      setConfirmNewPasswordError("");
    }
  };

  return (
    <>

      <HeaderUsers />
      <br />
      <br />
      {/* <ToastContainer /> // REMOVE */}
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">
          <FaClipboardList className="me-2" /> Lịch Sử Giao Dịch
        </h2>

        <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded shadow-sm">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-2">
              <FaUser className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">User ID:</span>
                <span className="fw-bold">{userIdHienThi}</span>
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2 rounded-pill"
                onClick={() => setHienThiFullUserId(!hienThiFullUserId)}
                aria-label={hienThiFullUserId ? "Ẩn User ID" : "Hiển thị User ID"}
              >
                {hienThiFullUserId ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaBoxOpen className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">Tổng số đơn hàng:</span>
                <span className="fw-bold">{tongSoDonHang}</span>
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaClock className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">Đơn hàng đang chờ xử lý:</span>
                <span className="fw-bold">{tongSoDonHangChoXuLy}</span>
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaTimesCircle className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">Đơn hàng đã hủy:</span>
                <span className="fw-bold">{tongSoDonHangHuy}</span>
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaShippingFast className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">Tổng số đơn hàng đang giao:</span>
                <span className="fw-bold">{tongsodonDanggiao}</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FaCheckCircle className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">Tổng đơn hàng hoàn thành:</span>
                <span className="fw-bold">{tongsodonDagiao}</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FaMoneyBillAlt className="me-2 text-muted" />
              <div className="d-flex align-items-center">
                <span className="text-muted small me-1">Tổng tiền đã mua:</span>
                <span className="fw-bold">{parseFloat(tongTienDaMua).toLocaleString("vi-VN")} VND</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
            {hasPassword !== null && (
              <Button variant="primary" onClick={handleOpenDoiMatKhauModal}>
                {hasPassword ? "Đổi Mật Khẩu" : "Tạo Mật Khẩu"}
              </Button>
            )}
            </div>
          </div>

          <div className="ms-auto">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm rounded-pill"
                placeholder="Tìm kiếm..."
                value={tuKhoaTimKiem}
                onChange={(e) => timKiemGiaoDich(e.target.value)}
                ref={searchInputRef}
                aria-label="Tìm kiếm lịch sử giao dịch"
              />
              <button className="btn btn-outline-secondary btn-sm rounded-pill" type="button" onClick={() => searchInputRef.current.focus()}
                aria-label="Tìm kiếm"
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {danhSachGiaoDichTrangHienTai.length === 0 && tuKhoaTimKiem !== "" ? (
          <div className="alert alert-warning text-center" role="alert">
            Không tìm thấy kết quả nào phù hợp với từ khóa "{tuKhoaTimKiem}".
          </div>
        ) : danhSachGiaoDichTrangHienTai.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Không có dữ liệu giao dịch.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {danhSachGiaoDichTrangHienTai.map((khachHang) => (
              <div className="col" key={khachHang.id}>
                <div className="card h-100 shadow-sm border-0 card-hover">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary mb-3 d-flex align-items-center">
                      <FaUser className="me-2" /> {khachHang.ho} {khachHang.ten}
                    </h5>
                    <div className="mb-3 flex-grow-1">
                      <p className="card-text"><FaMapMarkerAlt className="me-1" /> {khachHang.diaChiCuThe}, {khachHang.xaphuong},{" "}
                        {khachHang.tinhthanhquanhuyen}, {khachHang.thanhPho}</p>
                      <p className="card-text"><FaPhone className="me-1" /> {khachHang.sdt}</p>
                    </div>

                    <h6 className="text-muted mb-3">Đơn hàng:</h6>
                    {khachHang.orders.map((donHang) => (
                      <div className="card mb-3 shadow-sm border-0 order-card" key={donHang.id}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="card-title fw-bold">Mã: {donHang.order_code}
                            <CoppyOrder orderCode={donHang.order_code}/></h6>
                            <span className={trangThaiBadgeClass(donHang.status)}>
                              {getGhnStatusText(donHang.status)} {/* Sử dụng getGhnStatusText */}
                            </span>
                          </div>
                          <p className="card-text small text-muted">
                            <FaCalendarAlt className="me-1" /> {new Date(donHang.created_at).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <p className="card-text"><FaMoneyBillAlt className="me-1" /> Tổng tiền: {parseFloat(donHang.total_price).toLocaleString("vi-VN")} VND</p>
                          <p className="card-text"><FaShippingFast className="me-1" /> Phương thức: {donHang.thanhtoan}</p>
                          <p className="card-text text-muted">
                            <FaRegCreditCard className="me-1" /> Mã giao dịch: {donHang.transactionId || "không có mã giao dịch"}
                          </p>
                          <p className="card-text text-muted">
                            <span className={`me-1 ${getStatusInfo(donHang.responseMessage).color}`} title={getStatusInfo(donHang.responseMessage).tooltip}>
                              {getStatusInfo(donHang.responseMessage).icon} {/* Icon */}
                            </span>
                            <span>{donHang.responseMessage}</span> {/* Response Message */}
                          </p>
                          <Button variant="primary" onClick={() => handleShowOrderDetails(donHang)}>
                            <FaEye className="me-1" /> Xem Chi Tiết
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <nav aria-label="Phân trang" className="mt-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => xuLyThayDoiTrang(trangHienTai - 1)} aria-label="Trước">
                <span aria-hidden="true">«</span>
              </button>
            </li>

            {Array.from({ length: tongSoTrang }, (_, i) => (
              <li className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`} key={i + 1}>
                <button className="page-link" onClick={() => xuLyThayDoiTrang(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => xuLyThayDoiTrang(trangHienTai + 1)} aria-label="Sau">
                <span aria-hidden="true">»</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Change Password Modal */}
      <Modal show={showDoiMatKhauModal} onHide={handleCloseDoiMatKhauModal} centered  backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{hasPassword ? "Đổi Mật Khẩu" : "Tạo Mật Khẩu"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {doiMatKhauLoi && (
            <div className="alert alert-danger mt-3" role="alert">
              {doiMatKhauLoi}
            </div>
          )}

          {/* Form nhập mật khẩu cũ và mật khẩu mới (hiện ban đầu) */}
          {hasPassword && !daGuiOtp && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label><FaKey className="me-2" /> Mật Khẩu Cũ</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><FaLock className="me-2" /> Mật Khẩu Mới</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                {newPasswordError && (
                  <span className="text-danger">{newPasswordError}</span>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><FaRegCheckCircle className="me-2" /> Xác nhận Mật Khẩu Mới</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                />
                {confirmNewPasswordError && (
                  <span className="text-danger">{confirmNewPasswordError}</span>
                )}
              </Form.Group>
              <Button variant="primary" onClick={handleRequestDoiMatKhau}>
                Gửi OTP
              </Button>
            </Form>
          )}

          {/* Form nhập OTP (hiện sau khi gửi OTP) */}
          {hasPassword && daGuiOtp && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label><FaEnvelope className="me-2" /> OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}

          {/* Form set password */}
          {!hasPassword && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label><FaLock className="me-2" /> Mật Khẩu Mới</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                {newPasswordError && (
                  <span className="text-danger">{newPasswordError}</span>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><FaRegCheckCircle className="me-2" /> Xác nhận Mật Khẩu Mới</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                />
                {confirmNewPasswordError && (
                  <span className="text-danger">{confirmNewPasswordError}</span>
                )}
              </Form.Group>
              <Button variant="primary" onClick={handleSetPassword}>
                Đặt Mật Khẩu
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDoiMatKhauModal}>
            Đóng
          </Button>
          {/* Button Xác nhận OTP chỉ hiện khi đã gửi OTP */}
          {hasPassword && daGuiOtp && (
            <Button variant="primary" onClick={handleVerifyOtpAndChangePassword}>
              Xác Nhận OTP và Đổi Mật Khẩu
            </Button>
          )}
        </Modal.Footer>

        {doiMatKhauThanhCong && (
          <div className="alert alert-success mt-3" role="alert">
            Đổi mật khẩu thành công!
          </div>
        )}
      </Modal>


      {/* HDCT Modal */}
      <Modal show={selectedOrder !== null} onHide={handleCloseOrderDetails} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="text-white fw-bold">
            <FaClipboardList className="me-2" /> Chi tiết đơn hàng: {selectedOrder?.order_code}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <>
              <h6 className="mb-3 text-muted"><FaUser className="me-1" /> Thông tin khách hàng</h6>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong><FaUser className="me-1" /> Họ tên:</strong> {selectedCustomer?.ho} {selectedCustomer?.ten}
                  </p>
                  <p>
                    <strong><FaPhone className="me-1" /> Số điện thoại:</strong> {selectedCustomer?.sdt}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong><FaMapMarkerAlt className="me-1" /> Địa chỉ:</strong> {selectedCustomer?.diaChiCuThe}, {selectedCustomer?.xaphuong}
                  </p>
                  <p>
                    {selectedCustomer?.tinhthanhquanhuyen}, {selectedCustomer?.thanhPho}
                  </p>
                </div>
              </div>

              <h6 className="mt-4 mb-3 text-muted"><FaShoppingCart className="me-1" /> Thông tin đơn hàng</h6>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong><FaReceipt className="me-1" /> Mã đơn hàng:</strong> {selectedOrder.order_code}
                    <CoppyOrder orderCode={selectedOrder.order_code}/>
                  </p>
                  <p>
                    <strong><FaFileInvoiceDollar className="me-1" /> Phương thức thanh toán:</strong> {selectedOrder.thanhtoan}
                  </p>
                  <p>
                    <strong><FaRegCreditCard className="me-1" /> Mã giao dịch:{" "}</strong>
                    {selectedOrder?.transactionId || "không có"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong><FaCalendarAlt className="me-1" /> Ngày tạo:</strong>
                    {new Date(selectedOrder.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <strong><FaTruck className="me-1" /> Trạng thái:</strong>
                    <span className={trangThaiBadgeClass(selectedOrder.status)}>
                      {getGhnStatusText(selectedOrder.status)}
                    </span>
                  </p>
                </div>
              </div>

              <h6 className="mt-4 mb-3 text-muted"><FaShoppingCart className="me-1" /> Chi tiết đơn hàng</h6>
              {selectedOrder.orderDetails && selectedOrder.orderDetails.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr className="bg-light">
                        <th>#</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.orderDetails.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.tieude}</td>
                          <td>{item.quantity}</td>
                          <td>{parseFloat(item.price).toLocaleString("vi-VN")} VND</td>
                          <td>
                            {parseFloat(item.quantity * item.price).toLocaleString("vi-VN")} VND
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="fw-bold">
                        <th colSpan="4" className="text-end">
                          Tổng cộng:
                        </th>
                        <th>
                          {parseFloat(selectedOrder.total_price).toLocaleString("vi-VN")} VND
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center">
                  <FaQuestionCircle className="me-2 text-muted" size={30} />
                  <p>Không có chi tiết đơn hàng.</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p>Không có dữ liệu đơn hàng.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div className="text-muted small">
            <FaRegCreditCard className="me-1" /> Mã giao dịch:{" "}
            {selectedOrder?.transactionId || "không có"}
          </div>
          <Button variant="danger" onClick={handleCloseOrderDetails}>
            <FaTimesCircle className="me-1" /> Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Footerusers />
      {/* <ToastContainer /> // REMOVE */}
    </>
  );
};

export default LichSuGiaoDich;