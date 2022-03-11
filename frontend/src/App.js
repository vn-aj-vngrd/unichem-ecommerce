import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import Manage from "./pages/Account/Manage";
import Order from "./pages/Account/Order";
import Review from "./pages/Account/Review";
import Checkout from "./pages/Store/Checkout";
import Faq from "./pages/Store/Faq";
import PageNotFound from "./pages/PageNotFound";

import Create from "./pages/Admin/Product/Create";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  return !isLoading ? (
    <>
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
      <Navbar />
      <Routes>
        {/* Store */}
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product-details/:id" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="manage" element={<Manage />} />
        <Route path="orders" element={<Order />} />
        <Route path="reviews" element={<Review />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin */}
        <Route path="create" element={<Create />} />
      </Routes>
      {/* <Messenger /> */}
      <Footer />
    </>
  ) : (
    <>
      <Spinner />
    </>
  );
};

export default App;
