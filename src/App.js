import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import { Bets } from "./components/Bets";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { fetchWalletAmount } from "./utils/userUtil";

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
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            {loggedIn && <Route path="/contact" element={<Contact />} />}
            {loggedIn && <Route path="/bets" element={<Bets />} />}
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
