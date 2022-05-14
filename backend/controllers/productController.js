const asyncHandler = require("express-async-handler");
const fs = require("fs");

const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const Order = require("../models/orderModel");
const Orderline = require("../models/orderlineModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({
    createdAt: "desc",
  });
  const productCount = await Product.count();

  if (productCount < 0) {
    res.status(200).json({});
  }

  let retData = [];
  for (let i = 0; i < products.length; i++) {
    const reviews = await Review.find({ productID: products[i]._id });
    const orderlines = await Orderline.find({ productID: products[i]._id });

    const reviewCount = await Review.find({
      productID: products[i]._id,
    }).count();
    const orderlineCount = await Orderline.find({
      productID: products[i]._id,
    }).count();

    let market = {
      reviewsCount: 0,
      averageRatings: 0,
      sold: 0,
    };

    for (let j = 0; j < reviews.length; j++) {
      market.averageRatings += reviews[j].rating;
    }

    if (orderlineCount > 0) {
      for (let k = 0; k < orderlines.length; k++) {
        const order = await Order.findById(orderlines[k].orderID);
        if (order) {
          if (order.orderStatus === "Completed") {
            market.sold += orderlines[k].quantity;
          }
        }
      }
    }

    if (reviewCount > 0) {
      market.reviewsCount = reviews.length;
      market.averageRatings = market.averageRatings / reviews.length;
    }

    const productAndReviews = { ...products[i], market };
    retData.push(productAndReviews);
  }
  res.status(200).json(retData);
});

// @desc    Get one product
// @route   GET /api/products/getOneProduct
// @access  Public
const getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(200).json({});
  }

  let retData = [];

  const reviews = await Review.find({ productID: product._id });
  const orderlines = await Orderline.find({ productID: product._id });

  const reviewCount = await Review.find({
    productID: product._id,
  }).count();
  const orderlineCount = await Orderline.find({
    productID: product._id,
  }).count();

  let market = {
    reviewsCount: 0,
    averageRatings: 0,
    sold: 0,
  };

  for (let j = 0; j < reviews.length; j++) {
    market.averageRatings += reviews[j].rating;
  }

  if (orderlineCount > 0) {
    for (let k = 0; k < orderlines.length; k++) {
      const order = await Order.findById(orderlines[k].orderID);
      if (order) {
        if (order.orderStatus === "Delivered") {
          market.sold += orderlines[k].quantity;
        }
      }
    }
  }

  if (reviewCount > 0) {
    market.reviewsCount = reviews.length;
    market.averageRatings = market.averageRatings / reviews.length;
  }

  const productAndReviews = { ...product, market };
  retData.push(productAndReviews);

  res.status(200).json(retData);
});

// @desc    Get featured products
// @route   GET /api/products/getFeaturedProducts
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).sort({
    createdAt: "desc",
  });
  const productCount = await Product.count();

  if (productCount < 0) {
    res.status(200).json({});
  }

  let retData = [];
  for (let i = 0; i < products.length; i++) {
    const reviews = await Review.find({ productID: products[i]._id });
    const orderlines = await Orderline.find({ productID: products[i]._id });

    const reviewCount = await Review.find({
      productID: products[i]._id,
    }).count();
    const orderlineCount = await Orderline.find({
      productID: products[i]._id,
    }).count();

    let market = {
      reviewsCount: 0,
      averageRatings: 0,
      sold: 0,
    };

    for (let j = 0; j < reviews.length; j++) {
      market.averageRatings += reviews[j].rating;
    }

    if (orderlineCount > 0) {
      for (let k = 0; k < orderlines.length; k++) {
        const order = await Order.findById(orderlines[k].orderID);
        if (order) {
          if (order.orderStatus === "Delivered") {
            market.sold += orderlines[k].quantity;
          }
        }
      }
    }

    if (reviewCount > 0) {
      market.reviewsCount = reviews.length;
      market.averageRatings = market.averageRatings / reviews.length;
    }

    const productAndReviews = { ...products[i], market };
    retData.push(productAndReviews);
  }

  res.status(200).json(retData);
});

// @desc    Set Product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  // Check user
  if (!req.user) {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(400);
    throw new Error("User not found");
  }

  // Check for user
  if (!req.user) {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user is not an admin
  if (req.user.userType !== "admin") {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(401);
    throw new Error("User not authorized");
  }

  if (!req.files) {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(401);
    throw new Error("There was a problem uploading the image");
  }

  const existingProduct = await Product.findOne({
    productName: req.body.productName,
  });

  if (existingProduct) {
    res.status(400);
    throw new Error("Product name already exists.");
  }

  let tempFiles = [];
  const destination = "frontend\\public";
  for (let i = 0; i < req.files.length; i++) {
    console.log(req.files[i].path.slice(destination.length));
    tempFiles.push(req.files[i].path.slice(destination.length));
  }

  console.log(req.body);
  let tempQuantities = [];
  req.body.quantities.split(",").forEach((quantity) => {
    tempQuantities.push(parseFloat(quantity));
  });

  let tempPrices = [];
  req.body.prices.split(",").forEach((price) => {
    tempPrices.push(parseFloat(price));
  });

  const product = await Product.create({
    productName: req.body.productName,
    brand: req.body.brand,
    category: req.body.category,
    types: req.body.types,
    specifications: req.body.specifications,
    quantities: tempQuantities,
    prices: tempPrices,
    // salePrices: req.body.salePrices,
    isSale: req.body.isSale,
    salePercent: req.body.salePercent,
    description: req.body.description,
    images: tempFiles,
    featured: req.body.featured,
  });

  let market = {
    reviewsCount: 0,
    averageRatings: 0,
    sold: 0,
  };

  let retData = {
    market: market,
    _doc: product,
  };

  console.log(retData);
  res.status(200).json(retData);
});

// @desc    Update Product
// @route   PUT /api/products/updateProduct
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body._id);

  if (!product) {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(400);
    throw new Error("Product not found");
  }

  // Check user
  if (!req.user) {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(400);
    throw new Error("User not found");
  }

  // Check if user is not an admin
  if (req.user.userType !== "admin") {
    for (let i = 0; i < req.files.length; i++) {
      let removeImagePath = req.files[i].path;
      if (removeImagePath) {
        if (fs.existsSync(removeImagePath)) {
          fs.unlinkSync(removeImagePath);
        }
      }
    }
    res.status(401);
    throw new Error("User not authorized");
  }

  console.log(product.images);
  let tempFiles = [];
  const destination = "frontend\\public";

  if (req.files.length > 0) {
    for (let i = 0; i < product.images.length; i++) {
      let removeImagePath = product.images[i];
      console.log(removeImagePath);
      if (removeImagePath) {
        if (fs.existsSync(destination + removeImagePath)) {
          fs.unlinkSync(destination + removeImagePath);
        }
      }
    }

    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i].path);
      tempFiles.push(req.files[i].path.slice(destination.length));
    }
  } else {
    tempFiles = product.images;
  }

  let tempQuantities = [];
  req.body.quantities.split(",").forEach((quantity) => {
    tempQuantities.push(parseFloat(quantity));
  });

  let tempPrices = [];
  req.body.prices.split(",").forEach((price) => {
    tempPrices.push(parseFloat(price));
  });

  const updatedProduct = await Product.findByIdAndUpdate(
    {
      _id: req.body._id,
    },
    {
      productName: req.body.productName,
      brand: req.body.brand,
      category: req.body.category,
      types: req.body.types,
      specifications: req.body.specifications,
      quantities: tempQuantities,
      prices: tempPrices,
      // salePrices: req.body.salePrices,
      isSale: req.body.isSale,
      salePercent: req.body.salePercent,
      description: req.body.description,
      images: tempFiles,
      featured: req.body.featured,
    },
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user is admin
  if (req.user.userType.toString() !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  const destination = "frontend\\public";
  if (product.images.length > 0) {
    for (let i = 0; i < product.images.length; i++) {
      let removeImagePath = product.images[i];
      console.log(removeImagePath);
      if (removeImagePath) {
        if (fs.existsSync(destination + removeImagePath)) {
          fs.unlinkSync(destination + removeImagePath);
        }
      }
    }
  }

  await product.remove();
  res.status(200).json({ _id: req.params.id });
});

module.exports = {
  getProducts,
  getOneProduct,
  getFeaturedProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
