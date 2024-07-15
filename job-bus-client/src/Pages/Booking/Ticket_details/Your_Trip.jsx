import React from "react";

//import icon
import { CiCalendarDate } from "react-icons/ci";
import { CgEditBlackPoint } from "react-icons/cg";
import { RiMapPinFill } from "react-icons/ri";

const Your_Trip = ({ trip }) => {
  const formattedDate = new Date(trip.ngayDi).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="yourTrip">
      <div className="sectionContainerYourTrip grid">
        <div className="headerYourTrip">
          <h2>CHUYẾN ĐI CỦA BẠN</h2>
        </div>

        <div className="contentYourTrip grid">
          <div className="dateYourTrip flex">
            <CiCalendarDate
              color="rgb(239, 82, 34)"
              className="icon"
              style={{ fontSize: "40px" }}
            />

            <span>{formattedDate}</span>
          </div>
          <div className="time-destination grid">
            <div className="time flex">
              <span>{trip.gioDi}</span>
              <div className="go flex">
                <CgEditBlackPoint
                  color="rgb(8, 117, 77)"
                  className="icon"
                  style={{ fontSize: "20px" }}
                />
                <div className="dottedLine"> </div>
                <span className="giodi">{trip.thoiGianHanhTrinh}</span>
                <div className="dottedLine"> </div>
                <RiMapPinFill
                  color="rgb(242, 117, 78)"
                  className="icon"
                  style={{ fontSize: "20px" }}
                />
              </div>
              <span>{trip.gioDen}</span>
            </div>
            <div className="destination flex">
              <div className="desA">
                <span>{trip.diemDi}</span>
              </div>
              <div className="desB">
                <span>{trip.diemDen}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Your_Trip;
