import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}`).then((res) =>
      setMovies(res.data)
    );
  }, []);

  const values = {
    movies,
    setMovies,
    search,
    setSearch,
    handleSearch,
    handlePage,
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
