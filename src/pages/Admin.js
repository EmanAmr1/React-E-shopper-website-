import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

function AdminPanel() {
    const [adminStatistics, setAdminStatistics] = useState({});
    const [orderStatistics, setOrderStatistics] = useState({});

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

    return (
        <>
            <h1>Admin Panel</h1>
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px' }}>
                <div style={{ marginLeft: '50px', marginTop: '10px' }}>
                    <Link
                        to="/UserManagement"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
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
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '5px',
                            margin:"10px"
                        }}
                    >
                        Product Management
                    </Link>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div style={{ width: '50%' }}>
                    <h2>Admin Statistics</h2>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        style={{ fontSize: '5px' }}
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
                        style={{ fontSize: '5px' }}
                    >
                        <VictoryAxis
                            tickValues={['Total Orders', 'Total Revenue', 'Average Order Value']}
                            tickFormat={['Total Orders', 'Total Revenue', 'Average Order Value']}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={x => `${x}`}
                        />
                        <VictoryBar
                            data={[
                                { x: 'Total Orders', y: orderStatistics.total_orders || 0 },
                                { x: 'Total Revenue', y: parseFloat(orderStatistics.total_revenue) || 0 },
                                { x: 'Average Order Value', y: parseFloat(orderStatistics.average_order_value) || 0 }
                            ]}
                        />
                    </VictoryChart>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;



