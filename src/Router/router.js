import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import VendorLayout from "../components/Layouts/VendorLayout";
import DelivaryLayout from "../components/Layouts/DelivaryLayout";
import MasterLayout from "../components/Layouts/admin/MasterLayout";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Suspense } from "react";

const Home = React.lazy(() => import("../pages/Home"));
const ProductDetails = React.lazy(() => import("../pages/ProductDetails"));
const ReviewProductShape = React.lazy(() => import("../pages/ReviewProductShape"));
const VendorPro = React.lazy(() => import("../pages/vendorPro"));
const ProductList = React.lazy(() => import("../pages/ProductList"));
const WomanPage = React.lazy(() => import("../pages/WomanPage"));
const MenPage = React.lazy(() => import("../pages/MenPage"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Wishlist = React.lazy(() => import("../pages/Wishlist"));
const Deliveryman = React.lazy(() => import("../pages/Delivaryman"));
const Orderdetails = React.lazy(() => import("../pages/Orderdetails"));
const Delivered = React.lazy(() => import("../pages/Delivered"));
const Shipped = React.lazy(() => import("../pages/Shipped"));
const Pending = React.lazy(() => import("../pages/Pending"));
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Register = React.lazy(() => import("../components/Accounts/Register"));
const Login = React.lazy(() => import("../components/Accounts/Login"));
const ForgetPassword = React.lazy(() => import("../components/Accounts/ForgetPassword"));
const ChangeForgetPass = React.lazy(() => import("../components/Accounts/ChangeForgetPass"));
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
// const Deliveryman = React.lazy(() =>
//   import("../components/Accounts/Deliveryman")
// );
const ContacePage = React.lazy(() => import("../pages/ContacePage"));
const ChangePassword = React.lazy(() =>
  import("../components/Accounts/ChangePassword")
);
const VerifyOTP = React.lazy(() => import("../components/Accounts/VerifyOTP"));
const UserManagement = React.lazy(() => import("../pages/UserManagement"));
const ProductManagement = React.lazy(() => import("../pages/ProductManagement"));
const UpdateUser = React.lazy(() => import("../pages/UpdateUser"));

const Admin = React.lazy(() => import("../pages/Admin"));
const AdminUpdatePro = React.lazy(() => import("../pages/AdminUpdatePro"));
const AdminAddPro = React.lazy(() => import("../pages/AdminAddPro"));
const AdminPlan = React.lazy(() => import("../pages/AdminPlan"));

const Dashboard = React.lazy(() => import("../components/admin/Dashboard"));
const Charts = React.lazy(() => import("../components/admin/Charts"));
const Category = React.lazy(() => import("../components/admin/Category"));
const AddUser = React.lazy(() => import("../pages/AddUser"));

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
          <Route path="MenPage" element={<MenPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="checkoutPage" element={<CheckoutPage />} />
          <Route
            path="/customerprofile"
            element={<CustomerProfileProtectedRoute />}
          />
          <Route path="/thannk-you" element={<Thankyou />} />
          {/* <Route path="/Deliveryman" element={<Deliveryman />} /> */}
          <Route path="/contact" element={<ContacePage />} />

          {/* <Route path='Register' element={<Register />} /> */}
        </Route>
        <Route element={<VendorLayout />}>
          <Route
            path="/vendorprofile"
            element={<VendorProfileProtectedRoute />}
          />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />

          <Route path="/Vendorplan" element={<Vendorplan />} />

          <Route path="vendorPro/:id" element={<VendorPro />} />
          <Route path="/ReviewProductShape" element={<ReviewProductShape />} />
         

        </Route>
        <Route element={<MasterLayout/>}>
        
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/charts" element={<Charts/>} />
        <Route path="/addCategory" element={<Category/>} />
        <Route path="/PlanManagment" element={<AdminPlan />} />
        </Route>


        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        <Route path="/ChangeForgetPass" element={<ChangeForgetPass/>} />
        <Route path="/message" element={<Message />} />
        <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
        <Route path="/UpdateUser/:id" element={<UpdateUser />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/ProductManagement" element={<ProductManagement />} />

        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminUpdatePro/:id" element={<AdminUpdatePro />} />
        <Route path="/AdminAddPro" element={<AdminAddPro />} />
        
        <Route path="/AddUser" element={<AddUser />} />
        <Route element={<DelivaryLayout />}>
          <Route
            path="/deliveryman"
            element={<DeliveryManProfileProtectedRoute />}
          />
          <Route path="/orderdetails/:id" element={<Orderdetails />} />
          <Route path="/delivered" element={<Delivered />} />
          <Route path="/shipped" element={<Shipped />} />
          <Route path="/pending" element={<Pending />} />
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

const DeliveryManProfileProtectedRoute = () => {
  const token = Cookies.get("token"); // Retrieve the token from cookies
  const isAuthenticated = !!token; // Check if token exists

  // If user is authenticated, render CustomerProfile, else redirect to login
  return isAuthenticated ? <Deliveryman /> : <Navigate to="/login" />;
};

export default Router;