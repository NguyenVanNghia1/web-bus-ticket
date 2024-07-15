import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Category from "./Category";
import { UserContext } from "./UserContext";

//import icon
import { AiOutlineBarcode } from "react-icons/ai";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const History_Ticket = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchTickets = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(
            `http://localhost:4000/tickets/${user._id}`,
          );
          setTickets(response.data);
          setFilteredTickets(response.data);
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      }
    };

    fetchTickets();
  }, [user]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = tickets.filter((ticket) =>
      ticket.maVeXe.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredTickets(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentTickets = filteredTickets.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <div className="historyTicket">
      <div className="sectionContainer flex">
        <Category />

        <div className="ticketHistoryPage">
          <div className="headerHistoryTicket flex">
            <div className="headerHistory grid">
              <h1> Lịch sử mua vé</h1>
              <p>Theo dõi và quản lý quá trình lịch sử mua vé của bạn</p>
            </div>
            <div className="btnBooking flex">
              <button
                className="btn btnBlock flex"
                onClick={() => {
                  navigate("/lich-trinh");
                }}
              >
                Đặt vé
              </button>
            </div>
          </div>
          <div className="sectionContainerSearchTicketCode">
            <div className="searchContainer">
              <AiOutlineBarcode
                className="icon"
                color="rgb(225, 36, 36)"
                style={{ fontSize: "30px" }}
              />
              <input
                type="text"
                placeholder="Nhập Mã vé"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
          {filteredTickets.length > 0 ? (
            <>
              <table className="ticketTable">
                <thead>
                  <tr>
                    <th>Mã vé</th>
                    <th>Số vé</th>
                    <th>Tuyến đường</th>
                    <th>Ngày đi</th>
                    <th>Số tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTickets.map((ticket) => (
                    <tr key={ticket._id}>
                      <td>{ticket.maVeXe}</td>
                      <td>{ticket.soLuongGhe}</td>
                      <td>{ticket.tenTuyenXe}</td>
                      <td>{ticket.gioKhoiHanh}</td>
                      <td>{ticket.giaVe.toLocaleString("vi-VN")}đ</td>
                      <td>{ticket.trangThai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <span>Tổng số: {filteredTickets.length}</span>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="leftRight"
                >
                  <FaAngleDoubleLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <div className="number" key={index + 1}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="leftRight"
                >
                  <FaAngleDoubleRight />
                </button>
              </div>
            </>
          ) : (
            <p>Lịch sử mua vé trống</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History_Ticket;
