import React, { useEffect, useState } from 'react';
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reviewActions } from '../../toolkit/actions/review_action';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ReviewUpdate from './ReviewUpdate';
import CommentWrite from './CommentWrite';
import { commentActions } from '../../toolkit/actions/comment_action';
import CommentRow from './CommentRow';

const ReviewDetail = () => {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const review = useSelector((state) => state.reviews.reviewDetail);
    const pv = useSelector((state) => state.reviews.pv ? state.reviews.pv : { currentPage: 1 });
    const movie = useSelector((state) => state.movies.movieDetail);
    const commentList = useSelector((state) => state.comments.commentList);

    console.log('commentList: ', commentList);
    console.log('movieId on ReviewDetails: ', movie.movieId);

    //모달창 상태값 변수
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isPanelOpen, setIsPanelOpen] = useState(false);


    //모달창 상태를 변경하는 함수
    const openModal = (e) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openPanel = () => {
        setIsPanelOpen(true);
    }

    const closePanel = () => {
        setIsPanelOpen(false);
    }

    const config = {
        headers: {
            Authorization: localStorage.getItem('authorization'),
        },
    };

    const getReviewDetail = (reviewId) => {
        console.log('getReviewDetail function processing');
        dispatch(reviewActions.getReviewDetail(reviewId));
    }

    const getCommentList = (reviewId) => {
        dispatch(commentActions.getCommentList(reviewId));
    }


    const onHandleDelete = (e) => {
        e.preventDefault();
        dispatch(reviewActions.getReviewDelete(reviewId, config));
        console.log('currentPage parameter value on delete function: ', pv.currentPage);
        navigator(`/review/page/${review.movieId}/${pv.currentPage}`)
    }

    useEffect(() => {
        console.log('reviewDetail page useEffect activated');
        getReviewDetail(reviewId);
        getCommentList(reviewId);
    }, [dispatch, reviewId])

    let score = review.rating;
    let scoreStates = [true, false, false, false, false];
    for (let n = 0; n < 5; n++) {
        scoreStates[n] = n < score ? true : false;
    }

    return (
        <div>
            <div className="row mx-4 mb-4 mt-5">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse justify-content-space-between" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <h1>리뷰</h1>
                                </li>
                            </ul>
                            <div>
                                <ul className="navbar-nav align-items-center">
                                    <li className="nav-item">
                                        <NavLink to={`/review/page/${review.movieId}/${pv.currentPage}`} className='nav-link'>
                                            목록으로
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

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
                    <button className='btn btn-danger mx-2' onClick={openPanel}>댓글 쓰기</button>

                    {localStorage.getItem('clientId') === review.clientId && (
                        <>
                            <button className='btn btn-danger mx-1' onClick={openModal}>수정</button>
                            <button className='btn btn-danger mx-1' onClick={onHandleDelete}>삭제</button>
                        </>
                    )}

                    <ReviewUpdate isOpen={isModalOpen} closeModal={closeModal} movie={movie} />
                    <CommentWrite isOpen={isPanelOpen} closePanel={closePanel} review={review} />
                </div>
            </div>
            <CommentRow commentList={commentList} review={review} />
        </div>
    );
};

export default ReviewDetail;

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