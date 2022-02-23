import { useEffect } from "react";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";

const ProductDetails = () => {
  useEffect(() => {
    document.title = "Unichem | Product Details";
  });

  return (
    <>
      <Details />
      <Specifications />
      <Reviews />
    </>
  );
};

export default ProductDetails;
