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

// @desc    Update Cart
// @route   PUT /api/Carts/:id
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const Cart = await Cart.findById(req.params.id)

  if(!Cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  const user = await Cart.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the cart user
  if (Cart.userCart.toString() !== user.id) {
    res.status(401)
    throw new Error("User not authorized");
  }

  const updateCart = await Cart.findByIdAndUpdate(
    req.params.id,
    req.body, {
      new: true,
    }
  )

  res.status(200).json(updateCart);
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
