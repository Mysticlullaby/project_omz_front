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

export const movieActions = {
    getMovieList
}