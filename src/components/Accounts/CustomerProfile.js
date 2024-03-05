import React from 'react';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
function CustomerProfile() {
  const location = useLocation();
  const { user,token } = location.state || {};
  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000); 


  Cookies.set('token', token, { expires: oneHourFromNow, secure: true });

  return (
    <>


      <h1>Welcome {user ? user.first_name : ''}</h1>
      {user && (
        <div>
          <p>token: {token}</p>

          <p>Email: {user.email}</p>
          <p>firstname: {user.first_name}</p>
          <p>lastname: {user.last_name}</p>
          
        </div>
      )}
    </>
  );
}

export default CustomerProfile;
