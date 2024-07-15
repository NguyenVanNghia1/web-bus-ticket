import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
//import img
import userImg from "../../../public/images/import-user.jpg";
import Category from "./Category";

const Account = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedAvatar, setUpdatedAvatar] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile")
      .then((response) => {
        setData(response.data);
        setUpdatedName(response.data.name);
        setUpdatedPhone(response.data.phone);
        setUpdatedAddress(response.data.diaChi);
        setUpdatedAvatar(response.data.avatar);
      })
      .catch((error) => console.log(error));
  }, []);

  function previewImage(event) {
    const image = document.getElementById("imagePreview");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        image.src = e.target.result;
        image.style.display = "block";
        setUpdatedAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  }

  const enableFields = () => {
    setIsDisabled(false);
    setIsEditing(true);
  };

  const updateUserInfo = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("updatedName", updatedName);
    formData.append("updatedPhone", updatedPhone);
    formData.append("updatedAddress", updatedAddress);
    if (updatedAvatar && updatedAvatar instanceof File) {
      formData.append("updatedAvatar", updatedAvatar); // Append the avatar file
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/update-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
      navigate("/account");
      setIsDisabled(true);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const imageUrl =
    updatedAvatar instanceof File
      ? URL.createObjectURL(updatedAvatar)
      : `http://localhost:4000${updatedAvatar}` || userImg;
  console.log("Image URL:", imageUrl);

  return (
    <div className="account select container">
      <div className="sectionContainer flex">
        <Category />

        <div className="rightContent grid">
          <div className="headerInformation flex">
            <h2>Thông tin tài khoản</h2>
          </div>
          <div className="contentInformation flex">
            <div className="accountImport grid">
              <div className="view">
                <img src={imageUrl} className="userImg" alt="User Avatar" />
                <img
                  id="imagePreview"
                  src="#"
                  alt="Selected Image"
                  style={{ display: "none" }}
                />
              </div>

              <div className="import grid">
                <input
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  onChange={previewImage}
                />
                <button
                  className="btn btnBlock flex "
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  Chọn ảnh
                </button>
              </div>
            </div>
            <div className="accountInformation grid">
              <div>
                Họ và tên: &nbsp;
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              <div>
                Số điện thoại: &nbsp;
                <input
                  type="text"
                  value={updatedPhone}
                  onChange={(e) => setUpdatedPhone(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              <div>Email: &nbsp; {data.email}</div>
              <div>
                Địa chỉ: &nbsp;
                <input
                  type="text"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              <div className="update flex">
                {!isEditing && (
                  <button className="btn btnBlock flex" onClick={enableFields}>
                    Chỉnh sửa
                  </button>
                )}
                {isEditing && (
                  <button
                    className="btn btnBlock flex"
                    onClick={updateUserInfo}
                    disabled={isDisabled}
                  >
                    Cập nhật
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
