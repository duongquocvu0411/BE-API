// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const ModalChiTietSanPham = ({ show, handleClose, noiDungChiTiet }) => {
//   return (
//     <Modal show={show} onHide={handleClose} size="xl">
//       <Modal.Header closeButton>
//         <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <strong>Mô tả chung:</strong>
//       <div dangerouslySetInnerHTML={{ __html: noiDungChiTiet.mo_ta_chung }} />
       
//         <div dangerouslySetInnerHTML={{ __html: noiDungChiTiet.bai_viet }} />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Đóng
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ModalChiTietSanPham;


import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

const ModalChiTietSanPham = ({ show, handleClose, noiDungChiTiet }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong>Mô tả chung:</strong>
        <div
          dangerouslySetInnerHTML={{
            __html:
              noiDungChiTiet?.mo_ta_chung ||
              "<span class='text-muted'>Không có thông tin mô tả</span>",
          }}
        />
        <strong>Bài viết:</strong>
        <div
          dangerouslySetInnerHTML={{
            __html:
              noiDungChiTiet?.bai_viet?.replace(/<img /g, '<img class="img-fluid rounded" ') ||
              "<span class='text-muted'>Không có nội dung bài viết</span>",
          }}
        />
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
