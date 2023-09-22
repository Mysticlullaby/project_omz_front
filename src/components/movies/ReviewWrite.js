import React, { useEffect, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import styled from 'styled-components';

function ReviewWrite({ isOpen, closeModal }) {
    const [inputs, setInputs] = useState({ content: '' });
    const content = inputs;


    const [clicked, setClicked] = useState([false, false, false, false, false, false, false, false, false, false]);
    const starArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 10; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
        console.log('clickStates: ', clickStates);
    };

    useEffect(() => {
        sendReview();
    }, [clicked]);

    const sendReview = () => {
        let score = clicked.filter(Boolean).length;
        console.log('score: ', score);
    };


    return (
        <div style={{ display: isOpen ? "block" : "none" }}>
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                zIndex: 998
            }}>
            </div>
            <div className='card'
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    maxWidth: "100%",
                    maxHeight: "90%",
                    overflowY: "auto",
                    backgroundColor: "white",
                    zIndex: 999
                }}>

                <div className='card-body'>
                    <h5 className='card-title border-bottom pb-2'>리뷰쓰기</h5>
                    <p className='card-text border-bottom pb-2'>글 작성 부분</p>
                    <div className='card-text border-bottom pb-3 mb-2'>
                        <div className='mb-2'>
                            나의 평점
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: 800, fontSize: 26 }}>
                            </span>
                            <Stars>
                                <span>
                                    {starArray.map((el, idx) => {
                                        return (
                                            <IoIosStar
                                                key={idx}
                                                size="30"
                                                onClick={() => handleStarClick(el)}
                                                className={clicked[idx] && 'yellowStar'}
                                            />
                                        );
                                    })}
                                </span>
                            </Stars>
                        </div>
                    </div>
                    <div className='d-flex flex-row-reverse'>
                        <div>
                            <button className='btn btn-danger' onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReviewWrite;

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