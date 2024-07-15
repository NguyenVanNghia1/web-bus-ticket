import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
//import icon
import { TbPoint } from "react-icons/tb";
import { CgEditBlackPoint } from "react-icons/cg";
import { RiMapPinFill } from "react-icons/ri";
import Select_chair from "../Select_chair";
import Transshipment from "./Transshipment";
import Policy from "./Policy";

const ticket = ({
  selectedTimeRanges,
  selectedVehicleType,
  onTripSelect,
  filteredTrips,
  selectedSeats,
  route,
}) => {
  // const location = useLocation();
  // const { filteredTrips } = location.state || {};
  const [diemDi, setDiemDi] = useState(" ");
  const [diemDen, setDiemDen] = useState(" ");
  const X = filteredTrips?.[0]?.maTuyenXe;
  const navigate = useNavigate();

  const [showSelectChair, setShowSelectChair] = useState({});
  const [showTransshipment, setShowTransshipment] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [activeContainer, setActiveContainer] = useState(null);
  const [chairButtonColor, setChairButtonColor] = useState({
    ghe: false,
    trungChuyen: false,
    chinhSach: false,
  });
  const [availableSeats, setAvailableSeats] = useState({});

  useEffect(() => {
    axios.get("http://localhost:4000/route-bus").then((response) => {
      console.log(response.data);
      const trip = response.data.find((t) => t._id === X);
      setDiemDi(trip?.diemDi);
      setDiemDen(trip?.diemDen);
    });
  }, [X]);

  const fetchAvailableSeats = async (tripId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/available-seats/${tripId}`,
      );
      const { availableSeatsCount } = response.data;
      console.log(
        "Available seats count for trip",
        tripId,
        ":",
        availableSeatsCount,
      ); // Log the count
      setAvailableSeats((prevSeats) => ({
        ...prevSeats,
        [tripId]: availableSeatsCount,
      }));
    } catch (error) {
      console.error("Error fetching available seats:", error);
    }
  };

  const handleSelectChairClick = async (tripId) => {
    try {
      // Toggle the visibility of the chair selection
      setShowSelectChair((prevShowSelectChair) => {
        const isCurrentlyVisible = !!prevShowSelectChair[tripId];
        if (isCurrentlyVisible) {
          return {
            ...prevShowSelectChair,
            [tripId]: false,
          };
        } else {
          axios
            .get(`http://localhost:4000/chair-bed/${tripId}`)
            .then((response) => {
              const chairBedData = response.data;
              setShowSelectChair((prevShowSelectChair) => ({
                ...prevShowSelectChair,
                [tripId]: chairBedData,
              }));
              fetchAvailableSeats(tripId);
            })
            .catch((error) => {
              console.error("Error fetching chair-bed data:", error);
            });
          return {
            ...prevShowSelectChair,
            [tripId]: true,
          };
        }
      });
      setChairButtonColor((prevButtons) => ({
        [tripId]: { ...prevButtons[tripId], ghe: !prevButtons[tripId]?.ghe },
      }));
      setShowTransshipment(false);
      setShowPolicy(false);
      setChairButtonColor((prevButtons) => ({
        [tripId]: {
          ...prevButtons[tripId],
          trungChuyen: false,
          chinhSach: false,
        },
      }));
    } catch (error) {
      console.error("Error fetching chair-bed data:", error);
    }
  };

  const handleTransshipmentClick = (tripId) => {
    setShowTransshipment((prevShowTransshipment) => ({
      ...prevShowTransshipment,
      [tripId]: !prevShowTransshipment[tripId],
    }));
    setChairButtonColor((prevButtons) => ({
      [tripId]: {
        ...prevButtons[tripId],
        trungChuyen: !prevButtons[tripId]?.trungChuyen,
      },
    }));
    if (showTransshipment) {
      setShowTransshipment(false);
    }
    setShowSelectChair(false);
    setShowPolicy(false);
    setChairButtonColor((prevButtons) => ({
      [tripId]: {
        ...prevButtons[tripId],
        ghe: false,
        chinhSach: false,
      },
    }));
  };

  const handlePolicyClick = (tripId) => {
    setShowPolicy((prevShowPolicy) => ({
      ...prevShowPolicy,
      [tripId]: !prevShowPolicy[tripId],
    }));
    setChairButtonColor((prevButtons) => ({
      [tripId]: {
        ...prevButtons[tripId],
        chinhSach: !prevButtons[tripId]?.chinhSach,
      },
    }));
    if (showPolicy) {
      setShowPolicy(false);
    }
    setShowSelectChair(false);
    setShowTransshipment(false);
    setChairButtonColor((prevButtons) => ({
      [tripId]: {
        ...prevButtons[tripId],
        trungChuyen: false,
        ghe: false,
      },
    }));
  };
  const handleContainerClick = (trip) => {
    setActiveContainer(trip._id);
    onTripSelect(trip);
    // setShowSelectChair({});
    // setShowTransshipment({});
    // setShowPolicy({});
    // setChairButtonColor({});
  };

  const getButtonColor = (tripId, buttonName) => {
    return chairButtonColor[tripId]?.[buttonName] ? "rgb(239, 82, 34)" : "";
  };

  const filterTripsByTimeRange = (trip) => {
    if (selectedTimeRanges.length === 0) return true;
    const tripTime = trip.gioDi;
    return selectedTimeRanges.some((range) => {
      const [start, end] = range.split("-");
      return tripTime >= start && tripTime < end;
    });
  };

  const filterTripsByVehicleType = (trip) => {
    if (!selectedVehicleType) return true;
    return trip.loaiXe === selectedVehicleType;
  };

  // Updated function to handle trip selection and navigation
  const handleSelectTrip = (trip) => {
    navigate("/dat-ve/thong-tin-ve", {
      state: {
        route,
        trip,
        chairBedData: showSelectChair[trip._id],
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
    <div className="ticket container">
      <div className="header flex">
        <h1>
          {diemDi} - {diemDen}
        </h1>
      </div>
      {filteredTrips && filteredTrips.length > 0 ? (
        filteredTrips
          .filter(filterTripsByTimeRange)
          .filter(filterTripsByVehicleType)
          .map((trip, index) => (
            <div
              key={index}
              className="sectionContainer grid"
              style={{
                borderColor:
                  activeContainer === trip._id ? "rgb(239, 82, 34)" : "",
              }}
              onClick={() => handleContainerClick(trip)}
            >
              <div className="contentTicket grid">
                <div className="detail flex">
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

                  <div className="moneyContainer grid">
                    <div className="type flex">
                      <div className="singleType flex">
                        <TbPoint
                          color="rgb(156,163,175)"
                          className="icon"
                          style={{ fontSize: "20px" }}
                        />
                        <span>{trip.loaiXe}</span>
                      </div>
                      <div className="singleType flex">
                        <TbPoint
                          color="rgb(156,163,175)"
                          className="icon"
                          style={{ fontSize: "20px" }}
                        />
                        <span>{availableSeats[trip._id]} chỗ trống</span>
                      </div>
                    </div>
                    <div className="money">
                      <span>{formatCurrency(trip.giaVe)} vnđ</span>
                    </div>
                  </div>
                </div>

                <div className="note">
                  <p>
                    {" "}
                    <u>Lưu ý:</u> Qúy khách đang chọn tuyến xe có lộ trình tốt
                    nhất và tiết kiệm thời gian nhất. Lưu ý không nhận đón/ trả
                    dọc đường quốc lộ 1A. Cần hỗ trợ thêm thông tin vui lòng
                    liên hệ hotline 0329400938.
                  </p>
                </div>
              </div>

              <div className="divide"> </div>

              <div className="navbar flex">
                <div className="singleBtn flex">
                  <button
                    className="btnNav"
                    onClick={() => handleSelectChairClick(trip._id)}
                    style={{
                      color: getButtonColor(trip._id, "ghe"),
                      borderColor: getButtonColor(trip._id, "ghe"),
                    }}
                    name="ghe"
                  >
                    Ghế
                  </button>
                  <button
                    className="btnNav"
                    onClick={() => handleTransshipmentClick(trip._id)}
                    style={{
                      color: getButtonColor(trip._id, "trungChuyen"),
                      borderColor: getButtonColor(trip._id, "trungChuyen"),
                    }}
                    name="trungChuyen"
                  >
                    Trung chuyển
                  </button>
                  <button
                    className="btnNav"
                    onClick={() => handlePolicyClick(trip._id)}
                    style={{
                      color: getButtonColor(trip._id, "chinhSach"),
                      borderColor: getButtonColor(trip._id, "chinhSach"),
                    }}
                    name="chinhSach"
                  >
                    Chính sách
                  </button>
                </div>
                <div className="singleBtn flex">
                  <button
                    className="btn btnBlock flex"
                    onClick={() => handleSelectTrip(trip)}
                  >
                    Chọn chuyến
                  </button>
                </div>
              </div>
              <div>
                {showSelectChair[trip._id] && (
                  <Select_chair
                    route={route}
                    trip={trip}
                    chairBedData={showSelectChair[trip._id]}
                  />
                )}
              </div>
              <div>{showTransshipment[trip._id] && <Transshipment />}</div>
              <div>{showPolicy[trip._id] && <Policy />}</div>
            </div>
          ))
      ) : (
        <p>No properties</p>
      )}
    </div>
  );
};

export default ticket;
