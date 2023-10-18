import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { movieActions } from '../../toolkit/actions/movie_action';

const SearchList = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const getSearchList = () => {
        dispatch(movieActions.getSearchList(keyword));
    }

    useEffect(() => {
        getSearchList();
    }, []);

    const searchList = useSelector((state) => state.movies.searchList);

    return (
        <div>
            <p className="movielist-title">"{keyword}" 검색 결과</p>
            <div className="container">
                <div className="row row-cols-md-5 g-3">
                    {searchList &&
                        searchList.map((movie, index) => (
                            <div key={movie.movieId} className="col">
                                <div className="card" style={{ width: "18 rem" }}>
                                    <NavLink to={`/movie/${movie.movieId}`}>
                                        <img src={movie.poster} className="card-img-top" alt={movie.title} />
                                    </NavLink>
                                    <div className="card-body">
                                        <p className="card-text">{movie.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default SearchList;