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

  const monthlySales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lt: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  const monthlyOrders = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lt: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const userCount = await User.find({ userType: "customer" }).count();
  const productCount = await Product.find().count();

  const todayMode = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        createdAtHour: { $hour: "$createdAt" },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$createdAtHour",
        hour: { $first: "$createdAtHour" },
        sales: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const weekMode = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        createdAtDay: { $dayOfWeek: "$createdAt" },
        createdAtWeek: { $week: "$createdAt" },
        createdAtMonth: { $month: "$createdAt" },
        createdAtYear: { $year: "$createdAt" },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$createdAtDay",
        day: { $first: "$createdAtDay" },
        week: { $first: "$createdAtWeek" },
        month: { $first: "$createdAtMonth" },
        year: { $first: "$createdAtYear" },
        sales: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { day: 1, week: 1, month: 1, year: 1 },
    },
  ]);

  const monthMode = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        createdAtWeek: {
          $floor: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] },
        },
        createdAtMonth: { $month: "$createdAt" },
        createdAtYear: { $year: "$createdAt" },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$createdAtWeek",
        week: { $first: "$createdAtWeek" },
        month: { $first: "$createdAtMonth" },
        year: { $first: "$createdAtYear" },
        sales: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { week: 1, month: 1, year: 1 },
    },
  ]);

  const yearMode = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        createdAtMonth: { $month: "$createdAt" },
        createdAtYear: { $year: "$createdAt" },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$createdAtMonth",
        month: { $first: "$createdAtMonth" },
        year: { $first: "$createdAtYear" },
        sales: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { month: 1, year: 1 },
    },
  ]);

  res.status(200).json({
    monthlySales: monthlySales.length > 0 ? monthlySales[0].value : 0,
    monthlyOrders: monthlyOrders.length > 0 ? monthlyOrders[0].value : 0,
    userCount,
    productCount,
    todayMode,
    weekMode,
    monthMode,
    yearMode,
  });
});

module.exports = {
  getDashboardReport,
};
