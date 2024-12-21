import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalMenu = ({ show, handleClose, isEdit, menu, fetchMenuList }) => {
  const [name, setName] = useState('');
  const [thutuhien, setThutuhien] = useState('');
  const [url, setUrl] = useState('');
 
  useEffect(() => {
    if (isEdit && menu && menu.id) {
      setName(menu.name);
      setThutuhien(menu.thutuhien);
      setUrl(menu.url);
    } else {
      setName('');
      setThutuhien('');
      setUrl('');
    }
    fetchMenuList();
  }, [isEdit, menu]); 
  

  const handleSubmit = async () => {
    const menuData = { name, thutuhien, url };
   // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
   const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
   const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
   const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');

   try {
      if (isEdit && menu && menu.id) {
        // PUT request
        menuData.Updated_By = loggedInUser;
        await axios.put(`${process.env.REACT_APP_BASEURL}/api/menu/${menu.id}` ,menuData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            }
          });
        toast.success('Cập nhật menu thành công', { position: 'top-right', autoClose: 3000 });
      } else {
        // POST request
        menuData.Created_By = loggedInUser;
        menuData.Updated_By = loggedInUser;
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/menu` ,menuData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            }
          });
        toast.success('Thêm mới menu thành công', { position: 'top-right', autoClose: 3000 });
      }
      fetchMenuList();
      resetForm();
      handleClose();
    } catch (error) {
      console.error('Lỗi khi xử lý PUT:', error.response?.data || error.message);
      toast.error(`Có lỗi khi xử lý: ${error.response?.data?.message || error.message}`, { position: 'top-right', autoClose: 3000 });
    }
  };
  
  const resetForm = () => {
    setName("");
    setThutuhien("");
    setUrl("");
  }
  return (
<>
  <Modal show={show} onHide={handleClose} centered   backdrop="static">
    <Modal.Header closeButton className="bg-success text-white shadow-sm">
      <Modal.Title className="fs-5 fw-bold">
        {isEdit ? "Chỉnh sửa menu" : "Thêm mới menu"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        {/* Tên menu */}
        <Form.Group controlId="menuName" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-list-ul me-2"></i>Tên menu
          </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên menu"
            className="shadow-sm border-0 rounded"
            style={{
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
            }}
          />
        </Form.Group>

        {/* Thứ tự hiển thị */}
        <Form.Group controlId="menuThutuhien" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-sort-numeric-up me-2"></i>Thứ tự hiển thị
          </Form.Label>
          <Form.Control
            type="number"
            value={thutuhien}
            onChange={(e) => setThutuhien(e.target.value)}
            placeholder="Nhập thứ tự hiển thị"
            className="shadow-sm border-0 rounded"
            style={{
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
            }}
          />
        </Form.Group>

        {/* URL */}
        <Form.Group controlId="menuUrl" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-link-45deg me-2"></i>URL
          </Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Nhập URL"
            readOnly
            className="shadow-sm border-0 rounded bg-light"
            style={{
              fontSize: "1rem",
            }}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className="bg-light border-0 shadow-sm">
      <Button variant="outline-secondary" onClick={handleClose} className="px-4 py-2 shadow-sm rounded">
        <i className="bi bi-x-circle me-2"></i>Đóng
      </Button>
      <Button
        variant={isEdit ? "warning" : "success"}
        onClick={handleSubmit}
        className="px-4 py-2 shadow-sm text-white rounded"
      >
        {isEdit ? <><i className="bi bi-pencil me-2"></i>Cập nhật</> : <><i className="bi bi-plus-circle me-2"></i>Thêm</>}
      </Button>
    </Modal.Footer>
  </Modal>
</>

  );
};

export default ModalMenu;
