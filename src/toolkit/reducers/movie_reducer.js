import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    movieList: [],
    movieDetail: {}
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMovieList(state, action) {
            state.movieList = action.payload.data
        },

        getMovieDetail(state, action) {
            state.movieDetail = action.payload.data
        }
    }
})

export const movieReducers = movieSlice.actions;
export default movieSlice;