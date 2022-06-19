import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h2>Movies App</h2>
      </div>
      <ul>
        <li>Watch Later</li>
        <li>Watched</li>
      </ul>
    </div>
  );
};

export default Navbar;
