import React, { useState } from "react";
import imgLogin from "../../../public/images/img_Login.jpg";
import axios from "axios";
import { IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("http://localhost:4000/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/dang-nhap");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login select container">
      <div className="sectionContainer grid">
        <div className="imgLogin">
          <img src={imgLogin} className="imgL" />
        </div>

        <form className="loginInput flex" onSubmit={handleSubmit}>
          <div className="header-login">
            <h2>Quên mật khẩu </h2>
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

          <div className="return">
            <a
              onClick={() => {
                navigate("/dang-nhap");
              }}
            >
              Quay lại
            </a>
          </div>

          <div className="btnSubmitLogin flex">
            <button className="btn btnBlock flex "> Gửi </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
