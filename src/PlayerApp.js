import React, { useState, useEffect } from 'react';
import './App.css';
import './PlayerApp.css';
import { matches, players } from './utils/gameUtil';

const PlayerApp = () => {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState({});
    const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]); 

    // Simulated data for IPL matches

    useEffect(() => {
        // Find today's match
        const today = new Date().toISOString().split('T')[0];
        const match = matches.find(match => match.date === today);
        setCurrentMatch({...match, players: [...players[match.teams[0]], ...players[match.teams[1]]]});
    }, []);

    const handlePlayerSelection = (player, position) => {
        setSelectedPlayers({
            ...selectedPlayers,
            [position]: player
        });

        const newSelectedTeamAPlayers = [...selectedTeamAPlayers];
        newSelectedTeamAPlayers[position] = player;
        setSelectedTeamAPlayers(newSelectedTeamAPlayers);
    };

    return (
        <div className="app">
            <div className="main-content">
                {currentMatch ? (
                    <div className="match-details">
                        <h2>Current IPL Match</h2>
                        <div className="dropdowns">
                            {[0, 1, 2].map(position => (
                                <div key={position} className="dropdown">
                                    <label htmlFor={`position-${position}`}>Select player #{position}:</label>
                                    <select
                                        id={`position-${position}`}
                                        onChange={e => handlePlayerSelection(currentMatch.players[parseInt(e.target.value)], position)}
                                        value={selectedPlayers[position]?.name || ''}
                                    >
                                        <option value="">
                                            {selectedPlayers[position]?.name || "Select a Player"}
                                        </option>
                                        {currentMatch.players.map((player, index) => (
                                            <option key={index} value={index} disabled={Object.values(selectedPlayers).some(selected => selected && selected.name === player.name)}>
                                                {player.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                       
                        <div className="selected-players">
                            {Object.values(selectedPlayers).map((player, index) => (
                                <img className="selPlayers" key={index} src={player.photo} alt={player.name} />
                            ))}
                        </div>
                        
                    </div>
                ) : (
                    <p>No match scheduled for today</p>
                )}
            </div>
        </div>
    );
};

export default PlayerApp;
