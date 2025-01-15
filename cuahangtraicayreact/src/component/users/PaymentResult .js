import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderUsers from "./HeaderUsers";
import Footerusers from "./Footerusers";
import "./PaymentResult.css";

const PaymentResult = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/api/payment/PaymentResponse`,
          {
            params: new URLSearchParams(window.location.search),
          }
        );
        setPaymentStatus(response.data);
      } catch (error) {
        setPaymentStatus({
          success: false,
          message: "Không tìm thấy hóa đơn hoặc lỗi xảy ra.",
          errorDetail: error.response?.data || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentResult();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang xử lý giao dịch...</span>
        </div>
        <p className="mt-3">Đang xử lý giao dịch...</p>
      </div>
    );
  }

  return (
    <>
      <HeaderUsers />
      {paymentStatus && paymentStatus.success ? (
        <div className="success-page d-flex flex-column align-items-center justify-content-center vh-100">
          <div className="wallet-animation mb-4">
            <div className="wallet">
              <div className="wallet-flap"></div>
              <div className="wallet-body"></div>
            </div>
          </div>
          <h1 className="text-success fw-bold">Thanh toán thành công!</h1>
          <p className="text-muted">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
          <p>
            <strong>Mã đơn hàng:</strong> {paymentStatus?.data?.orderId}
          </p>
          <p>
            <strong>Số tiền:</strong>{" "}
            {paymentStatus?.data?.amount &&
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(Number(paymentStatus.data.amount.replace(/\./g, "")))}
          </p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => (window.location.href = "/")}
          >
            Quay lại trang chủ
          </button>
        </div>
      ) : (
        <div className="failure-page d-flex flex-column align-items-center justify-content-center vh-100">
          <div className="wallet-animation mb-4">
            <div className="wallet wallet-failure">
              <div className="wallet-flap"></div>
              <div className="wallet-body"></div>
            </div>
          </div>
          <h1 className="text-danger fw-bold">Thanh toán thất bại</h1>
          <p className="text-muted">
            {paymentStatus?.message ||
              "Đã xảy ra lỗi trong quá trình xử lý thanh toán."}
          </p>
          {paymentStatus?.errorDetail && (
            <pre className="text-danger">
              {JSON.stringify(paymentStatus.errorDetail, null, 2)}
            </pre>
          )}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => (window.location.href = "/")}
          >
            Thử lại
          </button>
        </div>
      )}
      <Footerusers />
    </>
  );
};

export default PaymentResult;
