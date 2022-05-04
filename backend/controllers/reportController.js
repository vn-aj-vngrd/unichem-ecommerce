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
    // {
    //   $match: {
    //     createdAt: {
    //       $gte: moment().startOf("week").toDate(),
    //       $lte: moment().endOf("week").toDate(),
    //     },
    //   },
    // },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        createdAtWeek: { $week: "$createdAt" },
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
      $sort: { year: 1, month: 1, week: 1 },
    },
  ]);

  const monthMode = await Order.aggregate([
    // {
    //   $match: {
    //     createdAt: {
    //       $gte: moment().startOf("year").toDate(),
    //       $lte: moment().endOf("year").toDate(),
    //     },
    //   },
    // },
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
      $sort: { year: 1, month: 1 },
    },
  ]);

  const yearMode = await Order.aggregate([
    // {
    //   $match: {
    //     createdAt: {
    //       $gte: moment().startOf("year").toDate(),
    //       $lte: moment().endOf("year").toDate(),
    //     },
    //   },
    // },
    {
      $project: {
        formattedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        createdAtYear: { $year: "$createdAt" },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: "$createdAtYear",
        year: { $first: "$createdAtYear" },
        sales: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { year: 1 },
    },
  ]);

  res.status(200).json({
    yearlySales: yearlySales.length > 0 ? yearlySales[0].value : 0,
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
