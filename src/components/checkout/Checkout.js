import React from 'react'
import ReactDOM from 'react-dom';
import { useState } from 'react'
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../apis/config";
import { event } from 'jquery';
const Checkout = () => {
    const navigate = useNavigate();
    /*if(!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning","Login to goto Cart Page","error");
    }*/
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [checoutInput,setCheckoutInput]=useState({
        first_name:'',
        last_name: '',
        country: '',
        city: '',
        zip_code: '',
        state: '',
        street: '',
        phone_number:'',
        email: '',
    });
    const handleInput = (event) => {

        const { name, value } = event.target;
        
    
        setCheckoutInput({
            ...checoutInput,
            [name]: value
        });
        
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
          }
        const data = {
            first_name:checoutInput.first_name,
            last_name:checoutInput.last_name,
            country:checoutInput.country,
            city:checoutInput.city,
            zip_code:checoutInput.zip,
            state:checoutInput.state,
            street:checoutInput.street,
            phone_number:checoutInput.phone_number,
            email:checoutInput.email

        }
        axiosInstance.post('/API/orders/new/',data).then(res=>{
            if(res.data.status===200)
            {
                swal("Order Placed Successfully",res.data.message,"success");
                setError([]);

                //navigate('/thannk-you');
            }
            else if(res.data.status===422)
            {
                swal.apply("All fields are mondetory","","error")
                setError(res.data.errors);
            }
        });
    };
    
    const validateForm = () => {
        let isValid = true;
        const errors = {};
    
        // Basic validation, you can enhance this based on your requirements
        for (const key in checoutInput) {
          if (!checoutInput[key]) {
            errors[key] = 'This field is required';
            isValid = false;
          }
        }
    
        setError(errors);
        return isValid;
      };

  return (
    <>
      
      {/* Breadcrumb Begin */}
    <div className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                        <Link to="/"><i className="fa fa-home"></i> Home</Link>
                        <span>Shopping cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Breadcrumb End */}

   {/*Checkout Section Begin */}
    <section className="checkout spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h6 className="coupon__link"><span className="icon_tag_alt"></span> <Link to="h">Have a coupon?</Link> Click
                    here to enter your code.</h6>
                </div>
            </div>
            <form onSubmit={handleSubmit}  className="checkout__form">
                <div className="row">
                    <div className="col-lg-8">
                        <h5>Billing detail</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>First Name <span>*</span></p>
                                    <input type="text" name='first_name' onChange={handleInput} value={checoutInput.first_name}/>
                                    <small className='text-danger'>{error.first_name}</small>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>Last Name <span>*</span></p>
                                    <input type="text" name='last_name' onChange={handleInput}  value={checoutInput.last_name}/>
                                    <small className='text-danger'>{error.last_name}</small>

                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="checkout__form__input">
                                    <p>Country <span>*</span></p>
                                    <input type="text" name='country' onChange={handleInput} value={checoutInput.country}/>
                                    <small className='text-danger'>{error.country}</small>

                                </div>
                                <div className="checkout__form__input">
                                    <p>Address <span>*</span></p>
                                    <input type="text" placeholder="Street Address" name='street' onChange={handleInput} value={checoutInput.street}/>
                                    <small className='text-danger'>{error.street}</small>

                                    <input type="text" placeholder="Apartment. suite, unite ect ( optinal )" />
                                </div>
                                <div className="checkout__form__input">
                                    <p>Town/City <span>*</span></p>
                                    <input type="text" name='city' onChange={handleInput}  value={checoutInput.city}/>
                                    <small className='text-danger'>{error.city}</small>
                                    
                                </div>
                                <div className="checkout__form__input">
                                    <p>Country/State <span>*</span></p>
                                    <input type="text" name='state' onChange={handleInput} value={checoutInput.state}/>
                                    <small className='text-danger'>{error.state}</small>

                                </div>
                                <div className="checkout__form__input">
                                    <p>Postcode/Zip <span>*</span></p>
                                    <input type="text" name='zip_code' onChange={handleInput} value={checoutInput.zip_code}/>
                                    <small className='text-danger'>{error.zip_code}</small>

                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>Phone <span>*</span></p>
                                    <input type="text" name='phone_number' onChange={handleInput} value={checoutInput.phone_number}/>
                                    <small className='text-danger'>{error.phone_number}</small>

                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>Email <span>*</span></p>
                                    <input type="text" name='email' onChange={handleInput} value={checoutInput.email}/>
                                    <small className='text-danger'>{error.email}</small>

                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="checkout__form__checkbox">
                                    <label for="acc">
                                        Create an acount?
                                        <input type="checkbox" id="acc"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <p>Create am acount by entering the information below. If you are a returing
                                        customer login at the <br />top of the page</p>
                                    </div>
                                    <div className="checkout__form__input">
                                        <p>Account Password <span>*</span></p>
                                        <input type="text"/>
                                    </div>
                                    <div className="checkout__form__checkbox">
                                        <label for="note">
                                            Note about your checoutInput, e.g, special noe for delivery
                                            <input type="checkbox" id="note"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="checkout__form__input">
                                        <p>Oder notes <span>*</span></p>
                                        <input type="text"
                                        placeholder="Note about your checoutInput, e.g, special noe for delivery"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="checkout__order">
                                <h5>Your checoutInput</h5>
                                <div className="checkout__order__product">
                                    <ul>
                                        <li>
                                            <span className="top__text">Product</span>
                                            <span className="top__text__right">Total</span>
                                        </li>
                                        <li>01. Chain buck bag <span>$ 300.0</span></li>
                                        <li>02. Zip-pockets pebbled<br /> tote briefcase <span>$ 170.0</span></li>
                                        <li>03. Black jean <span>$ 170.0</span></li>
                                        <li>04. Cotton shirt <span>$ 110.0</span></li>
                                    </ul>
                                </div>
                                <div className="checkout__order__total">
                                    <ul>
                                        <li>Subtotal <span>$ 750.0</span></li>
                                        <li>Total <span>$ 750.0</span></li>
                                    </ul>
                                </div>
                                <div className="checkout__order__widget">
                                    <label for="o-acc">
                                        Create an acount?
                                        <input type="checkbox" id="o-acc"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <p>Create am acount by entering the information below. If you are a returing customer
                                    login at the top of the page.</p>
                                    <label for="check-payment">
                                        Cheque payment
                                        <input type="checkbox" id="check-payment"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="paypal">
                                        PayPal
                                        <input type="checkbox" id="paypal"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <button type="submit" className="site-btn">Place oder</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        {/*Checkout Section End */}
    </>
  )
}

export default Checkout
