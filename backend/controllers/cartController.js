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
  let cart;
  const cartExists = await Cart.findOneAndUpdate(
    { productID: req.body.productID, productType: req.body.productType },
    { quantity: req.body.quantity }
  );

  if (!cartExists) {
    cart = await Cart.create({
      userCart: req.user.id,
      productID: req.body.productID,
      productType: req.body.productType,
      quantity: req.body.quantity,
    });
    return res.status(200).json(cart);
  } else {
    return res.status(200).json(cartExists);
  }
});

// @desc    Delete Cart
// @route   DELETE /api/Carts/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {});

module.exports = {
  getCarts,
  setCart,
  deleteCart,
};
