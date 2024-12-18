import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { toast, ToastContainer } from "react-toastify";
import Aos from "aos";
import { Modal, Button } from "react-bootstrap";
const Giohang = () => {
  const { giohang, XoaGioHang, TangSoLuong, GiamSoLuong, CapnhatSoLuong, Xoatoanbogiohang } = useContext(CartContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false); // Đóng modal
  const handleModalShow = () => {
    if (giohang.length === 0) {
      toast.warning("Giỏ hàng của bạn đang trống!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      setShowModal(true);
    }
  };

  // Tính tổng giá trị của giỏ hàng và định dạng theo kiểu tiền tệ Việt Nam
  const tongTienGioHang = giohang.reduce(
    (tong, item) => tong + parseFloat(item.gia) * item.soLuong, // Sử dụng `gia` thay vì `giatien`
    0
  );
  useEffect(() => {
    // Khởi tạo AOS sau khi component được render
    Aos.init({
      duration: 1000, // Thời gian hiệu ứng
      easing: 'ease-in-out', // Hiệu ứng easing
     
    });
  }, []);

  const handleThanhtoan = () => {
    if (giohang.length === 0) {
      toast.warning("Giỏ hàng trống, không thể thanh toán", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      navigate("/thanhtoan");
    }
  };

  const handleConfirmDelete = () => {
    Xoatoanbogiohang(); // Gọi hàm xóa toàn bộ giỏ hàng
    setShowModal(false); // Đóng modal sau khi xóa
    toast.success("Đã xóa toàn bộ sản phẩm khỏi giỏ hàng!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <>
      <div>
        <HeaderUsers />
        {/* Single Page Header */}
        <div className="container-fluid py-5 page-header text-white">
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold text-animation">
              <span className="animated-letter">G</span>
              <span className="animated-letter">i</span>
              <span className="animated-letter">ỏ</span>
              &nbsp;
              <span className="animated-letter">H</span>
              <span className="animated-letter">à</span>
              <span className="animated-letter">n</span>
              <span className="animated-letter">g</span>
            </h1>

          </div>
        </div>
        {/* Cart Page */}
        <div className="container-fluid py-5">
          <div className="container" data-aos="fade-up">
            <div className="table-responsive">
              {/* <table className="table table-bordered text-center align-middle"> */}
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {giohang && giohang.length > 0 ? (
                    giohang.map((sanPham, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={sanPham.hinhanh}
                            className="img-thumbnail rounded-circle"
                            style={{ width: "60px", height: "60px" }}
                            alt={sanPham.tieude}
                          />
                        </td>
                        <td>{sanPham.tieude}</td>
                        <td>
                          {parseFloat(sanPham.gia).toLocaleString("vi-VN", { minimumFractionDigits: 3 })} {"VND"}
                          / {sanPham.don_vi_tinh}
                        </td>
                        <td>
                          <div className="input-group justify-content-center">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => GiamSoLuong(sanPham.id)}
                            >
                              <i className="bi bi-dash-circle-fill"></i>
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              value={sanPham.soLuong || 1}
                              min="1"
                              onChange={(e) => CapnhatSoLuong(sanPham.id, e.target.value)}
                              style={{ maxWidth: "60px" }}
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => TangSoLuong(sanPham.id)}
                            >
                              <i className="bi bi-plus-circle-fill"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          {(parseFloat(sanPham.gia) * sanPham.soLuong).toLocaleString("vi-VN", {
                            minimumFractionDigits: 3,
                          })} {"VND"}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => XoaGioHang(sanPham.id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <p className="mb-3">Giỏ hàng của bạn trống.</p>
                        <Link to="/cuahang" className="btn btn-primary btn-sm">
                          <i className="bi bi-cart-plus me-2"></i> Mua sắm ngay
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="row g-4 justify-content-end mt-4">
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-center mb-4">Tổng Giỏ hàng</h3>
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <span className="fw-bold">Tổng:</span>
                      <span>
                        {tongTienGioHang.toLocaleString("vi-VN", { minimumFractionDigits: 3 })} vnđ
                      </span>
                    </div>
                    <div className="mt-4">
                      <button
                        className="btn btn-primary w-100 mb-2"
                        onClick={handleThanhtoan}
                      >
                        <i className="bi bi-credit-card-2-front me-2"></i> Thanh toán
                      </button>
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={handleModalShow}
                      >
                        <i className="bi bi-trash-fill me-2"></i> Xóa hết sản phẩm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Xác Nhận */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-exclamation-circle-fill text-warning"></i>{" "}
            Xác nhận xóa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không? <br />
            Hành động này không thể hoàn tác!
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleModalClose}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Footerusers />
      <ToastContainer />
    </>


  );
};

export default Giohang;
