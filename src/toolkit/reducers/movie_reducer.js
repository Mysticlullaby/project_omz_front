import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    omzPopularList: [],
    netflixPopular: [],
    tvingPopular: [],
    wavePopular: [],
    recommandList: [],
    movieList: [],
    searchList: [],
    movieDetail: {}
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getOmzPopular(state, action) {
            state.omzPopularList = action.payload.data
        },

        getNetflixPopular(state, action) {
            state.netflixPopular = action.payload.data
        },

        getTvingPopular(state, action) {
            state.tvingPopular = action.payload.data
        },

        getWavePopular(state, action) {
            state.wavePopular = action.payload.data
        },

        getRecommandList(state, action) {
            state.recommandList = action.payload.data
        },

        getMovieList(state, action) {
            state.movieList = action.payload.data
        },

        getSearchList(state, action) {
            state.searchList = action.payload.data
        },

        getMovieDetail(state, action) {
            state.movieDetail = action.payload.data
        }
    }
})

export const movieReducers = movieSlice.actions;
export default movieSlice;