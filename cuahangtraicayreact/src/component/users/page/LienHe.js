import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify
import Footerusers from './../Footerusers';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import CSS cho AOS

const LienHe = () => {
  const [duLieuForm, setDuLieuForm] = useState({
    ten: '',
    email: '',
    sdt: '',
    ghichu: ''
  });

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
    });
  }, []);

  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;

    if (name === 'sdt') {
      if (/^\d*$/.test(value) && value.length <= 11) {
        setDuLieuForm({
          ...duLieuForm,
          [name]: value,
        });
      }
    } else {
      setDuLieuForm({
        ...duLieuForm,
        [name]: value,
      });
    }
  };

  const xuLyGuiForm = (e) => {
    e.preventDefault();

    if (!duLieuForm.ten) {
      toast.error('Họ tên không được bỏ trống.');
      return;
    }
    if (!duLieuForm.email) {
      toast.error('Email không được bỏ trống.');
      return;
    }
    if (!duLieuForm.sdt) {
      toast.error('Số điện thoại không được bỏ trống.');
      return;
    }
    if (duLieuForm.sdt.length < 10) {
      toast.error('Số điện thoại phải có ít nhất 10 số.');
      return;
    }
    if (!duLieuForm.ghichu) {
      toast.error('Nội dung liên hệ không được bỏ trống.');
      return;
    }

    axios.post(`${process.env.REACT_APP_BASEURL}/api/lienhe`, duLieuForm, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        toast.success('Đã gửi liên hệ thành công!', {
          position: 'top-right',
          autoClose: 3000
        });

        setDuLieuForm({
          ten: '',
          email: '',
          sdt: '',
          ghichu: ''
        });
      })
      .catch(error => {
        console.error('Lỗi khi gửi form liên hệ:', error);
        toast.error('Lỗi khi gửi form liên hệ!');
      });
  };

  return (
    <>
      <HeaderUsers />

      {/* Page Header */}
      <div className="container-fluid py-5 page-header text-white">
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-uppercase text-animation">
            <span className="animated-letter">L</span>
            <span className="animated-letter">i</span>
            <span className="animated-letter">ê</span>
            <span className="animated-letter">n</span>
             
            <span className="animated-letter">H</span>
            <span className="animated-letter">ệ</span>
          </h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container py-5">
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-lg-8"> {/* Tăng độ rộng của form */}
            <div className="card border-0 shadow">
              <div className="card-header bg-primary text-white text-center py-3">
                <h3 className="mb-0 text-uppercase">Liên Hệ Với Chúng Tôi</h3>
              </div>
              <div className="card-body p-4">
                <p className="text-center text-muted mb-4">
                  Vui lòng điền thông tin bên dưới để gửi liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất!
                </p>
                <form onSubmit={xuLyGuiForm}>
                  <div className="mb-3">
                    <label htmlFor="formHoTen" className="form-label"><i className="fa fa-user me-2"></i>Họ Tên *</label>
                    <input
                      type="text"
                      className="form-control form-control-lg shadow-sm"
                      id="formHoTen"
                      name="ten"
                      placeholder="Nhập họ tên"
                      value={duLieuForm.ten}
                      onChange={thayDoiDuLieu}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formEmail" className="form-label"><i className="fa fa-envelope me-2"></i>Email *</label>
                    <input
                      type="email"
                      className="form-control form-control-lg shadow-sm"
                      id="formEmail"
                      name="email"
                      placeholder="Nhập email"
                      value={duLieuForm.email}
                      onChange={thayDoiDuLieu}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formSoDienThoai" className="form-label"><i className="fa fa-phone me-2"></i>Số Điện Thoại *</label>
                    <input
                      type="tel"
                      className="form-control form-control-lg shadow-sm"
                      id="formSoDienThoai"
                      name="sdt"
                      placeholder="Nhập số điện thoại"
                      value={duLieuForm.sdt}
                      onChange={thayDoiDuLieu}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formGhiChu" className="form-label"><i className="fa fa-comment-dots me-2"></i>Nội Dung *</label>
                    <textarea
                      className="form-control form-control-lg shadow-sm"
                      id="formGhiChu"
                      name="ghichu"
                      rows="5"
                      placeholder="Nhập nội dung liên hệ"
                      value={duLieuForm.ghichu}
                      onChange={thayDoiDuLieu}
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                      <i className="fa fa-paper-plane me-2"></i>Gửi Liên Hệ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footerusers />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LienHe;