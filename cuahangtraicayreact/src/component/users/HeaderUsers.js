import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from './page/CartContext';
import axios from 'axios';
import ScrollToTop from 'react-scroll-to-top';
import { toast } from "react-toastify";
import ChatBot from "react-chatbotify";

import { HelmetProvider,Helmet } from "react-helmet-async";

const HeaderUsers = () => {
  const vitriRoute = useLocation();
  const [diachichitiet, setDiachichitiet] = useState({ diachi: ' ', email: '' });
  const [tencuahang, setTencuahang] = useState('');
  const [menuData, setMenuData] = useState([]); 
  const { giohang } = useContext(CartContext);
  const [thongTinWebsite, setThongTinWebsite] = useState({ tieu_de: "", favicon: "" });

  const tongSoLuong = giohang.reduce((tong, sanPham) => tong + sanPham.soLuong, 0);

  useEffect(() => {
    fetchCurrentDiaChi();
    fetchTencuahang();
    fetchMenuData();
    layThongTinWebsiteHoatDong();
  }, []);
 
  const layThongTinWebsiteHoatDong = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/tenwebsite/active`);
      if (response.data && response.data.length > 0) {
        const baseURL = process.env.REACT_APP_BASEURL;
        setThongTinWebsite({
          tieu_de: response.data[0].tieu_de,
          favicon: `${baseURL}${response.data[0].favicon}?v=${Date.now()}`, // Nối baseURL và thêm query string để tránh cache
        });
        console.log(thongTinWebsite.favicon)
      } else {
        toast.info("Không có website đang hoạt động", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Không có website đang hoạt động");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API thông tin website:", err);
      toast.error("Lỗi khi lấy thông tin website hoạt động", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const fetchCurrentDiaChi = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/DiaChiChiTiet/getDiaChiHien`);
      if (response.data) {
        setDiachichitiet({
          diachi: response.data.diachi,
          email: response.data.email,
        });
      } else {
        console.log('Không có địa chỉ đang sử dụng');
      }
    } catch (err) {
      console.error('Lỗi khi lấy thông tin địa chỉ:', err);
    }
  };

  const fetchTencuahang = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Tencuahang/getHien`);
      if (response.data && response.data.name) {
        setTencuahang(response.data.name);
      } else {
        console.log("Không có tên cửa hàng");
        setTencuahang("Tên cửa hàng mặc định");
      }
    } catch (err) {
      console.error('Lỗi khi lấy tên cửa hàng:', err);
      toast.error("Lỗi khi lấy tên cửa hàng", {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Menu`);
      if (response.data) {
        setMenuData(response.data);
      } else {
        console.log("Không có dữ liệu menu");
      }
    } catch (err) {
      console.error('Lỗi khi lấy menu:', err);
      toast.error("Lỗi khi lấy menu", {
        position: 'top-right',
        autoClose: 3000
      });
    }
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

      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary">
          <div className="row d-flex justify-content-between">
            <div className="col-6 col-sm-auto p-2">
              <small className="text-white d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2" />
                {diachichitiet.diachi}
              </small>
            </div>
            <div className="col-6 col-sm-auto p-2">
              <small className="text-white d-flex align-items-center justify-content-end">
                <i className="fas fa-envelope me-2" />
                {diachichitiet.email}
              </small>
            </div>
          </div>
        </div>

        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">{tencuahang || "Tên cửa hàng mặc định"}</h1>
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
            </div>
          </nav>
        </div>
      </div>

      <ScrollToTop
        smooth
        className="scroll-to-top"
        component={
          <i className="bi bi-arrow-up-circle-fill text-primary" style={{ fontSize: '3rem' }}></i>
        }
      />
    </>
  );
};

export default HeaderUsers;
