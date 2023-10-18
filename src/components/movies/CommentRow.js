import React, { useState } from 'react';
import CommentUpdate from './CommentUpdate';
import { commentActions } from '../../toolkit/actions/comment_action';
import { useDispatch } from 'react-redux';
import { PiThumbsUp, PiThumbsUpFill } from 'react-icons/pi';
import styled from 'styled-components';
import axios from 'axios';

const CommentRow = ({ commentList, review, getCommentList, config }) => {
    const dispatch = useDispatch();

    const [editingCommentId, setEditingCommentId] = useState(null);

    //좋아요 추가,삭제 버튼 쿨다운
    const [isClickOnCool, setIsClickOnCool] = useState();

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

    const addLike = async (commentId) => {
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
        formData.append('commentId', commentId);

        await axios
            .post(`/comment/like`, formData, config)
            .then((response) => response.data);

        getCommentList(review.reviewId);
    }

    const removeLike = async (commentId) => {
        // alert('좋아요 취소합니다!');

        if (isClickOnCool) {
            return;
        }

        setIsClickOnCool(true);

        setTimeout(() => {
            setIsClickOnCool(false);
        }, 1000);

        await axios
            .delete(`/comment/delete/${commentId}/${localStorage.getItem('clientId')}`, config)
            .then((response) => response.data);
        getCommentList(review.reviewId);
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
                    <div className='py-1'>
                        <Thumbs>
                            <p className='card-text pt-2'>
                                {comment.likeCheck
                                    ? <span onClick={() => removeLike(comment.commentId)}><PiThumbsUpFill className='icon thumbs me-2' /></span>
                                    : <span onClick={() => addLike(comment.commentId)}><PiThumbsUp className='icon thumbs me-2' /></span>}
                                {comment.likeCount}
                            </p>
                        </Thumbs>
                    </div>
                    <div className='mt-2'>
                        {
                            comment.clientId === localStorage.getItem('clientId') && (
                                <>
                                    {editingCommentId === comment.commentId && (
                                        <CommentUpdate comment={comment} review={review} stopEditing={stopEditing} />
                                    )}
                                    <button className='btn btn-light btn-sm mx-1' onClick={() => startEditing(comment.commentId)}>수정</button>
                                    <button className='btn btn-light btn-sm mx-1' onClick={() => onHandleDelete(comment.commentId)} >삭제</button>
                                </>
                            )
                        }
                    </div>
                </div >
            ))}
        </>
    );
};

export default CommentRow;

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