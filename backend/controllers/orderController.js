const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// @desc    Get Orders by user
// @route   GET /api/Orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const Orders = await Order.find().sort({
    createdAt: "desc",
  });

  const Products = await Product.find().sort({
    createdAt: "desc",
  });

  // console.log(Products)

  let groupValues = Orders.reduce((order, key) => {
    order[key.orderID] = order[key.orderID] || [];

    // order[key.orderID].push({
    //   productID: key.productID,
    //   productType: key.productType,
    //   reviewed: key.reviewed,
    //   totalPrice: key.totalPrice,
    //   _id: key._id,
    // });

    order[key.orderID].push(key);
    
    return order;
  }, {});

  console.log(groupValues)

  let retData = Object.keys(groupValues).map((mkey) => {
    let total = 0;
    groupValues[mkey].forEach((order) => {
      total += order.totalPrice;
    });

    console.log(total)

    return { 
      orderID: mkey, 
      createdAt: groupValues[mkey][0].createdAt,
      orderDate: groupValues[mkey][0].orderDate,
      orderStatus: groupValues[mkey][0].orderStatus,
      receivedDate: groupValues[mkey][0].receivedDate,
      shippingDate: groupValues[mkey][0].shippingDate,
      updatedAt: groupValues[mkey][0].updatedAt,
      userID: groupValues[mkey][0].userID,
      orderTotal: total,
      products: groupValues[mkey]
    };
  });

  res.status(200).json(retData);
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
