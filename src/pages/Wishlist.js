import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, setItemsid } from "../store/slices/total";
import {
  addItem,
  removeItem,
  setItems,
  fetchWishList,
} from "../store/slices/wishlist";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const userCookie = Cookies.get("user");
  const baseImageUrl = "http://127.0.0.1:8000";
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const itemsid = useSelector((state) => state.total.itemsid);
  const [wishlistid, setWishlistid] = useState([]);
  const [wishlistitems, setWishlistitems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(`/api/wishlist/list/${userID}`)
      .then((res) => {
        console.log(res.data.wishlist_items);
        setWishlistitems(res.data.wishlist_items);
        // console.log(res.data.wishlist_items.map((item) => item.item));
        setWishlistid(wishlistitems.map((item) => item.item));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = async (itemId) => {
    // console.log(itemId);
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
  const handleRemoveWish = async (itemId) => {
    // e.preventDefault();
    try {
      const response = await axiosInstance.delete(
        `/api/wishlist/delete/${itemId}`
      );
      setWishlistitems(wishlistitems.filter((item) => item.id !== itemId));
      dispatch(removeItem());
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
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
                    class="btn btn-warning"
                    onClick={() => handleAdd(item.item)}
                  >
                    {/* {item.id} */}
                    {itemsid.includes(item.item)
                      ? "Added to cart"
                      : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
