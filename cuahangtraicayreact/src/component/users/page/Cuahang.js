import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import Aos from "aos";
// Định nghĩa renderer cho Countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Hiển thị khi đã hoàn thành
    return <span>Đã kết thúc</span>;
  } else {
    // Hiển thị bộ đếm lùi
    return (
      <span>
        {days} ngày {hours} giờ {minutes} phút {seconds} giây
      </span>
    );
  }
};
const Cuahang = () => {
  const [danhMuc, setDanhMuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanPham, setSanPham] = useState([]); // Khởi tạo state lưu trữ sản phẩm
  const [sanPhamSale, setSanPhamSale] = useState([]);
  const [danhMucDuocChon, setDanhMucDuocChon] = useState(""); // Danh mục được chọn
  const { addToCart } = useContext(CartContext); // Lấy hàm thêm vào giỏ hàng từ context
  const [dangtai, setDangtai] = useState(false);
  // Phân trang sản phẩm thông thường
  const [trangHienTai, datTrangHienTai] = useState(1);
  const sanPhamMoiTrang = 8;
  const chiSoSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const chiSoSanPhamDau = chiSoSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamHienTai = sanPham.slice(chiSoSanPhamDau, chiSoSanPhamCuoi);
  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);

  // Gọi API lấy danh mục và sản phẩm
  useEffect(() => {
    Aos.init({
      duration: 1000, // Thời gian hiệu ứng
      easing: 'ease-in-out', // Hiệu ứng easing

    });

    laySanPham();
    layDanhMuc();

    laySanPhamSale();
  }, [danhMucDuocChon]); // Chạy lại khi thay đổi danh mục

  const layDanhMuc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`);
      setDanhMuc(response.data.data || []); // Đảm bảo danh mục là mảng
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
      setDanhMuc([]); // Gán giá trị mặc định khi lỗi
    }
  };

  const laySanPham = async () => {
    setDangtai(true);
    try {
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/Sanpham/danhmuc-khongsale/${danhMucDuocChon}`
        : `${process.env.REACT_APP_BASEURL}/api/Sanpham/spkhongsale`;
      const response = await axios.get(url);

      if (response.data.data.length === 0) {
        // Nếu không có sản phẩm nào
        setSanPham([]); // Đặt danh sách sản phẩm thành mảng rỗng
      } else {
        setSanPham(response.data.data || []);
      }
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm thông thường:', error);
      setSanPham([]); // Nếu có lỗi, đặt danh sách sản phẩm thành mảng rỗng
    } finally {
      setDangtai(false);
    }
  };

  const laySanPhamSale = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Sanpham/spcosale`);
      setSanPhamSale(response.data.data || []);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm khuyến mãi:', error);
      toast.error('Không thể tải sản phẩm khuyến mãi!', { position: 'top-right', autoClose: 3000 });
    } finally {
      setDangtai(false);
    }
  };

  return (
    <>
      <HeaderUsers />

      <div className="container-fluid page-header text-white py-5" >
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-animation">
            <span className="animated-letter">C</span>
            <span className="animated-letter">ử</span>
            <span className="animated-letter">a</span>
            &nbsp;
            <span className="animated-letter">H</span>
            <span className="animated-letter">à</span>
            <span className="animated-letter">n</span>
            <span className="animated-letter">g</span>
          </h1>

        </div>
      </div>
      <div className="container-fluid fruite py-3 OurProduct" data-aos="fade-up">
        <div className="container py-5">
          <div className="tab-class text-center">
            {/* Tiêu đề chính */}



            {/* Bộ lọc sản phẩm */}
            <div className="row g-4 align-items-center " >
              <div className="col-lg-6 text-start">
                <h2 className="text-uppercase fw-bold text-success">
                  Sản phẩm không sale
                </h2>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <div className="dropdown me-3">
                  <button
                    className="btn btn-outline-success dropdown-toggle"
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
                      <li key={dm.id}
                      >
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

            {/* Danh sách sản phẩm không sale */}
            <div className="row g-4 mt-4">
              {dangtai ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mt-3">Đang tải dữ liệu...</p>
                </div>
              ) : sanPhamHienTai.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                  {sanPhamHienTai.map((sanPham) => (
                    <div className="col" key={sanPham.id}
                      data-aos="fade-up">
                      <div
                        className="card h-100 shadow-lg border-0"
                        style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Hiển thị số lượng ở góc trên bên phải */}
                        <div
                          className="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 rounded-bottom-left"
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                          }}
                        >
                          Số lượng: {sanPham.soluong || 0}
                        </div>

                        <Link to={`/sanpham/${sanPham.tieude}/${sanPham.id}`} className="text-decoration-none">
                          <img
                            // src={sanPham.hinhanh}
                            src={`${process.env.REACT_APP_BASEURL}/${sanPham.hinhanh}`}
                            className="card-img-top img-fluid rounded-top"
                            alt={sanPham.tieude || "Sản phẩm không có tiêu đề"}
                            style={{ height: 250, objectFit: "cover" }}
                          />
                        </Link>
                        <div className="card-body d-flex flex-column text-center">
                          <Link to={`/sanpham/${sanPham.tieude}/${sanPham.id}`} className="card-title text-success fw-bold text-decoration-none h5">
                            {sanPham.tieude || "Tên sản phẩm không rõ"}
                          </Link>
                          <p
                            className="card-text text-muted small mb-3"
                            dangerouslySetInnerHTML={{
                              __html:
                                sanPham.chiTiet && sanPham.chiTiet.mo_ta_chung // Kiểm tra chiTiet tồn tại
                                  ? sanPham.chiTiet.mo_ta_chung.length > 50
                                    ? sanPham.chiTiet.mo_ta_chung.slice(0, 50) + "..."
                                    : sanPham.chiTiet.mo_ta_chung
                                  : "Không có mô tả", // Giá trị mặc định nếu chiTiet không tồn tại
                            }}
                          ></p>


                          <p className="text-dark fs-5 fw-bold">
                            {parseFloat(sanPham.giatien).toLocaleString('vi-VN', { style: 'decimal', minimumFractionDigits: 0 })} VNĐ
                            / {sanPham.don_vi_tinh}
                          </p>
                          {sanPham.trangthai === "Hết hàng" ? (
                            <span className="badge bg-danger py-2 px-3">Hết hàng</span>
                          ) : (
                            <button
                              className="btn btn-outline-success mt-auto"
                              onClick={() => addToCart(sanPham)}
                            >
                              <i className="fa fa-shopping-cart me-2"></i> Thêm vào giỏ hàng
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-4">
                  <p className="text-muted">Không có sản phẩm nào trong danh mục này</p>
                </div>
              )}

              {/* Phân trang */}
              <div className="d-flex justify-content-center mt-4">
                <ul className="pagination pagination-sm">
                  <li className={`page-item ${trangHienTai === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => datTrangHienTai(1)}>
                      «
                    </button>
                  </li>
                  {[...Array(tongSoTrang)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${trangHienTai === index + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => datTrangHienTai(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${trangHienTai === tongSoTrang ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => datTrangHienTai(tongSoTrang)}>
                      »
                    </button>
                  </li>
                </ul>
              </div>
            </div>


            {/* Danh sách sản phẩm đang sale */}
            <div className="row g-4 mt-5" data-aos="fade-up">
              <div className="col-12 text-start">
                <h2 className="text-uppercase fw-bold text-danger">
                  Sản phẩm đang khuyến mãi
                </h2>
              </div>
              <div className="row g-4 mt-3">
                {dangtai ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-3">Đang tải dữ liệu...</p>
                  </div>
                ) : sanPhamSale?.length > 0 ? (
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                    {sanPhamSale.map((sanPham) => {
                      const sale = sanPham.sanphamSales?.find((sale) => sale.trangthai === "Đang áp dụng");
                      const ngayHethan = new Date(sale?.thoigianketthuc);
                      const daHethan = ngayHethan <= new Date();

                      return (
                        <div className="col" key={sanPham.id}
                        >
                          <div
                            className="card shadow-lg border-0 position-relative"
                            style={{
                              transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                             {/* Hiển thị số lượng ở dưới thời gian sale */}
                             <div
                              className="position-absolute top-0 start-0 bg-success text-white px-2 py-1 mt-4 rounded-end"
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                zIndex: 2,
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              Số lượng: {sanPham.soluong || 0}
                            </div>

                            {/* Hình ảnh sản phẩm */}
                            <Link to={`/sanpham/${sanPham.tieude}/${sanPham.id}`} className="text-decoration-none">
                              <img
                                // src={sanPham.hinhanh || "/path/to/default-image.jpg"}
                                src={`${process.env.REACT_APP_BASEURL}/${sanPham.hinhanh}`}
                                className="card-img-top img-fluid rounded-top"
                                alt={sanPham.tieude || "Không có tiêu đề"}
                                style={{ height: 250, objectFit: "cover" }}
                              />
                            </Link>

                            {/* Huy hiệu đếm ngược sale */}
                            <div
                              className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 rounded-end"
                              style={{
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                zIndex: 2,
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              <Countdown date={ngayHethan} renderer={renderer} />
                            </div>


                            {/* Nội dung sản phẩm */}
                            <div className="card-body text-center">
                              <h5 className="card-title text-danger fw-bold">{sanPham.tieude || "Tên sản phẩm không rõ"}</h5>
                              <p
                                className="card-text text-muted small mb-3"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    sanPham.chiTiet && sanPham.chiTiet.mo_ta_chung // Kiểm tra chiTiet tồn tại
                                      ? sanPham.chiTiet.mo_ta_chung.length > 50
                                        ? sanPham.chiTiet.mo_ta_chung.slice(0, 50) + "..."
                                        : sanPham.chiTiet.mo_ta_chung
                                      : "Không có mô tả", // Giá trị mặc định nếu chiTiet không tồn tại
                                }}
                              ></p>

                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <p
                                  className="text-muted mb-0 text-decoration-line-through"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  {parseFloat(sanPham.giatien).toLocaleString('vi-VN', { style: 'decimal', minimumFractionDigits: 0 })} VNĐ

                                </p>
                                <p className="text-danger fw-bold fs-5 mb-0">
                                  {parseFloat(sale?.giasale || 0).toLocaleString('vi-VN', { style: 'decimal', minimumFractionDigits: 0 })} VNĐ
                                  {/* {parseFloat(sale?.giasale || 0).toLocaleString("vi-VN", {
                                    minimumFractionDigits: 3,
                                  })}{" "}
                                  VND  */}
                                  / {sanPham.don_vi_tinh}
                                </p>
                              </div>
                              {!daHethan && sanPham.trangthai !== "Hết hàng" && (
                                <button
                                  className="btn btn-outline-danger w-100 mt-2"
                                  onClick={() => addToCart(sanPham)}
                                  style={{
                                    borderRadius: "20px",
                                    transition: "background-color 0.3s ease",
                                  }}
                                // onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                                // onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(220, 53, 69)")}
                                >
                                  <i className="fa fa-shopping-bag me-2" />
                                  Thêm vào giỏ
                                </button>
                              )}
                              {sanPham.trangthai === "Hết hàng" && (
                                <span className="badge bg-secondary mt-3 py-2 px-3">Hết hàng</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-muted">Không có sản phẩm nào đang khuyến mãi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footerusers />
      <ToastContainer />
    </>

  );
};

export default Cuahang;
