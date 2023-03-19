import { getTrendingMovies } from "api/movie-api"
import React, { useEffect } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom";

export default function Home() {
    const [movie, setMovie] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const getTrendMovie = async () => {
            const { results } = await getTrendingMovies();

            setMovie(results);
        };
        getTrendMovie();

    }, [])

    return (
        <>
        <h1>Trending today</h1>

        {movie.map(
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
    )
}
