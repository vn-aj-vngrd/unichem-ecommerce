const WishlistSummary = ({ count }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="total-amount">
            <div className="row">
              <div className="col-lg-8 col-md-6 col-12"></div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="right">
                  <h5 className="heading">Wishlist Summary</h5>
                  <hr></hr>
                  <ul>
                    <li>
                      Total Items
                      <span>
                        <p className="fw-bold"> {count} Item(s)</p>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    <div className="button mt-4">
                      <button to="/checkout" className="btn checkout-btn">
                        Add All to Cart
                      </button>
                    </div>

                    <div className="button mt-3">
                      <button className="btn-alt checkout-btn">
                        Clear Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistSummary;
