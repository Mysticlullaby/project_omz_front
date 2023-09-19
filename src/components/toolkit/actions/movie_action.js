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

function getMovieDetail(MovieId) {
    return async (dispatch) => {
        const data = await axios
            .get(`/movie/${MovieId}`)
            .then((response) => response.data);
        console.log('axios data: ', data);
        dispatch(movieReducers.getMovieDetail({ data }));
    }
}

export const movieActions = {
    getMovieList, getMovieDetail
}