import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UpcomingMatches.css";
// import "../styles/WinnersTable.css";
import { fetchMatches } from "../utils/userUtil";
import { useNavigate } from "react-router-dom";

const UpcomingMatches = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      const matches = allMatches.filter(
        (match) => match.date >= today && match.winners.length === 0
      );

      console.log("matches", matches);
      setUpcomingMatches(matches);
      setIsLoading(false);
    };
    console.log("ankush");
    fetchMatchData();
  }, []);

  const handleCardClick = (match) =>
    navigate(`/match/${match.id}`, {
      state: { events: match?.events || [], id: 1 },
    });

  if (isLoading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }
  return upcomingMatches.map((match, index) => (
    <div
      className="card"
      onClick={() => {
        console.log("clicked");
        handleCardClick(match);
      }}
    >
      {/* style={{ height: "100%", display: "flex", alignItems: "center" }} */}
      <div>
        <img
          //   style={{
          //     height: "100%",
          //     width: "100%",
          //     objectFit: "contain",
          //     marginRight: "2em",
          //   }}
          className="team1"
          src={match.teams[0].toLowerCase() + ".png"}
          alt={match.teams[0]}
        />
        <span style={{ marginRight: "2em" }}>vs</span>
        <img
          //   style={{ height: "100%", width: "100%", objectFit: "contain" }}
          className="team1"
          src={match.teams[1].toLowerCase() + ".png"}
          alt={match.teams[1]}
        />
      </div>{" "}
      <div className="card-content">
        <h3 className="card-title">{match.date}</h3>
        <p className="card-description">{match.startTime}</p>
      </div>
    </div>
  ));
};

export default UpcomingMatches;
