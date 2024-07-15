import React from "react";
import imgSchedule from "../../../public/images/switch_location.svg";
//import icon
import { ImSearch } from "react-icons/im";

const Search_Schedule = () => {
  return (
    <div className="searchSchedule select container">
      <div className="sectionContainer grid">
        <div className="searchInput flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <ImSearch color="rgb(156,163,175)" className="icon" />
            </div>
            <input type="text" placeholder="Nhập điểm đi" />
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <ImSearch color="rgb(156,163,175)" className="icon" />
            </div>
            <input type="text" placeholder="Nhập điểm đến" />
          </div>
        </div>

        <div className="imgDiv">
          <img src={imgSchedule} className="imgS" />
        </div>
      </div>
    </div>
  );
};

export default Search_Schedule;
