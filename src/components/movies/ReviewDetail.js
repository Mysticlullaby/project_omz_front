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
import { PiThumbsUp, PiThumbsUpFill } from 'react-icons/pi';
import { RxChatBubble } from 'react-icons/rx'
import { likeActions } from '../../toolkit/actions/like_action';

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

    //좋아요 추가,삭제 버튼 쿨다운
    const [isClickOnCool, setIsClickOnCool] = useState();

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
        dispatch(reviewActions.getReviewDetail(reviewId, localStorage.getItem('clientId')));
    }

    const getCommentList = (reviewId) => {
        dispatch(commentActions.getCommentList(reviewId, localStorage.getItem('clientId')));
    }


    const onHandleDelete = (e) => {
        e.preventDefault();
        dispatch(reviewActions.getReviewDelete(reviewId, config));
        console.log('currentPage parameter value on delete function: ', pv.currentPage);
        window.location.replace(`/review/page/${review.movieId}/${pv.currentPage}`);
    }

    const addLike = async () => {
        if (localStorage.getItem('clientId') == null) {
            alert('로그인이 필요합니다.');
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

        formData.append('clientId', localStorage.getItem('clientId'));
        formData.append('reviewId', reviewId);

        await dispatch(likeActions.addLike(formData, config));
        getReviewDetail(reviewId);
    }

    const removeLike = async () => {
        // alert('좋아요 취소합니다!');

        if (isClickOnCool) {
            return;
        }

        setIsClickOnCool(true);

        setTimeout(() => {
            setIsClickOnCool(false);
        }, 1000);

        await dispatch(likeActions.removeLike(reviewId, localStorage.getItem('clientId'), config));
        getReviewDetail(reviewId);
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
                    <Thumbs>
                        <p className='card-text border-top pt-2 mb-3'>
                            {review.likeCheck
                                ? <span onClick={removeLike}><PiThumbsUpFill className='icon thumbs me-2' /></span>
                                : <span onClick={addLike}><PiThumbsUp className='icon thumbs me-2' /></span>}

                            {review.likeCount}

                            <RxChatBubble className='icon ms-3 me-2' />
                            {review.commentCount}
                        </p>
                    </Thumbs>
                    {localStorage.getItem('clientId') && <button className='btn btn-danger mx-2' onClick={openPanel}>댓글 쓰기</button>}

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
            <CommentRow commentList={commentList} review={review} getCommentList={getCommentList} config={config} />
        </div>
    );
};

export default ReviewDetail;

const Stars = styled.div`
  svg {
    color: gray;
    cursor: pointer;
  }

  svg.yellowStar {
    color: red;
  }
`;

const Thumbs = styled.div`
  svg {
    color: black;
    width: 18px;
    height: 18px;
    transition: all 100ms;
  }

  svg.thumbs:hover {
    color: red;
    scale: 1.2;
  }

  svg.thumbs:active {
    color: red;
    scale: 1.5;
  }
`