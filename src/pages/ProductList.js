import React from 'react';
import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ProductList = () => {

    const [activeAccordion, setActiveAccordion] = useState(null);
    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/API/allproducts/")
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(products[2]);

    return (

        <section className="shop spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <div className="shop__sidebar">
                            <div className="sidebar__categories">
                                <div className="section-title">
                                    <h4>Categories</h4>
                                </div>
                                <div className="categories__accordion">
                                    <div className="accordion" id="accordionExample">
                                        {['Women', 'Men', 'Kids', 'Accessories', 'Cosmetic'].map((category, index) => (
                                            <div className="card" key={index}>
                                                <div className={`card-heading ${activeAccordion === index ? 'active' : ''}`}>
                                                    <a onClick={() => toggleAccordion(index)}>{category}</a>
                                                </div>
                                                <div className={`collapse ${activeAccordion === index ? 'show' : ''}`} id={`collapse${index + 1}`}>
                                                    <div className="card-body">
                                                        <ul>
                                                            <li><a href="#">Coats</a></li>
                                                            <li><a href="#">Jackets</a></li>
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Shirts</a></li>
                                                            <li><a href="#">T-shirts</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar__filter">
                                <div className="section-title">
                                    <h4>Shop by price</h4>
                                </div>
                                <div className="filter-range-wrap">
                                    <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                        data-min="33" data-max="99"></div>
                                    <div className="range-slider">
                                        <div className="price-input">
                                            <p>Price:</p>
                                            <input type="text" id="minamount" />
                                            <input type="text" id="maxamount" />
                                        </div>
                                    </div>
                                </div>
                                <a href="#">Filter</a>
                            </div>
                            <div className="sidebar__sizes">
                                <div className="section-title">
                                    <h4>Shop by size</h4>
                                </div>
                                <div className="size__list">
                                    <label for="xxs">
                                        xxs
                                        <input type="checkbox" id="xxs" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="xs">
                                        xs
                                        <input type="checkbox" id="xs" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="xss">
                                        xs-s
                                        <input type="checkbox" id="xss" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="s">
                                        s
                                        <input type="checkbox" id="s" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="m">
                                        m
                                        <input type="checkbox" id="m" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="ml">
                                        m-l
                                        <input type="checkbox" id="ml" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="l">
                                        l
                                        <input type="checkbox" id="l" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label for="xl">
                                        xl
                                        <input type="checkbox" id="xl" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-9 col-md-9">
                        <div className="row">
                            {products.map((product, id) => (
                                <div className="col-lg-4 col-md-6">

                                    <div className="product__item" >
                                        <div className="product__item__pic set-bg">
                                            <img  src={`http://127.0.0.1:8000${product.image}`}/>

                                            <div className="label new">New</div>
                                            <ul className="product__hover">
                                                <li><a href="#" className="image-popup"><FontAwesomeIcon icon={faHeart} /></a></li>
                                               

                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">{product.name}</a></h6>
                                            <div className="rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="product__price">$ 59.0</div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}


export default ProductList;