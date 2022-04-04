const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({
    createdAt: "desc",
  });
  return res.status(200).json(products);
});

// @desc    Set Product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (
    !req.body.productName ||
    !req.body.brand ||
    !req.body.category ||
    !req.body.types ||
    !req.body.specifications ||
    !req.body.quantities ||
    !req.body.prices ||
    !req.body.isSale ||
    !req.body.description ||
    !req.body.image ||
    !req.body.featured
  ) {
    res.status(400);
    throw new Error("Please enter a valid input for all fields.");
  }

  if (req.body.isSale == true && !req.body.salePrices) {
    res.status(400);
    throw new Error("Please enter a valid input for all fields.");
  }

  const product = await Product.create({
    productName: req.body.productName,
    brand: req.body.brand,
    category: req.body.category,
    types: req.body.types,
    specifications: req.body.specifications,
    quantities: req.body.quantities,
    prices: req.body.prices,
    salePrices: req.body.salePrices,
    isSale: req.body.isSale,
    description: req.body.description,
    image: req.body.image,
    featured: req.body.featured,
  });

  res.status(200).json(product);
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById({
    productID: req.body.productID,
    productType: req.body.productType,
  });

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if user is admin
  if (req.user.userType.toString() !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    {
      productID: req.body.productID,
      productType: req.body.productType,
    },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById({
    productID: req.body.productID,
    productType: req.body.productType,
  });

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check user
  const user = await user.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if user is admin
  if (req.user.userType.toString() !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Product.remove();
  res
    .status(200)
    .json({ productID: req.body.productID, productType: req.body.productType });
});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
