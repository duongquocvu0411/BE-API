import React, { useEffect, useRef, useState } from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-chatbotify";
import Aos from "aos";
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
            once: true, // Hiệu ứng chỉ xuất hiện 1 lần
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
  // const [expandedItems, setExpandedItems] = useState([]); // Lưu trữ danh sách bài đã được mở rộng

  // const handleReadMore = (id) => {
  //   // Kiểm tra xem bài viết đã được mở rộng chưa
  //   if (expandedItems.includes(id)) {
  //     // Nếu đã mở rộng, thu gọn lại (xóa khỏi danh sách mở rộng)
  //     setExpandedItems(expandedItems.filter((itemId) => itemId !== id));
  //   } else {
  //     // Nếu chưa mở rộng, thêm vào danh sách mở rộng
  //     setExpandedItems([...expandedItems, id]);
  //   }
  // };
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
          className="row align-items-center mb-5 wow fadeInUp"
          data-wow-delay={`${index * 0.2}s`}
        >
          {/* Hình ảnh carousel */}
          {gioithieuItem.gioithieuImgs && gioithieuItem.gioithieuImgs.length > 0 && (
            <div className="col-lg-6 mb-4">
              <div id={`carouselExample${gioithieuItem.id}`} className="carousel slide shadow rounded overflow-hidden" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {gioithieuItem.gioithieuImgs.map((image, imgIndex) => (
                    <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={image.id}>
                      <img
                        src={`${process.env.REACT_APP_BASEURL}${image.urL_image}`}
                        className="d-block w-100 h-auto object-fit-cover"
                        alt={gioithieuItem.tieu_de || "Hình ảnh giới thiệu"}
                      />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExample${gioithieuItem.id}`} data-bs-slide="prev">
                  <span className="carousel-control-prev-icon bg-primary p-3 rounded-circle" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExample${gioithieuItem.id}`} data-bs-slide="next">
                  <span className="carousel-control-next-icon bg-primary p-3 rounded-circle" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          )}

          {/* Nội dung */}
          <div className="col-lg-6">
            <h2 className="text-primary fw-bold mb-3">{gioithieuItem.tieu_de}</h2>
            <p className="lead text-muted">{gioithieuItem.phu_de}</p>
            <p className="text-muted" dangerouslySetInnerHTML={{ __html: gioithieuItem.noi_dung.substring(0, 300) }}></p>
            {/* {gioithieuItem.noi_dung.length > 300 && (
              <Button variant="link" className="text-decoration-none" onClick={() => handleReadMore(gioithieuItem.id)}>
                Xem thêm <i className="bi bi-arrow-right"></i>
              </Button>
            )} */}
            <p className="text-muted mt-3">
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
