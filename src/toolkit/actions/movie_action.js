import axios from "axios";
import { movieReducers } from "../reducers/movie_reducer";

function getMovieList() {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList`).then((response) => JSON.parse(response.data));
    console.log("axios data: ", data);
    dispatch(movieReducers.getMovieList({ data }));
  };
}

function getMovieDetail(movieId, clientId) {
  return async (dispatch) => {
    console.log("axios movieId: ", movieId);
    const data = await axios.get(`/movie/${movieId}/${clientId}`).then((response) => response.data);
    console.log("axios data: ", data);
    dispatch(movieReducers.getMovieDetail({ data }));
  };
}

export const movieActions = {
  getMovieList,
  getMovieDetail,
};
