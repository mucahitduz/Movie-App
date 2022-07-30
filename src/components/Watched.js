import React from "react";
import { useMovie } from "../context/MovieContext";

const Watched = () => {
  const { watched, setWatched } = useMovie();
  const API_IMG = "https://image.tmdb.org/t/p/w200";

  const removeFromWatched = (movie) => {
    const update = [...watched];
    update.map((item, idx) => {
      if (item.id === movie.id) {
        update.splice(idx, 1);
      }
    });
    setWatched(update);
  };

  return (
    <div>
      <h2 id="watch-list">Watched</h2>
      <div className="watched-movies">
        {watched ? (
          watched.map((movie) => {
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
                      removeFromWatched(movie);
                    }}
                  >
                    Remove
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

export default Watched;
