import React from "react";
import { BsStarHalf, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";

//array of 5 items
const count = [1, 2, 3, 4, 5, 6, 7, 8];
const star = 2;

const Trending = () => {
  return (
    <div>
      <section className="trending-product section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Trending Product</h2>
                <p>Here are the trending products of the month.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {count.map((count, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-12">
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
        </div>
      </section>
    </div>
  );
};

export default Trending;
