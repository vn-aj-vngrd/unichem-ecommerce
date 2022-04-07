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

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (isProductError) {
      // console.log(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [isProductError, productMessage, dispatch]);

  if (isProductLoading) {
    return <><div className="empty-container"></div><Spinner /></>;
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

  // Pagination
  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;

  // Pagination
  let allProducts = JSON.parse(JSON.stringify(products));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (productName) {
    productName = productName.replaceAll("_", " ");
    // console.log(productName);

    allProducts = products.filter((product) => {
      return product._doc.productName
        .toLowerCase()
        .includes(productName.toLowerCase());
    });
  }

  if (categoryName) {
    categoryName = categoryName.replaceAll("_", " ");
    // console.log(categoryName);

    allProducts = products.filter((product) => {
      return product._doc.category
        .toLowerCase()
        .includes(categoryName.toLowerCase());
    });
  }

  if (brandName) {
    brandName = brandName.replaceAll("_", " ");
    // console.log(brandName);

    allProducts = products.filter((product) => {
      return product._doc.brand.toLowerCase().includes(brandName.toLowerCase());
    });
  }

  const pageCount = Math.ceil(allProducts.length / productsPerPage);
  allProducts = allProducts.slice(pagesVisited, pagesVisited + productsPerPage);
  // if (range1) {
  //   allProducts = products.filter((product) => {
  //     return product._doc.prices[0] >= 50 && product._doc.prices[0] <= 100;
  //   });
  // }

  // if (range2) {
  //   allProducts = products.filter((product) => {
  //     return product._doc.prices[0] >= 101 && product._doc.prices[0] <= 500;
  //   });
  // }

  // if (range3) {
  //   allProducts = products.filter((product) => {
  //     return product._doc.prices[0] >= 501 && product._doc.prices[0] <= 1000;
  //   });
  // }

  // if (range4) {
  //   allProducts = products.filter((product) => {
  //     return product._doc.prices[0] >= 1001 && product._doc.prices[0] <= 5000;
  //   });
  // }

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

  let salesPrice = 0;

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
            <div key={product._doc._id} className="col-lg-4 col-md-6 col-12 ">
              <div className="box-shadow">
                <div className="single-product">
                  <div className="product-image">
                    {/* promo  CLASS (.sale-tag OR .new-tag)*/}
                    {product._doc.salePercent > 0 ? (
                      <div className="sale-tag">
                        <b>- {product._doc.salePercent}% OFF</b>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* end of promo */}
                    <img
                      src={product._doc.image}
                      alt={product._doc.productName}
                    />
                    <div className="button">
                      <Link
                        to={`/product-details/${product._doc._id}`}
                        className="btn"
                      >
                        <i className="lni lni-eye"></i> View
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">
                      <i className="lni lni-package category-icon"></i>{" "}
                      {product._doc.category}
                    </span>
                    <div className="title">
                      <h5 className="product-name">
                        {product._doc.productName}
                      </h5>
                    </div>
                    <Star star={3} reviews={1} />
                  </div>
                </div>
                <div className="order-total-row ">
                  <div className="price d-flex justify-content-between align-items-center">
                    <div>
                      <div hidden>
                        {
                          (salesPrice =
                            product._doc.prices[0] -
                            (product._doc.prices[0] *
                              product._doc.salePercent) /
                              100)
                        }
                      </div>

                      {product._doc.isSale ? (
                        <h6 className="text-red">
                          ₱ {salesPrice.toFixed(2)}
                          <del className="small text-grey ps-1">
                            ₱{product._doc.prices[0].toFixed(2)}
                          </del>
                        </h6>
                      ) : (
                        <h6 className="text-red">
                          ₱{product._doc.prices[0].toFixed(2)}
                        </h6>
                      )}
                    </div>
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
