import React from "react";
import ProductRating from '../Shop/ProductRating'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../apis/config";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, setItemsid } from "../../store/slices/total";
import { addItem, removeItem, setItems } from "../../store/slices/wishlist";

const Products = () => {
  const dispatch = useDispatch();
  const itemsid = useSelector((state) => state.total.itemsid);
  const [product, setProduct] = useState([]);
  const [wishlistid, setWishlistid] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };
  const [selectedCategory, setSelectedCategory] = useState("*");
  const handleCategoryFilter = (category) => {
    console.log('Selected Category:', category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    axiosInstance
      .get("/API/allproducts/")
      .then((res) => setProduct(res.data.results.products))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axiosInstance
      .get(`/api/wishlist/list/`, { headers })
      .then((res) => {
        console.log(res.data);
        setWishlistid(res.data.wishlist_items.map((item) => item.item));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddWish = async (itemId) => {
    try {
      const response = await axiosInstance.post(
        `/api/wishlist/add/`,
        {
          item: itemId,
        },
        { headers }
      );

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

  const handleAdd = async (item) => {
    // e.preventDefault();
    if (!itemsid.includes(item)) {
      try {
        const response = await axiosInstance.get(
          `/API/getProduct/${item.item}`,
          {
            headers,
          }
        );
        console.log(response.data.product);
        const proDetails = response.data.product;
        let selectedSize = "";

        if (proDetails.stock_S > 0) {
          selectedSize = "S";
        } else if (proDetails.stock_M > 0) {
          selectedSize = "M";
        } else if (proDetails.stock_L > 0) {
          selectedSize = "L";
        } else if (proDetails.stock_XL > 0) {
          selectedSize = "XL";
        } else {
          selectedSize = "one_size";
        }
        setSelectedSize(selectedSize);

        try {
          console.log(selectedSize);
          const response = await axiosInstance.post(
            `/api/cart/add/`,
            {
              item: item.item,
              quantity: 1,
              size: selectedSize,
            },
            { headers }
          );
          console.log(response.data);
          dispatch(increaseCounter());
          const updatedItemsId = itemsid.concat(item.item);
          dispatch(setItemsid(updatedItemsId));
        } catch (error) {
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      // try {
      //   const response = await axiosInstance.post(
      //     `/api/cart/add/`,
      //     {
      //       item: itemId,
      //       quantity: 1,
      //     },
      //     { headers }
      //   );
      //   console.log(response.data);
      //   dispatch(increaseCounter());
      //   const updatedItemsId = itemsid.concat(itemId);
      //   dispatch(setItemsid(updatedItemsId));
      // } catch (error) {
      //   console.error("Error:", error.response.data);
      // }
    }
  };
  const navigate = useNavigate();
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
                <li className={selectedCategory === "*" ? "active" : ""}
                  onClick={() => handleCategoryFilter("*")}>
                  All
                </li>
                <li className={selectedCategory === "women" ? "active" : ""}
                  onClick={() => handleCategoryFilter(1)}>Women’s</li>
                <li className={selectedCategory === "men" ? "active" : ""}
                  onClick={() => handleCategoryFilter(2)}>Men’s</li>
                <li className={selectedCategory === "kid" ? "active" : ""}
                  onClick={() => handleCategoryFilter(3)}>Kid’s</li>
                <li className={selectedCategory === "accessories" ? "active" : ""}
                  onClick={() => handleCategoryFilter(4)}>Accessories</li>
                <li className={selectedCategory === "cosmetic" ? "active" : ""}
                  onClick={() => handleCategoryFilter(5)}>Cosmetics</li>
              </ul>
            </div>
          </div>
          <div className="row property__gallery">
            {product.filter((prod) =>selectedCategory === "*" ? true : prod.category === selectedCategory
            ).map((prod) => {
                  console.log('Selected Category:', selectedCategory);
                console.log('Filter Result:', selectedCategory === '*' || prod.category === selectedCategory);
                console.log('Rendered Product:', prod);
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
                            <a href={`/productDetails/${prod.id}`}>
                              {" "}
                              <span className="arrow_expand"></span>
                            </a>
                          </a>
                        </li>
                        <li>
                          <a
                            href={() => false}
                            style={{
                              backgroundColor:
                                wishlistid.includes(prod.id) && "#ca1515",
                            }}
                            onClick={() => handleAddWish(prod.id)}
                          >
                            <span
                              style={{
                                color: itemsid.includes(prod.id) && "#ffffff",
                              }}
                              className="icon_heart_alt"
                            ></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href={() => false}
                            style={{
                              backgroundColor:
                                itemsid.includes(prod.id) && "#ca1515",
                            }}
                            onClick={() => handleAdd(prod)}
                          >
                            <span
                              style={{
                                color: itemsid.includes(prod.id) && "#ffffff",
                              }}
                              className="icon_bag_alt"
                            ></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a href="h">{prod.name}</a>
                      </h6>
                      <ProductRating rating={prod.ratings} />
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
