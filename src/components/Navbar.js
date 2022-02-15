import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Uni<span class="text-danger fw-bold">Chem</span>.
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/products">
                  Products
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>

            <div class="d-flex me-3">
              <Link to="/cart" class="text-decoration-none ">
                <AiOutlineShoppingCart class="mt-2 h4 text-danger" />
              </Link>
            </div>

            <div class="d-flex me-2">
                <Link to="/login" class="text-decoration-none text-muted">LOG IN</Link>
            </div>

            <span class="me-2 text-muted">|</span>

            <div class="d-flex me-2">
                <Link to="/signup" class="text-decoration-none text-muted">SIGN UP</Link>
            </div>
          </div>
        </div>
      </nav>
      <hr></hr>
    </div>
  );
};

export default Navbar;
