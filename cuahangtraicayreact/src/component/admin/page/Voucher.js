import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import ModalVoucher from '../modla/ModalVoucher';
import SidebarAdmin from '../SidebarAdmin';
import HeaderAdmin from '../HeaderAdmin';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const Voucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [voucherToDelete, setVoucherToDelete] = useState(null);
    const [cookies] = useCookies(['adminToken']);

    // ✅ Phân trang & tìm kiếm
    const [timKiem, setTimKiem] = useState('');
    const [trangHienTai, setTrangHienTai] = useState(1);
    const voucherMoiTrang = 5;

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/voucher`);
            setVouchers(response.data.data);
        } catch (error) {
            toast.error('Lỗi khi lấy danh sách voucher.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!voucherToDelete) return;
        try {
            await axios.delete(`${process.env.REACT_APP_BASEURL}/api/voucher/${voucherToDelete.id}`, {
                headers: { Authorization: `Bearer ${cookies.adminToken}` },
            });

            toast.success(`Voucher "${voucherToDelete.code}" đã được xóa thành công.`);
            fetchVouchers();
            setShowDeleteModal(false);
        } catch (error) {
            toast.error('Lỗi khi xóa voucher.');
        }
    };

    // ✅ Lọc voucher theo tìm kiếm
    const vouchersDaLoc = vouchers.filter(voucher =>
        voucher.code.toLowerCase().includes(timKiem.toLowerCase())
    );

    // ✅ Phân trang
    const viTriCuoi = trangHienTai * voucherMoiTrang;
    const viTriDau = viTriCuoi - voucherMoiTrang;
    const voucherTheoTrang = vouchersDaLoc.slice(viTriDau, viTriCuoi);
    const tongSoTrang = Math.ceil(vouchersDaLoc.length / voucherMoiTrang);

    return (
        <div id="wrapper">
            <SidebarAdmin />

            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    <HeaderAdmin />

                    {/* Content Header */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="h3 mb-0 text-gray-800">Danh sách Voucher</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                                        <li className="breadcrumb-item active">Danh sách Voucher</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tìm kiếm */}
                    <div className="container-fluid mb-3">
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-3">
                                <Form.Group>
                                    <Form.Label>Tìm kiếm Voucher:</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập mã voucher..."
                                            value={timKiem}
                                            onChange={(e) => setTimKiem(e.target.value)}
                                        />
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                    </div>

                    {/* Bảng danh sách Voucher */}
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Danh sách Voucher</h6>
                                <Button variant="primary" onClick={() => { setIsEdit(false); setShowModal(true); }}>
                                    <i className="fas fa-plus-circle"></i> Thêm Voucher
                                </Button>
                            </div>

                            <div className="card-body table-responsive p-0" style={{ maxHeight: '400px' }}>
                                {loading ? (
                                    <div className="text-center">
                                        <Spinner animation="border" variant="primary" />
                                        <p>Đang tải dữ liệu...</p>
                                    </div>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead className="table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Mã</th>
                                                <th>Tối đa số lần sử dụng</th>
                                                <th>Đã sử dụng</th>
                                                <th>Giảm giá</th>
                                                <th>Giá trị tối thiểu</th>
                                                <th>Ngày bắt đầu</th>
                                                <th>Ngày hết hạn</th>
                                                <th>Trạng thái</th>
                                                <th>Người tạo</th>
                                                <th>Người cập nhật</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voucherTheoTrang.map((voucher, index) => (
                                                <tr key={voucher.id}>
                                                    <td>{viTriDau + index + 1}</td>
                                                    <td>{voucher.code}</td>
                                                    <td>{voucher.toidasudung}</td>
                                                    <td>{voucher.solandasudung}</td>
                                                    <td>{voucher.sotiengiamgia.toLocaleString()} đ</td>
                                                    <td>{voucher.giatridonhang.toLocaleString()} đ</td>
                                                    <td>{new Date(voucher.ngaybatdau).toLocaleDateString()}</td>
                                                    <td>{new Date(voucher.ngayhethan).toLocaleDateString()}</td>
                                                    <td className={voucher.trangthaiVoucher ? "text-success fw-bold" : "text-danger fw-bold"}>
                                                        {voucher.trangthaiVoucher ? "Hoạt động" : "Không hoạt động"}
                                                    </td>
                                                    <td>{voucher.createdBy}</td>
                                                    <td>{voucher.updatedBy}</td>
                                                    <td>
                                                        <Button variant="warning" onClick={() => { setCurrentVoucher(voucher); setIsEdit(true); setShowModal(true); }}>Sửa</Button>
                                                        <Button variant="danger" onClick={() => { setVoucherToDelete(voucher); setShowDeleteModal(true); }}>Xóa</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                )}
                                <div className="card-footer clearfix">
                                    <ul className="pagination pagination-sm m-0 float-right">
                                        {/* Trang đầu */}
                                        <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                                            <Button className="page-link" onClick={() => setTrangHienTai(1)}>
                                                <i className="fas fa-angle-double-left"></i>
                                            </Button>
                                        </li>

                                        {/* Trang trước */}
                                        <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                                            <Button className="page-link" onClick={() => setTrangHienTai(trangHienTai > 1 ? trangHienTai - 1 : 1)}>
                                                <i className="fas fa-angle-left"></i>
                                            </Button>
                                        </li>

                                        {/* Các trang */}
                                        {[...Array(tongSoTrang)].map((_, i) => (
                                            <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                                                <Button className="page-link" onClick={() => setTrangHienTai(i + 1)}>
                                                    {i + 1}
                                                </Button>
                                            </li>
                                        ))}

                                        {/* Trang tiếp */}
                                        <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                                            <Button className="page-link" onClick={() => setTrangHienTai(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>
                                                <i className="fas fa-angle-right"></i>
                                            </Button>
                                        </li>

                                        {/* Trang cuối */}
                                        <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                                            <Button className="page-link" onClick={() => setTrangHienTai(tongSoTrang)}>
                                                <i className="fas fa-angle-double-right"></i>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* Modal Thêm/Sửa Voucher */}
            <ModalVoucher show={showModal} handleClose={() => setShowModal(false)} isEdit={isEdit} voucher={currentVoucher} fetchVouchers={fetchVouchers} />

            {/* Modal Xác nhận Xóa */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body>
                    <p className="text-center">Bạn có chắc chắn muốn xóa voucher <b>{voucherToDelete?.code}</b> không?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
                    <Button variant="danger" onClick={handleDelete}>Xóa</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Voucher;
