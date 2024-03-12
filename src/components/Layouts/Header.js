import React from "react";
import logoImage from "../../imags/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchTotalCount } from "../../store/slices/total";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishList } from "../../store/slices/wishlist";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import "./Header.css";



const Header = () => {
  const total = useSelector((state) => state.total.count);
  const count = useSelector((state) => state.wishlist.count);
  // const [total, setTotal] = useState();
  const dispatch = useDispatch();
  const isAuthenticated = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTotalCount());
    dispatch(fetchWishList());
  }, []);

  const handleLogout = () => {
    const token = Cookies.get('token'); 
    Cookies.remove('token');
    const headers = {
      Authorization: `Token ${token}`
    };
    axios.post('http://localhost:8000/api/logout/', null, { headers })
      .then(() => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <div class="offcanvas-menu-overlay"></div>
      <div class="offcanvas-menu-wrapper">
        <div class="offcanvas__close">+</div>
        <ul class="offcanvas__widget">
          <li>
            <span class="icon_search search-switch"></span>
          </li>
          <li>
            <Link to="H">
              <span class="icon_heart_alt"></span>
              <div class="tip">2</div>
            </Link>
          </li>
          <li>
            <Link to="H">
              <span class="icon_bag_alt"></span>
              <div class="tip">2</div>
            </Link>
          </li>
        </ul>
        <div class="offcanvas__logo">
          <Link to="/">
            <img src={logoImage} alt="" />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div class="offcanvas__auth">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>

      <header class="header">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-3 col-lg-2">
              <div class="header__logo">
                <Link to="/">
                  <img src={logoImage} alt="" />
                </Link>
              </div>
            </div>
            <div class="col-xl-6 col-lg-7">
              <nav class="header__menu">
                <ul>
                  <li class="active">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="h">Women’s</Link>
                  </li>
                  <li>
                    <Link to="h">Men’s</Link>
                  </li>
                  <li>
                    <Link to="/ProductList">Shop</Link>
                  </li>
                  <li>
                    <Link to="h">Pages</Link>
                    <ul class="dropdown">
                      <li>
                        <Link to="productDetails/:id">Product Details</Link>
                      </li>
                      <li>
                        <Link to="Cart">Shop Cart</Link>
                      </li>
                      <li>
                        <Link to="/checkoutPage">Checkout</Link>
                      </li>
                      <li>
                        <Link to="./blog-details.html">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="./blog.html">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-lg-3">
              <div class="header__right">
                <div class="header__right__auth">
                {isAuthenticated ? (
                    <Link className="header__right__auth__link" to="#" onClick={handleLogout}>Logout</Link>
                  ) : (
                    <>
                      <Link className="header__right__auth__link" to="/login">Login</Link>
                      <Link className="header__right__auth__link" to="/register">Register</Link>
                    </>
                  )}
                </div>
                <ul class="header__right__widget">
                  <li>
                    <span class="icon_search search-switch"></span>
                  </li>
                  <li>
                    <Link to="wishlist">
                      <span class="icon_heart_alt"></span>
                      <div class="tip">{count}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="Cart">
                      <span class="icon_bag_alt"></span>
                      <div class="tip">{total}</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="canvas__open">
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
