const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");

// @desc    Get all carts
// @route   GET /api/carts
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  return res.status(200).json(carts);
});

// @desc    Create cart
// @route   POST /api/carts
// @access  Private
const createCartItem = asyncHandler(async (req, res) => {});

// @desc    Delete cart
// @route   DELETE /api/carts/:id
// @access  Private
const deleteCartItem = asyncHandler(async (req, res) => {});

module.exports = {
  getCartItems,
  createCartItem,
  deleteCartItem,
};
