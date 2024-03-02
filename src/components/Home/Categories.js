import React from 'react'
import '../../CSS/style.css';
import { useState } from 'react';

import{categoriesapi} from './api'



const Categories =()=>{
    console.log(categoriesapi)
    const [category,setCategory]= useState(categoriesapi)
//Categories Section Begin 

  return(
    <>

    <section className="categories">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 p-0">
                    <div className="categories__item categories__large__item set-bg"
                    style={{ backgroundImage: `url(${category[0].image})` }}>
                    <div className="categories__text">
                        <h1>{category[0].title}</h1>
                        <p>{category[0].description}</p>
                        <a href="h">Shop now</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="row">
                    {category.slice(1).map(cat=>{
                        return(
                            <div className="col-lg-6 col-md-6 col-sm-6 p-0" key={cat.id}>
                            <div className="categories__item set-bg" style={{ backgroundImage: `url(${cat.image})` }}>
                                <div className="categories__text">
                                    <h4>{cat.title}</h4>
                                    <p>{cat.itemCount}</p>
                                    <a href="h">Shop now</a>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                
                </div>
            </div>
        </div>
    </div>
</section>

    
    </>
  )
}
// Categories Section End 

export default Categories