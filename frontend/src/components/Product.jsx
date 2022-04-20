import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProduct } from "../features/products/productSlice";
import Star from "./Star";
import Spinner from "./Spinner";
import ReactPaginate from "react-paginate";

const Product = ({ productName, categoryName, brandName, filters }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortDefault, setSortDefault] = useState("none");
  const [pageNumber, setPageNumber] = useState(0);
  let isFiltered = false;
  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useMemo(() => {
    if (
      !filters.range1 ||
      !filters.range2 ||
      !filters.range3 ||
      !filters.range4 ||
      !filters.rating0 ||
      !filters.rating1 ||
      !filters.rating2 ||
      !filters.rating3 ||
      !filters.rating4 ||
      !filters.rating5
    ) {
      isFiltered = false;
    }
  }, [filters]);

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
    return (
      <>
        <div className="empty-container"></div>
        <Spinner />
      </>
    );
  }

  const options = [
    {
      label: "None",
      value: "none",
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
    // console.log(productName);

    allProducts = products.filter((product) => {
      return product._doc.productName
        .toLowerCase()
        .includes(productName.toLowerCase());
    });

    preFilteredProducts = [...allProducts];
  }

  if (categoryName) {
    categoryName = categoryName.replaceAll("_", " ");
    // console.log(categoryName);

    allProducts = products.filter((product) => {
      return product._doc.category
        .toLowerCase()
        .includes(categoryName.toLowerCase());
    });

    preFilteredProducts = [...allProducts];
  }

  if (brandName) {
    brandName = brandName.replaceAll("_", " ");
    // console.log(brandName);

    allProducts = products.filter((product) => {
      return product._doc.brand.toLowerCase().includes(brandName.toLowerCase());
    });

    preFilteredProducts = [...allProducts];
  }

  // Price Range Filters
  if (filters.range1) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product._doc.prices[0] >= 50 && product._doc.prices[0] <= 100;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product._doc.prices[0] >= 50 && product._doc.prices[0] <= 100;
      });
      isFiltered = true;
    }
  }

  if (filters.range2) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product._doc.prices[0] >= 101 && product._doc.prices[0] <= 500;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product._doc.prices[0] >= 101 && product._doc.prices[0] <= 500;
      });
      isFiltered = true;
    }
  }

  if (filters.range3) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return (
            product._doc.prices[0] >= 501 && product._doc.prices[0] <= 1000
          );
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product._doc.prices[0] >= 501 && product._doc.prices[0] <= 1000;
      });
      isFiltered = true;
    }
  }

  if (filters.range4) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return (
            product._doc.prices[0] >= 1001 && product.market.prices[0] <= 5000
          );
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return (
          product._doc.prices[0] >= 1001 && product.market.prices[0] <= 5000
        );
      });
      isFiltered = true;
    }
  }

  // Rating Filters
  if (filters.rating0) {
    {
      console.log("filtered" + isFiltered);
    }
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings === 0;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings === 0;
      });
      isFiltered = true;
    }
  }

  if (filters.rating1) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings === 1;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings === 1;
      });
      isFiltered = true;
    }
  }

  if (filters.rating2) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings === 2;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings === 2;
      });
      isFiltered = true;
    }
  }

  if (filters.rating3) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings === 3;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings === 3;
      });
      isFiltered = true;
    }
  }

  if (filters.rating4) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings === 4;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings === 4;
      });
      isFiltered = true;
    }
  }

  if (filters.rating5) {
    if (isFiltered) {
      allProducts = allProducts.concat(
        preFilteredProducts.filter((product) => {
          return product.market.averageRatings === 5;
        })
      );
    } else {
      allProducts = preFilteredProducts.filter((product) => {
        return product.market.averageRatings === 5;
      });
      isFiltered = true;
    }
  }

  // Sort
  console.log(sortDefault);
  console.log(allProducts);
  if (allProducts) {
    switch (sortDefault) {
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
      case "lowHigh":
        allProducts.sort(
          (a, b) =>
            a._doc.prices[0] -
            a._doc.prices[0] * a._doc.salePercent -
            (b._doc.prices[0] - b._doc.prices[0] * b._doc.salePercent)
        );
        break;
      case "highLow":
        allProducts.sort(
          (a, b) =>
            b._doc.prices[0] -
            b._doc.prices[0] * b._doc.salePercent -
            (a._doc.prices[0] - a._doc.prices[0] * a._doc.salePercent)
        );
        break;
      default:
        allProducts.sort((a, b) =>
          a._doc.productName
            .toLowerCase()
            .localeCompare(b._doc.productName.toLowerCase())
        );
        break;
    }
  }

  const pageCount = Math.ceil(allProducts.length / productsPerPage);
  allProducts = allProducts.slice(pagesVisited, pagesVisited + productsPerPage);
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
                    <span className="category">
                      <i className="lni lni-package category-icon"></i>{" "}
                      {product._doc.category}
                    </span>
                    <div className="title">
                      <h5 className="product-name">
                        {product._doc.productName}
                      </h5>
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
                    <div className="items-sold">{product.market.sold} sold</div>
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
