import React from 'react';
import thumb1 from '../imags/product/details/thumb-1.jpg';
import thumb2 from '../imags/product/details/thumb-1.jpg';
import thumb3 from '../imags/product/details/thumb-3.jpg';
import thumb4 from '../imags/product/details/thumb-4.jpg';
import pro1 from  '../imags/product/details/product-1.jpg';
import pro2 from  '../imags/product/details/product-2.jpg';
import pro3 from  '../imags/product/details/product-3.jpg';
import pro4 from  '../imags/product/details/product-4.jpg';




const ProductDetailes = () => {

    return (

<>

<div class="breadcrumb-option ">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                        <a href=" ">Women’s </a>
                        <span>Essential structured blazer</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

<section className="product-details spad">



        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="product__details__pic">
                        <div className="product__details__pic__left product__thumb nice-scroll">
                            <a className="pt active" href="#product-1">
                                <img src={thumb1} alt="" />
                            </a>
                            <a className="pt" href="#product-2">
                                <img src={thumb2} alt="" />
                            </a>
                            <a className="pt" href="#product-3">
                                <img src={thumb3} alt="" />
                            </a>
                            <a className="pt" href="#product-4">
                                <img src={thumb4} alt="" />
                            </a>
                        </div>
                        <div className="product__details__slider__content">
                            <div className="product__details__pic__slider owl-carousel">
                                <img data-hash="product-1" className="product__big__img" src={pro1} alt="" />
                                <img data-hash="product-2" className="product__big__img" src={pro2} alt="" />
                                <img data-hash="product-3" className="product__big__img" src={pro3} alt="" />
                                <img data-hash="product-4" className="product__big__img" src={pro4} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="product__details__text">
                        <h3>Essential structured blazer <span>Brand: SKMEIMore Men Watches from SKMEI</span></h3>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <span>( 138 reviews )</span>
                        </div>
                        <div className="product__details__price">$ 75.0 <span>$ 83.0</span></div>
                        <p>Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret fugit, sed quia consequuntur
                        magni lores eos qui ratione voluptatem sequi nesciunt.</p>
                        <div className="product__details__button">
                            <div className="quantity">
                                <span>Quantity:</span>
                                <div className="pro-qty">
                                    <input type="text" value="1" />
                                </div>
                            </div>
                            <a href=" " className="cart-btn"><span className="icon_bag_alt"></span> Add to cart</a>
                            <ul>
                                <li><a href=" "><span className="icon_heart_alt"></span></a></li>
                                <li><a href=" "><span className="icon_adjust-horiz"></span></a></li>
                            </ul>
                        </div>
                        <div className="product__details__widget">
                            <ul>
                                <li>
                                    <span>Availability:</span>
                                    <div className="stock__checkbox">
                                        <label htmlFor="stockin">
                                            In Stock
                                            <input type="checkbox" id="stockin" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Available color:</span>
                                    <div className="color__checkbox">
                                        <label htmlFor="red">
                                            <input type="radio" name="color__radio" id="red" checked />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="black">
                                            <input type="radio" name="color__radio" id="black" />
                                            <span className="checkmark black-bg"></span>
                                        </label>
                                        <label htmlFor="grey">
                                            <input type="radio" name="color__radio" id="grey" />
                                            <span className="checkmark grey-bg"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Available size:</span>
                                    <div className="size__btn">
                                        <label htmlFor="xs-btn" className="active">
                                            <input type="radio" id="xs-btn" />
                                            xs
                                        </label>
                                        <label htmlFor="s-btn">
                                            <input type="radio" id="s-btn" />
                                            s
                                        </label>
                                        <label htmlFor="m-btn">
                                            <input type="radio" id="m-btn" />
                                            m
                                        </label>
                                        <label htmlFor="l-btn">
                                            <input type="radio" id="l-btn" />
                                            l
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Promotions:</span>
                                    <p>Free shipping</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="product__details__tab">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Specification</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews ( 2 )</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <h6>Description</h6>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                                    Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                                    voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                                consequat massa quis enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem.</p>
                            </div>
                            <div className="tab-pane" id="tabs-2" role="tabpanel">
                                <h6>Specification</h6>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                                    Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                                    voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                                consequat massa quis enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem.</p>
                            </div>
                            <div className="tab-pane" id="tabs-3" role="tabpanel">
                                <h6>Reviews ( 2 )</h6>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                                    Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                                    voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                                consequat massa quis enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="related__title">
                        <h5>RELATED PRODUCTS</h5>
                    </div>
                </div>
                {/* Related Products */}
                {/* Your existing HTML for related products */}
                {/* ... */}
            </div>
        </div>
    </section>

</>
    )

}


export default ProductDetailes;