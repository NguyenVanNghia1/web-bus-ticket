import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const News = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [multiFeaturedNews, setMultiFeaturedNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Ensure 4 items per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/news/featured")
      .then((response) => {
        setFeaturedNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching featured news:", error);
      });

    axios
      .get("http://localhost:4000/news/multi-featured")
      .then((response) => {
        setMultiFeaturedNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching multi-featured news:", error);
      });

    axios
      .get("http://localhost:4000/news")
      .then((response) => {
        setAllNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all news:", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedNews = allNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(allNews.length / itemsPerPage);

  const handleNewsClick = (id) => {
    navigate(`/tin-tuc/${id}`);
  };

  return (
    <div className="news">
      <div className="sectionContainerNews grid">
        <div className="featuredNews grid">
          <div className="headerFeatureNews flex">
            <h1>Tin tức nổi bật</h1>
            <div className="line"></div>
          </div>

          <div className="sectionContainerContentMulti flex">
            <div className="contentFeatureNews flex">
              {featuredNews.map((item, index) => {
                const formattedDate = new Date(
                  item.thoiGianDangBai,
                ).toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <div
                    key={index}
                    className="singleFeatureNews grid"
                    onClick={() => handleNewsClick(item._id)}
                  >
                    <img
                      src={`/images/Tin-tuc/${item.image}`}
                      className="imgFeatureNews"
                    />
                    <h2 className="titleNews">{item.tieuDe}</h2>
                    <span className="dateSubmitted">{formattedDate}</span>
                  </div>
                );
              })}
            </div>

            <div className="contentFeatureNewsMulti flex">
              {multiFeaturedNews.map((item, index) => {
                const formattedDate = new Date(
                  item.thoiGianDangBai,
                ).toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <div
                    key={index}
                    className="multiFeatureNews grid"
                    onClick={() => handleNewsClick(item._id)}
                  >
                    <img
                      src={`/images/Tin-tuc/${item.image}`}
                      className="imgFeatureNews"
                    />
                    <h2 className="titleNews">{item.tieuDe}</h2>
                    <span className="dateSubmitted">{formattedDate}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="focusContainer flex">
            <div className="banner">
              <div className="headerBanner">Tiêu điểm</div>
              <p>VINA Bus Lines</p>
            </div>
          </div>
        </div>

        <div className="allNews grid">
          <div className="headerAllNews flex">
            <h1>Tất cả tin tức</h1>
            <div className="line"></div>
          </div>
          <div className="containerAllNews">
            {paginatedNews.map((item, index) => {
              const formattedDate = new Date(
                item.thoiGianDangBai,
              ).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <div
                  key={index}
                  className="contentNews flex"
                  onClick={() => handleNewsClick(item._id)}
                >
                  <div className="imgAllNews">
                    <img
                      src={`/images/Tin-tuc/${item.image}`}
                      className="imgALL"
                    />
                  </div>
                  <div className="titleAllNews grid">
                    <h4>{item.tieuDe}</h4>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
