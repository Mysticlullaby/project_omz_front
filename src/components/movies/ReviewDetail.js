import React, { useEffect, useState } from 'react';
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reviewActions } from '../../toolkit/actions/review_action';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewUpdate from './ReviewUpdate';

const ReviewDetail = () => {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const review = useSelector((state) => state.reviews.reviewDetail);
    const pv = useSelector((state) => state.reviews.pv);
    const movie = useSelector((state) => state.movies.movieDetail);

    console.log('movieId on ReviewDetails: ', movie.movieId);

    //모달창 상태값 변수
    const [isModalOpen, setIsModalOpen] = useState(false);


    //모달창 상태를 변경하는 함수
    const openModal = (e) => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
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


    const onHandleDelete = (e) => {
        e.preventDefault();
        dispatch(reviewActions.getReviewDelete(reviewId, config));
        navigator(`/review/page/${review.movieId}/${pv.currentPage}`)
    }

    useEffect(() => {
        console.log('reviewDetail page useEffect activated');
        getReviewDetail(reviewId);

    }, [dispatch, reviewId])

    let score = review.rating;
    let scoreStates = [true, false, false, false, false, false, false, false, false, false];
    for (let n = 0; n < 10; n++) {
        scoreStates[n] = n < score ? true : false;
    }

    return (
        <div>
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
                    <button className='btn btn-danger' onClick={onHandleDelete}>삭제</button>
                    <button className='btn btn-danger' onClick={openModal}>수정</button>
                    {review.reviewContent &&
                        <ReviewUpdate isOpen={isModalOpen} closeModal={closeModal} movie={movie} />
                    }
                </div>
            </div>
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