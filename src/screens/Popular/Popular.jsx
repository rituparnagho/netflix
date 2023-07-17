import React from "react";
import "./Popular.css";
import Banner from "../../components/Banner/Banner";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
import requests from "../../Requests";
import Row from "../../components/Row/Row";
import Footer from "../../components/Footer/Footer";
import RowTv from "../../components/Row/RowTv";

const Popular = () => {
  return (
    <>
      <div className="popular_main">
        <div className="popular">
          <NavBar />

          {/* <Banner /> */}
          <Row
            title="Popular Tv & MovieShows"
            fetchUrl={requests.fetchTrending}
          />
          {/* <RowTv title="Trending now" fetchUrl={requests.fetchTrendingTv} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Popular;
