const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");
const User = require("../models/userModel");

// @desc    Get Carts
// @route   GET /api/Carts
// @access  Private
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ user: req.user.id });

  res.status(200).json(carts);
});

// @desc    Set Cart
// @route   POST /api/Carts
// @access  Private
const setCart = asyncHandler(async (req, res) => {
  const existingCart = await Cart.findOne({
    productID: req.body.productID,
    productType: req.body.productType,
  });

  // If cart does not exist then create.
  if (!existingCart) {
    const newCart = await Cart.create({
      userID: req.user.id,
      productID: req.body.productID,
      productType: req.body.productType,
      quantity: req.body.quantity,
    });
    res.status(200).json(newCart);
  }

  // If cart "current quantity + req quanity" is greater than max then throw error
  if (existingCart.quantity + req.body.quantity > req.body.max) {
    res.status(400);
    throw new Error("Product quantity exceeds maximum quantity");
  }

  // If cart exists then update quantity
  const updatedCart = await Cart.findOneAndUpdate(
    {
      productID: req.body.productID,
      productType: req.body.productType,
    },
    { quantity: existingCart.quantity + req.body.quantity }
  );

  res.status(200).json(updatedCart);
});

// @desc    Update Cart
// @route   PUT /api/Carts/:id
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const existingCart = await Cart.findById({
    productID: req.body.productID,
    productType: req.body.productType,
  });

  // Check for cart
  if (!existingCart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the cart user
  if (existingCart.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update cart
  const updatedCart = await Cart.findOneAndUpdate(
    {
      productID: req.body.productID,
      productType: req.body.productType,
    },
    { quantity: req.body.quantity }
  );

  res.status(200).json(updatedCart);
});

// @desc    Delete Cart
// @route   DELETE /api/Carts/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
  const existingCart = await Cart.findById({
    productID: req.body.productID,
    productType: req.body.productType,
  });

  // Check for cart
  if (!existingCart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the cart user
  if (existingCart.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await existingCart.remove();

  res
    .status(200)
    .json({ productID: req.body.productID, productType: req.body.productType });
});

module.exports = {
  getCarts,
  setCart,
  updateCart,
  deleteCart,
};
