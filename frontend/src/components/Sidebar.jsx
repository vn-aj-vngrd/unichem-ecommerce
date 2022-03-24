import { Link } from "react-router-dom";
import { useState } from "react";

//array of 5 items
const Sidebar = (props) => {
  
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


      <div className="product-sidebar single-widget condition">
        <h5>Filter by Price</h5>
        <hr></hr>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="true"
            id="flexCheckDefault1"
            onChange = {event => props.onChange(event.target.value)}
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
            // onChange={range2}
          ></input>
          <label className="sidebar-label form-check-label">
            $100L - $500 (311)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="true"
            id="flexCheckDefault3"
            // onChange={range3}
          ></input>
          <label className="sidebar-label form-check-label">
            $500 - $1,000 (485)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="true"
            id="flexCheckDefault4"
            // onChange={range4}
          ></input>
          <label className="sidebar-label form-check-label">
            $1,000 - $5,000 (213)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
