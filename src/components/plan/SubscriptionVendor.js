import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionVendor = ({ vendorId }) => {
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [expired, setExpired] = useState(false); // State to track if subscription has expired

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
        const calculateRemainingTime = () => {
            if (subscriptionInfo && subscriptionInfo.date && subscriptionInfo.plan) {
                const subscriptionTime = new Date(subscriptionInfo.date).getTime();
                const currentTime = new Date().getTime();
                const planDurations = {
                    1: 30 * 24 * 60 * 60 * 1000,  // 1 month in milliseconds
                    2: 3 * 30 * 24 * 60 * 60 * 1000,  // 3 months in milliseconds
                    3: 6 * 30 * 24 * 60 * 60 * 1000,  // 6 months in milliseconds
                    4: 12 * 30 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
                };
                const elapsedTime = currentTime - subscriptionTime;

                // Check if the plan type is found in the planDurations object
                if (subscriptionInfo.plan in planDurations) {
                    const remaining = planDurations[subscriptionInfo.plan] - elapsedTime;
                    if (remaining > 0) {
                        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                        setRemainingTime(`${days} days, ${hours} hours, and ${minutes} minutes`);
                        setExpired(false); // Subscription not expired
                    } else {
                        setRemainingTime("Subscription expired");
                        setExpired(true); // Subscription expired
                    }
                } else {
                    console.error('Plan type not found:', subscriptionInfo.plan);
                }
            }
        };

        calculateRemainingTime(); 

        const interval = setInterval(() => {
            calculateRemainingTime();
        }, 1000);

        return () => clearInterval(interval);
    }, [subscriptionInfo]);

    return (
        <div>
        {subscriptionInfo && subscriptionInfo.date && subscriptionInfo.plan ? (
            <p>
                <span className='font-weight-bold'>Subscribe ends in </span>  
                <span className='font-weight-bold' style={{ color: expired ? 'red' : 'inherit' }}>{remainingTime}</span>
            </p>
        ) : (
            <p>
                <span className='font-weight-bold' style={{color:'#0a859b'}}>
No plan yet, but planning to subscribe</span>
            </p>
        )}
    </div>
    );
};

export default SubscriptionVendor;



