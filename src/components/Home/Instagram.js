import React from 'react'

import '../../CSS/style.css'

import '../../CSS/elegant-icons.css'
import '../../CSS/font-awesome.min.css'
import '../../CSS/slicknav.min.css'
import '../../CSS/bootstrap.min.css'

import { useState } from 'react';

import { instagramapi } from './api'
const Instagram = () => {
    console.log(instagramapi)
    const [instagram,setInstagram]= useState(instagramapi)
  return (
    <>

      <div className="instagram">
    <div className="container-fluid">
        <div className="row">
        {instagram.map(inst=>{
                return(

                    <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                    <div className="instagram__item set-bg" style={{ backgroundImage: `url(${inst.image})` }}>
                        <div className="instagram__text">
                            <i className="fa fa-instagram"></i>
                            <a href="h">@ ashion_shop</a>
                        </div>
                    </div>
                </div>
                )
            })}

        </div>
    </div>
</div>
    </>
  )
}

export default Instagram
