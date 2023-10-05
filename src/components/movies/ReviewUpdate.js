import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosStar } from 'react-icons/io';
import styled from 'styled-components';
import { reviewActions } from '../../toolkit/actions/review_action';

function ReviewUpdate({ isOpen, closeModal, movie }) {
    const review = useSelector((state) => state.reviews.reviewDetail);
    console.log('스테이트에서 새로 가져온 리뷰 데이타: ', review);

    const [inputs, setInputs] = useState({
        reviewContent: review.reviewContent,
        rating: review.rating,
    });

    const { reviewContent, rating } = inputs;

    const dispatch = useDispatch();

    let initialArray = [false, false, false, false, false, false, false, false, false, false];
    for (let i = 0; i < 10; i++) {
        initialArray[i] = i < review.rating ? true : false;
    }

    const [clicked, setClicked] = useState(initialArray);

    const starArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleStarClick = (index) => {
        const newRating = index + 1;

        let updatedClicked = [false, false, false, false, false, false, false, false, false, false];
        for (let i = 0; i < 10; i++) {
            updatedClicked[i] = i < newRating ? true : false;
        }
        setClicked(updatedClicked);

        setInputs((prevState) => ({
            ...prevState,
            rating: newRating,
        }));
    };

    console.log('submitted movieId in FormData', movie.movieId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log('submitted movieId in FormData', movie.movieId);
        console.log('submitted reviewContent in FormData', reviewContent);
        formData.append('movieId', movie.movieId);
        formData.append('clientId', localStorage.getItem('clientId'));
        formData.append('reviewContent', reviewContent);
        formData.append('rating', rating);

        const config = {
            headers: {
                Authorization: localStorage.getItem('authorization'),
            },
        };

        await dispatch(reviewActions.getReviewUpdate(formData, config));

        // window.location.replace(`/review/detail/${review.reviewId}`);
    };

    const onHandleClose = (e) => {
        e.preventDefault();
        closeModal();
        setInputs(review);
        let clickStates = [false, false, false, false, false, false, false, false, false, false];
        for (let i = 0; i < 10; i++) {
            clickStates[i] = i < review.rating ? true : false;
        }
        setClicked(clickStates);
    };

    const handleValueChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        setInputs(review);

        let clickStates = [false, false, false, false, false, false, false, false, false, false];
        for (let i = 0; i < 10; i++) {
            clickStates[i] = i < review.rating ? true : false;
        }
        setClicked(clickStates);

    }, [review]);

    return (
        <form onSubmit={onSubmit}>
            <div style={{ display: isOpen ? 'block' : 'none' }}>
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        zIndex: 998,
                    }}
                ></div>

                <div
                    className='card'
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        maxWidth: '100%',
                        maxHeight: '90%',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        zIndex: 999,
                    }}
                >
                    <div className='card-body'>
                        <h5 className='card-title border-bottom pb-2'>리뷰 수정</h5>
                        <div className='card-text border-bottom pb-2'>
                            <textarea
                                name='reviewContent'
                                style={{ width: '100%' }}
                                rows='12'
                                value={reviewContent}
                                onChange={handleValueChange}
                            />
                        </div>
                        <div className='card-text border-bottom pb-3 mb-2'>
                            <div className='mb-2'>
                                나의 평점: <span style={{ fontWeight: 800, fontSize: 26 }}>{rating}</span>
                                <input type='hidden' readOnly name='rating' value={rating} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Stars>
                                    <span>
                                        {starArray.map((el, idx) => (
                                            <IoIosStar
                                                key={idx}
                                                size='30'
                                                onClick={() => handleStarClick(el)}
                                                className={clicked[idx] ? 'yellowStar' : ''}
                                            />
                                        ))}
                                    </span>
                                </Stars>
                            </div>
                        </div>
                        <div className='d-flex flex-row-reverse'>
                            <div>
                                <button type='button' className='btn btn-danger mx-1' onClick={onHandleClose}>
                                    닫기
                                </button>
                                <input type='submit' className='btn btn-danger mx-1' value='작성하기' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ReviewUpdate;

const Stars = styled.div`
  svg {
    color: gray;
    cursor: pointer;
  }

  span:hover > svg {
    color: red;
  }

  svg:hover ~ svg {
    color: gray;
  }

  svg.yellowStar {
    color: red;
  }
`;
