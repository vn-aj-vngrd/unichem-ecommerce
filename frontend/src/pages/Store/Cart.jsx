import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    document.title = "Unichem | Cart";
  });

  return (
    // margin-top 200 so that container may be visible
    <div className="container mt-200">Cart</div>
  )
}

export default Cart