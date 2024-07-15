import React, { useState, useContext } from "react";
import usePasswordToggle from "../../Hooks/usePasswordToggle";
import Category from "./Category";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
//import icon
import { FaAsterisk } from "react-icons/fa6";

const ResetPassword = () => {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useContext(UserContext);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      //console.error("Mật khẩu mới và xác nhận mật khẩu không khớp nhau.");
      return;
    }
    try {
      const response = await axios.post("/ud-password", {
        _id: user._id,
        currentPassword,
        newPassword,
      });
      console.log(response.data);
      navigate("/account");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="resetPassword select container">
      <div className="sectionContainer flex">
        <Category />

        <form
          className="contentReset container grid"
          onSubmit={handleChangePassword}
        >
          <div className="headerReset flex">
            <h2>Đặt lại mật khẩu</h2>
          </div>

          <div className="resetInput grid">
            <div className="singleInput flex">
              <div className="iconDiv">
                <FaAsterisk
                  className="icon"
                  color="rgb(225, 36, 36)"
                  style={{ fontSize: "10px" }}
                />
              </div>
              <div className="texts">
                <h4>Mật khẩu cũ</h4>
                <input
                  type={PasswordInputType}
                  placeholder="Nhập mật khẩu cũ"
                  value={currentPassword}
                  onChange={(ev) => setCurrentPassword(ev.target.value)}
                />
                <span className="password-toggle-icon">{ToggleIcon}</span>
              </div>
            </div>

            <div className="singleInput flex">
              <div className="iconDiv">
                <FaAsterisk
                  className="icon"
                  color="rgb(225, 36, 36)"
                  style={{ fontSize: "10px" }}
                />
              </div>
              <div className="texts">
                <h4>Mật khẩu mới</h4>
                <input
                  type={PasswordInputType}
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(ev) => setNewPassword(ev.target.value)}
                />
                <span className="password-toggle-icon">{ToggleIcon}</span>
              </div>
            </div>

            <div className="singleInput flex">
              <div className="iconDiv">
                <FaAsterisk
                  className="icon"
                  color="rgb(225, 36, 36)"
                  style={{ fontSize: "10px" }}
                />
              </div>
              <div className="texts">
                <h4>Xác nhận mật khẩu</h4>
                <input
                  type={PasswordInputType}
                  placeholder="Nhập lại mật khẩu "
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                />
                <span className="password-toggle-icon">{ToggleIcon}</span>
              </div>
            </div>

            <div className="confirm-cancel flex">
              <div className="btnCancel flex">
                <button
                  className="btn btnBlock flex "
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  Hủy
                </button>
              </div>

              <div className="btnConfirm flex">
                <button className="btn btnBlock flex " type="submit">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
