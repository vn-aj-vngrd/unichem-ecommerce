import { useEffect } from "react";
import Product from "../../components/Product";
import Sidebar from "../../components/Sidebar";

import ShopProduct from "../../components/ShopProduct";
import ShopSidebar from "../../components/ShopSidebar";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem | Products";
  });

  return (
    <div className="container main-product-section">
      {/* <Sidebar />
      <Product /> */}

      <ShopSidebar />
      <ShopProduct />
    </div>
  );
};

export default Products;
