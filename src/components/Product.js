import React from "react";
import { BsStarHalf, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";

//array of 5 items
const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const star = 2;

const Construction = () => {
  return (
    <div>
      <div class="Construction-product">
        <div class="product-grid">
          <label class="sort-element" for="sorting">Sort by: </label>
          <select class="form-control sort-element" id="sorting">
            <option>Popularity</option>
            <option>Low - High Price</option>
            <option>High - Low Price</option>
            <option>Average Rating</option>
            <option>A - Z Order</option>
            <option>Z - A Order</option>
          </select>
          
            Showing: <span>1 - 12 items</span>
        </div>
      </div>

      <section className="Construction-product">
        <div className="">
          <div className="row">
            {count.map((count, index) => (
              <div key={index} className="col-lg-4">
                <div className="single-product">
                  <div className="product-image">
                    <img src="assets/images/products/product-1.jpg" alt="#" />
                    <div className="button">
                      <a href="product-details.html" className="btn">
                        <i className="lni lni-cart"></i> Add to Cart
                      </a>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="category">Test</span>
                    <h4 className="title">
                      <Link to="/product-details">Test</Link>
                    </h4>

                    {star === 5 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star < 5 && star > 4 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStarHalf className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star === 4 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star < 4 && star > 3 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStarHalf className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star === 3 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star < 3 && star > 2 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStarHalf className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star === 2 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star < 2 && star > 1 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStarHalf className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star === 1 && (
                      <ul className="review">
                        <li>
                          <BsFillStarFill className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star < 1 && star > 0 && (
                      <ul className="review">
                        <li>
                          <BsStarHalf className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    {star === 0 && (
                      <ul className="review">
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>
                        <li>
                          <BsStar className="text-warning" />
                        </li>

                        <li>
                          <span>{star} Review(s)</span>
                        </li>
                      </ul>
                    )}

                    <div className="price">
                      <span>₱199.00</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav aria-label="Page navigation example">
            <ul class="product-pagination pagination justify-content-center">
              <li class="page-item disabled">
                <a
                  class="page-link"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Construction;
