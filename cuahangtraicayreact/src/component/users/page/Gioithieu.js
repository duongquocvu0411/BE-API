import React, { useEffect, useRef, useState } from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";
import Marquee from "react-fast-marquee";

const Gioithieu = () => {
  const [gioithieu, setGioithieu] = useState([]);
  const [expandedArticles, setExpandedArticles] = useState({}); // State để theo dõi bài viết nào đã được mở rộng

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/gioithieu/active`)
      .then((response) => {
        setGioithieu(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
        toast.error("có lỗi khi lấy dữ liệu giới thiệu ", {
          position: "top-right",
          autoClose: 3000,
        });
      });

    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  const handleXemThem = (id) => {
    setExpandedArticles((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle trạng thái mở rộng của bài viết
    }));
  };

  return (
    <>
      <Tieude />
      {/* Phần Tiêu đề với hiệu ứng đẹp mắt */}
      <div className="container-fluid py-5 page-header text-white bg-gradient-primary">
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-uppercase text-animation">
            <span className="animated-letter">G</span>
            <span className="animated-letter">i</span>
            <span className="animated-letter">ớ</span>
            <span className="animated-letter">i</span>
             
            <span className="animated-letter">T</span>
            <span className="animated-letter">h</span>
            <span className="animated-letter">i</span>
            <span className="animated-letter">ệ</span>
            <span className="animated-letter">u</span>
          </h1>
        </div>
      </div>

      {/* Phần giới thiệu */}
      <div className="container py-5">
        {gioithieu.map((gioithieuItem, index) => (
          <div
            key={gioithieuItem.id}
            className={`row align-items-center mb-5 ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            {/* Hình ảnh cuộn ngang */}
            {gioithieuItem.gioithieuImgs &&
              gioithieuItem.gioithieuImgs.length > 0 && (
                <div className="col-md-6 mb-4">
                  <Marquee
                    gradient={false}
                    speed={60}
                    direction="left"
                    pauseOnHover
                    className="shadow-sm rounded"
                  >
                    {gioithieuItem.gioithieuImgs.map((image) => (
                      <div
                        key={image.id}
                        style={{
                          display: "inline-block",
                          margin: "0 15px",
                          width: "100%",
                          maxWidth: "300px",
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_BASEURL}${image.urL_image}`}
                          alt="Hình ảnh giới thiệu"
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
              )}

            {/* Nội dung */}
            <div className="col-md-6">
              <h2 className="text-primary fw-bold mb-3">
                {gioithieuItem.tieu_de}
              </h2>
              <p className="lead text-muted mb-4">{gioithieuItem.phu_de}</p>
              <div
                className="text-muted"
                dangerouslySetInnerHTML={{
                  __html: expandedArticles[gioithieuItem.id]
                    ? gioithieuItem.noi_dung
                    : gioithieuItem.noi_dung.substring(0, 250) + "...",
                }}
              />
              <p className="text-muted mt-3">
                Ngày tạo:{" "}
                {new Date(gioithieuItem.created_at).toLocaleString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {/* Thêm nút xem thêm nếu nội dung dài hơn 250 ký tự */}
              {gioithieuItem.noi_dung.length > 250 && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleXemThem(gioithieuItem.id)}
                >
                  {expandedArticles[gioithieuItem.id] ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
      <Footerusers />
    </>
  );
};

export default Gioithieu; 