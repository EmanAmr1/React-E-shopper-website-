import React from 'react';
import '../../CSS/style.css'
import logoImage from '../../imags/logo.png';
import { Link } from 'react-router-dom';
const Header = () => {

    return (


        <>

            <div class="offcanvas-menu-overlay"></div>
            <div class="offcanvas-menu-wrapper">
                <div class="offcanvas__close">+</div>
                <ul class="offcanvas__widget">
                    <li><span class="icon_search search-switch"></span></li>
                    <li><Link to="H"><span class="icon_heart_alt"></span>
                        <div class="tip">2</div>
                    </Link></li>
                    <li><Link to="H"><span class="icon_bag_alt"></span>
                        <div class="tip">2</div>
                    </Link></li>
                </ul>
                <div class="offcanvas__logo">
                    <Link to="/"><img src={logoImage} alt="" /></Link>
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
                                <Link to="/"><img src={logoImage} alt="" /></Link>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-7">
                            <nav class="header__menu">
                                <ul>
                                    <li class="active"><Link to="/">Home</Link></li>
                                    <li><Link to="h">Women’s</Link></li>
                                    <li><Link to="h">Men’s</Link></li>
                                    <li><Link to="/ProductList">Shop</Link></li>
                                    <li><Link to="h">Pages</Link>
                                        <ul class="dropdown">
                                            <li><Link to="productDetails/:id">Product Details</Link></li>
                                            <li><Link to="./shop-cart.html">Shop Cart</Link></li>
                                            <li><Link to="/checkoutPage">Checkout</Link></li>
                                            <li><Link to="./blog-details.html">Blog Details</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="./blog.html">Blog</Link></li>
                                    <li><Link to="./contact.html">Contact</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div class="col-lg-3">
                            <div class="header__right">
                                <div class="header__right__auth">
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </div>
                                <ul class="header__right__widget">
                                    <li><span class="icon_search search-switch"></span></li>
                                    <li><Link to="h"><span class="icon_heart_alt"></span>
                                        <div class="tip">2</div>
                                    </Link></li>
                                    <li><Link to="h"><span class="icon_bag_alt"></span>
                                        <div class="tip">2</div>
                                    </Link></li>
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

    )

}


export default Header;