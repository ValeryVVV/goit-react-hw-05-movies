import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchMovies } from 'api/movie-api';

import style from './SearchMovies.module.css';
import { useEffect } from 'react';

const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const query = searchParams.get('query');

  useEffect(() => {
    if (!query?.trim()) {
      return;
    }
    const fetchTrends = async query => {
      try {
        const receivedMovies = await getSearchMovies(query);
        setMovies(receivedMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrends(query);
  }, [query]);


  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.currentTarget.search.value === '') {
      alert('Fill in the input field!');
    }
    setSearchParams({ query: evt.currentTarget.search.value });
    evt.target.reset();
  };

  return (
    <>
      <header className={style.searchbar}>
            <form onSubmit={handleSubmit} className={style.form}>
            <input name="search" placeholder="Search movie" className={style.searchForm_input} onChange={e => setSearchParams({ query: e.target.value })} />
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
                <ul key={id}>
                    <li >
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

