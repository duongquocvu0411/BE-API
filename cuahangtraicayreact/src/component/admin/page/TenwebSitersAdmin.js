import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { nanoid } from 'nanoid';

import ModalTenwebSitersAdmin from '../modla/ModalTenwebsitersAdmin';

const TenwebSitersAdmin = () => {
  const [Tenwebsite, setTenwebsite] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [showModalXoa, setShowModalXoa] = useState(false); // Hiển thị modal xác nhận xóa
  const [WebsiteXoa, setWebsiteXoa] = useState(null); // Lưu thông tin Website cần xóa

  const TenwebsiteMoiTrang = 4;

  // Logic tìm kiếm Tenwebsite
  const [timKiem, setTimKiem] = useState('');
  const TenwebsiteDaLoc = Tenwebsite.filter((Website) =>
    Website.tieu_de.toLowerCase().includes(timKiem.toLowerCase())
  );

  // Logic phân trang
  const viTriWebsiteCuoi = trangHienTai * TenwebsiteMoiTrang;
  const viTriWebsiteDau = viTriWebsiteCuoi - TenwebsiteMoiTrang;
  const TenwebsiteTheoTrang = TenwebsiteDaLoc.slice(viTriWebsiteDau, viTriWebsiteCuoi);
  const tongSoTrang = Math.ceil(TenwebsiteDaLoc.length / TenwebsiteMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [WebsiteHienTai, setWebsiteHienTai] = useState(null);

  useEffect(() => {
    layDanhSachTenwebsite();
  }, []);

  const layDanhSachTenwebsite = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Tenwebsite`);
      setTenwebsite(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách Tenwebsite:', error);
      toast.error('Có lỗi khi lấy danh sách Tenwebsite!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setDangtai(false);
    }
  };

  const moModalThemWebsite = () => {
    setChinhSua(false);
    setWebsiteHienTai(null);
    setHienThiModal(true);
  };

  const moModalSuaWebsite = (Website) => {
    setChinhSua(true);
    setWebsiteHienTai(Website);
    setHienThiModal(true);
  };

  const xoaWebsite = async (id, tieude) => {
    // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/Tenwebsite/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
      toast.success(`Xóa Website "${tieude}" thành công!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      layDanhSachTenwebsite();
      setTrangHienTai(1);
    } catch (error) {
      console.error('Lỗi khi xóa Website:', error);
      toast.error('Không thể xóa Website!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  const suDungTenwebsite = async (id) => {
    // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
    try {
      // Gọi API với token trong headers
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Tenwebsite/setTrangthai/${id}`,
        {}, // Body rỗng vì không có dữ liệu gửi đi
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      // Hiển thị thông báo thành công
      toast.success("Cửa hàng đã được đánh dấu là đang sử dụng", {
        position: "top-right",
        autoClose: 3000,
      });

      // Lấy lại danh sách cửa hàng sau khi cập nhật
      layDanhSachTenwebsite();
    } catch (error) {
      console.error("Có lỗi khi sử dụng tên cửa hàng", error);

      // Hiển thị thông báo lỗi
      toast.error("Có lỗi khi sử dụng tên cửa hàng", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };


  const handleHienThiModalXoa = (Website) => {
    setWebsiteXoa(Website); // Lưu Website cần xóa
    setShowModalXoa(true); // Hiển thị modal xác nhận
  };
  const handleDongModalXoa = () => {
    setShowModalXoa(false);
    setWebsiteXoa(null); // Reset thông tin Website
  };
  const handleXacNhanXoa = async () => {
    if (WebsiteXoa) {
      await xoaWebsite(WebsiteXoa.id, WebsiteXoa.tieu_de); // Gọi hàm xóa Website
    }
    setShowModalXoa(false);
  };

  const suDungTenWebsite = async (id) => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken');
    const updatedBy = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten');

    try {
      // Gọi API với token trong headers và updatedBy trong body
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/TenWebSite/setTenwebsiter/${id}`,
        { updatedBy: updatedBy }, // Gửi updatedBy trong body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cửa hàng đã được đánh dấu là đang sử dụng", {
        position: "top-right",
        autoClose: 3000,
      });

      layDanhSachTenwebsite();
    } catch (error) {
      console.error("Có lỗi khi sử dụng tên cửa hàng", error);
      toast.error("Có lỗi khi sử dụng tên cửa hàng", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
                  <h1 className="h3 mb-0 text-gray-800">Danh sách Tenwebsite</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/admin/trangchu">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Danh sách Tenwebsite</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Content Row */}
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchWebsite" className="form-label">Tìm kiếm Tenwebsite:</label>
                <div className="input-group">
                  <input
                    id="searchWebsite"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tiêu đề Website..."
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
                <h6 className="m-0 font-weight-bold text-primary">Danh sách Tenwebsite</h6>
                <Button variant="primary" onClick={moModalThemWebsite} className="btn-lg">
                  <i className="fas fa-plus-circle"></i> Thêm Website
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
                        <th scope="col">STT</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Đã cập nhật Bởi</th>
                        <th scope="col">Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TenwebsiteTheoTrang.map((Website, index) => (
                        <tr key={nanoid()} className="hover-effect">
                          <td>{viTriWebsiteDau + index + 1}</td>
                          <td>{Website.tieu_de}</td>
                          <td>{Website.favicon?.length > 0 ? (
                            <img
                              src={`${process.env.REACT_APP_BASEURL}/${Website.favicon}`}
                              alt="Website"
                              style={{ width: '100px', height: '50px', objectFit: 'cover' }}
                            />
                          ) : (
                            'Không có hình ảnh'
                          )}</td>
                          <td>
                            {Website.updatedBy}
                          </td>
                          <td>
                            <Button
                              variant="primary me-2"
                              onClick={() => moModalSuaWebsite(Website)}
                              title="Chỉnh sửa Website"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleHienThiModalXoa(Website)}
                              title="Xóa Website"
                            >
                              <i className="fas fa-trash"></i>
                            </Button>

                            {Website.trangThai !== 1 && (
                              <Button
                                variant="success"
                                onClick={() => suDungTenWebsite(Website.id)}
                              >
                                Sử dụng
                              </Button>
                            )}
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

      <ModalTenwebSitersAdmin
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        isEdit={chinhSua}
        Website={WebsiteHienTai}
        fetchTenwebsite={layDanhSachTenwebsite}
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
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa Website?</h5>
            <p className="text-muted">
              <strong>{WebsiteXoa?.tieude}</strong>
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

export default TenwebSitersAdmin;
