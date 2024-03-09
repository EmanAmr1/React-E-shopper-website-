import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import './CustomerProfile.css'

function CustomerProfile() {
  const location = useLocation();
  const { user } = location.state || {};
  console.log("User:", user);
  const navigate = useNavigate();
 

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
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Token ${token}`
    };
  
    axios.put(`http://localhost:8000/api/profile/`, updatedUser,null, { headers })
      .then((res) => {
        console.log("Update successful");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  const handleLogout = () => {
    const token = Cookies.get('token'); // Retrieve the token from cookies
  
    // Remove the token from cookies
    Cookies.remove('token');
  
    // Set up headers with the token
    const headers = {
      Authorization: `Token ${token}`
    };
  
    // Send the logout request with the token in headers
    axios.post('http://localhost:8000/api/logout/', null, { headers })
      .then(() => {
        console.log("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  
  
  
  
  const handleDelete = () => {
    const token = Cookies.get('token'); // Retrieve the token from cookies
  
    const headers = {
      Authorization: `Token ${token}`
    };
  
    // Remove the token from cookies after setting headers
    Cookies.remove('token');
  
    axios.delete('http://localhost:8000/api/profile/', { headers })
      .then((res) => {
        console.log("Delete successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };
  

  return (
    < div>
    
      <div className='row mt-3 ' style={{width:'100%'}}>
        <div className="col-md-4 col-sm-12">
          <ul>
            <li>
              <h4>Welcome {user ? user.first_name : ''}</h4>
            </li>
            <li><h5>{user ? user.email : ''}</h5></li>
            <li className='mt-5'>
              <div className='btns'>
                <div>
               <a className='btn1' onClick={handleLogout} sstyle={{ textDecoration: 'none' }}>Logout</a>
               </div>
               <div>
               <a className='btn2'  onClick={handleDelete}>Delete Account</a>
               </div>
               </div>
               </li>
          </ul>
        </div>
      {user && (
        <div className='col-md-8 mt-3 '>
          <form onSubmit={handleUpdate} className='ml-2'>
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
        
          </form>
         
        </div>
      )}
      </div>
    </div>
  );
}

export default CustomerProfile;
