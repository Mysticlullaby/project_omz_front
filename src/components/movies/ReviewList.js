import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { reviewActions } from '../../toolkit/actions/review_action';
import { IoIosStar } from "react-icons/io";
import styled from "styled-components";
import ReviewPageNavigation from './ReviewPageNavigation';
import ReviewWrite from './ReviewWrite';
import { movieActions } from '../../toolkit/actions/movie_action';
import { PiThumbsUp, PiThumbsUpFill } from 'react-icons/pi';
import { RxChatBubble } from 'react-icons/rx'

const ReviewList = () => {
    const { movieId, currentPage } = useParams();
    const dispatch = useDispatch();

    const getReviewPage = (movieId, currentPage) => {
        dispatch(reviewActions.getReviewPage(movieId, currentPage, localStorage.getItem('clientId')));
    };

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

    useEffect(() => {
        getMovieDetail(movieId);
        getReviewPage(movieId, currentPage);
    }, []);

    const movie = useSelector((state) => state.movies.movieDetail);
    const reviewList = useSelector((state) => state.reviews.reviewPage);
    const pv = useSelector((state) => state.reviews.pv);

    console.log('movieId on ReviewList: ', movie.movieId);

    return (
        <div>
            <div className="row mx-4 mb-4 mt-5">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse justify-content-space-between" id="navbarNav">
                            <ul className="navbar-nav align-items-center gap-5">
                                <li className="nav-item">
                                    <h1>리뷰</h1>
                                </li>
                                <li className="nav-item">
                                    <button className='btn btn-danger' onClick={openModal}>리뷰 작성하기</button>
                                    <ReviewWrite isOpen={isModalOpen} closeModal={closeModal} movie={movie} />
                                </li>
                            </ul>
                            <div>
                                <ul className="navbar-nav align-items-center">
                                    <li className="nav-item">
                                        <NavLink to={`/movie/${movieId}`} className='nav-link'>
                                            돌아가기
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div style={{ padding: 10 }}>
                {reviewList &&
                    reviewList.map((review) => {
                        let score = review.rating;
                        let scoreStates = [true, false, false, false, false];
                        for (let n = 0; n < 5; n++) {
                            scoreStates[n] = n < score ? true : false;
                        }

                        return (
                            <div key={review.reviewId} >
                                <Link to={`/review/detail/${review.reviewId}`} style={{ textDecoration: 'none' }}>
                                    <div className="card my-3" style={{ width: "18 rem" }}>
                                        <div className="card-body">
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
                                            <p className="card-text border-top mt-2 pt-2">{review.reviewContent}</p>
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
                                </Link>
                            </div>

                        )
                    })}
            </div>
            {pv && <ReviewPageNavigation getReviewPage={getReviewPage} />}
        </div>
    );
};

export default ReviewList;

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
