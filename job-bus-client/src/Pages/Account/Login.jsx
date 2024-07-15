import React, { useContext, useState } from "react";
import imgLogin from "../../../public/images/img_Login.jpg";
import axios from "axios";
//import icon
import { FaPhone } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import usePasswordToggle from "../../Hooks/usePasswordToggle";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Đăng nhập thành công");
      if (data.email === "adminVANI.@gmail.com") {
        setRedirectPath("/admin/trang-chu");
      }
      setRedirect(true);
    } catch (e) {
      alert("Đăng nhập không thành công");
    }
  }

  if (redirect) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="login select container">
      <div className="sectionContainer grid">
        <div className="imgLogin">
          <img src={imgLogin} className="imgL" />
        </div>

        <form className="loginInput flex" onSubmit={handleLoginSubmit}>
          <div className="header-login">
            <h2>Đăng nhập tài khoản </h2>
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

          <div className="forgot-password">
            <a
              onClick={() => {
                navigate("/quen-mat-khau");
              }}
            >
              Quên mật khẩu?
            </a>
          </div>

          <div
            className="register"
            onClick={() => {
              navigate("/dang-ky");
            }}
          >
            <a>Bạn có tài khoản chưa? Đăng ký tài khoản </a>
          </div>

          <div className="btnSubmitLogin flex">
            <button className="btn btnBlock flex "> Đăng nhập </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
