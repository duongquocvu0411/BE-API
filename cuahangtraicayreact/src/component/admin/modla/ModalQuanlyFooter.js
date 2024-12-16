import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const ModlalQuanlyFooter = ({ show, handleClose, isEdit, Footer, fetchFooters }) => {
    const [name, setName] = useState('');
    const [Trangthai, setTrangthai] = useState('');


    useEffect(() => {
        if (isEdit && Footer) {
            setName(Footer.noiDungFooter || ""); // Đặt giá trị mặc định nếu không có dữ liệu
            setTrangthai(Footer.trangThai !== undefined ? Footer.trangThai : ""); // Sử dụng `trangThai` từ API
        } else {
            setName('');
            setTrangthai("");

        }
    }, [isEdit, Footer]);
    const handleSubmit = async () => {
        try {
            // Kiểm tra xem người dùng có chọn "Lưu thông tin đăng nhập" hay không
            const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Kiểm tra trạng thái lưu đăng nhập
            const token = isLoggedIn ? localStorage.getItem('adminToken') : sessionStorage.getItem('adminToken'); // Lấy token từ localStorage nếu đã lưu, nếu không lấy từ sessionStorage
            // const updatedBy = isLoggedIn ? localStorage.getItem('loginhoten') : sessionStorage.getItem('loginhoten'); // Lấy tên người dùng từ localStorage hoặc sessionStorage

            const footerData = {
                noiDungFooter: name,
                trangthai: Trangthai, // Đảm bảo Trangthai có giá trị hợp lệ (0 hoặc 1)
                // updatedBy
            };

            if (isEdit) {
                // Cập nhật Footer hiện tại
                await axios.put(
                    `${process.env.REACT_APP_BASEURL}/api/Footer/${Footer.id}`,
                    footerData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Thêm token vào header
                        },
                    }
                );

                const plainTextName = new DOMParser().parseFromString(name, 'text/html').body.textContent; // hiện thị nội dung từ ckeditor dưới dạng ko html
                toast.success(`Footer ${plainTextName} đã được cập nhật thành công!`, {
                    position: 'top-right',
                    autoClose: 3000,
                });

                fetchFooters(); // Làm mới danh sách
                resetForm();
                handleClose(); // Đóng modal
            } else {
                // Thêm mới Footer
                await axios.post(
                    `${process.env.REACT_APP_BASEURL}/api/Footer`,
                    footerData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Thêm token vào header
                        },
                    }
                );

                toast.success(`Footer ${name} đã được thêm thành công!`, {
                    position: 'top-right',
                    autoClose: 3000,
                });

                fetchFooters(); // Làm mới danh sách
                resetForm();
                handleClose(); // Đóng modal
            }
        } catch (error) {
            console.error(isEdit ? "Có lỗi khi sửa Footer!" : "Có lỗi xảy ra khi thêm mới Footer.", error);

            // Hiển thị thông báo lỗi
            toast.error(
                isEdit ? "Có lỗi xảy ra khi cập nhật Footer. Vui lòng thử lại." : `Có lỗi xảy ra khi thêm mới Footer ${name}`,
                {
                    position: 'top-right',
                    autoClose: 3000,
                }
            );
        }
    };


    const resetForm = () => {
        setName("");
        setTrangthai("");
    };

    const handleChangeNoiDung = (event, editor) => {
        const data = editor.getData();
        setName(data);
    };

    return (
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>
                    {isEdit ? (
                        <>
                            <i className="bi bi-pencil-square me-2"></i> Chỉnh sửa Footer
                        </>
                    ) : (
                        <>
                            <i className="bi bi-plus-circle me-2"></i> Thêm mới Footer
                        </>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Input Tên Footer */}

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">
                            <i className="bi bi-pencil me-2"></i> Nội dung
                        </Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={name}  // Dữ liệu mặc định là nội dung đã nhập
                            config={{
                                mediaEmbed: {
                                    previewsInData: true, // Hiển thị ảnh trước khi gửi
                                },
                            }}
                            onChange={handleChangeNoiDung}  // Cập nhật nội dung khi thay đổi
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">
                            <i className="bi bi-eye me-2"></i> Trạng thái
                        </Form.Label>
                        <Form.Select
                            value={Trangthai}
                            onChange={(e) => setTrangthai(parseInt(e.target.value))}
                            className="shadow-sm"
                            style={{ borderRadius: '8px' }}
                            required
                        >
                            {/* Chỉ hiển thị "chọn trạng thái" nếu trạng thái chưa được chọn */}
                            <option value={""}>Chọn trạng thái</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Hiển thị</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="shadow-sm"
                    style={{ borderRadius: "8px" }}
                >
                    <i className="bi bi-x-circle me-2"></i> Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="shadow-sm text-white"
                    style={{ borderRadius: "8px" }}
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


    );
};

export default ModlalQuanlyFooter;
