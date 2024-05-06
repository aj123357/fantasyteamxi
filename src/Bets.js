import React, { useEffect, useState } from "react";
import WinnersTable from "./WinnersTable";

export const Bets = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchCurrentTransactions();
  }, []);
  const fetchCurrentTransactions = () => {
    const allTransactions = JSON.parse(
      localStorage.getItem("userDetails")
    ).transactions;
    console.log("hereeeee", allTransactions);

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
      const transactionDate = new Date(transaction.created_at.seconds * 1000); // Convert epoch date to milliseconds
      // console.log("transactionDate", transactionDate)

      return (
        transactionDate >= todayStart &&
        transactionDate < todayEnd &&
        transaction.status === "captured"
      );
    });
    // console.log("currentTransactions", currentTransactions)
    setCurrentTransactions(allTransactions);
  };
  const endMatchResult = (transaction, currentMatch) => {
    // Simulated logic to determine top performers
    // const performers = ['Player1', 'Player2', 'player3']; // Replace with actual logic
    const performers = currentMatch.topPerformers;
    if (performers.length !== 3) {
      return "";
    }
    setTopPerformers(performers);

    // Simulated logic to determine if user wins
    const userWins =
      topPerformers[0] === transaction.playerSelected[0] &&
      topPerformers[1] === transaction.playerSelected[1] &&
      topPerformers[2] === transaction.playerSelected[2];
    return userWins
      ? "Congratulations! You won!"
      : "Ohh! You missed Rs 9,00,000 this time";
  };

  const hasMatchEnded = (transaction) => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    // const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000); // End of today

    const transactionDate = new Date(transaction.created_at * 1000); // Convert epoch date to milliseconds
    return transactionDate < todayStart;
  };

  const showBet = (transaction) => (
    <div
      style={{
        display: "flex",
        margin: 2,
        borderStyle: "solid",
        alignItems: "center",
      }}
    >
      <div className="selected-players" style={{ display: "flex" }}>
        {Object.values(transaction.playerSelected).map((player, index) => (
          <img
            className="selPlayers"
            key={index}
            src={player.photo}
            alt={player.name}
          />
        ))}
      </div>
      {hasMatchEnded(transaction) ? (
        "Match is in Progress"
      ) : (
        <>
          <button onClick={() => setShowResult(true)}>Check Result</button>
          {showResult && <WinnersTable matchId={transaction.matchId} />}
        </>
      )}
    </div>
  );
  // endMatchResult(transaction, currentMatch)}
  return (
    <>
      {currentTransactions.length > 0 && (
        <div>
          <h1>Your Bets</h1>
          {currentTransactions.map((transaction) => showBet(transaction))}
        </div>
      )}
    </>
  );
};
