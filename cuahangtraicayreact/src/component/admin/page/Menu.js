import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import ModalMenu from '../modla/ModalMenu'; // Import ModalMenu
import axios from 'axios';
import SiderbarAdmin from '../SidebarAdmin';
import HeaderAdmin from '../HeaderAdmin';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [cookies] = useCookies(['adminToken']);
  useEffect(() => {
    fetchMenuList();
  }, []);

  const fetchMenuList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/menu`);
      // Sắp xếp danh sách menu theo thứ tự hiển thị

      setMenuList(response.data.data);
    } catch (error) {
      toast.error('Có lỗi khi lấy danh sách menu', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMenu = menuList.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuPerPage = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (menu = null) => {
    setIsEdit(Boolean(menu));
    setCurrentMenu(menu);
    setShowModal(true);
  };

  // const deleteMenu = async (id, name) => {
  //   const token = cookies.adminToken;
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_BASEURL}/api/menu/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Thêm token vào header
  //         },
  //       });
  //     toast.success(`Xóa menu "${name}" thành công`, {
  //       position: 'top-right',
  //       autoClose: 3000,
  //     });
  //     fetchMenuList();
  //   } catch (error) {
  //     toast.error('Có lỗi khi xóa menu', {
  //       position: 'top-right',
  //       autoClose: 3000,
  //     });
  //   }
  // };

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
                  <h1 className="h3 mb-0 text-gray-800">Danh sách Menu</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/admin/trangchu">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Danh sách Menu</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Tìm kiếm */}
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchMenu" className="form-label">Tìm kiếm menu:</label>
                <div className="input-group">
                  <input
                    id="searchMenu"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên menu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bảng danh mục menu */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách menu</h6>
                {/* <Button variant="primary" onClick={openModal}>
              <i className="fas fa-plus-circle"></i> Thêm menu
            </Button> */}
              </div>
              <div className="card-body table-responsive p-0" style={{ maxHeight: '400px' }}>
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <table className="table table-bordered table-hover table-striped table-sm">
                    <thead className="table-dark text-center">
                      <tr>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '20%' }}>Tên</th>
                        <th style={{ width: '10%' }}>Thứ tự hiển thị</th>
                        <th style={{ width: '25%' }}>URL</th>
                        <th style={{ width: '15%' }}>Người tạo</th>
                        <th style={{ width: '15%' }}>Người cập nhật</th>
                        <th style={{ width: '10%' }}>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuPerPage.map((menu, index) => (
                        <tr key={menu.id} className="align-middle">
                          <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td className="text-truncate" title={menu.name} style={{ maxWidth: '200px' }}>
                            {menu.name}
                          </td>
                          <td className="text-center">{menu.thutuhien}</td>
                          <td className="text-truncate" title={menu.url} style={{ maxWidth: '250px' }}>
                            <a href={menu.url} target="_blank" rel="noopener noreferrer">
                              {menu.url}
                            </a>
                          </td>
                          <td className="text-truncate" style={{ maxWidth: '150px' }} title={menu.createdBy}>
                            {menu.createdBy}
                          </td>
                          <td className="text-truncate" style={{ maxWidth: '150px' }} title={menu.updatedBy}>
                            {menu.updatedBy}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => openModal(menu)}
                              title="Chỉnh sửa menu"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          </td>
                          {/* <td className="text-center">
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => deleteMenu(menu.id)}
                              title="Chỉnh sửa menu"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                )}
              </div>

              {/* Phân trang */}
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>«</button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>»</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Modal Thêm/Sửa menu */}
      <ModalMenu
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEdit={isEdit}
        menu={currentMenu}
        fetchMenuList={fetchMenuList}
      />

      <ToastContainer />
    </div>

  );
};

export default Menu;
