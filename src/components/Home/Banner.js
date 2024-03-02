import React from 'react'
import '../../CSS/elegant-icons.css'
import '../../CSS/font-awesome.min.css'
import '../../CSS/slicknav.min.css'
import '../../CSS/bootstrap.min.css'

import { useState } from 'react';

import{bannerapi} from './api'


const Banner = () => {
    const [banner,setBanner]= useState(bannerapi)
  return (
    <>
    <section class="banner set-bg" style={{ backgroundImage: `url(${banner[0].image})` }}>
    <div class="container">
        <div class="row">
            <div class="col-xl-7 col-lg-8 m-auto">
                <div class="banner__slider owl-carousel">
                    {banner.map(ban=>{return(
                                            <div class="banner__item" >
                                            <div class="banner__text">
                                                <span>The Chloe Collection</span>
                                                <h1>{ban.title}</h1>
                                                <a href="#">Shop now</a>
                                            </div>
                                        </div>
                    )})}
                </div>
            </div>
        </div>
    </div>
</section>
    
    </>
  )
}

export default Banner
