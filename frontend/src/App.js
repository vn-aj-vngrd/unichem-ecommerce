import { useState, useEffect } from "react";
import { getUser, resetUser, logout } from "./features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import Messenger from "./components/Messenger";
import AutoScrollToTop from "./components/AutoScrollToTop";
import ScrollToTop from "react-scroll-to-top";
// import VerifyAuth from "./components/VerifyAuth";

import Home from "./pages/Store/Home";
import Products from "./pages/Product/Products";
import About from "./pages/Store/About";
import Cart from "./pages/Store/Cart";
import Contact from "./pages/Store/Contact";
import Wishlist from "./pages/Store/Wishlist";
import Login from "./pages/Store/Login";
import Signup from "./pages/Store/Signup";
import ProductDetails from "./pages/Product/ProductDetails";
import Address from "./pages/Account/Address";
import Profile from "./pages/Account/Profile";
import Order from "./pages/Account/Order";
import OrderDetails from "./pages/Account/OrderDetails";
import Review from "./pages/Account/Review";
import Checkout from "./pages/Store/Checkout";
import Faq from "./pages/Store/Faq";
import PageNotFound from "./pages/PageNotFound";
import Verification from "./pages/Store/Verification";
import ForgotPassword from "./pages/Store/ForgotPassword";
import Recovery from "./pages/Store/Recovery";

import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageOrders from "./pages/Admin/ManageOrders";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManagePromotions from "./pages/Admin/ManagePromotions";
import ManageCoupons from "./pages/Admin/ManageCoupons";
import Settings from "./pages/Admin/AdminSettings";

// eslint-disable-next-line import/no-webpack-loader-syntax
import StoreCSS from "!!raw-loader!./assets/css/Store.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import AdminCSS from "!!raw-loader!./assets/css/Admin.css";

// import "./assets/css/Store.css"

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthError, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoading = () => {
    setIsLoading(false);
  };

  injectStyle();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      dispatch(getUser());
    }

    if (isAuthError) {
      if (message === "Not authorized" || message === "Token expired") {
        toast.error("Session has expired. Please login again.");
      }

      navigate("/");
      dispatch(logout());
      dispatch(resetUser());
    }

    window.addEventListener("load", handleLoading);
    return () => {
      window.removeEventListener("load", handleLoading);
      dispatch(resetUser());
    };
  }, [dispatch, isAuthError, navigate, message]);

  // console.log(user)

  return !isLoading ? (
    <>
      <Helmet>
        <style>
          {user
            ? user.userType === "customer"
              ? StoreCSS
              : AdminCSS
            : StoreCSS}
        </style>
      </Helmet>
      <AutoScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <VerifyAuth /> */}
      <Navbar userType={user ? user.userType : "customer"} />
      {user ? (
        user.userType === "customer" ? (
          <>
            {/* Store Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="products/category/:categoryName"
                element={<Products />}
              />
              <Route
                path="products/product/:productName"
                element={<Products />}
              />
              <Route path="products/brand/:brandName" element={<Products />} />
              <Route path="product-details/:id" element={<ProductDetails />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="account/address" element={<Address />} />
              <Route path="account/profile" element={<Profile />} />
              <Route path="account/orders" element={<Order />} />
              <Route path="order-details/:id" element={<OrderDetails />} />
              <Route path="account/reviews" element={<Review />} />
              <Route path="cart/checkout" element={<Checkout />} />
              <Route path="faq" element={<Faq />} />
              <Route
                path="users/:id/verify/:token"
                element={<Verification />}
              />
              <Route path="users/:id/recover/:token" element={<Recovery />} />
              <Route path="recover-account" element={<ForgotPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* Enable Live Chat in Deployment */}
            <Messenger />
            <Footer userType={user ? user.userType : "customer"} />
            <ScrollToTop
              smooth="true"
              color="#f44336"
              viewBox="0 0 256 256"
              width="20"
              height="20"
              style={{ left: "2rem", right: "auto", bottom: "2rem" }}
            />
          </>
        ) : (
          <>
            {/* Admin Routes */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="promotions" element={<ManagePromotions />} />
              <Route path="coupons" element={<ManageCoupons />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ScrollToTop
              smooth="true"
              color="#f44336"
              viewBox="0 0 256 256"
              width="20"
              height="20"
              style={{ right: "2rem", left: "auto", bottom: "2rem" }}
            />
          </>
        )
      ) : (
        <>
          <>
            {/* Store Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="products/category/:categoryName"
                element={<Products />}
              />
              <Route
                path="products/product/:productName"
                element={<Products />}
              />
              <Route path="products/brand/:brandName" element={<Products />} />
              <Route path="product-details/:id" element={<ProductDetails />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="account/address" element={<Address />} />
              <Route path="account/profile" element={<Profile />} />
              <Route path="account/orders" element={<Order />} />
              <Route path="order-details/:id" element={<OrderDetails />} />
              <Route path="account/reviews" element={<Review />} />
              <Route path="cart/checkout" element={<Checkout />} />
              <Route path="faq" element={<Faq />} />
              <Route
                path="users/:id/verify/:token"
                element={<Verification />}
              />
              <Route path="users/:id/recover/:token" element={<Recovery />} />
              <Route path="recover-account" element={<ForgotPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* Enable Live Chat in Deployment */}
            <Messenger />
            <Footer userType={user ? user.userType : "customer"} />
            <ScrollToTop
              smooth="true"
              color="#f44336"
              viewBox="0 0 256 256"
              width="20"
              height="20"
              style={{ left: "2rem", right: "auto", bottom: "2rem" }}
            />
          </>
        </>
      )}
    </>
  ) : (
    <>
      <Helmet>
        <style>
          {user
            ? user.userType === "customer"
              ? StoreCSS
              : AdminCSS
            : StoreCSS}
        </style>
      </Helmet>
      <Spinner globalSpinner="true" />
    </>
  );
};

export default App;
