import Cast from "pages/CastPages/Cast";
import Home from "pages/HomePage/HomePage";
import MovieDetails from "pages/MovieDetailsPage/MovieDetails";
import NotFound from "pages/NotFoundPage/NotFoundPage";
import Reviews from "pages/ReviewsPages/Reviews";
import SearchMovie from "pages/SearchMoviesPages/SearchMovies";
import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import style from './App.module.css';

const MovieDetail = lazy(() => import("../pages/MovieDetailsPage/MovieDetails"));

export const App = () => {
  return (
    <div className={style.container}>
        <nav className={style.nav_container}>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<SearchMovie />} />

        
        <Route path="/movies/:movieId" element={<MovieDetail />}>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/review" element={<Reviews />} />
        </Route>
      
        <Route path="*" element={<NotFound />} />

      </Routes>
      </Suspense>
    </div>
  );
};
