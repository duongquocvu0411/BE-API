import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalBanner = ({ show, handleClose, isEdit, banner, fetchBanners }) => {
  const [tieude, setTieude] = useState(banner?.tieude || '');
  const [phude, setPhude] = useState(banner?.phude || '');
  const [hinhanhs, setHinhanhs] = useState([]);
  
  // Thiết lập trạng thái ban đầu khi chỉnh sửa hoặc thêm banner mới
  useEffect(() => {
    if (isEdit && banner) {
      setTieude(banner.tieude || '');
      setPhude(banner.phude || '');
      const images = banner.bannerImages?.map((img) => ({
        id: img.id,
        imagePath: img.imagePath,
      })) || [];
      setHinhanhs(images);
    } else {
      setTieude('');
      setPhude('');
      setHinhanhs([]);
    }
  }, [isEdit, banner]);

  // Thêm một trường nhập tệp tin mới
  const handleAddFileInput = () => {
    setHinhanhs([...hinhanhs, null]);
  };

  // Xử lý thay đổi tệp tin cho từng input
  const handleFileChange = (index, file) => {
    const updatedHinhanhs = [...hinhanhs];
    updatedHinhanhs[index] = {
      file: file,
      preview: URL.createObjectURL(file), // Tạo đường dẫn để hiển thị hình ảnh ngay lập tức
    };
    setHinhanhs(updatedHinhanhs);
  };

  // Xóa trường nhập tệp tin
  const handleRemoveFileInput = (index) => {
    const updatedHinhanhs = hinhanhs.filter((_, i) => i !== index);
    setHinhanhs(updatedHinhanhs);
  };

  // Xử lý hành động lưu hoặc cập nhật
  const handleSave = async () => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
    const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');

    const formData = new FormData();
    formData.append('tieude', tieude);
    formData.append('phude', phude);

    hinhanhs.forEach((fileObj) => {
      if (fileObj?.file) formData.append('hinhanhs', fileObj.file); // Gửi file thay vì chỉ đường dẫn
    });

    try {
      if (isEdit) {
        formData.append("Updated_By",loggedInUser);
        await axios.put(`${process.env.REACT_APP_BASEURL}/api/banners/${banner.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Cập nhật banner thành công!', { position: 'top-right', autoClose: 3000 });
      } else {
        formData.append("Created_By",loggedInUser);
        formData.append("Updated_By",loggedInUser);
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/banners`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Thêm banner mới thành công!', { position: 'top-right', autoClose: 3000 });
      }
      fetchBanners();
      handleClose();
      ResetForm();
    } catch (error) {
      console.error('Lỗi khi lưu banner:', error);
      toast.error('Không thể lưu banner!', { position: 'top-right', autoClose: 3000 });
    }
  };

  // Đặt lại form
  const ResetForm = () => {
    setHinhanhs([]);
    setPhude('');
    setTieude('');
  };

  // Xử lý xóa hình ảnh khỏi UI và backend
  const handleRemoveFile = async (index) => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken');
    if (hinhanhs[index]?.id) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASEURL}/api/banners/DeleteImage/${hinhanhs[index].id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedHinhanhs = hinhanhs.filter((_, i) => i !== index);
        setHinhanhs(updatedHinhanhs);
        toast.success('Xóa hình ảnh thành công!', { position: 'top-right', autoClose: 3000 });
      } catch (error) {
        console.error('Lỗi khi xóa hình ảnh:', error);
        toast.error('Không thể xóa hình ảnh!', { position: 'top-right', autoClose: 3000 });
      }
    } else {
      const updatedHinhanhs = hinhanhs.filter((_, i) => i !== index);
      setHinhanhs(updatedHinhanhs);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton className="bg-primary text-white shadow-sm">
          <Modal.Title className="fs-5 fw-bold">
            {isEdit ? (
              <>
                <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa banner
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i> Thêm banner mới
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
                <i className="bi bi-file-earmark-text me-2"></i> Phụ đề
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phụ đề"
                value={phude}
                onChange={(e) => setPhude(e.target.value)}
                className="shadow-sm border-0 rounded"
                style={{ backgroundColor: "#f8f9fa", fontSize: "1rem" }}
              />
            </Form.Group>

            {/* Hình ảnh */}
            <Form.Group controlId="hinhanhs" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-image me-2"></i> Hình ảnh
              </Form.Label>
              {hinhanhs.map((fileObj, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  {fileObj?.preview ? (
                    <img
                      src={fileObj.preview}
                      alt="Banner"
                      className="rounded shadow-sm border"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                  ) : fileObj?.imagePath ? (
                    <img
                      src={`${process.env.REACT_APP_BASEURL}/${fileObj.imagePath}`}
                      alt="Banner"
                      className="rounded shadow-sm border"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                  ) : (
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(index, e.target.files[0])}
                      accept="image/*"
                      className="shadow-sm border-0 rounded"
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  )}
                  <Button
                    variant="outline-danger"
                    className="ms-2 shadow-sm"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <i className="bi bi-trash me-1"></i> 
                  </Button>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                onClick={handleAddFileInput}
                className="shadow-sm rounded"
              >
                <i className="bi bi-plus-circle me-1"></i> Thêm ảnh
              </Button>
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

export default ModalBanner;
