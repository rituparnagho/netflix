import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Details.css";
import { ImPlay3 } from "react-icons/im";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_WISHLISTTV,
  REMOVE_FROM_WISHLISTTV,
} from "../../features/tvwishlistSlice";
const TvDetails = () => {
  const [video, setVideo] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("idddd", location.state.movieId);
  const id = location.state.movieId;
  const [tvDetails, setTvDetails] = useState({});

  const baseURL = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";

  const handleWishList = (item) => {
    if (isActive === false) {
      dispatch(ADD_TO_WISHLISTTV(item));
      setIsActive(!isActive);
    } else {
      dispatch(REMOVE_FROM_WISHLISTTV(item));
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      //   console.log(request);
      setTvDetails(request.data);
      return request;
    }
    fetchData();
  }, [id]);
  var myDate = new Date(tvDetails.release_date);
  console.log("date", myDate.getFullYear());
  console.log("tvDetails", tvDetails);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      console.log("vidreq", request);
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
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
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

  //Get Release Date
  const realeaseDate = new Date(tvDetails.first_air_date).getFullYear();
  console.log("realeaseDate", realeaseDate);

  // function time_convert(num) {
  //   var hours = Math.floor(num / 60);
  //   var minutes = num % 60;
  //   return hours + "h" + minutes + "m";
  // }
  return (
    // <div className="details">
    //   <img src={`${baseURL}${movieDetails?.backdrop_path}`} alt="" />

    <header
      className="details"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${tvDetails?.backdrop_path}")`,
        backgroundPosition: "center",
      }}
    >
      <div className="details__banner__fadebottom">
        <div className="details_contents">
          <h1 className="details_title">
            {tvDetails?.title || tvDetails?.name || tvDetails?.original_name}
          </h1>
          <div className="details_buttons">
            {/* <Link to={`/video/${id}`} state={{ videoId: id }}> */}
            {/* <VideoSection videoId={id} /> */}
            <button
              className="details_button"
              onClick={() =>
                handleVideoClick(
                  `https://www.youtube.com/watch?v=${video?.results[0]?.key}`
                )
              }
            >
              <ImPlay3 /> <nbsp />
              Play
            </button>
            {/* </Link> */}
            {/* <a href={`https://www.youtube.com/watch?${video.results[0].key}`}> */}
            {/* </a> */}

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
            {`${realeaseDate} | ${tvDetails?.adult ? "18+" : "13+"} | ${
              tvDetails?.number_of_seasons
            } Seasons  | ${tvDetails?.number_of_episodes} Episodes`}
          </h1>
          <h1 className="details_description">
            {truncate(tvDetails?.overview, 150)}
          </h1>

          <h5 className="details_genre">
            Genres : {tvDetails?.genres?.map((elm) => elm.name).join(", ")}
            <br />
            Status : {tvDetails?.status}
          </h5>
        </div>
      </div>
      <div className="recomendation">
        <h1>All Seasons</h1>
        <div className="recom_row">
          {tvDetails?.seasons?.map((elm) => (
            <div key={elm.id} className="movie-card">
              <Link
                to={`/tv/${elm?.id}/season/${elm?.season_number}`}
                state={{ movieId: elm?.id, seasonId: elm?.season_number }}
              >
                <img
                  src={
                    elm?.poster_path
                      ? `${baseURL}${elm?.poster_path}`
                      : "https://img.freepik.com/free-photo/movie-background-collage_23-2149876032.jpg"
                  }
                  alt={elm.title}
                  className="season-image"
                />
              </Link>
              <p className="movie-title">{elm.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="recomendation">
        <h1>All Recomendations</h1>
        <div className="recom_row">
          {recommendation.map((elm) => (
            <div key={elm.id} className="movie-card">
              <Link to={`/tv/${elm?.id}`} state={{ movieId: elm?.id }}>
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
              <p className="movie-title">{elm.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="details--fadeButton" /> */}
    </header>
    // </div>
  );
};
export default TvDetails;
