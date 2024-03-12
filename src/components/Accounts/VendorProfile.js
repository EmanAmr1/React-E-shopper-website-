import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from "react";
import UpdateProduct from'../../pages/UpdateProduct'
import DeleteProduct from'../../pages/DeleteProduct'

function VendorProfile() {
  const location = useLocation();
  const { user, token } = location.state || {};
  const navigate = useNavigate();
  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 60 * 60 * 1000);

  const [products, setProducts] = useState([]);
  const baseImageUrl = "http://127.0.0.1:8000";
  Cookies.set('token', token, { expires: oneHourFromNow, secure: true });
  const handleLogout = () => {
    // Clear JWT token and user data cookies
    Cookies.remove('jwt');
    Cookies.remove('user');
    Cookies.remove('token');

    // Call the logout API
    axios.post('http://localhost:8000/api/logout/')
      .then((res) => {
        console.log("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });


      
  };


  useEffect(() => {
    
    axios
      .get(`http://127.0.0.1:8000/API/allproducts/`)
      .then((res) => {
        setProducts(res.data.results.products);
      })
      .catch((err) => console.log(err));
  }, );




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




      <div className="row mt-5">
        {products.map((prod) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mix women"
            key={prod.id}
          >
            <div className="product__item">
              <div
                className="product__item__pic set-bg"
                style={{
                  backgroundImage: `url('${baseImageUrl}${prod.image}')`,
                }}
              >
                {prod.new ? (
                  <div className="label new">New</div>
                ) : prod.sale ? (
                  <div className="label sale">Sale</div>
                ) : prod.stock === 0 ? (
                  <div className="label stockout">out of stock</div>
                ) : null}
                <ul className="product__hover">
                  <li>
                    <a href={prod.image} className="image-popup">
                      <a href={`/productDetails/${prod.id}`}>
                        {" "}
                        <span className="arrow_expand"></span>
                      </a>
                    </a>
                  </li>


                </ul>
              </div>
              <div className="product__item__text">
                <h6>
                  <a href="h">{prod.name}</a>
                </h6>

                {prod.sale ? (
                  <div
                    className="product__price  "
                    style={{ color: "#ca1515" }}
                  >
                    {prod.newprice} <span>{prod.price}</span>
                  </div>
                ) : (
                  <div className="product__price">{prod.price}</div>
                )}
<a href={`/vendorpro/${prod.id}`}>
                      {" "}
                      <span className="arrow_expand"></span>
                    </a>


              </div>
            </div>
          </div>
        ))}
      </div>





    </>
  );
}


export default VendorProfile;