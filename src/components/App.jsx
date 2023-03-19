import Cast from "pages/CastPages/Cast";
import Home from "pages/HomePage/HomePage";
import MovieDetails from "pages/MovieDetailsPage/MovieDetails";
import NotFound from "pages/NotFoundPage/NotFoundPage";
import Reviews from "pages/ReviewsPages/Reviews";
import SearchMovie from "pages/SearchMoviesPages/SearchMovies";
import { Routes, Route, Link } from "react-router-dom";

export const App = () => {
  return (
    <div>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<SearchMovie />} />

        <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/review" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
};
