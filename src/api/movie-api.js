import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const KEY = '683658afe0d3dabfd9c8a37c2044350b';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const getAxiosApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '683658afe0d3dabfd9c8a37c2044350b',
    language: 'en-US',
  },
});

export const getTrendingMovies = async () => {
  const trendMovieURL = `trending/movie/day?api_key=${KEY}`;
  const { data: movies } = await axios.get(trendMovieURL);
  return movies;
};

export const getMovieDetails = async id => {
  const { data } = await getAxiosApi.get(`/movie/${id}`);
  return data;
};

export const getMovieCast = async id => {
  const { data } = await getAxiosApi.get(`/movie/${id}/credits`);
  return data.cast;
};

export const getMovieReview = async id => {
  const { data } = await getAxiosApi.get(`/movie/${id}/reviews`);
  return data.results;
};

export const getSearchMovies = async query => {
  const { data } = await getAxiosApi.get('/search/movie', {
    params: { query },
  });
  return data.results;
};
