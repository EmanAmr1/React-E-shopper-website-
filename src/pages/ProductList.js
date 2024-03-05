import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../apis/config";

const ProductList = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };
    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [minPrice, maxPrice, currentPage]);

    const fetchProducts = () => {
        axiosInstance
            .get(`/API/allproducts/?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}`)
            .then((res) => {
                setProducts(res.data.results.products);
                const totalPages = Math.ceil(res.data.count / 12); // Calculate total pages
                setTotalPages(totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        if (name === "minPrice") {
            setMinPrice(value);
        } else if (name === "maxPrice") {
            setMaxPrice(value);
        }
    };
     const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                                    <input type="range" className="custom-range" min="0" max="100" step="1" value={minPrice} onChange={handlePriceChange} name="minPrice" />
                                    <input type="range" className="custom-range" min="0" max="100" step="1" value={maxPrice} onChange={handlePriceChange} name="maxPrice" />
                                    <div className="range-slider">
                                        <div className="price-input">
                                            <p>Price:</p>
                                            <input type="text" id="minamount" value={minPrice} onChange={handlePriceChange} name="minPrice" />
                                            <input type="text" id="maxamount" value={maxPrice} onChange={handlePriceChange} name="maxPrice" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar__sizes">
                                <div className="section-title">
                                    <h4>Shop by size</h4>
                                </div>
                                <div className="size__list">
                                    {/* Your size options go here */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-9">
                        <div className="row">
                            {products.map((prod) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 mix women" key={prod.id}>
                                    <div className="product__item">
                                        <div className="product__item__pic set-bg" style={{ backgroundImage: `url('http://127.0.0.1:8000${prod.image}')` }}>
                                            {prod.new ? (<div className="label new">New</div>) : prod.sale ? (<div className="label sale">Sale</div>) : prod.stock === 0 ? (<div className="label stockout">out of stock</div>) : null}
                                            <ul className="product__hover">
                                                <li><a href={prod.image} className="image-popup"><span className="arrow_expand"></span></a></li>
                                                <li><a href="h"><span className="icon_heart_alt"></span></a></li>
                                                <li><a href="h"><span className="icon_bag_alt"></span></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="h">{prod.name}</a></h6>
                                            <div className="rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            {prod.sale ? (<div className="product__price  " style={{ color: '#ca1515' }}>{prod.newprice} <span>{prod.price}</span></div>) : (<div className="product__price">{prod.price}</div>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div class="col-lg-12 text-center mt-3">
                            <div class="pagination__option">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                               <a href="#" key={page} onClick={() => handlePageChange(page)} className={`pagination-link ${currentPage === page ? 'activee' : ''}`}>
                               {page}
                           </a>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductList;
