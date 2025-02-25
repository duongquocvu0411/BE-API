import React, { useContext, useEffect, useState } from 'react';
import Footerusers from '../Footerusers';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import Countdown from 'react-countdown';
import Aos from 'aos';
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
const TrangchuNguoidung = () => {
  const [danhMuc, setDanhMuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanPham, setSanPham] = useState([]); // Khởi tạo state lưu trữ sản phẩm
  const [sanPhamSale, setSanPhamSale] = useState([]);
  const [danhMucDuocChon, setDanhMucDuocChon] = useState(""); // Danh mục được chọn
  const { addToCart } = useContext(CartContext); // Lấy hàm thêm vào giỏ hàng từ context
  const [dangtai, setDangtai] = useState(false);
  const [dactrungs, setDactrungs] = useState([]); // State lưu danh sách đặc trưng
  const [banners, setBanners] = useState([]);
  const [email, SetEmail] = useState('');
  const [thongbao, setThongbao] = useState('');
  // Phân trang sản phẩm thông thường
  const [trangHienTai, datTrangHienTai] = useState(1);
  const sanPhamMoiTrang = 8;
  const chiSoSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const chiSoSanPhamDau = chiSoSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamHienTai = sanPham.slice(chiSoSanPhamDau, chiSoSanPhamCuoi);
  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);
  const [thongTinWebsite, setThongTinWebsite] = useState({ tieu_de: "", favicon: "", email: "", diachi: "", sdt: "", phu_de: "" });
  // Gọi API lấy danh mục và sản phẩm
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out'
    });
    laySanPham();
    layDanhMuc();
    layDactrungs()
    layBanners();
    laySanPhamSale();
    layThongTinWebsiteHoatDong();
  }, [danhMucDuocChon]); // Chạy lại khi thay đổi danh mục

  const layBanners = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/banners/getTrangthaiHien`);
      setBanners([response.data.data]); // Đảm bảo banners là mảng và chứa một phần tử
    } catch (error) {
      console.error('Lỗi khi lấy banner đang sử dụng:', error);
      toast.error('Không thể tải banner đang sử dụng!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setBanners([]); // Gán giá trị mặc định khi lỗi
    }
  };



  const layDanhMuc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`);
      setDanhMuc(response.data.data || []); // Đảm bảo danh mục là mảng
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
      setDanhMuc([]); // Gán giá trị mặc định khi lỗi
    }
  };

  const layDactrungs = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/dactrung`);
      const data = response.data || [];
      setDactrungs(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đặc trưng:', error);
      toast.error('Không thể tải danh sách đặc trưng!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setDactrungs([]); // Gán giá trị mặc định khi lỗi
    } finally {
      setDangtai(false);
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

  const layThongTinWebsiteHoatDong = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/tenwebsite`);
      if (response.data.data && response.data.data.length > 0) {
        const baseURL = process.env.REACT_APP_BASEURL;
        setThongTinWebsite({
          tieu_de: response.data.data[0].tieu_de,
          phu_de: response.data.data[0].phu_de,
          email: response.data.data[0].email,
          diachi: response.data.data[0].diachi,
          sdt: response.data.data[0].sdt,
          favicon: `${baseURL}${response.data.data[0].favicon}?v=${Date.now()}`, // Nối baseURL và thêm query string để tránh cache
        });

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


  const laySoLuongKhaDung = (sanPham) => {
    return sanPham.soluong - sanPham.soluongtamgiu;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Vui lòng nhập một địa chỉ email hợp lệ.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/Emaildangky`, { Email: email });

      if (response.data.code === 0 && response.data.message === "Success") {

        // thông báo thành công
        setThongbao('🎉 Đăng ký thành công! Cảm ơn bạn đã quan tâm đến cửa hàng.');

        SetEmail('');

        // xóa thông báo sau 5s
        setTimeout(() => {
          setThongbao('');
        }, 5000)

      } else {
        // Lấy thông báo lỗi từ backend
        const errorMessage = response.data.message || 'Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.';
        setThongbao(`❌ ${errorMessage}`); // Hiển thị thông báo từ backend
        setTimeout(() => {
          setThongbao('');
        }, 5000)
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký email:', error);

      // Lấy thông báo lỗi từ backend (nếu có)
      let errorMessage = 'Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      setThongbao(`❌ ${errorMessage}`);
      setTimeout(() => {
        setThongbao('');
      }, 5000)
    }
  };
  return (
    <>
      <HeaderUsers />

      {/* Hero Start */}
      <div
        className="container-fluid py-5 mb-5 hero-header"
        style={{ background: "linear-gradient(to bottom, #f5f5f5, #ffffff)" }}
        data-aos="fade-up">
        <div className="container py-5" >
          <div className="row g-5 align-items-center">
            {/* Phần tiêu đề và phụ đề */}
            <div className="col-md-12 col-lg-7">

              <div className="text-center text-lg-start">
                <h4
                  className="mb-3 text-uppercase text-secondary"
                  style={{
                    letterSpacing: "3px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {/* {banners[0].tieude} */}
                  {thongTinWebsite.tieu_de}
                </h4>
                <h1
                  className="mb-5 display-3 text-primary fw-bold position-relative"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    lineHeight: "1.2",
                    overflow: "hidden",
                  }}
                >
                  {/* <span className="glowing-text">{banners[0].phude}</span> */}
                  <span className="glowing-text">{thongTinWebsite.phu_de}</span>
                </h1>
              </div>

            </div>

            {/* Phần carousel */}
            <div className="col-md-12 col-lg-5">
              <div
                id="carouselId"
                className="carousel slide position-relative shadow-lg rounded"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner rounded" role="listbox">
                  {banners.length > 0 &&
                    banners[0].bannerImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img
                          src={`${process.env.REACT_APP_BASEURL}/${image.imagePath}`}
                          className="img-fluid w-100 rounded"
                          alt="banner"
                          style={{
                            height: "300px",
                            objectFit: "cover",
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon bg-dark rounded-circle p-2"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon bg-dark rounded-circle p-2"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Hero End */}
      {/* Đặc trưng */}
      <div className="container-fluid features-section py-5 bg-light" data-aos="fade-up">
        <div className="container py-5">
          <div className="text-center mb-5">

            <p className="text-muted">
              Những đặc điểm nổi bật mà chúng tôi mang đến để phục vụ bạn
            </p>
          </div>
          <div className="row g-4">
            {dangtai ? (
              <div className="text-center w-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Đang tải...</p>
              </div>
            ) : dactrungs.length > 0 ? (
              dactrungs.map((item, index) => (
                <div
                  className={`col-md-6 col-lg-3 d-flex align-items-stretch animate-feature animate-delay-${index}`}
                  key={item.id}
                >
                  <div className="feature-item text-center rounded shadow-lg bg-white p-4 border border-light">
                    {/* Icon hình tròn */}
                    <div className="feature-icon btn-square rounded-circle bg-primary mb-4 mx-auto d-flex align-items-center justify-content-center">
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/${item.icon}`}
                        alt={item.tieude}
                        className="img-fluid"
                        style={{
                          // width: "60px",
                          // height: "60px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    {/* Nội dung */}
                    <div className="feature-content">
                      <h5 className="fw-bold text-primary">{item.tieude}</h5>
                      <p className="text-muted mb-0">{item.phude}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-100">
                <p>Không có dữ liệu đặc trưng nào để hiển thị.</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Featurs Section End */}


      {/* Sản phẩm của chúng tôi */}
      <div className="container-fluid fruite py-5 OurProduct" data-aos="fade-up">
        <div className="container py-5">
          <div className="tab-class text-center">
            {/* Tiêu đề chính */}
            <div className="row mb-4 align-items-center">
              <div className="col-12 text-center">
                <h1 className="text-uppercase fw-bold glowing-text">
                  Sản phẩm của chúng tôi
                </h1>
                <p className="text-muted">
                  Khám phá các sản phẩm chất lượng với mức giá phù hợp.
                </p>
              </div>
            </div>


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
                          {/* Số lượng: {sanPham.soluong || 0} */}
                          {laySoLuongKhaDung(sanPham) <= 0 ? (
                            <span>Hết hàng</span>
                          ) : (
                            <span>Số lượng: {laySoLuongKhaDung(sanPham)}</span>
                          )}
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
                            / {sanPham.donvitinhs.name}
                          </p>
                          {sanPham.trangthai === "Hết hàng" ? (
                            <span className="badge bg-danger py-2 px-3">Hết hàng</span>
                          ) : (
                            <>
                              {
                                laySoLuongKhaDung(sanPham) > 0 ? (
                                  <button
                                    onClick={() => addToCart(sanPham)}
                                    className="btn border border-secondary rounded-pill px-3 text-primary">
                                    <i className="fa fa-shopping-bag me-2 text-primary" /> Thêm vào giỏ hàng
                                  </button>
                                ) : (
                                  <span className="badge bg-danger py-2 px-3">Hết hàng</span>
                                )
                              }
                            </>
                            // <button
                            //   className="btn btn-outline-success mt-auto"
                            //   onClick={() => addToCart(sanPham)}
                            // >
                            //   <i className="fa fa-shopping-cart me-2"></i> Thêm vào giỏ hàng
                            // </button>
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

                          >
                            <Link to={`/sanpham/${sanPham.tieude}/${sanPham.id}`} className="text-decoration-none position-relative">
                              <img
                                src={`${process.env.REACT_APP_BASEURL}/${sanPham.hinhanh}`}
                                className="card-img-top img-fluid"
                                alt={sanPham.tieude || "Không có tiêu đề"}
                                style={{ height: 250, objectFit: "cover" }}
                              />
                              {/* Hiển thị số lượng bên trong hình ảnh, góc dưới bên phải */}
                              <div className="position-absolute bottom-0 end-0 bg-primary text-white px-2 py-1"
                                style={{
                                  borderRadius: "5px 0 0 0", // Góc bo tròn nhỏ hơn
                                  fontSize: "0.75rem", // Giảm kích thước font
                                  fontWeight: "bold",
                                  zIndex: 1, // Đảm bảo hiển thị trên hình ảnh
                                }}
                              >
                                {laySoLuongKhaDung(sanPham) <= 0 ? (
                                  <span>Hết hàng</span>
                                ) : (
                                  <span>Số lượng: {laySoLuongKhaDung(sanPham)}</span>
                                )}
                              </div>
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
                                  })}{" "} */}
                                  / {sanPham.donvitinhs.name}
                                </p>
                              </div>
                              {!daHethan && sanPham.trangthai !== "Hết hàng" && laySoLuongKhaDung(sanPham) > 0 && (
                                <button
                                  className="btn btn-outline-danger w-100 mt-2"
                                  onClick={() => addToCart(sanPham)}
                                  style={{
                                    borderRadius: "20px",
                                    transition: "background-color 0.3s ease",
                                  }}
                                >
                                  <i className="fa fa-shopping-bag me-2" />
                                  Thêm vào giỏ
                                </button>
                              )}
                              {/* {sanPham.trangthai === "Hết hàng" &&  (
                                <span className="badge bg-secondary mt-3 py-2 px-3">Hết hàng</span>
                              )} */}
                              {(daHethan || sanPham.trangthai === "Hết hàng" || laySoLuongKhaDung(sanPham) <= 0) && (
                                <span className='badge bg-secondary mt-3 py-2 px-3'>Hết hàng</span>
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
            <div className="row justify-content-center mt-5" data-aos="fade-up">
              <div className="col-md-8 col-lg-6">
                <div className="bg-light p-4 rounded shadow-sm">
                  <h5 className="text-center mb-3">Đăng ký nhận thông báo khuyến mãi</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Nhập địa chỉ email"
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        required

                      />
                      <button className="btn btn-primary" type="submit">
                        Đăng ký
                      </button>
                    </div>
                    {thongbao && (
                      <div className={`mt-3 text-center ${thongbao.startsWith('🎉') ? 'text-success' : 'text-danger'}`}>
                        {thongbao}
                      </div>
                    )}
                  </form>
                </div>
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

export default TrangchuNguoidung;