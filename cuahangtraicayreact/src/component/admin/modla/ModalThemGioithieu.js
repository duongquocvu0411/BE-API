import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row, Image } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ModalAddGioiThieu = ({ show, onHide, chinhSua, gioithieu, layDanhSachGioithieu }) => {
  const [tieuDe, setTieuDe] = useState('');
  const [phuDe, setPhuDe] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [gioithieuImgs, setGioithieuImgs] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (chinhSua && gioithieu) {
      setTieuDe(gioithieu.tieu_de || '');
      setPhuDe(gioithieu.phu_de || '');
      setNoiDung(gioithieu.noi_dung || '');
      setTrangThai(gioithieu.trang_thai || 0);
      setGioithieuImgs(gioithieu.gioithieuImgs || []);
    } else {
      resetForm();
    }
  }, [chinhSua, gioithieu]);

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = files;
      return updatedImages;
    });
  };


  const addNewImageInput = () => {
    setNewImages((prev) => [...prev, []]);
  };

  const handleImageDelete = async (index) => {
    try {
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken');
      
      const imageId = gioithieuImgs[index].id; // Giả sử mỗi hình ảnh đã tải lên có một ID

      // Gọi API xóa hình ảnh
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/gioithieu/deleteimage/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Xóa hình ảnh khỏi state
      const updatedImages = [...gioithieuImgs];
      updatedImages.splice(index, 1);
      setGioithieuImgs(updatedImages);

      toast.success('Hình ảnh đã được xóa thành công!', { position: 'top-right', autoClose: 3000 });
    } catch (error) {
      console.error('Lỗi khi xóa hình ảnh!', error);
      toast.error('Có lỗi xảy ra khi xóa hình ảnh. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken');
      const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');

      const formData = new FormData();
      formData.append('Tieu_de', tieuDe);
      formData.append('Phu_de', phuDe);
      formData.append('Noi_dung', noiDung);
      formData.append('Trang_thai', trangThai);

      // Giữ lại hình ảnh cũ và thêm hình ảnh mới nếu có
      gioithieuImgs.forEach((image) => {
        formData.append('Existing_Images', image.id); // Giả sử bạn gửi ID hình ảnh cũ, thay đổi tùy theo API
      });

      newImages.flat().forEach((image) => {
        formData.append('Images', image);
      });

      if (chinhSua) {
        // Cập nhật
        formData.append('Updated_By',loggedInUser);
        await axios.put(
          
          `${process.env.REACT_APP_BASEURL}/api/gioithieu/${gioithieu.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('Giới thiệu đã được cập nhật thành công!', { position: 'top-right', autoClose: 3000 });
      } else {
        // Thêm mới
        formData.append('Created_By',loggedInUser);
        formData.append('Updated_By',loggedInUser);
        await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/gioithieu`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('Giới thiệu mới đã được thêm thành công!', { position: 'top-right', autoClose: 3000 });
      }

      layDanhSachGioithieu(); // Làm mới danh sách giới thiệu
      resetForm();
      onHide(); // Đóng modal
    } catch (error) {
      console.error(chinhSua ? 'Có lỗi khi cập nhật giới thiệu!' : 'Có lỗi xảy ra khi thêm mới giới thiệu.', error);
      toast.error(chinhSua ? 'Có lỗi xảy ra khi cập nhật giới thiệu. Vui lòng thử lại.' : 'Có lỗi xảy ra khi thêm mới giới thiệu.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const resetForm = () => {
    setTieuDe('');
    setPhuDe('');
    setNoiDung('');
    setTrangThai(0);
    setNewImages([]);
    setGioithieuImgs([]);
  };


  const handleImageDeleteNew = (inputIndex, imageIndex) => {
    setNewImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[inputIndex].splice(imageIndex, 1); // Xóa ảnh khỏi mảng
      if (updatedImages[inputIndex].length === 0) {
        updatedImages.splice(inputIndex, 1); // Xóa input nếu không còn ảnh
      }
      return updatedImages;
    });
  };
  const handleChangeNoiDung = (event, editor) => {
    const data = editor.getData();
    setNoiDung(data);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className={chinhSua ? 'bi bi-pencil-square' : 'bi bi-plus-circle'} style={{ marginRight: '8px' }}></i>
          {chinhSua ? 'Chỉnh sửa giới thiệu' : 'Thêm mới giới thiệu'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Tiêu đề */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-pencil me-2"></i> Tiêu đề
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề"
              value={tieuDe}
              onChange={(e) => setTieuDe(e.target.value)}
            />
          </Form.Group>

          {/* Phụ đề */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-pencil me-2"></i> Phụ đề
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập phụ đề"
              value={phuDe}
              onChange={(e) => setPhuDe(e.target.value)}
            />
          </Form.Group>

          {/* Nội dung */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-pencil me-2"></i> Nội dung
            </Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={noiDung}  // Dữ liệu mặc định là nội dung đã nhập
              config={{
                mediaEmbed: {
                  previewsInData: true, // Hiển thị ảnh trước khi gửi
                },
              }}
              onChange={handleChangeNoiDung}  // Cập nhật nội dung khi thay đổi
            />
          </Form.Group>

          {/* Trạng thái */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-eye me-2"></i> Trạng thái
            </Form.Label>
            <Form.Select value={trangThai} onChange={(e) => setTrangThai(parseInt(e.target.value))} className="shadow-sm" style={{ borderRadius: '8px' }}>
              <option value={0}>Ẩn</option>
              <option value={1}>Hiển thị</option>
            </Form.Select>
          </Form.Group>

          {/* Thêm ảnh */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              <i className="bi bi-image me-2"></i> Ảnh
            </Form.Label>
            <Button variant="primary" onClick={addNewImageInput}>
              Thêm ảnh
            </Button>
          </Form.Group>

          {/* Hình ảnh đã tải lên */}
          <Row>
            {gioithieuImgs.map((image, index) => (
              <Col md={4} key={index} className="mb-3">
                <Image
                  src={`${process.env.REACT_APP_BASEURL}${image.urL_image}`}
                  alt={`Image ${index}`}
                  fluid
                />
                <Button
                  variant="danger"
                  className="mt-2"
                  onClick={() => handleImageDelete(index)}
                  style={{ borderRadius: '8px' }}
                >
                  <i className="bi bi-trash me-2"></i> Xóa
                </Button>
              </Col>
            ))}
          </Row>

          {/* Các input ảnh mới */}
          {newImages.map((images, index) => (
            <Form.Group key={index}>
              <Form.Label>Chọn ảnh</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleImageChange(e, index)}
              />
              <Row>
                {images.map((file, i) => (
                  <Col md={4} key={i} className="mt-2">
                    <Image src={URL.createObjectURL(file)} alt={`Preview ${i}`} fluid />
                    <Button
                      variant="danger"
                      onClick={() => handleImageDeleteNew(index, i)}
                      style={{ position: 'absolute', top: '8px', right: '8px' }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </Col>
                ))}
              </Row>

            </Form.Group>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {chinhSua ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default ModalAddGioiThieu;
