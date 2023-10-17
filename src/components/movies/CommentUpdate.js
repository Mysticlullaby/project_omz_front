import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentActions } from '../../toolkit/actions/comment_action';

const CommentUpdate = ({ stopEditing, review, comment }) => {
    const [inputs, setInputs] = useState({ commentContent: comment.commentContent });
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
        formData.append('commentId', comment.commentId);
        formData.append('reviewId', review.reviewId);
        formData.append('clientId', localStorage.getItem('clientId'));
        formData.append('commentContent', commentContent);

        const config = {
            headers: {
                Authorization: localStorage.getItem('authorization'),
            },
        };

        await dispatch(commentActions.getCommentUpdate(formData, config));

        stopEditing();

        window.location.replace(`/review/detail/${review.reviewId}`);
    }

    useEffect(() => {
        setInputs({ commentContent: comment.commentContent });
    }, [comment])

    return (
        <form onSubmit={onSubmit}>
            <div style={{ display: "block" }}>
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
                        <h5 className='card-title border-bottom pb-2'>댓글 수정</h5>
                        <div className='card-text border-bottom pb-2 mb-2'>
                            <textarea name='commentContent' style={{ width: '100%' }} rows='12' value={commentContent} onChange={handleValueChange} />
                        </div>
                        <div className='d-flex flex-row-reverse'>
                            <div>
                                <button type='button' className='btn btn-danger mx-1' onClick={stopEditing}>닫기</button>
                                <input type='submit' className='btn btn-danger mx-1' value='수정하기' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default CommentUpdate;