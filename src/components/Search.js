import React from "react";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../pages/Mainpage/Mainpage.scss";

const API_IMG = "https://image.tmdb.org/t/p/w200";

const Search = () => {
  const {
    search,
    setSearch,
    searchedMovies,
    handlePage,
    handleSubmit,
    addToWatchLater,
    setSelectedMovie,
  } = useMovie();

  let navigate = useNavigate();

  const goToMovie = (movie) => {
    setSelectedMovie(movie.id);
    navigate(`/details/${movie.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <h2>Search</h2>
        <input
          placeholder="Search"
          className="search__input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search__btn" onClick={handleSubmit}>
          Search
        </button>
        {searchedMovies.results ? (
          <p id="pages">{searchedMovies.total_results} results</p>
        ) : null}
      </form>

      <div className="container">
        {searchedMovies.results
          ? searchedMovies.results.map((movie) => {
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
                          src={require("../assets/rating-star.svg").default}
                          alt="Rating"
                        />
                        {movie.vote_average} / 10
                      </div>
                    </h4>
                    <div
                      className="movie__button"
                      onClick={() => {
                        addToWatchLater(movie);
                      }}
                    >
                      <img
                        className="icon"
                        src={require("../assets/watch-later.svg").default}
                        alt="Watch Later"
                      />
                      <h4>Watch Later</h4>
                    </div>
                  </div>
                </div>
              );
            })
          : null}

        {search && searchedMovies.page ? (
          <div className="footer">
            <p id="pages">Page {searchedMovies.page}</p>
            <button
              className="page__btn page__btn--left"
              onClick={() => {
                if (searchedMovies.page > 1) {
                  handlePage(searchedMovies.page - 1);
                  window.scrollTo(0, 0);
                }
              }}
            >
              Previous Page
            </button>
            <button
              className="page__btn"
              onClick={() => {
                if (searchedMovies.page < searchedMovies.total_pages) {
                  handlePage(searchedMovies.page + 1);
                  window.scrollTo(0, 0);
                }
              }}
            >
              Next Page
            </button>
          </div>
        ) : (
          <p id="pages"></p>
        )}
        <ToastContainer autoClose={4000} pauseOnHover theme="colored" />
      </div>
    </>
  );
};

export default Search;
