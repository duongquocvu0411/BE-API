import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import Footer from '../Footer';
import { toast, ToastContainer } from 'react-toastify';
import ModalChiTietKhachHang from '../modla/ModaChiTietKhachHang';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const Khachhangs = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 10;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chiTietKhachHang, setChiTietKhachHang] = useState(null);
  const [timKiem, setTimKiem] = useState('');
  const [timKiemTrangThai, setTimKiemTrangThai] = useState('');
  const [khachHangHienThi, setKhachHangHienThi] = useState([]);
  const [dangtai, setDangtai] = useState(false);
  const [showModalXoa, setShowModalXoa] = useState(false); // Hiển thị modal xóa
  const [khachHangXoa, setKhachHangXoa] = useState(null); // Thông tin khách hàng cần xóa
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = khachHangHienThi.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(khachHangHienThi.length / soPhanTuMotTrang);

  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  const layDanhSachKhachHang = async () => {
    setDangtai(true);
    const token = cookies.adminToken; // Lấy token từ cookie

    // Gửi trạng thái cập nhật lên backend
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhang`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào header
        }
      }
      );
      setDanhSachKhachHang(response.data.data);
      setKhachHangHienThi(response.data.data);
      setDangtai(false);
    } catch (error) {
      console.log('có lỗi khi lấy danh sách khách hàng', error);
      toast.error('có lỗi khi lấy danh sách', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  useEffect(() => {
    layDanhSachKhachHang();
  }, []);

  const xuLyTimKiem = (e) => {
    const giaTriTimKiem = e.target.value.toLowerCase();
    setTimKiem(giaTriTimKiem);
    if (giaTriTimKiem) {
      const ketQuaLoc = danhSachKhachHang.filter(khachHang =>
        (khachHang.ho + ' ' + khachHang.ten).toLowerCase().includes(giaTriTimKiem)
      );
      setKhachHangHienThi(ketQuaLoc);
    } else {
      setKhachHangHienThi(danhSachKhachHang);
    }
  };


  const xuLyLocTrangThai = (e) => {
    const giaTriLocTrangThai = e.target.value;
    setTimKiemTrangThai(giaTriLocTrangThai);

    // Lọc theo trạng thái đơn hàng
    if (giaTriLocTrangThai) {
      const ketQuaLoc = danhSachKhachHang.filter((khachHang) =>
        khachHang.hoaDons.some(
          (hoadon) => hoadon.status === giaTriLocTrangThai
        )
      );
      setKhachHangHienThi(ketQuaLoc);
    } else {
      setKhachHangHienThi(danhSachKhachHang); // Nếu không có giá trị lọc, hiển thị toàn bộ danh sách
    }
  };

  const xoaKhachHang = async (id, ten) => {
    const token = cookies.adminToken; // Lấy token từ cookie

    try {
      // Gửi yêu cầu DELETE với Authorization header
      const response = await axios.delete(
        `${process.env.REACT_APP_BASEURL}/api/khachhang/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}` // Thêm token vào header
          }
        }
      );

      toast.success(`Xóa khách hàng "${ten}" thành công`, {
        position: 'top-right',
        autoClose: 3000
      });

      // Cập nhật danh sách khách hàng sau khi xóa
      layDanhSachKhachHang();

      // Đóng modal sau khi xóa thành công
      setHienThiModal(false);
    } catch (error) {
      console.log('Có lỗi khi xóa khách hàng:', error);
      toast.error(`Có lỗi khi xóa khách hàng "${ten}"`, {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const hienThiChiTiet = async (id) => {
    try {
      // Lấy token từ localStorage hoặc sessionStorage
      const token = cookies.adminToken; // Lấy token từ cookie

      // Gửi request với token
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhang/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token vào header
        },
      });

      // Cập nhật dữ liệu khách hàng và hiển thị modal
      setChiTietKhachHang(response.data.data);
      setHienThiModal(true);
    } catch (error) {
      console.error('Có lỗi khi lấy chi tiết khách hàng:', error);


      toast.error('Có lỗi khi lấy chi tiết khách hàng!', {
        position: 'top-right',
        autoClose: 3000,
      });

    }
  };

  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

    const capNhatTrangThai = async (billId, trangthaimoi, lyDoHuy = null, ghiChu = null) => {
        setIsLoading(true);
        try {
            const token = cookies.adminToken;  // Thay bằng cách lấy token thực tế của bạn
            const decodedToken = jwtDecode(token);
            const updatedBy = decodedToken["FullName"] || "Unknown"; // Sửa ở đây
            
            const requestBody = {
                status: trangthaimoi,
                ly_do_huy: lyDoHuy,    // Gửi lý do hủy
                ghi_chu: ghiChu       // Gửi ghi chú
            };
            const response = await axios.put(
                `${process.env.REACT_APP_BASEURL}/api/HoaDon/UpdateStatus/${billId}`,
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            // Nếu thành công -> Cập nhật giao diện
            if (response.status === 200) {
                // toast.success('Cập nhật thành công!', {
                //     position: "top-right",
                //     autoClose: 3000,
                // });
                // Đóng modal chi tiết
                setHienThiModal(false);

                setDanhSachKhachHang((prevList) =>
                    prevList.map((khachHang) => {
                        if (khachHang.hoaDons) {
                            khachHang.hoaDons = khachHang.hoaDons.map((hoaDon) => {
                                if (hoaDon.id === billId) {
                                    // Đảm bảo clone hoaDon và gán lại thuộc tính
                                    const updatedHoaDon = { ...hoaDon, status: trangthaimoi, updatedBy: updatedBy };
                                    return updatedHoaDon;
                                }
                                return hoaDon;
                            });
                        }
                        return khachHang;
                    })
                );

                setKhachHangHienThi((prevList) =>
                    prevList.map((khachHang) => {
                        if (khachHang.hoaDons) {
                            khachHang.hoaDons = khachHang.hoaDons.map((hoaDon) => {
                                if (hoaDon.id === billId) {
                                    const updatedHoaDon = { ...hoaDon, status: trangthaimoi, updatedBy: updatedBy };
                                    return updatedHoaDon;
                                }
                                return hoaDon;
                            });
                        }
                        return khachHang;
                    })
                );
                console.log("Cập nhật thành công")
                toast.success('Cập nhật thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                });
                setHienThiModal(false);
            } else {
                toast.error('Cập nhật thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Có lỗi khi cập nhật trạng thái đơn hàng:', error);
            toast.error('Có lỗi khi cập nhật trạng thái đơn hàng!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };
    const handleClose = () => setHienThiModal(false); // định nghĩa handleClose
  const ghnStatusMapping = {
    ready_to_pick: { text: 'Mới tạo đơn hàng', bgColor: 'badge bg-light text-dark border' },
    picking: { text: 'Nhân viên đang lấy hàng', bgColor: 'badge bg-primary text-white border' },
    cancel: { text: 'Hủy đơn hàng', bgColor: 'badge bg-danger text-white border' },
    money_collect_picking: { text: 'Đang thu tiền người gửi', bgColor: 'badge bg-warning text-dark border' },
    picked: { text: 'Nhân viên đã lấy hàng', bgColor: 'badge bg-info text-white border' },
    storing: { text: 'Hàng đang nằm ở kho', bgColor: 'badge bg-secondary text-white border' },
    transporting: { text: 'Đang luân chuyển hàng', bgColor: 'badge bg-warning text-dark border' },
    sorting: { text: 'Đang phân loại hàng hóa', bgColor: 'badge bg-primary text-white border' },
    delivering: { text: 'Đang giao hàng', bgColor: 'badge bg-warning text-dark border' },
    money_collect_delivering: { text: 'Đang thu tiền người nhận', bgColor: 'badge bg-warning text-dark border' },
    delivered: { text: 'Giao hàng thành công', bgColor: 'badge bg-success text-white border' },
    delivery_fail: { text: 'Giao hàng thất bại', bgColor: 'badge bg-danger text-white border' },
    waiting_to_return: { text: 'Đang đợi trả hàng', bgColor: 'badge bg-secondary text-white border' },
    return: { text: 'Đang trả hàng', bgColor: 'badge bg-warning text-dark border' },
    return_transporting: { text: 'Luân chuyển hàng trả', bgColor: 'badge bg-warning text-dark border' },
    return_sorting: { text: 'Phân loại hàng trả', bgColor: 'badge bg-primary text-white border' },
    returning: { text: 'Nhân viên đang trả hàng', bgColor: 'badge bg-info text-white border' },
    return_fail: { text: 'Trả hàng thất bại', bgColor: 'badge bg-danger text-white border' },
    returned: { text: 'Trả hàng thành công', bgColor: 'badge bg-success text-white border' },
    exception: { text: 'Đơn hàng ngoại lệ', bgColor: 'badge bg-dark text-white border' },
    damage: { text: 'Hàng bị hư hỏng', bgColor: 'badge bg-danger text-white border' },
    lost: { text: 'Hàng bị mất', bgColor: 'badge bg-danger text-white border' },
    waiting: { text: 'Chờ xử lý', bgColor: 'badge bg-primary text-white border' },

  };

  const kiemTraTrangThaiHoaDon = (hoadons) => {
    return hoadons?.some(hoadon => hoadon.status === 'Hủy đơn' || hoadon.status === 'Thanh toán thất bại' || hoadon.status === 'Thanh toán không thành công' || hoadon.status === "cancel" || hoadon.status === "returned");
  };

  const layTrangThaiDonHang = (hoaDons) => {
    if (!hoaDons || hoaDons.length === 0) {
      return {
        text: 'Chưa có đơn hàng',
        bgColor: 'badge bg-light text-muted border',
        textColor: ''
      };
    }
    const hoadonChoXuLy = hoaDons.find(h => h.status === 'Chờ xử lý');
    if (hoadonChoXuLy) {
      return {
        text: 'Chờ xử lý',
        bgColor: 'badge bg-primary text-white border border-primary shadow',
        textColor: ''
      };
    }
    const hoadonthanhtoanthanhcong = hoaDons.find(h => h.status === 'Đã Thanh toán');
    if (hoadonthanhtoanthanhcong) {
      return {
        text: 'Đã Thanh toán',
        bgColor: 'badge bg-info text-dark border border-info shadow',
        textColor: ''
      };
    }

    const thanhtoanthatbai = hoaDons.find(h => h.status === 'Thanh toán thất bại');
    if (thanhtoanthatbai) {
      return {
        text: 'Thanh toán thất bại',
        bgColor: 'badge bg-info text-dark border border-info shadow',
        textColor: ''
      };
    }

    const cholayhang = hoaDons.find(h => h.status === "Chờ lấy hàng");
    if (cholayhang) {
      return {
        text: 'Chờ lấy hàng',
        bgColor: 'badge bg-primary text-white border border-primary shadow',
        textColor: ''
      }
    }
    const xacnhanhuydon = hoaDons.find(h => h.status === "Chờ xử lý hủy đơn");
    if (xacnhanhuydon) {
      return {
        text: 'Chờ xử lý hủy đơn',
        bgColor: 'badge bg-primary text-white border border-primary shadow',
        textColor: ''
      }
    }
    const huydon = hoaDons.find(h => h.status === "Hủy đơn");
    if (huydon) {
      return {
        text: 'Hủy đơn',
        bgColor: 'badge bg-primary text-white border border-primary shadow',
        textColor: ''
      }
    }
    // Kiểm tra trạng thái từ GHN
    const ghnOrder = hoaDons.find(h => ghnStatusMapping[h.status]);
    if (ghnOrder) {
      const mapping = ghnStatusMapping[ghnOrder.status];
      return {
        text: mapping.text,
        bgColor: mapping.bgColor,
        textColor: mapping.textColor || ''
      };
    }
    // Mặc định nếu không có trạng thái phù hợp
    return {
      text: 'Trạng thái không xác định',
      bgColor: 'badge bg-dark text-white border',
      textColor: ''
    };
  };
  const handleHienThiModalXoa = (khachHang) => {
    setKhachHangXoa(khachHang); // Lưu thông tin khách hàng cần xóa
    setShowModalXoa(true); // Hiển thị modal
  };

  const handleDongModalXoa = () => {
    setKhachHangXoa(null); // Reset thông tin khách hàng
    setShowModalXoa(false); // Đóng modal
  };

  const handleXacNhanXoa = async () => {
    if (khachHangXoa) {
      await xoaKhachHang(khachHangXoa.id, `${khachHangXoa.ho} ${khachHangXoa.ten}`); // Gọi hàm xóa
      setKhachHangXoa(null); // Reset thông tin khách hàng
      setShowModalXoa(false); // Đóng modal
    }
  };

  const handleLenDonHang = async (idKhachHang) => {
    const token = cookies.adminToken; // Lấy token từ cookie
    // const idShop = "195758"; // Giá trị idShop mặc định

    // Giải mã token để lấy thông tin `updatedBy`
    const decodedToken = jwtDecode(token);
            const updatedBy = decodedToken["FullName"] || "Unknown"; // Sửa ở đây
    try {
      // Gửi yêu cầu POST tới API lên đơn hàng
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/KhachHang/${idKhachHang}/create-order`,
        {},
        {
          // params: {
          //   idShop, // Gửi idShop mặc định qua query param
          // },
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token vào header
          },
        }
      );

      // Lấy mã đơn hàng từ phản hồi
      const ghnOrderId = response.data.ghn_order_id;

      // Thông báo thành công
      toast.success(`Lên đơn hàng thành công! Mã đơn: ${ghnOrderId}`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Cập nhật trạng thái `ghn` cho hóa đơn mà không cần tải lại trang
      setDanhSachKhachHang((prevList) =>
        prevList.map((khachHang) => {
          if (khachHang.id === idKhachHang) {
            return {
              ...khachHang,
              hoaDons: khachHang.hoaDons.map((hoaDon) =>
                hoaDon.ghn === "Chưa lên đơn"
                  ? { ...hoaDon, ghn: "Đã lên đơn", ghn_order_id: ghnOrderId, updatedBy }
                  : hoaDon
              ),
            };
          }
          return khachHang;
        })
      );

      // Cập nhật danh sách hiển thị
      setKhachHangHienThi((prevList) =>
        prevList.map((khachHang) => {
          if (khachHang.id === idKhachHang) {
            return {
              ...khachHang,
              hoaDons: khachHang.hoaDons.map((hoaDon) =>
                hoaDon.ghn === "Chưa lên đơn"
                  ? { ...hoaDon, ghn: "Đã lên đơn", ghn_order_id: ghnOrderId, updatedBy }
                  : hoaDon
              ),
            };
          }
          return khachHang;
        })
      );
    } catch (error) {
      console.error("Có lỗi khi lên đơn hàng:", error);
      toast.error("Có lỗi khi lên đơn hàng!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleXacNhanHuyDon = async (orderCode) => {
    const token = cookies.adminToken; // Lấy token từ cookie

    try {
      // Gọi API xác nhận hủy đơn
      const response = await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/hoadon/XacNhanHuyDon/${orderCode}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token
          },
        }
      );
      // Hiển thị thông báo thành công
      toast.success(`Đã hủy đơn hàng thành công!`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Cập nhật trạng thái đơn hàng trong danh sách
      setDanhSachKhachHang((prevList) =>
        prevList.map((khachHang) => {
          if (khachHang.hoaDons) {// duyệt qua danh sách hoa don
            khachHang.hoaDons = khachHang.hoaDons.map((hoaDon) =>
              hoaDon.order_code === orderCode  // kiểm tra mã hóa đơn trùng với orderCode 
                ? { ...hoaDon, status: "Hủy đơn" } // cập nhật trạng thái hóa đơn
                : hoaDon // giữ nguyên hóa đơn
            );
          }
          return khachHang;
        })
      );

      // duyệt qua danh sách hoadon không cần phải load website
      setKhachHangHienThi((prevList) =>
        prevList.map((khachHang) => {
          if (khachHang.hoaDons) {
            khachHang.hoaDons = khachHang.hoaDons.map((hoaDon) =>
              hoaDon.order_code === orderCode
                ? { ...hoaDon, status: "Hủy đơn" }
                : hoaDon
            );
          }
          return khachHang;
        })
      );
    } catch (error) {
      console.error("Có lỗi khi hủy đơn hàng:", error);
      toast.error("Có lỗi khi hủy đơn hàng!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div id="wrapper">
      <SiderbarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />
          <div id="content">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="h3 mb-0 text-gray-800">Danh Sách Khách Hàng</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                      <li className="breadcrumb-item active">Danh Sách Khách Hàng</li>
                    </ol>
                  </div>
                  <div className="col-sm-6">
                    {/* Tìm kiếm nâng cao */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm theo tên khách hàng, email..."
                      value={timKiem}
                      onChange={xuLyTimKiem}
                      style={{ maxWidth: '300px', marginRight: '10px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h3 className="m-0 font-weight-bold text-primary">Danh Sách Khách Hàng</h3>

                  {/* Bộ lọc theo trạng thái */}
                  <select
                    className="form-control"
                    value={timKiemTrangThai}
                    onChange={xuLyLocTrangThai}
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="">Lọc theo trạng thái</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao thành công">Đã giao thành công</option>
                    <option value="Hủy đơn">Hủy đơn</option>
                    <option value="Giao không thành công">Giao không thành công</option>
                    <option value="Chờ xử lý">Chờ xử lý</option>
                    <option value="Đã Thanh toán">Đã Thanh toán</option>
                    <option value="Thanh toán thất bại">Thanh toán thất bại</option>
                  </select>
                </div>

                <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                  {dangtai ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                      <p>Đang tải dữ liệu...</p>
                    </div>
                  ) : (
                    <table className="table table-bordered table-hover table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope='col'>UserId </th>
                          <th scope="col">Ngày tạo</th>
                          <th scope="col">Họ Tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Số Điện Thoại</th>
                          <th scope="col">Địa chỉ chi tiết</th>
                          <th scope="col">Thành phố/Tỉnh thành/Xã</th>
                          <th scope="col">Ghi chú</th>
                          <th scope='col'>Thanh toán</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Cập nhật bởi</th>
                          <th scope="col">Chức Năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhSachKhachHang.length === 0 ? (
                          <tr>
                            <td colSpan="13" className="text-center">Hiện tại chưa có khách hàng</td>
                          </tr>
                        ) : cacPhanTuHienTai.length > 0 ? (
                          cacPhanTuHienTai.map((item, index) => {
                            const trangThaiDonHang = layTrangThaiDonHang(item.hoaDons); // Lấy trạng thái từ danh sách hoaDons
                            return (
                              <tr key={item.id}>
                                <td>{chiSoPhanTuDau + index + 1}</td>
                                <td>{item.userNameLogin}</td>
                                <td>{item.created_at ? new Date(item.created_at).toLocaleDateString("vi-VN") : 'Không có thông tin'}</td>
                                <td>{item.ho} {item.ten}</td>
                                <td>{item.emailDiaChi}</td>
                                <td>{item.sdt}</td>
                                <td>{item.diaChiCuThe}</td>
                                <td>{item.xaphuong}, {item.tinhthanhquanhuyen}, {item.thanhPho}</td>
                                <td>{item.ghiChu}</td>
                                <td>
                                  {item.hoaDons.map((hoaDon) => (
                                    <div key={hoaDon.id}>{hoaDon.thanhtoan}</div>
                                  ))}
                                </td>
                                <td className={`${trangThaiDonHang.bgColor} ${trangThaiDonHang.textColor}`}>
                                  {trangThaiDonHang.text}
                                </td>
                                <td>
                                  {item.hoaDons.map((hoaDon) => (
                                    <div key={`updatedBy-${hoaDon.id}`}>{hoaDon.updatedBy}</div>
                                  ))}
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <button
                                      className="btn btn-info btn-sm me-2"
                                      title="Xem chi tiết"
                                      onClick={() => hienThiChiTiet(item.id)}
                                    >
                                      <i className="bi bi-eye"></i>
                                    </button>
                                    {item.hoaDons.map((hoaDon) =>
                                      (hoaDon.ghn === "Chưa lên đơn" && hoaDon.status !== "Hủy đơn" && hoaDon.status !== "Chờ xử lý hủy đơn" && hoaDon.status !== "Thanh toán thất bại") ? (
                                        <button
                                          key={`lenDon-${hoaDon.id}`}
                                          className="btn btn-primary btn-sm me-2"
                                          title="Xác nhận lên đơn hàng"
                                          onClick={() => handleLenDonHang(item.id)}
                                        >
                                          <i className="fas fa-truck"></i> Lên đơn
                                        </button>
                                      ) : (
                                        hoaDon.ghn !== "Chưa lên đơn" && (
                                          <span key={`daLenDon-${hoaDon.id}`} className="badge bg-success">Đã lên đơn</span>
                                        )
                                      )
                                    )}
                                    {item.hoaDons.map((hoaDon) =>
                                      hoaDon.status === "Chờ xử lý hủy đơn" ? (
                                        <button
                                          key={`huyDon-${hoaDon.id}`}
                                          className="btn btn-outline-warning btn-sm me-2"
                                          title="Xác nhận hủy đơn hàng"
                                          onClick={() => handleXacNhanHuyDon(hoaDon.order_code)}
                                        >
                                          <i className="fas fa-times-circle"></i> Xác nhận hủy đơn
                                        </button>
                                      ) : null
                                    )}
                                    {kiemTraTrangThaiHoaDon(item.hoaDons) && (
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        title="Xóa khách hàng"
                                        onClick={() => handleHienThiModalXoa(item)}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center">Không tìm thấy khách hàng</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="card-footer clearfix">
                  {/* Phân trang */}
                  <ul className="pagination pagination-sm m-0 float-right">
                    <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => thayDoiTrang(trangHienTai > 1 ? trangHienTai - 1 : 1)}>«</button>
                    </li>
                    {[...Array(tongSoTrang)].map((_, i) => (
                      <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => thayDoiTrang(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => thayDoiTrang(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>»</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal chi tiết khách hàng */}
        <ModalChiTietKhachHang
          show={hienThiModal}
          handleClose={handleClose}
          chiTietKhachHang={chiTietKhachHang}
          capNhatTrangThai={capNhatTrangThai}
          layTrangThaiDonHang={layTrangThaiDonHang}
          isLoading={isLoading}
        />
        <Modal
          show={showModalXoa}
          onHide={handleDongModalXoa}
          centered
          backdrop="static" // Không cho phép đóng khi click ra ngoài
        >
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>
              <i className="fas fa-exclamation-triangle me-2"></i> Xác nhận xóa
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <i className="fas fa-trash-alt fa-4x text-danger mb-3"></i>
              <h5 className="mb-3">Bạn có chắc chắn muốn xóa khách hàng này?</h5>
              <p className="text-muted">
                <strong>Họ Tên:</strong> {khachHangXoa?.ho} {khachHangXoa?.ten} <br />
                <strong>Email:</strong> {khachHangXoa?.emailDiaChi} <br />
                <strong>Số điện thoại:</strong> {khachHangXoa?.sdt}
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
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default Khachhangs;