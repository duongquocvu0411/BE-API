import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const ModalMenuFooter = ({ show, handleClose, isEdit, MenuFooter, fetchMenuFooters }) => {
  const [tieude, setTieude] = useState(MenuFooter?.tieu_de || '');
  const [noidung, setNoidung] = useState(MenuFooter?.noi_dung || '');
  const [thutuhienthi, setThutuhienthi] = useState(MenuFooter?.thutuhienthi || '');
  // const [hinhanhs, setHinhanhs] = useState([]);

  // Thiết lập trạng thái ban đầu khi chỉnh sửa hoặc thêm MenuFooter mới
  useEffect(() => {
    if (isEdit && MenuFooter) {
      setTieude(MenuFooter.tieu_de || '');
      setNoidung(MenuFooter.noi_dung || ''); // Đảm bảo giá trị không bị null
      setThutuhienthi(MenuFooter.thutuhienthi || '');
    } else {
      setNoidung(''); 
      setTieude('');
      setThutuhienthi('');

    }
  }, [isEdit, MenuFooter]);

  // Xử lý hành động lưu hoặc cập nhật
  const handleSave = async () => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken');
    const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');
    const body = {
      tieu_de: tieude,
      noi_dung: noidung,
      thutuhienthi: thutuhienthi,
    };

    try {
      if (isEdit) {
        body.Updated_By = loggedInUser;
        const response = await axios.put(`${process.env.REACT_APP_BASEURL}/api/MenuFooter/${MenuFooter.id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Cập nhật MenuFooter thành công!', { position: 'top-right', autoClose: 3000 });
      } else {
        body.Created_By = loggedInUser;
        body.Updated_By = loggedInUser;
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/MenuFooter`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Thêm MenuFooter mới thành công!', { position: 'top-right', autoClose: 3000 });
      }
      fetchMenuFooters();
      handleClose();
      ResetForm();
    } catch (error) {
      console.error('Lỗi khi lưu banner:', error);
      toast.error('Không thể lưu banner!', { position: 'top-right', autoClose: 3000 });
    }

  };
  // const handleChangeNoiDung = (event, editor) => {
  //   const data = editor.getData();
  //   if (data !== undefined) {
  //     setNoidung(data);
  //   }
  // };

  const handleChangeNoiDung = (e, editor) =>{
    const data = editor.getData();
    setNoidung(data);
  }

  // Đặt lại form
  const ResetForm = () => {
    setThutuhienthi('');
    setNoidung('');
    setTieude('');
  };

  // Xử lý xóa hình ảnh khỏi UI và backend


  return (
    <>
      <Modal show={show} onHide={handleClose} centered   backdrop="static" >
        <Modal.Header closeButton className="bg-primary text-white shadow-sm">
          <Modal.Title className="fs-5 fw-bold">
            {isEdit ? (
              <>
                <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa MenuFooter
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i> Thêm MenuFooter mới
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Tiêu đề */}
            <Form.Group controlId="tieude" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-card-heading me-2"></i> Tiêu đề
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề"
                value={tieude}
                onChange={(e) => setTieude(e.target.value)}
                className="shadow-sm border-0 rounded"
                style={{ backgroundColor: "#f8f9fa", fontSize: "1rem" }}
              />
            </Form.Group>

            {/* Phụ đề */}
            <Form.Group controlId="phude" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-file-earmark-text me-2"></i> Nội dung
              </Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={noidung || ""}
                config={{
                  ckfinder: {
                    uploadUrl: `${process.env.REACT_APP_BASEURL}/api/Menufooter/upload-image`,
                  },
                  mediaEmbed: {
                    previewsInData: true,
                  },
                }}
                onChange={handleChangeNoiDung}  // Cập nhật nội dung khi thay đổi
              />
            </Form.Group>

            {/* Hình ảnh */}
            <Form.Group controlId="thutuhienthi" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-file-earmark-text me-2"></i> Thứ tự hiển thị
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số hứ tự"
                value={thutuhienthi}
                onChange={(e) => setThutuhienthi(e.target.value)}
                className="shadow-sm border-0 rounded"
                style={{ backgroundColor: "#f8f9fa", fontSize: "1rem" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light border-0 shadow-sm">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="px-4 py-2 shadow-sm rounded"
          >
            <i className="bi bi-x-circle me-2"></i> Đóng
          </Button>
          <Button
            variant="success"
            onClick={handleSave}
            className="px-4 py-2 shadow-sm text-white rounded"
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

export default ModalMenuFooter;
