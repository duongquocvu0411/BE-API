import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';

const ModalVoucher = ({ show, handleClose, isEdit, voucher, fetchVouchers }) => {
    const [sotiengiamgia, setSotiengiamgia] = useState('');
    const [toidasudung, setToidasudung] = useState('');
    const [giatridonhang, setGiatridonhang] = useState('');
    const [ngaybatdau, setNgaybatdau] = useState('');
    const [ngayhethan, setNgayhethan] = useState('');
    const [trangthaiVoucher, setTrangthaiVoucher] = useState(true); // Default là true
    const [cookies] = useCookies(['adminToken']);

    useEffect(() => {
        if (isEdit && voucher) {
            setSotiengiamgia(voucher.sotiengiamgia);
            setGiatridonhang(voucher.giatridonhang);
            setNgaybatdau(formatDateTime(voucher.ngaybatdau));  // Định dạng ngày tháng giờ
            setNgayhethan(formatDateTime(voucher.ngayhethan));  // Định dạng ngày tháng giờ
            setToidasudung(voucher.toidasudung);
            setTrangthaiVoucher(voucher.trangthaiVoucher);
        } else {
            resetForm();
        }
    }, [isEdit, voucher]);

    const formatDateTime = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const hours = ('0' + d.getHours()).slice(-2);
        const minutes = ('0' + d.getMinutes()).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleSubmit = async () => {
        const formData = {
            sotiengiamgia,
            giatridonhang,
            ngaybatdau,
            ngayhethan,
            toidasudung,
            trangthaiVoucher, // Gửi trạng thái lên API
        };

        try {
            const token = cookies.adminToken;

            if (isEdit) {
                await axios.put(`${process.env.REACT_APP_BASEURL}/api/voucher/${voucher.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                toast.success(`Voucher ${voucher.code} đã được cập nhật!`);
            } else {
                await axios.post(`${process.env.REACT_APP_BASEURL}/api/voucher`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                toast.success(`Voucher đã được thêm thành công!`,{
                    position: 'top-right',
                    autoClose:3000
                });
            }

            fetchVouchers();
            resetForm();
            handleClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đã xảy ra lỗi.');
        }
    };

    const resetForm = () => {
        setSotiengiamgia('');
        setGiatridonhang('');
        setNgaybatdau('');
        setNgayhethan('');
        setTrangthaiVoucher(true); // Reset về giá trị mặc định
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>{isEdit ? 'Chỉnh sửa Voucher' : 'Thêm mới Voucher'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Chỉ hiển thị Mã Voucher khi chỉnh sửa */}
                    {isEdit && (
                        <Form.Group className="mb-3">
                            <Form.Label>Mã Voucher</Form.Label>
                            <Form.Control type="text" value={voucher.code} readOnly />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Số tiền giảm giá</Form.Label>
                        <Form.Control
                            type="text"
                            value={new Intl.NumberFormat("vi-VN").format(sotiengiamgia)}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\./g, "");
                                if (/^\d*$/.test(rawValue)) {
                                    setSotiengiamgia(rawValue);
                                }
                            }}
                            placeholder="Nhập số tiền giảm giá"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số lần tối đa sử dụng</Form.Label>
                        <Form.Control type="number" min="1" value={toidasudung} onChange={(e) => setToidasudung(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                        <Form.Control
                            type="text"
                            value={new Intl.NumberFormat("vi-VN").format(giatridonhang)}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\./g, "");
                                if (/^\d*$/.test(rawValue)) {
                                    setGiatridonhang(rawValue);
                                }
                            }}
                            placeholder="Nhập giá trị đơn hàng tối thiểu"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày bắt đầu</Form.Label>
                        <Form.Control type="datetime-local" value={ngaybatdau} onChange={(e) => setNgaybatdau(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày hết hạn</Form.Label>
                        <Form.Control type="datetime-local" value={ngayhethan} onChange={(e) => setNgayhethan(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Select value={trangthaiVoucher} onChange={(e) => setTrangthaiVoucher(e.target.value === "true")}>
                            <option value="true">Hoạt động</option>
                            <option value="false">Không hoạt động</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={handleSubmit}>{isEdit ? 'Cập nhật' : 'Thêm mới'}</Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
    );
};

export default ModalVoucher;
