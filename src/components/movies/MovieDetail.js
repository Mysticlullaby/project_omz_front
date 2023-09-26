import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../toolkit/actions/movie_action";
import { useParams } from "react-router-dom";
import ReviewWrite from "./ReviewWrite";
import { IoIosStar } from "react-icons/io";

const MovieDetail = () => {
  const { movieId } = useParams();
  console.log("MovieDetail.js movieId: ", movieId);

  const dispatch = useDispatch();

  //모달창 상태값 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달창 상태를 변경하는 함수
  const openModal = (e) => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const getMovieDetail = (movieId) => {
    dispatch(movieActions.getMovieDetail(movieId));
  };

  useEffect(() => {
    getMovieDetail(movieId);
  }, [dispatch, movieId]);

  const movie = useSelector((state) => state.movies.movieDetail);

  return (
    <div>
      <div className="image-box">
        <img className="image-thumbnail" src={movie.image} />
      </div>
      <div className="container">
        <div className="row border-bottom">
          <div className="col-3">
            <img className="poster-box" src={movie.poster} />
          </div>
          <div className="col-9" style={{ padding: 40 }}>
            <h1 style={{ fontWeight: 800 }}>{movie.title}</h1>
            <hr />
            <p>{movie.movieDescription}</p>
          </div>
        </div>

        <div className="row">
          <h1 className="mx-4 mb-4 mt-5">트레일러</h1>
        </div>
        <div className="row border-bottom" style={{ padding: 10 }}>
          <iframe width="100%" height="400" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        <div className="row mx-4 mb-4 mt-5">
          <div className="container">
            <div className="row justify-container-start">
              <div className="col-2">
                <h1>리뷰</h1>
              </div>

              <div className="col-2">
                <button onClick={openModal}>Open Modal</button>
                <ReviewWrite isOpen={isModalOpen} closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-md-4 g-2" style={{ padding: 10 }}>
          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18 rem", height: 300 }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2">글쓴이 이름</h5>
                <p className="card-text">이 영화의 대한 나의 감성평은 어쩌고 저쩌고...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
