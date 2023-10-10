import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    reviewList: [],
    reviewDetail: {
        reviewId: '',
        movieId: '',
        rating: '',
        reviewContent: ''
    },
    pv: {
        currentPage: 1
    }
}

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        getReviewList(state, action) {
            state.reviewList = action.payload.data;
        },

        getReviewPage(state, action) {
            state.reviewPage = action.payload.data.reviewPage;
            state.pv = action.payload.data.pv;
        },

        getReviewDetail(state, action) {
            state.reviewDetail = action.payload.data;
        }
    }
})

export const reviewReducers = reviewSlice.actions;
export default reviewSlice;