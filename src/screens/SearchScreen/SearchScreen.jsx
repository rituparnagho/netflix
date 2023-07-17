import React, { useEffect, useState } from "react";
import SearchCard from "../../components/SearchCard/SearchCard";
import "./SearchScreen.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [trend, setTrend] = useState([]);
  const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";

  const handleSearch = (e) => {
    const searchQuery = e.target.elements.searchInput.value;
    e.preventDefault();
    // const url = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${searchQuery}`;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("searchResults", searchResults);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      );
      setTrend(request.data.results);

      return request;
    }
    fetchData();
  }, []);

  console.log("trend", trend);

  return (
    <div>
      <div className="search__input">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="searchInput"
            placeholder="Search for a show, movies..."
          />
          <button type="submit">
            <span className="search__icon">
              <BsSearch />
            </span>
          </button>
        </form>
      </div>
      <h2 style={{ color: "#fff", marginBottom: "20px", marginLeft: "10px" }}>
        {searchResults.length === 0 ? "Top Search" : ""}
      </h2>
      <div className="searchcard">
        {searchResults.length === 0
          ? trend.map((elm) => <SearchCard key={elm.id} data={elm} />)
          : searchResults.map((elm) => <SearchCard key={elm.id} data={elm} />)}
      </div>
    </div>
  );
};

export default SearchScreen;
