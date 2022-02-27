import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";

const Order = () => {
  useEffect(() => {
    document.title = "Unichem | Orders";
  });

  return (
    <>
      <Breadcrumb type="order" />
      {/* content here */}
    </>
  );
};

export default Order;
