import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionVendor = ({ vendorId }) => {
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    const [expired, setExpired] = useState(false); // State to track if subscription has expired
    const [subtractionResult, setSubtractionResult] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${vendorId}`)
            .then((res) => {
                setSubscriptionInfo(res.data); // Assuming the response includes plan information
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [vendorId]); 

    useEffect(() => {
        if (subscriptionInfo && subscriptionInfo.plan) {
            // Define the number of products for each plan
            const productLimits = {
                1: 500,
                2: 1200,
                3: 2500
            };

            // Check if the plan type is found in the productLimits object
            if (subscriptionInfo.plan in productLimits) {
                const remainingProducts = productLimits[subscriptionInfo.plan] - subscriptionInfo.stock;
                setSubtractionResult(remainingProducts);
                setExpired(false); // Subscription not expired
            } else {
                console.error('Plan type not found:', subscriptionInfo.plan);
            }
        }
    }, [subscriptionInfo]);

    return (
        <div>
           {subtractionResult !== null ? (
    <p>
        <span className='font-weight-bold'>Remaining products from subscription: </span>
        {subtractionResult !== 0 ? (
            <span className='font-weight-bold' style={{ color: expired ? 'red' : 'inherit' }}>{subtractionResult}</span>
        ) : (
            <span style={{ color: 'red' }}> Subscription Expired</span>
        )}
    </p>
) : (
    <p>
        <span className='font-weight-bold' style={{color:'#0a859b'}}>No plan yet, but planning to subscribe</span>
    </p>
)}

        </div>
    );
};

export default SubscriptionVendor;
