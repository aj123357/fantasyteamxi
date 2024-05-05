import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import axios from "axios";
import { host } from './Constants';
// import NotificationService from './service/NotificationService/NotificationService';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setLoggedIn }) => {
  const [Email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);

  const handleNext = () => {
    setShowOtpSection(true);
  };

  const handleLogin = async () => {
    try{
        const loginResponse = await axios.get(host + `login?email=${Email}&password=${otp}`);
        console.log("data",loginResponse);
        localStorage.setItem("userDetails",JSON.stringify(loginResponse?.data || undefined));
        setLoggedIn(true);
    } catch(e) {
        console.log("err", e);
        toast.error("Something Went Wrong !", {
          position: "top-right"
        });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
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
            <a href={`${host}passwordResetEmail`}>Forgot Password</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
