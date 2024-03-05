import React from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';




function CustomerProfile() {
  const location = useLocation();
  const { user,token } = location.state || {};
  const navigate = useNavigate();
  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000); 


  Cookies.set('token', token, { expires: oneHourFromNow, secure: true });
  const handleLogout = () => {
    // Clear JWT token and user data cookies
    Cookies.remove('jwt');
    Cookies.remove('user');
    Cookies.remove('token');
    
  
    navigate("/login");
  };

  return (
    <>
      <h1>Welcome {user ? user.first_name : ''}</h1>
      {user && (
        <div>
          <p>token: {token}</p>

          <p>Email: {user.email}</p>
          <p>firstname: {user.first_name}</p>
          <p>lastname: {user.last_name}</p>
          <p>user type:{user.usertype}</p>
          <button onClick={handleLogout}>Logout</button>

          
        </div>
      )}
    </>
  );
}

export default CustomerProfile;
