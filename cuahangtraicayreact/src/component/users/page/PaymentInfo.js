// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import HeaderUsers from "../HeaderUsers";
// import Footerusers from "../Footerusers";



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
//       <HeaderUsers /> {/* Component HeaderUser */}
//       <div className="py-5"></div>
//       <div className="container mt-5 py-5 ">
//         <div className="row justify-content-center ">
//           <div className="col-md-8">
//             {paymentStatus && paymentStatus.success ? (
//               <div className="alert alert-success text-center p-4 rounded">
//                 <h1 className="display-6">Thanh toán thành công!</h1>
//                 <p className="mt-3">
//                   Cảm ơn bạn đã mua hàng. Mọi thông tin giao dịch đã được lưu lại.
//                 </p>
//                <p>
//                   <strong>Mã giao Đơn hàng của bạn:</strong> {paymentStatus.data?.orderId || "Không có"}
//                 </p>
//                 <a href="/" className="btn btn-primary mt-3">
//                   Quay về trang chủ
//                 </a>
//               </div>
//             ) : (
//               <div className="alert alert-danger text-center p-4 rounded">
//                 <h1 className="display-6">Thanh toán thất bại</h1>
//                 <p>{paymentStatus.message}</p>
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
//       <Footerusers /> {/* Component FooterUser */}
//     </>
//   );
// };

// export default PaymentInfo;


import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import Footerusers from "../Footerusers";
import "./PaymentInfo.css"; // Custom CSS for Momo effects

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
      <div className="py-5"></div>
      <div className="container mt-5 py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {paymentStatus && paymentStatus.success ? (
              <div className="alert alert-success text-center p-4 rounded success-wallet">
                <div className="wallet-animation mb-4">
                  <div className="wallet momo-success">
                    <div className="wallet-flap"></div>
                    <div className="wallet-body"></div>
                  </div>
                </div>
                <h1 className="display-6">Thanh toán thành công!</h1>
                <p className="mt-3">
                  Cảm ơn bạn đã mua hàng. Mọi thông tin giao dịch đã được lưu lại.
                </p>
                <p>
                  <strong>Mã giao Đơn hàng của bạn:</strong> {paymentStatus.data?.orderId || "Không có"}
                </p>
                <p><strong>Số tiền:</strong> {paymentStatus.data?.amount || "Không rõ"} ₫</p>
                <a href="/" className="btn btn-primary mt-3">
                  Quay về trang chủ
                </a>
              </div>
            ) : (
              <div className="alert alert-danger text-center p-4 rounded failure-wallet">
                <div className="wallet-animation mb-4">
                  <div className="wallet momo-failure">
                    <div className="wallet-flap"></div>
                    <div className="wallet-body"></div>
                  </div>
                </div>
                <h1 className="display-6">Thanh toán thất bại</h1>
                <p>{paymentStatus.message}</p>
                {paymentStatus.errorDetail && (
                  <pre className="text-start text-danger">
                    {JSON.stringify(paymentStatus.errorDetail, null, 2)}
                  </pre>
                )}
                <a href="/" className="btn btn-secondary mt-3">
                  Thử lại
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footerusers />
    </>
  );
};

export default PaymentInfo;
