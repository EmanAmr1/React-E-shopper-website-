import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

function AdminPanel() {
    const [adminStatistics, setAdminStatistics] = useState({});
    const [orderStatistics, setOrderStatistics] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminStatistics();
        fetchOrderStatistics();
    }, []);

    const fetchAdminStatistics = () => {
        fetch('http://localhost:8000/api/admin/statistics/')
            .then(response => response.json())
            .then(data => setAdminStatistics(data))
            .catch(error => console.error('Error fetching admin statistics:', error));
    };

    const fetchOrderStatistics = () => {
        fetch('http://localhost:8000/order-statistics/')
            .then(response => response.json())
            .then(data => setOrderStatistics(data))
            .catch(error => console.error('Error fetching order statistics:', error));
    };

    const handleLogout = () => {
        const token = Cookies.get("token");
        Cookies.remove("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        axios
          .post("http://localhost:8000/api/logout/", null, { headers })
          .then(() => {
            console.log("Logout successful");
            navigate("/");
          })
          .catch((error) => {
            console.error("Logout error:", error);
          });
    };

    return (
        <>
            <h2 style={{ backgroundColor: "#8FBC8F", color: "white" }}>Admin Panel
                <button onClick={handleLogout} style={{ backgroundColor: "#8FBC8F", padding: "2px", marginLeft: "1000px", fontSize: "15px" }}>Logout</button>
            </h2>

            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px' }}>
                <div style={{ marginLeft: '50px', marginTop: '10px' }}>
                    <Link
                        to="/UserManagement"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                        }}
                    >
                        User Management
                    </Link>
                    <Link
                        to="/ProductManagement"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                            margin: "10px"
                        }}
                    >
                        Product Management
                    </Link>
                    <Link
                        to="/PlanManagment"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                            margin: "10px"
                        }}
                    >
                        Plan Management
                    </Link>
                    <Link
                        to="/VendorPayment"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: '#fff',
                            borderRadius: '5px',
                            margin: "10px"
                        }}
                    >
                       payment History
                    </Link>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div style={{ width: '50%' }}>
                    <h2>Admin Statistics</h2>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={300}
                        height={200}
                    >
                        <VictoryAxis
                            tickValues={['Orders', 'Products', 'Users']}
                            tickFormat={['Orders', 'Products', 'Users']}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={x => `${x}`}
                        />
                        <VictoryBar
                            data={[
                                { x: 'Orders', y: adminStatistics.orders_count || 0 },
                                { x: 'Products', y: adminStatistics.products_count || 0 },
                                { x: 'Users', y: adminStatistics.users_count || 0 }
                            ]}
                        />
                    </VictoryChart>
                </div>
                <div style={{ width: '50%' }}>
                    <h2>Order Statistics</h2>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={300}
                        height={200}
                    >
                        <VictoryAxis
                            tickValues={['Total Orders', 'Total Revenue', 'Average Value']}
                            tickFormat={tick => (typeof tick === 'number' ? tick.toFixed(0) : tick)}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={tick => (typeof tick === 'number' ? tick.toFixed(0) : tick)}
                        />
                        <VictoryBar
                            data={[
                                { x: 'Total Orders', y: orderStatistics.total_orders || 0 },
                                { x: 'Total Revenue', y: parseFloat(orderStatistics.total_revenue) || 0 },
                                { x: 'Average Value', y: parseFloat(orderStatistics.average_order_value) || 0 }
                            ]}
                        />
                    </VictoryChart>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;
