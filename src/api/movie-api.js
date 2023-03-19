import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const KEY = '683658afe0d3dabfd9c8a37c2044350b';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const getTrendingMovies = async () => {
  const trendMovieURL = `trending/movie/day?api_key=${KEY}`;
  const { data: movies } = await axios.get(trendMovieURL);
  return movies;
};

export const getMovieDetails = async movieId => {
  const detailsMovieURL = `movie/${movieId}?api_key=${KEY}&language=en-US`;
  const { data: movies } = await axios.get(detailsMovieURL);
  return movies;
};

export const getMovieCast = async movieId => {
  const castMovieURL = `movie/${movieId}/credits?api_key=${KEY}&language=en-US`;
  const { data: movies } = await axios.get(castMovieURL);
  return movies;
};

export const getMovieReview = async movieId => {
  const reviewMovieURL = `movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`;
  const { data: movies } = await axios.get(reviewMovieURL);
  return movies;
};

export const getSearchMovies = async search => {
  const searchMovieURL = `search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${search}`;
  const { data: movies } = await axios.get(searchMovieURL);
  return movies;
};
