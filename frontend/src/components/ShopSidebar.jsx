import { Link } from "react-router-dom";

//array of 5 items
const ShopSidebar = () => {
  return (
    <div>
      <div className="product-sidebar single-widget search">
        <h5>Search Product</h5>
        <hr></hr>
        <form className="sidebar-search-section" action="#">
          <input
            className="sidebar-search"
            type="text"
            placeholder="Search Here..."
          ></input>
          <button className="sidebar-submit" type="submit">
            <i className="lni lni-search-alt"></i>
          </button>
        </form>
      </div>

      <div className="product-sidebar">
        <h5>All Categories</h5>
        <hr></hr>
        <ul className="list">
          <li>
            <Link className="sidebar-nav" to="">
              Computers &amp; Accessories{" "}
            </Link>
            <span>(1138)</span>
          </li>
          <li>
            <Link className="sidebar-nav" to="">
              Smartphones &amp; Tablets
            </Link>
            <span>(2356)</span>
          </li>
          <li>
            <Link className="sidebar-nav" to="">
              TV, Video &amp; Audio
            </Link>
            <span>(420)</span>
          </li>
          <li>
            <Link className="sidebar-nav" to="">
              Cameras, Photo &amp; Video
            </Link>
            <span>(874)</span>
          </li>
          <li>
            <Link className="sidebar-nav" to="">
              Headphones
            </Link>
            <span>(1239)</span>
          </li>
          <li>
            <Link className="sidebar-nav" to="">
              Wearable Electronics
            </Link>
            <span>(340)</span>
          </li>
          <li>
            <Link className="sidebar-nav" to="">
              Printers &amp; Ink
            </Link>
            <span>(512)</span>
          </li>
        </ul>
      </div>

      <div className="product-sidebar single-widget condition">
        <h5>Filter by Price</h5>
        <hr></hr>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault1"
          ></input>
          <label className="sidebar-label form-check-label">
            $50 - $100L (208)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault2"
          ></input>
          <label className="sidebar-label form-check-label">
            $100L - $500 (311)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault3"
          ></input>
          <label className="sidebar-label form-check-label">
            $500 - $1,000 (485)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault4"
          ></input>
          <label className="sidebar-label form-check-label">
            $1,000 - $5,000 (213)
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
