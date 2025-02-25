import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./page/CartContext";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
import { Modal, Button } from "react-bootstrap";
import './HeaderUsers.css';

const HeaderUsers = ({ tieudeSanPham }) => {
  const vitriRoute = useLocation();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const { giohang } = useContext(CartContext);
  const [thongTinWebsite, setThongTinWebsite] = useState({
    tieu_de: "",
    favicon: "",
    email: "",
    diachi: "",
    sdt: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["userToken", "userName"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [anhDaiDien, setAnhDaiDien] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const tongSoLuong = giohang.reduce((tong, sanPham) => tong + sanPham.soLuong, 0);

  useEffect(() => {
    fetchMenuData();
    layThongTinWebsiteHoatDong();
    kiemTraTrangThaiDangNhap();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cookies.userToken]);

  const layThongTinWebsiteHoatDong = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/tenwebsite`);
      if (response.data.data && response.data.data.length > 0) {
        const baseURL = process.env.REACT_APP_BASEURL;
        setThongTinWebsite({
          tieu_de: response.data.data[0].tieu_de,
          email: response.data.data[0].email,
          diachi: response.data.data[0].diachi,
          sdt: response.data.data[0].sdt,
          favicon: `${baseURL}${response.data.data[0].favicon}?v=${Date.now()}`,
        });
      } else {
        toast.info("Không có website đang hoạt động", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Lỗi khi gọi API thông tin website:", err);
      toast.error("Lỗi khi lấy thông tin website hoạt động", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Menu`);
      if (response.data.data) {
        setMenuData(response.data.data);
      } else {
        console.log("Không có dữ liệu menu");
      }
    } catch (err) {
      console.error("Lỗi khi lấy menu:", err);
      toast.error("Lỗi khi lấy menu", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const kiemTraTrangThaiDangNhap = () => {
    const token = cookies.userToken;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp > currentTime) {
          const fullNameFromToken = decodedToken.FullName || "User";
          setFullName(fullNameFromToken);
          setIsLoggedIn(true);
          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullNameFromToken)}&background=random&size=40&bold=true&rounded=true`;
          setAnhDaiDien(avatarUrl);
        } else {
          removeCookie("userToken", { path: "/" });
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        removeCookie("userToken", { path: "/" });
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleShowLogoutConfirmation = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };



  const handleLogout = async  () => {
    setShowLogoutConfirmation(false); // Ẩn modal
    try {
      // Kiểm tra token trước khi sử dụng
      const token = cookies.userToken; // Lấy token từ cookie
      if (!token || typeof token !== "string") {
          toast.error("Không tìm thấy token hợp lệ. Vui lòng đăng nhập lại.", {
              position: "top-right",
              autoClose: 3000,
          });
          return;
      }

      // Gửi yêu cầu đến API /logout
      const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/admin/logout`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Đính kèm token vào header
              },
          }
      );

      if (response.data.status === "success") {
          // Xóa cookie sau khi đăng xuất thành công
          removeCookie("userToken", { path: "/" });
          removeCookie("loginTime", { path: "/" });
          removeCookie("isUserLoggedIn", { path: "/" });
      
          toast.success("Đăng xuất thành công!", {
            position: "top-right",
            autoClose: 3000,
          });

          navigate("/");
      } else {
          toast.error(response.data.message || "Đăng xuất thất bại.", {
              position: "top-right",
              autoClose: 3000,
          });
      }
  } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error(
          error.response?.data?.message || "Đã xảy ra lỗi khi đăng xuất.",
          {
              position: "top-right",
              autoClose: 3000,
          }
      );
  } finally {
      setIsLoggedIn(false); 
  }
   
  };

  const isDetailPage = vitriRoute.pathname.includes("/sanpham/");
  const pageTitle = isDetailPage && tieudeSanPham
    ? `${tieudeSanPham} - ${thongTinWebsite.tieu_de || "Tên website mặc định"}`
    : thongTinWebsite.tieu_de || "Tên website mặc định";

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
          {thongTinWebsite.favicon && (
            <link rel="icon" type="image/x-icon" href={thongTinWebsite.favicon} />
          )}
        </Helmet>
      </HelmetProvider>

      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary">
          <div className="row d-flex justify-content-between">
            <div className="col-6 col-sm-auto p-2">
              <small className="text-white d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2" />
                {thongTinWebsite.diachi}
              </small>
            </div>
            <div className="col-6 col-sm-auto p-2">
              <small className="text-white d-flex align-items-center justify-content-end">
                <i className="fas fa-envelope me-2" />
                {thongTinWebsite.email}
              </small>
            </div>
          </div>
        </div>

        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">{thongTinWebsite.tieu_de}</h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>

            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                {menuData.map((menu) => (
                  <Link
                    key={menu.id}
                    to={menu.url}
                    className={`nav-item nav-link ${vitriRoute.pathname === menu.url ? "active" : ""}`}
                  >
                    {menu.name}
                  </Link>
                ))}
              </div>
              <div className="d-flex m-3 me-0">
                <Link to="/giohang" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  {tongSoLuong > 0 && (
                    <span
                      className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark"
                      style={{
                        top: "-10px",
                        right: "-10px",
                        width: "20px",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    >
                      {tongSoLuong}
                    </span>
                  )}
                </Link>
              </div>

              {isLoggedIn ? (
                <li className="nav-item dropdown" style={{ listStyleType: 'none' }}>
                  <a
                    className="nav-link"  // REMOVED dropdown-toggle
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown" //removed data-bs-toggle
                    // aria-expanded={showDropdown}
                    // onClick={(e) => { e.preventDefault(); setShowDropdown(!showDropdown); }}
                    style={{display:'flex', alignItems:'center'}}
                  >
                    <img
                      src={anhDaiDien}
                      alt="Ảnh đại diện"
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px", objectFit: "cover", cursor: "pointer" }}
                    />

                  </a>
                  <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item" to="/lichsugiaodich">
                      <i className="fas fa-clipboard-list fa-sm fa-fw mr-2 text-gray-400"></i>
                      Lịch sử giao dịch
                    </Link></li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li><button className="dropdown-item" onClick={handleShowLogoutConfirmation}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Đăng xuất
                    </button></li>
                  </ul>
                </li>

              ) : (
                <>
                  <div className="d-flex m-3 me-0">
                    <Link to="/register" className="btn btn-primary">
                      Đăng ký
                    </Link>
                  </div>
                  <div className="d-flex m-3 me-0">
                    <Link to="/loginuser" className="btn btn-outline-primary me-2">
                      Đăng nhập
                    </Link>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      <ScrollToTop
        smooth
        className="scroll-to-top"
        component={
          <i className="bi bi-arrow-up-circle-fill text-primary" style={{ fontSize: "3rem" }}></i>
        } 
      />
      <Modal show={showLogoutConfirmation} onHide={() => setShowLogoutConfirmation(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-warning fw-bold">Xác nhận đăng xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?
        </Modal.Body>
        <Modal.Footer className="justify-content-center bg-light border-top-0">
          <Button variant="secondary" onClick={() => setShowLogoutConfirmation(false)} className="me-2">
            Hủy
          </Button>
          <Button variant="warning" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HeaderUsers;