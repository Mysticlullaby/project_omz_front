import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { Link, NavLink, useParams } from "react-router-dom";
import ReviewWrite from "./ReviewWrite";
import { IoIosStar } from "react-icons/io";
import { reviewActions } from "../../toolkit/actions/review_action";
import styled from "styled-components";
import { PiThumbsUp, PiThumbsUpFill } from "react-icons/pi";
import { RxChatBubble } from "react-icons/rx";
import { TbEyePlus } from "react-icons/tb";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";

const MovieDetail = () => {
  const { movieId } = useParams();
  console.log("MovieDetail.js movieId: ", movieId);

  const dispatch = useDispatch();

  const [eyeState, setEyeState] = useState(false);

  //좋아요 추가,삭제 버튼 쿨다운
  const [isClickOnCool, setIsClickOnCool] = useState();

  //모달창 상태값 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달창 상태를 변경하는 함수
  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const getMovieDetail = (movieId) => {
    dispatch(movieActions.getMovieDetail(movieId, localStorage.getItem("clientId")));
  };

  const getReviewList = (movieId) => {
    dispatch(reviewActions.getReviewList(movieId, localStorage.getItem("clientId")));
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  };

  const addViewCount = async () => {
    if (localStorage.getItem("clientId") == null) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isClickOnCool) {
      return;
    }

    setIsClickOnCool(true);

    setTimeout(() => {
      setIsClickOnCool(false);
    }, 1000);

    const formData = new FormData();
    formData.append("movieId", movieId);
    formData.append("clientId", localStorage.getItem("clientId"));

    await axios.post(`/view/add`, formData, config);

    getMovieDetail(movieId);
  };

  const removeViewCount = async () => {
    if (isClickOnCool) {
      return;
    }

    setIsClickOnCool(true);

    setTimeout(() => {
      setIsClickOnCool(false);
    }, 1000);

    await axios.delete(`/view/delete/${movieId}/${localStorage.getItem("clientId")}`, config);

    getMovieDetail(movieId);
  };

  useEffect(() => {
    console.log("useEffect in action");
    getMovieDetail(movieId);
    getReviewList(movieId);
  }, []);

  const movie = useSelector((state) => state.movies.movieDetail);

  // console.log('platform list: ', movie.provider);
  // console.log(typeof (movie.provider));
  // const platformList = movie.provider.slice(1, -1).split("', '");

  const reviewList = useSelector((state) => state.reviews.reviewList);

  return (
    <div>
      <div className="image-box-detail">
        <img className="image-thumbnail" src={movie.image} />
        <div className="ott-tag-detail">
          {movie.platformList &&
            movie.platformList.map((platform, index) => {
              return (
                <div key={index}>
                  {platform === "넷플릭스" && <img className="platform-icon-detail" src="/images/netflix_icon.png" alt={platform} />}
                  {platform === "티빙" && <img className="platform-icon-detail" src="/images/tving_icon.png" alt={platform} />}
                  {platform === "웨이브" && <img className="platform-icon-detail" src="/images/wavve_icon.png" alt={platform} />}
                  {platform === "디즈니+" && <img className="platform-icon-detail" src="/images/disney_icon.png" alt={platform} />}
                </div>
              );
            })}
        </div>
      </div>
      <div className="container">
        <div className="row border-bottom">
          <div className="col-3">
            <img className="poster-box" src={movie.poster} />
          </div>
          <div className="col-9" style={{ padding: 40 }}>
            <div className="d-flex">
              <div className="me-auto">
                <h1 style={{ fontWeight: 800 }}>{movie.title}</h1>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Eyes>
                  {movie.viewCheck ? (
                    <div onMouseEnter={() => setEyeState(true)} onMouseLeave={() => setEyeState(false)}>
                      {eyeState ? (
                        <span onClick={removeViewCount}>
                          <IoMdEyeOff className="opened-eye" size="50px" />
                        </span>
                      ) : (
                        <span onClick={removeViewCount}>
                          <IoMdEye className="opened-eye" size="50px" />
                        </span>
                      )}
                    </div>
                  ) : (
                    <span onClick={addViewCount}>
                      <TbEyePlus className="closed-eye" size="50px" />
                    </span>
                  )}
                </Eyes>
                <span className="mt-1" style={{ fontSize: "12px" }}>
                  본 적 있어요
                </span>
              </div>
            </div>
            <hr />
            <span className="mx-1">우리 회원 중 {movie.viewCount} 명이 이 작품을 봤어요.</span>
            <span className="mx-1">또 다른 스팬 요소에요.</span>
            <hr />
            <p>{movie.movieDescription}</p>
          </div>
        </div>

        <div className="row">
          <h1 className="mx-4 mb-4 mt-5">트레일러</h1>
        </div>
        <div className="row border-bottom" style={{ padding: 10 }}>
          <iframe width="100%" height="400" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        <div className="row mx-4 mb-4 mt-5">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="collapse navbar-collapse justify-content-space-between" id="navbarNav">
                <ul className="navbar-nav align-items-center gap-5">
                  <li className="nav-item">
                    <h1>리뷰</h1>
                  </li>
                  <li className="nav-item">
                    {movie.reviewId === 0 ? (
                      localStorage.getItem("clientId") != null && (
                        <button className="btn btn-danger" onClick={openModal}>
                          리뷰 작성하기
                        </button>
                      )
                    ) : (
                      <NavLink to={`/review/detail/${movie.reviewId}`}>
                        <button className="btn btn-danger">내가 쓴 리뷰 보기</button>
                      </NavLink>
                    )}
                    <ReviewWrite isOpen={isModalOpen} closeModal={closeModal} movie={movie} />
                  </li>
                </ul>
                <div>
                  <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                      <NavLink to={`/review/page/${movieId}/1`} className="nav-link">
                        더 보기
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="row row-cols-md-4 g-2" style={{ padding: 10 }}>
        {reviewList.length > 0 ? (
          reviewList.map((review) => {
            let score = review.rating;
            let scoreStates = [true, false, false, false, false];
            for (let n = 0; n < 5; n++) {
              scoreStates[n] = n < score ? true : false;
            }

            return (
              <div key={review.reviewId} className="col">
                <Link to={`/review/detail/${review.reviewId}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ width: "18 rem", height: 320 }}>
                    <div className="card-body">
                      <h5 className="card-title border-bottom pb-2">{review.clientId}</h5>
                      <Stars>
                        <span>
                          {scoreStates.map((isTrue, idx) => {
                            return <IoIosStar key={idx} size="15" className={isTrue && "yellowStar"} />;
                          })}
                        </span>
                      </Stars>
                      <div>
                        <p className="card-text border-top mt-2 pt-2 context-area">{review.reviewContent}</p>
                      </div>
                      <div>
                        <p className="card-text border-top pt-2">
                          {review.likeCheck ? <PiThumbsUpFill className="icon me-2" /> : <PiThumbsUp className="icon me-2" />}

                          {review.likeCount}

                          <RxChatBubble className="icon ms-3 me-2" />
                          {review.commentCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div>
            <p>아직 작성된 리뷰가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;

const Stars = styled.div`
  svg {
    color: gray;
    cursor: pointer;
  }

  svg.yellowStar {
    color: red;
  }
`;

const Eyes = styled.div`
  svg {
    transition: all 100ms;
  }

  .opened-eye {
    color: black;
  }

  .closed-eye {
    color: #cbcbcb;
  }

  svg:hover {
    color: red;
    scale: 1.2;
  }

  svg:active {
    color: red;
    scale: 1.5;
  }
`;
