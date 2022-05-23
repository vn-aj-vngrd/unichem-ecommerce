import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Product from "../../components/Product";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem Store | Products";
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const minRange = watch("minRange");
  const maxRange = watch("maxRange");

  useEffect(() => {
    const defaultValues = {
      minRange: "",
      maxRange: "",
    };
    reset(defaultValues);
  }, [reset]);

  const [filters, setFilters] = useState({
    range: false,
    minRange: 0,
    maxRange: 0,
    rating: 0,
    readyStock: false,
    withDiscount: false,
  });

  let { productName } = useParams();
  let { categoryName } = useParams();
  let { brandName } = useParams();

  const onSubmit = (data) => {
    setFilters((prevState) => ({
      ...prevState,
      range: true,
      minRange: data.minRange,
      maxRange: data.maxRange,
    }));
    reset();
  };

  return (
    <div>
      <div className="container main-product-section">
        <div className="filters">
          <div>
            <div className="product-sidebar single-widget condition">
              <h5>Filter by Price</h5>
              <hr></hr>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-between align-items-center form-group">
                  <input
                    className="form-control"
                    type="number"
                    {...register("minRange", {
                      required: { value: true, message: "Minimum is required" },
                      min: {
                        value: 0,
                        message: "Miniumm must be greater than 0",
                      },
                      max: {
                        value: maxRange,
                        message: "Miniumm must be less than maximum",
                      },
                    })}
                    style={{
                      border: errors.minRange ? "1px solid #f44336" : "",
                    }}
                    placeholder="Min"
                  ></input>

                  <p>to</p>
                  <input
                    className="form-control"
                    type="number"
                    {...register("maxRange", {
                      required: { value: true, message: "Maximum is required" },
                      min: {
                        value: minRange,
                        message: "Maximum must be greater than minimum",
                      },
                    })}
                    style={{
                      border: errors.maxRange ? "1px solid #f44336" : "",
                    }}
                    placeholder="Max"
                  ></input>
                </div>
                {errors.minRange && (
                  <p className="error-message">⚠ {errors.minRange.message}</p>
                )}
                {errors.maxRange && (
                  <p className="error-message">⚠ {errors.maxRange.message}</p>
                )}
                <div className="button">
                  <button
                    className="btn btn-primary filters-apply"
                    type="submit"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="product-sidebar single-widget condition">
              <h5>Filter by Rating</h5>
              <hr></hr>
              <div className="single-block give-review">
                <ul>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filters.rating === 5}
                      onChange={() =>
                        setFilters((prevState) => ({ ...prevState, rating: 5 }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>5 stars </span>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                      </li>
                    </label>
                  </div>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filters.rating === 4}
                      onChange={() =>
                        setFilters((prevState) => ({ ...prevState, rating: 4 }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>4+ stars </span>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star"></i>
                      </li>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filters.rating === 3}
                      onChange={() =>
                        setFilters((prevState) => ({ ...prevState, rating: 3 }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>3+ stars </span>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                      </li>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filters.rating === 2}
                      onChange={() =>
                        setFilters((prevState) => ({ ...prevState, rating: 2 }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>2+ stars </span>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                      </li>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      checked={filters.rating === 1}
                      onChange={() =>
                        setFilters((prevState) => ({ ...prevState, rating: 1 }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>1+ stars </span>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                      </li>
                    </label>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="product-sidebar single-widget condition">
              <h5>Filter by Service</h5>
              <hr></hr>
              <div className="single-block give-review">
                <ul>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="readyStock"
                      onChange={() =>
                        setFilters((prevState) => ({
                          ...prevState,
                          readyStock: !filters.readyStock,
                        }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>Ready Stock </span>
                      </li>
                    </label>
                  </div>

                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="readyStock"
                      onChange={() =>
                        setFilters((prevState) => ({
                          ...prevState,
                          withDiscount: !filters.withDiscount,
                        }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>With Discount </span>
                      </li>
                    </label>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="container">
          <Product
            productName={productName}
            categoryName={categoryName}
            brandName={brandName}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
