import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { nanoid } from 'nanoid';

import ModalMenuFooter from '../modla/ModalMenuFooter';
import { useCookies } from 'react-cookie';

const MenuFooter = () => {
  const [MenuFooters, setMenuFooters] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [showModalXoa, setShowModalXoa] = useState(false); // Hiển thị modal xác nhận xóa
  const [MenuFooterXoa, setMenuFooterXoa] = useState(null); // Lưu thông tin MenuFooter cần xóa
  const [cookies] = useCookies(['adminToken', 'loginhoten'])
  const MenuFootersMoiTrang = 4;

  // Logic tìm kiếm MenuFooters
  const [timKiem, setTimKiem] = useState('');
  const MenuFootersDaLoc = MenuFooters.filter((MenuFooter) =>
    MenuFooter.tieu_de.toLowerCase().includes(timKiem.toLowerCase())
  );

  // Logic phân trang
  const viTriMenuFooterCuoi = trangHienTai * MenuFootersMoiTrang;
  const viTriMenuFooterDau = viTriMenuFooterCuoi - MenuFootersMoiTrang;
  const MenuFootersTheoTrang = MenuFootersDaLoc.slice(viTriMenuFooterDau, viTriMenuFooterCuoi);
  const tongSoTrang = Math.ceil(MenuFootersDaLoc.length / MenuFootersMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [MenuFooterHienTai, setMenuFooterHienTai] = useState(null);

  useEffect(() => {
    layDanhSachMenuFooters();
  }, []);

  const layDanhSachMenuFooters = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/MenuFooter`);
      setMenuFooters(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách MenuFooters:', error);
      toast.error('Có lỗi khi lấy danh sách MenuFooters!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setDangtai(false);
    }
  };

  const moModalThemMenuFooter = () => {
    setChinhSua(false);
    setMenuFooterHienTai(null);
    setHienThiModal(true);
  };

  const moModalSuaMenuFooter = (MenuFooter) => {
    setChinhSua(true);
    setMenuFooterHienTai(MenuFooter);
    setHienThiModal(true);
  };

  const xoaMenuFooter = async (id, tieude) => {
    // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
    const token = cookies.adminToken; // Lấy token từ cookie
     
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/MenuFooter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
      toast.success(`Xóa MenuFooter "${tieude}" thành công!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      layDanhSachMenuFooters();
      setTrangHienTai(1);
    } catch (error) {
      console.error('Lỗi khi xóa MenuFooter:', error);
      toast.error('Không thể xóa MenuFooter!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleHienThiModalXoa = (MenuFooter) => {
    setMenuFooterXoa(MenuFooter); // Lưu MenuFooter cần xóa
    setShowModalXoa(true); // Hiển thị modal xác nhận
  };
  const handleDongModalXoa = () => {
    setShowModalXoa(false);
    setMenuFooterXoa(null); // Reset thông tin MenuFooter
  };
  const handleXacNhanXoa = async () => {
    if (MenuFooterXoa) {
      await xoaMenuFooter(MenuFooterXoa.id, MenuFooterXoa.tieu_de); // Gọi hàm xóa MenuFooter
    }
    setShowModalXoa(false);
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />

          {/* Content Header */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh sách MenuFooters</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/admin/trangchu">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Danh sách MenuFooters</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Content Row */}
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchMenuFooter" className="form-label">Tìm kiếm MenuFooters:</label>
                <div className="input-group">
                  <input
                    id="searchMenuFooter"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tiêu đề MenuFooter..."
                    value={timKiem}
                    onChange={(e) => setTimKiem(e.target.value)}
                  />
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách MenuFooters</h6>
                <Button variant="primary" onClick={moModalThemMenuFooter} className="btn-lg">
                  <i className="fas fa-plus-circle"></i> Thêm MenuFooter
                </Button>
              </div>
              <div className="card-body table-responsive p-0" style={{ maxHeight: '400px' }}>
                {dangtai ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <table className="table table-bordered table-hover table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Phụ đề</th>
                        <th>Thứ tự hiển thị</th>
                        <th>Người tạo</th>
                        <th>Người cập nhật</th>
                        <th>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MenuFootersTheoTrang.map((MenuFooter, index) => (

                        <tr key={nanoid()} className="hover-effect">
                          <td>{viTriMenuFooterDau + index + 1}</td>
                          <td>{MenuFooter.tieu_de}</td>
                          {/* <td>
                            {MenuFooter.noi_dung?.length > 50
                              ? <span dangerouslySetInnerHTML={{ __html: MenuFooter.noi_dung.slice(0, 50) + '...' }} />
                              : (MenuFooter.noi_dung || "Không có mô tả")}
                          </td> */}
                          <td>
                            <span dangerouslySetInnerHTML={{ __html: MenuFooter.noi_dung.slice(0, 50) + '...' }} />
                          </td>

                          <td>
                            {MenuFooter.thutuhienthi}
                          </td>
                          <td>
                            {MenuFooter.createdBy}
                          </td>
                          <td>
                            {MenuFooter.updatedBy}
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-warning btn-sm me-2"
                              onClick={() => moModalSuaMenuFooter(MenuFooter)}
                              title="Chỉnh sửa MenuFooter"
                            >
                              <i className="fas fa-edit"></i>
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleHienThiModalXoa(MenuFooter)}
                              title="Xóa MenuFooter"
                            >
                              <i className="fas fa-trash"></i>
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => phanTrang(trangHienTai - 1)}>«</button>
                  </li>
                  {[...Array(tongSoTrang)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => phanTrang(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => phanTrang(trangHienTai + 1)}>»</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <ModalMenuFooter
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        isEdit={chinhSua}
        MenuFooter={MenuFooterHienTai}
        fetchMenuFooters={layDanhSachMenuFooters}
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
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa MenuFooter?</h5>
            <p className="text-muted">
              <strong>{MenuFooterXoa?.tieu_de}</strong>
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
      <ToastContainer />
    </div>

  );
};

export default MenuFooter;
