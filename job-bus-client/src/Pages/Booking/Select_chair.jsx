import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatMap from "./SeatMap";
//import icon
import { FaSquare } from "react-icons/fa";

const Select_chair = ({ trip, chairBedData, route }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const handleSeatClick = (seat) => {
    let updatedSeats = [...selectedSeats];

    if (selectedSeats.includes(seat)) {
      updatedSeats = updatedSeats.filter(
        (selectedSeat) => selectedSeat !== seat,
      );
    } else if (selectedSeats.length < 5) {
      updatedSeats.push(seat);
    } else {
      alert("Bạn đã chọn đủ số ghế");
    }

    setSelectedSeats(updatedSeats);
    setShowTicketInfo(updatedSeats.length > 0);
  };

  const totalPrice = selectedSeats.length * trip.giaVe;

  const handleSelectSeats = () => {
    navigate("/dat-ve/thong-tin-ve", {
      state: {
        route,
        trip,
        chairBedData,
        selectedSeats,
        loaiXe: trip.loaiXe,
      },
    });
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      //style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="pageBed">
      <div className="sectionBed grid">
        <div className="explain flex">
          <div className="singleExplain flex">
            <FaSquare
              color="rgb(213, 217, 221)"
              className="icon"
              style={{ fontSize: "20px" }}
            />
            <span>&nbsp;Đã đặt </span>
          </div>
          <div className="singleExplain flex">
            <FaSquare
              color="rgb(222, 243, 255)"
              className="icon"
              style={{ fontSize: "20px" }}
            />
            <span>&nbsp;Còn trống</span>
          </div>
          <div className="singleExplain flex">
            <FaSquare
              color="rgb(253, 237, 232)"
              className="icon"
              style={{ fontSize: "20px" }}
            />
            <span>&nbsp;Đang chọn</span>
          </div>
        </div>
        {trip.loaiXe === "Giường" || trip.loaiXe === "Limousine" ? (
          <div className="bedInput flex">
            <div className="bedType_AB grid">
              <div className="titleBed flex">
                <div className="headerBed">
                  <h2>Tầng dưới</h2>
                </div>
                <div className="headerBed">
                  <h2>Tầng trên</h2>
                </div>
              </div>

              <div className="bedContainer flex">
                <div className="bed-A grid">
                  <div className="row_0 flex">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(0, 15),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>

                  <div className="row_1 grid">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(15, 17),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>

                  <div className="row_2 flex">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(17, 22),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>
                </div>
                <div className="bed-B grid">
                  <div className="row_0 flex">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(22, 37),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>
                  <div className="row_1 flex">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(37, 39),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>
                  <div className="row_2 flex">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(39, 44),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="chairInput">
            <div className="chairTypeNumber grid">
              <div className="headerChair">
                <h2>Tầng dưới</h2>
              </div>
              <div className="chair-number flex">
                <div className="chairNumber_left grid">
                  <div className="row grid">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(0, 14),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>
                </div>
                <div className="chairNumber_right flex">
                  <div className="row grid">
                    {chairBedData && chairBedData.seat_map && (
                      <SeatMap
                        chairBedData={{
                          seat_map: chairBedData.seat_map.slice(14, 29),
                        }}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showTicketInfo && (
          <div className="number-moneyTicket flex">
            <div className="ticketNumber grid">
              <div className="number flex">
                <span>{selectedSeats.length} vé</span>
              </div>
              <div className="codeTicket flex">
                <span className="flex">{selectedSeats.join(", ")}</span>
              </div>
            </div>
            <div className="total-amount grid">
              <div className="headerTotal">Tổng tiền</div>
              <div className="totalMoney">
                <span>{formatCurrency(totalPrice)} VNĐ</span>
              </div>
            </div>
            <div className="singleBtn flex">
              <button className="btn btnBlock flex" onClick={handleSelectSeats}>
                Chọn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select_chair;
