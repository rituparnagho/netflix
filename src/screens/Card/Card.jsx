import React from "react";
import "./Card.css";
const Card = ({ fetchData }) => {
  // console.log("fetchData", fetchData);
  const baseURL = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="card">
      <img
        className={`card_image`}
        src={`${baseURL}${fetchData?.poster_path}`}
        alt={fetchData?.name}
      />
    </div>
  );
};
export default Card;
