import React from 'react'

const Checkout = () => {
  return (
    <>
      
      {/* Breadcrumb Begin */}
    <div className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                        <a href="./index.html"><i className="fa fa-home"></i> Home</a>
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
                    <h6 className="coupon__link"><span className="icon_tag_alt"></span> <a href="#">Have a coupon?</a> Click
                    here to enter your code.</h6>
                </div>
            </div>
            <form action="#" className="checkout__form">
                <div className="row">
                    <div className="col-lg-8">
                        <h5>Billing detail</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>First Name <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>Last Name <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="checkout__form__input">
                                    <p>Country <span>*</span></p>
                                    <input type="text"/>
                                </div>
                                <div className="checkout__form__input">
                                    <p>Address <span>*</span></p>
                                    <input type="text" placeholder="Street Address"/>
                                    <input type="text" placeholder="Apartment. suite, unite ect ( optinal )"/>
                                </div>
                                <div className="checkout__form__input">
                                    <p>Town/City <span>*</span></p>
                                    <input type="text"/>
                                </div>
                                <div className="checkout__form__input">
                                    <p>Country/State <span>*</span></p>
                                    <input type="text"/>
                                </div>
                                <div className="checkout__form__input">
                                    <p>Postcode/Zip <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>Phone <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="checkout__form__input">
                                    <p>Email <span>*</span></p>
                                    <input type="text"/>
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
                                            Note about your order, e.g, special noe for delivery
                                            <input type="checkbox" id="note"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="checkout__form__input">
                                        <p>Oder notes <span>*</span></p>
                                        <input type="text"
                                        placeholder="Note about your order, e.g, special noe for delivery"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="checkout__order">
                                <h5>Your order</h5>
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
