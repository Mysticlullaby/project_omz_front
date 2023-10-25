import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = (e) => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const clientId = localStorage.getItem("clientId");
  const [reviewCount, setReviewCount] = useState(0);

  const getOmzPopular = () => {
    dispatch(movieActions.getOmzPopular());
  };

  const getNetflixPopular = () => {
    dispatch(movieActions.getNetflixPopular());
  };

  const getTvingPopular = () => {
    dispatch(movieActions.getTvingPopular());
  };

  const getWavePopular = () => {
    dispatch(movieActions.getWavePopular());
  };

  const getMovieList = () => {
    dispatch(movieActions.getMovieList());
  };

  const getRecommandList = () => {
    dispatch(movieActions.getRecommandList(clientId));
  };

  const checkReviewCount = async () => {
    const response = await axios.get(`/review/count/${clientId}`);
    const updatedReviewCount = response.data;
    setReviewCount(updatedReviewCount);
    console.log("reviewCount: ", updatedReviewCount);
    if (updatedReviewCount > 3) {
      getRecommandList();
    }
  };

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
      <div>
        <Popup isOpen={isModalOpen} closeModal={closeModal} />
      </div>
      <div className="d-flex align-items-center mt-5">
        <p className="movielist-title">OMZ 회원들이 가장 많이 본 작품</p>
        <p className="me-4"></p>
      </div>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {omzPopularList &&
            omzPopularList.map((movie, index) => (
              <div key={movie.movieId} className="col">
                <div className="card" style={{ width: "18 rem" }}>
                  <NavLink to={`/movie/${movie.movieId}`}>
                    <div className="number-hear">{index + 1}</div>
                    <div className="ott-tag">
                      {movie.provider &&
                        movie.provider.map((platform, index) => {
                          return (
                            <div key={index}>
                              {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                              {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                              {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                              {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                            </div>
                          );
                        })}
                    </div>
                    <img src={movie.poster} className="card-img-top size" alt={movie.title} />
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
          <div className="d-flex align-items-center mt-5">
            <p className="movielist-title">{localStorage.getItem("mbti")} 사이에서는 이런 영화가 인기에요</p>
            <p className="me-4"></p>
          </div>
          <div className="container">
            <div className="row row-cols-md-5 g-3">
              {mbtirecommend &&
                mbtirecommend.map((movie, index) => (
                  <div key={movie.movieId} className="col">
                    <div className="card" style={{ width: "18 rem" }}>
                      <NavLink to={`/movie/${movie.movieId}`}>
                        <div className="number-hear">{index + 1}</div>
                        <div className="ott-tag">
                          {movie.provider.map((platform, index) => {
                            return (
                              <div key={index}>
                                {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                                {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                                {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                                {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                              </div>
                            );
                          })}
                        </div>
                        <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                      </NavLink>
                      <div className="card-body">
                        <p className="card-text-main">{movie.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {localStorage.getItem("clientId") && reviewCount > 3 &&
        <div>
          <div className="d-flex align-items-center mt-5">
            <p className="movielist-title">{clientId}님, 이런 작품은 어떠세요?</p>
          </div>
          <div className="container">
            <div className="row row-cols-md-5 g-3">
              {recommandList &&
                recommandList.map((movie, index) => (
                  <div key={movie.movieId} className="col">
                    <div className="card" style={{ width: "18 rem" }}>
                      <NavLink to={`/movie/${movie.movieId}`}>
                        <div className="ott-tag">
                          {movie.provider.map((platform, index) => {
                            return (
                              <div key={index}>
                                {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                                {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                                {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                                {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                              </div>
                            );
                          })}
                        </div>
                        <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                      </NavLink>
                      <div className="card-body">
                        <p className="card-text-main">{movie.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      }

      <div className="d-flex align-items-center mt-5">
        <p className="movielist-title">넷플릭스 인기작</p>
        <NavLink to={`/moreList/넷플릭스`}>
          <p className="me-4">더 보기</p>
        </NavLink>
      </div>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {netflixList &&
            netflixList.map((movie, index) => {
              return (
                <div key={movie.movieId} className="col">
                  <div className="card" style={{ width: "18 rem" }}>
                    <NavLink to={`/movie/${movie.movieId}`}>
                      <div className="number-hear">{index + 1}</div>
                      <div className="ott-tag">
                        {movie.provider.map((platform, index) => {
                          return (
                            <div key={index}>
                              {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                              {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                              {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                              {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                            </div>
                          );
                        })}
                      </div>
                      <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                    </NavLink>
                    <div className="card-body">
                      <p className="card-text-main">{movie.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="d-flex align-items-center mt-5">
        <p className="movielist-title">티빙 인기작</p>
        <NavLink to={`/moreList/티빙`}>
          <p className="me-4">더 보기</p>
        </NavLink>
      </div>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {tvingList &&
            tvingList.map((movie, index) => (
              <div key={movie.movieId} className="col">
                <div className="card" style={{ width: "18 rem" }}>
                  <NavLink to={`/movie/${movie.movieId}`}>
                    <div className="number-hear">{index + 1}</div>
                    <div className="ott-tag">
                      {movie.provider.map((platform, index) => {
                        return (
                          <div key={index}>
                            {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                            {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                            {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                            {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                          </div>
                        );
                      })}
                    </div>
                    <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                  </NavLink>
                  <div className="card-body">
                    <p className="card-text-main">{movie.title}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="d-flex align-items-center mt-5">
        <p className="movielist-title">웨이브 인기작</p>
        <NavLink to={`/moreList/웨이브`}>
          <p className="me-4">더 보기</p>
        </NavLink>
      </div>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {waveList &&
            waveList.map((movie, index) => (
              <div key={movie.movieId} className="col">
                <div className="card" style={{ width: "18 rem" }}>
                  <NavLink to={`/movie/${movie.movieId}`}>
                    <div className="number-hear">{index + 1}</div>
                    <div className="ott-tag">
                      {movie.provider.map((platform, index) => {
                        return (
                          <div key={index}>
                            {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                            {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                            {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                            {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                          </div>
                        );
                      })}
                    </div>
                    <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                  </NavLink>
                  <div className="card-body">
                    <p className="card-text-main">{movie.title}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>


      {/* <p className="movielist-title">영화 전체 목록</p>
      <div className="container">
        <div className="row row-cols-md-5 g-3">
          {movieList &&
            movieList.map((movie, index) => (
              <div key={movie.movieId} className="col">
                <div className="card" style={{ width: "18 rem" }}>
                  <NavLink to={`/movie/${movie.movieId}`}>
                    <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                  </NavLink>
                  <div className="card-body">
                    <p className="card-text-main">{movie.title}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default MovieList;
