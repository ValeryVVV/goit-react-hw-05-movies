import React, { Suspense, useEffect } from "react"
import { useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

import style from './MovieDetails.module.css';
import { getMovieDetails, IMAGE_URL } from "api/movie-api"


export default function MovieDetails() {
    const [movie, setMovie] = useState([]);

    const { movieId } = useParams();

    const location = useLocation();

    
  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await getMovieDetails(movieId);

      setMovie(currentMovie);
    };

    getMovie();
  }, [movieId]);
  
    const backLink = location.state?.from ?? "/";

    const { poster_path, title, original_title, vote_average, overview, genres  } = movie;

    return (
        <>
        {!movie ? (
            <div>This movie is not found</div>
        ): (
            <div className={style.wrapper}>
                <Link className={style.back} to={backLink}>Go back</Link>
                <div className={style.info_container}>
                <img
                    src={poster_path ? `${IMAGE_URL}${poster_path}` : `${IMAGE_URL}`}
                    alt={title}
                    widht="300"
                    height="400"
                />
                <div className={style.info}>
                    <h2>{original_title}</h2>
                    <p>User Score: {vote_average}%</p>
                    <h2>Overview</h2>
                    <p>{overview}</p>
                    <h2>Genres</h2>
                    <p>{genres && `${genres.map(genre => genre.name)}`}</p>
                </div>
                </div>
                <div className={style.additional_info}>
                <h2>Additional information</h2>
                <ul className={style.additional_ul}>
                    <li>
                        <Link to={`/movies/${movieId}/cast`} state={{ from: location }}>
                            Cast
                        </Link>

                    </li>
                    <li>
                        <Link to={`/movies/${movieId}/review`} state={{ from: location }}>
                            Review
                        </Link>
                    </li>
                </ul>
                <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
                </Suspense>
                    
                </div>

            </div>
        )}
        
        </>
    )
}

MovieDetails.propTypes = {
    movieId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired
  };
