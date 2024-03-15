
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';
import { Card, Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
const Vendorplan = () => {
    const [plans, setPlans] = useState([]);
    let { plan_id } = useParams();

    useEffect(() => {
        getPlans();
    }, []);
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };
    const getPlans = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/plans/`);
        let data = await response.json();
        setPlans(data);
    };
      ////////////////////
      const [userId, setUser] = useState(null);
      useEffect(() => {
        const token = Cookies.get('token');
        const headers = {
          Authorization: `Token ${token}`
        };
      
        axiosInstance.get('http://localhost:8000/api/profile/', { headers })
          .then((res) => {
            setUser(res.data.message.id);
            console.log("ssss",res.data.message.id);
      
          })
          .catch((error) => {
            console.error("Fetch user error:", error);
    
          });
      }, []);

    console.log("user Id",userId)
    const [subscribe, setsubscribe] = useState(false);
    useEffect(() => {
        // Fetch subscription info for the current vendor
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${userId}`)
            .then((res) => {
                const subscriptionInfo = res.data;
                // Check if subscription is expired
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
                    if (subscriptionInfo.plan in planDurations) {
                        console.log(subscriptionInfo.plan in planDurations)
                        const remaining = planDurations[subscriptionInfo.plan] - elapsedTime;
                        if (remaining > 0) {
                            setsubscribe(true); 
                        } else {
                            
                            setsubscribe(false); 
                        }
                    } else {
                        setsubscribe(false); 
                    }
                
                    
                }
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [userId]);

    return (
        <>
        
       
        <div className='container my-5 py-5'>
            <div className='row'>
                {plans.map(plan => (
                    <div key={plan.id} className='col-lg-3 col-md-6 my-2'>
                        <Card className='p-0'>
                            <Card.Body className='p-0'>
                                <Card.Title className='text-center py-4'
                                    style={{ background: 'linear-gradient(to right, #0072ff, #a239ca)', width: '100%', border: 'none', color: 'white' }}>
                                    {plan.name}
                                </Card.Title>
                                <Card.Text className='text-center'>
                                    {plan.description}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted text-center">$ {plan.price}</Card.Subtitle>
                                <form action={`${API_URL}/api/create-checkout-session/${plan.id}/`} className='text-center' method='POST'>
                                <Button 
                                        variant="primary" 
                                        className='my-3' 
                                        type="submit" 
                                        style={{ background: 'linear-gradient(to right, #0072ff, #00c6ff)', border: 'none' }}
                                        disabled={subscribe}>
                                        Subscribe
                                    </Button>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
       

        </>
        
    );
};

export default Vendorplan;
