import { useEffect } from "react";
import axios from "axios";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

import "./Mainpage.css";

const API_IMG = "https://image.tmdb.org/t/p/w200";

const Mainpage = () => {
  const {
    movies,
    setMovies,
    handleSearch,
    handleMainPage,
    handlePage,
    watchLater,
    setWatchLater,
    addToWatchLater,
    addToWatched,
    selectedMovie,
    setSelectedMovie,
  } = useMovie();

  let navigate = useNavigate();

  const goToMovie = (movie) => {
    setSelectedMovie(movie.id);
    let path = movie.title;
    path = path.replace(/\s+/g, "-").toLowerCase();
    navigate(`/details/${path}`);
  };

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}`).then((res) =>
      setMovies(res.data)
    );
  }, [setMovies]);

  return (
    <div className="content">
      <h2>Trending Movies</h2>

      <div className="movie-list">
        {movies.results
          ? movies.results.map((movie) => {
              return (
                <div className="movie-item" key={movie.id}>
                  <h2 className="movie-title">{movie.title}</h2>
                  {movie.poster_path ? (
                    <img
                      className="movie-poster"
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
        {movies.page ? (
          <div className="footer">
            <p id="pages">
              Page {movies.page} of {movies.total_pages}
            </p>

            <button
              className="page-btn"
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
              className="page-btn"
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
          <p id="pages">No data</p>
        )}
      </div>
    </div>
  );
};

export default Mainpage;
