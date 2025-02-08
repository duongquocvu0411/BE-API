import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin';
import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const EmailDangkyTB = () => {
  const [emails, setEmails] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const emailMoiTrang = 5; // Số email hiển thị trên mỗi trang
  const [showModalXoa, setShowModalXoa] = useState(false);
  const [emailXoa, setEmailXoa] = useState(null);
  const [timKiem, setTimKiem] = useState('');
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  // Lọc email theo giá trị tìm kiếm
  const emailsDaLoc = emails.filter(email =>
    email.email.toLowerCase().includes(timKiem.toLowerCase())
  );

  // Phân trang
  const viTriEmailCuoi = trangHienTai * emailMoiTrang;
  const viTriEmailDau = viTriEmailCuoi - emailMoiTrang;
  const emailsTheoTrang = emailsDaLoc.slice(viTriEmailDau, viTriEmailCuoi);
  const tongSoTrang = Math.ceil(emailsDaLoc.length / emailMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  useEffect(() => {
    layDanhSachEmail();
  }, []);

  const layDanhSachEmail = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Emaildangky`); // Đảm bảo URL chính xác

      setEmails(response.data.data); // Giả sử API trả về { data: [], message: "" }
      setDangtai(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách email:', error);
       toast.error('có lỗi khi lấy danh sách ', {
                position: 'top-right',
                autoClose: 3000
            });
      setDangtai(false);
    }
  };

  const xoaEmail = async (id) => {
    // Xác thực trước khi xóa
    const token = cookies.adminToken; // Lấy token từ cookie
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/Emaildangky/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

       toast.success(`Xóa email thành công`, {
                position: 'top-right',
                autoClose: 3000
            });
      layDanhSachEmail();
      setTrangHienTai(1);
    }
    catch (error) {
            if (error.response.status === 403) {
                toast.error("Bạn không có quyền xóa danh mục.");
            } else {
                toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
            }
        }
  };

  const handleHienThiModalXoa = (email) => {
    setEmailXoa(email);
    setShowModalXoa(true);
  };

  const handleDongModalXoa = () => {
    setEmailXoa(null);
    setShowModalXoa(false);
  };

  const handleXacNhanXoa = async () => {
    if (emailXoa) {
      await xoaEmail(emailXoa.id);
      setEmailXoa(null);
      setShowModalXoa(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { // Định dạng ngày/tháng/năm
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('vi-VN', { // Định dạng giờ:phút:giây
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};
  return (
    <div id="wrapper">
      <SiderbarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh sách Email đăng ký</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Danh sách Email đăng ký</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mb-3">
            <div className="row">
              {/* Tìm kiếm Email */}
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchEmail" className="form-label">Tìm kiếm Email:</label>
                <div className="input-group">
                  <input
                    id="searchEmail"
                    type="text"
                    className="form-control"
                    placeholder="Nhập Email..."
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
                <h6 className="m-0 font-weight-bold text-primary">Danh sách Email đăng ký</h6>
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
                        <th scope="col">Email</th>
                        <th scope='col'>Ngày đăng ký</th>
                        <th scope="col">Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailsTheoTrang.map((email, index) => (
                        <tr key={nanoid()}>
                          <td>{viTriEmailDau + index + 1}</td>
                          <td>{email.email}</td>
                          <td>{formatDate(email.created_at)}</td>
                          <td>
                            <button
                              onClick={() => handleHienThiModalXoa(email)}
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

      {/* Modal xác nhận xóa */}
      <Modal show={showModalXoa} onHide={handleDongModalXoa} centered backdrop="static">
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i> Xác nhận xóa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="fas fa-trash-alt fa-4x text-danger mb-3"></i>
            <h5 className="mb-3">Bạn có chắc chắn muốn xóa email này?</h5>
            <p className="text-muted">
              <strong>{emailXoa?.Email}</strong>
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

export default EmailDangkyTB;