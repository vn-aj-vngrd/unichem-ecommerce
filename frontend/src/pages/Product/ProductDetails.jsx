import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";
import Breadcrumb from "../../components/Breadcrumb";

const ProductDetails = () => {
  useEffect(() => {
    document.title = "Unichem | Product Details";
  });

  const location = useLocation();
  const { product } = location.state;
  console.log(product);

  return (
    <>
      <Breadcrumb type="product"/>
      <Details product={product} />
      <Specifications product={product} />
      <Reviews />
    </>
  );
};

export default ProductDetails;
