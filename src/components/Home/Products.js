import React from "react";

import { useState, useEffect } from "react";

import { axiosInstance } from "../../apis/config";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, setItemsid } from "../../store/slices/total";

const Products = () => {
  const dispatch = useDispatch();
  const itemsid = useSelector((state) => state.total.itemsid);
  const userCookie = Cookies.get("user");
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const [product, setProduct] = useState([]);
  //   const [checkCart, setCheckCart] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/API/allproducts/")
      .then((res) => setProduct(res.data.results.products))
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = async (itemId) => {
    // e.preventDefault();
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
                          <a href="h">
                            <span className="icon_heart_alt"></span>
                          </a>
                        </li>
                        <li>
                          <a href=" " onClick={() => handleAdd(prod.id)}>
                            <span
                              className={`${
                                itemsid.includes(prod.id)
                                  ? "icon_bag_alt text-warning"
                                  : "icon_bag_alt"
                              } `}
                            ></span>
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
