import React from "react";
import rev from "../imags/rev.png";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounterByAmount } from "../store/slices/total";
import { addItem, removeItem, setItems } from "../store/slices/wishlist";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { fetchWishList, setTotalCount } from "../store/slices/wishlist";
import StarRating from "./StarRating";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const userCookie = Cookies.get("token");
  console.log(userCookie);
  // const userID = userCookie ? JSON.parse(userCookie).id : null;
  const userID = 2;
  const [loading, setLoading] = useState(true);
  const [proDetails, setProDetails] = useState({});
  const [comment, setComment] = useState("");
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlistid, setWishlistid] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [relatedProducts, setRelatedProducts] = useState([]);

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  // axios.put('http://localhost:8000/api/profile/', updatedUser, { headers })
  //   .then((res) => {
  //     console.log("Update successful");
  //     setDefaultUser(updatedUser);
  //     setLoading(false);

  useEffect(() => {
    // Fetch related products based on the current product's category
    axiosInstance
      .get(`/API/allproducts/?category=${proDetails.category}`)
      .then((res) => {
        setRelatedProducts(res.data.results.products);
      })
      .catch((err) => console.log(err));
  }, [proDetails.category]);

  const increase = () => {
    setQuantity((count) => count + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((count) => count - 1);
    }
  };

  const params = useParams();
  console.log(params);

  const baseImageUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    axiosInstance
      .get(`/API/getProduct/${params.id}/`)
      .then((res) => {
        setProDetails(res.data.product);
        setProductId(res.data.product.id);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  useEffect(() => {
    // Set the selected image to the main image URL when component mounts
    setSelectedImage(proDetails.image);
  }, [proDetails]);

  useEffect(() => {
    axiosInstance
      .get(`/api/wishlist/list/`, { headers })
      .then((res) => {
        console.log(res.data);
        setWishlistid(res.data.wishlist_items.map((item) => item.item));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/API/Review/listReviwes/`)
      .then((res) => {
        const productReviewss = res.data.data.filter(
          (review) => review.product_id === proDetails.id
        );
        setReviews(productReviewss);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [proDetails.id]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/api/cart/add/`,
        {
          item: productId,
          quantity: quantity,
        },
        { headers }
      );
      dispatch(increaseCounterByAmount(response.data.quantity));
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleAddWish = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/api/wishlist/add/`,
        {
          item: productId,
        },
        { headers }
      );

      if (response.data.msg === "Item removed from wishlist") {
        dispatch(removeItem());
        setWishlistid(wishlistid.filter((itemid) => itemid !== productId));
      } else if (response.data.msg === "Item added to wishlist") {
        dispatch(addItem());
        setWishlistid(wishlistid.concat(productId));
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/API/Review/addReview/", {
        product_id: productId,
        comment: comment,
        user: userId,
      });
      console.log(response.data);

      // Update reviews state with the new review
      setReviews([
        ...reviews,
        { comment, date: new Date().toLocaleDateString() },
      ]);

      // Reset form fields
      setComment("");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <div class="breadcrumb-option ">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__links">
                <a href="./index.html">
                  <i class="fa fa-home"></i> Home
                </a>
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
              <div className="product__big__img__container myimg">
                <img
                  className="mypic"
                  src={`${baseImageUrl}${selectedImage}`}
                  alt="Product Image"
                />
              </div>

              <div class="product__details__pic">
                <div class="thumbnail-container">
                  <a
                    className={`pt ${
                      selectedImage === proDetails.subImageOne ? "active" : ""
                    }`}
                    href="#product-1"
                    onClick={() => setSelectedImage(proDetails.subImageOne)}
                  >
                    <img
                      src={`${baseImageUrl}${proDetails.subImageOne}`}
                      alt="Thumbnail 1"
                    />
                  </a>
                  <a
                    className={`pt ${
                      selectedImage === proDetails.subImageTwo ? "active" : ""
                    }`}
                    href="#product-2"
                    onClick={() => setSelectedImage(proDetails.subImageTwo)}
                  >
                    <img
                      src={`${baseImageUrl}${proDetails.subImageTwo}`}
                      alt="Thumbnail 2"
                    />
                  </a>
                  <a
                    className={`pt ${
                      selectedImage === proDetails.subImageThree ? "active" : ""
                    }`}
                    href="#product-3"
                    onClick={() => setSelectedImage(proDetails.subImageThree)}
                  >
                    <img
                      src={`${baseImageUrl}${proDetails.subImageThree}`}
                      alt="Thumbnail 3"
                    />
                  </a>
                  <a
                    className={`pt ${
                      selectedImage === proDetails.subImageFour ? "active" : ""
                    }`}
                    href="#product-4"
                    onClick={() => setSelectedImage(proDetails.subImageFour)}
                  >
                    <img
                      src={`${baseImageUrl}${proDetails.subImageFour}`}
                      alt="Thumbnail 4"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="product__details__text">
                <div className="label-container">
                  <h3>{proDetails.name}</h3>

                  {proDetails.new && <div className="label new">New</div>}
                  {proDetails.sale && <div className="label sale">Sale</div>}
                  {proDetails.stock === 0 && (
                    <div className="label stockout">Out of Stock</div>
                  )}
                </div>

                <hr></hr>
                <span className="product__details__price">
                  $ {proDetails.newprice} <span>$ {proDetails.price}</span>{" "}
                </span>

                <p>
                  <StarRating rating={proDetails.ratings} />
                  <span>( {reviews.length} Reviews)</span>
                </p>
                <hr></hr>
                <p>
                  <div className="basic">{proDetails.description}</div>

                  <span>
                    {" "}
                    <span className="basic">Brand:</span> {proDetails.brand}
                  </span>

                  <div>
                    <span className="basic">Category: </span>{" "}
                    {proDetails.category}
                  </div>
                </p>

                <div className="product__details__button">
                  <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qt">
                      <div class="category ps-4">
                        <span class="counter-btn minus" onClick={decrease}>
                          -
                        </span>
                        <span id="counter" class="counter-value">
                          {quantity}
                        </span>
                        <span class="counter-btn plus" onClick={increase}>
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                  <a href=" " className="cart-btn" onClick={handleAdd}>
                    <span className="icon_bag_alt"></span> Add to cart
                  </a>
                  <ul>
                    <li>
                      <a
                        href=" "
                        style={{
                          backgroundColor:
                            wishlistid.includes(productId) && "#ca1515",
                          // color: wishlistid.includes(productId) && "#ffffff",
                        }}
                        onClick={handleAddWish}
                      >
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href=" ">
                        <span className="icon_adjust-horiz"></span>
                      </a>
                    </li>
                  </ul>
                </div>
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
                    <li>
                      <span>Available color:</span>
                      <div className="color__checkbox">
                        <label htmlFor="red">
                          <input
                            type="radio"
                            name="color__radio"
                            id="red"
                            checked
                          />
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
                        <img
                          className="review__avatar"
                          src={rev}
                          alt="User Avatar"
                        />
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
                <div className="add-review-form p-4 border rounded">
                  <h3 className="mb-3">Add your Review</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <textarea
                        id="comment"
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <button type="submit">Add Review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 text-center">
              <div
                className="related__title mt-5"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#dc3545",
                }}
              >
                RELATED PRODUCTS
              </div>
              <div className="row justify-content-center align-items-stretch mt-5">
                {relatedProducts.map((product) => (
                  <div className="col-lg-3" key={product.id}>
                    <div className="product__item d-flex flex-column h-100">
                      <div
                        className="product__item__pic"
                        style={{ height: "200px" }}
                      >
                        <img
                          src={`${baseImageUrl}${product.image}`}
                          alt={product.name}
                          style={{ height: "100%", width: "auto" }}
                        />
                      </div>
                      <div className="product__item__text flex-grow-1 d-flex flex-column justify-content-between">
                        <h6>{product.name}</h6>
                        <p>
                          <StarRating rating={product.ratings} />
                          <span></span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
