import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const handleField = (event) => {
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
      // Extract token and user data from response
      const { token, user } = res.data;

      // Set token and user data as cookies
      Cookies.set('jwt', token, { expires: 1 / 24, path: '/CustomerProfile' });
      Cookies.set('user', JSON.stringify(user)); // Storing user data in a cookie

      // Navigate to CustomerProfile with user data
      navigate("/CustomerProfile", { state: { user,token } });
    })
    .catch((err) => console.log(err));
};
return (
    <>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" onChange={handleField} name="email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleField} name="password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
    </>
)
}

export default Login;