import axios from "axios";
import { movieReducers } from "../reducers/movie_reducer";

function getMovieList() {
  return async (dispatch) => {
    const data = await axios
      .get(`/movie/list`)
      .then((response) => response.data);
    console.log('axios data: ', data);
    dispatch(movieReducers.getMovieList({ data }));
  }
}

function getMovieDetail(movieId) {
  return async (dispatch) => {
    console.log('axios movieId: ', movieId);
    const data = await axios
      .get(`/movie/${movieId}`)
      .then((response) => response.data);
    console.log('axios data: ', data);
    dispatch(movieReducers.getMovieDetail({ data }));
  }
}

export const movieActions = {
  getMovieList, getMovieDetail
}
