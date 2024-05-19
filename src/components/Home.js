import React, { useEffect, useState } from "react";
import "../App.css"; // Import CSS file for styling
import PlayerApp from "./PlayerApp";
import { fetchMatches, fetchUser, fetchWalletAmount } from "../utils/userUtil";

const Home = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [selectedPerformer1, setSelectedPerformer1] = useState("");
  const [selectedPerformer2, setSelectedPerformer2] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };
    setIsLoading(true);
    if (localStorage.length === 0) {
      initializeData();
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <>
      <div className="app-container">
        <div>
          <h3>
            Hi,{" "}
            {JSON.parse(localStorage.getItem("userDetails"))?.username ||
              "User"}
            
          </h3>
          <PlayerApp />
        </div>
      </div>
    </>
  );
};

export default Home;
