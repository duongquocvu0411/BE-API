import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin'; // Import HeaderAdmin component

import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ModalDonViTinh from '../modla/ModalDonViTinh';

const DonViTinh = () => {
  const [danhSachDvts, setDanhSachDvts] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const DvtsMoiTrang = 4;
  const [showModalXoa, setShowModalXoa] = useState(false); // Hiển thị modal xóa
  const [DvtsXoa, setDvtsXoa] = useState(null); // Lưu thông tin đơn vị tính cần xóa

  // Thêm state để lưu trữ giá trị tìm kiếm
  const [timKiem, setTimKiem] = useState('');

  // Logic tìm kiếm đơn vị tính theo tên
  const DvtsDaLoc = danhSachDvts.filter((Dvts) =>
    Dvts.name.toLowerCase().includes(timKiem.toLowerCase())
  );

  // Logic phân trang
  const viTriDvtsCuoi = trangHienTai * DvtsMoiTrang;
  const viTriDvtsDau = viTriDvtsCuoi - DvtsMoiTrang;
  const DvtsTheoTrang = DvtsDaLoc.slice(viTriDvtsDau, viTriDvtsCuoi);
  const tongSoTrang = Math.ceil(DvtsDaLoc.length / DvtsMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [DvtsHienTai, setDvtsHienTai] = useState(null);
  const [cookies] = useCookies(['adminToken', 'loginhoten'])



  useEffect(() => {
    layDanhSachDvts();
  }, []);
  // Lấy danh sách đơn vị tính từ API
  const layDanhSachDvts = async () => {
    setDangtai(true); // bật trạng thái đang load để lấy dữ liệu 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/donvitinh`)

      setDanhSachDvts(response.data.data);
      setDangtai(false);
    }
    catch (error) {
      console.log('có lỗi khi lấy danh sách đơn vị tính', error);

      toast.error('có lỗi khi lấy danh sách ', {
        position: 'top-right',
        autoClose: 3000 
      });
    }
  };



  // Mở modal để thêm đơn vị tính mới
  const moModalThemDvts = () => {
    setChinhSua(false);
    setDvtsHienTai(null);
    setHienThiModal(true);
  };

  // Mở modal để chỉnh sửa đơn vị tính (tham số)
  const moModalSuaDvts = (Dvts) => {
    setChinhSua(true);
    setDvtsHienTai(Dvts);
    setHienThiModal(true);
  };

  // Xóa đơn vị tính
  const xoaDvts = async (id, name) => {
    // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không

    const token = cookies.adminToken; // Lấy token từ cookie

    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/donvitinh/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      // Thông báo thành công
      toast.success(`Xóa đơn vị tính "${name}" thành công`, {
        position: 'top-right',
        autoClose: 3000,
      });

      // Lấy lại danh sách đơn vị tính và reset trang hiện tại
      layDanhSachDvts();
      setTrangHienTai(1);
    } 
    catch (error) {
          if (error.response.status === 403) {
              toast.error("Bạn không có quyền xóa đơn vị tính.");
          } else {
              toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
          }
        }
  };


  const handleHienThiModalXoa = (Dvts) => {
    setDvtsXoa(Dvts); // Lưu thông tin đơn vị tính cần xóa
    setShowModalXoa(true); // Hiển thị modal xóa
  };

  const handleDongModalXoa = () => {
    setDvtsXoa(null); // Reset thông tin đơn vị tính cần xóa
    setShowModalXoa(false); // Đóng modal xóa
  };

  const handleXacNhanXoa = async () => {
    if (DvtsXoa) {
      await xoaDvts(DvtsXoa.id, DvtsXoa.name); // Gọi hàm xóa đơn vị tính
      setDvtsXoa(null); // Reset thông tin đơn vị tính
      setShowModalXoa(false); // Đóng modal xóa
    }
  };

  return (   
    <div id="wrapper">
      <SiderbarAdmin />

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <HeaderAdmin />

          {/* Content Header */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh sách đơn vị tính</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Danh sách đơn vị tính</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Content Row */}
          <div className="container-fluid mb-3">
            <div className="row">
              {/* Tìm kiếm đơn vị tính */}
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchCategory" className="form-label">Tìm kiếm đơn vị tính:</label>
                <div className="input-group">
                  <input
                    id="searchCategory"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên đơn vị tính..."
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

          {/* Bảng đơn vị tính sản phẩm */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách đơn vị tính</h6>
                <div className="card-tools">
                  <Button variant="primary" onClick={moModalThemDvts}>
                    <i className="fas fa-plus-circle"></i> Thêm đơn vị tính
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
                        <th scope="col">Tên</th>
                        <th scope="col">Người tạo</th>
                        <th scope="col">Người cập nhật</th>
                        <th scope="col">Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DvtsTheoTrang.map((Dvts, index) => (
                        <tr key={nanoid()}>
                          <td>{viTriDvtsDau + index + 1}</td>
                          <td>{Dvts.name}</td>
                          <td>{Dvts.createdBy}</td>
                          <td>{Dvts.updatedBy}</td>
                          <td>
                            <button

                              onClick={() => moModalSuaDvts(Dvts)}
                              className="btn btn-outline-warning btn-sm me-2"
                            >
                              <i className="fas fa-edit"></i>
                            </button>

                            <button

                              onClick={() => handleHienThiModalXoa(Dvts)}
                              className="btn btn-outline-danger btn-sm"
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

              {/* Phân trang */}
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => phanTrang(trangHienTai > 1 ? trangHienTai - 1 : 1)}>
                      <i className="fas fa-angle-left"></i>
                    </button>
                  </li>
                  {[...Array(tongSoTrang)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => phanTrang(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => phanTrang(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>
                      <i className="fas fa-angle-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Modal Thêm/Sửa đơn vị tính */} 
      <ModalDonViTinh
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        isEdit={chinhSua}
        Dvts={DvtsHienTai}
        fetchDvtss={layDanhSachDvts}
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
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa đơn vị tính và sản phẩm trong đơn vị tính cũng được xóa?</h5>
            <p className="text-muted">
              <strong>{DvtsXoa?.name}</strong>
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

export default DonViTinh;
