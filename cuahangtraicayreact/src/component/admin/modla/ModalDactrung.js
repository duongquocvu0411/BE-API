import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const ModalDactrung = ({ show, handleClose, isEdit, dactrung, fetchDactrungs }) => {
  const [tieude, setTieude] = useState("");
  const [phude, setPhude] = useState("");
  const [thutuhienthi, setThutuhienthi] = useState("");
  const [iconFile, setIconFile] = useState(null); // Trường iconFile (file ảnh biểu tượng)
  const [iconPreview, setIconPreview] = useState(""); // Dùng để hiển thị ảnh đại diện (preview)
  const [cookies] = useCookies(['adminToken', 'loginhoten'])
  // Gán dữ liệu khi mở modal (trường hợp chỉnh sửa)
  useEffect(() => {
    if (isEdit && dactrung) {
      setTieude(dactrung.tieude);
      setPhude(dactrung.phude);
      setThutuhienthi(dactrung.thutuhienthi);
      setIconPreview(`${process.env.REACT_APP_BASEURL}/${dactrung.icon}`);
      setIconFile(null); // Không thay đổi file icon nếu không cập nhật
    } else {
      // Reset dữ liệu khi mở modal thêm mới
      setTieude("");
      setPhude("");
      setThutuhienthi("");
      setIconPreview(""); // Không có ảnh trước khi chọn
      setIconFile(null);  // Không có file ảnh
    }
  }, [isEdit, dactrung]);

  // Xử lý khi người dùng chọn file ảnh mới
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIconFile(file);

    // Hiển thị ảnh preview ngay khi chọn
    const reader = new FileReader();
    reader.onloadend = () => {
      setIconPreview(reader.result); // Gán dữ liệu base64 vào state để hiển thị
    };
    if (file) {
      reader.readAsDataURL(file); // Đọc file và tạo dữ liệu base64
    }
  };

  // Xử lý gửi dữ liệu
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("tieude", tieude);
    formData.append("phude", phude);
    formData.append("thutuhienthi", thutuhienthi);
    if (iconFile) {
      formData.append("iconFile", iconFile); // File ảnh biểu tượng
    }

    try {
      const token = cookies.adminToken; // Lấy token từ cookie
      const decodedToken = jwtDecode(token); // Giải mã token
      const loggedInUser = decodedToken.hoten; // Lấy hoten từ token
      if (isEdit) {
        // PUT: Cập nhật đặc trưng
        formData.append("Updated_By",loggedInUser);
        await axios.put(
        
          `${process.env.REACT_APP_BASEURL}/api/dactrung/${dactrung.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Đã cập nhật đặc trưng thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // POST: Thêm mới đặc trưng
        formData.append("Created_By",loggedInUser);
        formData.append("Updated_By",loggedInUser);
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/dactrung`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Đã thêm đặc trưng thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      fetchDactrungs(); // Làm mới danh sách đặc trưng
      handleClose(); // Đóng modal
      resetForm();
    } catch (error) {
      if (error.response?.status === 403) {
          toast.error("Bạn không có quyền thực hiện thao tác này.", {
              position: "top-right",
              autoClose: 3000,
          });
      } 
       else {
          toast.error(
              `Có lỗi xảy ra: ${error.response?.data?.message || error.message || "Lỗi không xác định."}`,
              {
                  position: "top-right",
                  autoClose: 3000,
              }
          );
      }
      console.error("Có lỗi xảy ra:", error.response?.data || error.message || error);
  }
  
  };

  // Reset form khi đóng modal
  const resetForm = () => {
    setTieude("");
    setPhude("");
    setThutuhienthi("");
    setIconPreview(""); // Xóa ảnh preview
    setIconFile(null);  // Xóa file ảnh
  };

  return (
<>
  <Modal show={show} onHide={handleClose} centered   backdrop="static">
    <Modal.Header closeButton className="bg-primary text-white shadow-sm">
      <Modal.Title className="fs-5 fw-bold">
        {isEdit ? (
          <>
            <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa đặc trưng
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i> Thêm mới đặc trưng
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
            value={tieude}
            onChange={(e) => setTieude(e.target.value)}
            placeholder="Nhập tiêu đề"
            className="shadow-sm border-0 rounded"
            style={{
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
            }}
          />
        </Form.Group>

        {/* Phụ đề */}
        <Form.Group controlId="phude" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-file-earmark-text me-2"></i> Phụ đề
          </Form.Label>
          <Form.Control
            type="text"
            value={phude}
            onChange={(e) => setPhude(e.target.value)}
            placeholder="Nhập phụ đề"
            className="shadow-sm border-0 rounded"
            style={{
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
            }}
          />
        </Form.Group>

        {/* Thứ tự hiển thị */}
        <Form.Group controlId="thutuhienthi" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-sort-numeric-up me-2"></i> Thứ tự hiển thị
          </Form.Label>
          <Form.Control
            type="number"
            value={thutuhienthi}
            onChange={(e) => setThutuhienthi(e.target.value)}
            placeholder="Nhập thứ tự hiển thị"
            className="shadow-sm border-0 rounded"
            style={{
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
            }}
          />
        </Form.Group>

        {/* Hiển thị ảnh cũ hoặc preview ảnh mới */}
        {iconPreview && (
          <div className="text-center mb-4">
            <img
              src={iconPreview}
              alt="Icon Preview"
              className="rounded shadow-sm"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
            />
          </div>
        )}

        {/* Icon File (ảnh biểu tượng) */}
        <Form.Group controlId="iconFile" className="mb-4">
          <Form.Label className="fw-bold">
            <i className="bi bi-image me-2"></i> Icon File
          </Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="shadow-sm border-0 rounded"
            style={{
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
            }}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className="bg-light border-0 shadow-sm">
      <Button variant="outline-secondary" onClick={handleClose} className="px-4 py-2 shadow-sm rounded">
        <i className="bi bi-x-circle me-2"></i> Hủy
      </Button>
      <Button
        variant={isEdit ? "warning" : "success"}
        onClick={handleSubmit}
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

export default ModalDactrung;
