import React, { useState } from "react";
import welc from "../../imags/register/welc.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCake } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faShopify } from "@fortawesome/free-brands-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
// import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Register() {
  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    username: "",
    email: "",
    birthdate: "",
    phone: "",
    usertype: "",
    address: "",
    shopname: "",
  });

  const navigate = useNavigate();
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    padding: "20px",
    marginTop: "20px",
    position: "relative",
  };

  const imageStyle = {
    width: "550px",
  };

  const handleFieldChange = (event) => {
    const field_name = event.target.name;
    const field_value = event.target.value;
    
    setUserForm({
        ...userForm,
        [field_name]: field_value,
    });
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(userForm);
  axios.post('http://localhost:8000/api/register/', userForm)
    .then((res) => {
      console.log(res);
      navigate("/login");
    })
    .catch((err) => console.log(err));
};

  return (
    <div className="container" style={containerStyle}>
      <img src={welc} alt="Welcome" style={imageStyle} />
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstname" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              placeholder="FirstName"
              value={userForm.first_name}
              onChange={handleFieldChange}
              name="first_name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastname" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              placeholder="LastName"
              value={userForm.last_name}
              onChange={handleFieldChange}
              name="last_name"
            />
          </div>
          {!(userForm.first_name && userForm.last_name) && (
            <div className="col-md-12">
              <span className="text-danger">
                Both first name and last name are required
              </span>
            </div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={userForm.password}
              onChange={handleFieldChange}
              name="password"
            />
            {userForm.password &&
              !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(userForm.password) && (
                <span className="text-danger">
                  Password must contain at least one uppercase character and one
                  special character
                </span>
              )}
          </div>
          <div className="col-md-6">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={userForm.confirmPassword}
              onChange={handleFieldChange}
              name="confirmPassword"
            />
            {userForm.confirmPassword !== userForm.password && (
              <span className="text-danger">Passwords do not match</span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="user" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text" id="user">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="user"
                value={userForm.username}
                onChange={handleFieldChange}
                name="username"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" id="email">
                @
              </span>
              <input
                type="email"
                className="form-control"
                value={userForm.email}
                id="email"
                onChange={handleFieldChange}
                name="email"
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="birthdate" className="form-label">
              BirthDate
            </label>
            <div className="input-group">
              <span className="input-group-text" id="birthdate">
                <FontAwesomeIcon icon={faCake} />
              </span>
              <input
                type="date"
                className="form-control"
                value={userForm.birthdate}
                id="birthdate"
                onChange={handleFieldChange}
                name="birthdate"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Mobile Phone
            </label>
            <div className="input-group">
              <span className="input-group-text" id="phone">
                <FontAwesomeIcon icon={faMobileAlt} />
              </span>
              <input
                type="tel"
                className="form-control"
                value={userForm.phone}
                id="phone"
                onChange={handleFieldChange}
                name="phone"
                required
              />
            </div>
            {userForm.phone &&
              !userForm.phone.startsWith("+20") && (
                <span className="text-danger">
                  Mobile phone must begin with +20
                </span>
              )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="usertype" className="form-label">
              User Type
            </label>
            {/* <span className="input-group-text" id="user"><FontAwesomeIcon icon={faUser} /></span> */}
            <select
              className="form-select"
              id="usertype"
              value={userForm.usertype}
              onChange={handleFieldChange}
              name="usertype"
              required
            >
              <option value="">Select User Type</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <input
                type="text"
                className="form-control"
                value={userForm.address}
                id="address"
                onChange={handleFieldChange}
                name="address"
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="shopname" className="form-label">
              Shop Name
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faShopify} />
              </span>
              <input
                type="text"
                className="form-control"
                id="shopname"
                value={userForm.shopname}
                onChange={handleFieldChange}
                name="shopname"
                disabled={userForm.usertype === "customer"}
                required
              />
              {userForm.usertype === "vendor" &&
                userForm.shopname.trim() === "" && (
                  <span className="text-danger">
                    Shop name is required for vendor
                  </span>
                )}
            </div>
          </div>
        </div>
        <button
          className="btn btn-dark"
          type="submit"
          style={{ padding: "10px", width: "150px", marginLeft: "150px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
