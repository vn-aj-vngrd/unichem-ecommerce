import { useEffect } from "react";
import Product from "../../components/Product";
import Sidebar from "../../components/Sidebar";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem | Products";
  });

  return (
    <div className="container main-product-section">
      <Sidebar />
      <Product />
    </div>
  );
};

export default Products;
