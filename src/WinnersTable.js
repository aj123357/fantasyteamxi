import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "./Constants";

const WinnersTable = ({ matchId }) => {
  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    const fetchAllWinners = async () => {
      let data = [];
      if (matchId === undefined) {
        setWinnersList([]);
        return;
      } else {
        let allMatches = JSON.parse(localStorage.getItem("matches"));
        const match = allMatches.filter((match) => match.id === matchId);
        console.log("match.winners", match.winners);
        if (match.winners === undefined || match.winners.length === 0) {
          console.log("matchiddd", matchId);
          data = await axios.get(`${host}fetchAllWinners?matchId=${matchId}`);
        } else {
          console.log("hellooooooo", matchId);

          data = match.winners;
        }
        console.log("winnerlistt", data.data);
        setWinnersList(data.data);
      }
    };
    fetchAllWinners();
  }, []);
  return (
    <div className="modal" style={{ overflowX: "auto" }}>
      <div className="modal-content">
        <table style={{ borderCollapse: "collapse", width: "50%" }}>
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
              winnersList.slice(0, 3).map((winner, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {winner.username}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {900000 / winnersList.length}
                  </td>
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
