import { useEffect } from "react";

const Order = () => {
  useEffect(() => {
    document.title = "Unichem | Orders";
  });

  return <div className="container mt-200">Order</div>;
};

export default Order;
