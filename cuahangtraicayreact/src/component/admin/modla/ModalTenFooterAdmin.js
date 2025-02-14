import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const ModalTenFooterAdmin = ({ show, handleClose, isEdit, tenFooter, fetchTenFooters }) => {
  const [tieude, setTieude] = useState('');
  const [phude, setPhude] = useState('');
  const [hinhanhs, setHinhanhs] = useState([]); // Hình ảnh mới thêm
  const [links, setLinks] = useState([]); // Link cho hình ảnh mới
  const [hienCo, setHienCo] = useState([]); // Hình ảnh và link hiện có từ API
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  useEffect(() => {
    if (isEdit && tenFooter) {
      setTieude(tenFooter.tieude || '');
      setPhude(tenFooter.phude || '');

      // Lấy danh sách hình ảnh và link hiện có
      const existingImages = tenFooter.footerIMG?.map((img) => ({
        id: img.id,
        imagePath: img.imagePath,
        link: img.link,
        originalLink: img.link, // Thêm originalLink
      })) || [];
      setHienCo(existingImages);

      setHinhanhs([]); // Xóa danh sách hình ảnh mới
      setLinks([]); // Xóa danh sách link mới
    } else {
      setTieude('');
      setPhude('');
      setHienCo([]);
      setHinhanhs([]);
      setLinks([]);
    }
  }, [isEdit, tenFooter]);

  const handleAddFileInput = () => {
    setHinhanhs([...hinhanhs, null]);
    setLinks([...links, '']);
  };

  const handleFileChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedHinhanhs = [...hinhanhs];
        updatedHinhanhs[index] = {
          file: file,
          preview: reader.result
        };
        setHinhanhs(updatedHinhanhs);
      };
      reader.readAsDataURL(file);
    } else {
      const updatedHinhanhs = [...hinhanhs];
      delete updatedHinhanhs[index].file;
      delete updatedHinhanhs[index].preview;
      setHinhanhs(updatedHinhanhs);
    }
  };

  const handleLinkChange = (index, link) => {
    const updatedLinks = [...links];
    updatedLinks[index] = link;
    setLinks(updatedLinks);
  };


  const handleRemoveExistingImage = async (imageId) => {
    const token = cookies.adminToken;

    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/TenFooter/DeleteImage/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setHienCo(hienCo.filter((img) => img.id !== imageId)); // Xóa khỏi danh sách hiện có
      toast.success('Xóa hình ảnh thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa hình ảnh:', error);
      toast.error('Không thể xóa hình ảnh!');
    }
  };

  const handleSave = async () => {
    const token = cookies.adminToken;

   

    if (!token) {
      toast.error("Vui lòng đăng nhập để tiếp tục!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('tieude', tieude);
    formData.append('phude', phude);

    // Xử lý ảnh hiện có
    hienCo.forEach((img) => {
      //Nếu có file ảnh mới hoặc link thay đổi, thì gửi ImageId
      if (img.newFile || img.link !== img.originalLink) {
        formData.append('ImageIds', img.id);

        //Gửi Link (luôn gửi link, ngay cả khi không thay đổi)
        formData.append('Links', img.link);

        //Nếu có file ảnh mới, thì gửi ảnh mới
        if (img.newFile) {
          formData.append('Images', img.newFile);
        }
      }
    });


    // Xử lý hình ảnh mới (không có ImageIds)
    hinhanhs.forEach((img, i) => {
      if (img?.file) {
        formData.append('Images', img.file);
        formData.append('Links', links[i]);
      }
    });


    try {
      if (isEdit) {
       
        await axios.put(`${process.env.REACT_APP_BASEURL}/api/TenFooter/${tenFooter.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Cập nhật TenFooter thành công!');
      } else {
  
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/TenFooter`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Thêm TenFooter thành công!');
      }
      fetchTenFooters();
      handleClose();
      ResetForm();
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Bạn không có quyền thực hiện hành động này.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`Lỗi: ${error.message || "Có lỗi xảy ra."}`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Chi tiết lỗi:", error);
      }
    }
  };

  const ResetForm = () => {
    setTieude("");
    setPhude("");
    setLinks([]);
    setHienCo([]);
    setHinhanhs([]);

  }


  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white shadow-sm">
        <Modal.Title className="fs-5 fw-bold">
          {isEdit ? (
            <>
              <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa TenFooter
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i> Thêm TenFooter mới
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

          {/* Hình ảnh hiện có */}
          <Form.Group controlId="hienCo" className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-image me-2"></i> Hình ảnh hiện có
            </Form.Label>
            {hienCo.map((img, index) => (
              <div key={img.id} className="d-flex align-items-center mb-3">
                <img
                  src={`${process.env.REACT_APP_BASEURL}${img.imagePath}`}
                  alt="Footer"
                  className="rounded shadow-sm border"
                  style={{
                    width: "100px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Link mới"
                  value={img.link}
                  onChange={(e) => {
                    const updatedHienCo = [...hienCo];
                    updatedHienCo[index].link = e.target.value;
                    setHienCo(updatedHienCo);
                  }}
                  className="me-2 shadow-sm rounded"
                />
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const updatedHienCo = [...hienCo];
                        updatedHienCo[index].newFile = file;
                        updatedHienCo[index].preview = reader.result;
                        setHienCo(updatedHienCo);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      const updatedHienCo = [...hienCo];
                      delete updatedHienCo[index].newFile;
                      delete updatedHienCo[index].preview;
                      setHienCo(updatedHienCo);
                    }
                  }}
                  className="me-2 shadow-sm rounded"
                />
                {img.preview && (
                  <img
                    src={img.preview}
                    alt="New Preview"
                    style={{ width: '50px', height: '50px', marginLeft: '10px', objectFit: 'cover' }}
                  />
                )}
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveExistingImage(img.id)}
                  className="shadow-sm"
                >
                  <i className="bi bi-trash me-1"></i> Xóa
                </Button>
              </div>
            ))}
          </Form.Group>

          {/* Thêm hình ảnh mới */}
          <Form.Group controlId="hinhanhs" className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-plus-circle me-2"></i> Thêm hình ảnh mới
            </Form.Label>
            {hinhanhs.map((img, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <Form.Control
                  type="file"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  accept="image/*"
                  className="shadow-sm rounded"
                />
                {img?.preview && (
                  <img
                    src={img.preview}
                    alt="Preview"
                    style={{ width: '50px', height: '50px', marginLeft: '10px', objectFit: 'cover' }}
                  />
                )}
                <Form.Control
                  type="text"
                  placeholder="Link hình ảnh"
                  value={links[index]}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="ms-2 shadow-sm rounded"
                />
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
  );
};

export default ModalTenFooterAdmin;