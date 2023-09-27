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
        }
    }
})

export const reviewReducers = reviewSlice.actions;
export default reviewSlice;