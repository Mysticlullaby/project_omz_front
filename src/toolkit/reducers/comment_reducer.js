import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    commentList: []
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        getCommentList(state, action) {
            state.commentList = action.payload.data;
        }
    }
})

export const commentReducers = commentSlice.actions;
export default commentSlice;