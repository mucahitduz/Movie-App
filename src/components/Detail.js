import React from "react";
import { useEffect } from "react";
import { useMovie } from "../context/MovieContext";

import "./Details.css";

const Detail = () => {
  const { selectedMovie, getMovie, selectedMovieDetails } = useMovie();

  useEffect(() => {
    getMovie(selectedMovie);
  }, []);

  return selectedMovieDetails ? (
    <div className="details-cnt">
      <div className="movie-details-title">
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovieDetails.backdrop_path}`}
          id="backdrop"
        />
        <h1 id="movie-title-h1">{selectedMovieDetails.title}</h1>
        <p id="runtime">{selectedMovieDetails.runtime} min</p>
      </div>
      <div className="movie-details">
        <img
          id="details-poster"
          src={`https://image.tmdb.org/t/p/w200${selectedMovieDetails.poster_path}`}
        />
        <div className="movie-overview">
          <h3>Overview</h3>
          <p>{selectedMovieDetails.overview}</p>
          <h3>Genre</h3>
          {selectedMovieDetails.genres.map((genre, idx) => (
            <span key={idx}>{genre.name},</span>
          ))}
        </div>
      </div>
      <div className="movie-buttons">
        <button className="movie-btn">Watch Later</button>
        <button className="movie-btn">Watched</button>
      </div>
    </div>
  ) : null;
};

export default Detail;
