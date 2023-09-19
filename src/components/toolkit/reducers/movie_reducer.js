import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    movieList: []
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMovieList(state, action) {
            state.movieList = action.payload.data
        }
    }
})

export const movieReducers = movieSlice.actions;
export default movieSlice;