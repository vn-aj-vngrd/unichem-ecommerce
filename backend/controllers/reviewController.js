const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const moment = require("moment");

// @desc    Get Reviews by user
// @route   GET /api/reviews
// @access  Private
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({
    createdAt: "desc",
  });

  let retData = [];
  for (let i = 0; i < reviews.length; i++) {
    let product = await Product.findById(reviews[i].productID);
    let user = await User.findById(reviews[i].userID);
    const temp = { ...reviews[i], product, user };
    retData.push(temp);
  }

  res.status(200).json(retData);
  // res.status(200).json(reviews);
});

// @desc    Set Review
// @route   POST /api/reviews
// @access  Private
const setReview = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const userID = req.user._id;
  const { productID, subject, review, rating } = req.body;

  // Check if review exists
  const reviewExists = await Review.findOne({
    productID,
    userID,
  });

  if (reviewExists) {
    res.status(400);
    throw new Error("Review already exists");
  }

  // If review does not exist then create.
  const newReview = await Review.create({
    productID,
    userID,
    subject,
    review,
    rating,
  });
  return res.status(200).json(newReview);
});

// @desc    Update Review
// @route   PUT /api/reviews/
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const { productID } = req.body;
  let reviewExists = await Review.findOne({
    productID,
    userID,
  });

  console.log(userID);
  console.log(productID);

  // Check for review
  if (!reviewExists) {
    res.status(400);
    throw new Error("Review not found");
  }

  // Make sure the logged in user matches the review user
  if (reviewExists.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update review
  const updatedReview = await Review.findOneAndUpdate(
    {
      userID: userID,
      productID: productID,
    },
    req.body,
    { new: true }
  );

  console.log(updateReview);

  res.status(200).json(updatedReview);
});

// @desc    Delete Review
// @route   DELETE /api/Reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  // Check for review
  if (!review) {
    res.status(400);
    throw new Error("Review not found");
  }

  // Make sure the logged in user matches the review user
  if (review.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // CHECK IF DATE IS PAST 30

  await review.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
};
