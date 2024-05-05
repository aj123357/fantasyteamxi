import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS file for styling
import Login from './Login';
import PlayerApp from './PlayerApp'
import axios from 'axios'
import { host, paymentPage } from './Constants';
import { fetchUser, fetchWalletAmount } from './utils/userUtil';
import { Winners } from './Winners';

const App = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [selectedPerformer1, setSelectedPerformer1] = useState('');
  const [selectedPerformer2, setSelectedPerformer2] = useState('');
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

  useEffect(() => {
    const fetchUser2 = async (req, res) =>{
      await fetchUser();
    }

    fetchUser2();
  }, [])
  console.log("localstoragr",localStorage.getItem("userDetails"));


  // Function to handle user's bet

  // Function to simulate match end and determine winners



  const [loggedIn, setLoggedIn] = useState(!(localStorage.getItem("userDetails") === undefined || localStorage.getItem("userDetails") === null));

  return (
    <>
     {/* Navbar */}
     <div>
     <nav className='nav_cont'>
     <ul>
     <img className='ipl_logo' src="ipl_img.png" alt="IPL 2024" />
       <li>Profile</li>
       <li>Home</li>
       <li>Transactions</li>
       <li>Wallet {fetchWalletAmount()} </li>
       <li><button onClick={() => console.log("withdraw")}>Withdraw Amount</button></li>
       {loggedIn && <li><button onClick={() =>{localStorage.removeItem("userDetails"); setLoggedIn(false);}}>Logout</button></li>}

     </ul>
   </nav>
   <img src= "iplsq.jpg" alt="IPL squad" /></div>

    <div className="app-container">
      <div className="body-container">
        {!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <div>
      

          {/* Body */}
          <div className="body-container">
            <PlayerApp />
          </div>
        </div>}
      </div>
     
    </div>
    </>
  );
};

export default App;
