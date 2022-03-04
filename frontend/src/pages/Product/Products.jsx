import { useEffect } from "react";

import Product from "../../components/Product";
import Sidebar from "../../components/Sidebar";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem | Products";
  });

  return (
    <div>
      <div className="container main-product-section">
        <Sidebar />
        <div className="spacer"></div>
        <Product />
      </div>
    </div>
  );
};

export default Products;
