import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Category from "./Category";

const Logout = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/dang-nhap"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="logout select container">
      <div className="sectionContainer flex">
        <Category />

        <div className="notification">
          <div className="rightLogout grid">
            <div className="headerLogout flex">
              <h2>Bạn có chắn chắn muốn đăng xuất tài khoản hay không ?</h2>
            </div>
            <div className="confirm-cancel flex">
              <div className="btnCancel flex">
                <button
                  className="btn btnBlock flex "
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  {" "}
                  Hủy{" "}
                </button>
              </div>
              <div className="btnConfirm flex">
                <button className="btn btnBlock flex " onClick={logout}>
                  {" "}
                  Xác nhận{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
