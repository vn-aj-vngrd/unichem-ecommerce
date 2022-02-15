import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Cart from "./pages/Cart";

export const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
