import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "./Constants";

const WinnersTable = ({ matchId, isOpen, onClose }) => {
  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    const fetchAllWinners = async () => {
      let data = [];
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
        //   console.log("winnerlistt", data.data);
        //   setWinnersList(data.data);
        //   return data.data;
      }
    };
    fetchAllWinners();
  }, []);

  //   fetchAllWinners();
  const modalStyle = {
    display: isOpen ? "block" : "none",
  };
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Winners Table</h2>
        <div className="table-container"></div>
        <table style={{ overflowY: "scroll" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rank</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Winnings
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {winnersList.length > 0 &&
              winnersList.map((winner, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{winner.username}</td>
                  <td>{900000 / winnersList.length}</td>
                  {/* Add more table cells for additional data */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinnersTable;
