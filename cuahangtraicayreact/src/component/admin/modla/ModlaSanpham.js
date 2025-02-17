import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import MoadlChitietsanpham from "./ModlaSanphamchitiet";
import ModlaSanphamsale from './ModlaSanphamsale';
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const ModlaSanpham = ({
  show,
  handleClose,
  isEdit,
  product,
  fetchSanpham,
}) => {
  const [tieude, setTieude] = useState("");
  const [giatien, setGiatien] = useState("");
  const [dvt, setDvt] = useState("");
  const [hinhanh, setHinhanh] = useState(null); // Hình ảnh chính
  const [xemtruochinhanh, setXemtruocHinhAnh] = useState(""); // Xem trước ảnh chính
  const [danhmucsanphamID, setDanhmucsanphamID] = useState("");
  const [danhmuc, setDanhmuc] = useState([]);
  const [trangthai, setTrangthai] = useState("");
  const [showSaleModal, setShowSaleModal] = useState(false);
  // Quản lý ảnh phụ
  const [Fileanhphu, setFileanhphu] = useState([{}]);
  const [hinhanhPhu, setHinhanhPhu] = useState([]); // Hình ảnh phụ mới chọn
  const [existingHinhanhPhu, setExistingHinhanhPhu] = useState([]); // Ảnh phụ hiện có từ API
  const [saleData, setSaleData] = useState(null);
  const [donvitinh, setDonvitinh] = useState([]);
  // Modal chi tiết sản phẩm
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [chiTiet, setChiTiet] = useState({
    moTaChung: "",
    baiViet: "",
  });
  const [soLuong, setSoLuong] = useState("");
  const [soLuongTamGiu, setSoLuongTamGiu] = useState(""); // State cho số lượng tạm giữ
  const [cookies] = useCookies(['adminToken', 'loginhoten'])

  const getImageUrl = (path) => {
    const BASE_URL = process.env.REACT_APP_BASEURL;
    return path ? `${BASE_URL}/${path}` : "";
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`)
      .then((response) => {
        setDanhmuc(response.data.data);
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy dữ liệu từ API ", error);
      });

    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/donvitinh`)
      .then((response) => {
        setDonvitinh(response.data.data);
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy dữ liệu từ API ", error);
      });

    if (isEdit && product) {
      setTieude(product.tieude || "");
      setTrangthai(product.trangthai || "");
      setGiatien(product.giatien || "");
      setDvt(product.don_vi_tinh || "");
      setDanhmucsanphamID(product.danhmucsanpham_id || "");
      setSoLuong(product.soluong || "");
      setSoLuongTamGiu(product.soluongtamgiu || ""); // Khởi tạo giá trị số lượng tạm giữ

      setSaleData(
        product.sanphamSales && product.sanphamSales.length > 0
          ? {
            ...product.sanphamSales[0],
            thoigianbatdau: product.sanphamSales[0].thoigianbatdau
              ? product.sanphamSales[0].thoigianbatdau.substring(0, 16)
              : "",
            thoigianketthuc: product.sanphamSales[0].thoigianketthuc
              ? product.sanphamSales[0].thoigianketthuc.substring(0, 16)
              : "",
          }
          : null
      );

      // Hiển thị ảnh chính
      if (product.hinhanh) {
        setXemtruocHinhAnh(getImageUrl(product.hinhanh));
      } else {
        setXemtruocHinhAnh("");
      }

      // Hiển thị ảnh phụ
      if (product.images) {
        const formattedImages = product.images.map((img) => ({
          ...img,
          hinhanh: getImageUrl(img.hinhanh),
        }));
        setExistingHinhanhPhu(formattedImages);
        setFileanhphu(formattedImages.map(() => ({})));
      }

      if (product.chiTiet) {
        setChiTiet({
          moTaChung: product.chiTiet.mo_ta_chung || "",
          baiViet: product.chiTiet.bai_viet || "",
        });
      } else {
        resetChiTiet();
      }
    } else {
      // Khi thêm mới sản phẩm
      resetForm();
      resetChiTiet();
      setHinhanhPhu([]);
      setExistingHinhanhPhu([]);
      setFileanhphu([{}]);
    }
  }, [isEdit, product]);


  const handleSaveChiTiet = () => {
    setShowChiTietModal(false);
  };

  const handleThaydoihinhanh = (e) => {
    const file = e.target.files[0];
    setHinhanh(file);
    if (file) {
      setXemtruocHinhAnh(URL.createObjectURL(file));
    }
  };

  // Xử lý thay đổi ảnh phụ
  const handleDoianhphu = (index, e) => {
    const file = e.target.files[0];
    const updatedHinhanhs = [...hinhanhPhu];
    updatedHinhanhs[index] = file;

    setHinhanhPhu(updatedHinhanhs);
  };

  // Thêm một input mới cho ảnh phụ
  const handleThemanhphu = () => {
    setFileanhphu((Fileanh) => [...Fileanh, {}]);
  };

  const handleXoaanhphu = (index) => {
    const capnhatFile = Fileanhphu.filter((_, i) => i !== index);
    setFileanhphu(capnhatFile);

    const updatedHinhanhs = hinhanhPhu.filter((_, i) => i !== index);
    setHinhanhPhu(updatedHinhanhs);
  };

  // thêm sản phẩm
  const handleSubmit = async () => {
    let hasError = false;

    // Validation cho các trường bắt buộc
    if (!tieude) {
      toast.error("Vui lòng nhập tiêu đề sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!giatien) {
      toast.error("Vui lòng nhập giá sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!dvt) {
      toast.error("Vui lòng chọn đơn vị tính.", { autoClose: 3000 });
      hasError = true;
    }

    if (!danhmucsanphamID) {
      toast.error("Vui lòng chọn danh mục sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!isEdit && !hinhanh) {
      toast.error("Vui lòng chọn hình ảnh chính.", { autoClose: 3000 });
      hasError = true;
    }

    // Validation cho số lượng tạm giữ khi cập nhật
    if (isEdit) {
      if (soLuongTamGiu !== "" && (parseInt(soLuongTamGiu, 10) < 0 || parseInt(soLuongTamGiu, 10) > parseInt(soLuong, 10))) {
        toast.error("Số lượng tạm giữ phải lớn hơn hoặc bằng 0 và không lớn hơn số lượng sản phẩm.", { autoClose: 3000 });
        hasError = true;
      }
    }

    if (hasError) return;

    // Tạo FormData và thêm tất cả các trường
    const formData = new FormData();
    formData.append("Tieude", tieude);
    formData.append("Giatien", giatien);
    formData.append("Trangthai", trangthai);
    formData.append("DonViTinh", dvt);
    formData.append("So_luong", soLuong);
    formData.append("DanhmucsanphamId", danhmucsanphamID);

    // Thêm số lượng tạm giữ nếu có (chỉ cho PUT)
    if (isEdit && soLuongTamGiu !== "") {
      formData.append("so_luong_tam_giu", soLuongTamGiu);
    }


    // Thêm hình ảnh chính nếu có hình ảnh mới
    if (hinhanh) {
      formData.append("Hinhanh", hinhanh);
    }

    // Thêm thông tin khuyến mãi nếu có
    if (saleData) {
      formData.append("Sale.Giasale", saleData.giasale || "");
      formData.append("Sale.Thoigianbatdau", saleData.thoigianbatdau || "");
      formData.append("Sale.Thoigianketthuc", saleData.thoigianketthuc || "");
      formData.append("Sale.Trangthai", saleData.trangthai || "");
    }

    // Thêm danh sách ID của ảnh phụ hiện có
    existingHinhanhPhu.forEach((img) => {
      formData.append("ExistingImageIds[]", img.id); // Thêm danh sách ID ảnh phụ hiện có
    });

    // Thêm ảnh phụ mới nếu có
    hinhanhPhu.forEach((file) => {
      if (file) formData.append("Images", file);
    });

    // Thêm chi tiết sản phẩm nếu có bất kỳ trường nào được nhập
    if (Object.keys(chiTiet).some((key) => chiTiet[key])) {
      formData.append("ChiTiet.MoTaChung", chiTiet.moTaChung || "");
      formData.append("ChiTiet.BaiViet", chiTiet.baiViet || "");
    }

    try {
      // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
      const token = cookies.adminToken; // Lấy token từ cookie
      const decodedToken = jwtDecode(token); // Giải mã token
      const loggedInUser = decodedToken.hoten; // Lấy hoten từ token
      const method = isEdit ? "put" : "post";
      const url = isEdit
        ? `${process.env.REACT_APP_BASEURL}/api/sanpham/${product.id}`
        : `${process.env.REACT_APP_BASEURL}/api/sanpham`;


      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      toast.success(`Sản phẩm đã được ${isEdit ? "cập nhật" : "thêm"} thành công!`, {
        autoClose: 3000,
      });
      fetchSanpham();
      handleClose();
      resetForm();
      resetChiTiet();
    } catch (error) {
      console.error("Error while submitting sale data:", error);
      if (error.response) {
        // Hiển thị thông báo lỗi từ backend
        if (error.response.data && error.response.data.message) {
          toast.error(error.response.data.message, { autoClose: 3000 });
        } else {
          toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", { autoClose: 3000 });
        }
      } else {
        toast.error("Không thể kết nối với máy chủ. Vui lòng thử lại sau.", { autoClose: 3000 });
      }
    }
  };

  const resetForm = () => {
    setTieude("");
    setTrangthai("");
    setGiatien("");
    setDvt("");
    setSoLuong("");
    setSoLuongTamGiu(""); // Reset số lượng tạm giữ
    setHinhanh(null);
    setXemtruocHinhAnh("");
    setDanhmucsanphamID("");
    setHinhanhPhu([]); // Reset ảnh phụ
    setFileanhphu([{}]); // Reset input fields
    setSaleData(null);

  };
  const resetChiTiet = () => {
    setChiTiet({
      moTaChung: "",

      baiViet: "",
    });
  };

  // Hàm xử lý xóa ảnh phụ khi người dùng nhấn nút xóa
  const handleRemoveImage = async (imageId, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/sanpham/images/${imageId}`);
      toast.success("Đã xóa ảnh phụ thành công!", { autoClose: 3000 });
      const updatedExistingImages = existingHinhanhPhu.filter((img) => img.id !== imageId);
      setExistingHinhanhPhu(updatedExistingImages);
      const capnhatFile = Fileanhphu.filter((_, i) => i !== index);
      setFileanhphu(capnhatFile);
    } catch (error) {
      console.error("Có lỗi khi xóa ảnh phụ:", error);
      toast.error("Không thể xóa ảnh phụ. Vui lòng thử lại!", { autoClose: 3000 });
    }
  };


let role = [];
  if (cookies.adminToken) {
    try {
      const giaimatoken = jwtDecode(cookies.adminToken);
      role = giaimatoken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
    }
    catch (error) {
      console.log("có lỗi khi giải mã token:", error);
    }
  } 

  const isAdmin = role.includes('Admin');
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {isEdit ? (
              <>
                <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa Sản phẩm
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i> Thêm mới Sản phẩm
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Tiêu đề */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-card-text"></i> Tiêu đề
              </Form.Label>
              <Form.Control
                type="text"
                value={tieude}
                onChange={(e) => setTieude(e.target.value)}
                placeholder="Nhập tiêu đề sản phẩm"
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-card-text"></i> Số lượng
              </Form.Label>
              <Form.Control
                type="text"
                value={soLuong}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Chỉ cho phép nhập số nguyên không âm
                  if (/^\d*$/.test(inputValue)) {
                    setSoLuong(inputValue);
                  }
                }}
                onBlur={() => {
                  if (soLuong === "") {
                    setSoLuong(""); // Reset giá trị nếu không hợp lệ
                  } else {
                    setSoLuong(parseInt(soLuong, 10).toString()); // Đảm bảo giá trị là số nguyên
                  }
                }}
                placeholder="Nhập số lượng sản phẩm"
                className="shadow-sm"
              />
              {soLuong === "" && (
                <small className="text-danger">
                  Số lượng sản phẩm phải lớn hơn hoặc bằng 0.
                </small>
              )}
            </Form.Group>

            {/* Số lượng tạm giữ (chỉ hiển thị khi chỉnh sửa) */}
            {isEdit &&  isAdmin &&(
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  <i className="bi bi-card-text"></i> Số lượng tạm giữ
                </Form.Label>
                <Form.Control
                  type="text"
                  value={soLuongTamGiu}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Chỉ cho phép nhập số nguyên không âm
                    if (/^\d*$/.test(inputValue)) {
                      setSoLuongTamGiu(inputValue);
                    }
                  }}
                  onBlur={() => {
                    if (soLuongTamGiu === "") {
                      setSoLuongTamGiu(""); // Reset giá trị nếu không hợp lệ
                    } else {
                      setSoLuongTamGiu(parseInt(soLuongTamGiu, 10).toString()); // Đảm bảo giá trị là số nguyên
                    }
                  }}
                  placeholder="Nhập số lượng tạm giữ"
                  className="shadow-sm"
                />
                {soLuongTamGiu !== "" && (parseInt(soLuongTamGiu, 10) < 0 || parseInt(soLuongTamGiu, 10) > parseInt(soLuong, 10)) && (
                  <small className="text-danger">
                    Số lượng tạm giữ phải lớn hơn hoặc bằng 0 và không lớn hơn số lượng sản phẩm.
                  </small>
                )}
              </Form.Group>
            )}


            {/* Giá */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-currency-dollar"></i> Giá
              </Form.Label>
              <Form.Control
                type="text"
                value={new Intl.NumberFormat("vi-VN").format(giatien)} // Định dạng hiển thị
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm
                  if (/^\d*$/.test(rawValue)) {
                    setGiatien(rawValue); // Chỉ cập nhật nếu là số hợp lệ
                  }
                }}
                onBlur={() => {
                  const parsedValue = parseInt(giatien, 10);
                  if (parsedValue && parsedValue > 0) {
                    setGiatien(parsedValue.toString()); // Lưu giá trị dạng số
                  } else {
                    setGiatien(""); // Reset nếu giá trị không hợp lệ
                  }
                }}
                placeholder="Nhập giá sản phẩm"
                className="shadow-sm"
              />
              {(!giatien || parseInt(giatien, 10) <= 0) && (
                <small className="text-danger">
                  Giá sản phẩm phải lớn hơn 0.
                </small>
              )}
            </Form.Group>


            {/* Đơn vị tính */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-file-earmark-ruled"></i> Đơn vị tính
              </Form.Label>
              <Form.Control
                as="select"
                value={dvt}
                onChange={(e) => setDvt(e.target.value)}
                className="shadow-sm"
              >
                <option value="">Chọn danh mục sản phẩm</option>
                {donvitinh.map((dvts) => (
                  <option key={dvts.id} value={dvts.id}>
                    {dvts.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>


            {/* Danh mục sản phẩm */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-folder-fill"></i> Danh mục sản phẩm
              </Form.Label>
              <Form.Control
                as="select"
                value={danhmucsanphamID}
                onChange={(e) => setDanhmucsanphamID(e.target.value)}
                className="shadow-sm"
              >
                <option value="">Chọn danh mục sản phẩm</option>
                {danhmuc.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Hình ảnh chính */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-image"></i> Hình ảnh chính
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleThaydoihinhanh}
                accept="image/*"
                className="shadow-sm"
              />
              {xemtruochinhanh && (
                <div className="mt-3">
                  <p>Xem trước hình ảnh:</p>
                  <img
                    src={xemtruochinhanh}
                    alt="Xem trước hình ảnh"
                    style={{ width: "340px", height: "200px", objectFit: "cover" }}
                    className="rounded shadow-sm"
                  />
                </div>
              )}
            </Form.Group>

            {/* Hình ảnh phụ */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-images"></i> Hình ảnh phụ
              </Form.Label>
              {existingHinhanhPhu.map((img, index) => (
                <div key={img.id} className="d-flex align-items-center mb-3">
                  <img
                    src={img.hinhanh}
                    alt={`Ảnh phụ ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                    className="rounded shadow-sm"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveImage(img.id, index)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </div>
              ))}
              {Fileanhphu.map((_, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <Form.Control
                    type="file"
                    onChange={(e) => handleDoianhphu(index, e)}
                    accept="image/*"
                    className="shadow-sm"
                  />
                  {hinhanhPhu[index] && (
                    <img
                      src={URL.createObjectURL(hinhanhPhu[index])}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginLeft: "10px",
                      }}
                      className="rounded shadow-sm"
                    />
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleXoaanhphu(index)}
                    className="ms-2"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={handleThemanhphu}
                className="mt-2"
              >
                <i className="bi bi-plus-circle"></i> Thêm ảnh phụ
              </Button>
            </Form.Group>

            {/* Nút chỉnh sửa */}
            <div className="d-flex gap-2">
              <Button
                variant="info"
                className="shadow-sm text-white"
                onClick={() => setShowChiTietModal(true)}
              >
                <i className="bi bi-pencil-square"></i> Thêm/Sửa Chi tiết sản phẩm
              </Button>
              <Button
                variant="warning"
                className="shadow-sm text-white"
                onClick={() => setShowSaleModal(true)}
              >
                {saleData ? (
                  <><i className="bi bi-tag"></i> Chỉnh sửa khuyến mãi</>
                ) : (
                  <><i className="bi bi-tag"></i> Thêm khuyến mãi</>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="shadow-sm"
          >
            <i className="bi bi-x-circle"></i> Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="shadow-sm text-white"
          >
            {isEdit ? (
              <>
                <i className="bi bi-pencil-square me-2"></i> Cập nhật
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i> Thêm mới
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal chi tiết sản phẩm */}
      <MoadlChitietsanpham
        show={showChiTietModal}
        handleClose={() => setShowChiTietModal(false)}
        chiTiet={chiTiet}
        setChiTiet={setChiTiet}
        isEdit={isEdit}
        handleSaveChiTiet={handleSaveChiTiet}
      />
      {/* Modal sale */}
      <ModlaSanphamsale
        show={showSaleModal}
        handleClose={() => setShowSaleModal(false)}
        saleData={saleData}
        isEdit={isEdit}
        setSaleData={setSaleData}
        giaGoc={giatien}
      />
    </>


  );
};

export default ModlaSanpham;