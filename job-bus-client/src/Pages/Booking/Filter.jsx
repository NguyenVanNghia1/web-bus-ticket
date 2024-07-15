import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Filter = ({ onTimeRangeChange, onVehicleTypeChange }) => {
  const [selectedButtons, setSelectedButtons] = useState({
    Ghế: false,
    Giường: false,
    Limousine: false,
    "Tầng trên": false,
    "Tầng dưới": false,
  });

  const [selectedTimeRanges, setSelectedTimeRanges] = useState({
    "00:00-06:00": false,
    "06:00-12:00": false,
    "12:00-18:00": false,
    "18:00-24:00": false,
  });

  const handleButtonClick = (buttonName) => {
    const newSelectedButtons = {
      ...selectedButtons,
      Ghế: false,
      Giường: false,
      Limousine: false,
      [buttonName]: !selectedButtons[buttonName],
    };
    setSelectedButtons(newSelectedButtons);
    onVehicleTypeChange(buttonName);
  };

  const handleUnfilterClick = () => {
    setSelectedButtons({
      Ghế: false,
      Giường: false,
      Limousine: false,
      "Tầng trên": false,
      "Tầng dưới": false,
    });
    setSelectedTimeRanges({
      "00:00-06:00": false,
      "06:00-12:00": false,
      "12:00-18:00": false,
      "18:00-24:00": false,
    });
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    onTimeRangeChange([]);
    onVehicleTypeChange(null);
  };

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRanges((prevRanges) => {
      const newRanges = {
        ...prevRanges,
        [range]: !prevRanges[range],
      };
      const selectedRanges = Object.keys(newRanges).filter(
        (key) => newRanges[key],
      );
      onTimeRangeChange(selectedRanges);
      return newRanges;
    });
  };

  const getButtonColor = (buttonName) => {
    return selectedButtons[buttonName] ? "rgb(225, 36, 36)" : "";
  };

  return (
    <div className="filter ">
      <div className="sectionContainerFilter grid">
        <div className="header-filter flex">
          <div className="header">
            <h2> BỘ LỌC TÌM KIẾM </h2>
          </div>
          <div className="nonFilter flex">
            <button className="flex gap-2" onClick={handleUnfilterClick}>
              Bỏ lọc
              <RiDeleteBin6Line
                color="rgb(255, 0, 0)"
                className="icon"
                style={{ fontSize: "23px" }}
              />
            </button>
          </div>
        </div>

        <div className="timeFilter grid">
          <div className="header flex">
            <h3>Giờ đi</h3>
          </div>
          <div className="filterInput grid">
            <div className="singleInput flex">
              <input
                type="checkbox"
                onChange={() => handleTimeRangeChange("00:00-06:00")}
              />
              <a>Sáng sớm 00:00 - 06:00</a>
            </div>

            <div className="singleInput flex">
              <input
                type="checkbox"
                onChange={() => handleTimeRangeChange("06:00-12:00")}
              />
              <a>Buổi sáng 06:00 - 12:00</a>
            </div>

            <div className="singleInput flex">
              <input
                type="checkbox"
                onChange={() => handleTimeRangeChange("12:00-18:00")}
              />
              <a>Buổi chiều 12:00 - 18:00 </a>
            </div>

            <div className="singleInput flex">
              <input
                type="checkbox"
                onChange={() => handleTimeRangeChange("18:00-24:00")}
              />
              <a>Buổi tối 18:00 - 24:00</a>
            </div>
          </div>
        </div>

        <div className="divide"> </div>

        <div className="typeBus grid">
          <div className="header flex">
            <h3>Loại xe</h3>
          </div>
          <div className="singleBtn flex">
            <button
              style={{
                borderColor: getButtonColor("Ghế"),
                color: getButtonColor("Ghế"),
              }}
              onClick={() => handleButtonClick("Ghế")}
            >
              Ghế
            </button>

            <button
              style={{
                borderColor: getButtonColor("Giường"),
                color: getButtonColor("Giường"),
              }}
              onClick={() => handleButtonClick("Giường")}
            >
              Giường
            </button>

            <button
              style={{
                borderColor: getButtonColor("Limousine"),
                color: getButtonColor("Limousine"),
              }}
              onClick={() => handleButtonClick("Limousine")}
            >
              Limousine
            </button>
          </div>
        </div>

        {/* <div className="divide h-0.5 w-52 bg-gray-300"> </div>

        <div className="floor grid">
          <div className="header flex">
            <h3>Tầng</h3>
          </div>
          <div className="singleBtn flex">
            <button
              style={{
                borderColor: getButtonColor("Tầng trên"),
                color: getButtonColor("Tầng trên"),
              }}
              onClick={() => handleButtonClick("Tầng trên")}
            >
              Tầng trên
            </button>

            <button
              style={{
                borderColor: getButtonColor("Tầng dưới"),
                color: getButtonColor("Tầng dưới"),
              }}
              onClick={() => handleButtonClick("Tầng dưới")}
            >
              Tầng dưới
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Filter;
