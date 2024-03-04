import React from 'react';
import { useLocation } from "react-router-dom";

function CustomerProfile() {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <>
      <h1>Welcome {user ? user.first_name : ''}</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>firstname: {user.first_name}</p>
          <p>lastname: {user.last_name}</p>
          
        </div>
      )}
    </>
  );
}

export default CustomerProfile;
