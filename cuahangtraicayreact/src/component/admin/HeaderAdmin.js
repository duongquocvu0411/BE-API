import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const HeaderAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [thongTinWebsite, setThongTinWebsite] = useState({ tieu_de: "", favicon: "" });
  const [cookies, setCookie, removeCookie] = useCookies(['adminToken', 'loginhoten', 'loginTime','isAdminLoggedIn']);
  // Get admin name from storage
  const token = cookies.adminToken; // Lấy token từ cookie
  const decodedToken = jwtDecode(token); // Giải mã token
  const hoten = decodedToken.hoten; // Lấy hoten từ token
 
  useEffect(() => {
    layThongTinWebsiteHoatDong();
  }, [])
  const layThongTinWebsiteHoatDong = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/tenwebsite`);
      if (response.data.data && response.data.data.length > 0) {
        const baseURL = process.env.REACT_APP_BASEURL;
        setThongTinWebsite({
          tieu_de: response.data.data[0].tieu_de,
          favicon: `${baseURL}${response.data.data[0].favicon}?v=${Date.now()}`, // Nối baseURL và thêm query string để tránh cache
        });
        console.log(thongTinWebsite.favicon)
      }
    } catch (err) {
      console.error("Lỗi khi gọi API thông tin website:", err);
      toast.error("Lỗi khi lấy thông tin website hoạt động", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  // Show logout confirmation modal
  const handleClickDangXuat = () => {
    setShowModal(true);
  };

  // Confirm logout
  // const handleXacNhanDangXuatTaiKhoan = async () => {
  //   try {
  //     const token = cookies.adminToken; // Lấy token từ cookie
  
  //     if (!token) {
  //       toast.error("Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //       navigate('/admin/Login');
  //       return;
  //     }
  
  //     console.log("Đang gửi yêu cầu logout với token:", token); // Debug token
  
  //     // Gọi API logout
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BASEURL}/api/Admin/logout`,
  //       {}, // Payload rỗng
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Đính kèm token trong header
  //         },
  //       }
  //     );
  
  //     if (response.status === 200 && response.data.status === "success") {
  //       console.log("Logout thành công:", response.data.message); // Log thông báo thành công
  
  //       // Xóa token và các thông tin khác khỏi cookies
  //       removeCookie('adminToken', { path: '/' });
  //       removeCookie('loginTime', { path: '/' });
  //       removeCookie('isAdminLoggedIn', { path: '/' });
  
  //       // Hiển thị thông báo thành công
  //       toast.success("Đăng xuất thành công!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  
  //       // Đóng modal và chuyển hướng đến trang đăng nhập
  //       setShowModal(false);
  //       navigate('/admin/Login');
  //     } else {
  //       throw new Error(response.data.message || "Đăng xuất thất bại.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi đăng xuất:", error);
  
  //     // Hiển thị thông báo lỗi nếu API thất bại
  //     toast.error("Đăng xuất thất bại. Vui lòng thử lại.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  const handleXacNhanDangXuatTaiKhoan = () => {
    // Clear localStorage and sessionStorage
    removeCookie('adminToken', { path: '/' });
    // removeCookie('loginhoten', { path: '/' });
    removeCookie('loginTime', { path: '/' });
    removeCookie('isAdminLoggedIn', { path: '/' });

    // Close modal and navigate to login page
    setShowModal(false);
    navigate('/admin/Login');
  };
  
  // Close modal
  const handleDongModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{thongTinWebsite.tieu_de || "Tên website mặc định"}</title>
          {thongTinWebsite.favicon && (
            <link rel="icon" type="image/x-icon" href={thongTinWebsite.favicon} />
          )}
        </Helmet>
      </HelmetProvider>
      {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3 d-md-none"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{hoten }</span>
              <img
                className="img-profile rounded-circle"
                src={`${process.env.PUBLIC_URL}/lte/img/undraw_profile.svg`}
                alt="User Profile"
              />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <Link className="dropdown-item" to="/admin/ProfileAdmin">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleClickDangXuat}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {/* Logout Confirmation Modal (React-Bootstrap) */}
      <Modal show={showModal} onHide={handleDongModal} centered backdrop="static" >
        <Modal.Header closeButton className="bg-light border-0">
          <Modal.Title className="text-center w-100">
            <i className="fas fa-exclamation-circle text-warning fa-2x mb-2"></i>
            <h5 className="text-danger mb-0">Xác nhận đăng xuất</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center bg-light">
          <div className="py-3">
            <p className="fw-semibold fs-5">
              Bạn có chắc muốn <span className="text-danger">đăng xuất</span> không?
            </p>
            <p className="text-muted small">
              Tất cả các phiên làm việc hiện tại sẽ kết thúc và bạn cần đăng nhập lại.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between bg-light border-0">
          <Button variant="secondary" className="fw-bold px-4 py-2" onClick={handleDongModal}>
            Thoát
          </Button>
          <Button variant="danger" className="fw-bold px-4 py-2" onClick={handleXacNhanDangXuatTaiKhoan}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
};

export default HeaderAdmin;
