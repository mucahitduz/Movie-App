import axios from "axios";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedMovieDetails, setSelectedMovieDetails] = useState();
  const [watchLater, setWatchLater] = useState(
    localStorage.getItem("watchlater")
      ? JSON.parse(localStorage.getItem("watchlater"))
      : []
  );
  const [watched, setWatched] = useState(
    localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("watchlater", JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    ).then((res) => setMovies(res.data));
  };

  const handlePage = (page) => {
    axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${search}`
    ).then((res) => setMovies(res.data));
  };

  const handleMainPage = (page) => {
    axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=150e7e88fdcd09961d5d4ec6144d3f79&language=en-US&page=${page}`
    ).then((res) => setMovies(res.data));
  };

  const addToWatchLater = (movie) => {
    const check = watchLater.every((item) => {
      return item.id !== movie.id;
    });
    if (check) {
      setWatchLater([...watchLater, movie]);
    } else {
      alert("This movie is already in your watchlist");
    }
  };

  const addToWatched = (movie) => {
    const check = watched.every((item) => {
      return item.id !== movie.id;
    });
    if (check) {
      setWatched([...watched, movie]);
    } else {
      alert("You've already watched this movie");
    }
  };

  const getMovie = (id) => {
    axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    ).then((res) => setSelectedMovieDetails(res.data));
  };

  const values = {
    movies,
    setMovies,
    search,
    setSearch,
    handleSearch,
    handlePage,
    handleMainPage,
    watchLater,
    setWatchLater,
    addToWatchLater,
    addToWatched,
    watched,
    setWatched,
    selectedMovie,
    setSelectedMovie,
    getMovie,
    selectedMovieDetails,
    setSelectedMovieDetails,
  };

  return (
    <MovieContext.Provider value={values}> {children} </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};
