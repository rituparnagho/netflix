import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import SignupScreen from "./screens/SignupScreen/SignupScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import AlreadySignedUp from "./screens/AlreadySignedUp/AlreadySignedUp";
import TvShows from "./screens/TvShows/TvShows";
import Category from "./screens/Category/Category";
import MovieDetails from "./screens/Details/MovieDetails";
import TvDetails from "./screens/Details/TvDetails";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
// import WishlistScreenMo from "./screens/";
import Popular from "./screens/Popular/Popular";
import { persistor } from "./app/store";
import MovieShows from "./screens/MovieShows/MovieShows";
import WishlistScreenMovie from "./screens/WishlistScreen/WishlistScreenMovie";
import TvSeasonDetails from "./screens/Details/TvSeasonDetails";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      console.log("userAuth", userAuth.email);
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        console.log(userAuth);
      } else {
        dispatch(logout());
        persistor.purge();
      }
    });
    return unsubscribe;
  }, [dispatch]);
  console.log("user", user);
  return (
    <div className="app">
      <div>
        <BrowserRouter>
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<HomeScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/signup" element={<AlreadySignedUp />} />

                {/* All menus */}
                <Route path="/tv-shows" element={<TvShows />} />
                <Route path="/movie-shows" element={<MovieShows />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/category" element={<Category />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv/:id" element={<TvDetails />} />
                <Route
                  path="/tv/:id/season/:season_number"
                  element={<TvSeasonDetails />}
                />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/wishlist" element={<WishlistScreenMovie />} />

                {/* <Route path="/wishlist/tv" element={<WishlistScreenTv />} /> */}
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
