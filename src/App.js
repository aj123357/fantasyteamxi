import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import { Bets } from "./components/Bets";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
// import { fetchWalletAmount } from "./utils/userUtil";
// import PlayerApp from "./components/PlayerApp";
import Match from "./components/Match";
import PlayerApp from "./components/PlayerApp";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    !(
      localStorage.getItem("userDetails") === undefined ||
      localStorage.getItem("userDetails") === null
    )
  );
  return (
    <div>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/match/:id" element={<Match />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
