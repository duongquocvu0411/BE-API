import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { FaUser, FaClipboardList, FaMoneyBillAlt, FaBoxOpen, FaShippingFast, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaSearch, FaEye, FaEyeSlash, FaRegCreditCard, FaClock, FaTimesCircle, FaCheckCircle, FaReply, FaQuestionCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
// import '../Lichsugd.css'; // Import CSS
import { Button } from "react-bootstrap";

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
    layLichSuGiaoDich();
  }, []);

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
        return { icon: <FaReply />, color: "text-info", tooltip: "Hoàn tiền thành công" };
      case "Thanh toán thất bại":
        return { icon: <FaTimesCircle />, color: "text-danger", tooltip: "Thanh toán thất bại" };
      default:
        return { };
    }
  };

  return (
    <>

      <HeaderUsers />
      <br />
      <br />
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
                            <h6 className="card-title fw-bold">Mã: {donHang.order_code}</h6>
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
      <Footerusers />

    </>
  );
};

export default LichSuGiaoDich;