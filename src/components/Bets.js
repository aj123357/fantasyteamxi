import React, { useEffect, useState } from "react";
import WinnersTable from "./WinnersTable";
import { fetchMatches, fetchUser } from "../utils/userUtil";
import { eventsMapUtil, fetchEventWinner } from "../utils/gameUtil";

export const Bets = () => {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [showResult, setShowResult] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  // const [match, setMatch] = useState(null);

  useEffect(() => {
    fetchCurrentTransactions();
    // fetchCurrentMatch();
  }, []);

  const groupedTransactions = () => {
    if (currentTransactions !== undefined && currentTransactions.length > 0) {
      return currentTransactions.reduce((groups, transaction) => {
        const { matchId } = transaction;
        if (matchId === undefined) {
          return groups;
        }
        if (!groups[matchId]) {
          groups[matchId] = [];
        }
        groups[matchId].push(transaction);
        console.log("groups", groups);
        return groups;
      }, {});
    }
    return {};
  };

  const showMatchDetails = (transaction) => {
    console.log("insideshowmatch", transaction);
    const match = fetchCurrentMatch(transaction);
    if (match === undefined) {
      return "";
    } else {
      return (
        <div className="teamplayed">
          <div className="teamname">
            {match.teams[0] + " vs " + match.teams[1]}
          </div>
          <div className="matchdate">{match.date}</div>
        </div>
      );
    }
  };

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

  const fetchCurrentTransactions = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setIsLoading(true);
    if (userDetails === null || userDetails === undefined) {
      setCurrentTransactions([]);
    } else {
      await fetchUser().then(() => {
        setCurrentTransactions(
          userDetails.transactions.filter(
            (trans) => trans.status === "captured"
          )
        );
        setIsLoading(false);
      });
    }
    console.log("hereeeee", userDetails instanceof Object);
  };
  const endMatchResult = (transaction) => {
    // Simulated logic to determine top performers
    // const performers = ['Player1', 'Player2', 'player3']; // Replace with actual logic
    const match = fetchCurrentMatch(transaction);
    if (match === undefined) {
      return "";
    }
    const performers = match.topPerformers;
    if (Object.keys(performers).length === 0) {
      return "";
    }
    // console.log("fhbgfshbsifbs", performers, transaction.playerSelected[0]);

    // Simulated logic to determine if user wins
    const userWins = fetchEventWinner(performers, transaction);
    // performers[0] === transaction.playerSelected[0].name &&
    // performers[1] === transaction.playerSelected[1].name &&
    // performers[2] === transaction.playerSelected[2].name;
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
    console.log("ankush jindal", match, transaction);
    if (transaction.eventname === undefined) {
      console.log("ankush jindal helloooo");
      return "";
    }
    console.log("ankush jindal helloooo");

    return (
      match?.topPerformers[transaction.eventname].length ===
        eventsMapUtil[transaction.eventname].numberOfWinners || false
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const ShowBetgroup = (transactiongroup, index) => {
    console.log("transac", transactiongroup);
    return (
      <div
        className="betContainer"
        style={{ borderStyle: "solid" }}
        key={index}
      >
        <div className="matchHeader">
          {" "}
          {showMatchDetails(transactiongroup[0])}
          <div
            className="resultContainer"
            key={transactiongroup[0].created_at.seconds}
          >
            {!hasMatchEnded(transactiongroup[0]) ? (
              <div>
                <button className="matchprogress">Match in progress</button>
              </div>
            ) : (
              <div>
                <button
                  className="chkresult"
                  style={{ border: "solid" }}
                  onClick={() => setShowResult(index)}
                >
                  Check Result
                </button>
                {showResult !== -1 &&
                  showResult === index &&
                  transactiongroup[0].matchId !== undefined && (
                    <WinnersTable
                      matchId={transactiongroup[0].matchId}
                      eventName={transactiongroup[0].eventname}
                      isOpen={showResult}
                      onClose={closeModal}
                      endMatchResult={endMatchResult(transactiongroup[0])}
                    />
                  )}
              </div>
            )}
          </div>
        </div>
        {transactiongroup.map((transaction) => {
          return (
            <div
              key={transaction.created_at.seconds}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: 2,
                alignItems: "center",
              }}
            >
              <div
                className="selected-players"
                style={{
                  display: "flex",
                  width: "80%",
                  justifyContent: "space-around",
                }}
              >
                {Object.values(transaction.playerSelected).map(
                  (player, index) => (
                    <div
                      key={index}
                      style={{ display: "block", marginRight: 4 }}
                    >
                      <img
                        className="selPlayers"
                        src={player.photo}
                        alt={player.name}
                      />
                      <div className="plyrName">{player.name}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* {currentTransactions !== undefined && currentTransactions.length > 0 && (
        <div>
          <h1>Your Bets</h1>
          {console.log("group-transsso",groupedTransactions)}
          {currentTransactions.map((transaction, index) => {
          console.log("current-group",transaction);
         return showBet(transaction, index)
 } )}
        </div>
      )} */}
      <div>
        <h1>Your Bets</h1>
        <div className="groupBet">
          {Object.values(groupedTransactions()).map((transactiongroup, index) =>
            ShowBetgroup(transactiongroup, index)
          )}
        </div>
      </div>
    </>
  );
};
