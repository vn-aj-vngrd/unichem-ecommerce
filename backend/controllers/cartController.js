const asyncHandler = require("express-async-handler");

const Cart = require("../models/CartModel");
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
  return res.status(200).json({ message: "Cart created" });
});


// @desc    Delete Cart
// @route   DELETE /api/Carts/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {

});

module.exports = {
  getCarts,
  setCart,
  deleteCart,
};
