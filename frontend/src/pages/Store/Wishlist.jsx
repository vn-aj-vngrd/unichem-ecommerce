import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";

const Wishlist = () => {
  useEffect(() => {
    document.title = "Unichem | Wishlist";
  });

  return (
    <>
      <Breadcrumb type="wishlist" />
      {/* content here */}
    </>
  );
};

export default Wishlist;
