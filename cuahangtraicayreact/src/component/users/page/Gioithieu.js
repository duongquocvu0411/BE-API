import React, { useEffect, useRef, useState } from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Aos from "aos";
import { useNavigate } from "react-router-dom";
const Gioithieu = () => {


  const [gioithieu, setGioithieu] = useState([]);
  const articlesRef = useRef([]);

  // Lấy dữ liệu bài giới thiệu
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/gioithieu/active`)
      .then((response) => {
        setGioithieu(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
        toast.error("có lỗi khi lấy dữ liệu giới thiệu ", {
          position: 'top-right',
          autoClose: 3000
        })
      });

    Aos.init({
      duration: 1000, // Thời gian hiệu ứng
      easing: 'ease-in-out', // Hiệu ứng easing
     
    });
  }, []);



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
            &nbsp;
            <span className="animated-letter">T</span>
            <span className="animated-letter">h</span>
            <span className="animated-letter">i</span>
            <span className="animated-letter">ệ</span>
            <span className="animated-letter">u</span>
          </h1>

        </div>
      </div>

      {/* Phần giới thiệu */}
      <div className="container-fluid py-5 bg-light">
        <div className="container py-5" data-aos="fade-up">
         
          {gioithieu.map((gioithieuItem, index) => (
            <div
              key={gioithieuItem.id}
              className={`row align-items-center mb-5 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              {/* Hình ảnh carousel */}
              {gioithieuItem.gioithieuImgs && gioithieuItem.gioithieuImgs.length > 0 && (
                <div className="col-lg-6 mb-4">
                  <div
                    id={`carouselExample${gioithieuItem.id}`}
                    className="carousel slide shadow-lg rounded overflow-hidden"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {gioithieuItem.gioithieuImgs.map((image, imgIndex) => (
                        <div
                          className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                          key={image.id}
                        >
                          <img
                            src={`${process.env.REACT_APP_BASEURL}${image.urL_image}`}
                            className="d-block w-100 rounded"
                            alt={gioithieuItem.tieu_de || "Hình ảnh giới thiệu"}
                            style={{
                              height: "350px",
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
                      data-bs-target={`#carouselExample${gioithieuItem.id}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon bg-primary p-3 rounded-circle"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselExample${gioithieuItem.id}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon bg-primary p-3 rounded-circle"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Nội dung */}
              <div className="col-lg-6">
                <h2 className="text-primary fw-bold mb-3">{gioithieuItem.tieu_de}</h2>
                <p className="lead text-muted mb-4">{gioithieuItem.phu_de}</p>
                <p
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html: gioithieuItem.noi_dung.substring(0, 250),
                  }}
                ></p>

                <p className="text-muted mt-3">
                  Ngày tạo:{" "}
                  {new Date(gioithieuItem.created_at).toLocaleString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <ToastContainer />
      <Footerusers />
    </>

  );
};

export default Gioithieu;
