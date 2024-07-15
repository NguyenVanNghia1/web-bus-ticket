import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../src/Pages/Account/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { IoInformationCircleOutline } from "react-icons/io5";
import zaloPayImg from "../../../public/images/zaloPay.png";
import qrCodeImg from "../../../public/images/qrcode.png";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { trip, selectedSeats, nameTicket, phoneTicket, emailTicket, route } =
    location.state || {};

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
  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handlePaymentConfirmation = async () => {
    const ticketsData = selectedSeats.map((seat) => ({
      maVeXe: generateRandomCode(),
      tenKhachHang: nameTicket,
      phone: phoneTicket,
      email: emailTicket,
      tenTuyenXe: `${route.diemDi} - ${route.diemDen}`,
      tenChuyenXe: `${trip.diemDi} - ${trip.diemDen}`,
      diemDon: `${trip.diemDi}`,
      diemTra: `${trip.diemDen}`,
      gioKhoiHanh: `${trip.gioDi} ${formattedDate}`,
      soLuongGhe: "1",
      maGhe: seat,
      giaVe: trip.giaVe,
      maChuyenXe: trip._id,
      maKhachHang: user._id,
      trangThai: "Đã thanh toán",
    }));

    try {
      await Promise.all(
        ticketsData.map((ticketData) =>
          axios.post("http://localhost:4000/tickets", ticketData),
        ),
      );
      await axios.post("http://localhost:4000/update-seats-status", {
        maChuyenXe: trip._id,
        selectedSeats,
      });
      navigate("/ve-xe", { state: { ticketsData } });
    } catch (error) {
      console.error("Error creating tickets or updating seat status:", error);
    }
  };

  return (
    <div className="paymentPage">
      <div className="paymentContainer flex">
        <div className="leftContainer grid">
          <h2>Chọn phương thức thanh toán</h2>
          <div className="paymentMethod flex">
            <input
              type="radio"
              id="zaloPay"
              name="paymentMethod"
              value="zaloPay"
              checked
            />
            <label htmlFor="zaloPay" className="logoMoMo flex">
              <img src={zaloPayImg} />
              <span>ZaloPay</span>
            </label>
          </div>
        </div>
        <div className="centerContainer grid">
          <div className="qrCodeContainer">
            <h3>Tổng thanh toán</h3>
            <span className="totalAmount">
              {formatCurrency(selectedSeats.length * trip.giaVe)} vnđ
            </span>
            <div className="qrContainer grid">
              <div className="qrCode">
                <img src={qrCodeImg} />
              </div>
              <div className="paymentInstructions">
                <h4>Hướng dẫn thanh toán bằng ZaloPay</h4>
                <ol>
                  <li>Mở ứng dụng ZaloPay trên điện thoại</li>
                  <li>
                    Dùng biểu tượng <strong>QR</strong> để quét mã QR
                  </li>
                  <li>Quét mã ở trang này và thanh toán</li>
                </ol>
              </div>
            </div>
            <div className="paySubmit">
              <button
                className="btn btnBlock flex "
                onClick={handlePaymentConfirmation}
              >
                {" "}
                Xác nhận thanh toán{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="rightContainer grid">
          <div className="customerInfo grid">
            <h2>Thông tin hành khách</h2>
            <p>Họ và tên: {nameTicket}</p>
            <p>Số điện thoại: {phoneTicket}</p>
            <p>Email: {emailTicket}</p>
          </div>
          <div className="tripInfo grid">
            <h2>Thông tin lượt đi</h2>
            <p>
              Tuyến xe: {route.diemDi} - {route.diemDen}
            </p>
            <p>
              Chuyến xe: {trip.diemDi} - {trip.diemDen}
            </p>
            <p>
              Thời gian xuất bến: {trip.gioDi} {formattedDate}
            </p>
            <p>Số lượng ghế: {selectedSeats.length} ghế</p>
            <p>Số ghế: {selectedSeats.join(", ")}</p>
            <p>Điểm đón: {trip.diemDi}</p>
            <p>Địa điểm trả khách: {trip.diemDen}</p>
            <p>
              Tổng tiền lượt đi:{" "}
              {formatCurrency(selectedSeats.length * trip.giaVe)} vnđ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
