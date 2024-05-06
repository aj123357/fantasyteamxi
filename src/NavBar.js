import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"


const NavBar = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      <nav className="nav_cont">
        <ul>
          <img className="ipl_logo" src="ipl_img.png" alt="IPL 2024" />
          <li>
            <Link className="navTxt" to="/">Home</Link>
          </li>
          <li>
            <Link className="navTxt" to="/bets">Your Bets</Link>
          </li>
          <li>
            <Link className="navTxt" to="/contact">Contact</Link>
          </li>
          {loggedIn && (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("userDetails");
                  setLoggedIn(false);
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <img src="iplsq.jpg" alt="IPL squad" />
    </div>
  );
};
export default NavBar;
