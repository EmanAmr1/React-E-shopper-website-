import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './login.css';
import hello from '../../imags/register/hello.jpg'

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFieldChange = (event) => {
    const field_name = event.target.name;
    const field_value = event.target.value;

    setLoginForm({
      ...loginForm,
      [field_name]: field_value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginForm);
    axios.post('http://localhost:8000/api/login/', loginForm)
      .then((res) => {
        console.log(res);
        const { token, user } = res.data;
        Cookies.set('jwt', token, { expires: 1 / 24, path: '/' }); // Store token at root path
        Cookies.set('user', JSON.stringify(user)); // Storing user data in a cookie

        // Redirect based on the user type
        if (user.usertype === 'customer') {
          navigate("/CustomerProfile", { state: { user, token } });
        } else if (user.usertype === 'vendor') {
          navigate("/VendorProfile", { state: { user, token } });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div className="container">
      <img src={hello} alt="Welcome" className="back" />
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
          <input type="email" className="form-control" id="exampleInputEmail1" onChange={handleFieldChange} name="email"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleFieldChange} name="password"/>
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
    <div >
  <p className='paragraph'>Don't Have an Account? </p>
  <Link to="/register" className="link">Register</Link>
</div>

    </>
  );
}

export default Login;
