import React, { useState, useEffect, useRef } from "react";
import Search from "../Home/Search";
import Filter from "./Filter";
import imgPoster from "../../../public/images/Dat_Ve_Poster.png";
import Ticket from "./Ticket_details/ticket";
import Your_Trip from "./Ticket_details/Your_Trip";
import { useLocation } from "react-router-dom";

const Index_BookTickets = () => {
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const sectionContainerRef = useRef(null);
  const location = useLocation();
  const { filteredTrips, route } = location.state || {};

  const handleTimeRangeChange = (ranges) => {
    setSelectedTimeRanges(ranges);
  };

  const handleVehicleTypeChange = (type) => {
    setSelectedVehicleType(type);
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  const handleClickOutside = (event) => {
    if (
      sectionContainerRef.current &&
      !sectionContainerRef.current.contains(event.target)
    ) {
      setSelectedTrip(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="indexBookTicket pb-60 pt-60">
      <div className="imgDiv">
        <img src={imgPoster} className="imgS" />
      </div>
      <Search />
      <div className="sectionContainerTicket flex" ref={sectionContainerRef}>
        <div className="left grid">
          {selectedTrip && <Your_Trip trip={selectedTrip} />}
          <Filter
            onTimeRangeChange={handleTimeRangeChange}
            onVehicleTypeChange={handleVehicleTypeChange}
          />
        </div>
        <div className="right grid">
          <Ticket
            selectedTimeRanges={selectedTimeRanges}
            selectedVehicleType={selectedVehicleType}
            onTripSelect={handleTripSelect}
            filteredTrips={filteredTrips}
            route={route}
          />
        </div>
      </div>
    </div>
  );
};

export default Index_BookTickets;
