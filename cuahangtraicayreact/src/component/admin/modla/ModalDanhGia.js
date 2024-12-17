import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ModalDanhGia = ({ show, handleClose, sanphamId }) => {
  const [danhGias, setDanhGias] = useState([]);
  const [phanHois, setPhanHois] = useState({}); // State lưu phản hồi
  const [trangHienTai, setTrangHienTai] = useState(1);

  const danhGiaMoiTrang = 4;
  const viTriDanhGiaCuoi = trangHienTai * danhGiaMoiTrang;
  const viTriDanhGiaDau = viTriDanhGiaCuoi - danhGiaMoiTrang;
  const danhGiaTheoTrang = Array.isArray(danhGias)
    ? danhGias.slice(viTriDanhGiaDau, viTriDanhGiaCuoi)
    : [];
  const tongSoTrang = Math.ceil(danhGias.length / danhGiaMoiTrang);

  useEffect(() => {
    if (sanphamId && show) {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/sanpham/${sanphamId}`)
        .then((response) => {
          const danhGiasData = response.data.danhgiakhachhangs;
          setDanhGias(Array.isArray(danhGiasData) ? danhGiasData : []);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          toast.error("Unable to fetch reviews", { position: "top-right" });
        });
    }
  }, [sanphamId, show]);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const xoaDanhGia = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/danhgiakhachhang/${id}`);
      toast.success("Review deleted successfully");
      setDanhGias(danhGias.filter((danhGia) => danhGia.id !== id));
    } catch (error) {
      toast.error("Error deleting review");
    }
  };

  const luuPhanHoi = async (danhgia_id) => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    const token = isLoggedIn
      ? localStorage.getItem("adminToken")
      : sessionStorage.getItem("adminToken");
    const loggedInUser = isLoggedIn
      ? localStorage.getItem("loginhoten")
      : sessionStorage.getItem("loginhoten");

    const noi_dung = phanHois[danhgia_id];
    if (!noi_dung) {
      toast.warn("Vui lòng nhập nội dung phản hồi!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/phanhoidanhgia`,
        {
          danhgia_id,
          noi_dung,
          createdBy: loggedInUser, // Người phản hồi
          updatedBy: loggedInUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật phản hồi trực tiếp vào danh sách đánh giá
      setDanhGias((prevDanhGias) =>
        prevDanhGias.map((danhGia) =>
          danhGia.id === danhgia_id
            ? { ...danhGia, phanHoi: response.data } // Gán phản hồi mới vào đánh giá
            : danhGia
        )
      );

      toast.success("Phản hồi đã được gửi!");
      setPhanHois((prev) => ({ ...prev, [danhgia_id]: "" })); // Reset ô nhập phản hồi
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error("Không thể gửi phản hồi!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Danh sách đánh giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {danhGiaTheoTrang.length > 0 ? (
          danhGiaTheoTrang.map((danhGia) => (
            <Card key={danhGia.id} className="mb-4 shadow-sm">
              <Card.Body>
                {/* Thông tin đánh giá */}
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>{danhGia.ho_ten} - <strong>{danhGia.tieude}</strong></span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => xoaDanhGia(danhGia.id)}
                  >
                    Xóa đánh giá
                  </Button>
                </Card.Title>
                <Card.Text>{danhGia.noi_dung}</Card.Text>
                {/* Hiển thị số sao */}
                <div className="mt-2">
                  {Array(danhGia.so_sao)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="fa fa-star text-warning"></span>
                    ))}
                  {Array(5 - danhGia.so_sao)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="fa fa-star text-muted"></span>
                    ))}
                </div>

                <div>
                  {Array.from({ length: danhGia.soSao }, (_, i) => (
                    <span key={i} className="fa fa-star text-warning"></span>
                  ))}
                  {Array.from({ length: 5 - danhGia.soSao }, (_, i) => (
                    <span key={i} className="fa fa-star text-secondary"></span>
                  ))}
                </div>

                {/* Hiển thị phản hồi */}
                {danhGia.phanHoi && danhGia.phanHoi.noi_dung ? (
                  <Alert variant="success" className="mt-3">
                    <h6>Phản hồi từ Admin:</h6>
                    <p>{danhGia.phanHoi.noi_dung}</p>
                    <small>
                      Cập nhật bởi: {danhGia.phanHoi.updatedBy} lúc{" "}
                      {new Date(danhGia.phanHoi.updated_at).toLocaleString()}
                    </small>
                  </Alert>
                ) : (
                  <Alert variant="warning" className="mt-3">
                    Chưa có phản hồi từ Admin
                  </Alert>
                )}

                {/* Form nhập phản hồi */}
                {!danhGia.phanHoi || !danhGia.phanHoi.noi_dung ? (
                  <Form.Group className="mt-3">
                    <Form.Label>Nhập phản hồi</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Nhập nội dung phản hồi..."
                      value={phanHois[danhGia.id] || ""}
                      onChange={(e) =>
                        setPhanHois({ ...phanHois, [danhGia.id]: e.target.value })
                      }
                    />
                    <Button
                      variant="success"
                      size="sm"
                      className="mt-2"
                      onClick={() => luuPhanHoi(danhGia.id)}
                    >
                      Gửi phản hồi
                    </Button>
                  </Form.Group>
                ) : null}
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
        {/* Pagination */}
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
  );
};

export default ModalDanhGia;
