import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";

const ProductDetails = () => {
  useEffect(() => {
    document.title = "Unichem | Product Details";
  });

  const location = useLocation();
  const { product } = location.state;
  console.log(product);

  return (
    <>
      <Details product={product}/>
      <Specifications />
      <Reviews />
    </>
  );
};

export default ProductDetails;
