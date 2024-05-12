import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/PlayerApp.css";
import { matches, players } from "../utils/gameUtil";
import {
  inMatchPaymentPage,
  paymentPageFields,
  preMatchPaymentPage,
} from "../utils/Constants";
import { createOrderId } from "../utils/dbUtil";
import { fetchMatches, insertOrderToDb } from "../utils/userUtil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlayerApp = () => {
  const [currentMatch, setCurrentMatch] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || undefined
  );

  const fetchImages = () => {
    return players.MI.teamPlayers.map((player) => {
      const newTab = window.open(
        `https://www.google.com/search?tbm=isch&q=${player.name} ipl`,
        "_blank"
      );
      return <div>New tab will open shortly...</div>;
    });
  };

  const fetchCurrentMatchTransactions = () => {
    const allTransactions = JSON.parse(
      localStorage.getItem("userDetails")
    ).transactions;

    if (allTransactions === undefined || allTransactions.length === 0) {
      setCurrentTransactions([]);
      return;
    }
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000); // End of today
    console.log("todaystart", todayStart);
    console.log("todayEnd", todayEnd);

    const currentTransactions = allTransactions.filter((transaction) => {
      return (
        // transactionDate >= todayStart &&
        // transactionDate < todayEnd &&
        transaction?.matchId === currentMatch.id &&
        transaction?.status === "captured"
      );
    });
    console.log("currentTransactions", currentTransactions);
    setCurrentTransactions(currentTransactions);
  };

  useEffect(() => {
    // Find today's match
    const fetchMatchData = async () => {
      const today = new Date().toISOString().split("T")[0];
      let allMatches = JSON.parse(localStorage.getItem("matches"));
      console.log("today", today, allMatches);
      if (allMatches === null || allMatches === undefined) {
        await fetchMatches();
        allMatches = JSON.parse(localStorage.getItem("matches"));
      }
      const match = allMatches.find(
        (match) => match.date === today && match.winners.length === 0
      );

      console.log("match", match);
      if (match === undefined) {
        setCurrentMatch({ players: [] });
      } else
        setCurrentMatch({
          ...match,
          players: [
            ...players[match.teams[0]].teamPlayers,
            ...players[match.teams[1]].teamPlayers,
          ],
        });
      fetchCurrentMatchTransactions();
      setIsLoading(false);
    };
    fetchMatchData();
  }, []);

  const matchHasStarted = () => {
    const dateIST = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const dateObject = new Date(dateIST);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    console.log(
      "current macth hasmatchStarted",
      currentMatch?.startTime?.split(":"),
      hours,
      minutes
    );
    if (
      parseInt(currentMatch?.startTime?.split(":")[0]) + 1 < hours ||
      (parseInt(currentMatch?.startTime?.split(":")[0]) + 1 === hours &&
        parseInt(currentMatch?.startTime?.split(":")[1]) <= minutes)
    ) {
      return "noBets";
    } else if (
      parseInt(currentMatch?.startTime?.split(":")[0]) > hours ||
      (parseInt(currentMatch?.startTime?.split(":")[0]) === hours &&
        parseInt(currentMatch?.startTime?.split(":")[1]) > minutes)
    ) {
      return "preMatch";
    } else {
      return "inMatch";
    }
  };

  const isPlaceBetDisabled = () => {
    return (
      matchHasStarted() === "noBets" ||
      currentTransactions.length > 4 ||
      selectedPlayers[0] === undefined ||
      selectedPlayers[1] === undefined ||
      selectedPlayers[2] === undefined
    );
  };

  const placeBet = async () => {
    // call
    const matchStatus = matchHasStarted();
    if (isPlaceBetDisabled()) {
      matchStatus === "noBets"
        ? toast.error("No more Bets !", {
            position: "top-right",
          })
        : toast.error("You have reached maximum bets limit for this match !", {
            position: "top-right",
          });
    } else {
      const orderId = createOrderId();
      await insertOrderToDb(orderId, selectedPlayers, currentMatch.id);
      console.log(localStorage.length, localStorage.getItem("userDetails"));
      console.log("result", JSON.parse(localStorage.getItem("userDetails")));
      window.location.href = `${
        matchStatus === "inMatch" ? inMatchPaymentPage : preMatchPaymentPage
      }?email=${JSON.parse(localStorage.getItem("userDetails"))?.email || ""}&${
        paymentPageFields.orderId
      }=${orderId}`;
    }
  };

  const handlePlayerSelection = (player, position) => {
    setSelectedPlayers({
      ...selectedPlayers,
      [position]: player,
    });

    const newSelectedTeamAPlayers = [...selectedTeamAPlayers];
    newSelectedTeamAPlayers[position] = player;
    setSelectedTeamAPlayers(newSelectedTeamAPlayers);
  };

  const todaysMatchBanner = () => {
    return (
      <section style={{ marginBottom: "2em" }}>
        <h2>Today's Match</h2>
        {/* Display today's match image */}
        <div style={{ width: "5em", height: "5em" }}>
          <div
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                marginRight: "2em",
              }}
              className="team1"
              src={currentMatch.teams[0].toLowerCase() + ".png"}
              alt={currentMatch.teams[0]}
            />
            <span style={{ marginRight: "2em" }}>vs</span>
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              className="team1"
              src={currentMatch.teams[1].toLowerCase() + ".png"}
              alt={currentMatch.teams[1]}
            />
          </div>
        </div>
      </section>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="app">
      <div className="main-content">
        {currentMatch &&
        currentMatch !== undefined &&
        currentMatch.players.length > 0 ? (
          <div className="match-details">
            {todaysMatchBanner(currentMatch)}
            <div className="dropdowns">
              <h2>Bet on Top Performers</h2>
              {[0, 1, 2].map((position) => (
                <div key={position} className="dropdown">
                  <label htmlFor={`position-${position}`}>
                    Select Rank {position + 1} Dream11 Player:
                  </label>
                  <select
                    id={`position-${position}`}
                    onChange={(e) =>
                      handlePlayerSelection(
                        currentMatch.players[parseInt(e.target.value)],
                        position
                      )
                    }
                    value={selectedPlayers[position]?.name || ""}
                  >
                    <option value="">
                      {selectedPlayers !== undefined
                        ? selectedPlayers[position]?.name || "Select a Player"
                        : ""}
                    </option>
                    {currentMatch && currentMatch !== undefined ? (
                      currentMatch.players.map((player, index) => (
                        <option
                          key={index}
                          value={index}
                          disabled={Object.values(selectedPlayers).some(
                            (selected) =>
                              selected && selected.name === player.name
                          )}
                        >
                          {player.name}
                        </option>
                      ))
                    ) : (
                      <h2>hellloo</h2>
                    )}
                  </select>
                </div>
              ))}
            </div>

            <div
              className="selected-players"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {Object.values(selectedPlayers).map((player, index) => (
                <div key={index} style={{ display: "block" }}>
                  <img
                    className="selPlayers"
                    src={player.photo}
                    alt={player.name}
                  />
                  <div>{player.name}</div>
                </div>
              ))}
            </div>
            <section>
              {/* <input type="number" value={userBet} onChange={(e) => handleBet(e.target.value)} /> */}
              <button
                // disabled={isPlaceBetDisabled()}
                className="bet_btn"
                onClick={placeBet}
              >
                Place Bet
              </button>
            </section>
          </div>
        ) : (
          <p>No match scheduled for today</p>
        )}
      </div>
      {user && user.email.includes("jindalsteeltraders") && (
        <button onClick={() => fetchImages()}>fetch images</button>
      )}
    </div>
  );
};

export default PlayerApp;
