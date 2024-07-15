import React, { useState } from "react";
import imgLogin from "../../../public/images/img_Login.jpg";
import { Navigate } from "react-router-dom";
//import icon
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import usePasswordToggle from "../../Hooks/usePasswordToggle";
import axios from "axios";

const Register = () => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        phone,
        password,
      });

      setRegistrationSuccess(true);
    } catch (e) {
      alert("Đăng ký không thành công. Vui lòng đăng ký lại");
    }
  }

  if (registrationSuccess) {
    return (
      <>
        <p>Đăng ký thành công. Bây giờ bạn có thể đăng nhập.</p>
        <Navigate to={"/dang-nhap"} />;
      </>
    );
  }

  return (
    <div className="login select container">
      <div className="sectionContainer grid">
        <div className="imgLogin">
          <img src={imgLogin} className="imgL" />
        </div>

        <form className="loginInput flex" onSubmit={registerUser}>
          <div className="header-login">
            <h2>Đăng ký tài khoản</h2>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <VscAccount color="rgb(156,163,175)" className="icon" />
            </div>
            <input
              type="text"
              placeholder="Nhập tên người dùng"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <IoMailOutline color="rgb(156,163,175)" className="icon" />
            </div>
            <input
              type="text"
              placeholder="Nhập email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <FaPhone color="rgb(156,163,175)" className="icon" />
            </div>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <MdOutlinePassword color="rgb(156,163,175)" className="icon" />
            </div>
            <input
              type={PasswordInputType}
              id="passwordInput"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <span className="password-toggle-icon">{ToggleIcon}</span>
          </div>

          <div className="btnSubmitRegister flex">
            <button className="btn btnBlock flex "> Tạo tài khoản </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
