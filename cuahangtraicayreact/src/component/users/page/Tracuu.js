import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderUsers from './../HeaderUsers';
import Footerusers from './../Footerusers';
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button } from 'react-bootstrap';  // Thêm Modal và Button từ react-bootstrap
import Aos from "aos";

const Tracuu = () => {
  const [madonhang, setmadonhang] = useState("");
  const [dathangchitiet, setDathangchitiet] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);  // Điều khiển việc hiển thị modal

  useEffect(() => {
    // Khởi tạo AOS sau khi component được render
    Aos.init({
      duration: 1000, // Thời gian hiệu ứng
      easing: 'ease-in-out', // Hiệu ứng easing

    });
  }, []);

  // Hàm xử lý tra cứu đơn hàng
  const handleLookupOrder = async (e) => {
    e.preventDefault();

    if (!madonhang) {
      setError("Vui lòng nhập mã đơn hàng.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/hoadon/tracuu/${madonhang}`);
      setDathangchitiet(response.data);
      setError("");
    } catch (error) {
      console.error("Lỗi khi tra cứu đơn hàng:", error);
      setError("Không tìm thấy đơn hàng với mã này.");
      setDathangchitiet(null);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASEURL}/api/hoadon/tracuu/${madonhang}/huydon`);
      setDathangchitiet({ ...dathangchitiet, status: "Hủy đơn" });
      toast.success("Đơn hàng của bạn đã hủy thành công", {
        position: 'top-right',
        autoClose: 3000
      });
      setShowModal(false); // Đóng modal sau khi hủy thành công
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      toast.error('Có lỗi khi hủy đơn hàng của bạn. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };
  
  // hàm để chọn class cho trạng thái đơn hàng
  const getStatusClass = (status) => {
    switch (status) {
      case 'Đã Thanh toán':
        return ' bg-info text-dark border border-info'
      case 'Đang giao':
        return 'bg-warning text-dark';  // Màu vàng cho đang giao
      case 'Đã giao thành công':
        return 'bg-success text-white';  // Màu xanh cho giao thành công
      case 'Giao không thành công':
        return 'bg-danger text-white';  // Màu đỏ cho không thành công
      case 'Hủy đơn':
        return 'bg-secondary text-white';  // Màu xám cho hủy đơn
      case 'Chờ xử lý':
        return 'bg-info text-white';  // Màu xanh da trời cho chờ xử lý
      default:
        return '';  // Không có class nếu không có trạng thái
    }
  };

  return (
    <>
      <HeaderUsers />

      <div className="container-fluid page-header text-white py-5" >
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-animation">
            <span className="animated-letter">T</span>
            <span className="animated-letter">r</span>
            <span className="animated-letter">a</span>
            &nbsp;
            <span className="animated-letter">C</span>
            <span className="animated-letter">ứ</span>
            <span className="animated-letter">u</span>
            &nbsp;
            <span className="animated-letter">Đ</span>
            <span className="animated-letter">ơ</span>
            <span className="animated-letter">n</span>
            &nbsp;
            <span className="animated-letter">H</span>
            <span className="animated-letter">à</span>
            <span className="animated-letter">n</span>
            <span className="animated-letter">g</span>
          </h1>
        </div>
      </div>

      <div className="container my-5 py-5" data-aos="fade-up">
        {/* Form tra cứu đơn hàng */}
        <form onSubmit={handleLookupOrder} className="mb-5">
          <div className="input-group input-group-lg shadow-sm">
            <input
              type="text"
              className="form-control border-primary rounded-3"
              placeholder="Nhập mã đơn hàng của bạn"
              value={madonhang}
              onChange={(e) => setmadonhang(e.target.value)}
              aria-label="Mã đơn hàng"
            />
            <button className="btn btn-primary rounded-3" type="submit">
              <i className="fas fa-search"></i> Tra cứu
            </button>
          </div>
        </form>

        {/* Hiển thị lỗi nếu có */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Chi tiết đơn hàng */}
        {dathangchitiet && (
          <div className="card shadow-lg border-0 mb-5">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top">
              <h5 className="mb-0">Chi tiết đơn hàng: {dathangchitiet.orderCode}</h5>
              <small className="text-white">Ngày đặt hàng: {new Date(dathangchitiet.created_at).toLocaleDateString()}</small>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Trạng thái đơn hàng:</strong>{" "}
                <span className={`badge ${getStatusClass(dathangchitiet.status)}`}>{dathangchitiet.status}</span>
              </p>

              {/* Chi tiết sản phẩm */}
              <h6 className="mt-4 text-primary">
                <i className="fas fa-cogs"></i> Chi tiết sản phẩm:
              </h6>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dathangchitiet.hoaDonChiTiets && Array.isArray(dathangchitiet.hoaDonChiTiets) ? (
                      dathangchitiet.hoaDonChiTiets.map((item, index) => (
                        <tr key={index}>
                          <td>{item.sanPhamNames}</td>
                          <td>{item.quantity} {item.sanPhamDonViTinh}</td>
                          <td>{parseFloat(item.price).toLocaleString("vi-VN", {style:'decimal', minimumFractionDigits: 0 })} VND</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">Không có chi tiết sản phẩm</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Tổng giá trị đơn hàng */}
              <p className="card-text">
                <strong>Tổng giá trị đơn hàng:</strong> {parseFloat(dathangchitiet.total_price).toLocaleString("vi-VN", { style:'decimal',minimumFractionDigits: 0 })} VND
              </p>

              {/* Nút hủy đơn hàng */}
              {dathangchitiet.status === "Chờ xử lý" && dathangchitiet.thanhtoan !== "VnPay" && dathangchitiet.thanhtoan !== "Momo" && (
                <div className="text-center mt-4">
                  <button
                    className="btn btn-danger rounded-3 py-2 px-4"
                    onClick={() => {
                      setShowModal(true); // Hiển thị modal khi nhấn hủy
                    }}
                  >
                    <i className="fas fa-ban"></i> Hủy đơn hàng
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Modal xác nhận hủy đơn hàng */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static" // Không cho phép đóng khi click ra ngoài
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i> Xác nhận hủy đơn hàng
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <i className="fas fa-ban fa-4x text-danger mb-3"></i>
          <h5 className="mb-3">Bạn có chắc chắn muốn hủy đơn hàng này?</h5>
          <p className="text-muted">Hành động này không thể hoàn tác.</p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="fas fa-times me-2"></i> Hủy
          </Button>
          <Button variant="danger" onClick={handleCancelOrder}>
            <i className="fas fa-check me-2"></i> Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>


      <Footerusers />
      <ToastContainer />
    </>
  );
};

export default Tracuu;
