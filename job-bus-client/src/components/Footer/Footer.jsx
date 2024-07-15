import React from "react";
import Logo from "../../../public/images/Logo-home.png";

import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
//import Navigate
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const emailAddress = "2051120144@ut.edu.vn";
  const phoneNumber = "0329400938";
  return (
    <div className="footer">
      <div className="sectionContainer container grid">
        <div className="gridOne">
          <div className="logoDiv">
            <img src={Logo} className="Logo" />
          </div>
          <span className="font-bold text-red-600"> VANI</span>
          <span className="font-bold text-green-600"> Bus Lines</span>
          <div className="socialIcon flex">
            <a href="https://www.facebook.com/profile.php?id=100070221291248&mibextid=LQQJ4d">
              <TiSocialFacebook className="icon" />
            </a>
            <a href="https://www.youtube.com/@nguyenvannghia2286">
              <TiSocialYoutube className="icon" />
            </a>
            <a href={`mailto:${emailAddress}`}>
              <MdEmail className="icon" />
            </a>
            <a href={`tel:${phoneNumber}`}>
              <FaPhoneAlt className="icon" />
            </a>
          </div>
        </div>

        <div className="footerLinks">
          <span className="linkTitles"> Giới Thiệu</span>
          <p>CÔNG TY CỔ PHẦN XE KHÁCH VĂN NGHĨA - VANI BUS LINES </p>
          <p>
            ĐC: Lầu 4, số 796/17/24 Lê Đức Thọ, Phường 15, Quận Gò Vấp, TP.HCM
          </p>
          <p>
            VANI BUS LINES mang đến sự an toàn cho khách hàng trên mọi nẻo
            đường.
          </p>
        </div>

        <div className="footerLinks">
          <span className="linkTitles">Về chúng tôi </span>
          <li>
            <a
              onClick={() => {
                navigate("/");
              }}
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("lich-trinh");
              }}
            >
              Lịch trình
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("tra-cuu");
              }}
            >
              Tra cứu vé
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("tin-tuc");
              }}
            >
              Tin tức
            </a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitles">Hỗ trợ</span>
          <li>
            <a href="#">Điều khoản sử dụng</a>
          </li>
          <li>
            <a href="#">Hướng dãn đặt vé trên app</a>
          </li>
        </div>
      </div>

      <div className="copyRightDiv flex">
        <p>
          2024 | Bản quyền thuộc về Công ty Cổ Phần Xe khách VANI - VANI Bus
          Lines 2024 | Chịu trách nhiệm quản lý nội dung: Ông Nguyễn Văn Nghĩa
        </p>
      </div>
    </div>
  );
};

export default Footer;
