import React, { useEffect, useState } from "react";
import "../App.css"; // Import CSS file for styling
import axios from "axios";
import { host } from "../utils/Constants";
// import NotificationService from './service/NotificationService/NotificationService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import Loader from "./common/Loader";

const Login = ({ setLoggedIn }) => {
  const [Email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleResetPassword = async () => {
    try {
      await axios.get(`${host}passwordResetEmail?email=${Email}`);
      toast.success("Successfully send password reset email", {
        position: "top-right",
      });
    } catch (e) {
      toast.error("Unable to send password reset email", {
        position: "top-right",
      });
    }
  };

  const handleNext = () => {
    setShowOtpSection(true);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const loginResponse = await axios.get(
        host + `login?email=${Email}&password=${otp}`
      );
      console.log("data", loginResponse);
      // localStorage.setItem(
      //   "userDetails",
      //   JSON.stringify(loginResponse?.data || undefined)
      // );
      setLoggedIn(true);
      setIsLoading(false);
    } catch (e) {
      console.log("ankush err", e);

      console.log("ankush err", e?.response?.status || 500);
      toast.error(
        e.response && e.response.status === 401
          ? "Incorrect email/password"
          : "Something Went Wrong !",
        {
          position: "top-right",
        }
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-box">
        {!showOtpSection && (
          <>
            <input
              type="text"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Password"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="login-btn"
              onClick={async () => await handleLogin(Email, otp)}
            >
              <div>Login {isLoading && <Loader />}</div>
            </button>
            <a
              className="forgot-btn"
              // href={`${host}passwordResetEmail?email=${Email}`}
              onClick={async () => await handleResetPassword()}
            >
              Forgot Password
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
