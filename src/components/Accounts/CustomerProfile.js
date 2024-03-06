import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./CustomerProfile.css";

function CustomerProfile() {
  const location = useLocation();
  const { user, token } = location.state || {};
  const navigate = useNavigate();
  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000);

  Cookies.set("token", token, { expires: oneHourFromNow, secure: true });

  const handleLogout = () => {
    // Clear JWT token and user data cookies
    Cookies.remove("jwt");
    Cookies.remove("user");
    Cookies.remove("token");

    // Call the logout API
    axios
      .post("http://localhost:8000/api/logout/")
      .then((res) => {
        console.log("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <h1>Welcome {user ? user.first_name : ""}</h1>
      {user && (
        <div>
          {/* <p>Token: {token}</p> */}
          <p>Email: {user.email}</p>
          <p>Firstname: {user.first_name}</p>
          <p>Lastname: {user.last_name}</p>
          <p>User type: {user.usertype}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default CustomerProfile;
