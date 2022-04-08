const asyncHandler = require("express-async-handler");

const Order = require("../models/OrderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// @desc    Get Orders by user
// @route   GET /api/Orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const Orders = await Order.find().sort({
    createdAt: "desc",
  });

  let retData = [];
  for (let i = 0; i < Orders.length; i++) {
    let product = await Product.findById(Orders[i].productID);
    let user = await User.findById(Orders[i].userID);
    const temp = { ...Orders[i], product, user };
    retData.push(temp);
  }

  res.status(200).json(retData);
  // res.status(200).json(Orders);
});

// @desc    Set Order
// @route   POST /api/Orders
// @access  Private
const setOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const userID = req.user._id;
  const { productID, subject, Order, rating } = req.body;

  // Check if Order exists
  const OrderExists = await Order.findOne({
    productID,
    userID,
  });

  if (OrderExists) {
    res.status(400);
    throw new Error("Order already exists");
  }

  // If Order does not exist then create.
  const newOrder = await Order.create({
    productID,
    userID,
    subject,
    Order,
    rating,
  });
  return res.status(200).json(newOrder);
});

// @desc    Update Order
// @route   PUT /api/Orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const { productID } = req.body;
  let OrderExists = await Order.findOne({
    productID,
    userID,
  });

  // Check for Order
  if (!OrderExists) {
    res.status(400);
    throw new Error("Order not found");
  }

  // Make sure the logged in user matches the Order user
  if (OrderExists.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // CHECK IF DATE IS PAST 30

  // Update Order
  const updatedOrder = await Order.findOneAndUpdate(
    {
      userID: userID,
      productID: productID,
    },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedOrder);
});

// @desc    Delete Order
// @route   DELETE /api/Orders/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const Order = await Order.findById(req.params.id);

  // Check for Order
  if (!Order) {
    res.status(400);
    throw new Error("Order not found");
  }

  // Make sure the logged in user matches the Order user
  if (Order.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // CHECK IF DATE IS PAST 30

  await Order.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrders,
  setOrder,
  updateOrder,
  deleteOrder,
};
