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
            teams: ['Team A', 'Team B'],
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
                ],
                'Team B': [
                    { name: '_Player 1', photo: '/player1.jpg'},
                    { name: '_Player 2', photo: '/player2.jpg'},
                    { name: '_Player 3', photo: '/player3.jpg'},
                    { name: '_Player 4', photo: '/player1.jpg'},
                    { name: '_Player 5', photo: '/player2.jpg'},
                    { name: '_Player 6', photo: '/player3.jpg'},
                    { name: '_Player 7', photo: '/player1.jpg'}
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

    console.log(selectedPlayers);

    const handlePlayerSelection = (team, player, position) => {
        console.log(player, position);
        // setSelectedPlayers(prevSelectedPlayers => ({
        //     ...prevSelectedPlayers,
        //     [team]: {
        //         ...prevSelectedPlayers[team],
        //         [position]: player.name
        //     }
        // }));
        setSelectedPlayers({
            ...selectedPlayers,
            [position]: player
        })


        const change = `${player.name} ${selectedPlayers[team]?.[position] ? 'removed' : 'selected'} for ${team}`;
        // setCurrentSelections(prevCurrentSelections => ({
        //     ...prevCurrentSelections,
        //     [`${team}-position-${position}`]: player.photo
        // }));
        // console.log(currentSelections);

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
                                        {[0, 1, 2].map(position => (
                                            <div key={position} className="dropdown">
                                                <label htmlFor={`${team}-position-${position}`}>Select player #{position}:</label>
                                                <select
                                                    id={`${team}-position-${position}`}
                                                    onChange={e =>{
                                                        console.log(JSON.stringify(e.target.value));
                                                        handlePlayerSelection(team, currentMatch.players[team][parseInt(e.target.value)], position);
                                                    }}
                                                    value={selectedPlayers[position]?.name || ''}
                                                >
                                                    <option value="">
                                                        <div>
                                                            {selectedPlayers[position]?.name || "Select a Player"}
                                                        </div>
                                                    </option>
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
