import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../Requests";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ImPlay3 } from "react-icons/im";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [videoDetails, setVideoDetails] = useState({});
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";
  const base_URL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setInterval(() => {
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      }, 10000);
      return request;
    }
    fetchData();
  }, []);

  //     return request;
  //   }
  //   fetchData();
  // }, []);
  console.log(movie);

  //Fetch Movie videos
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      //   console.log(request);
      setVideoDetails(request.data);

      return request;
    }
    fetchData();
  }, [movie?.id]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  //open video link
  const handleVideo = (videoLink) => {
    console.log(videoLink);
    window.open(videoLink);
  };

  const backgroundImage = movie?.backdrop_path
    ? `${base_URL}${movie.backdrop_path}`
    : "https://nofilmschool.com/sites/default/files/styles/facebook/public/netflix_3.jpg?itok=n1Q8AYP_";

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__banner__fadebottom">
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button"
              onClick={() =>
                handleVideo(
                  `https://www.youtube.com/watch?v=${videoDetails?.results[0].key}`
                )
              }
              style={{ backgroundColor: " #E50914", color: "#fff" }}
            >
              <ImPlay3 /> <nbsp />
              Play
            </button>
            <button
              className="banner_button"
              style={{ backgroundColor: "gray", color: "#fff" }}
            >
              <AiOutlineInfoCircle /> <nbsp />
              <Link
                to={`/movie/${movie?.id}`}
                state={{ movieId: movie?.id }}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                More info
              </Link>
            </button>
            {/* <button
            className={isActive ? "mylist-button active" : "mylist-button"}
            onClick={() => handleWishList(movie?.id)}
          >
            {/* <FiPlus /> <nbsp /> */}
            {/* My List */}
            {/* {isActive ? "Added to List" : "My List"}
          </button> */}
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner--fadeButton" />
      </div>
    </header>
  );
}

export default Banner;
