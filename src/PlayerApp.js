import React, { useState, useEffect } from 'react';
import './App.css';
import './PlayerApp.css';

const PlayerApp = () => {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState({});
    const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]); 

    // Simulated data for IPL matches
    const matches = [
        {
            date: '2024-05-02',
            teams: ['Team A'],
            players: {
                'Team A': [
                    { name: 'Player 1', photo: '/dhoni.png'},
                    { name: 'Player 2', photo: '/patcummins.png'},
                    { name: 'Player 3', photo: '/player3.jpg'},
                    { name: 'Player 4', photo: '/player1.jpg'},
                    { name: 'Player 5', photo: '/player2.jpg'},
                    { name: 'Player 6', photo: '/player3.jpg'},
                    { name: 'Player 7', photo: '/player1.jpg'}
                    // Add more players...
                ]
            }
        },
    ];

    useEffect(() => {
        // Find today's match
        const today = new Date().toISOString().split('T')[0];
        const match = matches.find(match => match.date === today);
        setCurrentMatch(match);
    }, []);

    const handlePlayerSelection = (team, player, position) => {
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

                        <div className="player-selection">
                            {currentMatch.teams.map(team => (
                                <div key={team} className="team-players">
                                    <h3>{team}</h3>
                                    <div className="dropdowns">
                                        {[0, 1, 2].map(position => (
                                            <div key={position} className="dropdown">
                                                <label htmlFor={`${team}-position-${position}`}>Select player #{position}:</label>
                                                <select
                                                    id={`${team}-position-${position}`}
                                                    onChange={e => handlePlayerSelection(team, currentMatch.players[team][parseInt(e.target.value)], position)}
                                                    value={selectedPlayers[position]?.name || ''}
                                                >
                                                    <option value="">
                                                        {selectedPlayers[position]?.name || "Select a Player"}
                                                    </option>
                                                    {currentMatch.players[team].map((player, index) => (
                                                        <option key={index} value={index} disabled={Object.values(selectedPlayers).some(selected => selected && selected.name === player.name)}>
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
