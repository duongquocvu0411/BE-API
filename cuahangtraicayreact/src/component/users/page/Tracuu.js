import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderUsers from './../HeaderUsers';
import Footerusers from './../Footerusers';
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button } from 'react-bootstrap';  // Thêm Modal và Button từ react-bootstrap
import Aos from "aos";

const Tracuu = () => {
  const [madonhang, setmadonhang] = useState("");
  const [dathangchitiet, setDathangchitiet] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);  // Điều khiển việc hiển thị modal
  const [maDonGhn, setMaDonGhn] = useState(""); // Trạng thái cho mã đơn hàng GHN
  const [ghnData, setGhnData] = useState(null); // Trạng thái để lưu dữ liệu từ GHN
  const [errorGhn, setErrorGhn] = useState(""); // Lỗi khi tra cứu GHN
  useEffect(() => {
    // Khởi tạo AOS sau khi component được render
    Aos.init({
      duration: 1000, // Thời gian hiệu ứng
      easing: 'ease-in-out', // Hiệu ứng easing

    });
  }, []);
  const handleLookupGhnOrder = async (e) => {
    e.preventDefault();

    if (!maDonGhn) {
      setErrorGhn("Vui lòng nhập mã đơn hàng GHN.");
      return;
    }

    try {
      const response = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail-by-client-code",
        { client_order_code: maDonGhn },
        {
          headers: {
            "Content-Type": "application/json",
            Token: "77cfcf4c-c9b7-11ef-bcc3-2a79af7210fe", // Sử dụng token GHN
          },
        }
      );
      setGhnData(response.data.data); // Lưu dữ liệu từ GHN vào trạng thái
      setErrorGhn(""); // Xóa lỗi nếu thành công
    } catch (error) {
      console.error("Lỗi khi tra cứu mã đơn GHN:", error);
      setErrorGhn("Không tìm thấy đơn hàng GHN với mã này.");
      setGhnData(null); // Reset dữ liệu nếu gặp lỗi
    }
  };
  // Hàm xử lý tra cứu đơn hàng
  const handleLookupOrder = async (e) => {
    e.preventDefault();

    if (!madonhang) {
      setError("Vui lòng nhập mã đơn hàng.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/hoadon/tracuu/${madonhang}`);
      setDathangchitiet(response.data.data);
      setError("");
    } catch (error) {
      console.error("Lỗi khi tra cứu đơn hàng:", error);
      setError("Không tìm thấy đơn hàng với mã này.");
      setDathangchitiet(null);
    }
  };

  const handleCancelOrder = async () => {
    try {
      // Gửi yêu cầu hủy đơn hàng đến API
      await axios.put(`${process.env.REACT_APP_BASEURL}/api/hoadon/tracuu/${madonhang}/huydon`);

      // Cập nhật trạng thái đơn hàng trong giao diện
      setDathangchitiet({ ...dathangchitiet, status: "Hủy đơn" });

      // Hiển thị thông báo thành công
      toast.success("Đơn hàng của bạn đã hủy thành công", {
        position: "top-right",
        autoClose: 3000,
      });

      // Đóng modal sau khi hủy thành công
      setShowModal(false);
      // Gọi lại API để load lại dữ liệu mới
      await handleLookupOrder(new Event('submit'));
    } catch (error) {
      // Hiển thị lỗi chi tiết nếu API trả về lỗi
      const errorMessage = error.response?.data?.message || "Có lỗi khi hủy đơn hàng của bạn. Vui lòng thử lại.";

      console.error("Lỗi khi hủy đơn hàng:", error);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };


  // hàm để chọn class cho trạng thái đơn hàng
  const getStatusClass = (status) => {
    switch (status) {
      case 'Đã Thanh toán':
        return ' bg-info text-dark border border-info'
      case 'Đang giao':
        return 'bg-warning text-dark';  // Màu vàng cho đang giao
      case 'Đã giao thành công':
        return 'bg-success text-white';  // Màu xanh cho giao thành công
      case 'Giao không thành công':
        return 'bg-danger text-white';  // Màu đỏ cho không thành công
      case 'Hủy đơn':
        return 'bg-secondary text-white';  // Màu xám cho hủy đơn
      case 'Thanh toán thất bại':
        return 'bg-secondary text-white';
      case 'Chờ xử lý':
        return 'bg-info text-white';  // Màu xanh da trời cho chờ xử lý
      case 'Chờ xử lý hủy đơn': // Mới thêm
        return 'bg-warning text-white';
      default:
        return '';  // Không có class nếu không có trạng thái
    }
  };
  const getTrangthaidonhangGHN = (status) => {
    switch (status) {
      case "ready_to_pick":
        return "Mới tạo đơn hàng.";
      case "picking":
        return "Nhân viên đang lấy hàng.";
      case "cancel":
        return "Hủy đơn hàng.";
      case "money_collect_picking":
        return "Đang thu tiền người gửi.";
      case "picked":
        return "Nhân viên đã lấy hàng.";
      case "storing":
        return "Hàng đang nằm ở kho.";
      case "transporting":
        return "Đang luân chuyển hàng.";
      case "sorting":
        return "Đang phân loại hàng hóa.";
      case "delivering":
        return "Nhân viên đang giao cho người nhận.";
      case "money_collect_delivering":
        return "Nhân viên đang thu tiền người nhận.";
      case "delivered":
        return "Nhân viên đã giao hàng thành công.";
      case "delivery_fail":
        return "Nhân viên giao hàng thất bại.";
      case "waiting_to_return":
        return "Đang đợi trả hàng về cho người gửi.";
      case "return":
        return "Trả hàng.";
      case "return_transporting":
        return "Đang luân chuyển hàng trả.";
      case "return_sorting":
        return "Đang phân loại hàng trả.";
      case "returning":
        return "Nhân viên đang đi trả hàng.";
      case "return_fail":
        return "Nhân viên trả hàng thất bại.";
      case "returned":
        return "Nhân viên trả hàng thành công.";
      case "exception":
        return "Đơn hàng ngoại lệ không nằm trong quy trình.";
      case "damage":
        return "Hàng bị hư hỏng.";
      case "lost":
        return "Hàng bị mất.";
      default:
        return "Trạng thái không xác định.";
    }
  };



  return (
    <>
      <HeaderUsers />

      <div className="container-fluid page-header text-white py-5" >
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-animation">
            <span className="animated-letter">T</span>
            <span className="animated-letter">r</span>
            <span className="animated-letter">a</span>
            &nbsp;
            <span className="animated-letter">C</span>
            <span className="animated-letter">ứ</span>
            <span className="animated-letter">u</span>
            &nbsp;
            <span className="animated-letter">Đ</span>
            <span className="animated-letter">ơ</span>
            <span className="animated-letter">n</span>
            &nbsp;
            <span className="animated-letter">H</span>
            <span className="animated-letter">à</span>
            <span className="animated-letter">n</span>
            <span className="animated-letter">g</span>
          </h1>
        </div>
      </div>

      {/* <div className="container my-5 py-5" data-aos="fade-up"> */}

      {/* <form onSubmit={handleLookupOrder} className="mb-5">
          <div className="input-group input-group-lg shadow-sm">
            <input
              type="text"
              className="form-control border-primary rounded-3"
              placeholder="Nhập mã đơn hàng của bạn"
              value={madonhang}
              onChange={(e) => setmadonhang(e.target.value)}
              aria-label="Mã đơn hàng"
            />
            <button className="btn btn-primary rounded-3" type="submit">
              <i className="fas fa-search"></i> Tra cứu
            </button>
          </div>
        </form> */}


      {/* {error && <div className="alert alert-danger text-center">{error}</div>}


        {dathangchitiet && (
          <div className="card shadow-lg border-0 mb-5">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top">
              <h5 className="mb-0">Chi tiết đơn hàng: {dathangchitiet.maDonHang}</h5>
              <small className="text-white">Ngày đặt hàng: {new Date(dathangchitiet.ngayTao).toLocaleDateString()}</small>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Trạng thái đơn hàng:</strong>{" "}
                <span className={`badge ${getStatusClass(dathangchitiet.trangThai)}`}>{dathangchitiet.trangThai}</span>
              </p>
              <p className="card-text">
                <strong>Phương thức thanh toán:</strong>{" "}
                <span className="">{dathangchitiet.phuongThucThanhToan}</span>
              </p>

        
              <h6 className="mt-4 text-primary">
                <i className="fas fa-cogs"></i> Chi tiết sản phẩm:
              </h6>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dathangchitiet.chiTietHoaDon && Array.isArray(dathangchitiet.chiTietHoaDon) ? (
                      dathangchitiet.chiTietHoaDon.map((item, index) => (
                        <tr key={index}>
                          <td>{item.tenSanPham}</td>
                          <td>{item.soLuong} {item.donViTinh}</td>
                          <td>{parseFloat(item.gia).toLocaleString("vi-VN", { style: 'decimal', minimumFractionDigits: 0 })} VND</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">Không có chi tiết sản phẩm</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="card-text">
                <strong>Tổng giá trị đơn hàng:</strong> {parseFloat(dathangchitiet.tongTien).toLocaleString("vi-VN", { style: 'decimal', minimumFractionDigits: 0 })} VND
              </p>

              {(dathangchitiet.trangThai === "Chờ xử lý" && dathangchitiet.phuongThucThanhToan === "cod") ||
                (dathangchitiet.trangThai === "Đã Thanh toán" && dathangchitiet.phuongThucThanhToan === "Momo") ? (
                <div className="text-center mt-4">
                  <button
                    className="btn btn-danger rounded-3 py-2 px-4"
                    onClick={() => {
                      setShowModal(true); // Hiển thị modal khi nhấn hủy
                    }}
                  >
                    <i className="fas fa-ban"></i> Hủy đơn hàng
                  </button>
                </div>
              ) : null}


            </div>
          </div>
        )} */}
      <div className="container my-5 py-5" data-aos="fade-up">
        <h3 className="mb-4 text-center">Tra cứu mã đơn </h3>
        {/* Form tra cứu mã đơn GHN */}
        <form onSubmit={handleLookupGhnOrder} className="mb-5">
          <div className="input-group input-group-lg shadow-sm">
            <input
              type="text"
              className="form-control border-success rounded-3"
              placeholder="Nhập mã đơn hàng GHN của bạn"
              value={maDonGhn}
              onChange={(e) => setMaDonGhn(e.target.value)}
              aria-label="Mã đơn hàng GHN"
            />
            <button className="btn btn-success rounded-3" type="submit">
              <i className="fas fa-search"></i> Tra cứu GHN
            </button>
          </div>
        </form>

        {/* Hiển thị lỗi nếu có */}
        {errorGhn && <div className="alert alert-danger text-center">{errorGhn}</div>}

        {/* Hiển thị dữ liệu từ GHN */}
        {ghnData && (
          <div className="card shadow-lg border-0 mb-5">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center rounded-top">
              <h5 className="mb-0">Chi tiết đơn hàng GHN: {ghnData.order_code}</h5>
              <small className="text-white">Ngày tạo: {new Date(ghnData.created_date).toLocaleDateString()}</small>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Trạng thái:</strong>{" "}
                <span className="badge bg-primary">{getTrangthaidonhangGHN(ghnData.status)}</span>
              </p>
              <p className="card-text">
                <strong>Người nhận:</strong> {ghnData.to_name} - {ghnData.to_phone}
              </p>
              <p className="card-text">
                <strong>Địa chỉ giao hàng:</strong> {ghnData.to_address}
              </p>
              <p className="card-text">
                <strong>Tổng giá trị (COD):</strong> {ghnData.cod_amount.toLocaleString("vi-VN")} VND
              </p>

              {/* Chi tiết sản phẩm */}
              <h6 className="mt-4 text-success">
                <i className="fas fa-box"></i> Chi tiết sản phẩm:
              </h6>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-success">
                    <tr>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Mã sản phẩm</th>
                      <th scope="col">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ghnData.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* </div> */}

      {/* Modal xác nhận hủy đơn hàng */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static" // Không cho phép đóng khi click ra ngoài
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i> Xác nhận hủy đơn hàng
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <i className="fas fa-ban fa-4x text-danger mb-3"></i>
          <h5 className="mb-3">Bạn có chắc chắn muốn hủy đơn hàng này?</h5>
          <p className="text-muted">Hành động này không thể hoàn tác.</p>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="fas fa-times me-2"></i> Hủy
          </Button>
          <Button variant="danger" onClick={handleCancelOrder}>
            <i className="fas fa-check me-2"></i> Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>


      <Footerusers />
      <ToastContainer />
    </>
  );
};

export default Tracuu;
