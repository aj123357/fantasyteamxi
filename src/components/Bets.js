import React, { useEffect, useState } from "react";
import WinnersTable from "./WinnersTable";
import { fetchMatches } from "../utils/userUtil";

export const Bets = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [showResult, setShowResult] = useState(-1);
  // const [match, setMatch] = useState(null);

  useEffect(() => {
    fetchCurrentTransactions();
    // fetchCurrentMatch();
  }, []);

  const fetchCurrentMatch = (transaction) => {
    let allMatches = JSON.parse(localStorage.getItem("matches"));
    if (allMatches === null || allMatches === undefined) {
      return undefined;
    } else {
      const currentMatch = allMatches.find(
        (match) => match.id === transaction.matchId
      );
      return currentMatch;
    }
  };

  const fetchCurrentTransactions = () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails === null || userDetails === undefined) {
      setCurrentTransactions([]);
    }
    console.log("hereeeee", userDetails);

    setCurrentTransactions(userDetails.transactions);
  };
  const endMatchResult = (transaction) => {
    // Simulated logic to determine top performers
    // const performers = ['Player1', 'Player2', 'player3']; // Replace with actual logic
    const match = fetchCurrentMatch(transaction);
    if (match === undefined) {
      return "";
    }
    const performers = match.topPerformers;
    if (performers.length !== 3) {
      return "";
    }
    // console.log("fhbgfshbsifbs", performers, transaction.playerSelected[0]);

    // Simulated logic to determine if user wins
    const userWins =
      performers[0] === transaction.playerSelected[0].name &&
      performers[1] === transaction.playerSelected[1].name &&
      performers[2] === transaction.playerSelected[2].name;
    return userWins ? (
      <span style={{ color: "green" }}>Congratulations! You are a Winner</span>
    ) : (
      <span style={{ color: "brown" }}>
        Ohh! You missed Rs 9,00,000 this time
      </span>
    );
  };
  const closeModal = () => {
    setShowResult(-1);
  };

  const hasMatchEnded = (transaction) => {
    const match = fetchCurrentMatch(transaction);
    if (match === undefined) {
      return "";
    }
    console.log("ankush", match, transaction.matchId);
    return match?.topPerformers.length === 3;
  };

  const showBet = (transaction, index) => (
    <div
      key={transaction.created_at.seconds}
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: 2,
        borderStyle: "solid",
        alignItems: "center",
      }}
    >
      <div
        className="selected-players"
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-around",
        }}
      >
        {Object.values(transaction.playerSelected).map((player, index) => (
          <div key={index} style={{ display: "block", marginRight: 4 }}>
            <img className="selPlayers" src={player.photo} alt={player.name} />
            <div>{player.name}</div>
          </div>
        ))}
      </div>
      <div key={transaction.created_at.seconds}>
        {!hasMatchEnded(transaction) ? (
          "Match is in Progress"
        ) : (
          <div>
            <button
              style={{ border: "solid" }}
              onClick={() => setShowResult(index)}
            >
              Check Result
            </button>
            {showResult !== -1 &&
              showResult === index &&
              transaction.matchId !== undefined && (
                <WinnersTable
                  matchId={transaction.matchId}
                  isOpen={showResult}
                  onClose={closeModal}
                  endMatchResult={endMatchResult(transaction)}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {currentTransactions.length > 0 && (
        <div>
          <h1>Your Bets</h1>
          {currentTransactions.map((transaction, index) =>
            showBet(transaction, index)
          )}
        </div>
      )}
    </>
  );
};
