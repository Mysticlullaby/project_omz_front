import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { NavLink } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const dispatch = useDispatch();
  const clientId = localStorage.getItem('clientId');
  const [reviewCount, setReviewCount] = useState(0);

  const getOmzPopular = () => {
    dispatch(movieActions.getOmzPopular());
  };

  const getNetflixPopular = () => {
    dispatch(movieActions.getNetflixPopular());
  }

  const getTvingPopular = () => {
    dispatch(movieActions.getTvingPopular());
  }

  const getWavePopular = () => {
    dispatch(movieActions.getWavePopular());
  }

  const getMovieList = () => {
    dispatch(movieActions.getMovieList());
  }

  const getRecommandList = () => {
    dispatch(movieActions.getRecommandList(clientId))
  }

  const checkReviewCount = async () => {
    const response = await axios.get(`/review/count/${clientId}`);
    const updatedReviewCount = response.data;
    setReviewCount(updatedReviewCount);
    console.log('reviewCount: ', updatedReviewCount);
    if (updatedReviewCount > 3) {
      getRecommandList();
    }
  };

  // 유림 mbti추가부분
  const getMbtiRecommend = () => {
    dispatch(movieActions.getMbtiRecommend(localStorage.getItem("mbti")));
  };

  useEffect(() => {
    getOmzPopular();
    getNetflixPopular();
    getTvingPopular();
    getWavePopular();
    getMovieList();

    if (localStorage.getItem("clientId") != null) {
      checkReviewCount();
      getMbtiRecommend();
    }
  }, []);

  const omzPopularList = useSelector((state) => state.movies.omzPopularList);
  const netflixList = useSelector((state) => state.movies.netflixPopular);
  const tvingList = useSelector((state) => state.movies.tvingPopular);
  const waveList = useSelector((state) => state.movies.wavePopular);
  const recommandList = useSelector((state) => state.movies.recommandList);
  const movieList = useSelector((state) => state.movies.movieList);
  const mbtirecommend = useSelector((state) => state.movies.mbtirecommend);

  return (
    <div className="overallpage">
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
                    <p className="card-text-main">{movie.title}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {localStorage.getItem("mbti") && (
        <>
          <p className="movielist-title">MBTI {localStorage.getItem("mbti")} 츄촌</p>
          <div className="container">
            <div className="row row-cols-md-5 g-3">
              {mbtirecommend &&
                mbtirecommend.map((movie, index) => (
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
      )}

      <p className="movielist-title">넷플릭스 인기작</p>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {netflixList &&
            netflixList.map((movie, index) => (
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

      <p className="movielist-title">티빙 인기작</p>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {tvingList &&
            tvingList.map((movie, index) => (
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

      <p className="movielist-title">웨이브 인기작</p>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {waveList &&
            waveList.map((movie, index) => (
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

      {localStorage.getItem('clientId') && reviewCount > 3 &&
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

      <p className="movielist-title">영화 전체 목록</p>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {movieList &&
            movieList.map((movie, index) => (
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

    </div>
  );
};

export default MovieList;
