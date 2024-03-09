import React from "react";

import { useState, useEffect } from "react";

import { axiosInstance } from "../../apis/config";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, setItemsid } from "../../store/slices/total";
import { addItem, removeItem, setItems } from "../../store/slices/wishlist";

const Products = () => {
  const dispatch = useDispatch();
  const itemsid = useSelector((state) => state.total.itemsid);
  const userCookie = Cookies.get("user");
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const [product, setProduct] = useState([]);
  const [wishlistid, setWishlistid] = useState([]);
  //   const [checkCart, setCheckCart] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/API/allproducts/")
      .then((res) => setProduct(res.data.results.products))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axiosInstance
      .get(`/api/wishlist/list/${userID}`)
      .then((res) => {
        console.log(res.data);
        // console.log(userID);
        setWishlistid(res.data.wishlist_items.map((item) => item.item));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddWish = async (itemId) => {
    try {
      const response = await axiosInstance.post(`/api/wishlist/add/`, {
        item: itemId,
        user: userID,
      });

      if (response.data.msg === "Item removed from wishlist") {
        dispatch(removeItem());
        console.log(wishlistid);
        setWishlistid(wishlistid.filter((itemid) => itemid !== itemId));
      } else if (response.data.msg === "Item added to wishlist") {
        dispatch(addItem());
        console.log(wishlistid);
        setWishlistid(wishlistid.concat(itemId));
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleAdd = async (itemId) => {
    // e.preventDefault();
    if (!itemsid.includes(itemId)) {
      try {
        const response = await axiosInstance.post(`/api/cart/add/`, {
          item: itemId,
          user: userID,
          quantity: 1,
        });
        console.log(response.data);
        dispatch(increaseCounter());
        const updatedItemsId = itemsid.concat(itemId);
        dispatch(setItemsid(updatedItemsId));
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    }
  };

  return (
    <>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="section-title">
                <h4>New product</h4>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <ul className="filter__controls">
                <li className="active" data-filter="*">
                  All
                </li>
                <li data-filter=".women">Women’s</li>
                <li data-filter=".men">Men’s</li>
                <li data-filter=".kid">Kid’s</li>
                <li data-filter=".accessories">Accessories</li>
                <li data-filter=".cosmetic">Cosmetics</li>
              </ul>
            </div>
          </div>
          <div className="row property__gallery">
            {product.map((prod) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      style={{
                        backgroundImage: `url('http://127.0.0.1:8000${prod.image}')`,
                      }}
                    >
                      {prod.new ? (
                        <div className="label new">New</div>
                      ) : prod.sale ? (
                        <div className="label sale">Sale</div>
                      ) : prod.stock === 0 ? (
                        <div className="label stockout">out of stock</div>
                      ) : null}

                      <ul className="product__hover">
                        <li>
                          <a href={prod.image} className="image-popup">
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href=" "
                            style={{
                              backgroundColor:
                                wishlistid.includes(prod.id) && "#ca1515",
                            }}
                            onClick={() => handleAddWish(prod.id)}
                          >
                            <span className="icon_heart_alt"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href=" "
                            style={{
                              backgroundColor:
                                itemsid.includes(prod.id) && "#ca1515",
                            }}
                            onClick={() => handleAdd(prod.id)}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="h">{prod.name}</a>
                      </h6>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      {prod.sale ? (
                        <div
                          className="product__price  "
                          style={{ color: "#ca1515" }}
                        >
                          {prod.newprice} <span>{prod.price}</span>
                        </div>
                      ) : (
                        <div className="product__price">{prod.price}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
