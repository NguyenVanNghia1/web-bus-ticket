import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeparturePoint_Input from "./Search-Input/DeparturePoint_Input";
//import icon
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineWallet } from "react-icons/hi2";
import Destination from "./Search-Input/Destination";

const Search = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedDate, setSelectedDate] = useState(""); // Initial empty string for date
  const [selectedReturnDate, setSelectedReturnDate] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1); // Initial value for number
  const [departurePoint, setDeparturePoint] = useState("");
  const [destination, setDestination] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDateChange = (event) => {
    if (event.target.id === "departureDate") {
      setSelectedDate(event.target.value);
    } else if (event.target.id === "returnDate") {
      setSelectedReturnDate(event.target.value);
    }
  };

  const handleTicketChange = (event) => {
    setNumberOfTickets(parseInt(event.target.value));
  };

  const handleDepartureChange = (event) => {
    setDeparturePoint(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const formatDateToISOWithOffset = (dateString) => {
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00.000 UTC
    const isoString = date.toISOString();
    return isoString.replace("Z", "+00:00");
  };

  const handleSearch = async () => {
    const newErrors = {};
    if (!departurePoint) newErrors.departurePoint = true;
    if (!destination) newErrors.destination = true;
    if (!selectedDate) newErrors.selectedDate = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formattedDate = formatDateToISOWithOffset(selectedDate); // Format the date
      const response = await axios.post("http://localhost:4000/search-bus", {
        departurePoint,
        destination,
        selectedDate: formattedDate,
      });

      const data = response.data;
      navigate("/dat-ve", { state: { filteredTrips: data } });
    } catch (error) {
      console.error("Error searching for bus routes:", error);
    }
  };
  return (
    <div className="search select container">
      <div className="sectionContainer grid">
        <div className="header-search">
          <h1>Mua vé xe khách</h1>
        </div>

        <div className="SelectButton flex">
          <input
            type="radio"
            id="option1"
            name="options"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
          />
          <label for="option1">Một chiều</label>
          <input
            type="radio"
            id="option2"
            name="options"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
          />
          <label for="option2">Khứ hồi</label>
        </div>

        <div className="searchInputs flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Điểm đi</h4>
              <DeparturePoint_Input
                setDeparturePoint={setDeparturePoint}
                error={errors.departurePoint}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Điểm đến</h4>
              <Destination
                setDestination={setDestination}
                error={errors.destination}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineCalendar className="icon" />
            </div>
            <div className="texts">
              <h4>Ngày đi</h4>
              <input
                type="date"
                id="departureDate"
                value={selectedDate}
                onChange={handleDateChange}
                style={{
                  borderColor: errors.selectedDate ? "rgb(255,0,0)" : "",
                }}
              />
            </div>
          </div>

          {/* Conditionally render "Ngày về" input only for "Khứ hồi" option */}
          {selectedOption === "option2" && (
            <div className="singleInput flex">
              <div className="iconDiv">
                <HiOutlineCalendar className="icon" />
              </div>
              <div className="texts">
                <h4>Ngày về</h4>
                <input
                  type="date"
                  id="returnDate"
                  value={selectedReturnDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          )}

          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineWallet className="icon" />
            </div>
            <div className="texts">
              <h4>Số vé</h4>
              <input
                type="number"
                value={numberOfTickets}
                onChange={handleTicketChange}
                min={1}
              />
            </div>
          </div>
        </div>
        <div className="btnSearch flex">
          <button className="btn btnBlock flex " onClick={handleSearch}>
            {" "}
            Tìm kiếm chuyến xe{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
