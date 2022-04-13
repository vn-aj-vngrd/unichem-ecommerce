const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Orderline = require("../models/orderlineModel");
const Couponlog = require("../models/CouponlogModel");
const Cart = require("../models/cartModel");

// @desc    Get Orders by user
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
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
      userID: userID,
      shippingFee: Orders[i].shipingFee,
      shippingDate: Orders[i].shippingDate,
      receivedDate: Orders[i].receivedDate,
      totalPrice: Orders[i].totalPrice,
      orderStatus: Orders[i].orderStatus,
      paymentMethod: Orders[i].paymentMethod,
      orderLine,
    };
    retData.push(temp);
  }

  // console.log(retData);

  res.status(200).json(retData);
});

// @desc    Set Order
// @route   POST /api/orders
// @access  Private
const setOrder = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Create Order
  const newOrder = await Order.create({
    userID: req.user._id,
    shippingDate: req.body.order.shippingDate,
    receivedDate: req.body.order.receivedDate,
    discount: req.body.order.discount,
    shippingFee: req.body.order.shippingFee,
    totalPrice: req.body.order.totalPrice,
    orderStatus: req.body.order.orderStatus,
    paymentMethod: req.body.order.paymentMethod,
  });

  // Create Orderline
  let newOrderline = [];
  for (let i = 0; i < req.body.orderline.length; i++) {
    const deleteCart = await Cart.findById(req.body.orderline[i].cartID);
    await deleteCart.remove();

    const orderline = await Orderline.create({
      orderID: newOrder._id,
      image: req.body.orderline[i].image,
      productID: req.body.orderline[i].productID,
      productName: req.body.orderline[i].productName,
      productType: req.body.orderline[i].productType,
      quantity: req.body.orderline[i].quantity,
      price: req.body.orderline[i].price,
      reviewed: req.body.orderline[i].reviewed,
    });

    newOrderline.push(orderline);
  }

  // Create couponlogID
  let newCouponlog;
  if (req.body.couponlogID) {
    newCouponlog = await Couponlog.create({
      userID: req.user._id,
      couponID: req.body.couponlogID,
      orderID: newOrder._id,
    });
  }

  let retData = {
    order: newOrder,
    orderline: newOrderline,
    couponlog: newCouponlog,
  };

  return res.status(200).json(retData);
});

// @desc    Update Order
// @route   PUT /api/orders/:id
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
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // Check for Order
  if (!order) {
    res.status(400);
    throw new Error("Order not found");
  }

  // Make sure the logged in user matches the Order user
  if (order.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // CHECK IF DATE IS PAST 30

  await order.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrders,
  setOrder,
  updateOrder,
  deleteOrder,
};
