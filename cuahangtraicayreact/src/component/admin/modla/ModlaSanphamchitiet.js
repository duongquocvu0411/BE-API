import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const MoadlChitietsanpham = ({ show, handleClose, chiTiet, setChiTiet, handleSaveChiTiet,isEdit }) => {
  return (
<>
  <Modal show={show} onHide={handleClose} size="xl" centered>
    <Modal.Header closeButton className="bg-primary text-white">
      <Modal.Title className="fw-bold">
        {isEdit ? "Chỉnh sửa chi tiết sản phẩm" : "Thêm chi tiết sản phẩm"}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form>
        {/* Mô tả chung */}
        <Form.Group controlId="moTaChung" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-pencil-square me-2"></i> Mô tả chung
          </Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={chiTiet.moTaChung || ""}
            config={{
              ckfinder: {
                uploadUrl: `${process.env.REACT_APP_BASEURL}/api/Sanpham/upload-image`,
              },
              mediaEmbed: {
                previewsInData: true,
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setChiTiet({ ...chiTiet, moTaChung: data });
            }}
          />
      
        </Form.Group>

      
        {/* Bài viết chi tiết */}
        <Form.Group controlId="baiViet" className="mb-4">
          <Form.Label className="fw-bold">Bài viết</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={chiTiet.baiViet || ""}
            config={{
              ckfinder: {
                uploadUrl: `${process.env.REACT_APP_BASEURL}/api/Sanpham/upload-image`,
              },
              mediaEmbed: {
                previewsInData: true,
              },
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setChiTiet({ ...chiTiet, baiViet: data });
            }}
          />
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer className="bg-light">
      <Button
        variant="outline-secondary"
        onClick={handleClose}
        className="px-4 py-2 shadow-sm rounded"
      >
        Đóng
      </Button>
      <Button
        variant="success"
        onClick={handleSaveChiTiet}
        className="px-4 py-2 shadow-sm text-white rounded"
      >
        {isEdit ? "Cập nhật" : "Lưu"}
      </Button>
    </Modal.Footer>
  </Modal>
</>

  );
};

export default MoadlChitietsanpham;
