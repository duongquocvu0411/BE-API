import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import ModlaSanpham from './../modla/ModlaSanpham';
import SiderbarAdmin from '../SidebarAdmin';
import ModalDanhGia from '../modla/ModalDanhGia';
import Countdown from 'react-countdown';
import ModalChiTietSanPham from '../modla/ModalChiTietSanPham';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const SanPham = () => {
  // State lưu trữ danh mục sản phẩma
  const [danhMuc, setDanhMuc] = useState([]);


  // State lưu trữ danh mục được chọn
  const [danhMucDuocChon, setDanhMucDuocChon] = useState("");
  // State lưu trữ danh sách sản phẩm
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [showModalDanhGia, setShowModalDanhGia] = useState(false); // Quản lý hiển thị modal đánh giá
  const [sanphamIdXemDanhGia, setSanphamIdXemDanhGia] = useState(null); // Lưu trữ sanphams_id cho modal đánh giá
  // State hiển thị modal chi tiết sản phẩm
  const [hienThiModalChiTiet, setHienThiModalChiTiet] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState({});
  const [dangtai, setDangtai] = useState(false);
  const [showModalXoa, setShowModalXoa] = useState(false); // Hiển thị modal xóa
  const [sanPhamXoa, setSanPhamXoa] = useState(null); // Lưu thông tin sản phẩm cần xóa

  const [cookies] = useCookies(['adminToken', 'loginhoten'])
  // State quản lý trang hiện tại của phân trang
  const [trangHienTai, setTrangHienTai] = useState(1);

  // Số sản phẩm hiển thị mỗi trang
  const sanPhamMoiTrang = 5;

  // State hiển thị modal và chỉnh sửa sản phẩm
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [sanPhamHienTai, setSanPhamHienTai] = useState(null);
  const [showModalDanhGiaTuDong, setShowModalDanhGiaTuDong] = useState(false);
  const [noiDungDanhGia, setNoiDungDanhGia] = useState("");
  const [trangthaidanhgia, setTrangthaidanhgia] = useState(false);
  // Tính toán vị trí sản phẩm để phân trang
  const viTriSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const viTriSanPhamDau = viTriSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamTheoTrang = Array.isArray(danhSachSanPham)
    ? danhSachSanPham.slice(viTriSanPhamDau, viTriSanPhamCuoi)
    : [];
  const tongSoTrang = Array.isArray(danhSachSanPham)
    ? Math.ceil(danhSachSanPham.length / sanPhamMoiTrang)
    : 0;


  // Hàm thay đổi trang hiện tại khi người dùng bấm nút phân trang
  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  // Gọi API lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    layDanhSachSanPham();
    layDanhMuc();
    laytrangthaidanhgia();
  }, [danhMucDuocChon]);

  const layDanhSachSanPham = async () => {
    setDangtai(true); // Bắt đầu trạng thái đang tải
    try {
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/Sanpham/danhmuc/${danhMucDuocChon}`
        : `${process.env.REACT_APP_BASEURL}/api/sanpham`;

      const response = await axios.get(url);
      setDanhSachSanPham(response.data.data || []); // Lưu danh sách sản phẩm vào state
      setTrangHienTai(1); // Đặt lại trang hiện tại về 1 khi thay đổi danh mục
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDanhSachSanPham([]); // Khi API trả về 404, đặt danh sách sản phẩm là mảng rỗng
      } else {
        console.log("Có lỗi khi lấy API:", error);
        toast.error("Có lỗi khi lấy danh sách sản phẩm", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setDangtai(false); // Kết thúc trạng thái đang tải
    }
  };

  // Hàm gọi API để lấy danh sách danh mục sản phẩm
  const layDanhMuc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`);
      setDanhMuc(response.data.data); // Lưu danh mục sản phẩm vào state
    } catch (error) {
      console.error('Lỗi khi lấy danh mục sản phẩm:', error);
    }
  };



  // Hàm mở modal để thêm sản phẩm
  const moModalThemSanPham = () => {
    setChinhSua(false); // Đặt trạng thái không phải chỉnh sửa
    // setSanPhamHienTai(null); // Đặt sản phẩm hiện tại về null bỏ đi dòng code vẫn được vì bên trong component con đã có reset from khi add 
    setHienThiModal(true); // Hiển thị modal
  };

  // Hàm mở modal để chỉnh sửa sản phẩm
  const moModalSuaSanPham = async (sanPham) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanpham/${sanPham.id}`);
      const productData = response.data.data;

      setSanPhamHienTai(productData); // Lưu sản phẩm hiện tại với chi tiết đầy đủ
      setChinhSua(true); // Đặt trạng thái chỉnh sửa
      setHienThiModal(true); // Hiển thị modal

    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu sản phẩm:', error);
      toast.error('Không thể lấy dữ liệu sản phẩm', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };


  // Hàm xóa sản phẩm
  const xoaSanPham = async (id) => {
    const SanphamXoa = danhSachSanPham.find((sanpham) => sanpham.id === id);
    const token = cookies.adminToken; // Lấy token từ cookie
    // const loggedInUser = cookies.loginhoten; // Lấy họ tên người dùng từ cookie
    try {
      // ?UpdatedBy=${encodeURIComponent(loggedInUser)} truyền updatedBy vào api xóa để lấy thông tin người cập nhật cuối cùng 
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/sanpham/${id}?UpdatedBy=${encodeURIComponent(token)}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      toast.success(`Sản phẩm ${SanphamXoa.tieude} đã được xóa thành công!`, {
        position: 'top-right',
        autoClose: 3000,
      });
     
      layDanhSachSanPham(); // Cập nhật danh sách sản phẩm sau khi xóa
    } catch (error) {
      console.log('Lỗi khi xóa sản phẩm:', error);
      // Kiểm tra lỗi từ backend
      if (error.response.status === 403) {
        // Nếu lỗi từ backend có thông báo cụ thể
        toast.error("Bạn không có quyền xóa sản phẩm.");
      }  else {
        toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
    }
    }
  };


  // Hàm mở modal để xem chi tiết sản phẩm (gọi API lấy dữ liệu chi tiết)
  const moModalChiTiet = async (sanphams_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/chitiets/${sanphams_id}`);
      // console.log(response.data.data);  // Xem dữ liệu có đầy đủ thông tin không
      setNoiDungChiTiet(response.data.data); // Lưu dữ liệu chi tiết sản phẩm
      setHienThiModalChiTiet(true); // Hiển thị modal chi tiết
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNoiDungChiTiet("");
        setHienThiModalChiTiet(true);
      } else {
        console.log('Lỗi khi lấy chi tiết sản phẩm:', error);
        toast.error('Không thể lấy chi tiết sản phẩm', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const moModalDanhGia = (sanphams_id) => {
    setSanphamIdXemDanhGia(sanphams_id); // Lưu trữ sanphams_id
    setShowModalDanhGia(true); // Hiển thị modal đánh giá
  };
  const handleHienThiModalXoa = (sanPham) => {
    setSanPhamXoa(sanPham); // Lưu thông tin sản phẩm cần xóa
    setShowModalXoa(true); // Hiển thị modal xóa
  };

  const handleDongModalXoa = () => {
    setSanPhamXoa(null); // Reset thông tin sản phẩm cần xóa
    setShowModalXoa(false); // Ẩn modal xóa
  };
  const handleXacNhanXoa = async () => {
    if (sanPhamXoa) {
      await xoaSanPham(sanPhamXoa.id); // Gọi hàm xóa sản phẩm
      setSanPhamXoa(null); // Reset thông tin sản phẩm cần xóa
      setShowModalXoa(false); // Ẩn modal xóa
    }
  };

  const laytrangthaidanhgia = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/phanhoidanhgia/danhgiatudong`);
      setTrangthaidanhgia(response.data.trangthai);
    }
    catch (error) {
      toast.error("không thế lấy trạng thái đánh giá tự động", {
        position: 'top-right',
        autoClose: 300
      });
    }
  }

  const batDanhGiaTuDong = async () => {
    if (!noiDungDanhGia.trim()) {
      toast.error("vui lòng nhập nội dung đánh giá!", {
        position: 'top-right',
        autoClose: 3000
      });
      return;
    }
    try {
      const token = cookies.adminToken; // lấy token từ cooki
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/Phanhoidanhgia/phanhoi-tudong`,
        { noidung: noiDungDanhGia }, {
        headers: {
          Authorization: `Bearer ${token}`, // thêm token vào header
        },
      }
      );
      toast.success("đánh giá tự động đã được bật", {
        position: 'top-right',
        autoClose: 3000
      });
      setShowModalDanhGiaTuDong(false); // đóng modal
      setNoiDungDanhGia(""); // làm mới nội dung
      laytrangthaidanhgia();
    }
    catch (error) {
      if (error.response.status === 403) {
          toast.error("Bạn không có quyền Đánh giá tự động.");
      } else {
          toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
      }
    }
  }


  const tatDanhGiaTuDong = async () => {
    try {
      const token = cookies.adminToken; // Lấy token từ cookie
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/PhanHoiDanhGia/tat-phanhoi`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      toast.success("Đánh giá tự động đã được tắt!", {
        position: "top-right",
        autoClose: 3000,
      });
      laytrangthaidanhgia();
    }  catch (error) {
      if (error.response.status === 403) {
          toast.error("Bạn không có quyền Đánh giá tự động.");
      } else {
          toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
      }
    }
  };

let role = [];
if(cookies.adminToken){
  try {
    const giaimatoken = jwtDecode(cookies.adminToken);
    role = giaimatoken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
  } catch (error) {
    console.log("có lỗi khi giải mã token:",error);
  }
}


const isNhanvien = role.includes('Employee') && role.includes('User') && !role.includes('Admin');

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <SiderbarAdmin />

      {/* Nội dung chính */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Header */}
          <HeaderAdmin />

          {/* Tiêu đề trang */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-md-6">
                  <h1 className="h4 text-dark">Danh sách sản phẩm</h1>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                  <div className="dropdown me-3">
                    <button
                      className="btn btn-outline-primary dropdown-toggle shadow-sm"
                      type="button"
                      id="dropdownCategoryButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {danhMucDuocChon
                        ? danhMuc.find((dm) => dm.id === danhMucDuocChon)?.name || "Danh mục không rõ"
                        : "Tất cả sản phẩm"}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownCategoryButton">
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => setDanhMucDuocChon("")}
                        >
                          Tất cả sản phẩm
                        </button>
                      </li>
                      {danhMuc.map((dm) => (
                        <li key={dm.id}>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => setDanhMucDuocChon(dm.id)}
                          >
                            {dm.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Bảng danh sách sản phẩm */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                <Button variant="primary" onClick={moModalThemSanPham} className="btn-sm">
                  <i className="fas fa-plus-circle"></i> Thêm sản phẩm
                </Button>
                {!isNhanvien &&(
                <div>
                  {trangthaidanhgia ? (
                    <Button
                      variant="danger"
                      onClick={tatDanhGiaTuDong} // Gọi hàm tắt đánh giá tự động
                      className="btn-sm"
                    >
                      <i className="fas fa-stop-circle"></i> Tắt đánh giá tự động
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => setShowModalDanhGiaTuDong(true)} // Hiển thị modal nhập nội dung
                      className="btn-sm"
                    >
                      <i className="fas fa-magic"></i> Đánh giá tự động
                    </Button>
                  )}
                </div>
                )}
              </div>

              <div className="card-body">
                {dangtai ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered table-sm align-middle ">
                      <thead className="table-dark text-center">
                        <tr>
                          <th>#</th>
                          <th>Hình</th>
                          <th>Tên</th>
                          <th>Giá</th>
                          <th>Số lượng </th>
                          <th>Tạm giữ</th>
                          <th>Đơn vị</th>
                          <th>Chi tiết</th>
                          <th>Đánh giá</th>
                          <th>Trạng thái</th>
                          <th>Khuyến mãi</th>
                          <th>Người tạo</th>
                          <th>Người cập nhật</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhSachSanPham.length > 0 ? (
                          sanPhamTheoTrang.map((sanPham, index) => (
                            <tr key={sanPham.id}>
                              <td className="text-center">{viTriSanPhamDau + index + 1}</td>
                              <td className="text-center">
                                <img
                                  // src={sanPham.hinhanh}
                                  src={`${process.env.REACT_APP_BASEURL}/${sanPham.hinhanh}`}
                                  alt={sanPham.tieude}
                                  className="rounded img-thumbnail"
                                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                              </td>
                              <td className="text-truncate" style={{ maxWidth: '150px' }} title={sanPham.tieude}>
                                {sanPham.tieude}
                              </td>
                              <td className="text-end">
                                {parseFloat(sanPham.giatien).toLocaleString('vi-VN', { style: 'decimal', minimumFractionDigits: 0 })} VNĐ
                              </td>
                              <td>
                                {sanPham.soluong}
                              </td>
                              <td>
                                {sanPham.soluongtamgiu}
                              </td>
                              <td>{sanPham.don_vi_tinh}</td>
                              <td className="text-center">
                                <button className="btn btn-outline-info btn-sm" onClick={() => moModalChiTiet(sanPham.id)}>
                                  <i className="fas fa-eye"></i>
                                </button>
                              </td>
                              <td className="text-center">
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => moModalDanhGia(sanPham.id)}>
                                  <i className="fas fa-star"></i>
                                </button>
                              </td>
                              <td className="text-center">
                                <span className={`badge ${sanPham.trangthai === 'Còn hàng' ? 'bg-success' : 'bg-danger'}`}>
                                  {sanPham.trangthai}
                                </span>
                              </td>
                              <td className="text-center">
                                {sanPham.sanphamSales.length > 0 ? (
                                  sanPham.sanphamSales.map((sale) => (
                                    <div key={sale.id} className="mb-1 text-truncate" style={{ maxWidth: '150px' }}>
                                      <span className={`badge ${sale.trangthai === 'Đang áp dụng' ? 'bg-success' : 'bg-danger'}`}>
                                        {sale.trangthai}
                                      </span>
                                      {sale.trangthai === 'Đang áp dụng' && (
                                        <small className="d-block text-muted">
                                          <Countdown
                                            date={new Date(sale.thoigianketthuc)}
                                            renderer={({ days, hours, minutes, seconds, completed }) =>
                                              completed ? (
                                                <span>Đã kết thúc</span>
                                              ) : (
                                                <span>
                                                  {days}d {hours}h {minutes}‘  {seconds}s
                                                </span>
                                              )
                                            }
                                          />
                                        </small>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <span className="badge bg-secondary">Không có</span>
                                )}
                              </td>
                              <td className="text-truncate" style={{ maxWidth: '100px' }} title={sanPham.createdBy}>
                                {sanPham.createdBy}
                              </td>
                              <td className="text-truncate" style={{ maxWidth: '100px' }} title={sanPham.updatedBy}>
                                {sanPham.updatedBy}
                              </td>
                              <td className="text-center">
                                <div className="btn-group">
                                  <button className="btn btn-outline-warning btn-sm" onClick={() => moModalSuaSanPham(sanPham)}>
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleHienThiModalXoa(sanPham)}>
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="12" className="text-center">
                              Không có sản phẩm nào
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phân trang */}
          <div className="card-footer clearfix">
            <ul className="pagination pagination-sm m-0 float-right">
              <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => phanTrang(trangHienTai > 1 ? trangHienTai - 1 : 1)}>«</button>
              </li>
              {[...Array(tongSoTrang)].map((_, i) => (
                <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => phanTrang(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => phanTrang(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>»</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal thêm/sửa sản phẩm */}
        <ModlaSanpham
          show={hienThiModal}
          handleClose={() => setHienThiModal(false)}
          isEdit={chinhSua}
          product={sanPhamHienTai}
          fetchSanpham={layDanhSachSanPham}
        />

        {/* Modal xem đánh giá */}
        <ModalDanhGia
          show={showModalDanhGia}
          handleClose={() => setShowModalDanhGia(false)}
          sanphamId={sanphamIdXemDanhGia}
        />

        {/* Footer */}
        <Footer />
        <ToastContainer />

        {/* Modal chi tiết sản phẩm */}
        <ModalChiTietSanPham
          show={hienThiModalChiTiet}
          handleClose={() => setHienThiModalChiTiet(false)}
          noiDungChiTiet={noiDungChiTiet}
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
              <h5 className="mb-3">Bạn có chắc chắn muốn xóa sản phẩm?</h5>
              <p className="text-muted">
                <strong>{sanPhamXoa?.tieude}</strong>
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
        {/* modlal của đánh giá */}
        <Modal
          show={showModalDanhGiaTuDong}
          onHide={() => setShowModalDanhGiaTuDong(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Bật đánh giá tự động</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="noiDungDanhGia">Nội dung đánh giá</label>
              <textarea
                id="noiDungDanhGia"
                className="form-control"
                rows="3"
                placeholder="Nhập nội dung đánh giá tự động..."
                value={noiDungDanhGia}
                onChange={(e) => setNoiDungDanhGia(e.target.value)}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalDanhGiaTuDong(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={batDanhGiaTuDong}>
              Bật đánh giá tự động
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
};

export default SanPham;
