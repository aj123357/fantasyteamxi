import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { fetchWalletAmount } from "../utils/userUtil";

const NavBar = ({ loggedIn, setLoggedIn }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  return (
    <div>
      <nav className="nav_cont">
        <ul>
          <img className="ipl_logo" src="ipl_img.png" alt="IPL 2024" />
          <li>
            <Link className="navTxt" to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="navTxt"
              style={{ textDecoration: "none" }}
              to="/bets"
            >
              Your Bets
            </Link>
          </li>
          <li>
            <Link
              className="navTxt"
              style={{ textDecoration: "none" }}
              to="/contact"
            >
              Contact
            </Link>
          </li>
          <li>
            {fetchWalletAmount() !== 0 && (
              <button
                className="withdraw-btn"
                style={{ border: "solid", backgroundColor: "green" }}
                onClick={() => setShowWithdrawModal(!showWithdrawModal)}
              >
                Withdraw Amount {fetchWalletAmount()}
              </button>
            )}
            {showWithdrawModal && (
              <>
                DM us on Instagram (
                <a href="https://www.instagram.com/_happyinterest?igsh=MTE5eTc0NGh1bWgyZQ%3D%3D&utm_source=qr">
                  HappyIntereset
                </a>
                ) for Your Winnings
              </>
            )}
          </li>
          {loggedIn && (
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
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
