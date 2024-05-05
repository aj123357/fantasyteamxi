import React, { useState, useEffect } from 'react';
import './App.css';
import './PlayerApp.css';
import { matches, players } from './utils/gameUtil';
import { paymentPage, paymentPageFields } from './Constants';
import { createOrderId } from './utils/dbUtil';
import { insertOrderToDb } from './utils/userUtil';
import { Winners } from './Winners';

const PlayerApp = () => {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState({});
    const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]); 
    const [currentTransactions, setCurrentTransactions] = useState([]);
    // const [currentBets, setCurrentBets] = useState([1,2,3]);


    // Simulated data for IPL matches

    useEffect(() => {
        // Find today's match
        fetchCurrentTransactions();
        const today = new Date().toISOString().split('T')[0];
        const match = matches.find(match => match.date === today);
        console.log("match", match);
        if (match === undefined) {
            console.log("undefineddddd");
            setCurrentMatch({players: []});
        } else
            setCurrentMatch({...match, players: [...players[match.teams[0]].teamPlayers, ...players[match.teams[1]].teamPlayers]});
    }, []);

    const fetchCurrentTransactions = () => {
        const allTransactions = JSON.parse(localStorage.getItem("userDetails")).transactions;
        console.log("hereeeee", allTransactions);

        if (allTransactions === undefined || allTransactions.length === 0) {
            setCurrentTransactions([]);
        }
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000); // End of today
        console.log("todaystart", todayStart);
        console.log("todayEnd", todayEnd);

        const currentTransactions = 
        allTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.created_at.seconds * 1000); // Convert epoch date to milliseconds
            // console.log("transactionDate", transactionDate)

            return transactionDate >= todayStart && transactionDate < todayEnd && transaction.status === "captured"; 
        });
        // console.log("currentTransactions", currentTransactions)
        setCurrentTransactions(currentTransactions);
    }

    const placeBet = async () => {
        // call
        const orderId = createOrderId();
        await insertOrderToDb(orderId, selectedPlayers)
        console.log(localStorage.length, localStorage.getItem("userDetails"));
        console.log("result", JSON.parse(localStorage.getItem("userDetails")));
        window.location.href = `${paymentPage}?email=${JSON.parse(localStorage.getItem("userDetails"))?.email || ""}&${paymentPageFields.orderId}=${orderId}`;
    }


    
    const handlePlayerSelection = (player, position) => {
        setSelectedPlayers({
            ...selectedPlayers,
            [position]: player
        });

        const newSelectedTeamAPlayers = [...selectedTeamAPlayers];
        newSelectedTeamAPlayers[position] = player;
        setSelectedTeamAPlayers(newSelectedTeamAPlayers);
    };

    const todaysMatchBanner = () => {
        return (
            <section>
                <h2>Today's Match</h2>
                {/* Display today's match image */}
                <div style={{'display':'flex'}}>
                    <div>
                        <img className="team1" src="srh_logo.png" alt="SRH vs CSK" />
                        <h4>{currentMatch.teams[0]}</h4>
                    </div> 
                    <div> 
                        <img className="team2" src="csk.png" alt="SRH vs CSK" />
                        <h4>{currentMatch.teams[1]}</h4>
                    </div>
                </div>
          </section>
        )
    }

    return (
        <div className="app">
            <div className="main-content">
                {currentMatch && currentMatch !== undefined && currentMatch.players.length > 0 ? (
                    <div className="match-details">
                        {todaysMatchBanner(currentMatch)}
                        <div className="dropdowns">
                            <h2>Bet on Top Performers</h2>
                            {[0, 1, 2].map(position => (
                                <div key={position} className="dropdown">
                                    <label htmlFor={`position-${position}`}>Select player #{position}:</label>
                                    <select
                                        id={`position-${position}`}
                                        onChange={e => handlePlayerSelection(currentMatch.players[parseInt(e.target.value)], position)}
                                        value={selectedPlayers[position]?.name || ''}
                                    >
                                        <option value="">
                                            {selectedPlayers !== undefined ? selectedPlayers[position]?.name || "Select a Player" : ""}
                                        </option>
                                        {currentMatch && currentMatch !== undefined ? currentMatch.players.map((player, index) => (
                                            <option key={index} value={index} disabled={Object.values(selectedPlayers).some(selected => selected && selected.name === player.name)}>
                                                {player.name}
                                            </option>
                                        )) : <h2>hellloo</h2>}
                                    </select>
                                </div>
                            ))}
                        </div>
                       
                        <div className="selected-players">
                            {Object.values(selectedPlayers).map((player, index) => (
                                <img className="selPlayers" key={index} src={player.photo} alt={player.name} />
                            ))}
                        </div>
                        <section>
                            {/* <input type="number" value={userBet} onChange={(e) => handleBet(e.target.value)} /> */}
                            <button disabled={selectedPlayers[2] === undefined} className='bet_btn' onClick={placeBet}>Place Bet</button>
                        </section>
                        {currentTransactions.length > 0 && (
                            currentTransactions.map(transaction => 
                                <Winners transaction={transaction} selectedPlayers={selectedPlayers} currentMatch={currentMatch} />
                            )
                        )}
                     </div>
                ) : (
                    <p>No match scheduled for today</p>
                )}
            </div>
        </div>
    );
};

export default PlayerApp;
