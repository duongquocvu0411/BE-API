
import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SiderbarAdmin = () => {
  const vitriRoute = useLocation();
  const [cookies] = useCookies(['adminToken']);

  //giải mã token để lấy role
    let role = [];
    if (cookies.adminToken) {
      try {
        const giaimatoken = jwtDecode(cookies.adminToken);
        role = giaimatoken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
      }
      catch (error) {
        console.log("có lỗi khi giải mã token:", error);
      }
    } 

  // kiểm tra vai trò role Employee

  const isNhanvien = role.includes('Employee') && role.includes('User') && !role.includes('Admin');

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 collapse d-md-block" id="sidebar">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        {/* Sidebar - Brand */}
        <Link to="/admin/Trangchu" className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-home"></i> {/* Icon trang chủ */}
          </div>
          <div className="sidebar-brand-text mx-3">Admin Panel</div>
        </Link>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Dashboard */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/Trangchu' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/Trangchu">
            <i className="fas fa-chart-line"></i> {/* Icon Dashboard */}
            <span>Dashboard</span>
          </Link>
        </li>
        {!isNhanvien && (

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseStoreManagement"
              aria-expanded="false"
              aria-controls="collapseStoreManagement"
            >
              <i className="fas fa-store"></i> {/* Icon cửa hàng */}
              <span>Quản lý cửa hàng</span>
            </a>
            <div id="collapseStoreManagement" className="collapse" data-bs-parent="#sidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/Tenwebsiters' ? 'active' : ''}`} to="/admin/Tenwebsiters">
                  <i className="fas fa-desktop"></i> {/* Icon website */}
                  Tên Website
                </Link>
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/menu' ? 'active' : ''}`} to="/admin/menu">
                  <i className="fas fa-list"></i> {/* Icon menu */}
                  Menu điều hướng
                </Link>


                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/Banners' ? 'active' : ''}`} to="/admin/Banners">
                  <i className="fas fa-images"></i> {/* Icon banners */}
                  Banners
                </Link>
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/dactrung' ? 'active' : ''}`} to="/admin/dactrung">
                  <i className="fas fa-cogs"></i> {/* Icon đặc trưng */}
                  Đặc trưng
                </Link>

                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/tenfooter' ? 'active' : ''}`} to="/admin/tenfooter">
                  <i className="fas fa-columns"></i> {/* Icon footer */}
                  Tên Footer
                </Link>
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/menuFooter' ? 'active' : ''}`} to="/admin/menuFooter">
                  <i className="fas fa-list-alt"></i> {/* Icon menu footer */}
                  Menu Footer
                </Link>
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/Footer' ? 'active' : ''}`} to="/admin/Footer">
                  <i className="fas fa-border-all"></i>
                  Footer
                </Link>
              </div>
            </div>
          </li>
        )}

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Quản lý Sản phẩm */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/sanpham' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/sanpham">
            <i className="fas fa-boxes"></i> {/* Icon sản phẩm */}
            <span>Quản lý Sản phẩm</span>
          </Link>
        </li>

        {/* Quản lý Danh mục */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/danhmucsanpham' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/danhmucsanpham">
            <i className="fas fa-tags"></i> {/* Icon danh mục */}
            <span>Quản lý Danh mục</span>
          </Link>
        </li>
        <li className={`nav-item ${vitriRoute.pathname === '/admin/donvitinh' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/donvitinh">
            <i className="fas fa-tags"></i> {/* Icon danh mục */}
            <span>Quản lý DVT</span>
          </Link>
        </li>

        {/* Quản lý Giới thiệu */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/gioithieuAdmin' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/gioithieuAdmin">
            <i className="fas fa-info-circle"></i> {/* Icon giới thiệu */}
            <span>Quản lý Giới thiệu</span>
          </Link>
        </li>

        <li className={`nav-item ${vitriRoute.pathname === '/admin/voucher' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/voucher">
            <i className="fas fa-info-circle"></i> {/* Icon giới thiệu */}
            <span>Quản lý Voucher</span>
          </Link>
        </li>
        {!isNhanvien && (

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseS"
              aria-expanded="false"
              aria-controls="collapseS"
            >
              <i className="fas fa-store"></i> {/* Icon cửa hàng */}
              <span>Quản lý Account</span>
            </a>
            <div id="collapseS" className="collapse" data-bs-parent="#sidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/accounts' ? 'active' : ''}`} to="/admin/accounts">
                  <i className="fas fa-boxes"></i>
                  Quản lý  nhân viên
                </Link>
                <Link className={`collapse-item ${vitriRoute.pathname === '/admin/quanlyuser' ? 'active' : ''}`} to="/admin/quanlyuser">
                  <i className="fas fa-boxes"></i>
                  Quản lý  users
                </Link>
              </div>
            </div>
          </li>
        )}
        {!isNhanvien && (
          <li className={`nav-item ${vitriRoute.pathname === '/admin/Emailnhanthongbao' ? 'active' : ''}`}>
            <Link className="nav-link" to="/admin/Emailnhanthongbao">
              <i className="fa-solid fa-envelope"></i> {/* Icon thư */}
              <span>Quản lý Email thông báo </span>
            </Link>
          </li>
        )}



        {/* Quản lý Liên hệ */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/lienhe' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/lienhe">
            <i className="fas fa-phone"></i> {/* Icon liên hệ */}
            <span>Quản lý Liên hệ</span>
          </Link>
        </li>

        {/* Quản lý Đơn hàng */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/khachhang' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/khachhang">
            <i className="fas fa-shopping-cart"></i> {/* Icon đơn hàng */}
            <span>Quản lý Đơn hàng</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />
      </ul>
    </aside>


  );
};

export default SiderbarAdmin;
