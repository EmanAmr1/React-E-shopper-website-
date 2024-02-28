import React from 'react';
import thumb1 from '../imags/product/details/thumb-1.jpg';
import thumb2 from '../imags/product/details/thumb-1.jpg';
import thumb3 from '../imags/product/details/thumb-3.jpg';
import thumb4 from '../imags/product/details/thumb-4.jpg';

const ProductDetailes = () => {

    return (


        <>


            <div class="breadcrumb-option">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb__links">
                                <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                                <a href="h">Women’s </a>
                                <span>Essential structured blazer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="product-details spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product__details__pic">
                                <div class="product__details__pic__left product__thumb nice-scroll">
                                    <a className="pt active" href="#product-1">
                                        <img src={thumb1} alt="" />
                                    </a>
                                    <a className="pt" href="#product-2">
                                        <img src={thumb2} alt="" />
                                    </a>
                                    <a className="pt" href="#product-3">
                                        <img src={thumb3} alt="" />
                                    </a>
                                    <a className="pt" href="#product-4">
                                        <img src={thumb4} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            Content of the second column here
                        </div>
                    </div>
                </div>
            </div>

            
                   

        </>

    )

}


export default ProductDetailes;