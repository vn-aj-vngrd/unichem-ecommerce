import { useEffect, useState } from "react"; //useRef
import { useParams } from "react-router-dom";
import Product from "../../components/Product";
// import Sidebar from "../../components/Sidebar";

const Products = () => {
  useEffect(() => {
    document.title = "Unichem Store | Products";
  });

  const [range1, setRange1] = useState(false);
  const [range2, setRange2] = useState(false);
  const [range3, setRange3] = useState(false);
  const [range4, setRange4] = useState(false);

  let { productName } = useParams();
  let { categoryName } = useParams();
  let { brandName } = useParams();

  // const [searchData, setSearchData] = useState(productName);
  // const searchRef = useRef();

  return (
    <div>
      <div className="container main-product-section">
        <div>
          {/* <div className="product-sidebar single-widget search">
            <h5>Search Product</h5>
            <hr></hr>
            <div className="sidebar-search-section" action="#">
              <input
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                className="sidebar-search"
                type="text"
                placeholder="Search Here..."
              ></input>
              <button className="sidebar-submit" type="submit">
                <i className="lni lni-search-alt"></i>
              </button>
            </div>
          </div> */}

          <div className="product-sidebar single-widget condition">
            <h5>Filter by Price</h5>
            <hr></hr>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault1"
                onChange={() => setRange1(!range1)}
              ></input>
              <label className="sidebar-label form-check-label">
                ₱ 50 - ₱ 100
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault2"
                onChange={() => setRange2(!range2)}
              ></input>
              <label className="sidebar-label form-check-label">
                ₱ 101 - ₱ 500
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault3"
                onChange={() => setRange3(!range3)}
              ></input>
              <label className="sidebar-label form-check-label">
                ₱ 501 - ₱ 1,000
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault4"
                onChange={() => setRange4(!range4)}
              ></input>
              <label className="sidebar-label form-check-label">
                ₱ 1,001 - ₱ 5,000
              </label>
            </div>
          </div>
        </div>

        <div className="spacer"></div>
        <Product
          productName={productName}
          categoryName={categoryName}
          brandName={brandName}
          range1={range1}
          range2={range2}
          range3={range3}
          range4={range4}
        />
      </div>
    </div>
  );
};

export default Products;
