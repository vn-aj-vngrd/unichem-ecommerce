import { useEffect, useState } from "react"; //useRef
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Product from "../../components/Product";
// import Sidebar from "../../components/Sidebar";
import Star from "../../components/Star";
import { toast } from "react-toastify";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem Store | Products";
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const minRange = watch("minRange");
  const maxRange = watch("maxRange");

  const [filters, setFilters] = useState({
    range: false,
    minRange: 0,
    maxRange: 0,
    rating: 0,
  });

  let { productName } = useParams();
  let { categoryName } = useParams();
  let { brandName } = useParams();

  const onSubmit = (data) => {
    console.log(data);
    setFilters((prevState) => ({
      ...prevState,
      range: true,
      minRange: data.minRange,
      maxRange: data.maxRange,
    }));
  };

  console.log(errors);

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
                      min: {
                        value: 0,
                        message: "Miniumm must be greater than 0",
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
                      min: {
                        value: 0,
                        message: "Miniumm must be greater than 0",
                      },
                      validate: (value) =>
                        minRange <= maxRange ||
                        "Maximum must be greater than minimum",
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
                      onChange={() =>
                        setFilters((prevState) => ({ ...prevState, rating: 1 }))
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>1+ star </span>
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
        </div>
        <div className="spacer"></div>
        <Product
          productName={productName}
          categoryName={categoryName}
          brandName={brandName}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Products;
