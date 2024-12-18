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
    
    });


    fetchFooterActive();
    fetchTenFooter();
    fetchCurrentDiaChi();
    fetchMenuFooter();
  }, []);

  return (
    <>
{/* Footer Starts */}
<div
  className="container-fluid footer bg-dark text-white-50 pt-5 mt-5"
  data-aos="fade-up"
  style={{
    background: "linear-gradient(135deg, #222, #2c2c2c)",
    boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.5)",
  }}
>
  <div className="container py-5">
    {/* Header Section */}
    <div className="row mb-4 pb-4 border-bottom border-secondary">
      <div className="col-lg-6 text-center text-lg-start">
        <h1 className="text-primary mb-0" style={{ fontSize: "2.5rem", fontWeight: "700" }}>
          {tenFooter.tieude || "Trái cây"}
        </h1>
        <p className="text-secondary glowing-subtitle mb-0" style={{ fontSize: "1.2rem" }}>
          {tenFooter.phude || "Sản phẩm tươi"}
        </p>
      </div>
      {/* Social Media Links */}
      <div className="col-lg-6 text-center text-lg-end mt-3 mt-lg-0">
        {tenFooter.footerIMG.map((img, index) => (
          <Link
            key={index}
            to="#"
            onClick={() => window.open(img.link, "_blank")}
            className="mx-2"
            style={{
              display: "inline-block",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={`${process.env.REACT_APP_BASEURL}${img.imagePath}`}
              alt={`Social Icon ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Link>
        ))}
      </div>
    </div>

    {/* Footer Content */}
    <div className="row g-4">
      {menuFooter.map((menu, index) => (
        <div key={index} className="col-lg-3 col-md-6">
          <div className="footer-item text-center text-md-start">
            <h4 className="text-light mb-3 glowing-text-footer" style={{ fontWeight: "600" }}>
              {menu.tieu_de}
            </h4>
            <div
              className="text-white-50"
              style={{
                lineHeight: "1.8",
                fontSize: "0.95rem",
              }}
              dangerouslySetInnerHTML={{ __html: menu.noi_dung }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Copyright Section */}
<div
  className="container-fluid text-light py-3"
  style={{
    background: "linear-gradient(to right, #333, #444)",
    textAlign: "center",
    fontSize: "1rem",
  }}
  
>
  {footerActive.map((footer, index) => (
    <div key={index}>
      <div dangerouslySetInnerHTML={{ __html: footer.noiDungFooter }} />
    </div>
  ))}
</div>

    </>
  );
}

export default Footerusers;
