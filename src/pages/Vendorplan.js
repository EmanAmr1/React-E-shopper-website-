
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';


const Vendorplan = () => {
    const [plans, setPlans] = useState([]);
    let { plan_id } = useParams();

    useEffect(() => {
        getPlans();
    }, []);

    const getPlans = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/plans/`);
        let data = await response.json();
        setPlans(data);
    };

    return (
        <div className='container  '>
            {plans.map(plan => (
                <div key={plan.id} className='plan'>
                    <div>
                        <h2 >{plan.name}</h2>
                        <h4>{plan.description}</h4>
                        <p>$ {plan.price}</p>
                    </div>
                    <form action={`${API_URL}/api/create-checkout-session/${plan.id}/`} method='POST'>
                        <button type="submit" className='btn'>
                            Checkout
                        </button>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default Vendorplan;

