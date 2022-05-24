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
                            {/* <div className="text-end">
                              <button className="close">
                                <i className="lni lni-close"></i>
                              </button>
                            </div> */}
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

          {/* <a
            href=" "
            className="dropdown-item text-center fw-bold rounded-bottom py-3"
          >
            <svg
              className="icon icon-xxs me-1 text-second"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
            Delete all
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Notification;
