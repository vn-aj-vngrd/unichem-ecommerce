import React from "react";
import { Link } from "react-router-dom";

//array of 5 items
const Sidebar = () => {
  return (
    <div class="">
      <div class="product-sidebar single-widget search">
        <h5>Search Product</h5>
        <hr></hr>
        <form class="sidebar-search-section" action="#">
          <input class="sidebar-search" type="text" placeholder="Search Here..."></input>
          <button class="sidebar-submit" type="submit">
            <i class="lni lni-search-alt"></i>
          </button>
        </form>
      </div>

      <div class="product-sidebar">
        <h5>All Categories</h5>
        <hr></hr>
        <ul class="list">
          <li>
            <Link class="sidebar-nav" to="">Computers &amp; Accessories </Link>
            <span>(1138)</span>
          </li>
          <li>
            <Link class="sidebar-nav" to="">Smartphones &amp; Tablets</Link>
            <span>(2356)</span>
          </li>
          <li>
            <Link class="sidebar-nav" to="">TV, Video &amp; Audio</Link>
            <span>(420)</span>
          </li>
          <li>
            <Link class="sidebar-nav" to="">Cameras, Photo &amp; Video</Link>
            <span>(874)</span>
          </li>
          <li>
            <Link class="sidebar-nav" to="">Headphones</Link>
            <span>(1239)</span>
          </li>
          <li>
            <Link class="sidebar-nav" to="">Wearable Electronics</Link>
            <span>(340)</span>
          </li>
          <li>
            <Link class="sidebar-nav" to="">Printers &amp; Ink</Link>
            <span>(512)</span>
          </li>
        </ul>
      </div>

      

      <div class="product-sidebar single-widget condition">
        <h5>Filter by Price</h5>
        <hr></hr>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault1"
          ></input>
          <label class="sidebar-label form-check-label" for="flexCheckDefault1">
            $50 - $100L (208)
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault2"
          ></input>
          <label class="sidebar-label form-check-label" for="flexCheckDefault2">
            $100L - $500 (311)
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault3"
          ></input>
          <label class="sidebar-label form-check-label" for="flexCheckDefault3">
            $500 - $1,000 (485)
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault4"
          ></input>
          <label class="sidebar-label form-check-label" for="flexCheckDefault4">
            $1,000 - $5,000 (213)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
