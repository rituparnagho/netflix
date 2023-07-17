import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImPlay3 } from "react-icons/im";
import { FiPlus } from "react-icons/fi";
import ReactPlayer from "react-player";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Header/Navbar";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../features/wishlistSlice";
import "./Details.css";
import CardPopup from "../Card/CardPopup";
const MovieDetails = ({ itemId }) => {
  const [isActive, setIsActive] = useState(false);
  const [recommendation, setRecommendation] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [video, setVideo] = useState([]);
  const location = useLocation();
  console.log("idddd", location.state.movieId);
  const id = location.state.movieId;
  const [movieDetails, setMovieDetails] = useState({});
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";
  const baseURL = "https://image.tmdb.org/t/p/original/";

  const handleWishList = (item) => {
    if (isActive === false) {
      dispatch(ADD_TO_WISHLIST(item));
      setIsActive(!isActive);
    } else {
      dispatch(REMOVE_FROM_WISHLIST(item));
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      //   console.log(request);
      setMovieDetails(request.data);
      return request;
    }
    fetchData();
  }, [id]);
  var myDate = new Date(movieDetails.release_date);
  console.log("date", myDate.getFullYear());
  console.log("movieDetails", movieDetails);
  console.log("movieDetailsCast", movieDetails.cast);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      // console.log("vidreq", request);
      setVideo(request.data);
      return request;
    }
    fetchData();
  }, [id]);
  console.log("videos", video);
  // console.log("video", video.results[0].key);

  //.......................//
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      // console.log("vidreq", request);
      setRecommendation(request.data.results);
      return request;
    }
    fetchData();
  }, [id]);
  console.log("recommendation", recommendation);
  //.......................//

  const handleVideoClick = (videoLink) => {
    console.log("Video clicked:", videoLink);
    window.open(videoLink);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + "h" + minutes + "m";
  }

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    // <div className="details">
    //   <img src={`${baseURL}${movieDetails?.backdrop_path}`} alt="" />
    <div className="details__main">
      {/* <NavBar /> */}
      <header
        className="details"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}")`,
          backgroundPosition: "center",
        }}
      >
        <div className="details__banner__fadebottom">
          <div className="details_contents">
            <h1 className="details_title">
              {movieDetails?.title ||
                movieDetails?.name ||
                movieDetails?.original_name}
            </h1>
            <div className="details_buttons">
              <button
                className="details_button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() =>
                  handleVideoClick(
                    `https://www.youtube.com/watch?v=${video?.results[0].key}`
                  )
                }
              >
                <ImPlay3 /> <nbsp />
                Play
                {isHovering && (
                  <>
                    <CardPopup videoo={video} />
                  </>
                )}
              </button>

              <button
                className={isActive ? "mylist-button active" : "mylist-button"}
                onClick={() => handleWishList(id)}
              >
                {/* <FiPlus /> <nbsp /> */}
                {/* My List */}
                {isActive ? "Added to List" : "My List"}
              </button>
            </div>
            <h1 className="details_date">
              {truncate(myDate.getFullYear(), 150)} <nbsp /> |
              {movieDetails.adult === false ? "13+" : "18+"} | <nbsp />
              {time_convert(movieDetails?.runtime)} <nbsp />
            </h1>
            <h1 className="details_description">
              {truncate(movieDetails?.overview, 150)}
            </h1>

            <h5 className="details_genre">
              Genres : {movieDetails?.genres?.map((elm) => elm.name).join(", ")}
              <br />
              Status : {movieDetails?.status}
            </h5>
          </div>
        </div>
        <div className="recomendation">
          <h1>All Recomendations</h1>
          <div className="recom_row">
            {recommendation.map((elm) => (
              <div key={elm.id} className="movie-card">
                <Link to={`/movie/${elm?.id}`} state={{ movieId: elm?.id }}>
                  <img
                    src={
                      elm?.backdrop_path
                        ? `${baseURL}${elm?.backdrop_path}`
                        : "https://img.myloview.com/posters/movie-and-film-modern-background-with-place-for-your-text-film-stripe-reel-design-element-for-backdrop-brochure-leaflet-publication-poster-cinema-poster-template-vector-illustration-eps-10-400-169838861.jpg"
                    }
                    alt={elm.title}
                    className="movie-image"
                  />
                </Link>
                <p className="movie-title">{elm.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="details--fadeButton" /> */}
      </header>
    </div>
  );
};

export default MovieDetails;
