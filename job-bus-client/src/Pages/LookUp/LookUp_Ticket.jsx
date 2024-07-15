import React, { useContext, useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from "../Account/UserContext";
import axios from "axios";
import QRCode from "qrcode.react";
import domtoimage from "dom-to-image";
import imgLookUp from "../../../public/images/BG-LookUp.jpg";

//import icon
import { IoShareSocialOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";

const LookUp_Ticket = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeTicket, setCodeTicket] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const ticketRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile")
      .then((response) => {
        setData(response.data);
        setPhoneNumber(response.data.phone);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLookUp = () => {
    if (!phoneNumber || !codeTicket) {
      setErrorMessage("Vui lòng nhập đúng và đầy đủ thông tin.");
      return;
    }
    if (!isVerified) {
      setErrorMessage("Vui lòng hoàn thành reCAPTCHA.");
      return;
    }

    axios
      .post("http://localhost:4000/lookup-ticket", {
        phone: phoneNumber,
        maVeXe: codeTicket,
      })
      .then((response) => {
        if (response.data) {
          setTicketInfo(response.data);
        } else {
          setErrorMessage("Không tìm thấy vé nào với thông tin được cung cấp.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Đã xảy ra lỗi khi tra cứu vé.");
      });
  };

  const handleDownload = () => {
    const ticketElement = ticketRef.current;
    domtoimage
      .toPng(ticketElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `VANI_Bus_Lines-ticket-${ticketInfo.maVeXe}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing the element:", error);
      });
  };

  const handleShare = () => {
    const ticketElement = ticketRef.current;
    domtoimage
      .toBlob(ticketElement)
      .then((blob) => {
        const file = new File([blob], `ticket-${ticketInfo.maVeXe}.png`, {
          type: "image/png",
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              files: [file],
              title: `Ticket ${ticketInfo.maVeXe}`,
              text: `Check out my ticket for ${ticketInfo.tenChuyenXe}`,
            })
            .catch((error) => console.error("Error sharing:", error));
        } else {
          alert("Sharing not supported on this browser.");
        }
      })
      .catch((error) => {
        console.error("Error capturing the element:", error);
      });
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      //style: "currency",
      currency: "VND",
    });
  };

  const checkTicketValidity = (departureTime) => {
    const currentTime = new Date();
    const ticketTime = new Date(departureTime);
    return ticketTime > currentTime;
  };

  return (
    <div className="lookUp container">
      <div className="sectionContainer grid">
        <div className="lookUpInput grid">
          <div className="header-lookUp">
            <h1>TRA CỨU THÔNG TIN ĐẶT VÉ</h1>
          </div>

          <div className="singleInput flex">
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="singleInput flex">
            <input
              type="text"
              placeholder="Vui lòng nhập mã vé"
              value={codeTicket}
              onChange={(e) => setCodeTicket(e.target.value)}
            />
          </div>

          <div className="reCaptcha">
            <ReCAPTCHA
              sitekey="6LdPyPYpAAAAAH1sLy8WwC8vC4eqExb4jMYn5P9O"
              onChange={(value) => setIsVerified(!!value)}
            />
          </div>
          <div className="btnLookUp">
            <button className="btn btnBlock flex" onClick={handleLookUp}>
              Tra cứu
            </button>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        <div className="lineBackground"></div>

        {ticketInfo ? (
          <div className="ticketContainerSection flex" ref={ticketRef}>
            <div className="infoTicketContainer grid">
              <div className="bodyInfoTicket grid">
                <div className="headerBody flex">
                  <button className="share" onClick={handleShare}>
                    <IoShareSocialOutline />
                  </button>
                  <h4>Mã vé {ticketInfo.maVeXe}</h4>
                  <button className="download" onClick={handleDownload}>
                    <FaDownload />
                  </button>
                </div>

                <div className="qrCode flex">
                  <QRCode
                    value={`${ticketInfo.maVeXe}-${ticketInfo.maGhe}-${ticketInfo.tenChuyenXe}`}
                  />
                </div>

                <div className="contentBody grid">
                  <div className="contentLeft">
                    <p className="l1">Chuyến xe</p>
                    <p className="l2">Thời gian</p>
                    <p className="l3">Số ghế</p>
                    <p className="l4">Tuyến Xe</p>
                    <p className="l5">Điểm đón</p>
                    <p className="l6"> Điểm trả</p>
                    <p className="l7">Giá vé</p>
                  </div>
                  <div className="contentRight">
                    <p> {ticketInfo.tenChuyenXe} </p>
                    <p> {ticketInfo.gioKhoiHanh}</p>
                    <p> {ticketInfo.soLuongGhe}</p>
                    <p> {ticketInfo.tenTuyenXe}</p>
                    <p> {ticketInfo.diemDon}</p>
                    <p> {ticketInfo.diemTra}</p>
                    <p> {formatCurrency(ticketInfo.giaVe)} vnđ</p>
                  </div>
                </div>
              </div>
              <div className="footerInfoTicket">
                <p className="tb">
                  Mang mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến
                  ít nhất 60 phút.
                </p>
              </div>
            </div>
            <div className="ticketValidity">
              {checkTicketValidity(ticketInfo.gioKhoiHanh) ? (
                <p className="valid">Vé của chúng tôi vẫn còn hiệu lực.</p>
              ) : (
                <p className="expired">Vé của bạn đã hết hạn.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="backgroundLookUp">
            <img src={imgLookUp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LookUp_Ticket;
