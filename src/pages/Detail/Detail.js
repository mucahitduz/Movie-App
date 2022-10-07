import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "../../context/MovieContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Details.scss";

const Detail = () => {
  const {
    getMovie,
    selectedMovieDetails,
    watchLater,
    setWatchLater,
    addToWatchLater,
    addToWatched,
    cast,
    getCast,
  } = useMovie();

  const { id } = useParams();

  const removeFromWatchLater = (movie) => {
    const update = [...watchLater];
    update.map((item, idx) => {
      if (item.id === movie.id) {
        update.splice(idx, 1);
      }
    });
    setWatchLater(update);
  };

  useEffect(() => {
    getMovie(id);
    getCast(id);
  }, [id]);

  return selectedMovieDetails ? (
    <div className="container">
      <div className="details">
        <div className="detail__card">
          <div className="detail__poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovieDetails.poster_path}`}
              alt={`${selectedMovieDetails.title} poster`}
            />
          </div>
          <div className="movie__detail">
            <h1>
              {selectedMovieDetails.title}
              <span className="release__date">
                ({parseInt(selectedMovieDetails.release_date)})
              </span>
            </h1>
            <p className="movie__runtime">{selectedMovieDetails.runtime}min</p>
            <div className="movie__overview">
              <h2>Overview</h2>
              <p>{selectedMovieDetails.overview}</p>
              <h2 className="movie__genre">Genre</h2>
              {selectedMovieDetails.genres.map((genre, idx) => (
                <span className="movie__genres" key={idx}>
                  {genre.name}
                </span>
              ))}
              <div className="movie__rating">
                <img
                  className="rating__star"
                  src={require("../../assets/rating-star.svg").default}
                  alt="Rating"
                />
                <h3>
                  {parseFloat(selectedMovieDetails.vote_average).toFixed(1)} /
                  10
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="detail__buttons">
          <button
            className="movie__btn movie__btn--left"
            onClick={() => {
              addToWatchLater(selectedMovieDetails);
            }}
          >
            Watch Later
          </button>
          <button
            className="movie__btn"
            onClick={() => {
              addToWatched(selectedMovieDetails);
              removeFromWatchLater(selectedMovieDetails);
            }}
          >
            Watched
          </button>
        </div>
        <div className="cast">
          <h2>Cast</h2>
        </div>
        {cast ? (
          <div className="movie__cast">
            {cast.cast.map((actor) => (
              <div key={actor.id} className="cast__card">
                <div className="cast__photo">
                  {actor.profile_path ? (
                    <img
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={`${actor.name}`}
                    />
                  ) : (
                    <div className="no__photo">No Photo</div>
                  )}
                </div>
                <div className="cast__character">{actor.character}</div>
                <div className="cast__name">{actor.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <ToastContainer autoClose={4000} pauseOnHover theme="colored" />
    </div>
  ) : null;
};

export default React.memo(Detail);
