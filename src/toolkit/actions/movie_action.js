import axios from "axios";
import { movieReducers } from "../reducers/movie_reducer";

function getOmzPopular() {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList/omzPopular`).then((response) => JSON.parse(response.data));
    console.log("axios data: ", data);
    dispatch(movieReducers.getOmzPopular({ data }));
  };
}

function getRecommandList(clientId) {
  return async (dispatch) => {
    const data = await axios
      .get(`http://127.0.0.1:5000/movieList/recommand?clientId=${clientId}`)
      // 여기요
      .then((response) => response.data);
    dispatch(movieReducers.getRecommandList({ data }));
  }
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
  getOmzPopular,
  getRecommandList,
  getMovieDetail,
};
