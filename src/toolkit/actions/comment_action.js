import axios from "axios"
import { commentReducers } from "../reducers/comment_reducer";

function getCommentWrite(formData, config) {
    return async () => {
        await axios
            .post(`/comment/write`, formData, config)
            .then((response) => response.data);
    }
}

function getCommentList(reviewId) {
    return async (dispatch) => {
        const data = await axios
            .get(`/comment/list/${reviewId}`)
            .then((response) => response.data);
        dispatch(commentReducers.getCommentList({ data }));
    }
}

export const commentActions = {
    getCommentWrite, getCommentList
}