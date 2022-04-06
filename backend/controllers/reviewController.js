const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

// @desc    Get Reviews
// @route   GET /api/Reviews
// @access  Private
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ userID: req.user._id }).sort({
    createdAt: "desc",
  });

  let retData = [];
  for (let i = 0; i < reviews.length; i++) {
    let product = await Product.findById(reviews[i].productID);
    const temp = { ...reviews[i], product };
    retData.push(temp);
  }

  res.status(200).json(retData);
});

// @desc    Set Review
// @route   POST /api/Reviews
// @access  Private
const setReview = asyncHandler(async (req, res) => {
  const { productID } = req.body;

  const existingReview = await Review.findOne({
    productID,
    productType,
  });

  if (max == 0) {
    res.status(400);
    throw new Error("Product is not available");
  }

  // If review does not exist then create.
  if (!existingReview) {
    const newReview = await Review.create({
      userID: req.user._id,
      productID: productID,
      productType: productType,
      quantity: quantity,
    });
    return res.status(200).json(newReview);
  }

  // If review "current quantity + req quanity" is greater than max then throw error
  if (existingReview.quantity + quantity > max) {
    res.status(400);
    throw new Error("Product quantity exceeds maximum quantity");
  }

  // If review exists then update quantity
  const updatedReview = await Review.findOneAndUpdate(
    {
      productID,
      productType,
    },
    { quantity: existingReview.quantity + quantity },
    { new: true }
  );

  res.status(200).json(updatedReview);
});

// @desc    Update Review
// @route   PUT /api/Reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const _id = req.body.id;
  let existingReview = await Review.findById(_id);

  // Check for review
  if (!existingReview) {
    res.status(400);
    throw new Error("Review not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the review user
  if (existingReview.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update review
  const updatedReview = await Review.findByIdAndUpdate(
    _id,
    { quantity: req.body.quantity },
    { new: true }
  );

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

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the review user
  if (review.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await review.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Delete All Review
// @route   DELETE /api/Reviews/deleteAll
// @access  Private
const deleteAllReview = asyncHandler(async (req, res) => {
  const review = await Review.find({ userID: req.params.id });

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  for (let i = 0; i < review.length; i++) {
    await review[i].remove();
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
  deleteAllReview,
};
