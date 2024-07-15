import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Account/UserContext";
import { useNavigate } from "react-router-dom";
import Select_chair from "../Select_chair";
import SeatMap from "../SeatMap";
//import icon
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaSquare } from "react-icons/fa";

const Index_InformationTicket = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const [nameTicket, setNameTicket] = useState("");
  const [phoneTicket, setPhoneTicket] = useState("");
  const [emailTicket, setEmailTicket] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    route,
    trip,
    chairBedData,
    selectedSeats: initialSelectedSeats,
    loaiXe,
  } = location.state || {};

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile")
      .then((response) => {
        setData(response.data);
        setPhoneTicket(response.data.phone);
        setEmailTicket(response.data.email);
        setNameTicket(response.data.name);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (initialSelectedSeats) {
      setSelectedSeats(initialSelectedSeats);
    }
  }, [initialSelectedSeats]);

  const handleSeatClick = (seat) => {
    let updatedSeats = [...selectedSeats];

    if (selectedSeats.includes(seat)) {
      updatedSeats = updatedSeats.filter(
        (selectedSeat) => selectedSeat !== seat,
      );
    } else if (selectedSeats.length < 5) {
      updatedSeats.push(seat);
    } else {
      alert("Bạn đã chọn đủ sô ghế");
    }

    setSelectedSeats(updatedSeats);
  };

  const handlePaymentClick = () => {
    if (!user) {
      if (
        window.confirm(
          "Bạn cần đăng nhập trước khi thanh toán. Bạn có muốn đăng nhập không?",
        )
      ) {
        navigate("/dang-nhap");
      }
      return;
    }

    if (!nameTicket || !phoneTicket || !emailTicket) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng trước khi thanh toán.");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ghế trước khi thanh toán.");
      return;
    }
    navigate("/thanh-toan", {
      state: {
        route,
        trip,
        selectedSeats,
        nameTicket,
        phoneTicket,
        emailTicket,
      },
    });
  };

  const formattedDate = new Date(trip.ngayDi).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      //style: "currency",
      currency: "VND",
    });
  };

  const slicedChairBedData_1 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(0, 15),
  };
  const slicedChairBedData_2 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(15, 17),
  };
  const slicedChairBedData_3 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(17, 22),
  };
  const slicedChairBedData_4 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(22, 37),
  };
  const slicedChairBedData_5 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(37, 39),
  };
  const slicedChairBedData_6 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(39, 44),
  };

  const slicedChairData_1 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(0, 14),
  };
  const slicedChairData_2 = {
    ...chairBedData,
    seat_map: chairBedData?.seat_map.slice(14, 29),
  };
  return (
    <div className="informationTicket pb-60 pt-60">
      <div className="sectionContainerInfo flex">
        <div className="leftContainer grid">
          <div className="chooseChair grid">
            <div className="headerChooseChair flex">
              <h2>Chọn ghế</h2>
            </div>
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
            {loaiXe === "Giường" || loaiXe === "Limousine" ? (
              <div className="chooseChair-Bed flex">
                <div className="chooseChair-Bed_Type-A grid">
                  <div className="chooseChair-Bed_1 flex">
                    {slicedChairBedData_1 && slicedChairBedData_1.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairBedData_1}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                  <div className="chooseChair-Bed_2 flex">
                    {slicedChairBedData_2 && slicedChairBedData_2.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairBedData_2}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                  <div className="chooseChair-Bed_3 flex">
                    {slicedChairBedData_3 && slicedChairBedData_3.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairBedData_3}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                </div>
                <div className="chooseChair-Bed_Type-B grid">
                  <div className="chooseChair-Bed_1 flex">
                    {slicedChairBedData_4 && slicedChairBedData_4.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairBedData_4}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                  <div className="chooseChair-Bed_2 flex">
                    {slicedChairBedData_5 && slicedChairBedData_5.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairBedData_5}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                  <div className="chooseChair-Bed_3 flex">
                    {slicedChairBedData_6 && slicedChairBedData_6.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairBedData_6}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="chooseChaiNumber flex">
                <div className="chooseChair-Type-A grid">
                  <div className="chooseChair_1 grid">
                    {slicedChairData_1 && slicedChairData_1.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairData_1}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                </div>
                <div className="chooseChair_Type-B grid">
                  <div className="chooseChair_1 grid">
                    {slicedChairData_2 && slicedChairData_2.seat_map ? (
                      <SeatMap
                        chairBedData={slicedChairData_2}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ) : (
                      <p>No properties</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="selectSeat grid">
              <h4>Ghế đã chọn:</h4>
              <p className="codeChair">{selectedSeats.join(", ")}</p>
            </div>
          </div>
          <div className="informationUser flex">
            <div className="leftInformation grid">
              <div className="headerInfoUser">
                <h2>Thông tin khách hàng</h2>
              </div>
              <div className="singleInformationInput grid">
                <h4 className="titleInput"> Họ và tên </h4>
                <input
                  className="inputInfoUser"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={nameTicket}
                  onChange={(e) => setNameTicket(e.target.value)}
                />
              </div>
              <div className="singleInformationInput grid">
                <h4 className="titleInput">Số điện thoại </h4>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="inputInfoUser"
                  value={phoneTicket}
                  onChange={(e) => setPhoneTicket(e.target.value)}
                />
              </div>
              <div className="singleInformationInput grid">
                <h4 className="titleInput"> Email </h4>
                <input
                  className="inputInfoUser"
                  type="text"
                  placeholder="Nhập email"
                  value={emailTicket}
                  onChange={(e) => setEmailTicket(e.target.value)}
                />
              </div>
            </div>
            <div className="rightInformation grid">
              <div className="headerRules">
                <h2>ĐIỀU KHOẢN & LƯU Ý</h2>
              </div>
              <div className="contentRules grid">
                <p className="noiDung">
                  (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước
                  ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh
                  toán vé thành công có chứa mã vé được gửi từ hệ thống VANI BUS
                  LINE. Vui lòng liên hệ Trung tâm tổng đài 0329400938 để được
                  hỗ trợ.
                </p>
              </div>
            </div>
          </div>
          <div className="informationPick-Drop grid">
            <div className="headerPick-Drop flex">
              <h2 className="headerPD">Thông tin đón trả</h2>
              <IoInformationCircleOutline
                color="rgb(225, 36, 36)"
                className="icon"
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="contentPick-Drop flex">
              <div className="leftPick grid">
                <h4>ĐIỂM ĐÓN</h4>
                <input
                  type="text"
                  placeholder="Nhập điểm đón"
                  value={trip?.diemDi || ""}
                  readOnly
                />
                <span className="contentPick">
                  Quý khách vui lòng có mặt tại Bến xe/Văn Phòng trước 30 phút
                  để được kiểm tra thông tin trước khi lên xe.
                </span>
              </div>
              <div className="line"></div>
              <div className="rightDrop grid">
                <h4>ĐIỂM TRẢ</h4>
                <input
                  type="text"
                  placeholder="Nhập điểm đến"
                  value={trip?.diemDen || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="pay flex">
            <span className="totalMoney">
              {formatCurrency(selectedSeats.length * trip.giaVe) || "0"} vnđ
            </span>
            <div className="btnSubmitCancel flex">
              <button
                className="btn btnBlock flex "
                onClick={() => {
                  navigate("/lich-trinh");
                }}
              >
                {" "}
                Hủy
              </button>
            </div>
            <div className="btnSubmitPay flex">
              <button
                className="btn btnBlock flex"
                onClick={handlePaymentClick}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        <div className="rightContainer grid">
          <div className="departureInformation grid">
            <h2 className="headerInfoDeparture">Thông tin lượt đi</h2>
            <div className="singleInfoDeparture">
              <h4>Tuyến Xe</h4>
              <div className="infoDeparture flex">
                <span>
                  {route?.diemDi} - {route?.diemDen}
                </span>
              </div>
            </div>
            <div className="singleInfoDeparture">
              <h4>Chuyến Xe</h4>
              <div className="infoDeparture flex">
                <span>
                  {trip?.diemDi} - {trip?.diemDen}
                </span>
              </div>
            </div>
            <div className="singleInfoDeparture">
              <h4>Thời gian xuất bến</h4>
              <div className="infoDeparture flex">
                <span>
                  {trip?.gioDi} {formattedDate}
                </span>
              </div>
            </div>
            <div className="singleInfoDeparture">
              <h4>Số lượng ghế</h4>
              <div className="infoDeparture flex">
                <span>{selectedSeats?.length || "0"} ghế</span>
              </div>
            </div>
            <div className="singleInfoDeparture">
              <h4>Số ghế</h4>
              <div className="infoDeparture flex">
                <span>{selectedSeats?.join(", ") || "--"}</span>
              </div>
            </div>
            <div className="singleInfoDeparture">
              <h4>Tổng tiền lượt đi</h4>
              <div className="infoDeparture flex">
                <span>
                  {formatCurrency(selectedSeats.length * trip.giaVe) || "0"} vnđ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index_InformationTicket;
