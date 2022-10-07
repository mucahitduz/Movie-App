import { useEffect } from "react";
import axios from "axios";
import { useMovie } from "../../context/MovieContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Mainpage.scss";

const API_IMG = "https://image.tmdb.org/t/p/w200";

const Mainpage = () => {
  const {
    movies,
    setMovies,
    handleSearch,
    handleMainPage,
    handlePage,
    addToWatchLater,
    setSelectedMovie,
  } = useMovie();

  let navigate = useNavigate();

  const goToMovie = (movie) => {
    setSelectedMovie(movie.id);
    navigate(`/details/${movie.id}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}`)
      .then((res) => setMovies(res.data));
  }, [setMovies]);

  return (
    <>
      <div className="title">
        <h2>Trending Movies</h2>
      </div>

      <div className="container">
        {movies.results
          ? movies.results.map((movie) => {
              return (
                <div className="movie__item" key={movie.id}>
                  <div className="movie__card--left">
                    {movie.poster_path ? (
                      <img
                        loading="lazy"
                        width={150}
                        height={250}
                        className="movie__poster"
                        src={API_IMG + movie.poster_path}
                        alt={`${movie.title} poster`}
                        onClick={() => {
                          goToMovie(movie);
                        }}
                      />
                    ) : (
                      <div className="no__poster">
                        <p>Poster unavailable</p>
                      </div>
                    )}
                  </div>

                  <div className="movie__card--right">
                    <h2
                      onClick={() => {
                        goToMovie(movie);
                      }}
                    >
                      {movie.title}
                    </h2>
                    <h4>Released: {parseInt(movie.release_date)}</h4>
                    <h4>
                      <div className="rating">
                        <img
                          className="rating__star"
                          src={require("../../assets/rating-star.svg").default}
                          alt="Rating"
                        />
                        {movie.vote_average} / 10
                      </div>
                    </h4>
                    <div>
                      <div
                        className="movie__button"
                        onClick={() => {
                          addToWatchLater(movie);
                        }}
                      >
                        <img
                          className="watchlater"
                          src={require("../../assets/watch-later.svg").default}
                          alt="Watch Later"
                        />
                        <h4>Watch Later</h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        {movies.page ? (
          <div className="footer">
            <p id="pages">Page {movies.page}</p>
            <button
              className="page__btn page__btn--left"
              onClick={() => {
                if (!handleSearch && movies.page > 1) {
                  handlePage(movies.page - 1);
                } else {
                  handleMainPage(movies.page - 1);
                }
                window.scrollTo(0, 0);
              }}
            >
              Previous Page
            </button>
            <button
              className="page__btn"
              onClick={() => {
                if (!handleSearch && movies.page < movies.total_pages) {
                  handlePage(movies.page + 1);
                } else {
                  handleMainPage(movies.page + 1);
                }
                window.scrollTo(0, 0);
              }}
            >
              Next Page
            </button>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <ToastContainer autoClose={4000} pauseOnHover theme="colored" />
    </>
  );
};

export default Mainpage;
