import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const Login = ({ setLoggedIn }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);

  const handleNext = () => {
    // Simulated logic to send OTP to the mobile number
    // For demonstration purposes, I'm assuming OTP is sent immediately
    setShowOtpSection(true);
  };

  const handleLogin = () => {
    // Simulated logic to verify OTP
    // For demonstration purposes, I'm assuming OTP is correct if it's 123456
    if (otp === '123456') {
      setLoggedIn(true);
    } else {
      alert('Invalid OTP. Please try again.');
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
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button onClick={handleNext}>Next</button>
          </>
        )}

        {/* OTP input */}
        {showOtpSection && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
