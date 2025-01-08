import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin';
import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';

import ModalAddGioiThieu from '../modla/ModalThemGioithieu';
import { useCookies } from 'react-cookie';

const GioithieuAdmin = () => {
  const [danhSachGioithieu, setDanhSachGioithieu] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const gioithieuMoiTrang = 4;
  const [showModalXoa, setShowModalXoa] = useState(false);
  const [gioithieuXoa, setGioithieuXoa] = useState(null);

  const [timKiem, setTimKiem] = useState('');
  const [cookies] = useCookies(['adminToken', 'loginhoten'])
  // Lọc dữ liệu theo từ khóa tìm kiếm
  const gioithieuDaLoc = danhSachGioithieu.filter((gioithieu) =>
    gioithieu.tieu_de && gioithieu.tieu_de.toLowerCase().includes(timKiem.toLowerCase())
  );


  const viTriGioithieuCuoi = trangHienTai * gioithieuMoiTrang;
  const viTriGioithieuDau = viTriGioithieuCuoi - gioithieuMoiTrang;
  const gioithieuTheoTrang = gioithieuDaLoc.slice(viTriGioithieuDau, viTriGioithieuCuoi);
  const tongSoTrang = Math.ceil(gioithieuDaLoc.length / gioithieuMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [gioithieuHienTai, setGioithieuHienTai] = useState(null);

  useEffect(() => {
    layDanhSachGioithieu();
  }, []);

  const layDanhSachGioithieu = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/gioithieu`);
      setDanhSachGioithieu(response.data.data);
      setDangtai(false);
    } catch (error) {
      console.log('Có lỗi khi lấy danh sách giới thiệu', error);
      toast.error('Có lỗi khi lấy danh sách', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const moModalThemGioithieu = () => {
    setChinhSua(false);
    setGioithieuHienTai(null);
    setHienThiModal(true);
  };

  const moModalSuaGioithieu = (gioithieu) => {
    setChinhSua(true);
    setGioithieuHienTai(gioithieu);
    setHienThiModal(true);
  };

  const xoaGioithieu = async (id, tieu_de) => {
    const token = cookies.adminToken; // Lấy token từ cookie
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/gioithieu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Xóa giới thiệu "${tieu_de}" thành công`, {
        position: 'top-right',
        autoClose: 3000
      });
      layDanhSachGioithieu();
      setTrangHienTai(1);
    } catch (error) {
      console.log('Có lỗi khi xóa giới thiệu', error);
      toast.error('Có lỗi khi xóa giới thiệu', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const handleHienThiModalXoa = (gioithieu) => {
    setGioithieuXoa(gioithieu);
    setShowModalXoa(true);
  };

  const handleDongModalXoa = () => {
    setGioithieuXoa(null);
    setShowModalXoa(false);
  };

  const handleXacNhanXoa = async () => {
    if (gioithieuXoa) {
      await xoaGioithieu(gioithieuXoa.id, gioithieuXoa.tieu_de);
      setGioithieuXoa(null);
      setShowModalXoa(false);
    }
  };

  return (
    <>
      <div id="wrapper">
        <SiderbarAdmin />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderAdmin />

            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="h3 mb-0 text-gray-800">Danh sách giới thiệu</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                      <li className="breadcrumb-item active">Danh sách giới thiệu</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid mb-3">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                  <label htmlFor="searchGioithieu" className="form-label">Tìm kiếm giới thiệu:</label>
                  <div className="input-group">
                    <input
                      id="searchGioithieu"
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên giới thiệu..."
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

            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Danh sách giới thiệu</h6>
                  <div className="card-tools">
                    <Button variant="primary" onClick={moModalThemGioithieu}>
                      <i className="fas fa-plus-circle"></i> Thêm giới thiệu
                    </Button>
                  </div>
                </div>

                <div className="card-body table-responsive p-0" style={{ maxHeight: '400px' }}>
                  {dangtai ? (
                    <div className='text-center'>
                      <Spinner animation='border' variant='primary' />
                      <p>Đang tải dữ liệu...</p>
                    </div>
                  ) : (
                    <table className="table table-bordered table-hover table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tiêu đề</th>
                          <th scope="col">Phụ đề</th>
                          <th scope="col">Người tạo</th>
                          <th scope="col">Người cập nhật</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gioithieuTheoTrang.map((gioithieu, index) => (
                          <tr key={nanoid()}>
                            <td>{viTriGioithieuDau + index + 1}</td>
                            <td>{gioithieu.tieu_de}</td>
                            <td>{gioithieu.phu_de}</td>
                            <td>{gioithieu.createdBy}</td>
                            <td>{gioithieu.updatedBy}</td>
                            <td>
                              <span
                                className={`badge ${gioithieu.trang_thai === 1 ? 'bg-success' : 'bg-secondary'}`}
                              >
                                {gioithieu.trang_thai === 1 ? 'Đang hiển thị' : 'Không hiển thị'}
                              </span>
                            </td>
                            <td>
                            <div className="d-flex ">
                              <button
                                  className="btn btn-outline-warning btn-sm me-2"
                                onClick={() => moModalSuaGioithieu(gioithieu)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>

                              <button
                                onClick={() => handleHienThiModalXoa(gioithieu)}
                                className="btn btn-outline-danger btn-sm"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="card-footer clearfix">
                  <ul className="pagination pagination-sm m-0 float-right">
                    <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                      <Button className="page-link" onClick={() => phanTrang(1)}>
                        «
                      </Button>
                    </li>
                    {Array.from({ length: tongSoTrang }).map((_, index) => (
                      <li key={index} className={`page-item ${trangHienTai === index + 1 ? 'active' : ''}`}>
                        <Button className="page-link" onClick={() => phanTrang(index + 1)}>
                          {index + 1}
                        </Button>
                      </li>
                    ))}
                    <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                      <Button className="page-link" onClick={() => phanTrang(tongSoTrang)}>
                        »
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <ModalAddGioiThieu
            show={hienThiModal}
            onHide={() => setHienThiModal(false)}
            chinhSua={chinhSua}
            gioithieu={gioithieuHienTai}
            layDanhSachGioithieu={layDanhSachGioithieu}
          />
        </div>


        <Modal show={showModalXoa} onHide={handleDongModalXoa} centered backdrop="static">
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>
              <i className="fas fa-exclamation-triangle me-2"></i> Xác nhận xóa
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center">
            <i className="fas fa-trash-alt fa-5x text-danger mb-3"></i>
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa giới thiệu?</h5>
            <p className="text-muted">
              <strong>{gioithieuXoa ? gioithieuXoa.tieu_de : ''}</strong>
            </p>
            <p className="text-muted">Hành động này không thể hoàn tác.</p>
          </Modal.Body>

          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={handleDongModalXoa} className="btn-lg">
              <i className="fas fa-times me-2"></i> Hủy
            </Button>
            <Button variant="danger" onClick={handleXacNhanXoa} className="btn-lg">
              <i className="fas fa-check me-2"></i> Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default GioithieuAdmin;
