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
                    <div className="container px-4 mt-3">
                        {/* <h1 className="mt-4">Orders</h1> */}
                        {/* <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li className="breadcrumb-item active">Tables</li>
                        </ol> */}
                        {/* <div className="card mb-4">
                            <div className="card-body">
                                DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                                <Link target="_blank" to="https://datatables.net/">official DataTables documentation</Link>
                                .
                            </div>
                        </div> */}
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
                                            <th>id</th>
                                            <th>First_Name</th>
                                            <th>Last_Name</th>
                                            <th>email</th>
                                            <th>Phone Number</th>
                                            <th>Country</th>
                                            <th>Cit</th>
                                            <th>Street</th>
                                            <th>zip_code</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                        <th>id</th>
                                            <th>First_Name</th>
                                            <th>Last_Name</th>
                                            <th>email</th>
                                            <th>Phone Number</th>
                                            <th>Country</th>
                                            <th>Cit</th>
                                            <th>Street</th>
                                            <th>zip_code</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    {orderslist.map((order) => {
                                      return(<>
                                        <tr>
                                            <td> {order.id}</td>
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
                                            
                                        </tr>
                                      
                                      
                                      </>)})}
                                      
                                       
                                        
                                    </tbody>
                                </table>
                              </div>
                            </div>
                        </div>
                    </div>
                </main>
    </>
  )
}

export default Order
