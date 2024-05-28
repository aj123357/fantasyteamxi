import React, { useState } from "react";
import {
  createOrderId,
  fetchCurrentMatchTransactions,
} from "../../utils/dbUtil";
import { insertOrderToDb } from "../../utils/userUtil";
import {
  inMatchPaymentPage,
  paymentPageFields,
  preMatchPaymentPage,
} from "../../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Top2Performers = ({ currentMatch, currentTransactions }) => {
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]);

  const handlePlayerSelection = (player, position) => {
    setSelectedPlayers({
      ...selectedPlayers,
      [position]: player,
    });

    const newSelectedTeamAPlayers = [...selectedTeamAPlayers];
    newSelectedTeamAPlayers[position] = player;
    setSelectedTeamAPlayers(newSelectedTeamAPlayers);
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
      await insertOrderToDb(
        orderId,
        selectedPlayers,
        currentMatch.id,
        "top_2_performers"
      );
      console.log(localStorage.length, localStorage.getItem("userDetails"));
      console.log("result", JSON.parse(localStorage.getItem("userDetails")));
      window.location.href = `${
        matchStatus === "inMatch" ? inMatchPaymentPage : preMatchPaymentPage
      }?email=${JSON.parse(localStorage.getItem("userDetails"))?.email || ""}&${
        paymentPageFields.orderId
      }=${orderId}`;
    }
  };

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

  const getBetPrice = matchHasStarted() === "preMatch" ? "10" : "1000";

  const isPlaceBetDisabled = () => {
    return matchHasStarted() === "noBets"
      ? "No more Bets now !"
      : currentTransactions.length > 4
      ? "You have reached maximum bets limit for this match !"
      : selectedPlayers[0] === undefined || selectedPlayers[1] === undefined
      ? "Please complete your selection"
      : "false";
  };

  return (
    <div>
      <div className="dropdowns">
        {/* <h2>Bet on Top Performers</h2> */}
        {[0, 1].map((position) => (
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
                      (selected) => selected && selected.name === player.name
                    )}
                  >
                    {player.name}
                  </option>
                ))
              ) : (
                <h2></h2>
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
            <img className="selPlayers" src={player.photo} alt={player.name} />
            <div>{player.name}</div>
          </div>
        ))}
      </div>
      <section>
        <button className="bet_btn" onClick={placeBet}>
          <div>
            <div style={{ fontWeight: 900, fontSize: "1.3em" }}>
              ₹ {getBetPrice}
            </div>
            Place Bet
          </div>
        </button>
      </section>
    </div>

    // {user && user.email && user.email.includes("jindalsteeltraders") && (
    //   <button onClick={() => fetchImages()}>fetch images</button>
    // )}
  );
};

export default Top2Performers;
