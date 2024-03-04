import React from 'react';
import thumb1 from '../imags/product/details/thumb-1.jpg';
import thumb2 from '../imags/product/details/thumb-1.jpg';
import thumb3 from '../imags/product/details/thumb-3.jpg';
import thumb4 from '../imags/product/details/thumb-4.jpg';
import rev from "../imags/rev.png"


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { axiosInstance } from "../apis/config";


const ProductDetails = () => {

    const [loading, setLoading] = useState(true);
    const [proDetails, setProDetails] = useState({})
    const [comment, setComment] = useState('');
    const [productId, setProductId] = useState('');
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState('');

    const params = useParams();
    console.log(params);

    const baseImageUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        axiosInstance
            .get(`/API/getProduct/${params.id}/`)
            .then((res) => {
                setProDetails(res.data.product);
                setProductId(res.data.product.id);
            }
            )
            .catch((err) => console.log(err));
    }, [params.id]);


    useEffect(() => {
        axiosInstance
            .get(`/API/Review/listReviwes/`)
            .then((res) => {


                const productReviewss = res.data.data.filter(review => review.product_id === proDetails.id);
                setReviews(productReviewss);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [proDetails.id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/API/Review/addReview/', {

                product_id: productId,
                comment: comment,
                user: userId

            });
            console.log(response.data);

            // Update reviews state with the new review
            setReviews([...reviews, { comment, date: new Date().toLocaleDateString() }]);

            // Reset form fields
            setComment('');

        } catch (error) {
            console.error('Error:', error.response.data);

        }
    };





    return (

        <>

            <div class="breadcrumb-option ">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb__links">
                                <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                                <a href=" ">Women’s </a>
                                <span>Essential structured blazer </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="product-details spad">



                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">

                            <div className="product__big__img__container">
                                <img className='mypic' src={`${baseImageUrl}${proDetails.image}`} alt="Product Image" />
                            </div>


                            <div class="product__details__pic">
                                <div class="thumbnail-container">
                                    <a class="pt active" href="#product-1">
                                        <img src={thumb1} alt="Thumbnail 1" />
                                    </a>
                                    <a class="pt" href="#product-2">
                                        <img src={thumb2} alt="Thumbnail 2" />
                                    </a>
                                    <a class="pt" href="#product-3">
                                        <img src={thumb3} alt="Thumbnail 3" />
                                    </a>
                                    <a class="pt" href="#product-4">
                                        <img src={thumb4} alt="Thumbnail 4" />
                                    </a>
                                </div>
                            </div>

                        </div>




                        <div className="col-lg-6">
                            <div className="product__details__text">
                                <h3>{proDetails.name}<span>Brand: {proDetails.brand}</span></h3>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <span>( 138 reviews )</span>
                                </div>
                                <div className="product__details__price">$ {proDetails.price} <span>$ 83.0</span>   </div>
                                <p>{proDetails.description}  <div>stock :{proDetails.stock} </div><div>Category: {proDetails.category}</div> <div>add_date: {proDetails.add_date}</div><div>update_date: {proDetails.update_date}</div></p>
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

                    </div>



                    <div className="row">
                        <div className="col-lg-11 mx-auto">
                            <h3 className="reviews__title">Reviews</h3>
                            {reviews.length > 0 ? (
                                <ul className="reviews__list">
                                    {reviews.map((review, index) => (
                                        <li key={index} className="review__item">
                                            <div className="review__header">
                                                <img className="review__avatar" src={rev} alt="User Avatar" />
                                                <div className="review__meta">
                                                    <span className="review__author">Eman Amr</span>
                                                    <span className="review__date">{review.date}</span>
                                                </div>
                                            </div>
                                            <div className="review__content">
                                                <p className="review__comment">{review.comment}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No reviews yet</p>
                            )}
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="add-review-form">
                                    <h3>Add your Review on this Product</h3>


                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="productId">Product ID:</label>
                                            <input type="text" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="comment">Comment:</label>
                                            <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                                        </div>
                                        <button type="submit">Add Review</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="related__title">

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )

}


export default ProductDetails;