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

export const reviewActions = {
    getReviewWrite, getReviewList
}