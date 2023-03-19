import { getMovieDetails, IMAGE_URL } from "api/movie-api"
import React, { useEffect } from "react"
import { useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

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

    return (
        <>
        {!movie ? (
            <div>This movie is not found</div>
        ): (
            <>
                <Link to={backLink}>Go back</Link>
                <div>
                <img
                    src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : `${IMAGE_URL}`}
                    alt={movie.title}
                    widht="300"
                    height="400"
                />
                <h1>{movie.original_title}</h1>
                <p>User Score: {movie.vote_average}%</p>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                <p>{movie.genres && `${movie.genres.map(genre => genre.name)}`}</p>
                </div>
                <h2>Additional information</h2>
                <ul>
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
                <Outlet />

            </>
        )}
        
        </>
    )
}
