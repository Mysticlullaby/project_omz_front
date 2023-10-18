import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { NavLink } from "react-router-dom";
// import axios from "axios";

const MovieList = () => {
  const dispatch = useDispatch();

  const getOmzPopular = () => {
    dispatch(movieActions.getOmzPopular());
  };

  const getRecommandList = () => {
    dispatch(movieActions.getRecommandList(localStorage.getItem('clientId')))
  }

  useEffect(() => {
    getOmzPopular();

    if (localStorage.getItem('clientId') != null) {
      getRecommandList();
    }
  }, []);

  const omzPopularList = useSelector((state) => state.movies.omzPopularList);
  const recommandList = useSelector((state) => state.movies.recommandList);

  return (
    <div>
      <p className="movielist-title">OMZ 회원들이 가장 많이 본 작품</p>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {omzPopularList &&
            omzPopularList.map((movie, index) => (
              <div key={movie.movieId} className="col">
                <div className="card" style={{ width: "18 rem" }}>
                  <NavLink to={`/movie/${movie.movieId}`}>
                    <div className="number-hear">{index + 1}</div>
                    <img src={movie.poster} className="card-img-top" alt={movie.title} />
                  </NavLink>
                  <div className="card-body">
                    <p className="card-text">{movie.title}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {localStorage.getItem('clientId') &&
        <>
          <p className="movielist-title">이런 작품은 어떠세요?</p>
          <div className="container">
            <div className="row row-cols-md-5 g-3">
              {recommandList &&
                recommandList.map((movie, index) => (
                  <div key={movie.movieId} className="col">
                    <div className="card" style={{ width: "18 rem" }}>
                      <NavLink to={`/movie/${movie.movieId}`}>
                        <img src={movie.poster} className="card-img-top" alt={movie.title} />
                      </NavLink>
                      <div className="card-body">
                        <p className="card-text">{movie.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      }

    </div>
  );
};

export default MovieList;
