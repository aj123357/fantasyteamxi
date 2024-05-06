import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "./Constants";

const WinnersTable = ({ match }) => {
  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    const fetchAllWinners = async () => {
      let data = [];
      if (match.winners === undefined || match.winners.length === 0) {
        data = await axios.get(`${host}fetchAllWinners?matchId=${match.id}`);
      } else {
        data = match.winners;
      }
      setWinnersList(data);
    };
    fetchAllWinners();
  }, []);
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {winner.name}
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
  );
};

export default WinnersTable;
