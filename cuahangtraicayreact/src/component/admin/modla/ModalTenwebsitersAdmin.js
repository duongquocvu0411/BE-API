import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ModalTenwebSitersAdmin = ({ show, handleClose, isEdit, Website, fetchTenwebsite }) => {
  const defaultFormState = {
    tieu_de: "",
    favicon: null,
    Email: "",
    sdt: "",
    Diachi: ""
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [dangTai, setDangTai] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);


  useEffect(() => {


    if (isEdit && Website) {
      setFormData({
        tieu_de: Website.tieu_de || "",
        favicon: null,
        Diachi: Website.diachi || "",
        Email: Website.email || "",
        Sodienthoai: Website.sdt || ""
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
      const loggedInUser = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');
      const form = new FormData();
      form.append("TieuDe", formData.tieu_de);
      form.append("Favicon", formData.favicon);
      form.append("Email", formData.Email);
      form.append("Diachi", formData.Diachi);
      form.append('Sodienthoai', formData.Sodienthoai);

      if (isEdit) {
        form.append("Updated_By", loggedInUser);
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
        form.append('Created_By', loggedInUser);
        form.append('Updated_By', loggedInUser);
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
              placeholder="Nhập Email Website"
              className="shadow-sm"
              style={{ borderRadius: "8px" }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="fw-bold">
              <i className="bi bi-card-text me-2"></i> Email *
            </Form.Label>
            <Form.Control
              type="text"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề Website"
              className="shadow-sm"
              style={{ borderRadius: "8px" }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formTieuDe">
            <Form.Label className="fw-bold">
              <i className="bi bi-card-text me-2"></i> Địa chỉ  *
            </Form.Label>
            <Form.Control
              type="text"
              name="Diachi"
              value={formData.Diachi}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề Website"
              className="shadow-sm"
              style={{ borderRadius: "8px" }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formTieuDe">
            <Form.Label className="fw-bold">
              <i className="bi bi-card-text me-2"></i> Số điện thoại *
            </Form.Label>
            <Form.Control
              type="text"
              name="Sodienthoai" // Đúng
              value={formData.Sodienthoai}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
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
