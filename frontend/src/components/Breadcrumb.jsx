import { Link } from "react-router-dom";

const Breadcrumb = ({ type }) => {
  return (
    <div className="container">
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            {type === "cart" && (
              <>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title"> Cart</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li>
                      <Link to="/">
                        <i className="lni lni-home"></i> Home
                      </Link>
                    </li>
                    <li>Cart</li>
                  </ul>
                </div>
              </>
            )}

            {type === "product" && (
              <>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">Product</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li>
                      <Link to="/">
                        <i className="lni lni-home"></i> Home
                      </Link>
                    </li>
                    <li>Category</li>
                    <li>Product</li>
                  </ul>
                </div>
              </>
            )}

            {type === "checkout" && (
              <>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">Checkout</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li>
                      <Link to="/">
                        <i className="lni lni-home"></i> Home
                      </Link>
                    </li>
                    <li>Cart</li>
                    <li>Checkout</li>
                  </ul>
                </div>
              </>
            )}

            {type === "wishlist" && (
              <>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="breadcrumbs-content">
                    <h1 className="page-title">Wishlist</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <ul className="breadcrumb-nav">
                    <li>
                      <Link to="/">
                        <i className="lni lni-home"></i> Home
                      </Link>
                    </li>
                    <li>Wishlist</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
