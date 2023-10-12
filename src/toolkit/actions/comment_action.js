import axios from "axios"
import { commentReducers } from "../reducers/comment_reducer";

function getCommentWrite(formData, config) {
    return async () => {
        await axios
            .post(`/comment/write`, formData, config)
            .then((response) => response.data);
    }
}

function getCommentList(reviewId, clientId) {
    return async (dispatch) => {
        const data = await axios
            .get(`/comment/list/${reviewId}/${clientId}`)
            .then((response) => response.data);
        dispatch(commentReducers.getCommentList({ data }));
    }
}

function getCommentUpdate(formData, config) {
    return async () => {
        await axios
            .put(`/comment/update`, formData, config)
            .then((response) => response.data);
    }
}

function getCommentDelete(commentId, config) {
    return async () => {
        await axios
            .delete(`/comment/delete/${commentId}`, config)
            .then((response) => response.data);
    }
}

export const commentActions = {
    getCommentWrite, getCommentList, getCommentUpdate, getCommentDelete
}