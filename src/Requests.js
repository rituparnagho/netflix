const API_KEY = "a54ee66ebbdc9773da61e92cf5eb379c";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTvlist: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTrendingTv: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTv: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchComedyTvShows: `/discover/tv?api_key=${API_KEY}&with_genre=26146`,
  fetchRomanceTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentariesTv: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
  movieDetails: `/movie?api_key=${API_KEY}&language=en-US`,
  // fetchTrendingAll: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

export default requests;
