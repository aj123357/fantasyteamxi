import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
import Home from "./Home";
import Contact from "./Contact";
import { Bets } from "./Bets";
import NavBar from "./NavBar";
import Login from "./Login";
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
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            {loggedIn && <Route path="/contact" element={<Contact />} />}
            {loggedIn && <Route path="/bets" element={<Bets />} />}
          </Routes>
          {/* <button
          className="withdraw-btn"
          disabled={fetchWalletAmount() === 0}
          onClick={() => console.log("withdraw")}
        >
          Withdraw Amount
        </button> */}
        </>
      )}
    </div>
  );
};

export default App;
