import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProduct } from "../features/products/productSlice";
import Star from "./Star";
import Spinner from "./Spinner";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const Product = ({
  productName,
  categoryName,
  brandName,
  filters,
  setFilters,
}) => {
  const dispatch = useDispatch();
  const [sortDefault, setSortDefault] = useState("none");
  const [pageNumber, setPageNumber] = useState(0);
  let isFiltered = false;
  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  if (!filters.range && !filters.rating !== 0) {
    isFiltered = false;
  }

  useEffect(() => {
    if (isProductError) {
      toast.error(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [isProductError, productMessage, dispatch]);

  const options = [
    {
      label: "High - Low Sales",
      value: "highLowSales",
    },
    {
      label: "Low - High Sales",
      value: "lowHighSales",
    },
    {
      label: "A - Z Order",
      value: "descendingOrder",
    },
    {
      label: "Z - A Order",
      value: "ascendingOrder",
    },
    {
      label: "Low - High Price",
      value: "lowHighPrice",
    },
    {
      label: "High - Low Price",
      value: "highLowPrice",
    },
  ];

  // Pagination
  const productsPerPage = 12;
  const pagesVisited = pageNumber * productsPerPage;

  // Pagination
  let preFilteredProducts = JSON.parse(JSON.stringify(products));
  let allProducts = JSON.parse(JSON.stringify(products));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (productName) {
    productName = productName.replaceAll("_", " ");

    allProducts = products.filter((product) => {
      return (
        product._doc.productName.toLowerCase() === productName.toLowerCase()
      );
    });

    preFilteredProducts = [...allProducts];
  }

  if (categoryName) {
    categoryName = categoryName.replaceAll("_", " ");

    allProducts = products.filter((product) => {
      return product._doc.category.toLowerCase() === categoryName.toLowerCase();
    });

    preFilteredProducts = [...allProducts];
  }

  if (brandName) {
    brandName = brandName.replaceAll("_", " ");

    allProducts = products.filter((product) => {
      return product._doc.brand.toLowerCase() === brandName.toLowerCase();
    });

    preFilteredProducts = [...allProducts];
  }

  // console
  // Price Range Filters
  if (filters.minRange || filters.maxRange) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return (
            product._doc.prices[0] -
              product._doc.prices[0] * (product._doc.salePercent / 100) >=
              filters.minRange &&
            product._doc.prices[0] -
              product._doc.prices[0] * (product._doc.salePercent / 100) <=
              filters.maxRange
          );
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return (
          product._doc.prices[0] -
            product._doc.prices[0] * (product._doc.salePercent / 100) >=
            filters.minRange &&
          product._doc.prices[0] -
            product._doc.prices[0] * (product._doc.salePercent / 100) <=
            filters.maxRange
        );
      });
      isFiltered = true;
    }
  }

  // Rating Filters
  if (filters.rating !== 0) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings >= filters.rating;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings >= filters.rating;
      });
      isFiltered = true;
    }
  }

  //Ready Stock Filters
  if (filters.readyStock) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return !product._doc.quantities.includes(0);
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return !product._doc.quantities.includes(0);
      });
      isFiltered = true;
    }
  }

  //With Discount Filters
  if (filters.withDiscount) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product._doc.salePercent > 0;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product._doc.salePercent > 0;
      });
      isFiltered = true;
    }
  }

  if (allProducts) {
    switch (sortDefault) {
      case "lowHighSales":
        allProducts.sort((a, b) => b.market.sold - a.market.sold);
        break;
      case "ascendingOrder":
        allProducts.sort((a, b) =>
          a._doc.productName
            .toLowerCase()
            .localeCompare(b._doc.productName.toLowerCase())
        );
        break;
      case "descendingOrder":
        allProducts.sort((a, b) =>
          b._doc.productName
            .toLowerCase()
            .localeCompare(a._doc.productName.toLowerCase())
        );
        break;
      case "lowHighPrice":
        allProducts.sort(
          (a, b) =>
            a._doc.prices[0] -
            (a._doc.prices[0] * a._doc.salePercent) / 100 -
            (b._doc.prices[0] - (b._doc.prices[0] * b._doc.salePercent) / 100)
        );
        break;
      case "highLowPrice":
        allProducts.sort(
          (a, b) =>
            b._doc.prices[0] -
            b._doc.prices[0] * b._doc.salePercent -
            (a._doc.prices[0] - a._doc.prices[0] * a._doc.salePercent)
        );
        break;
      default:
        allProducts.sort((a, b) => a.market.sold - b.market.sold);
        break;
    }
  }

  const pageCount = Math.ceil(allProducts.length / productsPerPage);
  allProducts = allProducts.slice(pagesVisited, pagesVisited + productsPerPage);
  let salesPrice = 0;

  const removeAllFilter = () => {
    removeRangeFilter();
    removeRatingFilter();
    removeReadyStockFilter();
    removeWithDiscountFilter();
  };

  const removeRangeFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      range: false,
      minRange: 0,
      maxRange: 0,
    }));
  };

  const removeRatingFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      rating: 0,
    }));
  };

  const removeReadyStockFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      readyStock: false,
    }));
  };

  const removeWithDiscountFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      withDiscount: false,
    }));
  };

  return (
    <div>
      <>
        {isProductLoading ? (
          <Spinner />
        ) : (
          <div className="product">
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
              {allProducts.length} items
            </div>

            {isFiltered && (
              <div className="filters-breadcrumbs">
                {filters.range && (
                  <div className="one-filter">
                    <p>
                      ₱: {filters.minRange} - {filters.maxRange}
                    </p>
                    <div className="one-filter-dequeue">
                      <i
                        className="btn lni lni-close"
                        onClick={removeRangeFilter}
                      ></i>
                    </div>
                  </div>
                )}

                {filters.rating !== 0 && (
                  <div className="one-filter">
                    <p>{filters.rating}+ Stars</p>
                    <div className="one-filter-dequeue">
                      <i
                        className="btn lni lni-close"
                        onClick={removeRatingFilter}
                      ></i>
                    </div>
                  </div>
                )}

                {filters.readyStock && (
                  <div className="one-filter">
                    <p>Ready Stock</p>
                    <div className="one-filter-dequeue">
                      <i
                        className="btn lni lni-close"
                        onClick={removeReadyStockFilter}
                      ></i>
                    </div>
                  </div>
                )}

                {filters.withDiscount && (
                  <div className="one-filter">
                    <p>With Discount</p>
                    <div className="one-filter-dequeue">
                      <i
                        className="btn lni lni-close"
                        onClick={removeWithDiscountFilter}
                      ></i>
                    </div>
                  </div>
                )}

                <p className="btn clear-all-filter" onClick={removeAllFilter}>
                  Clear All
                </p>
              </div>
            )}

            <div className="row">
              {allProducts.length > 0 ? (
                allProducts.map((product) => (
                  <div
                    key={product._doc._id}
                    className="col-lg-4 col-md-6 col-12 "
                  >
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
                            src={product._doc.images[0]}
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
                          <div>
                            <span className="category">
                              <i className="lni lni-package category-icon"></i>{" "}
                              {product._doc.category}
                            </span>
                            <div className="title">
                              <h5 className="product-name">
                                {product._doc.productName.slice(0, 40)}
                              </h5>
                            </div>
                          </div>
                          <Star
                            star={product.market.averageRatings}
                            reviews={product.market.reviewsCount}
                          />
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
                          <div className="items-sold">
                            {product.market.sold} sold
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="empty-result">
                    <div className="products">
                      <h4>No items to display</h4>
                    </div>
                  </div>
                </>
              )}
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
        )}
      </>
    </div>
  );
};

export default Product;
