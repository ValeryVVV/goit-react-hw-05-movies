import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSearchMovies } from 'api/movie-api';
import PropTypes from 'prop-types';


import style from './SearchMovies.module.css';

const SearchMovie = () => {
  const [movieToFind, setMovieToFind] = useState('');
  const [movies, setMovies] = useState([]);

  const location = useLocation();


  const handleSubmit = async e => {
    e.preventDefault();

    if (movieToFind.trim()) {
      const { results } = await getSearchMovies(movieToFind);

      setMovies(results);
      setMovieToFind('');

      if (results.length === 0) {
        alert(
          'No movies found! Please change your request and try again'
        );
      }

    }
  };

  return (
    <>
      <header className={style.searchbar}>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                onChange={e => setMovieToFind(e.target.value)}
                type="text"
                autoComplete="off"
                className={style.searchForm_input}
                autoFocus
                placeholder="Search movie"
                value={movieToFind}
            />
                <button type='submit' className={style.searchForm_button}>
                    Search
                </button>
            </form>
        </header>
      {movies.map(
            ({
                id, 
                title,
            }) => (
                <ul>
                    <li key={id}>
                        <Link to={`/movies/${id}`} state={{ from: location }}>
                            <p>{title}</p>
                        </Link>
                    </li>
                </ul>

            )
            )};
    </>
  );
};

export default SearchMovie;

SearchMovie.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };
