import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import axios from 'axios';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';

import ModalLienhe from '../modla/ModalLienhe';
import { useCookies } from 'react-cookie';

const LienHeAdmin = () => {
  const [danhSachLienHe, setDanhSachLienHe] = useState([]);
  const [danhSachLienHeLoc, setDanhSachLienHeLoc] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 5;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState('');
  const [ngayLoc, setNgayLoc] = useState('');
  const [dangtai, setDangtai] = useState(false);
  const [showModalXoa, setShowModalXoa] = useState(false); // Quản lý trạng thái hiển thị modal xóa
  const [lienHeXoa, setLienHeXoa] = useState(null); // Lưu thông tin liên hệ cần xóa
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = danhSachLienHeLoc.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(danhSachLienHeLoc.length / soPhanTuMotTrang);

  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  const layDanhSachLienHe = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/lienhe`);
      setDanhSachLienHe(response.data.data);
      setDanhSachLienHeLoc(response.data.data);
      setDangtai(false);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin liên hệ:', error);
      toast.error('Có lỗi khi lấy thông tin liên hệ, vui lòng thử lại sau.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    layDanhSachLienHe();
  }, []);

  const xoaLienHe = async (id) => {
    const token = cookies.adminToken; // Lấy token từ cookie
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/lienhe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Đã xóa liên hệ thành công.', { position: 'top-right', autoClose: 3000 });
      layDanhSachLienHe();
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Bạn không có quyền xóa liên hệ.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(
          `Có lỗi khi xóa liên hệ: ${error.response?.data?.message || error.message || "Lỗi không xác định."}`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
      console.error("Lỗi khi xóa liên hệ:", error.response?.data || error.message || error);
    }

  };

  const hienThiChiTiet = (ghichu) => {
    setNoiDungChiTiet(ghichu);
    setHienThiModal(true);
  };

  const locTheoNgay = (ngay) => {
    setNgayLoc(ngay);
    if (ngay) {
      const danhSachLoc = danhSachLienHe.filter((item) => item.created_at.startsWith(ngay));
      setDanhSachLienHeLoc(danhSachLoc);
    } else {
      setDanhSachLienHeLoc(danhSachLienHe);
    }
  };

  const handleHienThiModalXoa = (lienHe) => {
    setLienHeXoa(lienHe); // Lưu thông tin liên hệ cần xóa
    setShowModalXoa(true); // Hiển thị modal
  };

  const handleDongModalXoa = () => {
    setLienHeXoa(null); // Reset thông tin liên hệ cần xóa
    setShowModalXoa(false); // Đóng modal
  };

  const handleXacNhanXoa = async () => {
    if (lienHeXoa) {
      await xoaLienHe(lienHeXoa.id); // Gọi hàm xóa liên hệ
      setLienHeXoa(null); // Reset thông tin liên hệ
      setShowModalXoa(false); // Đóng modal
    }
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />

          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h3 className="m-0 font-weight-bold text-primary">Danh Sách Liên Hệ</h3>

                {/* Bộ lọc theo ngày */}
                <Form.Group controlId="formNgayLoc" className="mb-0">
                  <Form.Control
                    type="date"
                    value={ngayLoc}
                    onChange={(e) => locTheoNgay(e.target.value)}
                    className="form-control"
                  />
                </Form.Group>
              </div>

              <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                {dangtai ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>STT</th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Số Điện Thoại</th>
                        <th>Nội Dung</th>
                        <th>Ngày Tạo</th>
                        <th>Chức Năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cacPhanTuHienTai.map((item, index) => (
                        <tr key={nanoid()}>
                          <td>{chiSoPhanTuDau + index + 1}</td>
                          <td>{item.ten}</td>
                          <td>{item.email}</td>
                          <td>{item.sdt}</td>
                          <td>
                            {item.ghichu.length > 10 ? (
                              <>
                                {item.ghichu.substring(0, 10)}...
                                <Button variant="link" onClick={() => hienThiChiTiet(item.ghichu)} className="text-decoration-none">
                                  <i className="bi bi-info-circle"></i>
                                </Button>
                              </>
                            ) : (
                              item.ghichu
                            )}
                          </td>
                          <td>{new Date(item.created_at).toLocaleDateString()}</td>
                          <td>
                            {/* Nút xóa với icon rõ ràng */}
                            <button

                              onClick={() => handleHienThiModalXoa(item)}
                              className="btn btn-outline-danger btn-sm"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="card-footer clearfix">
                {/* Phân trang */}
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => thayDoiTrang(trangHienTai > 1 ? trangHienTai - 1 : 1)}>«</button>
                  </li>
                  {[...Array(tongSoTrang)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => thayDoiTrang(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => thayDoiTrang(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>»</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <ToastContainer />
      </div>

      {/* Modal Chi Tiết Liên Hệ */}
      <ModalLienhe
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        noiDungChiTiet={noiDungChiTiet}
      />


      <Modal
        show={showModalXoa}
        onHide={handleDongModalXoa}
        centered
        backdrop="static" // Không cho phép đóng khi click ra ngoài
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i> Xác nhận xóa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="fas fa-trash-alt fa-4x text-danger mb-3"></i>
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa liên hệ này?</h5>
            <p className="text-muted">
              <strong>Họ Tên:</strong> {lienHeXoa?.ten} <br />
              <strong>Email:</strong> {lienHeXoa?.email} <br />
              <strong>Ngày Tạo:</strong> {new Date(lienHeXoa?.created_at).toLocaleDateString()}
            </p>
            <p className="text-muted">Hành động này không thể hoàn tác.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleDongModalXoa}>
            <i className="fas fa-times me-2"></i> Hủy
          </Button>
          <Button variant="danger" onClick={handleXacNhanXoa}>
            <i className="fas fa-check me-2"></i> Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

  );
};

export default LienHeAdmin;
