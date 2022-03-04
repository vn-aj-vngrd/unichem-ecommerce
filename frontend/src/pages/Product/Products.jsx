import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb"

import Product from "../../components/Product";
import Sidebar from "../../components/Sidebar";

import ShopProduct from "../../components/ShopProduct";
import ShopSidebar from "../../components/ShopSidebar";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem | Products";
  });

  return (
    <div>
      {/* <Breadcrumb /> */}
      <div className="container main-product-section">
        <Sidebar />
        <div className="spacer"></div>
        <Product />

        {/* <ShopSidebar />
        <div className="spacer"></div>
        <ShopProduct /> */}
      </div>
    </div>
  );
};

export default Products;
