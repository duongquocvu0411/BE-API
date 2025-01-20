import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Đảm bảo import đúng jwt-decode
import { useCookies } from "react-cookie";
import HeaderAdmin from "../HeaderAdmin";
import Footer from "../Footer";

const ProfileAdmin = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    roles: [],
  });

  // Lấy cookies
  const [cookies] = useCookies(["adminToken", "loginhoten"]);

  useEffect(() => {
    // Lấy token từ cookies
    const token = cookies.adminToken;

    if (token) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decodedToken = jwtDecode(token);

        // Cập nhật thông tin người dùng từ token
        setUserData({
          fullName: decodedToken.FullName || "Không rõ",
          email:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ] || "Không rõ", // Lấy email từ claim emailaddress
          roles:
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || [],
        });
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [cookies]);

  return (
    <>
      <HeaderAdmin />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg border-0">
              <Card.Header className="text-center bg-primary text-white">
                <h2>Thông tin cá nhân</h2>
              </Card.Header>
              <Card.Body className="text-center p-5">
                {/* Avatar */}
                <div className="mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${userData.fullName}&background=random&size=200&bold=true&rounded=true`} // Avatar cải tiến
                    alt={userData.fullName}
                    className="img-fluid rounded-circle border border-primary"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>

                {/* Hiển thị thông tin */}
                <h4 className="mb-3 fw-bold">{userData.fullName}</h4>
                <p className="text-muted mb-2">
                  <i className="fas fa-envelope me-2"></i>
                  {userData.email}
                </p>
                <p className="mb-4">
                  <i className="fas fa-user-tag me-2"></i>
                  Vai trò:{" "}
                  <span className="fw-bold text-primary">
                    {userData.roles.length > 0
                      ? userData.roles.join(", ")
                      : "Không có vai trò"}
                  </span>
                </p>
              </Card.Body>
              <Card.Footer className="text-center bg-light">
                {/* Nút trở về */}
                <Link
                  className="btn btn-outline-primary px-4 py-2"
                  to={"/admin/Trangchu"}
                >
                  <i className="fas fa-arrow-left me-2"></i>Trở về
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProfileAdmin;
