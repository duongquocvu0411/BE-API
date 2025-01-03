import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalTencuahang = ({ show, handleClose, isEdit, detail, fetchDetails }) => {
  const [ten, setTen] = useState('');

  useEffect(() => {
    if (isEdit && detail) {
      setTen(detail.name);
    } else {
      setTen('');
    }
  }, [isEdit, detail]); 

  const handleSave = () => {
    const updatedData = { 
      name: ten, 
      trangthai: isEdit && detail ? detail.trangthai : 'không sử dụng' 
    };
    // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
    const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');

    if (isEdit) {
      updatedData.Updated_By = loggedInUser;
      axios.put(`${process.env.REACT_APP_BASEURL}/api/Tencuahang/${detail.id}`, updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        })
        .then(() => {
          toast.success("Tên cửa hàng đã được sửa thành công", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchDetails();
          ResetForm();
          handleClose();
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi sửa tên cửa hàng:", error);
          toast.error("Có lỗi khi sửa tên cửa hàng", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      updatedData.Created_By = loggedInUser;
      updatedData.Updated_By = loggedInUser;
      axios.post(`${process.env.REACT_APP_BASEURL}/api/Tencuahang`, updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        })
        .then(() => {
          toast.success("Tên cửa hàng đã được thêm thành công", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchDetails();
          ResetForm();
          handleClose();
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi thêm tên cửa hàng:", error);
          toast.error("Có lỗi khi thêm tên cửa hàng", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };
  const ResetForm = () =>{
    setTen('');
  }

  return (
    <>
    <Modal show={show} onHide={handleClose} centered   backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {isEdit ? (
            <>
              <i className="bi bi-pencil-square me-2"></i> Sửa Tên Cửa Hàng
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i> Thêm Tên Cửa Hàng
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTenCuahang" className="mb-3">
            <Form.Label className="fw-bold">   <i className="bi bi-shop me-2"></i> Tên Cửa Hàng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên cửa hàng"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              className="shadow-sm"
              style={{ borderRadius: "8px" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="shadow-sm">
          <i className="bi bi-x-circle me-2"></i> Đóng
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          className="shadow-sm text-white"
          style={{ borderRadius: "8px" }}
        >
            {isEdit ? (
          <>
            <i className="bi bi-pencil-square me-2"></i> Cập nhật
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i> Thêm mới
          </>
        )}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  
  );
};

export default ModalTencuahang;
