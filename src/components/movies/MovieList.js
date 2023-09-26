import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { NavLink } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();

  const getMovieList = () => {
    dispatch(movieActions.getMovieList());
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const movieList = useSelector((state) => state.movies.movieList);

  return (
    <div className="container">
      <div className="row row-cols-md-5 g-3">
        {movieList &&
          movieList.map((movie) => (
            <div key={movie.movieId} className="col">
              <div className="card" style={{ width: "18 rem" }}>
                <NavLink to={`/movie/${movie.movieId}`}>
                  <img
                    src={movie.poster}
                    className="card-img-top"
                    alt={movie.title}
                  />
                </NavLink>
                <div className="card-body">
                  <p className="card-text">{movie.title}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieList;
