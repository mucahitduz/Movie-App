import { useEffect } from "react";
import axios from "axios";
import { useMovie } from "../context/MovieContext";
import "./Mainpage.css";

const API_IMG = "https://image.tmdb.org/t/p/w200";

const Mainpage = () => {
  const { movies, setMovies, handleSearch, handleMainPage, handlePage } =
    useMovie();

  console.log(movies);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}`).then((res) =>
      setMovies(res.data)
    );
  }, [setMovies]);

  return (
    <div className="content">
      <h2>Trending</h2>
      {movies.page ? (
        <div>
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
                      alt=""
                    />
                  ) : (
                    <div className="no-image">
                      <p>Poster unavailable</p>
                    </div>
                  )}
                  <div className="movie-buttons">
                    <button className="movie-btn">Watch Later</button>
                    <button className="movie-btn">Watched</button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Mainpage;
