import React from "react";
import ReactPlayer from "react-player";
import "./CardPopup.css";

const CardPopup = ({ videoo }) => {
  console.log("videoo", videoo);
  return (
    <div className="card__popup">
      <ReactPlayer
        playing={true}
        // url={`https://www.youtube.com/watch?v=${video?.results[0]?.key}`}
        url={
          videoo?.results === []
            ? `https://www.youtube.com/watch?v=hvvWv2GLWss`
            : `https://www.youtube.com/watch?v=${videoo?.results[0]?.key}`
        }
      />
    </div>
  );
};

export default CardPopup;
