import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

const ModalDanhGia = ({ show, handleClose, sanphamId }) => {
  const [danhGias, setDanhGias] = useState([]);
  const [currentPhanHoi, setCurrentPhanHoi] = useState({}); // State cho phản hồi hiện tại
  const [showPhanHoiModal, setShowPhanHoiModal] = useState(false); // Modal con phản hồi
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  const danhGiaMoiTrang = 4;
  const viTriDanhGiaCuoi = trangHienTai * danhGiaMoiTrang;
  const viTriDanhGiaDau = viTriDanhGiaCuoi - danhGiaMoiTrang;
  const danhGiaTheoTrang = Array.isArray(danhGias)
    ? danhGias.slice(viTriDanhGiaDau, viTriDanhGiaCuoi)
    : [];
  const tongSoTrang = Math.ceil(danhGias.length / danhGiaMoiTrang);

  useEffect(() => {
    if (sanphamId && show) {
      fetchDanhGias();
    }
  }, [sanphamId, show]);

  const fetchDanhGias = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanpham/${sanphamId}`);
      const danhGiasData = response.data.data.danhgiakhachhangs;
      setDanhGias(Array.isArray(danhGiasData) ? danhGiasData : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Unable to fetch reviews", { position: "top-right" });
    }
  };

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const luuPhanHoi = async () => {
    const { phanhoi_id, danhgia_id, noi_dung, isEdit } = currentPhanHoi;

    if (!noi_dung) {
      toast.warn("Vui lòng nhập nội dung phản hồi!");
      return;
    }

    try {
      const token = cookies.adminToken; // Lấy token từ cookie
      
    

      const response = await axios({
        method: isEdit ? "put" : "post",
        url: isEdit
          ? `${process.env.REACT_APP_BASEURL}/api/phanhoidanhgia/${phanhoi_id}`
          : `${process.env.REACT_APP_BASEURL}/api/phanhoidanhgia`,
        data: {
          noi_dung,
         
          ...(isEdit ? {} : { danhgia_id }),
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Fetch dữ liệu mới sau khi cập nhật thành công
      await fetchDanhGias();

      toast.success(
        isEdit ? "Phản hồi đã được cập nhật!" : "Phản hồi đã được gửi!"
      );
      setShowPhanHoiModal(false);
      setCurrentPhanHoi({});
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error("Không thể gửi phản hồi!");
    }
  };

  const xoaDanhGia = async (id) => {
    const token =  cookies.adminToken
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/danhgiakhachhang/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      toast.success("Đánh giá đã được xóa thành công!!");
      setDanhGias(danhGias.filter((danhGia) => danhGia.id !== id));
    } catch (error) {
              if (error.response.status === 403) {
                  toast.error("Bạn không có quyền xóa đánh giá.");
              } else {
                  toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
              }
            }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered   backdrop="static" >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Danh sách đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {danhGiaTheoTrang.length > 0 ? (
            danhGiaTheoTrang.map((danhGia) => (
              <Card key={danhGia.id} className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span>
                      {danhGia.ho_ten} - <strong>{danhGia.tieude}</strong>
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => xoaDanhGia(danhGia.id)}
                    >
                      Xóa đánh giá
                    </Button>

                  </Card.Title>
                  <Card.Text>{danhGia.noi_dung}</Card.Text>

                  <div className="mt-2">
                    {Array(danhGia.so_sao)
                      .fill()
                      .map((_, i) => (
                        <span key={i} className="fa fa-star text-warning"></span>
                      ))}
                  </div>

                  {danhGia.phanHoi && danhGia.phanHoi.noi_dung ? (
                    <Alert variant="success" className="mt-3">
                      <h6>Phản hồi từ Admin: {danhGia.phanHoi.updatedBy}</h6>
                      <p>{danhGia.phanHoi.noi_dung}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setCurrentPhanHoi({
                            phanhoi_id: danhGia.phanHoi.id,
                            noi_dung: danhGia.phanHoi.noi_dung,
                            isEdit: true,
                          });
                          setShowPhanHoiModal(true);
                        }}
                      >
                        Chỉnh sửa phản hồi
                      </Button>
                    </Alert>
                  ) : (
                    <Alert variant="warning" className="me-2">
                      Chưa có phản hồi từ Admin
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setCurrentPhanHoi({
                            danhgia_id: danhGia.id,
                            noi_dung: "",
                            isEdit: false,
                          });
                          setShowPhanHoiModal(true);
                        }}
                      >
                        Phản hồi
                      </Button>
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted">Không có đánh giá nào cho sản phẩm này.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <div>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${trangHienTai === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => phanTrang(trangHienTai - 1)}
                >
                  «
                </button>
              </li>
              {[...Array(tongSoTrang)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${trangHienTai === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => phanTrang(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${trangHienTai === tongSoTrang ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => phanTrang(trangHienTai + 1)}
                >
                  »
                </button>
              </li>
            </ul>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Modal con cho phản hồi */}
      <Modal
  show={showPhanHoiModal}
  onHide={() => setShowPhanHoiModal(false)}
  centered
  backdrop="static"
>
  <Modal.Header closeButton className="bg-info text-white">
    <Modal.Title className="text-center w-100">
      {currentPhanHoi.isEdit ? (
        <>
          <i className="bi bi-pencil me-2"></i> Chỉnh sửa phản hồi
        </>
      ) : (
        <>
          <i className="bi bi-plus me-2"></i> Thêm phản hồi
        </>
      )}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>
        <i className="bi bi-chat-text me-2 text-secondary"></i>
        Nội dung phản hồi
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={currentPhanHoi.noi_dung}
        onChange={(e) =>
          setCurrentPhanHoi((prev) => ({
            ...prev,
            noi_dung: e.target.value,
          }))
        }
        className="p-3 rounded-3"
        style={{ borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
        placeholder="Nhập nội dung phản hồi..."
      />
    </Form.Group>
    <div className="mt-3">
      <Form.Label>
        <i className="bi bi-emoji-smile me-2 text-secondary"></i>
        Chọn biểu tượng phản hồi
      </Form.Label>
      <div className="d-flex flex-wrap gap-2">
        {["👍", "😊", "❤️", "🎉", "🚀", "😢", "😡"].map((icon, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              setCurrentPhanHoi((prev) => ({
                ...prev,
                noi_dung: prev.noi_dung + " " + icon,
              }))
            }
            className="btn btn-outline-secondary rounded-circle p-3"
            style={{ fontSize: "1.5rem" }}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-between">
    <Button
      variant="outline-secondary"
      onClick={() => setShowPhanHoiModal(false)}
      className="px-4 py-2"
    >
      <i className="bi bi-x-circle me-2"></i> Hủy
    </Button>
    <Button
      variant="primary"
      onClick={luuPhanHoi}
      className="px-4 py-2"
    >
      <i className="bi bi-check-circle me-2"></i> Lưu phản hồi
    </Button>
  </Modal.Footer>
</Modal>


    </>
  );
};

export default ModalDanhGia;
