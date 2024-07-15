import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

//import icon
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Success = () => {
  const location = useLocation();
  const { ticketsData } = location.state || {};
  const [tickets, setTickets] = useState([]);
  const ticketRefs = useRef([]);
  const ticketContainerRef = useRef(null);

  useEffect(() => {
    if (ticketsData) {
      setTickets(ticketsData);
    } else {
      axios
        .get("http://localhost:4000/tickets/latest")
        .then((response) => {
          setTickets(response.data);
        })
        .catch((error) => console.error("Error fetching ticket data:", error));
    }
  }, [ticketsData]);

  useEffect(() => {
    const container = ticketContainerRef.current;
    if (container) {
      if (tickets.length === 1) {
        container.style.justifyContent = "center";
      } else {
        container.style.justifyContent = "flex-start";
      }
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, [tickets]);

  if (!tickets.length) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      //style: "currency",
      currency: "VND",
    });
  };

  const totalTicketPrice = tickets.reduce(
    (total, ticket) => total + ticket.giaVe,
    0,
  );

  const handleDownload = (index) => {
    const ticketElement = ticketRefs.current[index];
    html2canvas(ticketElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `VANI_Bus_Lines-ticket-${tickets[index].maVeXe}.png`;
      link.click();
    });
  };

  const handleDownloadAll = () => {
    const promises = ticketRefs.current.map((ticketElement) =>
      html2canvas(ticketElement),
    );

    Promise.all(promises).then((canvases) => {
      const totalHeight = canvases.reduce(
        (sum, canvas) => sum + canvas.height,
        0,
      );
      const maxWidth = Math.max(...canvases.map((canvas) => canvas.width));

      const combinedCanvas = document.createElement("canvas");
      combinedCanvas.width = maxWidth;
      combinedCanvas.height = totalHeight;

      const ctx = combinedCanvas.getContext("2d");
      let yOffset = 0;

      canvases.forEach((canvas) => {
        ctx.drawImage(canvas, 0, yOffset);
        yOffset += canvas.height;
      });

      const link = document.createElement("a");
      link.href = combinedCanvas.toDataURL("image/png");
      link.download = "VANI_Bus_Lines-tickets.png";
      link.click();
    });
  };

  const handleShare = (index) => {
    const ticketElement = ticketRefs.current[index];
    html2canvas(ticketElement).then((canvas) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], `ticket-${tickets[index].maVeXe}.png`, {
          type: "image/png",
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              files: [file],
              title: `Ticket ${tickets[index].maVeXe}`,
              text: `Check out my ticket for ${tickets[index].tenChuyenXe}`,
            })
            .catch((error) => console.error("Error sharing:", error));
        } else {
          alert("Sharing not supported on this browser.");
        }
      });
    });
  };

  const handleShareAll = () => {
    const promises = ticketRefs.current.map((ticketElement) =>
      html2canvas(ticketElement),
    );

    Promise.all(promises).then((canvases) => {
      const files = canvases.map((canvas, index) => {
        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            const file = new File(
              [blob],
              `ticket-${tickets[index].maVeXe}.png`,
              {
                type: "image/png",
              },
            );
            resolve(file);
          });
        });
      });

      Promise.all(files).then((fileArray) => {
        if (navigator.canShare && navigator.canShare({ files: fileArray })) {
          navigator
            .share({
              files: fileArray,
              title: "All Tickets",
              text: "Check out all my purchased tickets",
            })
            .catch((error) => console.error("Error sharing:", error));
        } else {
          alert("Sharing not supported on this browser.");
        }
      });
    });
  };

  const scrollLeft = () => {
    const container = ticketContainerRef.current;
    container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = ticketContainerRef.current;
    container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="success">
      <div className="sectionContainerSuccess grid ">
        <div className="notification grid">
          <IoCheckmarkCircleSharp
            color="rgb(130, 223, 207)"
            className="icon"
            style={{ fontSize: "80px" }}
          />
          <h1>Mua vé xe thành công</h1>
          <p className="flex">
            VANI Bus Lines đã gửi thông tin về email &nbsp;
            <h4>{tickets[0]?.email}</h4>. Vui lòng kiểm tra lại.
          </p>
        </div>

        <div className="informationTicketContainer">
          <div className="headerInfoTicket flex">
            <h2>THÔNG TIN MUA VÉ</h2>
          </div>

          <div className="contentInformation flex">
            <div className="contentInfoTicket grid">
              <p className="c1 flex">
                Họ và tên:
                <h4>{tickets[0]?.tenKhachHang}</h4>
              </p>
              <p className="c2 flex">
                Số điện thoại:
                <h4>{tickets[0]?.phone}</h4>
              </p>
              <p className="c3 flex">
                Email:
                <h4>{tickets[0]?.email}</h4>
              </p>
              <p className="c4 flex">
                Tổng giá vé:
                <h4>{formatCurrency(totalTicketPrice)} vnđ</h4>
              </p>
              <p className="c5 flex">
                Trạng thái:
                <h4>{tickets[0]?.trangThai}</h4>
              </p>
            </div>
          </div>
          <button className="scrollButtonLeft" onClick={scrollLeft}>
            <IoChevronBack />
          </button>
          <div className="ticketContainerSection flex" ref={ticketContainerRef}>
            {tickets.map((ticket, index) => (
              <div
                key={ticket.maVeXe}
                className="infoTicketContainer grid"
                ref={(el) => (ticketRefs.current[index] = el)}
              >
                <div className="bodyInfoTicket grid">
                  <div className="headerBody flex">
                    <button
                      className="share"
                      onClick={() => handleShare(index)}
                    >
                      <IoShareSocialOutline />
                    </button>
                    <h4>Mã vé {ticket.maVeXe}</h4>
                    <button
                      className="download"
                      onClick={() => handleDownload(index)}
                    >
                      <FaDownload />{" "}
                    </button>
                  </div>

                  <div className="qrCode flex">
                    <QRCode
                      value={`${ticket.maVeXe}-${ticket.maGhe}-${ticket.tenChuyenXe}`}
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
                      <p>{ticket.tenChuyenXe} </p>
                      <p> {ticket.gioKhoiHanh}</p>
                      <p> {ticket.maGhe}</p>
                      <p> {ticket.tenTuyenXe}</p>
                      <p> {ticket.diemDon}</p>
                      <p> {ticket.diemTra}</p>
                      <p> {formatCurrency(ticket.giaVe)} vnđ</p>
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
            ))}
          </div>
          <button className="scrollButtonRight" onClick={scrollRight}>
            <IoChevronForward />
          </button>
          <div className="buttonContainer flex">
            <button className="btn flex" onClick={handleShareAll}>
              {" "}
              <IoShareSocialOutline /> Chia sẻ
            </button>
            <button className="btn flex" onClick={handleDownloadAll}>
              {" "}
              <FaDownload /> Tải xuống
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
