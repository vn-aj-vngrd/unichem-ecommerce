import { useEffect } from "react";

const Order = () => {
  useEffect(() => {
    document.title = "Unichem | Orders";
  });

  return <div className="body-content">Order</div>;
};

export default Order;
