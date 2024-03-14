import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";

const VendorProduct = () => {
    const dispatch = useDispatch();
    const userCookie = Cookies.get("token");
    console.log(userCookie);

    const userID = 2;
    const [loading, setLoading] = useState(true);
    const [proDetails, setProDetails] = useState({});

    const [productId, setProductId] = useState("");
    const [reviews, setReviews] = useState([]);

    const [selectedImage, setSelectedImage] = useState("");
    ;

    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
    };





    const params = useParams();
    console.log(params);

    const baseImageUrl = "http://127.0.0.1:8000";


    useEffect(() => {
        axiosInstance
            .get(`/API/getProduct/${params.id}/`, { headers })
            .then((res) => {
                setProDetails(res.data.product);
                setProductId(res.data.product.id);


            })
            .catch((err) => console.log(err));
    }, [params.id, userID]);



    useEffect(() => {
        // Set the selected image to the main image URL when component mounts
        setSelectedImage(proDetails.image);
    }, [proDetails]);



    useEffect(() => {
        axiosInstance
            .get(`/API/Review/listReviwes/`, { headers })
            .then((res) => {
                const productReviewss = res.data.data.filter(
                    (review) => review.product_id === proDetails.id
                );
                setReviews(productReviewss);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [proDetails.id]);












    return (
        <>


            <section className="product-details spad topheight">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="product__big__img__container myimg">
                                <img
                                    className="mypic"
                                    src={`${baseImageUrl}${selectedImage}`}
                                    alt="Product Image"
                                />
                            </div>

                            <div class="product__details__pic">
                                <div class="thumbnail-container">
                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageOne ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageOne)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageOne}`}
                                            alt="Thumbnail 1"
                                        />
                                    </Link>

                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageTwo ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageTwo)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageTwo}`}
                                            alt="Thumbnail 2"
                                        />
                                    </Link>

                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageThree ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageThree)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageThree}`}
                                            alt="Thumbnail 3"
                                        />
                                    </Link>
                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageFour ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageFour)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageFour}`}
                                            alt="Thumbnail 4"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="product__details__text">
                                <div className="label-container">
                                    <h3>{proDetails.name}</h3>

                                    {proDetails.new && <div className="label new">New</div>}
                                    {proDetails.sale && <div className="label sale">Sale</div>}
                                    {proDetails.stock === 0 && (
                                        <div className="label stockout">Out of Stock</div>
                                    )}
                                </div>

                                <span className="product__details__price">
                                    $ {proDetails.newprice} <span>$ {proDetails.price}</span>{" "}
                                </span>

                                <p>

                                    <span>( {reviews.length} Reviews)</span>
                                </p>

                                <hr></hr>

                                <div className="basic">{proDetails.description}</div>

                                <span>
                                    <span className="basic">Brand:</span> {proDetails.brand}
                                </span>

                                <p>
                                    <span className="basic">Category: </span>
                                    {proDetails.category}
                                </p>

                                <div className="product__details__widget">
                                    <ul>
                                        <li>
                                            <span>Availability:</span>
                                            <div className="stock__checkbox">
                                                <label htmlFor="stockin">
                                                    In Stock
                                                    <input
                                                        type="checkbox"
                                                        id="stockin"
                                                        checked={proDetails.stock > 1}
                                                        readOnly
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </li>




                                        {proDetails.sizeable ? (
                                            <>
                                                <p className="product__details__widget">
                                                    <ul>
                                                        <li>
                                                            <span>Available size:</span>
                                                            <div className="size__btn">
                                                                {proDetails.stock_S > 0 && (
                                                                    <label htmlFor="xs-btn">
                                                                        <input type="radio" id="xs-btn" />S
                                                                    </label>
                                                                )}
                                                                {proDetails.stock_M > 0 && (
                                                                    <label htmlFor="s-btn">
                                                                        <input type="radio" id="s-btn" />M
                                                                    </label>
                                                                )}
                                                                {proDetails.stock_L > 0 && (
                                                                    <label htmlFor="m-btn">
                                                                        <input type="radio" id="m-btn" />L
                                                                    </label>
                                                                )}
                                                                {proDetails.stock_XL > 0 && (
                                                                    <label htmlFor="l-btn">
                                                                        <input type="radio" id="l-btn" />
                                                                        XL
                                                                    </label>
                                                                )}
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </p>
                                            </>
                                        ) : null}
                                        <li>


                                        </li>
                                    </ul>

                                    <p>



                                        <button className="mx-2" style={{ backgroundColor: 'red', color: 'white' }} >
                                            <a style={{ color: 'white' }} href={`/deleteProduct/${proDetails.id}`}>
                                                delete Product
                                            </a>
                                        </button>

                                        <button style={{ backgroundColor: 'green' }} >
                                            <a style={{ color: 'white' }} href={`/updateProduct/${proDetails.id}`}>
                                                Edit Product
                                            </a>
                                        </button>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </section>
        </>
    );
};

export default VendorProduct;