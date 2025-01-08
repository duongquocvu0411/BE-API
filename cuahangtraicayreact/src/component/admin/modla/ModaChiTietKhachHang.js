import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalChiTietKhachHang = ({ show, handleClose, chiTietKhachHang, capNhatTrangThai, xoaKhachHang, layTrangThaiDonHang, isLoading }) => {
  const [showModalXoa, setShowModalXoa] = useState(false); // Quản lý trạng thái hiển thị modal xóa

  const inHoaDon = () => {
    const noiDungIn = document.getElementById('printContent').innerHTML;
    const noiDungGoc = document.body.innerHTML;

    document.body.innerHTML = noiDungIn;
    window.print();
    document.body.innerHTML = noiDungGoc;
    window.location.reload();
  };
  const handleHienThiModalXoa = () => {
    setShowModalXoa(true); // Hiển thị modal xóa
  };

  const handleDongModalXoa = () => {
    setShowModalXoa(false); // Đóng modal xóa
  };

  const handleXacNhanXoa = async () => {
    if (chiTietKhachHang) {
      await xoaKhachHang(chiTietKhachHang.id, `${chiTietKhachHang.ho} ${chiTietKhachHang.ten}`);
      setShowModalXoa(false); // Đóng modal sau khi xóa
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            <i className="bi bi-person-badge"></i> Chi Tiết Khách Hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {chiTietKhachHang && (
            <div id="printContent">
              {/* Thông tin khách hàng */}
              <div className="card border-primary mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-info-circle-fill"></i> Thông Tin Khách Hàng
                  </h5>
                </div>
                <div className="card-body">
                  <p><i className="bi bi-person-fill"></i> <strong>Họ Tên:</strong> {chiTietKhachHang.ho} {chiTietKhachHang.ten}</p>
                  <p><i className="bi bi-envelope-fill"></i> <strong>Email:</strong> {chiTietKhachHang.email}</p>
                  <p><i className="bi bi-telephone-fill"></i> <strong>Số Điện Thoại:</strong> {chiTietKhachHang.sdt}</p>
                  <p>
                    <i className="bi bi-geo-alt-fill"></i> <strong>Địa chỉ:</strong> {chiTietKhachHang.diaChiCuThe}, {chiTietKhachHang.xaphuong}, {chiTietKhachHang.tinhthanhquanhuyen}, {chiTietKhachHang.thanhPho}
                  </p>
                  <p><i className="bi bi-pencil-fill"></i> <strong>Ghi chú:</strong> {chiTietKhachHang.ghichu || "Không có ghi chú"}</p>
                </div>
              </div>

              {/* Danh sách hóa đơn */}
              <div className="card border-success">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-receipt"></i> Danh Sách Hóa Đơn
                  </h5>
                </div>
                <div className="card-body">
                  {chiTietKhachHang.hoaDons && chiTietKhachHang.hoaDons.length > 0 ? (
                    chiTietKhachHang.hoaDons.map((bill, index) => (
                      <div key={index} className="border-bottom pb-3 mb-3">
                        <p>
                          <i className="bi bi-calendar-check-fill"></i> <strong>Ngày tạo:</strong> {bill.ngaytao ? new Date(bill.ngaytao).toLocaleDateString("vi-VN") : "Không có thông tin"}
                        </p>
                        <p>
                          <i className="bi bi-cash"></i> <strong>Tổng tiền:</strong> {parseFloat(bill.total_price).toLocaleString("vi-VN", { style: 'decimal', minimumFractionDigits: 0 })} VND
                        </p>
                        <p>
                          <i class="bi bi-credit-card"></i> <strong>Thanh toán:</strong> {bill.thanhtoan}
                        </p>
                        <p>
                          <i className="bi bi-circle-fill"></i> <strong>Trạng thái:</strong> <span className={`badge ${layTrangThaiDonHang([bill]).bgColor}`}>{bill.status}</span>
                        </p>
                        <p><i className="bi bi-hash"></i> <strong>Mã đơn hàng:</strong> {bill.order_code}</p>
                        <h6 className="mt-4 text-primary">
                          <i className="bi bi-cart-check"></i> Chi tiết sản phẩm:
                        </h6>
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered">
                            <thead className="table-primary">
                              <tr>
                                <th scope="col" className="text-center">#</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col" className="text-center">Số lượng</th>
                                <th scope="col" className="text-center">Đơn vị tính</th>
                                <th scope="col" className="text-end">Đơn giá (VND)</th>
                                <th scope="col" className="text-end">Thành tiền (VND)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bill.hoaDonChiTiets.map((chitiet, idx) => (
                                <tr key={idx}>
                                  <td className="text-center">{idx + 1}</td>
                                  <td>{chitiet.tieude}</td>
                                  <td className="text-center">{chitiet.quantity}</td>
                                  <td className="text-center">{chitiet.don_vi_tinh}</td>
                                  <td className="text-end">
                                    {parseFloat(chitiet.price).toLocaleString("vi-VN", { style: "decimal", minimumFractionDigits: 0 })}
                                  </td>
                                  <td className="text-end">
                                    {(chitiet.quantity * chitiet.price).toLocaleString("vi-VN", { style: "decimal", minimumFractionDigits: 0 })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th colSpan="5" className="text-end">Tổng cộng:</th>
                                <th className="text-end">
                                  {bill.hoaDonChiTiets
                                    .reduce((sum, chitiet) => sum + chitiet.quantity * chitiet.price, 0)
                                    .toLocaleString("vi-VN", { style: "decimal", minimumFractionDigits: 0 })}
                                  VND
                                </th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>


                        {/* Hành động */}
                        <div className="d-flex align-items-center">
                          {bill.status === "Hủy đơn" || bill.status === 'Thanh toán thất bại' && (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={handleHienThiModalXoa}
                              disabled={!chiTietKhachHang || !chiTietKhachHang.hoaDons?.some(hd => hd.status === "Hủy đơn" || hd.status === "Thanh toán thất bại")}
                            >
                              <i className="bi bi-trash-fill"></i> Xóa Khách Hàng
                            </button>

                          )}

                          {bill.status !== "Hủy đơn" &&
                            bill.status !== "Đã giao thành công" &&
                            bill.status !== "Thanh toán thất bại" &&
                            bill.status !== "Chờ thanh toán" && (
                              <Form.Group controlId="formTrangThai" className="ms-3">
                                <Form.Label>
                                  <i className="bi bi-toggle-on"></i> <strong>Cập nhật trạng thái:</strong>
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  value=""
                                  onChange={(e) => capNhatTrangThai(bill.id, e.target.value)}
                                  className="form-select-sm"
                                  disabled={isLoading} // Vô hiệu hóa khi đang loading
                                >
                                  {/* Hiển thị trạng thái hiện tại nhưng không trong danh sách xổ xuống */}
                                  <option disabled value="">
                                    -- {bill.status} (Hiện tại) --
                                  </option>

                                  {/* Các trạng thái khác */}
                                  {bill.thanhtoan !== "VnPay" &&
                                    bill.thanhtoan !== "Momo" &&
                                    bill.status !== "Chờ xử lý" && (
                                      <option value="Chờ xử lý">Chờ xử lý</option>
                                    )}
                                  {bill.status !== "Đang giao" && <option value="Đang giao">Đang giao</option>}
                                  {bill.status !== "Đã giao thành công" && (
                                    <option value="Đã giao thành công">Đã giao thành công</option>
                                  )}
                                  {bill.thanhtoan !== "VnPay" &&
                                    bill.thanhtoan !== "Momo" &&
                                    bill.status !== "Hủy đơn" && (
                                      <option value="Hủy đơn">Hủy đơn</option>
                                    )}
                                  {bill.status !== "Giao không thành công" && (
                                    <option value="Giao không thành công">Giao không thành công</option>
                                  )}
                                </Form.Control>

                                {/* Hiển thị spinner khi đang loading */}
                                {isLoading && (
                                  <div className="spinner-border text-primary ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                )}
                              </Form.Group>
                            )}


                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted"><i className="bi bi-info-circle"></i> Không có hóa đơn nào được ghi nhận.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <i className="bi bi-x-circle"></i> Đóng
          </Button>
          <Button variant="primary" onClick={inHoaDon}>
            <i className="bi bi-printer"></i> In Hóa Đơn
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalXoa}
        onHide={handleDongModalXoa}
        centered
        backdrop="static" // Không cho phép đóng khi click ra ngoài
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle-fill me-2"></i> Xác nhận xóa khách hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-person-x-fill fa-4x text-danger mb-3"></i>
            <h5>Bạn có chắc chắn muốn xóa khách hàng này?</h5>
            <p className="text-muted">
              <strong>Họ tên:</strong> {chiTietKhachHang?.ho} {chiTietKhachHang?.ten} <br />
              <strong>Email:</strong> {chiTietKhachHang?.emailDiaChi} <br />
              <strong>Số điện thoại:</strong> {chiTietKhachHang?.sdt}
            </p>
            <p className="text-muted">Hành động này không thể hoàn tác.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleDongModalXoa}>
            <i className="bi bi-x-circle"></i> Hủy
          </Button>
          <Button variant="danger" onClick={handleXacNhanXoa}>
            <i className="bi bi-check-circle"></i> Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default ModalChiTietKhachHang;
