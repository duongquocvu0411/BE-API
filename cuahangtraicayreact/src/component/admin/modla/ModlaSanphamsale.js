import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ModlaSanphamsale = ({ show, handleClose, saleData, setSaleData, isEdit }) => {
  const [giasale, setGiasale] = useState("");
  const [thoigianbatdau, setThoigianbatdau] = useState("");
  const [thoigianketthuc, setThoigianketthuc] = useState("");
  const [trangthai, setTrangthai] = useState("");

  useEffect(() => {
    if (saleData) {
      setGiasale(saleData.giasale || "");
      setThoigianbatdau(saleData.thoigianbatdau || "");
      setThoigianketthuc(saleData.thoigianketthuc || "");
      setTrangthai(saleData.trangthai || "Không áp dụng");
    } else {
      resetForm();
    }
  }, [saleData]);

  const resetForm = () => {
    setGiasale("");
    setThoigianbatdau("");
    setThoigianketthuc("");
    setTrangthai("Không áp dụng");
  };

  const handleSubmit = () => {


    // Gửi dữ liệu nếu hợp lệ
    setSaleData({
      giasale: giasale || null,
      thoigianbatdau: thoigianbatdau || null,
      thoigianketthuc: thoigianketthuc || null,
      trangthai: trangthai || "Không áp dụng",
    });
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white shadow-sm">
          <Modal.Title className="fw-bold fs-5">
            {isEdit ? "Chỉnh sửa chương trình khuyến mãi" : "Thêm chương trình khuyến mãi"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-currency-dollar"></i> Giá
              </Form.Label>
              <Form.Control
                type="text"
                value={new Intl.NumberFormat("vi-VN").format(giasale)} // Định dạng hiển thị
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm
                  if (/^\d*$/.test(rawValue)) {
                    setGiasale(rawValue); // Chỉ cập nhật nếu là số hợp lệ
                  }
                }}
                onBlur={() => {
                  const parsedValue = parseInt(giasale, 10);
                  if (parsedValue && parsedValue > 0) {
                    setGiasale(parsedValue.toString()); // Lưu giá trị dạng số
                  } else {
                    setGiasale(""); // Reset nếu giá trị không hợp lệ
                  }
                }}
                placeholder="Nhập giá sản phẩm"
                className="shadow-sm"
              />
              {(!giasale || parseInt(giasale, 10) <= 0) && (
                <small className="text-danger">
                  Giá sản phẩm phải lớn hơn 0.
                </small>
              )}
            </Form.Group>


            {/* Thời gian bắt đầu */}
            <Form.Group controlId="thoigianbatdau" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-calendar-event me-2"></i>Thời gian bắt đầu
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={thoigianbatdau}
                onChange={(e) => setThoigianbatdau(e.target.value)}
                className="shadow-sm border-0 rounded"
                style={{ backgroundColor: "#f8f9fa", fontSize: "1rem" }}
              />
            </Form.Group>

            {/* Thời gian kết thúc */}
            <Form.Group controlId="thoigianketthuc" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-calendar-x me-2"></i>Thời gian kết thúc
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={thoigianketthuc}
                onChange={(e) => setThoigianketthuc(e.target.value)}
                className="shadow-sm border-0 rounded"
                style={{ backgroundColor: "#f8f9fa", fontSize: "1rem" }}
              />
            </Form.Group>

            {/* Trạng thái */}
            <Form.Group controlId="trangthai" className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-check-circle me-2"></i>Trạng thái
              </Form.Label>
              <Form.Control
                as="select"
                value={trangthai}
                onChange={(e) => setTrangthai(e.target.value)}
                className="shadow-sm border-0 rounded"
                style={{ backgroundColor: "#f8f9fa", fontSize: "1rem" }}
              >
                <option value="" disabled>Chọn trạng thái</option>
                <option value="Đang áp dụng">Đang áp dụng</option>
                <option value="Không áp dụng">Không áp dụng</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light border-0 shadow-sm">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="px-4 py-2 shadow-sm rounded"
          >
            <i className="bi bi-x-circle me-2"></i> Hủy
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            className="px-4 py-2 shadow-sm text-white rounded"
          >
            {isEdit ? "Cập nhật" : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default ModlaSanphamsale;