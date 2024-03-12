import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from "react";
import UpdateProduct from'../../pages/UpdateProduct'
import DeleteProduct from'../../pages/DeleteProduct'

function VendorProfile() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const baseImageUrl = "http://127.0.0.1:8000";
  const handleLogout = () => {
    const token = Cookies.get('token'); 
    Cookies.remove('token');
    const headers = {
      Authorization: `Token ${token}`
    };
    axios.post('http://localhost:8000/api/logout/', null, { headers })
      .then(() => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  
/////////////////////////////////////////////////////////

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    first_name:'',
    last_name:'',
    address:'',
    phone:'',
    birthdate:''
});
  useEffect(() => {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Token ${token}`
    };
  
    axios.get('http://localhost:8000/api/profile/', { headers })
      .then((res) => {
        setUser(res.data.message);
        setUserId(res.data.message.id);
        setUpdatedUser(res.data.message); 
        
      })
      .catch((error) => {
        console.error("Fetch user error:", error);
        
      });
  }, []);
  
  useEffect(() => {
    
    axios
      .get(`http://127.0.0.1:8000/API/allproducts/`)
      .then((res) => {
       
        const filteredProducts = res.data.results.products.filter(product => product.vendor === userId);
        setProducts(filteredProducts);
      })
      .catch((err) => console.log(err));
  }, );




  return (
    <>
      <h1>Welcome {user ? user.first_name : ''}</h1>
      {user && (
        <div>
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