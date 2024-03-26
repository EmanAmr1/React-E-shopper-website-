import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { clearAllListeners } from "@reduxjs/toolkit";

const Shipped = () => {
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
        setOrderslist(res.data.orders.filter((item) => item.status === "S"));
      })
      .catch((err) => console.log(err));
  }, []);

  // const updateStatus = async (order) => {
  //   if (order.status !== "D") {
  //     try {
  //       const response = await axiosInstance.put(
  //         `/api/delivaryman/update/${order.id}`,
  //         null,
  //         { headers }
  //       );

  //       const updatedItemIndex = orderslist.findIndex(
  //         (item) => item.id === order.id
  //       );
  //       const updatedItem = { ...orderslist[updatedItemIndex] };
  //       // if (updatedItem.status === "P") {
  //       // updatedItem.status = "S";
  //       // } else if (updatedItem.status === "S") {
  //       updatedItem.status = "D";
  //       // }
  //       const updatedItems = [...orderslist];
  //       updatedItems[updatedItemIndex] = updatedItem;
  //       setOrderslist(updatedItems.filter((item) => item.id !== order.id));
  //     } catch (error) {
  //       console.error("Error:", error.response);
  //     }
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  // };
  const orderFailed = async (order) => {
    if (order.status === "S") {
      try {
        const response = await axiosInstance.put(
          `/api/delivaryman/failed/${order.id}`,
          null,
          { headers }
        );

        setOrderslist(orderslist.filter((item) => item.id !== order.id));
      } catch (error) {
        console.error("Error:", error.response);
      }
      console.log("yes");
    } else {
      console.log("no");
    }
  };

  const orderDelivered = async (order) => {
    if (order.status === "S") {
      try {
        const response = await axiosInstance.put(
          `/api/delivaryman/delivered/${order.id}`,
          null,
          { headers }
        );

        setOrderslist(orderslist.filter((item) => item.id !== order.id));
      } catch (error) {
        console.error("Error:", error.response);
      }
      console.log("yes");
    } else {
      console.log("no");
    }
  };
  return (
    <div className="populer container p-4 mt-5 ">
      <h1 className="mb-3">Pending</h1>
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
                  backgroundColor:
                    order.status === "D" || order.status === "F"
                      ? "gray"
                      : null,
                }}
                onClick={() => orderDelivered(order)}
              >
                Delivered
              </button>
              <button
                type="button"
                className="site-btn ms-2"
                style={{
                  backgroundColor:
                    order.status === "D" || order.status === "F"
                      ? "gray"
                      : null,
                }}
                onClick={() => orderFailed(order)}
              >
                Failed
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shipped;
