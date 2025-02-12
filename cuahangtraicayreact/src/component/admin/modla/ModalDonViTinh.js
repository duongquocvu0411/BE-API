import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {jwtDecode} from 'jwt-decode';
const ModalDonViTinh = ({ show, handleClose, isEdit, Dvts, fetchDvtss }) => {
  const [name, setName] = useState('');
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  useEffect(() => {
    if (isEdit && Dvts) {
      setName(Dvts.name);

    } else { 
      setName('');

    }
  }, [isEdit, Dvts]);
  const handleSubmit = async () => { 
    const fom ={
      name
    }
    try {
      const token = cookies.adminToken; // Lấy token từ cookie
    // const decodedToken = jwtDecode(token); // Giải mã token
    // const loggedInUser = decodedToken.hoten; // Lấy hoten từ token

      if (isEdit) {
        // Cập nhật đơn vị tính hiện tại
        // fom.updated_By = loggedInUser;
        await axios.put(
          `${process.env.REACT_APP_BASEURL}/api/donvitinh/${Dvts.id}`,fom
      
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        toast.success(`đơn vị tính ${name} đã được cập nhật thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });

        fetchDvtss(); // Làm mới danh sách
        resetForm();
        handleClose(); // Đóng modal

      } else {
        // Thêm mới đơn vị tính
        // fom.created_By = loggedInUser;
        // fom.updated_By = loggedInUser;
        await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/donvitinh`,fom
          
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        toast.success(`đơn vị tính ${name} đã được thêm thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });

        fetchDvtss(); // Làm mới danh sách
        resetForm();
        handleClose(); // Đóng modal
      }
    } catch (error) {
      if (error.response.status === 403) {
          toast.error("Bạn không có quyền thêm đơn vị tính.");
      } else {
          toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
      }
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
            <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa đơn vị tính
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i> Thêm mới đơn vị tính
          </>
        )}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        {/* Input Tên đơn vị tính */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-folder-plus me-2"></i> Tên đơn vị tính
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên đơn vị tính"
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

export default ModalDonViTinh;
