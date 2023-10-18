import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  omzPopularList: [],
  recommandList: [],
  mbtirecom: [],
  movieDetail: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getOmzPopular(state, action) {
      state.omzPopularList = action.payload.data;
    },

    getRecommandList(state, action) {
      state.recommandList = action.payload.data;
    },

    getMbtiRecommend(state, action) {
      state.mbtirecommend = action.payload.data;
    },
    getMovieDetail(state, action) {
      state.movieDetail = action.payload.data;
    },
  },
});

export const movieReducers = movieSlice.actions;
export default movieSlice;
