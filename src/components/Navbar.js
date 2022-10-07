import React from "react";
import { Link } from "react-router-dom";
import { useMovie } from "../context/MovieContext";
import "./Navbar.scss";

const Navbar = () => {
  const { handleMainPage } = useMovie();

  return (
    <header>
      <div className="container row">
        <nav className="nav">
          <ul className="nav__list">
            <Link to="/">
              <div className="logo" onClick={() => handleMainPage(1)}>
                <h2>TMDb</h2>
              </div>
            </Link>
          </ul>
          <ul className="nav__list">
            <Link to="/search">
              <li className="nav__item">Search</li>
            </Link>
            <Link to="/watchlater">
              <li className="nav__item">Watch Later</li>
            </Link>
            <Link to="/watched">
              <li className="nav__item">Watched</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
