import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import './CustomerProfile.css'

function CustomerProfile() {
  const location = useLocation();
  const { user, token } = location.state || {};
  console.log("User:", user);
  const navigate = useNavigate();
  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000);

  Cookies.set('token', token, { expires: oneHourFromNow, secure: true });

  const [updatedUser, setUpdatedUser] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
    phone: user.phone,
    birthdate: user.birthdate,
    
  });
  console.log("UpdatedUser:", updatedUser);


  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setIsModified((user, updatedUser));
  }, [user, updatedUser]);

  // const compareUsers = (user, UpdatedUser) => {
  //   return (
  //     user.first_name === UpdatedUser.first_name &&
  //     user.last_name === UpdatedUser.last_name &&
  //     user.address === UpdatedUser.address &&
  //     user.phone === UpdatedUser.phone &&
  //     user.birthdate === UpdatedUser.birthdate 
  //   );
  // };
  console.log("UpdatedUser:", updatedUser);
  const handleFieldChange = (event) => {
    const field_name = event.target.name;
    const field_value = event.target.value;

    setUpdatedUser({
      ...updatedUser,
      [field_name]: field_value,
    });
  };
  
  const handleUpdate = (event) => {
    axios.put(`http://localhost:8000/api/update/${user.id}/`, updatedUser)
      .then((res) => {
        console.log("Update successful");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  const handleLogout = () => {
    Cookies.remove('jwt');
    Cookies.remove('user');
    Cookies.remove('token');
    axios.post('http://localhost:8000/api/logout/')
      .then((res) => {
        console.log("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  const handleDelete = () => {
    const password = prompt("Please enter your password to confirm deletion:");
    if (password) {
      axios.delete(`http://localhost:8000/api/delete/${user.id}/`, {
        data: { password: user.password }
      })
      .then((res) => {
        console.log("Delete successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
    }
  };

  return (
    <>
      <h4>Welcome {user ? user.first_name : ''},</h4>
      {user && (
        <div>
          <form onSubmit={handleUpdate}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input type="text" className="form-control" id="first_name" name="first_name" value={updatedUser.first_name} onChange={handleFieldChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="last_name">Last Name:</label>
                  <input type="text" className="form-control" id="last_name" name="last_name" value={updatedUser.last_name} onChange={handleFieldChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" className="form-control" id="address" name="address" value={updatedUser.address} onChange={handleFieldChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number:</label>
                  <input type="text" className="form-control" id="phone_number" name="phone" value={updatedUser.phone} onChange={handleFieldChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input type="date" className="form-control" id="birthdate" name="birthdate" value={updatedUser.birthdate} onChange={handleFieldChange} />
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="form-control" id="username" name="username" value={updatedUser.username} onChange={handleFieldChange} />
                </div>
              </div> */}
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isModified} onChange={handleUpdate}>Update</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
          </form>
          <button onClick={handleLogout} >Logout</button>
        </div>
      )}
    </>
  );
}

export default CustomerProfile;
