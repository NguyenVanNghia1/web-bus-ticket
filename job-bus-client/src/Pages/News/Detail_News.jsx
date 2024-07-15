import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FcNext } from "react-icons/fc";

const Detail_News = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/news/${id}`)
      .then((response) => {
        setNewsDetail(response.data);
        return axios.get(
          `http://localhost:4000/news/related/${response.data.chuDe}`,
        );
      })
      .then((response) => {
        const filteredRelatedNews = response.data
          .filter((item) => item._id !== id)
          .slice(0, 4);
        setRelatedNews(filteredRelatedNews);
      })
      .catch((error) => {
        console.error("Error fetching news details:", error);
      });
  }, [id]);

  if (!newsDetail) {
    return <div>Loading...</div>;
  }

  const formattedContent = newsDetail.noiDung.replace(/\n/g, "<br>");

  const handleNewsClick = (newsId) => {
    navigate(`/tin-tuc/${newsId}`);
  };

  return (
    <div className="detailNews">
      <div className="sectionContainerDetail grid">
        <div className="containerDetailNews grid">
          <div className="titleDetailNews grid">
            <h1>{newsDetail.tieuDe}</h1>
            <p>
              {" "}
              Ngày đăng:{" "}
              {new Date(newsDetail.thoiGianDangBai).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="imgDetailNews">
            <img src={`../../../public/images/Tin-tuc/${newsDetail.image}`} />
          </div>
          <div
            className="contentDetailNews"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          ></div>
        </div>
        {relatedNews.length > 0 && (
          <div className="containerRelatedNews grid">
            <div className="headerRelatedNews flex">
              <h1>Tin tức liên quan</h1>
              <div className="line"></div>
              <span
                className="flex"
                onClick={() => {
                  navigate("/tin-tuc");
                }}
              >
                Xem tất cả <FcNext />
              </span>
            </div>
            <div className="containerAllNews">
              {relatedNews.map((item, index) => (
                <div
                  key={index}
                  className="contentNews flex"
                  onClick={() => handleNewsClick(item._id)}
                >
                  <div className="imgAllNews">
                    <img
                      src={`../../../public/images/Tin-tuc/${item.image}`}
                      className="imgALL"
                      alt={item.tieuDe}
                    />
                  </div>
                  <div className="titleAllNews grid">
                    <h4>{item.tieuDe}</h4>
                    <span>
                      {new Date(item.thoiGianDangBai).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail_News;
