import axios from "axios";
import { reviewReducers } from "../reducers/review_reducer";

function getReviewWrite(formData, config) {
    return async () => {
        await axios
            .post(`/review/write`, formData, config)
            .then((response) => response.data);
    }
}

function getReviewList(movieId) {
    return async (dispatch) => {
        const data = await axios
            .get(`/review/list/${movieId}`)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log('axios reviewList data: ', data);
        dispatch(reviewReducers.getReviewList({ data }));
    }
}

function getReviewPage(movieId, currentPage) {
    return async (dispatch) => {
        const data = await axios
            .get(`/review/page/${movieId}/${currentPage}`)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        dispatch(reviewReducers.getReviewPage({ data }));
    }
}

function getReviewDetail(reviewId) {
    return async (dispatch) => {
        const data = await axios
            .get(`/review/detail/${reviewId}`)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log('axios reviewDetail data: ', data);
        dispatch(reviewReducers.getReviewDetail({ data }));
    }
}

function getReviewDelete(reviewId, config) {
    return async () => {
        await axios
            .delete(`/review/delete/${reviewId}`, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    }
}

function getReviewUpdate(formData, config) {
    return async () => {
        console.log('movieId in ReviewUpdate Action: ', formData.movieId);
        console.log('reviewContent in ReviewUpdate Action: ', formData.reviewContent);
        await axios
            .put(`/review/update`, formData, config)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    }
}

export const reviewActions = {
    getReviewWrite, getReviewList, getReviewPage, getReviewDetail, getReviewDelete, getReviewUpdate
}