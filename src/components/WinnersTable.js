import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../utils/Constants";
import "../styles/WinnersTable.css";

const WinnersTable = ({ matchId, isOpen, onClose, endMatchResult }) => {
  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    const fetchAllWinners = async () => {
      if (matchId === undefined || winnersList.length > 0) {
        setWinnersList([]);
        //   return winnersList;
      } else {
        let allMatches = JSON.parse(localStorage.getItem("matches"));

        const match = allMatches.find((match) => match.id === matchId);
        console.log("today match.winners", match);
        if (match.winners === undefined || match.winners.length === 0) {
          console.log("matchiddd", matchId);
          const response = await axios.get(
            `${host}fetchAllWinners?matchId=${matchId}`
          );
          setWinnersList(response.data);
        } else {
          console.log("hellooooooo", matchId);

          setWinnersList(match.winners);
        }
      }
    };
    fetchAllWinners();
  }, []);

  const modalStyle = {
    display: isOpen ? "block" : "none",
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="table-container">
          <h1>{endMatchResult}</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Winnings</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows and data here */}
              {winnersList.length > 0 &&
                winnersList.map((winner, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{winner.username}</td>
                    <td>{parseInt(900000 / winnersList.length)}</td>
                    {/* Add more table cells for additional data */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WinnersTable;
