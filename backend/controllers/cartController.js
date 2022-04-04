const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// @desc    Get Carts
// @route   GET /api/Carts
// @access  Private
const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ userID: req.user._id }); //.sort({
  //   createdAt: "desc",
  // });

  let retData = [];
  for (let i = 0; i < carts.length; i++) {
    let product = await Product.findById(carts[i].productID);
    const temp = { ...carts[i], product };
    retData.push(temp);
  }

  res.status(200).json(retData);
});

// @desc    Set Cart
// @route   POST /api/Carts
// @access  Private
const setCart = asyncHandler(async (req, res) => {
  const { productID, productType } = req.body;

  const existingCart = await Cart.findOne({
    productID,
    productType,
  });

  // If cart does not exist then create.
  if (!existingCart) {
    const newCart = await Cart.create({
      userID: req.user._id,
      productID: req.body.productID,
      productType: req.body.productType,
      quantity: req.body.quantity,
    });
    return res.status(200).json(newCart);
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
    { quantity: existingCart.quantity + req.body.quantity },
    { new: true }
  );

  res.status(200).json(updatedCart);
});

// @desc    Update Cart
// @route   PUT /api/Carts/:id
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const _id = req.body.id;
  let existingCart = await Cart.findById(_id);

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
  const updatedCart = await Cart.findByIdAndUpdate(
    _id,
    { quantity: req.body.quantity },
    { new: true }
  );

  res.status(200).json(updatedCart);
});

// @desc    Delete Cart
// @route   DELETE /api/Carts/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  // Check for cart
  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the cart user
  if (cart.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await cart.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Delete All Cart
// @route   DELETE /api/Carts/deleteAll
// @access  Private
const deleteAllCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ userID: req.params.id });

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  for (let i = 0; i < cart.length; i++) {
    await cart[i].remove();
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCarts,
  setCart,
  updateCart,
  deleteCart,
  deleteAllCart,
};
