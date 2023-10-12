import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { Link, NavLink, useParams } from "react-router-dom";
import ReviewWrite from "./ReviewWrite";
import { IoIosStar } from "react-icons/io";
import { reviewActions } from "../../toolkit/actions/review_action";
import styled from "styled-components";
import { PiThumbsUp, PiThumbsUpFill } from 'react-icons/pi';
import { RxChatBubble } from 'react-icons/rx'

const MovieDetail = () => {
  const { movieId } = useParams();
  console.log("MovieDetail.js movieId: ", movieId);

  const dispatch = useDispatch();

  //모달창 상태값 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달창 상태를 변경하는 함수
  const openModal = (e) => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const getMovieDetail = (movieId) => {
    dispatch(movieActions.getMovieDetail(movieId));
  };

  const getReviewList = (movieId) => {
    dispatch(reviewActions.getReviewList(movieId, localStorage.getItem('clientId')));
  }

  useEffect(() => {
    getMovieDetail(movieId);
    getReviewList(movieId);
  }, []);

  const movie = useSelector((state) => state.movies.movieDetail);
  const reviewList = useSelector((state) => state.reviews.reviewList);

  return (
    <div>
      <div className="image-box">
        <img className="image-thumbnail" src={movie.image} />
      </div>
      <div className="container">
        <div className="row border-bottom">
          <div className="col-3">
            <img className="poster-box" src={movie.poster} />
          </div>
          <div className="col-9" style={{ padding: 40 }}>
            <h1 style={{ fontWeight: 800 }}>{movie.title}</h1>
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
                    <button className="btn btn-danger" onClick={openModal}>리뷰 작성하기</button>
                    <ReviewWrite isOpen={isModalOpen} closeModal={closeModal} movie={movie} />
                  </li>
                </ul>
                <div>
                  <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                      <NavLink to={`/review/page/${movieId}/1`} className='nav-link'>
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

        {reviewList &&
          reviewList.map((review) => {
            let score = review.rating;
            let scoreStates = [true, false, false, false, false];
            for (let n = 0; n < 5; n++) {
              scoreStates[n] = n < score ? true : false;
            }

            return (
              <div key={review.reviewId} className="col">
                <Link to={`/review/detail/${review.reviewId}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ width: "18 rem", height: 320 }}>
                    <div className="card-body" >
                      <h5 className="card-title border-bottom pb-2">{review.clientId}</h5>
                      <Stars>
                        <span>
                          {scoreStates.map((isTrue, idx) => {
                            return (
                              <IoIosStar
                                key={idx}
                                size="15"
                                className={isTrue && 'yellowStar'}
                              />
                            );
                          })}
                        </span>
                      </Stars>
                      <div>
                        <p className="card-text border-top mt-2 pt-2 context-area">{review.reviewContent}</p>

                      </div>
                      <div>
                        <p className='card-text border-top pt-2'>
                          {review.likeCheck
                            ? <PiThumbsUpFill className='icon me-2' />
                            : <PiThumbsUp className='icon me-2' />}

                          {review.likeCount}

                          <RxChatBubble className='icon ms-3 me-2' />
                          {review.commentCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
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

  span:hover > svg{
    color:red
  }

  svg:hover ~ svg{
    color: gray;
  }

  svg.yellowStar {
    color: red;
  }
`;
