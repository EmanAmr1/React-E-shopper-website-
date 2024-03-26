import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Order() {
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/API/orders/`, { headers })
      .then((res) => {
        setOrdersList(res.data.orders);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewOrderItems = (orderItems) => {
    setSelectedOrderItems(orderItems);
  };

  return (
    <main>
      <div className="container px-4 mt-3">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Orders
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table id="datatablesSimple" className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Zip Code</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.first_name}</td>
                      <td>{order.last_name}</td>
                      <td>{order.email}</td>
                      <td>{order.phone_number}</td>
                      <td>{order.country}</td>
                      <td>{order.city}</td>
                      <td>{order.street}</td>
                      <td>{order.zip_code}</td>
                      <td>{order.placed_at}</td>
                      <td>{order.status}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewOrderItems(order.orderItems)}
                        >
                          details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 mt-3">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Order Items
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>Product_id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Order;