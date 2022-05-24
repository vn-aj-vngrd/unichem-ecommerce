import { useEffect } from "react";
import {
  getLowLevelProducts,
  resetReport,
} from "../features/reports/reportSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

const Notification = () => {
  const dispatch = useDispatch();

  const { lowLevelProducts, isLowLevelLoading, lowLevelmessage } = useSelector(
    (state) => state.reports
  );

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getLowLevelProducts());

    return () => {
      dispatch(resetReport());
    };
  }, [dispatch, lowLevelmessage, products]);

  return (
    <div>
      <a
        className="nav-link notification-bell unread dropdown-toggle"
        data-unread-notifications="true"
        href=" "
        role="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <svg
          className="icon icon-sm text-second"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
        <div className="list-group list-group-flush">
          <div className="text-center text-primary fw-bold border-bottom border-light py-3">
            Notifications
          </div>
          {isLowLevelLoading ? (
            <div className="container">
              <Spinner notifSpinner="true" />
            </div>
          ) : (
            <>
              {lowLevelProducts &&
                lowLevelProducts.length > 0 &&
                lowLevelProducts.map((product, index) => (
                  <>
                    {" "}
                    <div
                      className="list-group-item list-group-item-action border-bottom"
                      key={index}
                    >
                      <div className="row align-items-center">
                        <div className="col ps-0 ms-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="mb-0 text-small">
                                {product.productName.length > 20
                                  ? product.productName.substring(0, 30) + "..."
                                  : product.productName}
                              </p>
                            </div>
                          </div>

                          <p className="font-small  mt-1 mb-0">
                            Type:{" "}
                            {product.productType.length > 20
                              ? product.productType.substring(0, 30) + "..."
                              : product.productType}
                          </p>

                          <p className="font-small  mt-1 mb-0">
                            Current Stock: {product.quantity}
                          </p>
                          <p
                            className={`font-small mt-1 mb-0 ${
                              product.quantity === 0
                                ? "text-danger"
                                : "text-warning"
                            }`}
                          >
                            <span className="text-black">Status: {""}</span>
                            {product.quantity === 0
                              ? "Out of stock"
                              : "Low stock"}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
