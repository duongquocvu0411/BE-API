import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModlaAdddanhsachsanpham = ({ show, handleClose, isEdit, danhmuc, fetchdanhmucs }) => {
  const [name, setName] = useState('');


  useEffect(() => {
    if (isEdit && danhmuc) {
      setName(danhmuc.name);

    } else { 
      setName('');

    }
  }, [isEdit, danhmuc]);
  const handleSubmit = async () => {
    const fom ={
      name
    }
    try {
      // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
      const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
      const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');
      if (isEdit) {
        // Cập nhật danh mục hiện tại
        fom.updated_By = loggedInUser;
        await axios.put(
          `${process.env.REACT_APP_BASEURL}/api/danhmucsanpham/${danhmuc.id}`,fom
      
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        toast.success(`Danh mục ${name} đã được cập nhật thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });

        fetchdanhmucs(); // Làm mới danh sách
        resetForm();
        handleClose(); // Đóng modal

      } else {
        // Thêm mới danh mục
        fom.created_By = loggedInUser;
        fom.updated_By = loggedInUser;
        await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`,fom
          
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        toast.success(`Danh mục ${name} đã được thêm thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });

        fetchdanhmucs(); // Làm mới danh sách
        resetForm();
        handleClose(); // Đóng modal
      }
    } catch (error) {
      console.error(
        isEdit ? "Có lỗi xảy ra khi cập nhật danh mục!" : "Có lỗi xảy ra khi thêm mới danh mục!",
        error
      );
    
      // Lấy thông báo từ backend
      const message = error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
    
      // Hiển thị thông báo lỗi từ backend
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const resetForm = () => {
    setName("");
  }


  return (
    <Modal show={show} onHide={handleClose} centered   backdrop="static">
    <Modal.Header closeButton className="bg-primary text-white">
      <Modal.Title>
        {isEdit ? (
          <>
            <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa danh mục
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i> Thêm mới danh mục
          </>
        )}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        {/* Input Tên Danh Mục */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-folder-plus me-2"></i> Tên danh mục
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm"
            style={{ borderRadius: "8px" }}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
        onClick={handleClose}
        className="shadow-sm"
        style={{ borderRadius: "8px" }}
      >
        <i className="bi bi-x-circle me-2"></i> Hủy
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
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
  

  );
};

export default ModlaAdddanhsachsanpham;
