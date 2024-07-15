import React, { useState } from "react";

//import icon
import { AiOutlineCloseCircle } from "react-icons/ai";

const DeparturePoint_Input = ({ setDeparturePoint, error }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const provincesAndCities = [
    "Hà Nội",
    "Vĩnh Phúc",
    "Bắc Ninh",
    "Quảng Ninh",
    "Hải Dương",
    "Hải Phòng",
    "Hưng Yên",
    "Thái Bình",
    "Hà Nam",
    "Nam Định",
    "Ninh Bình",
    "Hà Giang",
    "Cao Bằng",
    "Bắc Kạn",
    "Tuyên Quang",
    "Lào Cai",
    "Yên Bái",
    "Thái Nguyên",
    "Lạng Sơn",
    "Bắc Giang",
    "Phú Thọ",
    "Điện Biên",
    "Lai Châu",
    "Sơn La",
    "Hoà Bình",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Bình",
    "Quảng Trị",
    "Thừa Thiên Huế",
    "Đà Nẵng",
    "Quảng Nam",
    "Quảng Ngãi",
    "Bình Định",
    "Phú Yên",
    "Khánh Hoà",
    "Ninh Thuận",
    "Bình Thuận",
    "Tây Nguyên",
    "Kon Tum",
    "Gia Lai",
    "Đắk Lắk",
    "Đắk Nông",
    "Lâm Đồng",
    "Bình Phước",
    "Tây Ninh",
    "Bình Dương",
    "Đồng Nai",
    "Bà Rịa - Vũng Tàu",
    "TP.Hồ Chí Minh",
    "Long An",
    "Tiền Giang",
    "Bến Tre",
    "Trà Vinh",
    "Vĩnh Long",
    "Đồng Tháp",
    "An Giang",
    "Kiên Giang",
    "Cần Thơ",
    "Hậu Giang",
    "Sóc Trăng",
    "Bạc Liêu",
    "Cà Mau",
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setDeparturePoint(selectedValue);
    if (!recentSearches.includes(selectedValue)) {
      setRecentSearches([...recentSearches, selectedValue]);
    }
    setIsPopupOpen(false);
  };

  const handleRecentSearchClick = (search) => {
    setSelectedOption(search);
    setDeparturePoint(search);
    setIsPopupOpen(false);
  };

  const handleDeleteRecentSearch = (search) => {
    setRecentSearches(recentSearches.filter((item) => item !== search));
  };

  const filteredOptions = provincesAndCities.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="departurePoint">
      <button
        className="departureInput"
        onClick={() => setIsPopupOpen(true)}
        style={{
          borderColor: error ? "rgb(255,0,0)" : "", // Set border color based on error
        }}
      >
        {selectedOption || "Chọn điểm đi"}
      </button>
      {isPopupOpen && (
        <div className="departurePopup">
          <div className="popup-content">
            <h4>Điểm đi</h4>
            <input
              type="text"
              placeholder="Chọn điểm đi"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              className="chonTinh"
              id="option-select"
              multiple
              onChange={handleSelect}
            >
              {filteredOptions.map((option, index) => (
                <option className="optionTinhTP" key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <h4>TÌM KIẾM GẦN ĐÂY</h4>
            <div className="recent-searches">
              {recentSearches.map((search, index) => (
                <div key={index} className="recent-search-item">
                  <button onClick={() => handleRecentSearchClick(search)}>
                    {search}
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteRecentSearch(search)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="close flex">
              <button className="flex" onClick={() => setIsPopupOpen(false)}>
                {" "}
                <AiOutlineCloseCircle
                  color="rgb(225, 36, 36)"
                  className="icon"
                  style={{ fontSize: "25px" }}
                />{" "}
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeparturePoint_Input;
