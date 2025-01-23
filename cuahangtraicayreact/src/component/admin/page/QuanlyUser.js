import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import HeaderAdmin from "../HeaderAdmin";
import SiderbarAdmin from "../SidebarAdmin";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import { FaLock, FaUnlock, FaInfoCircle } from "react-icons/fa";
import ModalUserChitiet from "../modla/ModalUserChitiet";


const QuanlyUser = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userOrders, setUserOrders] = useState(null);
  const usersPerPage = 4;
  const [cookies] = useCookies(["adminToken"]);

  // Fetch user data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const token = cookies.adminToken;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/get-all-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Không thể tải danh sách user, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async (userId) => {
    const token = cookies.adminToken;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/KhachHang/user-orders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserOrders(response.data.data);
    } catch (error) {
      console.error("Lỗi khi tải thông tin đơn hàng:", error);
      toast.error("Không thể tải thông tin đơn hàng, vui lòng thử lại.");
    }
  };

  const handleLockAccount = async (userId) => {
    const token = cookies.adminToken;
    try {
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/admin/lock-account`,
        null,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Tài khoản đã bị khóa!");
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi khóa tài khoản:", error);
      toast.error("Không thể khóa tài khoản, vui lòng thử lại!");
    }
  };

  const handleUnlockAccount = async (userId) => {
    const token = cookies.adminToken;
    try {
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Authenticate/admin/unlock-account`,
        null,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Tài khoản đã được mở khóa!");
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi mở khóa tài khoản:", error);
      toast.error("Không thể mở khóa tài khoản, vui lòng thử lại!");
    }
  };

  const handleViewDetails = async (user) => {
    setSelectedUser(user);
    await fetchUserOrders(user.id);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setUserOrders(null);
    setSelectedUser(null);
  };

  // Search users
  const filteredUsers = userList.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
                  <h1 className="h3 mb-0 text-gray-800">Danh sách user</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/admin/trangchu">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Danh sách user</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Danh sách user
                </h6>
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
                        <th>Tên user</th>
                        <th>Email</th>
                        <th>Họ tên</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{indexOfFirstUser + index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.fullName}</td>
                          <td>
                            {user.trangthaitk === 0 ? (
                              <span className="badge bg-danger">Bị khóa</span>
                            ) : (
                              <span className="badge bg-success">Hoạt động</span>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              className="me-2"
                              onClick={() => handleViewDetails(user)}
                            >
                              <FaInfoCircle /> Xem chi tiết
                            </Button>
                            {user.trangthaitk === 1 ? (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleLockAccount(user.id)}
                              >
                                <FaLock /> Khóa
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleUnlockAccount(user.id)}
                              >
                                <FaUnlock /> Mở khóa
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <ModalUserChitiet
        show={showDetailModal}
        handleClose={handleCloseModal}
        userOrders={userOrders}
      />

      <ToastContainer />
    </div>
  );
};

export default QuanlyUser;
