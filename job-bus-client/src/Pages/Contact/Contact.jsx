import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Account/UserContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

//import icon
import { RiMailSendLine } from "react-icons/ri";

const Contact = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const emailAddress = "2051120144@ut.edu.vn";
  const phoneNumber = "0329400938";
  const [emailSend, setEmailSend] = useState("");
  const [nameSend, setNameSend] = useState("");
  const [phoneSend, setPhoneSend] = useState("");
  const [titleSend, setTitleSend] = useState("");
  const [contentSend, setContentSend] = useState("");
  const [sendInformation, setSendInformation] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile")
      .then((response) => {
        setData(response.data);
        setPhoneSend(response.data.phone);
        setEmailSend(response.data.email);
        setNameSend(response.data.name);
      })
      .catch((error) => console.log(error));
  }, []);

  const id = user?._id;

  async function handleSend(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/send-contact", {
        id,
        nameSend,
        emailSend,
        phoneSend,
        titleSend,
        contentSend,
      });
      setSendInformation(true);
      alert("Gửi thông tin liên hệ thành công ");
    } catch (e) {
      alert("Gửi thông tin liên hệ thất bại. Vui lòng kiểm tra lại thông tin ");
    }
  }

  useEffect(() => {
    if (sendInformation) {
      navigate("/lien-he", { replace: true });
      window.location.reload();
    }
  }, [sendInformation, navigate]);

  return (
    <div className="contact select container">
      <div className="sectionContainer flex">
        <div className="contactText grid">
          <div className="header-contact">
            <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>
          </div>

          <div className="contact-content">
            <p className="text-base font-semibold text-red-500">
              CÔNG TY CỔ PHẦN XE KHÁCH VANI - VANI BUS LINES
            </p>

            <div className="single-contact-content flex">
              <p>Địa chỉ: </p>
              <a className="text-slate-950">
                &nbsp;Lầu 4, số 796/17/24 Lê Đức Thọ, Phường 15, Quận Gò Vấp,
                TP.HCM
              </a>
            </div>

            <div className="single-contact-content flex">
              <p>Website: </p>
              <a
                onClick={() => {
                  navigate("/");
                }}
              >
                &nbsp;http://localhost:5173/
              </a>
            </div>

            <div className="single-contact-content flex">
              <p>Điện thoại: </p>
              <a href={`tel:${phoneNumber}`}>&nbsp;0329400938</a>
            </div>

            <div className="single-contact-content flex">
              <p>Email: </p>
              <a href={`mailto:${emailAddress}`}>&nbsp;2051120144@ut.edu.vn</a>
            </div>
          </div>
        </div>

        <form className="contactInput grid" onSubmit={handleSend}>
          <div className="headerInput flex">
            <RiMailSendLine size={35} className="icon" />
            <h2>&nbsp;Gửi thông tin liên hệ đến với chúng tôi</h2>
          </div>
          <div className="singleInput flex">
            <div className="information flex">
              <input
                type="text"
                placeholder="Họ và tên"
                value={nameSend}
                onChange={(e) => setNameSend(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={emailSend}
                onChange={(e) => setEmailSend(e.target.value)}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phoneSend}
                onChange={(e) => setPhoneSend(e.target.value)}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="title">
              <input
                type="text"
                placeholder="Nhập tiêu đề"
                value={titleSend}
                onChange={(e) => setTitleSend(e.target.value)}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="content">
              <textarea
                rows="5"
                cols="50"
                name="message"
                placeholder="Nhập ghi chú"
                value={contentSend}
                onChange={(e) => setContentSend(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="send flex">
            <button className="btn btnBlock flex " type="submit">
              {" "}
              Gửi{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
