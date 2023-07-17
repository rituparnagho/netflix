import React, { useState, useEffect } from "react";
import "./MovieShows.css";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
import requests from "../../Requests";
import Row from "../../components/Row/Row";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function MovieShows() {
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
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      //   console.log("request genres", request.data.genres);
      setGenre(request.data.genres);
    };
    fetchData();
  }, []);
  return (
    <>
      {/* // <div className="main"> */}
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
            <Row
              title="Netflix Originals"
              fetchUrl={requests.fetchNetflixOriginals}
              isLargeRow
            />
            <Row title="Trending now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row
              title="Romance Movies"
              fetchUrl={requests.fetchRomanceMovies}
            />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </>
        ) : (
          <Row
            title={selectedItem || "Selected Genre"}
            fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedItemId}`}
          />
        )}
      </div>
      <Footer />
      {/* // </div> */}
    </>
  );
}

export default MovieShows;
