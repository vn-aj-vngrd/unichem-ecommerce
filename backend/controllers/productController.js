const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Set Product
// @route   POST /api/Products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {

});

// @desc    Update Product
// @route   PUT /api/Products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {

});

// @desc    Delete Product
// @route   DELETE /api/Products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {

});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
