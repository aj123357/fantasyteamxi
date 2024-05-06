import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
import Home from "./Home";
import Contact from "./Contact";
import { Bets } from "./Bets";
import NavBar from "./NavBar";
import Login from "./Login";

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
        <Routes>
          <Route path="/" element={<Home />} />
          {loggedIn && <Route path="/contact" element={<Contact />} />}
          {loggedIn && <Route path="/bets" element={<Bets />} />}
        </Routes>
      )}
    </div>
  );
};

export default App;
