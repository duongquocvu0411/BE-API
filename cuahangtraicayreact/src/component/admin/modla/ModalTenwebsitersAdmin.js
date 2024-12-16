import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ModalTenwebSitersAdmin = ({ show, handleClose, isEdit, Website, fetchTenwebsite }) => {
  const defaultFormState = {
    tieu_de: "",
    favicon: null,
    trangThai: 0, // Thêm trạng thái mặc định
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [dangTai, setDangTai] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  // const [updatedBy, setUpdatedBy] = useState("");

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    // const hoten = isLoggedIn
    //   ? localStorage.getItem("loginhoten")
    //   : sessionStorage.getItem("loginhoten");
    // setUpdatedBy(hoten || "");

    if (isEdit && Website) {
      setFormData({
        tieu_de: Website.tieu_de || "",
        favicon: null,
        trangThai: Website.trangThai || 0, // Lấy trạng thái từ Website
      });

      if (Website.favicon) {
        setPreviewImage(`${process.env.REACT_APP_BASEURL}/${Website.favicon}`);
      }
    } else {
      resetForm();
    }
  }, [isEdit, Website]);

  const resetForm = () => {
    setFormData(defaultFormState);
    setPreviewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        favicon: file,
      });

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDangTai(true);

    try {
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      const token = isLoggedIn
        ? localStorage.getItem("adminToken")
        : sessionStorage.getItem("adminToken");

      const form = new FormData();
      form.append("TieuDe", formData.tieu_de);
      form.append("Favicon", formData.favicon);
      // form.append("UpdatedBy", updatedBy);
      form.append("TrangThai", formData.trangThai); // Gửi trạng thái

      if (isEdit) {
        await axios.put(
          `${process.env.REACT_APP_BASEURL}/api/Tenwebsite/${Website.id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Cập nhật Website thành công!", { position: "top-right", autoClose: 3000 });
      } else {
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/Tenwebsite`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Thêm Website thành công!", { position: "top-right", autoClose: 3000 });
      }

      fetchTenwebsite();
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Lỗi khi lưu Website:", error);
      toast.error("Không thể lưu Website!", { position: "top-right", autoClose: 3000 });
    } finally {
      setDangTai(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        handleClose();
      }}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {isEdit ? (
            <>
              <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa Website
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i> Thêm mới Website
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-4" controlId="formTieuDe">
            <Form.Label className="fw-bold">
              <i className="bi bi-card-text me-2"></i> Tiêu đề Website *
            </Form.Label>
            <Form.Control
              type="text"
              name="tieu_de"
              value={formData.tieu_de}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề Website"
              className="shadow-sm"
              style={{ borderRadius: "8px" }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formFavicon">
            <Form.Label className="fw-bold">
              <i className="bi bi-image me-2"></i> Favicon *
            </Form.Label>
            <Form.Control
              type="file"
              name="favicon"
              accept="image/*"
              onChange={handleFileChange}
              className="shadow-sm"
              style={{ borderRadius: "8px" }}
              required={!isEdit}
            />
            {previewImage && (
              <div className="mt-3">
                <img
                  src={previewImage}
                  alt="Favicon Preview"
                  className="shadow-sm border rounded"
                  style={{
                    width: "100px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Group>

          {/* <Form.Group className="mb-4" controlId="formTrangThai">
            <Form.Label className="fw-bold">
              <i className="bi bi-toggle-on me-2"></i> Trạng thái
            </Form.Label>
            <Form.Control
              type="text"
              name="trangThai"
              value={formData.trangThai}
              readOnly
              className="shadow-sm bg-light"
              style={{ borderRadius: "8px" }}
            />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              handleClose();
            }}
            className="shadow-sm"
            style={{ borderRadius: "8px" }}
            disabled={dangTai}
          >
            <i className="bi bi-x-circle me-2"></i> Hủy
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="shadow-sm text-white"
            style={{ borderRadius: "8px" }}
            disabled={dangTai}
          >
            {dangTai ? (
              <Spinner animation="border" size="sm" />
            ) : isEdit ? (
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
      </Form>
    </Modal>
  );
};

export default ModalTenwebSitersAdmin;
