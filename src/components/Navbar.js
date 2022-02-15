import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
  return (
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Uni<span class="text-danger">Chem</span>.
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
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to="/">
                      Action
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link class="nav-link"  to="/about">
                  About
                </Link>
              </li>
            </ul>

            <div class="d-flex">
              <Link to="/cart" class="text-decoration-none ">
                <AiOutlineShoppingCart class="mt-1 h2 text-white rounded-circle bg-danger p-1" />
              </Link>
              <div class="dropdown">
                <AiOutlineLogin
                  class="dropdown-toggle mt-1 h2 text-white rounded-circle bg-primary p-1 ms-2"
                  id="dropdownMenuButton1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
    
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link class="dropdown-item text-center" to="/">
                      Login Account
                    </Link>
                  </li>
                  <hr class="dropdown-divider" />
                  <li>
                    <Link class="dropdown-item text-center" to="/">
                      Create Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr></hr>
    </div>
  );
};

export default Navbar;
