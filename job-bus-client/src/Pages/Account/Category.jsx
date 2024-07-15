import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

//import icon
import { MdAccountCircle } from "react-icons/md";
import { MdReplayCircleFilled } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (myPath) => {
    return location.pathname === myPath;
  };
  return (
    <div className="category  ">
      <div className="leftColumn grid">
        <div className="card grid">
          <div className="headerMenu flex">
            <h2>Danh mục</h2>
          </div>

          <aside>
            <ul className="leftMenu">
              <li
                className={
                  isActive("/account")
                    ? "single flex bg-gray-200"
                    : "single flex"
                }
              >
                <div className="iconDiv">
                  <MdAccountCircle
                    color="rgb(255, 171, 15)"
                    className="icon"
                    style={{ fontSize: "40px" }}
                  />
                </div>
                <Link to={"/account"}>Thông tin tài khoản</Link>
              </li>

              <li
                className={
                  isActive("/account/lich-su-mua-ve")
                    ? "single flex bg-gray-200"
                    : "single flex"
                }
              >
                <div className="iconDiv">
                  <MdReplayCircleFilled
                    color="rgb(87, 188, 249)"
                    className="icon"
                    style={{ fontSize: "40px" }}
                  />
                </div>
                <a
                  onClick={() => {
                    navigate("/account/lich-su-mua-ve");
                  }}
                >
                  Lịch sử mua vé
                </a>
              </li>

              <li
                className={
                  isActive("/account/dat-lai-mat-khau")
                    ? "single flex bg-gray-200"
                    : "single flex"
                }
              >
                <div className="iconDiv">
                  <MdOutlinePassword
                    color="rgb(242, 117, 78)"
                    className="icon"
                    style={{ fontSize: "40px" }}
                  />
                </div>
                <a
                  onClick={() => {
                    navigate("/account/dat-lai-mat-khau");
                  }}
                >
                  Đặt lại mật khẩu
                </a>
              </li>

              <li
                className={
                  isActive("/account/dang-xuat")
                    ? "single flex bg-gray-200"
                    : "single flex"
                }
              >
                <div className="iconDiv">
                  <IoLogOut
                    color="rgb(225, 36, 36)"
                    className="icon"
                    style={{ fontSize: "40px" }}
                  />
                </div>
                <a
                  onClick={() => {
                    navigate("/account/dang-xuat");
                  }}
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Category;
