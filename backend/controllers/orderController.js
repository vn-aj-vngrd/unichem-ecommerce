const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Orderline = require("../models/orderlineModel");
const Couponlog = require("../models/couponlogModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// @desc    Set Order
// @route   POST /api/orders
// @access  Private
const setOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Access Denied");
  }

  // Create Order
  const newOrder = await Order.create({
    userID: req.user._id,
    orderDiscount: req.body.order.orderDiscount,
    shippingDiscount: req.body.order.shippingDiscount,
    shippingFee: req.body.order.shippingFee,
    totalPrice: req.body.order.totalPrice,
    orderStatus: req.body.order.orderStatus,
    statusDates: req.body.order.statusDates,
    paymentMethod: req.body.order.paymentMethod,
  });

  // console.log(req.body.orderlines);

  // Create Orderline
  let newOrderline = [];
  for (let i = 0; i < req.body.orderlines.length; i++) {
    await Cart.findByIdAndRemove(req.body.orderlines[i].cartID);

    await Product.findByIdAndUpdate(
      req.body.orderlines[i].productID,
      { quantities: req.body.orderlines[i].quantities },
      { new: true }
    );

    const orderlines = await Orderline.create({
      orderID: newOrder._id,
      image: req.body.orderlines[i].image,
      productID: req.body.orderlines[i].productID,
      productName: req.body.orderlines[i].productName,
      productType: req.body.orderlines[i].productType,
      quantity: req.body.orderlines[i].quantity,
      price: req.body.orderlines[i].price,
      reviewed: req.body.orderlines[i].reviewed,
    });

    newOrderline.push(orderlines);
  }

  // Create couponlogs
  let newCouponlogs = [];
  for (let i = 0; i < req.body.couponlogID.length; i++) {
    const newCouponlog = await Couponlog.create({
      userID: req.user._id,
      couponID: req.body.couponlogID[i],
      orderID: newOrder._id,
    });
    newCouponlogs.push(newCouponlog);
  }

  let retData = {
    order: newOrder,
    orderlines: newOrderline,
    couponlog: newCouponlogs,
  };

  return res.status(200).json(retData);
});

// @desc    Get All Orders
// @route   POST /api/orders/getAllOrders
// @access  Private
const getAllOrders = asyncHandler(async (req, res) => {
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access Denied");
  }

  const userID = req.user._id;
  const Orders = await Order.find({}).sort({
    createdAt: "desc",
  });

  let retData = [];
  for (let i = 0; i < Orders.length; i++) {
    const orderID = Orders[i]._id;
    const orderLine = await Orderline.find({ orderID: orderID });

    const temp = {
      _id: Orders[i]._id,
      userID: Orders[i].userID,
      shippingDiscount: Orders[i].shippingDiscount,
      orderDiscount: Orders[i].orderDiscount,
      shippingFee: Orders[i].shippingFee,
      totalPrice: Orders[i].totalPrice,
      paymentMethod: Orders[i].paymentMethod,
      orderStatus: Orders[i].orderStatus,
      statusDates: Orders[i].statusDates,
      createdAt: Orders[i].createdAt,
      updatedAt: Orders[i].updatedAt,
      orderLine,
    };
    retData.push(temp);
  }

  res.status(200).json(retData);
});

// @desc    Get User Orders
// @route   GET /api/orders/
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Access Denied");
  }

  const userID = req.user._id;
  const Orders = await Order.find({
    userID: userID,
  }).sort({
    createdAt: "desc",
  });

  let retData = [];
  for (let i = 0; i < Orders.length; i++) {
    const orderID = Orders[i]._id;
    const orderLine = await Orderline.find({ orderID: orderID });

    const temp = {
      _id: Orders[i]._id,
      userID: Orders[i].userID,
      shippingDiscount: Orders[i].shippingDiscount,
      orderDiscount: Orders[i].orderDiscount,
      shippingFee: Orders[i].shippingFee,
      totalPrice: Orders[i].totalPrice,
      paymentMethod: Orders[i].paymentMethod,
      orderStatus: Orders[i].orderStatus,
      statusDates: Orders[i].statusDates,
      createdAt: Orders[i].createdAt,
      orderLine,
    };
    retData.push(temp);
  }

  res.status(200).json(retData);
});

// @desc    Get One Order
// @route   GET /api/orders/getOneOrder/:id
// @access  Private
const getOneOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Access Denied");
  }

  const orderOne = await Order.findById(req.params.id);

  if (!orderOne) {
    res.status(200).json({});
  }

  // console.log(orderOne)
  const orderLine = await Orderline.find({ orderID: req.params.id });

  const temp = {
    _id: orderOne._id,
    userID: orderOne.userID,
    shippingFee: orderOne.shipingFee,
    discount: orderOne.discount,
    totalPrice: orderOne.totalPrice,
    orderStatus: orderOne.orderStatus,
    statusDates: orderOne.statusDates,
    paymentMethod: orderOne.paymentMethod,
    createdAt: orderOne.createdAt,
    updatedAt: orderOne.createdAt,
    orderLine,
  };

  let retData = [];
  retData.push(temp);

  // console.log(retData);
  res.status(200).json(retData);
});

// @desc    Update Order
// @route   PUT /api/orders/updateOrder/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access Denied");
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: req.body.orderStatus,
      shippingFee: req.body.shippingFee,
      statusDates: req.body.statusDates,
    },
    {
      new: true,
    }
  );

  let retData = [];
  const temp = {
    _id: updatedOrder._id,
    userID: userID,
    shippingDiscount: updatedOrder.shippingDiscount,
    orderDiscount: updatedOrder.orderDiscount,
    shippingFee: updatedOrder.shippingFee,
    totalPrice: updatedOrder.totalPrice,
    paymentMethod: updatedOrder.paymentMethod,
    orderStatus: updatedOrder.orderStatus,
    statusDates: updatedOrder.statusDates,
    createdAt: updatedOrder.createdAt,
    updatedAt: updatedOrder.updatedAt,
    orderLine,
  };
  retData.push(temp);

  res.status(200).json(retData);
});

// @desc    Cancel Order
// @route   PUT /api/orders/updateOrder/:id
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Access Denied");
  }

  const orderOne = await Order.findById(req.body.orderID);

  if (!orderOne) {
    res.status(200).json({});
  }

  const orderLine = await Orderline.find({ orderID: req.body.orderID });

  // Update Order
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.body.orderID },
    {
      orderStatus: "Cancelled",
    },
    { new: true }
  );

  if (!updatedOrder) {
    res.status(400);
    throw new Error("Order not found");
  }

  // Update product quantities
  for (let i = 0; i < orderLine.length; i++) {
    let product = await Product.findById(orderLine[i].productID);
    let typeIndex = product.types.indexOf(orderLine[i].productType);
    let updatedQuantity = product.quantities;
    updatedQuantity[typeIndex] =
      updatedQuantity[typeIndex] + orderLine[i].quantity;
    let updatedProduct = await Product.findByIdAndUpdate(
      orderLine[i].productID,
      {
        quantities: updatedQuantity,
      },
      { new: true }
    );
  }

  // Re-get products for state
  const userID = req.user._id;
  const Orders = await Order.find({
    userID: userID,
  }).sort({
    createdAt: "desc",
  });

  let retData = [];
  for (let i = 0; i < Orders.length; i++) {
    let orderID = Orders[i]._id;
    // console.log(orderID);
    let orderLine = await Orderline.find({ orderID: orderID });
    let temp = {
      _id: Orders[i]._id,
      userID: Orders[i].userID,
      shippingFee: Orders[i].shipingFee,
      orderDiscount: Orders[i].orderDiscount,
      shippingFee: Orders[i].shippingFee,
      totalPrice: Orders[i].totalPrice,
      paymentMethod: Orders[i].paymentMethod,
      orderStatus: Orders[i].orderStatus,
      statusDates: Orders[i].statusDates,
      orderLine,
    };
    retData.push(temp);
  }

  res.status(200).json(retData);
});

// @desc    Delete Order
// @route   DELETE /api/orders/deleteOrder/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access Denied");
  }

  const order = await Order.findById(req.params.id);

  // Check for Order
  if (!order) {
    res.status(400);
    throw new Error("Order not found");
  }

  await order.remove();
  await Orderline.deleteMany({ orderID: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  setOrder,
  getAllOrders,
  getUserOrders,
  getOneOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
};
