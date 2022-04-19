import { useEffect, useMemo, useState } from "react"; //useRef
import { useParams } from "react-router-dom";
import Product from "../../components/Product";
// import Sidebar from "../../components/Sidebar";
import Star from "../../components/Star";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem Store | Products";
  });

  const [filters, setFilters] = useState({
    range1: false,
    range2: false,
    range3: false,
    range4: false,
    rating0: false,
    rating1: false,
    rating2: false,
    rating3: false,
    rating4: false,
    rating5: false,
  });

  const [isFiltered, setIsFiltered] = useState(false);
  let { productName } = useParams();
  let { categoryName } = useParams();
  let { brandName } = useParams();

  useMemo(() => {
    if (
      filters.range1 ||
      filters.range2 ||
      filters.range3 ||
      filters.range4 ||
      filters.rating0 ||
      filters.rating1 ||
      filters.rating2 ||
      filters.rating3 ||
      filters.rating4 ||
      filters.rating5
    ) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [isFiltered]);

  return (
    <div>
      <div className="container main-product-section">
        <div className="">
          <div>
            <div className="product-sidebar single-widget condition">
              <h5>Filter by Price</h5>
              <hr></hr>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() =>
                    setFilters({ ...filters, range1: !filters.range1 })
                  }
                ></input>
                <label className="sidebar-label form-check-label">
                  ₱ 50 - ₱ 100
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() =>
                    setFilters({ ...filters, range2: !filters.range2 })
                  }
                ></input>
                <label className="sidebar-label form-check-label">
                  ₱ 101 - ₱ 500
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() =>
                    setFilters({ ...filters, range3: !filters.range3 })
                  }
                ></input>
                <label className="sidebar-label form-check-label">
                  ₱ 501 - ₱ 1,000
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() =>
                    setFilters({ ...filters, range4: !filters.range4 })
                  }
                ></input>
                <label className="sidebar-label form-check-label">
                  ₱ 1,001 - ₱ 5,000
                </label>
              </div>
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
                      type="checkbox"
                      onChange={() =>
                        setFilters({ ...filters, rating5: !filters.rating5 })
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
                      type="checkbox"
                      onChange={() =>
                        setFilters({ ...filters, rating4: !filters.rating4 })
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>4 stars </span>
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
                      type="checkbox"
                      onChange={() =>
                        setFilters({ ...filters, rating3: !filters.rating3 })
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>3 stars </span>
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
                      type="checkbox"
                      onChange={() =>
                        setFilters({ ...filters, rating2: !filters.rating2 })
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>2 stars </span>
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
                      type="checkbox"
                      onChange={() =>
                        setFilters({ ...filters, rating1: !filters.rating1 })
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>1 star </span>
                        <i className="lni lni-star-filled"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                        <i className="lni lni-star"></i>
                      </li>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() =>
                        setFilters({ ...filters, rating0: !filters.rating0 })
                      }
                    ></input>
                    <label className="sidebar-label form-check-label">
                      <li>
                        <span>0 star </span>
                        <i className="lni lni-star"></i>
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
          isFiltered={isFiltered}
        />
      </div>
    </div>
  );
};

export default Products;
