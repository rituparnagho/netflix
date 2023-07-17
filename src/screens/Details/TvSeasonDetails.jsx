import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Details.css";
import { ImPlay3 } from "react-icons/im";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const TvSeasonDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.state.movieId;
  const seasonID = location.state.seasonId;

  const [seasonDetails, setSeasonDetails] = useState([]);

  const baseURL = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonID}?api_key=${API_KEY}&language=en-US`
      );
      //   console.log(request);
      setSeasonDetails(request.data.episodes);
      return request;
    }
    fetchData();
  }, [id]);
  // console.log("seasonDetails", seasonDetails.episodes);
  // const episode = seasonDetails.episodes;

  return (
    <>
      <div className="recomendation_main">
        {seasonDetails.length !== 0 ? (
          <div className="recomendation">
            <div className="recom_row">
              {seasonDetails?.map((elm) => (
                <div key={elm.id} className="movie-card">
                  <img
                    src={`${baseURL}${elm?.still_path}`}
                    alt={elm?.title}
                    className="movie-image"
                    style={{ width: 200, height: 500 }}
                  />
                  <p className="movie-title" style={{ color: "white" }}>
                    {elm.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="noepisode__main">
              <div className="noepisode__div">
                <p>No Episodes Found</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TvSeasonDetails;
