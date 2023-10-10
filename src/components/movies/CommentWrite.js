import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentActions } from '../../toolkit/actions/comment_action';

const CommentWrite = ({ isOpen, closePanel, review }) => {
    const [inputs, setInputs] = useState({ commentContent: '' });
    const { commentContent } = inputs;
    const dispatch = useDispatch();


    const handleValueChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('reviewId', review.reviewId);
        formData.append('clientId', localStorage.getItem('clientId'));
        formData.append('commentContent', commentContent);

        const config = {
            headers: {
                Authorization: localStorage.getItem('authorization'),
            },
        };

        await dispatch(commentActions.getCommentWrite(formData, config));

        window.location.replace(`/review/detail/${review.reviewId}`);
    }

    const onClose = () => {
        closePanel();
        setInputs({
            commentContent: '',
        });
    }

    return (
        <form onSubmit={onSubmit}>
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
                        <h5 className='card-title border-bottom pb-2'>댓글 쓰기</h5>
                        <div className='card-text border-bottom pb-2 mb-2'>
                            <textarea name='commentContent' style={{ width: '100%' }} rows='12' value={commentContent} onChange={handleValueChange} />
                        </div>
                        <div className='d-flex flex-row-reverse'>
                            <div>
                                <button type='button' className='btn btn-danger mx-1' onClick={onClose}>닫기</button>
                                <input type='submit' className='btn btn-danger mx-1' value='작성하기' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default CommentWrite;