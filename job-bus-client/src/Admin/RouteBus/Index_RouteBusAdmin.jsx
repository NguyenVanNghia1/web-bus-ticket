import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Input_DeparturePoint from "./Input/Input_DeparturePoint";
import Input_Destination from "./Input/Input_Destination";

//import icon
import { FaTruck, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const Index_RouteBusAdmin = () => {
  const [routes, setRoutes] = useState([]);
  const [departurePoint, setDeparturePoint] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [quangDuong, setQuangDuong] = useState("");
  const [thoiGianHanhTrinh, setThoiGianHanhTrinh] = useState("");
  const [giaVe, setGiaVe] = useState("");
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/route-buses");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const handleVehicleTypeClick = () => {
    setShowVehicleOptions(!showVehicleOptions);
  };

  const handleVehicleTypeSelect = (type) => {
    setVehicleType(type);
    setShowVehicleOptions(false);
  };

  const handleAddRoute = async (event) => {
    event.preventDefault();
    if (
      !departurePoint ||
      !destination ||
      !vehicleType ||
      !quangDuong ||
      !thoiGianHanhTrinh ||
      !giaVe
    ) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin trước khi nhấn 'Thêm'");
      return;
    }

    try {
      const newRoute = {
        diemDi: departurePoint,
        diemDen: destination,
        loaiXe: vehicleType,
        quangDuong,
        thoiGianHanhTrinh,
        giaVe,
      };

      const response = await axios.post(
        "http://localhost:4000/route-buses",
        newRoute,
      );
      setRoutes([...routes, response.data]);
      setErrorMessage("");
      // Clear form fields
      setDeparturePoint("");
      setDestination("");
      setVehicleType("");
      setQuangDuong("");
      setThoiGianHanhTrinh("");
      setGiaVe("");
    } catch (error) {
      console.error("Error adding route:", error);
      setErrorMessage("Failed to add route. Please try again.");
    }
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  };

  return (
    <div className="routeBusAdmin">
      <div className="sectionContaiNerRouteBusAdmin grid">
        <div className="headerRouteBusAdmin flex">
          <FaTruck className="icon" />
          <h1>Tuyến Xe</h1>
        </div>

        <div className="formSectionContainer">
          <div className="formContainer">
            <h2>Thông tin chi tiết</h2>
            <form
              className="formDetails"
              onSubmit={handleAddRoute}
              ref={formRef}
            >
              <div className="formGroup">
                <label>Điểm đi</label>
                <Input_DeparturePoint
                  setDeparturePoint={setDeparturePoint}
                  error={errorMessage}
                />
              </div>
              <div className="formGroup">
                <label>Điểm đến</label>
                <Input_Destination
                  setDestination={setDestination}
                  error={errorMessage}
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
                <label>Quãng đường</label>
                <input
                  type="text"
                  value={quangDuong}
                  onChange={(e) => setQuangDuong(e.target.value)}
                  placeholder="Nhập quãng đường (đơn vị: KM)"
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
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </div>
        <div className="buttonContainer">
          <button type="button" className="btn add" onClick={handleButtonClick}>
            <FaPlus /> Thêm
          </button>
          <button className="btn edit">
            <FaEdit /> Sửa
          </button>
          <button className="btn delete">
            <FaTrash /> Xóa
          </button>
          <button className="btn cancel">
            <FaTimes /> Hủy
          </button>
        </div>
        <div className="tableSectionContainer">
          <div className="tableContainer">
            <h2>Danh sách tuyến xe</h2>
            <table>
              <thead>
                <tr>
                  <th>Điểm đi</th>
                  <th>Điểm đến</th>
                  <th>Loại xe</th>
                  <th>Quãng đường</th>
                  <th>Thời gian hành trình</th>
                  <th>Giá vé</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route._id}>
                    <td>{route.diemDi}</td>
                    <td>{route.diemDen}</td>
                    <td>{route.loaiXe}</td>
                    <td>{route.quangDuong}</td>
                    <td>{route.thoiGianHanhTrinh}</td>
                    <td>{route.giaVe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index_RouteBusAdmin;
