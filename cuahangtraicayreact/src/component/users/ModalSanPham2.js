import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ModalSanPham2 = ({ show, handleClose, handleSave, currentData }) => {
  const [tenSanPham, setTenSanPham] = useState(currentData.tenSanPham);
  const [moTa, setMoTa] = useState(currentData.moTa);

  useEffect(() => {
    setTenSanPham(currentData.tenSanPham);
    setMoTa(currentData.moTa);
  }, [currentData]);

  const handleSaveData = () => {
    handleSave({
      tenSanPham,
      moTa,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentData.tenSanPham ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTenSanPham">
            <Form.Label>Tên Sản Phẩm</Form.Label>
            <Form.Control
              type="text"
              value={tenSanPham}
              onChange={(e) => setTenSanPham(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formMoTa">
            <Form.Label>Mô Tả</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={moTa}
              onChange={(event, editor) => {
                const data = editor.getData();
                setMoTa(data);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveData}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSanPham2;
