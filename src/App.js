import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Product/Products";
import About from "./pages/Store/About";
import Cart from "./pages/Store/Cart";
import Contact from "./pages/Store/Contact";
import Wishlist from "./pages/Store/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/Product/ProductDetails";

// Products
import Construction from "./pages/Product/Construction";

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        
        <Route path="product-details" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="wishlist" element={<Wishlist />} />


        {/* Products */}
        <Route path="construction" element={<Construction />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
