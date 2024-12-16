import Aos from "aos";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footerusers = () => {
  const [chiTietDiaChi, setChiTietDiaChi] = useState({ diachi: '', email: '', sdt: '' });
  const [tenFooter, setTenFooter] = useState({ tieude: "", phude: "", footerIMG: [] });
  const [menuFooter, setMenuFooter] = useState([]);
  const [footerActive, setFooterActive] = useState([]);
  useEffect(() => {
    const fetchCurrentDiaChi = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/DiaChiChiTiet/getDiaChiHien`);
        if (response.data) {
          setChiTietDiaChi({
            diachi: response.data.diachi, // sử dụng 'diachi' từ API
            email: response.data.email,
            sdt: response.data.sdt // sdt nếu được trả về từ API
          });
        } else {
          console.log('Không có địa chỉ đang sử dụng');
        }
      } catch (err) {
        console.log('Lỗi khi lấy thông tin từ API:', err);
      }
    };
    const fetchTenFooter = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/TenFooter`);
        if (response.data && response.data.length > 0) {
          setTenFooter({
            tieude: response.data[0].tieude,
            phude: response.data[0].phude,
            footerIMG: response.data[0].footerIMG,
          });
        } else {
          console.log("Không có dữ liệu TenFooter");
        }
      } catch (err) {
        console.log("Lỗi khi lấy thông tin từ API TenFooter:", err);
      }
    };
    const fetchMenuFooter = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/MenuFooter`);
        if (response.data && response.data.length > 0) {
          // Sắp xếp theo thutuhienthi
          const sortedMenu = response.data.sort((a, b) => a.thutuhienthi - b.thutuhienthi);
          setMenuFooter(sortedMenu);
        } else {
          console.log("Không có dữ liệu MenuFooter");
        }
      } catch (err) {
        console.log("Lỗi khi lấy thông tin từ API MenuFooter:", err);
      }
    };
    const fetchFooterActive = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Footer/active`);
        if (response.data && response.data.length > 0) {
          setFooterActive(response.data); // Lưu toàn bộ dữ liệu vào state
        } else {
          console.log("Không có dữ liệu Footer active");
        }
      } catch (err) {
        console.log("Lỗi khi lấy thông tin Footer active:", err);
      }
    };
      Aos.init({
          duration: 1000, // Thời gian hiệu ứng
          easing: 'ease-in-out', // Hiệu ứng easing
          once: true, // Hiệu ứng chỉ xuất hiện 1 lần
        });
     

    fetchFooterActive();
    fetchTenFooter();
    fetchCurrentDiaChi();
    fetchMenuFooter();
  }, []);

  return (
    <>
      {/* Footer Starts */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5" data-aos="fade-up">
        <div className="container py-5 " >
          <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
            <div className="row g-4">
              <div className="col-lg-3">
                <span className="title">
                  <p className="text-primary mb-0 h1">{tenFooter.tieude || "Trái cây"}</p>
                  <p className="text-secondary mb-0 h4 glowing-subtitle">{tenFooter.phude || "Sản phẩm tươi"}</p>
                </span>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  {tenFooter.footerIMG.map((img, index) => (
                    <Link
                      key={index}
                      className="btn btn-outline-secondary me-2 btn-md-square rounded-circle d-flex align-items-center justify-content-center"
                      to="#"
                      onClick={() => window.open(img.link, "_blank")}
                      style={{
                        width: "50px",
                        height: "50px",
                        overflow: "hidden",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <img
                        src={`${process.env.REACT_APP_BASEURL}${img.imagePath}`}
                        alt={`Social Icon ${index}`}
                        style={{
                          width: "200px",
                          height: "55px",
                          objectFit: "cover",
                          borderRadius: "100%",
                        }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">

            {menuFooter.map((menu, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="footer-item">
                  <h4 className="text-light mb-3 glowing-text-footer">{menu.tieu_de}</h4>
                  <div dangerouslySetInnerHTML={{ __html: menu.noi_dung }} />

                </div>
              </div>
            ))}

            {/* <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-3 glowing-text-footer">Liên hệ</h4>
              <p>
                Địa chỉ:
                <Link
                  to="#"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chiTietDiaChi.diachi)}`, '_blank')}
                  className="text-decoration-none text-white-50"
                >
                  {chiTietDiaChi.diachi}
                </Link>
              </p>
              <p>Email:
                <Link to={`mailto:${chiTietDiaChi.email}`} className="text-decoration-none text-white-50">{chiTietDiaChi.email}</Link>
              </p>
              <p>Điện thoại:
                <Link to={`tel:${chiTietDiaChi.sdt}`} className="text-decoration-none text-white-50">{chiTietDiaChi.sdt}</Link>
              </p>
              <p>Phương thức thanh toán</p>
              <img src={`${process.env.PUBLIC_URL}/img/payment.png`} className="img-fluid" alt="Payment methods" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer End */}
      {/* Copyright Start */}
      <div className="container-fluid bg-dark text-light py-4" style={{ background: "linear-gradient(90deg, rgba(33,37,41,1) 0%, rgba(52,58,64,1) 100%)" }}>
  <div className="container d-flex justify-content-center align-items-center text-center">
    <div className="row w-100">
      <div className="col-12">
        {footerActive.map((footer, index) => (
          <div key={index} style={{ fontSize: "1rem", fontWeight: "400" }}>
            <div dangerouslySetInnerHTML={{ __html: footer.noiDungFooter }} />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



      {/* Copyright End */}
    </>
  );
}

export default Footerusers;
