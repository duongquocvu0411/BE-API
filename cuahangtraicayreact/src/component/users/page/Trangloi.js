import React from "react";
import Footerusers from "../Footerusers";
import { Link } from "react-router-dom";
import HeaderUsers from "../HeaderUsers";

const Trangloi = () => {
  return (
    <>
      <HeaderUsers />
      <div>
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5 bg-dark text-white text-center">
          <div className="text-center">
            <h1 className="display-4 fw-bold text-animation">
              <span className="animated-letter">T</span>
              <span className="animated-letter">r</span>
              <span className="animated-letter">a</span>
              <span className="animated-letter">n</span>
              <span className="animated-letter">g</span>
              &nbsp;
              <span className="animated-letter">K</span>
              <span className="animated-letter">h</span>
              <span className="animated-letter">ô</span>
              <span className="animated-letter">n</span>
              <span className="animated-letter">g</span>
              &nbsp;
              <span className="animated-letter">T</span>
              <span className="animated-letter">ồ</span>
              <span className="animated-letter">n</span>
              &nbsp;
              <span className="animated-letter">T</span>
              <span className="animated-letter">ạ</span>
              <span className="animated-letter">i</span>

            </h1>

          </div>

        </div>
        {/* Single Page Header End */}

        {/* 404 Start */}
        <div className="container py-5">
          <section className="page_404 text-center">
            <div className="row justify-content-center">
              <div className="col-sm-10 col-md-8">
                {/* Vùng minh họa lỗi */}
                <div className="four_zero_four_bg mb-4">
                  <h1 className="text-center display-1 fw-bold  text-animation  ">
                    <span className="animated-letter ">4</span>
                    <span className="animated-letter  ">0</span>
                    <span className="animated-letter ">4</span>
                  </h1>
                </div>
                <div className="contant_box_404">
                  {/* Thông báo chính */}
                  <h3 className="h2 text-uppercase mb-3">Có vẻ như bạn bị lạc</h3>
                  <p className="text-muted mb-4">
                    Trang bạn đang tìm kiếm không có sẵn hoặc đã bị xóa!
                  </p>
                  {/* Nút điều hướng */}
                  <Link to="/" className="btn btn-success btn-lg">
                    Trở về trang chủ
                  </Link>

                </div>
              </div>
            </div>
          </section>
        </div>
        {/* 404 End */}
      </div>
      <Footerusers />
    </>

  );
};

export default Trangloi;
