import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { clearAllListeners } from "@reduxjs/toolkit";

const Delivaryman = () => {
  const [orderslist, setOrderslist] = useState([]);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/API/orders/`, { headers })
      .then((res) => {
        console.log(res.data.orders);
        setOrderslist(res.data.orders);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = async (order) => {
    console.log("already delivered");
  };

  return (
    <div className="populer container p-4 mt-5 ">
      {orderslist.map((order) => {
        return (
          <div key={order.id} className="card text-center mb-5">
            <div className="card-header">code: {order.id}</div>
            <div className="card-body">
              <h5 className="card-title">{order.email}</h5>
              <h5 className="card-title">{order.total_price}</h5>
              <p className="card-text">{order.phone_number}</p>
              <p className="card-text">zip code: {order.zip_code}</p>
              <p className="card-text">
                {" "}
                <Link className="card-link" to={`/orderdetails/${order.id}`}>
                  more details
                </Link>
              </p>
            </div>
            <div className="card-footer text-muted">
              <button
                type="button"
                className="site-btn"
                style={{
                  backgroundColor: order.status === "D" && "gray",
                }}
                onClick={() => updateStatus(order)}
              >
                {order.status === "P"
                  ? "Pending"
                  : order.status === "S"
                  ? "Shipped"
                  : "Delivered"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Delivaryman;
