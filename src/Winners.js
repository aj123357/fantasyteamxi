import React, { useEffect, useState } from 'react';

export const Winners = (props) => {
    const [topPerformers, setTopPerformers] = useState([]);

    useEffect(() => {
        console.log("inside winners",JSON.parse(localStorage.getItem("userDetails")));

    }, []);

    const endMatchResult = () => {
        // Simulated logic to determine top performers
        // const performers = ['Player1', 'Player2', 'player3']; // Replace with actual logic
        const performers = props.currentMatch.topPerformers;
        if (performers.length !== 3){
            return "";
        }
        setTopPerformers(performers);
    
        // Simulated logic to determine if user wins
        const userWins = topPerformers[0] === props.transaction.playerSelected[0] &&
                         topPerformers[1] === props.playerSelected[1] &&
                         topPerformers[2] === props.playerSelected[2];
        return (userWins ? 'Congratulations! You won!' : 'Ohh! You missed Rs 1,00,000 this time');
    };

    const hasMatchEnded = () => {
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        // const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000); // End of today
      
          const transactionDate = new Date(props.transaction.created_at * 1000); // Convert epoch date to milliseconds
          return transactionDate < todayStart;
    }

    return <div style={{ display: "flex", margin: 2, borderStyle: "solid", alignItems: "center"}}>
            <div className="selected-players" style={{ display: 'flex'}}>
                {Object.values(props.transaction.playerSelected).map((player, index) => (
                    <img className="selPlayers" key={index} src={player.photo} alt={player.name} />
                ))}
            </div>
            {hasMatchEnded ? "Match is in Progress" : endMatchResult()}
        </div>
       
}