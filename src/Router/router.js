import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Layout  from '../components/Layouts/Layout';

import { Suspense } from "react";

const Home = React.lazy(()=>import('../pages/Home'))
const ProductDetails =React.lazy(()=>import('../pages/ProductDetails') )
const ProductList =React.lazy(()=>import('../pages/ProductList') )
const NotFound =React.lazy(()=>import('../pages/NotFound') )
const Register = React.lazy(()=>import('../components/Accounts/Register'))
const Login = React.lazy(()=>import('../components/Accounts/Login'))
const CustomerProfile =React.lazy(()=>import('../components/Accounts/CustomerProfile')) ;
const VendorProfile = React.lazy(()=>import('../components/Accounts/VendorProfile'));
// const Register = React.lazy(()=>import('../components/Accounts/Register'))



const Router =()=>{
  return(
    <Suspense fallback={<h5>Loading.........</h5>}>
      <Routes>

        

        <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='productDetails/:id' element={<ProductDetails />} />
        <Route path='ProductList' element={<ProductList />} />
        {/* <Route path='Register' element={<Register />} /> */}

        </Route>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/customerprofile' element={<CustomerProfile />} />
        <Route path='/vendorprofile' element={<VendorProfile />} />



        
        
      </Routes>
    </Suspense>

  )

}

export default Router