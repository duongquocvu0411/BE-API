import React, { useState } from "react";
import { Modal, Button, Table, Accordion } from "react-bootstrap";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaMoneyBill,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";

const ModalUserChitiet = ({ show, handleClose, userOrders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Mỗi trang hiển thị 1 khách hàng

  if (!userOrders || !userOrders.customers) {
    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaUser className="me-2" /> Chi tiết tài khoản
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">Không có dữ liệu khách hàng để hiển thị.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const totalPages = Math.ceil(userOrders.customers.length / itemsPerPage);

  const currentCustomers = userOrders.customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <FaUser className="me-2" /> Chi tiết tài khoản
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <p>
            <FaShoppingCart className="me-2 text-info" />
            <strong>Tổng số đơn hàng:</strong> {userOrders.totalOrders}
          </p>
          <p>
            <FaMoneyBill className="me-2 text-success" />
            <strong>Tổng chi tiêu:</strong>{" "}
            {parseFloat(userOrders.totalSpent).toLocaleString("vi-VN")} VND
          </p>
        </div>

        <h5 className="text-success mb-4">
          <FaClipboardList className="me-2" /> Thông tin khách hàng
        </h5>
        <Accordion>
          {currentCustomers.map((customer, index) => (
            <Accordion.Item eventKey={index} key={customer.id}>
              <Accordion.Header>
                <FaUser className="me-2 text-primary" /> {customer.ho} {customer.ten} -{" "}
                {customer.thanhPho}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <FaMapMarkerAlt className="me-2 text-warning" />
                  <strong>Địa chỉ:</strong>{" "}
                  {`${customer.diaChiCuThe}, ${customer.xaphuong}, ${customer.tinhthanhquanhuyen}, ${customer.thanhPho}`}
                </p>
                <p>
                  <FaPhone className="me-2 text-success" />
                  <strong>Số điện thoại:</strong> {customer.sdt}
                </p>
                <Table striped bordered hover responsive className="mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Mã đơn hàng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Phương thức</th>
                      <th>Ghi chú GHN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map((order, idx) => (
                      <tr key={order.id}>
                        <td>{idx + 1}</td>
                        <td>{order.order_code}</td>
                        <td className="text-success">
                          {parseFloat(order.total_price).toLocaleString("vi-VN")} VND
                        </td>
                        <td>{order.status}</td>
                        <td>{order.thanhtoan}</td>
                        <td>{order.ghn}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Phân trang */}
        <nav>
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Trước
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Tiếp
              </button>
            </li>
          </ul>
        </nav>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUserChitiet;
