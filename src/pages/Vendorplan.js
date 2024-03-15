import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';
import { Card, Button } from 'react-bootstrap';

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
        <div className='container'>
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
                                    <Button variant="primary" className='my-3' type="submit" style={{ background: 'linear-gradient(to right, #0072ff, #00c6ff)', border: 'none' }}>
                                        Subscribe
                                    </Button>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vendorplan;
