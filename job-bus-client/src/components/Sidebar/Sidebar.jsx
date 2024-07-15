import React from "react";
import { NavLink } from "react-router-dom";

//import icon
import {
  FaHome,
  FaTruck,
  FaBus,
  FaFileAlt,
  FaTicketAlt,
  FaReceipt,
  FaChartBar,
  FaClipboard,
} from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import imgLogo from "../../../public/images/Logo.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={imgLogo} alt="Logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/admin/trang-chu"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaHome /> Home
        </NavLink>
        <NavLink
          to="/admin/tuyen-xe"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaTruck /> Tuyến Xe
        </NavLink>
        <NavLink
          to="/admin/chuyen-xe"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaBus /> Chuyến xe
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaFileAlt /> Hồ Sơ Khách Hàng
        </NavLink>
        <NavLink
          to="/admin/books"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaTicketAlt /> Vé Xe
        </NavLink>
        <NavLink
          to="/admin/books"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <BiSupport /> Hỗ Trợ Khách Hàng
        </NavLink>
        <NavLink
          to="/admin/invoices"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaReceipt /> Hóa Đơn Thanh Toán
        </NavLink>
        <NavLink
          to="/admin/statistics"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaChartBar /> Thống Kê
        </NavLink>
        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaClipboard /> Báo Cáo
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
