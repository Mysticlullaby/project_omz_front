import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { movieActions } from '../../toolkit/actions/movie_action';

const MoreList = () => {
    const { platform } = useParams();
    const dispatch = useDispatch();

    const movieList = useSelector((state) => state.movies.moreList);

    useEffect(() => {
        dispatch(movieActions.getMoreList(platform));
    })

    return (
        <>
            <div className="d-flex align-items-center mt-5">
                <p className="movielist-title">{platform}에서 서비스하는 작품들</p>
                <p className="me-4"></p>
            </div>
            <div className="container">
                <div className="row row-cols-md-5 g-3">
                    {movieList &&
                        movieList.map((movie, index) => (
                            <div key={movie.movieId} className="col">
                                <div className="card" style={{ width: "18 rem" }}>
                                    <NavLink to={`/movie/${movie.movieId}`}>
                                        <div className="ott-tag">
                                            {movie.provider &&
                                                movie.provider.map((platform, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {platform === "넷플릭스" && <img className="platform-icon" src="/images/netflix_icon.png" alt={platform} />}
                                                            {platform === "티빙" && <img className="platform-icon" src="/images/tving_icon.png" alt={platform} />}
                                                            {platform === "웨이브" && <img className="platform-icon" src="/images/wavve_icon.png" alt={platform} />}
                                                            {platform === "디즈니+" && <img className="platform-icon" src="/images/disney_icon.png" alt={platform} />}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                        <img src={movie.poster} className="card-img-top size" alt={movie.title} />
                                    </NavLink>
                                    <div className="card-body">
                                        <p className="card-text-main">{movie.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default MoreList;