import { useEffect, useState } from "react";
import "./SearchCard.css";
import axios from "axios";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const SearchCard = ({ data }) => {
  const [videoDetails, setVideoDetails] = useState({});

  const baseURL = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";

  //Fetch Movie videos
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/${
          data?.media_type === "tv" ? "tv" : "movie"
        }/${data?.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      //   console.log(request);
      setVideoDetails(request.data);

      return request;
    }
    fetchData();
  }, [data?.id, data?.media_type]);

  console.log("video details", videoDetails);
  console.log("data", data);

  //open video link
  const handleVideo = (videoLink) => {
    console.log(videoLink);
    window.open(videoLink);
  };

  return (
    <>
      <div
        className="search__card"
        // onClick={() =>
        //   handleVideo(
        //     `https://www.youtube.com/watch?v=${
        //       videoDetails?.results[1]
        //         ? videoDetails?.results[1]?.key
        //         : videoDetails?.results[0]?.key
        //     }`
        //   )
        // }
      >
        <Link
          to={`/${data?.media_type === "tv" ? "tv" : "movie"}/${data?.id}`}
          state={{ movieId: data?.id }}
        >
          <img
            src={
              data?.backdrop_path
                ? `${baseURL}${data?.backdrop_path}`
                : "https://nofilmschool.com/sites/default/files/styles/facebook/public/netflix_3.jpg?itok=n1Q8AYP_"
            }
            alt=""
          />
        </Link>
        <p>{data?.name || data?.original_title || data?.title}</p>
        {console.log("title", data?.title)}
        {/* <span className="play__icon">
          <BsFillPlayFill />
        </span> */}
      </div>
    </>
  );
};

export default SearchCard;
