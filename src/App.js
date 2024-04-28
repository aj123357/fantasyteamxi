import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import Login from './Login';

const App = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [selectedPerformer1, setSelectedPerformer1] = useState('');
  const [selectedPerformer2, setSelectedPerformer2] = useState('');
  const [userBet, setUserBet] = useState(0);

  // Function to handle user's selection of top performers
  const handleSelection = (performer) => {
    if (!selectedPerformer1) {
      setSelectedPerformer1(performer);
    } else if (!selectedPerformer2) {
      setSelectedPerformer2(performer);
    } else {
      alert('You can only select two performers.');
    }
  };

  const placeBet= () => {
    // call
  }

  // Function to handle user's bet
  const handleBet = (amount) => {
    setUserBet(amount);
  };

  // Function to simulate match end and determine winners
  const endMatch = () => {
    // Simulated logic to determine top performers
    const performers = ['Player1', 'Player2']; // Replace with actual logic
    setTopPerformers(performers);

    // Simulated logic to determine if user wins
    const userWins = topPerformers.includes(selectedPerformer1) && topPerformers.includes(selectedPerformer2);
    alert(userWins ? 'Congratulations! You won!' : 'Better luck next time.');
  };
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav>
        <ul>
          <li>Profile</li>
          <li>Home</li>
          <li>Transactions</li>
        </ul>
      </nav>
      <div className="body-container">
          {!loggedIn ? <Login setLoggedIn={setLoggedIn} /> :  <div>
          <img src="ipl2024.jpg" alt="IPL 2024" />

      {/* Body */}
      <div className="body-container">
        <section>
          <h2>Today's Match</h2>
          {/* Display today's match image */}
          <img src="todays_match.jpg" alt="Today's Match" />
          {/* Allow user to select top performers */}
          <div>
            <button onClick={() => handleSelection('Player1')}>Player 1</button>
            <button onClick={() => handleSelection('Player2')}>Player 2</button>
            {/* Add more players as needed */}
          </div>
        </section>

        {/* Betting section */}
        <section>
          <h2>Bet on Top Performers</h2>
          <input type="number" value={userBet} onChange={(e) => handleBet(e.target.value)} />
          <button onClick={placeBet}>Place Bet</button>
        </section>
      </div>
      </div>}
      </div>
    </div>
  );
};

export default App;
