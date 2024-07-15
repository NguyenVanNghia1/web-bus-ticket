import React, { useState, useEffect } from "react";
import imgConvert from "../../../public/images/convert.jpg";
import imgSchedule from "../../../public/images/switch_location.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import icon
import { ImSearch } from "react-icons/im";

const Schedule = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/route-bus")
      .then((response) => response.json())
      .then((data) => {
        setRoutes(data);
        setFilteredRoutes(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      //style: "currency",
      currency: "VND",
    });
  };

  const handleSearch = (departureTerm, destinationTerm) => {
    const filtered = routes.filter((route) => {
      return (
        route.diemDi.toLowerCase().includes(departureTerm.toLowerCase()) &&
        route.diemDen.toLowerCase().includes(destinationTerm.toLowerCase())
      );
    });
    setFilteredRoutes(filtered);
  };

  const handleDepartureChange = (e) => {
    const departureTerm = e.target.value;
    const destinationTerm = document.getElementById("destinationInput").value;
    handleSearch(departureTerm, destinationTerm);
  };

  const handleDestinationChange = (e) => {
    const destinationTerm = e.target.value;
    const departureTerm = document.getElementById("departureInput").value;
    handleSearch(departureTerm, destinationTerm);
  };

  const handleFindBusRoutes = (clickedId) => {
    console.log("Clicked button ID:", clickedId);
    axios
      .post("http://localhost:4000/find-bus-routes", { maTuyenXe: clickedId })
      .then((response) => {
        const selectedRoute = routes.find((route) => route._id === clickedId);
        navigate("/dat-ve", {
          state: { filteredTrips: response.data, route: selectedRoute },
        });
      })
      .catch((error) => {
        console.error(error);
        navigate("/dat-ve", { state: { filteredTrips: [], route: null } });
      });
  };

  return (
    <div className="schedule container">
      <div className="sectionContainer grid">
        <div className="searchSchedule grid">
          <div className="searchInput flex">
            <div className="singleInput flex">
              <div className="iconDiv">
                <ImSearch color="rgb(156,163,175)" className="icon" />
              </div>
              <input
                type="text"
                id="departureInput"
                placeholder="Nhập điểm đi"
                onChange={handleDepartureChange}
              />
            </div>
            <div className="singleInput flex">
              <div className="iconDiv">
                <ImSearch color="rgb(156,163,175)" className="icon" />
              </div>
              <input
                type="text"
                id="destinationInput"
                placeholder="Nhập điểm đến"
                onChange={handleDestinationChange}
              />
            </div>
          </div>

          <div className="imgDiv">
            <img src={imgSchedule} className="imgS" />
          </div>
        </div>
        <div className="titleSchedule flex">
          <div className="tuyenXe">Tuyến Xe</div>
          <div className="loaiXe">Loại xe</div>
          <div className="quangDuong">Quãng đường</div>
          <div className="thoiGian">Thời gian hành trình</div>
          <div className="giaVe">Giá vé</div>
        </div>
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route, index) => (
            <div key={index} className="singleTinh flex">
              <div className="singleTuyenXe flex">
                <h3 className="text-red-500">{route.diemDi}</h3>&nbsp;
                <div className="imgDiv">
                  <img src={imgConvert} className="imgS" />
                </div>
                &nbsp;
                <h3>{route.diemDen}</h3>
              </div>
              <div className="singleLoaiXe">
                <h3>{route.loaiXe}</h3>
              </div>
              <div className="singleQuangDuong flex">
                <h3>{route.quangDuong}</h3>
                &nbsp;Km
              </div>
              <div className="singleThoiGian flex">
                <div className="hour">
                  <h3>{route.thoiGianHanhTrinh}</h3>
                </div>
              </div>
              <div className="singleGiaVe flex">
                <h3>{formatCurrency(route.giaVe)}</h3>
                &nbsp;VNĐ
              </div>
              <div
                className="btnSearch flex"
                onClick={() => handleFindBusRoutes(route._id)}
              >
                <button
                  className="btn btnBlock flex"
                  onClick={() => {
                    navigate("/dat-ve");
                  }}
                >
                  Tìm tuyến xe
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No properties</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
