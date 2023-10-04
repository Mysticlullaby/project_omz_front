import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    reviewList: []
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
        }
    }
})

export const reviewReducers = reviewSlice.actions;
export default reviewSlice;