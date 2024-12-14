import React, { useEffect, useRef, useState } from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  }, []);

  // Hàm để xử lý khi phần tử vào màn hình (hiển thị bài giới thiệu tiếp theo)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Khi bài viết vào màn hình, thêm class hiển thị
          entry.target.classList.add("fade-in");
        }
      });
    }, {
      threshold: 0.1 // Bài viết sẽ xuất hiện khi ít nhất 10% bài viết vào màn hình
    });

    // Quan sát từng bài giới thiệu
    articlesRef.current.forEach(article => {
      observer.observe(article);
    });

    return () => {
      // Clean up observer khi component unmount
      observer.disconnect();
    };
  }, [gioithieu]);

  return (
    <>
      <Tieude />
      <div className="container-fluid py-5 page-header text-white">
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-animation">
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

      {/* Giới thiệu Section Start */}
      <div className="container-fluid py-5 bg-light">
        <div className="container py-5">
          {gioithieu.map((gioithieuItem, index) => (
            <div
              key={gioithieuItem.id}
              className="article mb-5" // Tạo khoảng cách giữa các bài
              ref={el => articlesRef.current[index] = el}
            >
              <h1 className="text-center text-primary fw-bold mb-4">{gioithieuItem.tieu_de}</h1>
              <p className="lead text-center text-muted mb-4">{gioithieuItem.phu_de}</p>

              {/* Hiển thị hình ảnh */}
              {gioithieuItem.gioithieuImgs && gioithieuItem.gioithieuImgs.length > 0 ? (
                <div id={`carouselExample${gioithieuItem.id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {gioithieuItem.gioithieuImgs.map((image, imgIndex) => (
                      <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={image.id}>
                        <img
                          src={`${process.env.REACT_APP_BASEURL}${image.urL_image}`}
                          className="d-block w-50 h-auto object-fit-cover card-img-top rounded-lg shadow-sm"
                          alt={gioithieuItem.tieu_de || "Hình ảnh giới thiệu"}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExample${gioithieuItem.id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target={`#carouselExample${gioithieuItem.id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <> </>
              )}

              {/* Nội dung và ngày tạo */}
              <div className="card-body text-center">
                <p className="card-text text-muted" dangerouslySetInnerHTML={{ __html: gioithieuItem.noi_dung }}></p>
                <p className="text-muted">
                  Ngày tạo: {new Date(gioithieuItem.created_at).toLocaleString("vi-VN", {
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
