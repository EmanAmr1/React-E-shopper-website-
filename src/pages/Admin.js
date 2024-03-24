import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

function AdminPanel() {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/api/admin/statistics/')
            .then(response => response.json())
            .then(data => setStatistics(data))
            .catch(error => console.error('Error fetching statistics:', error));
    }, []);

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
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '50%', marginRight: '10px' }}>
                    <VictoryChart
                        width={300} // Adjust width as needed
                        height={200} // Adjust height as needed
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        style={{ fontSize: '5px' }} // Adjust font size of axis labels
                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3]}
                            tickFormat={['Orders', 'Products', 'Users']}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={x => `${x}`}
                        />
                        <VictoryBar
                            data={[
                                { x: 1, y: statistics.orders_count },
                                { x: 2, y: statistics.products_count },
                                { x: 3, y: statistics.users_count }
                            ]}
                        />
                    </VictoryChart>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;

