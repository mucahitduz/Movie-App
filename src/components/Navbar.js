import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <h2>Movies App</h2>
        </Link>
      </div>
      <ul>
        <Link to="/search">
          <li>Search</li>
        </Link>
        <Link to="/watchlater">
          <li>Watch Later</li>
        </Link>
        <Link to="/watched">
          <li>Watched</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
