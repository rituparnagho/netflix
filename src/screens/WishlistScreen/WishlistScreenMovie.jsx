import React, { useEffect, useState } from "react";
import "./WishlistScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { selectWishlist } from "../../features/wishlistSlice";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
import { REMOVE_FROM_WISHLIST } from "../../features/wishlistSlice";
import WishlistScreenTv from "./WishlistScreenTv";

const WishlistScreenMovie = () => {
  const [videoDetails, setVideoDetails] = useState("");
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();
  console.log("wishlist", wishlist);
  const ids = wishlist.map((e) => e);
  console.log("ids", ids);
  // const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const [data, setData] = useState([]); // Updated to initialize as an empty array
  const baseURL = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";

  const removeFromMyList = (item) => {
    console.log("itemmm", item);
    dispatch(REMOVE_FROM_WISHLIST(item));
  };

  useEffect(() => {
    async function fetchData() {
      const requests = ids.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        )
      );
      const responses = await Promise.all(requests);
      const moviesData = responses.map((response) => response.data);
      setVideoDetails(moviesData);
      return requests;
    }
    fetchData();
  }, [wishlist]);

  console.log("videoDetails", videoDetails);

  useEffect(() => {
    async function fetchData() {
      const requests = ids.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
      );
      console.log("requests", requests);
      const responses = await Promise.all(requests);
      // const moviesData = responses.map((response) => response.data);
      // setData(moviesData);
      // return requests;
      const moviesData = responses.map((response, index) => {
        return {
          ...response.data,
          index,
        };
      });
      const sortItem = moviesData.sort((a, b) => {
        return b.index - a.index;
        // if (a.index < b.index) return 1;
        // if (a.index > b.index) return -1;
        // return 0;
      });
      setData(sortItem);
      return requests;
    }
    fetchData();
  }, [wishlist]);

  //open video link
  const handleVideo = (videoLink) => {
    console.log(videoLink);
    window.open(videoLink);
  };

  return (
    <>
      <NavBar />
      <div className="wishlist">
        <div className="header">
          <h3>My Wishlist</h3>
        </div>
        <div className="wishlist__container">
          {data.map((wish, index) => (
            <div key={wish.id} className="wishlist__item">
              <div className="icon">
                <RxCrossCircled
                  className="wishlist__item-icon"
                  onClick={() => removeFromMyList(wish.id)}
                />
              </div>
              <Link to={`/movie/${wish?.id}`} state={{ movieId: wish?.id }}>
                <img
                  key={wish.id} // Added key prop for each item in the map function
                  className={`card_image`}
                  src={`${baseURL}${wish?.poster_path}`}
                  alt={wish?.name}
                />
              </Link>
              <p className="wishlist__item-title">
                {wish?.name || wish?.original_title || wish?.title}
              </p>
              <button
                className="wishlist__item-button"
                onClick={() =>
                  handleVideo(
                    `https://www.youtube.com/watch?v=${videoDetails[index]?.results[0]?.key}`
                  )
                }
              >
                Play Trailer
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="tv_head">
        <h3>TV Show Wishlist</h3>
      </div>
      <WishlistScreenTv />
    </>
  );
};

export default WishlistScreenMovie;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectWishlist } from "../../features/wishlistSlice";

// const WishlistScreen = () => {
//   const wishlist = useSelector(selectWishlist);
//   console.log("wishlist", wishlist);
//   const ids = wishlist.map((e) => e);
//   const [data, setData] = useState("");
//   const baseURL = "https://image.tmdb.org/t/p/original/";
//   const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";
//   useEffect(() => {
//     async function fetchData() {
//       const requests = ids.map((id) =>
//         axios.get(
//           `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
//         )
//       );
//       const responses = await Promise.all(requests);
//       const moviesData = responses.map((response) => response.data);
//       setData(moviesData);
//       return requests;
//     }
//     fetchData();
//   }, []);

//   console.log("data", data);

//   return (
//     <div>
//       <div className="search__input"></div>
//       <div className="searchcard">
//         {data.map((wish) => (
//           <img
//             className={`card_image`}
//             src={`${baseURL}${wish?.poster_path}`}
//             alt={wish?.name}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WishlistScreen;
