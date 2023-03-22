import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import style from './App.module.css';


const Home = lazy(() => import("../pages/HomePage/HomePage"));
const SearchMovie = lazy(() => import("../pages/SearchMoviesPages/SearchMovies"));
const MovieDetails = lazy(() => import("../pages/MovieDetailsPage/MovieDetails"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

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

        
        <Route path="/movies/:movieId/*" element={<MovieDetails />} />
            {/* <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/review" element={<Reviews />} /> */}
      
        <Route path="*" element={<NotFound />} />

      </Routes>
      </Suspense>
    </div>
  );
};
