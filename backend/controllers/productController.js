const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
});

// @desc    Set Product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  // if (!req.body.productName || !req.body.brand || !req.body.category || !req.body.description
  //   || !req.body.image || !req.body.specifications || !req.body.featured || !req.body.types
  //   || !req.body.quantities || !req.body.price) {
  //     res.status(400);
  //     throw new Error('Please enter a valid input for all fields.');
  //   }
  //   const product = await Product.create({
  //     productName: req.body.productName,
  //     brand: req.body.brand,
  //     category: req.body.category,
  //     description: req.body.description,
  //     image: req.body.image,
  //     specifications: req.body.specifications,
  //     featured: req.body.featured,
  //     types: req.body.types,
  //     quantities: req.body.quantities,
  //     price: req.body.price,
  //   })
  //   res.status(200).json(product);
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
