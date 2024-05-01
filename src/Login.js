import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import axios from "axios";
import { host } from './Constants';

const Login = ({ setLoggedIn }) => {
  const [Email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);

  const handleNext = () => {
    // Simulated logic to send OTP to the mobile number
    // For demonstration purposes, I'm assuming OTP is sent immediately
    setShowOtpSection(true);
  };

  const handleLogin = async () => {
    // Simulated logic to verify OTP
    // For demonstration purposes, I'm assuming OTP is correct if it's 123456
    try{
        const loginResponse = await axios.get(host + `login?email=${Email}&password=${otp}`);
        console.log("data",loginResponse);
        localStorage.setItem("userDetails",JSON.stringify(loginResponse?.data?.user || undefined));
        setLoggedIn(true);
    } catch(e) {
        console.log("err", e);
        alert('Invalid Password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        {/* Mobile Number input */}
        {!showOtpSection && (
          <>
            <input
              type="text"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleNext}>Next</button>
          </>
        )}

        {/* OTP input */}
        {showOtpSection && (
          <>
            <input
              type="text"
              placeholder="Enter Password"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            
            <button onClick={async () => await handleLogin(Email, otp)}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
