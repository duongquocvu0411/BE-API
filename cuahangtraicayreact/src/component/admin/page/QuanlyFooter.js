import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin'; // Import HeaderAdmin component

import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';

import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';
import ModlalQuanlyFooter from '../modla/ModalQuanlyFooter';
import { useCookies } from 'react-cookie';

const QuanlyFooter = () => {
  const [danhSachFooter, setDanhSachFooter] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const FooterMoiTrang = 4;
  const [showModalXoa, setShowModalXoa] = useState(false); // Hiển thị modal xóa
  const [FooterXoa, setFooterXoa] = useState(null); // Lưu thông tin Footer cần xóa
  const [cookies] = useCookies(['adminToken', 'loginhoten'])
  // Thêm state để lưu trữ giá trị tìm kiếm
  const [timKiem, setTimKiem] = useState('');

  // Logic tìm kiếm Footer theo tên
  const FooterDaLoc = danhSachFooter.filter((Footer) =>
    Footer.noiDungFooter.toLowerCase().includes(timKiem.toLowerCase())
  );

  // Logic phân trang
  const viTriFooterCuoi = trangHienTai * FooterMoiTrang;
  const viTriFooterDau = viTriFooterCuoi - FooterMoiTrang;
  const FooterTheoTrang = FooterDaLoc.slice(viTriFooterDau, viTriFooterCuoi);
  const tongSoTrang = Math.ceil(FooterDaLoc.length / FooterMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [FooterHienTai, setFooterHienTai] = useState(null);

  useEffect(() => {
    layDanhSachFooter();
  }, []);
  // Lấy danh sách Footer từ API
  const layDanhSachFooter = async () => {
    setDangtai(true); // bật trạng thái đang load để lấy dữ liệu 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Footer`)

      setDanhSachFooter(response.data);
      setDangtai(false);
    }
    catch (error) {
      if (error.response?.status === 403) {
          toast.error("Bạn không có quyền truy cập danh sách Footer.", {
              position: "top-right",
              autoClose: 3000,
          });
      }  else {
          toast.error(
              `Có lỗi khi lấy danh sách Footer: ${error.response?.data?.message || error.message || "Lỗi không xác định."}`,
              {
                  position: "top-right",
                  autoClose: 3000,
              }
          );
      }
      console.error("Có lỗi khi lấy danh sách Footer:", error.response?.data || error.message || error);
  }
  
  };



  // Mở modal để thêm Footer mới
  const moModalThemFooter = () => {
    setChinhSua(false);
    setFooterHienTai(null);
    setHienThiModal(true);
  };

  // Mở modal để chỉnh sửa Footer (tham số)
  const moModalSuaFooter = (Footer) => {
    setChinhSua(true);
    setFooterHienTai(Footer);
    setHienThiModal(true);
  };

  // Xóa Footer
  const xoaFooter = async (id, name) => {
    // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
    const token = cookies.adminToken; // Lấy token từ cookie

    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/Footer/${id}`
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      toast.success(`xóa danh muc "${name} " thành công`, {
        position: 'top-right',
        autoClose: 3000
      });
      layDanhSachFooter(); // lấy lại Footer khi xóa thành công
      setTrangHienTai(1);
    }
    catch (error) {
      console.log('có lỗi khi xóa Footer', error);
      toast.error('có lỗi khi xóa Footer', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const handleHienThiModalXoa = (Footer) => {
    setFooterXoa(Footer); // Lưu thông tin Footer cần xóa
    setShowModalXoa(true); // Hiển thị modal xóa
  };

  const handleDongModalXoa = () => {
    setFooterXoa(null); // Reset thông tin Footer cần xóa
    setShowModalXoa(false); // Đóng modal xóa
  };

  const handleXacNhanXoa = async () => {
    if (FooterXoa) {
      await xoaFooter(FooterXoa.id, FooterXoa.name); // Gọi hàm xóa Footer
      setFooterXoa(null); // Reset thông tin Footer
      setShowModalXoa(false); // Đóng modal xóa
    }
  };
  
  const suDungFooters = async (id) => {
    const token = cookies.adminToken; // Lấy token từ cookie
      const loggedInUser = cookies.loginhoten; // Lấy họ tên người dùng từ cookie
  
    try {
      // Gọi API với headers đặt đúng chỗ
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Footer/setFooter/${id}`,
        {updated_By:loggedInUser}, // Body rỗng, vì API  không yêu cầu body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Đặt headers đúng vị trí
          },
        }
      );
  
      toast.success("Footers đã được đánh dấu là đang sử dụng", {
        position: "top-right",
        autoClose: 3000,
      });
  
      layDanhSachFooter();
    } catch (error) {
      console.error("Có lỗi khi sử dụng tên Footers", error);
      toast.error("Có lỗi khi sử dụng tên Footers", {
        position: "top-right",
        autoClose: 3000,
      });
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
                  <h1 className="h3 mb-0 text-gray-800">Danh sách Footer</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Danh sách Footer</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Content Row */}
          <div className="container-fluid mb-3">
            <div className="row">
              {/* Tìm kiếm Footer */}
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchCategory" className="form-label">Tìm kiếm Footer:</label>
                <div className="input-group">
                  <input
                    id="searchCategory"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên Footer..."
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

          {/* Bảng Footer sản phẩm */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách Footer</h6>
                <div className="card-tools">
                  <Button variant="primary" onClick={moModalThemFooter} className='btn-sm'>
                    <i className="fas fa-plus-circle"></i> Thêm Footer
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
                        <th scope="col">Nội dung</th>
                        <th scope="col">Tạo bởi</th>
                        <th scope="col">Cập nhật bởi</th>
                        <th scope="col">Trạng thái</th>
                        {/* <th scope="col">Đã cập nhật Bởi</th> */}
                        <th scope="col">Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FooterTheoTrang.map((Footer, index) => (
                        <tr key={nanoid()}>
                          <td>{viTriFooterDau + index + 1}</td>
                          <td> <span dangerouslySetInnerHTML={{ __html: Footer.noiDungFooter.slice(0, 50) + '...' }} /></td>
                          <td>{Footer.createdBy}</td>
                          <td>{Footer.updatedBy}</td>
                          <td>
                          <span
                              className={`badge ${Footer.trangThai === 1 ? 'bg-success' : 'bg-secondary'}`}
                            >
                              {Footer.trangThai === 1 ? 'Đang sử dụng' : 'Không sử dụng'}
                            </span>
                          </td>
                         
                          <td>
                            <div className="d-flex gap-2">

                              <button
                                className="btn btn-outline-warning btn-sm"
                                onClick={() => moModalSuaFooter(Footer)}
                                title="Chỉnh sửa Website"
                              >
                                <i className="fas fa-edit"></i>
                              </button>


                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleHienThiModalXoa(Footer)}
                                title="Xóa Website"
                              >
                                <i className="fas fa-trash"></i>
                              </button>


                              {Footer.trangThai !== 1 && (
                                <button
                                  className="btn btn-outline-success btn-sm"
                                  onClick={() => suDungFooters(Footer.id)}
                                  title="Sử dụng Website"
                                >
                                  <i className="fas fa-check-circle"></i> Sử dụng
                                </button>
                              )}
                            </div>
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

      {/* Modal Thêm/Sửa Footer */}
      <ModlalQuanlyFooter
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        isEdit={chinhSua}
        Footer={FooterHienTai}
        fetchFooters={layDanhSachFooter}
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
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa Footer?</h5>
            <p className="text-muted">
              <strong>{FooterXoa?.name}</strong>
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

export default QuanlyFooter;
