import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import Messenger from "./components/Messenger";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Products from "./pages/Product/Products";
import About from "./pages/Store/About";
import Cart from "./pages/Store/Cart";
import Contact from "./pages/Store/Contact";
import Wishlist from "./pages/Store/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/Product/ProductDetails";
import Address from "./pages/Account/Address";
import Manage from "./pages/Account/Manage";
import Order from "./pages/Account/Order";
import Review from "./pages/Account/Review";
import Checkout from "./pages/Store/Checkout";
import Faq from "./pages/Store/Faq";
import PageNotFound from "./pages/PageNotFound";

import Dashboard from "./pages/Admin/Dashboard";
import UsersList from "./pages/Admin/UsersList";
import ManageOrders from "./pages/Admin/ManageOrders";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManagePromotions from "./pages/Admin/ManagePromotions";
import Settings from "./pages/Admin/Settings";

// eslint-disable-next-line import/no-webpack-loader-syntax
import StoreCSS from "!!raw-loader!./assets/css/Store.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import AdminCSS from "!!raw-loader!./assets/css/Admin.css";

export const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [userTypeData, setUserType] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      const temp = localStorage.getItem("user");
      const user = JSON.parse(temp);
      setUserType({ userType: user.userType });
    } else {
      setUserType({ userType: "customer" });
    }
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, [user]);

  return !isLoading ? (
    <>
      <Helmet>
        <style>
          {userTypeData.userType === "customer" ? StoreCSS : AdminCSS}
        </style>
      </Helmet>
      <ScrollToTop />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar userType={userTypeData.userType} />
      {userTypeData.userType === "customer" ? (
        <>
          {/* Store Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="address" element={<Address />} />
            <Route path="manage" element={<Manage />} />
            <Route path="orders" element={<Order />} />
            <Route path="reviews" element={<Review />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="faq" element={<Faq />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* Enable Live Chat in Deployment */}
          {/* <Messenger /> */}
          <Footer userType={userTypeData.userType} />
        </>
      ) : (
        <>
          {/* Admin Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="userslist" element={<UsersList />} />
            <Route path="manageorders" element={<ManageOrders />} />
            <Route path="manageproducts" element={<ManageProducts />} />
            <Route path="managepromotions" element={<ManagePromotions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </>
  ) : (
    <>
      <Helmet>
        <style>
          {userTypeData.userType === "customer" ? StoreCSS : AdminCSS}
        </style>
      </Helmet>
      <Spinner />
    </>
  );
};

export default App;
