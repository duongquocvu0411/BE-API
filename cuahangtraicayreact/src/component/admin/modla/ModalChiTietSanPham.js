import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalChiTietSanPham = ({ show, handleClose, noiDungChiTiet }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong>Mô tả chung:</strong>
      <div dangerouslySetInnerHTML={{ __html: noiDungChiTiet.mo_ta_chung }} />
       
        <div dangerouslySetInnerHTML={{ __html: noiDungChiTiet.bai_viet }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalChiTietSanPham;
