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
    shippingDate: req.body.order.shippingDate,
    receivedDate: req.body.order.receivedDate,
    orderDiscount: req.body.order.orderDiscount,
    shippingDiscount: req.body.order.shippingDiscount,
    shippingFee: req.body.order.shippingFee,
    totalPrice: req.body.order.totalPrice,
    orderStatus: req.body.order.orderStatus,
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
    let orderID = Orders[i]._id;
    // console.log(orderID);
    let orderLine = await Orderline.find({ orderID: orderID });
    let temp = {
      _id: Orders[i]._id,
      userID: userID,
      shippingDiscount: Orders[i].shippingDiscount,
      orderDiscount: Orders[i].orderDiscount,
      shippingFee: Orders[i].shippingFee,
      totalPrice: Orders[i].totalPrice,
      paymentMethod: Orders[i].paymentMethod,
      orderStatus: Orders[i].orderStatus,
      shippingDate: Orders[i].shippingDate,
      receivedDate: Orders[i].receivedDate,
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
    let orderID = Orders[i]._id;
    // console.log(orderID);
    let orderLine = await Orderline.find({ orderID: orderID });
    let temp = {
      _id: Orders[i]._id,
      userID: userID,
      orderDiscount: Orders[i].orderDiscount,
      shippingDiscount: Orders[i].shippingDiscount,
      shippingFee: Orders[i].shippingFee,
      totalPrice: Orders[i].totalPrice,
      paymentMethod: Orders[i].paymentMethod,
      orderStatus: Orders[i].orderStatus,
      shippingDate: Orders[i].shippingDate,
      receivedDate: Orders[i].receivedDate,
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

  const logs = [
    // Awaiting Payment
    {
      date: orderOne.statusDates[0],
      label: "Awaiting Payment",
      desc: "You have completed the checkout process, but payment has yet to be confirmed. Authorize only transactions that are not yet captured have this status.",
    },
    // Awaiting Fulfillment
    {
      date: orderOne.statusDates[1],
      label: "Awaiting Fulfillment",
      desc: "You have completed the checkout process and payment has been confirmed.",
    },
    {
      date: orderOne.statusDates[2],
      label: "Arrived at Sort Center",
      desc: "Your package has arrived at the sortation center and being prepared for shipment.",
    },
    // Shipped
    {
      date: orderOne.statusDates[3],
      label: "Departed from Sort Center",
      desc: "Your package has departed the sortation center.",
    },
    {
      date: orderOne.statusDates[4],
      label: "Arrived at Logistics Hub",
      desc: "Your package has arrived at the local hub in your area.",
    },
    {
      date: orderOne.statusDates[5],
      label: "Departed from Logistics Hub",
      desc: "Your package has departed the logistics hub and will be out for delivery soon.",
    },
    {
      date: orderOne.statusDates[6],
      label: "Out for Delivery",
      desc: "LEX PH will attempt to deliver your parcel today! Please keep your lines open so our courier can contact you. If you are not available, please have an authorized representative to receive on your behalf. Prepare the exact amount for COD orders.",
    },
    // Awaiting Pickup
    {
      date: orderOne.statusDates[7],
      label: "Awaiting Pickup",
      desc: "Your order has been packaged and is awaiting customer pickup from a seller-specified location.",
    },
    // Delivered / Completed
    {
      date: orderOne.statusDates[8],
      label: "Delivered",
      desc: "Order has been shipped/picked up, and receipt is confirmed; client has paid for their digital product, and their file(s) are available for download.",
    },
  ];

  const temp = {
    _id: orderOne._id,
    userID: orderOne.userID,
    shippingFee: orderOne.shipingFee,
    shippingDate: orderOne.shippingDate,
    receivedDate: orderOne.receivedDate,
    discount: orderOne.discount,
    totalPrice: orderOne.totalPrice,
    orderStatus: orderOne.orderStatus,
    paymentMethod: orderOne.paymentMethod,
    createdAt: orderOne.createdAt,
    updatedAt: orderOne.createdAt,
    orderLine,
    statusDates: logs,
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
  if (!req.user) {
    res.status(401);
    throw new Error("Access Denied");
  }

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
      userID: userID,
      shippingFee: Orders[i].shipingFee,
      receivedDate: Orders[i].receivedDate,
      shippingDate: Orders[i].shippingDate,
      orderDiscount: Orders[i].orderDiscount,
      shippingFee: Orders[i].shippingFee,
      totalPrice: Orders[i].totalPrice,
      paymentMethod: Orders[i].paymentMethod,
      orderStatus: Orders[i].orderStatus,
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
  if (!req.user) {
    res.status(401);
    throw new Error("Access Denied");
  }

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
  setOrder,
  getAllOrders,
  getUserOrders,
  getOneOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
};
