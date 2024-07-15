import React, { useState } from "react";
import imgLogin from "../../../public/images/img_Login.jpg";
import usePasswordToggle from "../../Hooks/usePasswordToggle";
import { useParams } from "react-router-dom";
import axios from "axios";
//import icon
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [password, setPassword] = useState("");
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post(`http://localhost:4000/reset-password/${id}/${token}`, { password })
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
            <h2>Cập nhật mật khẩu </h2>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <MdOutlinePassword color="rgb(156,163,175)" className="icon" />
            </div>
            <input
              type={PasswordInputType}
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <span className="password-toggle-icon">{ToggleIcon}</span>
          </div>

          <div className="return">
            <a
              onClick={() => {
                navigate("/quen-mat-khau");
              }}
            >
              Quay lại
            </a>
          </div>

          <div className="btnSubmitLogin flex">
            <button className="btn btnBlock flex " type="submit">
              {" "}
              Cập nhật{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
