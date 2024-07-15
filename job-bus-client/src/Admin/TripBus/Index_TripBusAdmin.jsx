import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { FaTruck, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const Index_TripBusAdmin = () => {
  const [trips, setTrips] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [diemDi, setDiemDi] = useState("");
  const [diemDen, setDiemDen] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [thoiGianHanhTrinh, setThoiGianHanhTrinh] = useState("");
  const [gioDi, setGioDi] = useState("");
  const [gioDen, setGioDen] = useState("");
  const [giaVe, setGiaVe] = useState("");
  const [maTuyenXe, setMaTuyenXe] = useState("");
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:4000/trip-buses");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/route-buses");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchTrips();
    fetchRoutes();
  }, []);

  const handleVehicleTypeClick = () => {
    setShowVehicleOptions(!showVehicleOptions);
  };

  const handleVehicleTypeSelect = (type) => {
    setVehicleType(type);
    setShowVehicleOptions(false);
  };

  const handleAddTrip = async (event) => {
    event.preventDefault();
    if (
      !diemDi ||
      !diemDen ||
      !vehicleType ||
      !ngayDi ||
      !gioDi ||
      !gioDen ||
      !thoiGianHanhTrinh ||
      !giaVe ||
      !maTuyenXe
    ) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin trước khi nhấn 'Thêm'");
      return;
    }

    try {
      const newTrip = {
        diemDi,
        diemDen,
        loaiXe: vehicleType,
        ngayDi,
        gioDi,
        gioDen,
        thoiGianHanhTrinh,
        giaVe,
        maTuyenXe,
      };

      const response = await axios.post(
        "http://localhost:4000/trip-buses",
        newTrip,
      );
      setTrips([...trips, response.data]);
      setErrorMessage("");
      // Clear form fields
      setDiemDi("");
      setDiemDen("");
      setVehicleType("");
      setNgayDi("");
      setGioDi("");
      setGioDen("");
      setThoiGianHanhTrinh("");
      setGiaVe("");
      setMaTuyenXe("");
    } catch (error) {
      console.error("Error adding trip:", error);
      setErrorMessage("Failed to add trip. Please try again.");
    }
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  };

  const handleCancelClick = () => {
    // Clear form fields
    setDiemDi("");
    setDiemDen("");
    setVehicleType("");
    setNgayDi("");
    setGioDi("");
    setGioDen("");
    setThoiGianHanhTrinh("");
    setGiaVe("");
    setMaTuyenXe("");
    setErrorMessage("");
    setSelectedTrip(null);
  };

  const handleRowClick = (trip) => {
    setSelectedTrip(trip);
    setDiemDi(trip.diemDi);
    setDiemDen(trip.diemDen);
    setVehicleType(trip.loaiXe);
    setNgayDi(trip.ngayDi);
    setGioDi(trip.gioDi);
    setGioDen(trip.gioDen);
    setThoiGianHanhTrinh(trip.thoiGianHanhTrinh);
    setGiaVe(trip.giaVe);
    setMaTuyenXe(trip.maTuyenXe);
  };

  const handleEditTrip = async () => {
    if (!selectedTrip) {
      setErrorMessage("Không có chuyến xe nào được chọn để chỉnh sửa.");
      return;
    }

    if (
      !diemDi ||
      !diemDen ||
      !vehicleType ||
      !ngayDi ||
      !gioDi ||
      !gioDen ||
      !thoiGianHanhTrinh ||
      !giaVe ||
      !maTuyenXe
    ) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin trước khi nhấn 'Sửa'");
      return;
    }

    try {
      const updatedTrip = {
        diemDi,
        diemDen,
        loaiXe: vehicleType,
        ngayDi,
        gioDi,
        gioDen,
        thoiGianHanhTrinh,
        giaVe,
        maTuyenXe,
      };

      const response = await axios.put(
        `http://localhost:4000/trip-buses/${selectedTrip._id}`,
        updatedTrip,
      );
      setTrips(
        trips.map((trip) =>
          trip._id === selectedTrip._id ? response.data : trip,
        ),
      );
      setErrorMessage("");
      // Clear form fields
      setDiemDi("");
      setDiemDen("");
      setVehicleType("");
      setNgayDi("");
      setGioDi("");
      setGioDen("");
      setThoiGianHanhTrinh("");
      setGiaVe("");
      setMaTuyenXe("");
      setSelectedTrip(null);
    } catch (error) {
      console.error("Lỗi chỉnh sửa chuyến xe", error);
      setErrorMessage("Không thể chỉnh sửa chuyến xe. Vui lòng thử lại.");
    }
  };

  const handleDeleteTrip = async () => {
    if (!selectedTrip) {
      setErrorMessage("Không có chuyến xe nào được chọn để xóa.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:4000/trip-buses/${selectedTrip._id}`,
      );
      setTrips(trips.filter((trip) => trip._id !== selectedTrip._id));
      setErrorMessage("");
      // Clear form fields
      setDiemDi("");
      setDiemDen("");
      setVehicleType("");
      setNgayDi("");
      setGioDi("");
      setGioDen("");
      setThoiGianHanhTrinh("");
      setGiaVe("");
      setMaTuyenXe("");
      setSelectedTrip(null);
    } catch (error) {
      console.error("Lỗi xóa chuyến xe", error);
      setErrorMessage("Không thể xóa chuyến xe. Vui lòng thử lại.");
    }
  };

  const totalPages = Math.ceil(trips.length / rowsPerPage);

  const currentTrips = trips.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      //style: "currency",
      currency: "VND",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="tripBusAdmin">
      <div className="sectionContainerTripBusAdmin grid">
        <div className="headerTripBusAdmin flex">
          <FaTruck className="icon" />
          <h1>Chuyến Xe</h1>
        </div>

        <div className="formSectionContainer">
          <div className="formContainer">
            <h2>Thông tin chi tiết</h2>
            <form
              className="formDetails"
              onSubmit={handleAddTrip}
              ref={formRef}
            >
              <div className="formGroup">
                <label>Điểm đi</label>
                <input
                  type="text"
                  placeholder="Nhập điểm đón khách"
                  value={diemDi}
                  onChange={(e) => setDiemDi(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Điểm đến</label>
                <input
                  type="text"
                  placeholder="Nhập điểm Trả khách"
                  value={diemDen}
                  onChange={(e) => setDiemDen(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Loại xe</label>
                <input
                  type="text"
                  value={vehicleType}
                  onClick={handleVehicleTypeClick}
                  readOnly
                  placeholder="Chọn loại xe "
                />
                {showVehicleOptions && (
                  <div className="vehicleOptions">
                    <div onClick={() => handleVehicleTypeSelect("Ghế")}>
                      Ghế
                    </div>
                    <div onClick={() => handleVehicleTypeSelect("Giường")}>
                      Giường
                    </div>
                    <div onClick={() => handleVehicleTypeSelect("Limousine")}>
                      Limousine
                    </div>
                  </div>
                )}
              </div>
              <div className="formGroup">
                <label>Ngày đi</label>
                <input
                  type="date"
                  value={ngayDi}
                  onChange={(e) => setNgayDi(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Giờ đi</label>
                <input
                  type="text"
                  placeholder="Nhập thời gian đi (00:00)"
                  value={gioDi}
                  onChange={(e) => setGioDi(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Giờ đến</label>
                <input
                  type="text"
                  placeholder="Nhập thời gian đến (00:00)"
                  value={gioDen}
                  onChange={(e) => setGioDen(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Thời gian hành trình</label>
                <input
                  type="text"
                  placeholder="Nhập thời gian hành trình"
                  value={thoiGianHanhTrinh}
                  onChange={(e) => setThoiGianHanhTrinh(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Giá vé</label>
                <input
                  type="text"
                  placeholder="Nhập giá vé (đơn vị: VNĐ)"
                  value={giaVe}
                  onChange={(e) => setGiaVe(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Mã tuyến xe</label>
                <select
                  value={maTuyenXe}
                  onChange={(e) => {
                    const selectedRoute = routes.find(
                      (route) => route._id === e.target.value,
                    );
                    setMaTuyenXe(selectedRoute._id);
                    // setDiemDi(selectedRoute.diemDi);
                    // setDiemDen(selectedRoute.diemDen);
                  }}
                >
                  <option value="">Chọn mã tuyến xe</option>
                  {routes.map((route) => (
                    <option key={route._id} value={route._id}>
                      {route.diemDi} - {route.diemDen} : {route._id}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </div>
        <div className="buttonContainer">
          <button type="button" className="btn add" onClick={handleButtonClick}>
            <FaPlus /> Thêm
          </button>
          <button type="button" className="btn edit" onClick={handleEditTrip}>
            <FaEdit /> Sửa
          </button>
          <button
            type="button"
            className="btn delete"
            onClick={handleDeleteTrip}
          >
            <FaTrash /> Xóa
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={handleCancelClick}
          >
            <FaTimes /> Hủy
          </button>
        </div>
        <div className="tableSectionContainer">
          <div className="tableContainer">
            <h2>Danh sách chuyến xe</h2>
            <table>
              <thead>
                <tr>
                  <th>Điểm đi</th>
                  <th>Điểm đến</th>
                  <th>Loại xe</th>
                  <th>Ngày đi</th>
                  <th>Giờ đi</th>
                  <th>Giờ đến</th>
                  <th>Thời gian hành trình</th>
                  <th>Giá vé</th>
                </tr>
              </thead>
              <tbody>
                {currentTrips.map((trip) => (
                  <tr
                    key={trip._id}
                    onClick={() => handleRowClick(trip)}
                    className={
                      selectedTrip && selectedTrip._id === trip._id
                        ? "selected"
                        : ""
                    }
                  >
                    <td>{trip.diemDi}</td>
                    <td>{trip.diemDen}</td>
                    <td>{trip.loaiXe}</td>
                    <td>{formatDate(trip.ngayDi)}</td>
                    <td>{trip.gioDi}</td>
                    <td>{trip.gioDen}</td>
                    <td>{trip.thoiGianHanhTrinh} </td>
                    <td>{formatCurrency(trip.giaVe)} VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <span>Tổng số: {trips.length}</span>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index_TripBusAdmin;
