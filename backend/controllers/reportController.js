const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const moment = require("moment");

// @desc    GET Dashboard Report
// @route   GET /api/reports/getDashboardReport
// @access  Private
const getDashboardReport = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access Denied");
  }

  const yearlySales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lt: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  console.log(yearlySales);

  res.status(200).json({ yearlySales: yearlySales[0].value });
});

module.exports = {
  getDashboardReport,
};
