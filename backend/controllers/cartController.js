const asyncHandler = require("express-async-handler");

const cart = require("../models/cartModel");

// @desc    Get all carts
// @route   GET /api/carts
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  // const carts = await cart.find();
  // return res.status(200).json(carts);
});

// @desc    Set cart
// @route   POST /api/carts
// @access  Private
const setCartItem = asyncHandler(async (req, res) => {});

// @desc    Update cart
// @route   PUT /api/carts/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {});

// @desc    Delete cart
// @route   DELETE /api/carts/:id
// @access  Private
const deleteCartItems = asyncHandler(async (req, res) => {});

module.exports = {
  getCartItems,
  setCartItem,
  updateCartItem,
  deleteCartItems,
};
