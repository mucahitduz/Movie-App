import axios from "axios";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

import { toast } from "react-toastify";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [cast, setCast] = useState();
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

  const handleSearch = async (e) => {
    await setSearch(e.target.value);
    axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    ).then((res) => setMovies(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(search);
    axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`
    ).then((res) => setSearchedMovies(res.data));
  };

  const handlePage = async (page) => {
    await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${search}`
    ).then((res) => setSearchedMovies(res.data));
  };

  const handleMainPage = async (page) => {
    await axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=150e7e88fdcd09961d5d4ec6144d3f79&language=en-US&page=${page}`
    ).then((res) => setMovies(res.data));
  };

  const checkWatchLater = () => {
    toast.success("Successfully added to your watch list.");
  };

  const error = () => {
    toast.error("This movie is already on your watch list");
  };

  const addToWatchLater = (movie) => {
    const check = watchLater.every((item) => {
      return item.id !== movie.id;
    });
    const checkWatched = watched.every((item) => {
      return item.id !== movie.id;
    });
    if (check && checkWatched) {
      setWatchLater([...watchLater, movie]);
      checkWatchLater();
    } else {
      error();
    }
  };

  const checkWatchedList = () => {
    toast.success("Successfully added to your watched list.");
  };

  const addToWatched = (movie) => {
    const checkWatched = watched.every((item) => {
      return item.id !== movie.id;
    });
    if (checkWatched) {
      setWatched([...watched, movie]);
      checkWatchedList();
    } else {
      error();
    }
  };

  const getMovie = async (id) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((res) => setSelectedMovieDetails(res.data));
  };

  const getCast = async (id) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((res) => setCast(res.data));
  };

  const values = {
    movies,
    setMovies,
    search,
    setSearch,
    searchedMovies,
    setSearchedMovies,
    handleSearch,
    handleSubmit,
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
    cast,
    setCast,
    getCast,
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
