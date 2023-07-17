import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import "./Row.css";
import Card from "../../screens/Card/Card";

function RowTv({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <Link to={`/tv/${movie.id}`} state={{ movieId: movie.id }}>
              <Card key={movie.id} fetchData={movie} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default RowTv;
