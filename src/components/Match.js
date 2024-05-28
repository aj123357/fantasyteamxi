import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/Match.css";
import {
  eventsMap,
  eventsMapUtil,
  eventsUtil,
  matches,
  players,
} from "../utils/gameUtil";
import {
  inMatchPaymentPage,
  paymentPageFields,
  preMatchPaymentPage,
} from "../utils/Constants";
import { createOrderId, fetchCurrentMatchTransactions } from "../utils/dbUtil";
import {
  fetchMatchPlayers,
  fetchMatches,
  insertOrderToDb,
} from "../utils/userUtil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useLocation } from "react-router-dom";

const Match = () => {
  const { id } = useParams();
  const location = useLocation();
  const { events } = location.state || {};

  console.log("ankush message", events);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || undefined
  );
  const [isOpen, setIsOpen] = useState("");

  const toggleAccordion = (event) => {
    if (event === isOpen) {
      setIsOpen("");
    } else setIsOpen(event);
  };
  const [currentTransactions, setCurrentTransactions] = useState(
    fetchCurrentMatchTransactions(id)
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
      const match = allMatches.find((match) => match.id === id);
      console.log("match", match);
      if (match === undefined) {
        setCurrentMatch({ players: [] });
      } else {
        await fetchMatchPlayers(match.teams).then((players) => {
          console.log("players", players);

          setCurrentMatch({
            ...match,
            players: [
              ...players[match.teams[0]].teamPlayers,
              ...players[match.teams[1]].teamPlayers,
            ],
          });
        });
      }
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
    const today = new Date().toISOString().split("T")[0];
    // console.log(
    //   "ajjjj",
    //   today.getDate(),
    //   today.getFullYear(),
    //   today.getMonth()
    // );

    if (today < currentMatch.date) {
      return "preMatch";
    }

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

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
    return matchHasStarted() === "noBets"
      ? "No more Bets now !"
      : currentTransactions.length > 4
      ? "You have reached maximum bets limit for this match !"
      : selectedPlayers[0] === undefined ||
        selectedPlayers[1] === undefined ||
        selectedPlayers[2] === undefined
      ? "Please complete your selection"
      : "false";
  };

  const placeBet = async () => {
    const err = isPlaceBetDisabled();
    if (err !== "false") {
      toast.error(err, {
        position: "top-right",
      });
    } else {
      const matchStatus = matchHasStarted();
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
              src={"/" + currentMatch.teams[0].toLowerCase() + ".png"}
              alt={currentMatch.teams[0]}
            />
            <span style={{ marginRight: "2em" }}>vs</span>
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              className="team1"
              src={"/" + currentMatch.teams[1].toLowerCase() + ".png"}
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
            {events.map((event) => (
              <div key={event}>
                <div
                  className="accordion-title"
                  onClick={() => toggleAccordion(event)}
                >
                  <h3>{eventsMapUtil[event].title}</h3>
                  <div>{isOpen === event ? "-" : "+"}</div>
                </div>
                <div className="accordion-content">
                  {isOpen === event &&
                    eventsUtil(currentMatch, currentTransactions, event)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Match;
