import axios from "axios";
import { movieReducers } from "../reducers/movie_reducer";

function getOmzPopular() {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList/omzPopular`).then((response) => JSON.parse(response.data));
    dispatch(movieReducers.getOmzPopular({ data }));
  };
}

function getNetflixPopular() {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList/omzPopular`).then((response) => JSON.parse(response.data));
    dispatch(movieReducers.getNetflixPopular({ data }));
  }
}

function getTvingPopular() {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList/tvingPopular`).then((response) => JSON.parse(response.data));
    dispatch(movieReducers.getTvingPopular({ data }));
  }
}

function getWavePopular() {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList/wavePopular`).then((response) => JSON.parse(response.data));
    dispatch(movieReducers.getWavePopular({ data }));
  }
}

// 유림 mbti추가부분
function getMbtiRecommend(mbti) {
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:5000/movieList/mbtiPopular?mbti=${mbti}`).then((response) => JSON.parse(response.data));
    dispatch(movieReducers.getMbtiRecommend({ data }));
  };
}

function getRecommandList(clientId) {
  return async (dispatch) => {
    const data = await axios
      .get(`http://127.0.0.1:5000/movieList/recommand?clientId=${clientId}`)
      // 여기요
      .then((response) => response.data);
    dispatch(movieReducers.getRecommandList({ data }));
  };
}

function getMovieList() {
  return async (dispatch) => {
    const data = await axios
      .get(`/movie/list`)
      .then((response) => response.data);
    dispatch(movieReducers.getMovieList({ data }));
  }
}

function getSearchList(keyword) {
  return async (dispatch) => {
    console.log('keyword: ', keyword);
    const data = await axios
      .get(`/search/${keyword}`)
      .then((response) => response.data);
    console.log('search data: ', data);
    dispatch(movieReducers.getSearchList({ data }));
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
  getNetflixPopular,
  getTvingPopular,
  getWavePopular,
  getRecommandList,
  getMovieList,
  getSearchList,
  getMbtiRecommend,
  getMovieDetail,
};
