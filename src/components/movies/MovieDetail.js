import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieActions } from '../toolkit/actions/movie_action';

const MovieDetail = () => {
    const dispatch = useDispatch();

    const getMovieDetail = (movieId) => {
        dispatch(movieActions.getMovieDetail(movieId));
    };

    useEffect((movieId) => {
        getMovieDetail(movieId)
    }, []);

    const movie = useSelector((state) => state.movies.movieDetail);

    return (
        <div className="image-box">
            <img className="image-thumbnail" src="" />
        </div>
    );
};

export default MovieDetail;