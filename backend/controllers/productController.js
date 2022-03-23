const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const { use } = require("../routes/userRoutes");

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
  if (!req.body.productName 
      || !req.body.brand 
      || !req.body.category 
      || !req.body.description
      || !req.body.image 
      || !req.body.specifications 
      || !req.body.featured 
      || !req.body.types
      || !req.body.quantities 
      || !req.body.price) {
    res.status(400);
    throw new Error('Please enter a valid input for all fields.');
  }
  
  const product = await Product.create({
    brand: req.body.brand,
    productName: req.body.productName,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    specifications: req.body.specifications,
    featured: req.body.featured,
    types: req.body.types,
    quantities: req.body.quantities,
    price: req.body.price,
  })
  
  res.status(200).json(product);

});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if(!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check user
  const user = await user.findById(req.user.id);
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if user is admin
  if (user.userType.toString() !== "Manager") {
    res.status(401);
    throw new Error("User not authorized");
  }
  
  const updatedProduct = await Product.findByIdAndUpdate( req.params.id,
    req.body, {
      new: true,
    });

  res.status(200).json(updatedProduct);
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if(!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check user
  const user = await user.findById(req.user.id);
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check if user is admin
  if (user.userType.toString() !== "Manager") {
    res.status(401);
    throw new Error("User not authorized");
  }
  
  await Product.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
