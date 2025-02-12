// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import HeaderUsers from "../HeaderUsers";
// import Footerusers from "../Footerusers";
// import "./PaymentInfo.css"; // Custom CSS for Momo effects

// const PaymentInfo = () => {
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPaymentResult = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASEURL}/api/payment/Paymomo`,
//           {
//             params: new URLSearchParams(window.location.search),
//           }
//         );
//         setPaymentStatus(response.data);
//       } catch (error) {
//         setPaymentStatus({
//           success: false,
//           message: "Không tìm thấy hóa đơn hoặc lỗi xảy ra.",
//           errorDetail: error.response?.data || error.message,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentResult();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Đang xử lý giao dịch...</span>
//         </div>
//         <p className="mt-3">Đang xử lý giao dịch...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <HeaderUsers />
//       <div className="py-5"></div>
//       <div className="container mt-5 py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             {paymentStatus && paymentStatus.success ? (
//               <div className="alert alert-success text-center p-4 rounded success-wallet">
//                 <div className="wallet-animation mb-4">
//                   <div className="wallet momo-success">
//                     <div className="wallet-flap"></div>
//                     <div className="wallet-body"></div>
//                   </div>
//                 </div>
//                 <h1 className="display-6">Thanh toán thành công!</h1>
//                 <p className="mt-3">
//                   Cảm ơn bạn đã mua hàng. Mọi thông tin giao dịch đã được lưu lại.
//                 </p>
//                 <p><strong>Transaction ID:</strong> {paymentStatus.data?.transactionId || "Không có"}</p>
//                 <p><strong>Mã giao Đơn hàng của bạn:</strong> {paymentStatus.data?.orderId || "Không có"}</p>
//                 <p><strong>Số tiền:</strong> {paymentStatus.data?.amount || "Không rõ"} ₫</p>
//                 <a href="/" className="btn btn-primary mt-3">
//                   Quay về trang chủ
//                 </a>
//               </div>
//             ) : (
//               <div className="alert alert-danger text-center p-4 rounded failure-wallet">
//                 <div className="wallet-animation mb-4">
//                   <div className="wallet momo-failure">
//                     <div className="wallet-flap"></div>
//                     <div className="wallet-body"></div>
//                   </div>
//                 </div>
//                 <h1 className="display-6">Thanh toán thất bại</h1>
//                 <p>{paymentStatus.message}</p>

//                 {/* Hiển thị chi tiết về giao dịch thất bại */}
//                 <p><strong>Transaction ID:</strong> {paymentStatus.data?.transactionId || "Không có"}</p>
//                 {/* <p><strong>Trạng thái:</strong> {paymentStatus.data?.status || "Không rõ"}</p> */}
//                 <p><strong>Thông tin đơn hàng:</strong> {paymentStatus.data?.orderInfo || "Không có"}</p>
//                 <p><strong>Số tiền:</strong> {paymentStatus.data?.amount || "Không rõ"} ₫</p>

//                 {paymentStatus.errorDetail && (
//                   <pre className="text-start text-danger">
//                     {JSON.stringify(paymentStatus.errorDetail, null, 2)}
//                   </pre>
//                 )}

//                 <a href="/" className="btn btn-secondary mt-3">
//                   Thử lại
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footerusers />
//     </>
//   );
// };

// export default PaymentInfo;
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import Footerusers from "../Footerusers";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaMoneyBillWave,
  FaTimesCircle,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa"; // Import more React Icons
import "../PaymentResult.css"; // Use PaymentResult.css

const PaymentInfo = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/api/payment/Paymomo`,
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
      <div className="loading-container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary spinner-custom" role="status">
          <span className="visually-hidden">Đang xử lý giao dịch...</span>
        </div>
        <p className="mt-3 loading-text">Đang xử lý giao dịch...</p>
      </div>
    );
  }

  return (
    <>
      <HeaderUsers />
      {paymentStatus && paymentStatus.success ? (
        <div className="success-page d-flex flex-column align-items-center justify-content-center vh-100">
          <div className="success-animation mb-4">
            <div className="checkmark">
              <FaCheckCircle className="text-success checkmark-icon" />
            </div>
          </div>
          <h1 className="success-title fw-bold mt-3">
            <FaMoneyBillWave className="me-2" /> Thanh toán thành công!
          </h1>
          <p className="success-message">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
          </p>
          <div className="payment-details">
            <p>
              <FaShoppingCart className="me-1" />
              <strong>Mã đơn hàng:</strong> {paymentStatus?.data?.orderId}
            </p>
            <p>
              <FaMoneyBillWave className="me-1" />
              <strong>Số tiền:</strong>{" "}
              {paymentStatus?.data?.amount &&
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  Number(paymentStatus.data.amount.replace(/\./g, ""))
                )}
            </p>
            <p>
              <FaInfoCircle className="me-1" />
              <strong>Transaction ID:</strong>{" "}
              {paymentStatus?.data?.transactionId || "Không có"}
            </p>
            <p>
              <FaInfoCircle className="me-1" />
              <strong>Thông tin đơn hàng:</strong>{" "}
              {paymentStatus?.data?.orderInfo || "Không có"}
            </p>
          </div>

          <button
            className="back-to-home-button"
            onClick={() => (window.location.href = "/")}
          >
            <FaArrowLeft className="me-2" /> Quay lại trang chủ
          </button>
        </div>
      ) : (
        <div className="failure-page d-flex flex-column align-items-center justify-content-center vh-100">
          <div className="failure-animation mb-4">
            <div className="cross">
              <FaTimesCircle className="text-danger cross-icon" />
            </div>
          </div>
          <h1 className="failure-title fw-bold mt-3">
            <FaExclamationCircle className="me-2" /> Thanh toán thất bại
          </h1>
          <p className="failure-message">
            {paymentStatus?.message ||
              "Đã xảy ra lỗi trong quá trình xử lý thanh toán."}
          </p>
          {paymentStatus?.data && (
            <div className="payment-details">
              <p>
                <FaInfoCircle className="me-1" />
                <strong>Transaction ID:</strong>{" "}
                {paymentStatus?.data?.transactionId || "Không có"}
              </p>
              <p>
                <FaInfoCircle className="me-1" />
                <strong>Thông tin đơn hàng:</strong>{" "}
                {paymentStatus?.data?.orderInfo || "Không có"}
              </p>
              <p>
                <FaMoneyBillWave className="me-1" />
                <strong>Số tiền:</strong> {paymentStatus?.data?.amount || "Không có"}
              </p>
            </div>
          )}
          {paymentStatus?.errorDetail && (
            <pre className="error-detail">
              {JSON.stringify(paymentStatus.errorDetail, null, 2)}
            </pre>
          )}
          <button
            className="retry-button"
            onClick={() => (window.location.href = "/")}
          >
            <FaArrowLeft className="me-2" /> Thử lại
          </button>
        </div>
      )}
      <Footerusers />
    </>
  );
};

export default PaymentInfo;