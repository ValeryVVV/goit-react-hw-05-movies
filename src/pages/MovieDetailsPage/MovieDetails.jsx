import React, { Suspense, useEffect } from "react"
import { useState } from "react"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

import style from './MovieDetails.module.css';
import { getMovieDetails, IMAGE_URL } from "api/movie-api"
import Cast from "pages/CastPages/Cast";
import Reviews from "pages/ReviewsPages/Reviews";


export default function MovieDetails() {
    const [movie, setMovie] = useState([]);

    const { movieId } = useParams();

    const location = useLocation();


  useEffect(() => {
    if (!movieId) return;
    const getMoviesDetails = async id => {
      try {
        const receivedDetails = await getMovieDetails(id);
        setMovie(receivedDetails);
      } catch (err) {
       console.log(err);
      }
    };
    getMoviesDetails(movieId);
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
                <Link
                    style={{ textDecoration: 'none' }}
                    state={{ from: location?.state?.from ?? '/' }}
                    to="reviews"
                >
                    Reviews
                </Link>
                </li>
                <li>
                <Link
                    style={{ textDecoration: 'none' }}
                    state={{ from: location?.state?.from ?? '/' }}
                    to="cast"
                >
                    Cast
                </Link>
                </li>

            </ul>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="cast" element={<Cast />} />
                        <Route path="reviews" element={<Reviews />} />
                    </Routes>
                </Suspense>
                    
                </div>

            </div>
        )}
        
        </>
    )
}
