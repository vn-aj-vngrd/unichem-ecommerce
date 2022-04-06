import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProduct } from "../features/products/productSlice";
import Star from "./Star";
import Spinner from "./Spinner";
import ReactPaginate from "react-paginate";

const Product = ({
  productName,
  categoryName,
  brandName,
  range1,
  range2,
  range3,
  range4,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortDefault, setSortDefault] = useState("descendingOrder");
  const [pageNumber, setPageNumber] = useState(0);

  // Pagination
  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;

  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      // console.log(message);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const options = [
    {
      label: "A - Z Order",
      value: "ascendingOrder",
    },
    {
      label: "Z - A Order",
      value: "descendingOrder",
    },
    {
      label: "Low - High Price",
      value: "lowHigh",
    },
    {
      label: "High - Low Price",
      value: "highLow",
    },
    // {
    //   label: "Average Rating",
    //   value: "averageRating"
    // },
  ];

  let allProducts = JSON.parse(JSON.stringify(products));

  // Pagination
  allProducts = allProducts.slice(pagesVisited, pagesVisited + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (productName) {
    allProducts = products.filter((product) => {
      return product.productName
        .toLowerCase()
        .includes(productName.toLowerCase());
    });
  }

  if (categoryName) {
    allProducts = products.filter((product) => {
      return product.category
        .toLowerCase()
        .includes(categoryName.toLowerCase());
    });
  }

  if (brandName) {
    allProducts = products.filter((product) => {
      return product.brand.toLowerCase().includes(brandName.toLowerCase());
    });
  }

  if (range1) {
    allProducts = products.filter((product) => {
      return product.prices[0] >= 50 && product.prices[0] <= 100;
    });
  }

  if (range2) {
    allProducts = products.filter((product) => {
      return product.prices[0] >= 101 && product.prices[0] <= 500;
    });
  }

  if (range3) {
    allProducts = products.filter((product) => {
      return product.prices[0] >= 501 && product.prices[0] <= 1000;
    });
  }

  if (range4) {
    allProducts = products.filter((product) => {
      return product.prices[0] >= 1001 && product.prices[0] <= 5000;
    });
  }

  // switch(sortDefault) {
  //   case "descendingOrder":
  //     allProducts.sort((a,b) => b.productName.toLowerCase() - a.productName.toLowerCase());
  //     break;
  //   case "lowHigh":
  //     allProducts.sort((a,b) => a.prices[0] - b.prices[0]);
  //     break;
  //   case "highLow":
  //     allProducts.sort((a,b) => b.prices[0] - a.prices[0]);
  //     break;
  //   default:
  //     allProducts.sort((a,b) => a.productName.toLowerCase() - b.productName.toLowerCase());
  //     break;
  // }

  // console.log(sortDefault);
  // console.log(allProducts);

  return (
    <div className="">
      <div className="product-grid">
        <label className="sort-element">Sort by: </label>
        <select
          onChange={(e) => setSortDefault(e.target.value)}
          className="form-select sort-element"
          id="sorting"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="product">
        <div className="row">
          {allProducts.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 col-12 ">
              <div className="box-shadow">
                <div className="single-product">
                  <div className="product-image">
                    {/* promo  CLASS (.sale-tag OR .new-tag)*/}
                    {product.salePercent > 0 ? (
                      <div className="sale-tag">
                        <b>- {product.salePercent}% OFF</b>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* end of promo */}
                    <img src={product.image} alt={product.productName} />
                    <div className="button">
                      <Link
                        to={`/product-details/${product._id}`}
                        className="btn"
                      >
                        <i className="lni lni-eye"></i> View
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">
                      <i className="lni lni-package category-icon"></i>{" "}
                      {product.category}
                    </span>
                    <div className="title">
                      <h5 className="product-name">{product.productName}</h5>
                    </div>
                    <Star star={3} reviews={1} />
                  </div>
                </div>
                <div className="order-total-row ">
                  <div className="price d-flex justify-content-between align-items-center">
                    <h6 className="text-red">
                      <span>₱{product.prices[0].toFixed(2)}</span>
                    </h6>
                    <div className="items-sold">6.9K items sold</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav>
          <ul className="product-pagination pagination justify-content-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageRangeDisplayed={8}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"page-link-button"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page"}
              disabledClassName={"disabled"}
              activeClassName={"page-link-active"}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Product;
