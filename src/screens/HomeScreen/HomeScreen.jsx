import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import "./HomeScreen.css";
import NavBar from "../../components/Header/Navbar";
import requests from "../../Requests";
import Row from "../../components/Row/Row";
import RowTv from "../../components/Row/RowTv";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading the page
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="homeScreen">
          <NavBar />

          <Banner />

          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />
          <Row title="Trending now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <RowTv
            title="Top Rated Tv Shows"
            fetchUrl={requests.fetchTopRatedTv}
          />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          <Footer />
        </div>
      )}
    </>
  );
}

export default HomeScreen;
