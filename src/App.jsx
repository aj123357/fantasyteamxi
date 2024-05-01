import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS file for styling
import Login from './Login';
import {Helmet} from "react-helmet";
import axios from "axios";
// import { Instamojo } from "https://js.instamojo.com/v1/checkout.js";


const App = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [selectedPerformer1, setSelectedPerformer1] = useState('');
  const [selectedPerformer2, setSelectedPerformer2] = useState('');
  const [userBet, setUserBet] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://js.instamojo.com/v1/checkout.js";
    script.async = true;
  
    document.body.appendChild(script);

    // Instamojo.configure({
    //   handlers: {
    //     onOpen: function() {},
    //     onClose: function() {},
    //     onSuccess: function(response) {},
    //     onFailure: function(response) {}
    //   }
    // });
    return () => {
      document.body.removeChild(script);
    }
  }, [])


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

  const placeBet= async () => {
    // call razorpay script
    // Instamojo.open('http://www.instamojo.com/@sampad');
    console.log(window.location)
    window.location.href = "https://rzp.io/l/M5ad38O8Xy";
    // await axios.get("http://localhost:5008/v1/place_bet");
    // await axios.get("https://rzp.io/l/M5ad38O8Xy", {headers: {
    //   "Access-Control-Allow-Origin": "*"
    // }});
    // try {
    //   const response = await instamojo.paymentRequestCreate({
    //     purpose: 'Test Payment',
    //     amount: '100',
    //     buyer_name: 'John Doe',
    //     email: 'john@example.com',
    //     phone: '9876543210',
    //     redirect_url: 'http://localhost:3000/payment/success',
    //     webhook: 'http://localhost:3000/payment/webhook',
    //   });
    //   console.log('Payment URL:', response.payment_request.longurl);
    //   window.location.href = response.payment_request.longurl; // Redirect user to payment page
    // } catch (error) {
    //   console.error('Error processing payment:', error);
    // }
    
    // Instamojo.configure({
    //   handlers: {
    //     onOpen: onOpenHandler,
    //     onClose: onCloseHandler,
    //     onSuccess: onPaymentSuccessHandler,
    //     onFailure: onPaymentFailureHandler
    //   }
    // });
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
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="app-container">
      <script>

      </script>
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
          {/* <Helmet>
            <script src="https://js.instamojo.com/v1/checkout.js"></script>
              <script>
              onButtonClick
              </script>          
          </Helmet> */}
        </section>
      </div>
      </div>}
      </div>
    </div>
  );
};

export default App;
