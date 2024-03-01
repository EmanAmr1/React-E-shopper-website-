import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Layout  from '../components/Layouts/Layout';

import { Suspense } from "react";

const Home = React.lazy(()=>import('../pages/Home'))
const ProductDetails =React.lazy(()=>import('../pages/ProductDetails') )
const ProductList =React.lazy(()=>import('../pages/ProductList') )
const NotFound =React.lazy(()=>import('../pages/NotFound') )



const Router =()=>{
  return(
    <Suspense fallback={<h5>Loading.........</h5>}>
      <Routes>

        

        <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='productDetails/:id' element={<ProductDetails />} />
        <Route path='ProductList' element={<ProductList />} />

        </Route>
        <Route path='*' element={<NotFound/>}/>



        
        
      </Routes>
    </Suspense>

  )

}

export default Router