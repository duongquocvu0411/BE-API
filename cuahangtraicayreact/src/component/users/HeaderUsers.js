import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "./page/CartContext";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {jwtDecode} from "jwt-decode";

const HeaderUsers = ({ tieudeSanPham }) => {
  const vitriRoute = useLocation();
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

  const tongSoLuong = giohang.reduce((tong, sanPham) => tong + sanPham.soLuong, 0);

  useEffect(() => {
    fetchMenuData();
    layThongTinWebsiteHoatDong();
    kiemTraTrangThaiDangNhap();
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
        const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
        if (decodedToken.exp > currentTime) {
          setFullName(decodedToken.FullName || "User");
          setIsLoggedIn(true);
        } else {
          // Token hết hạn
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

  const handleLogout = () => {
    removeCookie("userToken", { path: "/" });
    removeCookie("loginTime", { path: "/" });
    removeCookie("isUserLoggedIn", { path: "/" });
  
    toast.success("Đăng xuất thành công!", {
      position: "top-right",
      autoClose: 3000,
    });
    setIsLoggedIn(false);
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
            >
              <span className="fa fa-bars text-primary" />
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
                  <i className="fa fa-shopping-bag fa-2x" />
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
                <div className="d-flex m-3 me-0">
                  <span className="me-3">Xin chào, {fullName}</span>
                  <button className="btn btn-outline-danger me-2" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
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
    </>
  );
};

export default HeaderUsers;
