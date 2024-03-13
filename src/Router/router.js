import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import VendorLayout from "../components/Layouts/VendorLayout";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Suspense } from "react";

const Home = React.lazy(() => import("../pages/Home"));
const ProductDetails = React.lazy(() => import("../pages/ProductDetails"));
const VendorPro = React.lazy(() => import("../pages/vendorPro"));
const ProductList = React.lazy(() => import("../pages/ProductList"));
const WomanPage = React.lazy(() => import("../pages/WomanPage"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Wishlist = React.lazy(() => import("../pages/Wishlist"));
const Deliveryman = React.lazy(() => import("../pages/Delivaryman"));
const Orderdetails = React.lazy(() => import("../pages/Orderdetails"));
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Register = React.lazy(() => import("../components/Accounts/Register"));
const Login = React.lazy(() => import("../components/Accounts/Login"));
const CustomerProfile = React.lazy(() =>
  import("../components/Accounts/CustomerProfile")
);
const VendorProfile = React.lazy(() =>
  import("../components/Accounts/VendorProfile")
);

const AddProduct = React.lazy(() => import("../pages/AddProduct"));
const UpdateProduct = React.lazy(() => import("../pages/UpdateProduct"));
const DeleteProduct = React.lazy(() => import("../pages/DeleteProduct"));
const Vendorplan = React.lazy(() => import("../pages/Vendorplan"));
const EmailVerification = React.lazy(() =>
  import("../components/Accounts/EmailVerification")
);
const Message = React.lazy(() => import("../components/Accounts/Message"));
const Thankyou = React.lazy(() => import("../components/checkout/Thankyou"));
const DeliveryMan = React.lazy(() =>
  import("../components/Accounts/DeliveryMan")
);
const ContacePage = React.lazy(() => import("../pages/ContacePage"));
const ChangePassword = React.lazy(() =>
  import("../components/Accounts/ChangePassword")
);
const VerifyOTP = React.lazy(() => import("../components/Accounts/VerifyOTP"));

// const Register = React.lazy(()=>import('../components/Accounts/Register'))

const Router = () => {
  return (
    <Suspense fallback={<h5>Loading.........</h5>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="productDetails/:id" element={<ProductDetails />} />
          <Route path="ProductList" element={<ProductList />} />
          <Route path="WomanPage" element={<WomanPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/deliveryman" element={<Deliveryman />} />
          <Route
            path="/deliveryman/orderdetails/:id"
            element={<Orderdetails />}
          />
          <Route path="checkoutPage" element={<CheckoutPage />} />
          <Route
            path="/customerprofile"
            element={<CustomerProfileProtectedRoute />}
          />
          <Route path="/thannk-you" element={<Thankyou />} />
          <Route path="/DeliveryMan" element={<DeliveryMan />} />
          <Route path="/contact" element={<ContacePage />} />

          {/* <Route path='Register' element={<Register />} /> */}
        </Route>
        <Route element={<VendorLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/vendorprofile"
            element={<VendorProfileProtectedRoute />}
          />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
          <Route path="/Vendorplan" element={<Vendorplan />} />
          <Route path="/message" element={<Message />} />
          <Route path="vendorPro/:id" element={<VendorPro />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/VerifyOTP" element={<VerifyOTP />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const CustomerProfileProtectedRoute = () => {
  const token = Cookies.get("token");
  const isAuthenticated = !!token;
  return isAuthenticated ? <CustomerProfile /> : <Navigate to="/login" />;
};

const VendorProfileProtectedRoute = () => {
  const token = Cookies.get("token");
  const isAuthenticated = !!token;
  return isAuthenticated ? <VendorProfile /> : <Navigate to="/login" />;
};

// const DeliveryManProfileProtectedRoute = () => {
//   const token = Cookies.get('token'); // Retrieve the token from cookies
//   const isAuthenticated = !!token; // Check if token exists

//   // If user is authenticated, render CustomerProfile, else redirect to login
//   return isAuthenticated ? <DeliveryMan /> : <Navigate to="/login" />;
// };

export default Router;
