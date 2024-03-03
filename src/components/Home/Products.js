import React from "react";
import '../../CSS/style.css'

import '../../CSS/elegant-icons.css'
import '../../CSS/font-awesome.min.css'
import '../../CSS/slicknav.min.css'
import '../../CSS/bootstrap.min.css'

import { useState } from 'react';
import{productapi} from './api'

const Products = ()=>{
    console.log(productapi)
    const [product,setProduct]= useState(productapi)
  return(
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
                    <li className="active" data-filter="*">All</li>
                    <li data-filter=".women">Women’s</li>
                    <li data-filter=".men">Men’s</li>
                    <li data-filter=".kid">Kid’s</li>
                    <li data-filter=".accessories">Accessories</li>
                    <li data-filter=".cosmetic">Cosmetics</li>
                </ul>
            </div>
        </div>
        <div className="row property__gallery">
            {product.map((prod)=>{
                return(
                    <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                <div className="product__item">
                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${prod.image})` }}>
                    {prod.New ? (<div className="label new">New</div>) : prod.Onsale ? (<div className="label sale">Sale</div>) : prod.Out_of_stock ? (<div className="label stockout">out of stock</div>): null}

                        <ul className="product__hover">
                            <li><a href={prod.image} className="image-popup"><span className="arrow_expand"></span></a></li>
                            <li><a href="h"><span className="icon_heart_alt"></span></a></li>
                            <li><a href="h"><span className="icon_bag_alt"></span></a></li>
                        </ul>
                    </div>
                    <div className="product__item__text">
                        <h6><a href="h">{prod.Product_name}</a></h6>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        {prod.Onsale ? (<div className="product__price  " style={{color:'#ca1515'}}>{prod.price2} <span>{prod.price1}</span></div>):(<div className="product__price">{prod.price1}</div>)}
                        
                    </div>
                </div>
            </div>

                )
            })}
            
        </div>
    </div>
</section>
    </>
  )
}

export default Products;