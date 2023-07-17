import React, { useState, useEffect } from "react";
import "./TvShows.css";
import requests from "../../Requests";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import RowTv from "../../components/Row/RowTv";
import Footer from "../../components/Footer/Footer";

const TvShows = () => {
  const [open, setOpen] = useState(false);
  const [genre, setGenre] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(0);
  const API_KEY = "9577ef53817f4b0e02856c7578cf8ffd";
  const handlArrow = () => {
    setOpen(!open);
  };
  const handleSelect = (elm) => {
    setSelectedItem(elm.name);
    setSelectedItemId(elm.id);
    setOpen(false);
  };

  console.log("selectedItemId", selectedItemId);
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      //   console.log("request genres", request.data.genres);
      setGenre(request.data.genres);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="movieshow_screen">
        <NavBar />
        <div className="category__main">
          <div className="category_item">
            <p>{selectedItem || "Selected Item"}</p>
            <div onClick={handlArrow}>
              <span className="down__icon">
                <BsChevronDown />
              </span>
            </div>
          </div>
          {open && (
            <div className="category__list__items">
              {genre?.map((elm) => (
                <div
                  className="category__list__item"
                  onClick={() => handleSelect(elm)}
                  key={elm.id}
                >
                  {elm.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedItem === "" ? (
          <>
            <RowTv title="Trending now" fetchUrl={requests.fetchTrendingTv} />
            <RowTv title="Popular" fetchUrl={requests.fetchTvlist} />
            <RowTv
              title="Top Rated Tv Shows"
              fetchUrl={requests.fetchTopRatedTv}
            />
            <RowTv title="Comedy" fetchUrl={requests.fetchComedyTvShows} />
            <RowTv title="Romance" fetchUrl={requests.fetchRomanceTvShows} />
            <RowTv
              title="Documentaries Tv Shows"
              fetchUrl={requests.fetchDocumentariesTv}
            />
          </>
        ) : (
          <RowTv
            title={selectedItem || "Selected Genre"}
            fetchUrl={`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${selectedItemId}`}
            className="rowtv"
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default TvShows;

{
  /* <div className="tvshow_screen">
<NavBar />
<RowTv title="Trending now" fetchUrl={requests.fetchTrendingTv} />
<RowTv title="Popular" fetchUrl={requests.fetchTvlist} />
<RowTv title="Top Rated Tv Shows" fetchUrl={requests.fetchTopRatedTv} />
<RowTv title="Comedy" fetchUrl={requests.fetchComedyTvShows} />
<RowTv title="Romance" fetchUrl={requests.fetchRomanceTvShows} />
<RowTv
  title="Documentaries Tv Shows"
  fetchUrl={requests.fetchDocumentariesTv}
/>
</div> */
}
