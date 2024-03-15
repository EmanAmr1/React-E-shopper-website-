import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseCounter,
  setItemsid,
  decreaseCounterByAmount,
} from "../store/slices/total";
import {
  addItem,
  removeItem,
  setItems,
  fetchWishList,
} from "../store/slices/wishlist";
import { Link } from "react-router-dom";
import { clearAllListeners } from "@reduxjs/toolkit";

const Wishlist = () => {
  const userCookie = Cookies.get("user");
  const baseImageUrl = "http://127.0.0.1:8000";
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const itemsid = useSelector((state) => state.total.itemsid);
  const [wishlistid, setWishlistid] = useState([]);
  const [wishlistitems, setWishlistitems] = useState([]);
  const token = Cookies.get("token");
  const [selectedSize, setSelectedSize] = useState("");
  const headers = {
    Authorization: `Token ${token}`,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(`/api/wishlist/list/`, { headers })
      .then((res) => {
        console.log(res.data.wishlist_items);
        setWishlistitems(res.data.wishlist_items);
        // console.log(res.data.wishlist_items.map((item) => item.item));
        setWishlistid(wishlistitems.map((item) => item.item));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = async (item) => {
    if (!itemsid.includes(item.item)) {
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
    }
    // else {
    //   try {
    //     const response = await axiosInstance.get(`/api/cart/list/`, {
    //       headers,
    //     });
    //     console.log(response.data.cart_items);
    //     const cartitems = response.data.cart_items;
    //     try {
    //       const cartItem = cartitems.find(
    //         (item) => item.item === itemId.item && item.user === itemId.user
    //       );
    //       console.log(cartItem);
    //       const response = await axiosInstance.delete(
    //         `/api/cart/delete/${cartItem.id}`,
    //         { headers }
    //       );
    //       console.log(response.data);
    //       const updatedItemsId = itemsid.filter((item) => item !== itemId.item);
    //       dispatch(setItemsid(updatedItemsId));

    //       console.log(cartItem.quantity);
    //       dispatch(decreaseCounterByAmount(cartItem.quantity));
    //     } catch (error) {
    //       console.error("Error:", error);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching cart items:", error);
    //   }
    // }
  };
  const handleRemoveWish = async (itemId) => {
    // e.preventDefault();
    try {
      const response = await axiosInstance.delete(
        `/api/wishlist/delete/${itemId}`,
        { headers }
      );
      setWishlistitems(wishlistitems.filter((item) => item.id !== itemId));
      dispatch(removeItem());
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>              
    {/* Breadcrumb Begin */}
    <div className="breadcrumb-option">
      <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__links">
            <Link to="/">
              <i className="fa fa-home"></i> Home
            </Link>
            <span> Your wishList</span>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* Breadcrumb End */}
    <div className="populer container p-4 mt-5 ">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {wishlistitems.map((item) => {
          return (
            <div className="col" key={item.id}>
              <div className="card">
                <img
                  src={`${baseImageUrl}${item.item_image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.item_name}</h5>
                  <div className="card-text">
                    {/* <span>{movie.release_date}</span> */}
                    <span
                      className="sympol"
                      onClick={() => handleRemoveWish(item.id)}
                      style={{
                        fontSize: "50px",
                        cursor: "pointer",
                        color: "#ca1515",
                      }}
                    >
                      &#10084;
                    </span>
                  </div>
                  <button
                    // onClick={() => naviate(/details/${movie.id})}
                    class="btn"
                    style={{
                      backgroundColor: itemsid.includes(item.item)
                        ? "gray"
                        : "#ca1515",
                      color: "#ffffff",
                    }}
                    onClick={() => handleAdd(item)}
                  >
                    {/* {item.id} */}
                    {itemsid.includes(item.item) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Wishlist;
