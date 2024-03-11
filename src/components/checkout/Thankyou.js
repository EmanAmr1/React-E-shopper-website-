import React from 'react';
import { Link } from 'react-router-dom';

function Thankyou() {
    return (
        <div>
            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                <span>Thank You</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            <div className="py-4">
                <div className="container">
                    <div className="col-md-12">
                        <div className="card text-center p-5">
                            <h4 className="text-success mb-4">Thanks for purchasing with our fashion store</h4>
                            <p className="lead">Your order has been successfully placed. We appreciate your business!</p>
                            <img
                                src="https://i.etsystatic.com/39068520/r/il/75b3f7/4487468309/il_fullxfull.4487468309_5tbx.jpg"  // Replace with your image URL
                                alt="Thank You"
                                className="img-fluid mt-4 mb-4 mx-auto"  // Added mx-auto to center the image
                                style={{ maxWidth: '50%', height: 'auto' }}
                            />
                            <p className="text-muted">
                                For any inquiries or issues, please contact our customer support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thankyou;