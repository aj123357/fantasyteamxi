import React, { useEffect, useState } from "react";
import "../App.css"; // Import CSS file for styling
import PlayerApp from "./PlayerApp";
import { fetchMatches, fetchUser, fetchWalletAmount } from "../utils/userUtil";

const Home = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [selectedPerformer1, setSelectedPerformer1] = useState("");
  const [selectedPerformer2, setSelectedPerformer2] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  // Function to handle user's selection of top performers

  const handleSelection = (performer) => {
    if (!selectedPerformer1) {
      setSelectedPerformer1(performer);
    } else if (!selectedPerformer2) {
      setSelectedPerformer2(performer);
    } else {
      alert("You can only select two performers.");
    }
  };

  useEffect(() => {
    const initializeData = async (req, res) => {
      await fetchUser();
      await fetchMatches();
    };

    initializeData();
  }, []);

  return (
    <>
      <div className="app-container">
        <div>
          <h1>
            Hi{" "}
            {JSON.parse(localStorage.getItem("userDetails"))?.username ||
              "User"}
            ,
          </h1>
          <PlayerApp />
        </div>
      </div>
    </>
  );
};

export default Home;
