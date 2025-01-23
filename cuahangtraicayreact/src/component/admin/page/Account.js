import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import HeaderAdmin from "../HeaderAdmin";
import SiderbarAdmin from "../SidebarAdmin";
import { Button, Spinner, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ModalAccount from "../modla/ModalAccount";
import { useCookies } from "react-cookie";

const Account = () => {
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 4;

  const [showModalAccount, setShowModalAccount] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Modal xác nhận xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [cookies] = useCookies(['adminToken', 'loginhoten'])
  // Fetch account data
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    const token = cookies.adminToken;
    try {
       
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/get-all-employees`,{
            headers:{
                Authorization:` Bearer ${token}`
            }
        }
      );
      setAccountList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      toast.error("Không thể tải danh sách tài khoản, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!accountToDelete) return;
    const token = cookies.adminToken;
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/delete-employee-User/${accountToDelete.id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      );

      toast.success(`Tài khoản "${accountToDelete.username}" đã bị xóa.`);
      setAccountToDelete(null);
      setShowDeleteModal(false);
      fetchAccounts();
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      toast.error(
        error.response?.data?.message ||
          "Không thể xóa tài khoản, vui lòng thử lại."
      );
    }
  };

  // Search accounts
  const filteredAccounts = accountList.filter(
    (account) =>
      account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowModal = (account = null) => {
    setEditMode(!!account);
    setSelectedAccount(account);
    setShowModalAccount(true);
  };

  const handleShowDeleteModal = (account) => {
    setAccountToDelete(account);
    setShowDeleteModal(true);
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
                  <h1 className="h3 mb-0 text-gray-800">Danh sách tài khoản</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/admin/trangchu">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Danh sách tài khoản</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="searchAccount" className="form-label">
                  Tìm kiếm tài khoản:
                </label>
                <div className="input-group">
                  <input
                    id="searchAccount"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên tài khoản hoặc họ tên..."
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

          {/* Account Table */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Danh sách tài khoản
                </h6>
                <div className="card-tools">
                  <Button variant="primary" onClick={() => handleShowModal()}>
                    <i className="fas fa-plus-circle"></i> Thêm tài khoản
                  </Button>
                </div>
              </div>

              <div className="card-body table-responsive p-0">
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th>Email</th>
                        <th>Họ tên</th>
                        <th>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAccounts.map((account, index) => (
                        <tr key={account.id}>
                          <td>{indexOfFirstAccount + index + 1}</td>
                          <td>{account.username}</td>
                          <td>{account.email}</td>
                          <td>{account.fullName}</td>
                          <td>
                            {/* <button
                              className="btn btn-outline-warning btn-sm me-2"
                              onClick={() => handleShowModal(account)}
                            >
                              <i className="fas fa-edit"></i> Sửa
                            </button> */}
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleShowDeleteModal(account)}
                            >
                              <i className="fas fa-trash"></i> Xóa
                            </button>
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
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        handlePageChange(
                          currentPage > 1 ? currentPage - 1 : 1
                        )
                      }
                    >
                      <i className="fas fa-angle-left"></i>
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        handlePageChange(
                          currentPage < totalPages ? currentPage + 1 : totalPages
                        )
                      }
                    >
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

      {/* Modal for Add/Edit Account */}
      {showModalAccount && (
        <ModalAccount
          show={showModalAccount}
          onHide={() => setShowModalAccount(false)}
          editMode={editMode}
          account={selectedAccount}
          fetchAccounts={fetchAccounts}
        />
      )}

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa tài khoản{" "}
          <strong>{accountToDelete?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Account;
