import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderUsers from "./HeaderUsers";
import Footerusers from "./Footerusers";
import CoppyOrder from './CoppyStatus/CoppyOrder';

const ThanhToanThanhCong = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ state được truyền qua navigate
  const { orderCode, khachHang, hoaDon, chiTietHoaDon } = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <HeaderUsers />
      <div className="py-5"></div>
      <div className="container mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body text-center">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: "4rem" }}
            ></i>
            <h2 className="mt-3 text-success">Thanh toán thành công!</h2>
            <p className="text-muted">
              Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn
              đã được xử lý thành công!
            </p>
            <div className="alert alert-info">
              <strong>Mã đơn hàng:</strong> {orderCode}
              <CoppyOrder orderCode={orderCode}/>
            </div>
            <div className="mt-4 text-start">
              <h5 className="text-success">Thông tin khách hàng</h5>
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  <strong>Họ tên:</strong> {khachHang?.ho} {khachHang?.ten}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {khachHang?.emailDiaChi || "Không có thông tin"}
                </li>
                <li className="list-group-item">
                  <strong>Số điện thoại:</strong> {khachHang?.sdt || "Không có thông tin"}
                </li>
                <li className="list-group-item">
                  <strong>Địa chỉ:</strong> {khachHang?.diaChiCuThe}, {khachHang?.xaphuong}, {khachHang?.tinhthanhquanhuyen}, {khachHang?.thanhPho}
                </li>
              </ul>
              <h5 className="text-success mt-4">Chi tiết hóa đơn</h5>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {chiTietHoaDon?.length > 0 ? (
                    chiTietHoaDon.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.sanPhamTitle}</td>
                        <td>{item.quantity}</td>
                        <td>{parseFloat(item.price).toLocaleString("vi-VN")} VND</td>
                        <td>
                          {(item.quantity * item.price).toLocaleString("vi-VN")} VND
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Không có chi tiết hóa đơn
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-primary btn-lg mt-4"
              onClick={handleBackToHome}
            >
              <i className="bi bi-house-door"></i> Quay về trang chủ
            </button>
          </div>
        </div>
      </div>
      <Footerusers />
    </>
  );
};

export default ThanhToanThanhCong;
