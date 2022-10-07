import React from "react";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Watched = () => {
  const { watched, setWatched, setSelectedMovie } = useMovie();

  const API_IMG = "https://image.tmdb.org/t/p/w200";

  const remove = () => {
    toast.success("Successfully removed from your watch list.");
  };

  const removeFromWatched = (movie) => {
    const update = [...watched];
    update.map((item, idx) => {
      if (item.id === movie.id) {
        update.splice(idx, 1);
      }
    });
    setWatched(update);
    remove();
  };

  let navigate = useNavigate();

  const goToMovie = (movie) => {
    setSelectedMovie(movie.id);
    navigate(`/details/${movie.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="title">
        <h2>Watched</h2>
      </div>

      <div className="container">
        {watched ? (
          watched.map((movie) => {
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
                    <div className="no-image">
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
                    <span className="rating">
                      <img
                        className="rating__star"
                        src={require("../assets/rating-star.svg").default}
                        alt="Rating"
                      />
                      {parseFloat(movie.vote_average).toFixed(1)} / 10
                    </span>
                  </h4>
                  <div className="movie__buttons">
                    <div
                      className="movie__button"
                      onClick={() => {
                        removeFromWatched(movie);
                      }}
                    >
                      <img
                        className="watchlater"
                        src={require("../assets/remove-button.svg").default}
                        alt="Watch Later"
                      />
                      <h4>Remove</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No movies in your watchlist</p>
        )}
      </div>
      <ToastContainer autoClose={4000} pauseOnHover theme="colored" />
    </>
  );
};

export default Watched;
