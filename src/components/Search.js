import React from "react";
import { useMovie } from "../context/MovieContext";
import "./Mainpage.css";

const API_IMG = "https://image.tmdb.org/t/p/w200";

const Search = () => {
  const {
    movies,
    search,
    handlePage,
    handleSearch,
    addToWatchLater,
    addToWatched,
  } = useMovie();
  return (
    <div className="content">
      <h2>Search...</h2>
      <input placeholder="Search" id="search-input" onChange={handleSearch} />

      <div className="movie-list">
        {search && movies.results
          ? movies.results.map((movie) => {
              return (
                <div className="movie-item" key={movie.id}>
                  <h2 className="movie-title">{movie.title}</h2>
                  {movie.poster_path ? (
                    <img
                      className="movie-poster"
                      src={API_IMG + movie.poster_path}
                      alt=""
                    />
                  ) : (
                    <div className="no-image">
                      <p>Poster unavailable</p>
                    </div>
                  )}
                  <div className="movie-buttons">
                    <button
                      className="movie-btn"
                      onClick={() => addToWatchLater(movie)}
                    >
                      Watch Later
                    </button>
                    <button
                      className="movie-btn"
                      onClick={() => addToWatched(movie)}
                    >
                      Watched
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {search && movies.page ? (
        <div className="footer">
          <p id="pages">
            Page {movies.page} of {movies.total_pages}
          </p>
          <p id="pages">{movies.total_results} results</p>
          <button
            className="page-btn"
            onClick={() => {
              if (movies.page > 1) {
                handlePage(movies.page - 1);
              }
            }}
          >
            Previous Page
          </button>
          <button
            className="page-btn"
            onClick={() => {
              if (movies.page < movies.total_pages) {
                handlePage(movies.page + 1);
              }
            }}
          >
            Next Page
          </button>
        </div>
      ) : (
        <p id="pages"></p>
      )}
    </div>
  );
};

export default Search;
