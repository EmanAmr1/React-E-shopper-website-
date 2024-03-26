import React, {useEffect, useState} from 'react';
import { axiosInstance } from "../../../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";



function Order() {
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
        setOrderslist(res.data.orders.filter((item) => item.status === "D"));
      })
      .catch((err) => console.log(err));
  }, []);
  
console.log(orderslist)
  return (
    <>
    <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Tables</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li class="breadcrumb-item active">Tables</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">
                                DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                                <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                                .
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Example
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>First_Name</th>
                                            <th>Last_Name</th>
                                            <th>email</th>
                                            <th>customer id</th>
                                            <th>Phone Number</th>
                                            <th>Salary</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Age</th>
                                            <th>Start date</th>
                                            <th>Salary</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    {orderslist.map((order) => {
                                      return(<>
                                        <tr>
                                            <td>{order.first_name}</td>
                                            <td>{order.last_name}</td>
                                            <td>{order.email}</td>
                                            <td> {order.id}</td>
                                            <td>{order.phone_number}</td>
                                            <td>$320,800</td>
                                        </tr>
                                      
                                      
                                      </>)})}
                                      
                                       
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
    </>
  )
}

export default Order
