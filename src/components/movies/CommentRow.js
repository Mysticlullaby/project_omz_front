import React, { useState } from 'react';
import CommentUpdate from './CommentUpdate';
import { commentActions } from '../../toolkit/actions/comment_action';
import { useDispatch } from 'react-redux';

const CommentRow = ({ commentList, review }) => {
    const dispatch = useDispatch();

    const [editingCommentId, setEditingCommentId] = useState(null);

    const startEditing = (commentId) => {
        setEditingCommentId(commentId);
    };

    const stopEditing = () => {
        setEditingCommentId(null);
    };

    const onHandleDelete = (commentId) => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('authorization'),
            },
        };
        dispatch(commentActions.getCommentDelete(commentId, config));
        window.location.replace(`/review/detail/${review.reviewId}`);
    }

    return (
        <>
            {commentList.map((comment) => (
                <div key={comment.commentId} className='px-2 py-2 border-bottom'>
                    <div className='py-1'>
                        {comment.clientId}
                    </div>
                    <div className='py-1'>
                        {comment.commentContent}
                    </div>
                    {comment.clientId === localStorage.getItem('clientId') && (
                        <>
                            {editingCommentId === comment.commentId && (
                                <CommentUpdate comment={comment} review={review} stopEditing={stopEditing} />
                            )}
                            <button className='btn btn-light btn-sm mx-1' onClick={() => startEditing(comment.commentId)}>수정</button>
                            <button className='btn btn-light btn-sm mx-1' onClick={() => onHandleDelete(comment.commentId)} >삭제</button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default CommentRow;