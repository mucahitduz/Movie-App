import React from "react";
import { useMovie } from "../context/MovieContext";

const Watchlater = () => {
  const { watchLater, setWatchLater, addToWatched } = useMovie();
  const API_IMG = "https://image.tmdb.org/t/p/w200";

  const removeFromWatchLater = (movie) => {
    const update = [...watchLater];
    update.map((item, idx) => {
      if (item.id === movie.id) {
        update.splice(idx, 1);
      }
    });
    setWatchLater(update);
  };

  return (
    <div>
      <h2 id="watch-list">Watch List</h2>
      <div className="watchlater-movies">
        {watchLater ? (
          watchLater.map((movie) => {
            return (
              <div className="movie-item" key={movie.id}>
                <h2 className="movie-title">{movie.title}</h2>
                {movie.poster_path ? (
                  <img
                    className="movie-poster"
                    src={API_IMG + movie.poster_path}
                    alt={`${movie.title} poster`}
                  />
                ) : (
                  <div className="no-image">
                    <p>Poster unavailable</p>
                  </div>
                )}
                <div className="movie-buttons">
                  <button
                    className="movie-btn"
                    onClick={() => {
                      removeFromWatchLater(movie);
                    }}
                  >
                    Remove
                  </button>
                  <button
                    className="movie-btn"
                    onClick={() => {
                      removeFromWatchLater(movie);
                      addToWatched(movie);
                    }}
                  >
                    Watched
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No movies in your watchlist</p>
        )}
      </div>
    </div>
  );
};

export default Watchlater;
