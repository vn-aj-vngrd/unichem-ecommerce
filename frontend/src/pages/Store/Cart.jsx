import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    document.title = "Unichem | Cart";
  });

  return (
    // margin-top 200 so that container may be visible
    // loop for x items in cart
    <div className="container mt-200">
      <div className="section-title">
        <h2>Cart</h2>
      </div>
      
      <div className="row mt-4">
        <div className="col text-center">
          <img src="assets/images/products/product-2.jpg" className="product-image w-50"></img>
        </div>
        <div className="col text-center mt-5">
          <h6>Loctite 243</h6>
        </div>
        <div className="col text-center mt-5">
          <h6>₱1,500</h6>
        </div>
        <div className="col text-center mt-5">
        <button type="button" class="btn btn-outline-danger btn-sm">Remove</button>
        </div>
      </div>
      <hr/>

      <div className="row mt-4">
        <div className="col text-center">
          <img src="assets/images/products/product-1.jpg" className="product-image w-50"></img>
        </div>
        <div className="col text-center mt-5">
          <h6>Loctite 243</h6>
        </div>
        <div className="col text-center mt-5">
          <h6>₱1,500</h6>
        </div>
        <div className="col text-center mt-5">
        <button type="button" class="btn btn-outline-danger btn-sm">Remove</button>
        </div>
      </div>
      <hr/>

      <div className="row mt-4">
        <div className="col text-center">
          <img src="assets/images/products/product-3.jpg" className="product-image w-50"></img>
        </div>
        <div className="col text-center mt-5">
          <h6>Loctite 243</h6>
        </div>
        <div className="col text-center mt-5">
          <h6>₱1,500</h6>
        </div>
        <div className="col text-center mt-5">
        <button type="button" class="btn btn-outline-danger btn-sm">Remove</button>
        </div>
      </div>
      <hr/>
      
      <div className="row mt-4 mb-5">
        <div className="col text-center">
          <h4>Total: ₱1</h4>
        </div>
        <div className="col text-center">
        <button type="button" class="btn btn-outline-success">Checkout</button>
        </div>
      </div>

    </div>
  )
}

export default Cart