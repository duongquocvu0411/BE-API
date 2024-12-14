
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SiderbarAdmin = () => {
  const vitriRoute = useLocation();

  return (
<aside className="main-sidebar sidebar-dark-primary elevation-4 collapse d-md-block" id="sidebar">
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
    {/* Sidebar - Brand */}
    <Link to="/admin/Trangchu" className="sidebar-brand d-flex align-items-center justify-content-center">
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-home"></i> {/* Changed icon to home */}
      </div>
      <div className="sidebar-brand-text mx-3">Admin</div>
    </Link>

    {/* Divider */}
    <hr className="sidebar-divider my-0" />

    {/* Dashboard */}
    <li className={`nav-item ${vitriRoute.pathname === '/admin/Trangchu' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/Trangchu">
        <i className="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </Link>
    </li>

    {/* Quản lý cửa hàng - Dropdown */}
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseStoreManagement"
        aria-expanded="false"
        aria-controls="collapseStoreManagement"
      >
        <i className="fas fa-store"></i> {/* Store icon remains */}
        <span>Quản lý cửa hàng</span>
      </a>
      <div id="collapseStoreManagement" className="collapse" data-bs-parent="#sidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/menu' ? 'active' : ''}`}
            to="/admin/menu"
          >
            <i className="fas fa-utensils"></i> {/* Changed to utensils for menu */}
            Quản lý Menu
          </Link>
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/tencuahang' ? 'active' : ''}`}
            to="/admin/tencuahang"
          >
            <i className="fas fa-sign"></i> {/* Changed to sign for store name */}
            Quản lý Tên cửa hàng
          </Link>
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/dactrung' ? 'active' : ''}`}
            to="/admin/dactrung"
          >
            <i className="fas fa-cogs"></i> {/* Changed to cogs for features */}
            Quản lý Đặc trưng
          </Link>
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/Banners' ? 'active' : ''}`}
            to="/admin/Banners"
          >
            <i className="fas fa-images"></i> {/* Changed to images for banners */}
            Quản lý Banners
          </Link>
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/tenfooter' ? 'active' : ''}`}
            to="/admin/tenfooter"
          >
            <i className="fas fa-cogs"></i> {/* Keep cogs for footer */}
            Quản lý Tên Footer
          </Link>
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/menuFooter' ? 'active' : ''}`}
            to="/admin/menuFooter"
          >
            <i className="fas fa-cogs"></i> {/* Keep cogs for footer */}
            Quản lý Menu Footer
          </Link>
          <Link
            className={`collapse-item ${vitriRoute.pathname === '/admin/Footer' ? 'active' : ''}`}
            to="/admin/Footer"
          >
            <i className="fas fa-cogs"></i> {/* Keep cogs for footer */}
            Quản lý  Footer
          </Link>
        </div>
      </div>
    </li>

    {/* Divider */}
    <hr className="sidebar-divider" />

    {/* Quản lý Sản phẩm */}
    <li className={`nav-item ${vitriRoute.pathname === '/admin/sanpham' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/sanpham">
        <i className="fas fa-box-open"></i> {/* Changed to box-open for products */}
        <span>Quản lý Sản Phẩm</span>
      </Link>
    </li>

    {/* Quản lý Danh mục */}
    <li className={`nav-item ${vitriRoute.pathname === '/admin/danhmucsanpham' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/danhmucsanpham">
        <i className="fas fa-th-large"></i> {/* Changed to th-large for categories */}
        <span>Quản lý Danh mục</span>
      </Link>
    </li>

    <li className={`nav-item ${vitriRoute.pathname === '/admin/gioithieuAdmin' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/gioithieuAdmin">
        <i className="fas fa-info-circle"></i> {/* Changed to info-circle for introduction */}
        <span>Quản lý Giới thiệu</span>
      </Link>
    </li>

    {/* Quản lý Địa chỉ */}
    <li className={`nav-item ${vitriRoute.pathname === '/admin/diachichitiet' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/diachichitiet">
        <i className="fas fa-map-marked-alt"></i> {/* Changed to map-marked-alt for address */}
        <span>Quản lý Địa Chỉ Admin</span>
      </Link>
    </li>

    {/* Quản lý Liên hệ */}
    <li className={`nav-item ${vitriRoute.pathname === '/admin/lienhe' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/lienhe">
        <i className="fas fa-phone-alt"></i> {/* Changed to phone-alt for contact */}
        <span>Quản lý Liên Hệ</span>
      </Link>
    </li>

    {/* Quản lý Đơn hàng */}
    <li className={`nav-item ${vitriRoute.pathname === '/admin/khachhang' ? 'active' : ''}`}>
      <Link className="nav-link" to="/admin/khachhang">
        <i className="fas fa-users"></i> {/* Changed to users for customers */}
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
