import React, { useEffect } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom";

import style from './HomePage.module.css';
import { getTrendingMovies } from "api/movie-api"

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
        <div className={style.wrapper}>
        <h1 className={style.title}>Trending today</h1>

        {movie.map(
            ({
                id, 
                title,
            }) => (
                <ul key={id}>
                    <li>
                        <Link to={`/movies/${id}`} state={{ from: location }}>
                            <p>{title}</p>
                        </Link>
                    </li>
                </ul>

            )
            )};
        </div>
    )
}

