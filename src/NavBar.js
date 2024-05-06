import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchWalletAmount } from "./utils/userUtil";

const NavBar = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      <nav className="nav_cont">
        <ul>
          <img className="ipl_logo" src="ipl_img.png" alt="IPL 2024" />
          <li>Profile</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bets">Your Bets</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <button
              disabled={fetchWalletAmount() === 0}
              onClick={() => console.log("withdraw")}
            >
              Withdraw Amount
            </button>
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
