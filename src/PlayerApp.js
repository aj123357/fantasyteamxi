import React, { useState, useEffect } from 'react';
import './App.css';
import './PlayerApp.css';

const PlayerApp = () => {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState({});
    const [currentSelections, setCurrentSelections] = useState({});

    // Simulated data for IPL matches
    const matches = [
        {
            date: '2024-05-01',
            teams: ['Team A'],
            players: {
                'Team A': [
                    { name: 'Player 1', photo: '/player1.jpg'},
                    { name: 'Player 2', photo: '/player2.jpg'},
                    { name: 'Player 3', photo: '/player3.jpg'},
                    { name: 'Player 4', photo: '/player1.jpg'},
                    { name: 'Player 5', photo: '/player2.jpg'},
                    { name: 'Player 6', photo: '/player3.jpg'},
                    { name: 'Player 7', photo: '/player1.jpg'}
                    // Add more players...
                ]
            }
        },
        // Add more matches here...
    ];

    useEffect(() => {
        // Find today's match
        const today = new Date().toISOString().split('T')[0];
        const match = matches.find(match => match.date === today);
        setCurrentMatch(match);
    }, []);

    const handlePlayerSelection = (team, player, position) => {
        setSelectedPlayers(prevSelectedPlayers => ({
            ...prevSelectedPlayers,
            [team]: {
                ...prevSelectedPlayers[team],
                [position]: player
            }
        }));

        const change = `${player.name} ${selectedPlayers[team]?.[position] ? 'removed' : 'selected'} for ${team}`;
        setCurrentSelections(prevCurrentSelections => ({
            ...prevCurrentSelections,
            [`${team}-position-${position}`]: player.photo
        }));
    };

    const isPlayerSelected = (player) => {
        for (const selectedTeam of Object.values(selectedPlayers)) {
            for (const selectedPlayer of Object.values(selectedTeam)) {
                if (selectedPlayer === player.name) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <div className="app">
            <div className="main-content">
                {currentMatch ? (
                    <div className="match-details">
                        <h2>Current IPL Match</h2>

                        <div className="player-selection">
                            {currentMatch.teams.map(team => (
                                <div key={team} className="team-players">
                                    <h3>{team}</h3>
                                    <div className="dropdowns">
                                        {[1, 2, 3].map(position => (
                                            <div key={position} className="dropdown">
                                                <label htmlFor={`${team}-position-${position}`}>Select player #{position}:</label>
                                                <select
                                                    id={`${team}-position-${position}`}
                                                    onChange={e => handlePlayerSelection(team, currentMatch.players[team][e.target.value], position)}
                                                    value={selectedPlayers[team]?.[position] || ''}
                                                >
                                                    <option value="">Select a player</option>
                                                    {currentMatch.players[team].map((player, index) => (
                                                        <option key={index} value={index} disabled={isPlayerSelected(player)}>
                                                            {player.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
