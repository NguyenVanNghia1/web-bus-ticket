import React, { useContext, useState, useEffect } from "react";
//import images
import logo from "../../../public/images/Logo-1.png";
//import icons
import { MdLanguage } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
//import Navigate
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Pages/Account/UserContext";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (myPath) => {
    return location.pathname === myPath;
  };
  //loại bỏ Thanh điều hướng trong màn hình có chiều rộng nhỏ
  const [active, setActive] = useState("navBarMenu");
  const showNavBar = () => {
    setActive("navBarMenu showNavBar");
  };

  const removeNavBar = () => {
    setActive("navBarMenu");
  };

  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile", {
          withCredentials: true,
        });
        setUser(response.data);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  //thêm màu nền cho Thanh điều hướng thứ hai
  const [noBg, addBg] = useState("navBarTwo");

  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navbar_with_Bg");
    } else {
      addBg("navBarTwo");
    }
  };
  window.addEventListener("scroll", addBgColor);

  return (
    <div className="navBar flex">
      <div className="navBarOne flex">
        <div className="none flex">
          <li className="flex">
            <MdLanguage />
            Languages
          </li>
        </div>

        {!user ? (
          <div className="atb flex">
            <div className="iconDiv">
              <MdAccountCircle className="icon" />
            </div>
            <span
              className="flex"
              onClick={() => {
                navigate("dang-nhap");
              }}
            >
              Đăng nhập | Đăng ký
            </span>
          </div>
        ) : (
          <div className="atb flex">
            <div
              className="iconDiv"
              onClick={() => {
                navigate("account");
              }}
            >
              {avatar ? (
                <img
                  src={`http://localhost:4000${avatar}`}
                  alt="Avatar"
                  className="avatar"
                />
              ) : (
                <MdAccountCircle className="icon" />
              )}
            </div>
            <div
              onClick={() => {
                navigate("account");
              }}
            >
              {user.name}
            </div>
          </div>
        )}
      </div>

      <div className={noBg}>
        <div className="logoDiv">
          <img src={logo} className="Logo" />
        </div>

        <div className={active}>
          <ul className="menu flex">
            <li
              onClick={() => {
                removeNavBar();
                navigate("/");
              }}
              className={
                isActive("/")
                  ? "listItem flex h-12 w-40 justify-center rounded-3xl bg-gray-200 text-center"
                  : "listItem"
              }
            >
              TRANG CHỦ
            </li>

            <li
              onClick={() => {
                removeNavBar();
                navigate("lich-trinh");
              }}
              className={
                isActive("/lich-trinh")
                  ? "listItem flex h-12 w-40 justify-center rounded-3xl bg-gray-200 text-center"
                  : "listItem"
              }
            >
              LỊCH TRÌNH
            </li>

            <li
              onClick={() => {
                removeNavBar();
                navigate("tra-cuu");
              }}
              className={
                isActive("/tra-cuu")
                  ? "listItem flex h-12 w-40 justify-center rounded-3xl bg-gray-200 text-center"
                  : "listItem"
              }
            >
              TRA CỨU VÉ
            </li>

            <li
              onClick={() => {
                removeNavBar();
                navigate("tin-tuc");
              }}
              className={
                isActive("/tin-tuc")
                  ? "listItem flex h-12 w-40 justify-center rounded-3xl bg-gray-200 text-center"
                  : "listItem"
              }
            >
              TIN TỨC
            </li>

            <li onClick={removeNavBar} className="listItem">
              HÓA ĐƠN
            </li>
          </ul>

          <button
            onClick={() => {
              removeNavBar();
              navigate("lien-he");
            }}
            className="btn btnOne flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 pr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            Liên hệ
          </button>
        </div>

        <button
          onClick={() => {
            navigate("lien-he");
          }}
          className="btn btnTwo flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 pr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.970c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          Liên hệ
        </button>

        <div onClick={showNavBar} className="toggleIcon">
          <CgMenuGridO className="icon" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
