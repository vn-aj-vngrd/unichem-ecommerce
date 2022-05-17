const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Coupon = require("../models/couponModel");
const Promo = require("../models/promoModel");
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
  // Today Data
  const todaySales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  const todayUsers = await User.aggregate([
    {
      $match: {
        userType: "customer",
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const todayOrders = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const todayProducts = await Product.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const todayPromos = await Promo.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const todayCoupons = await Coupon.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const todayData = {
    todaySales: todaySales.length > 0 ? todaySales[0].value : 0,
    todayOrders: todayOrders.length > 0 ? todayOrders[0].value : 0,
    todayUsers: todayUsers.length > 0 ? todayUsers[0].value : 0,
    todayProducts: todayProducts.length > 0 ? todayProducts[0].value : 0,
    todayPromos: todayPromos.length > 0 ? todayPromos[0].value : 0,
    todayCoupons: todayCoupons.length > 0 ? todayCoupons[0].value : 0,
  };

  // Weekly Data
  const weeklySales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  const weeklyUsers = await User.aggregate([
    {
      $match: {
        userType: "customer",
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const weeklyOrders = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const weeklyProducts = await Product.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const weeklyPromos = await Promo.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const weeklyCoupons = await Coupon.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("week").toDate(),
          $lte: moment().endOf("week").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const weeklyData = {
    weeklySales: weeklySales.length > 0 ? weeklySales[0].value : 0,
    weeklyOrders: weeklyOrders.length > 0 ? weeklyOrders[0].value : 0,
    weeklyUsers: weeklyUsers.length > 0 ? weeklyUsers[0].value : 0,
    weeklyProducts: weeklyProducts.length > 0 ? weeklyProducts[0].value : 0,
    weeklyPromos: weeklyPromos.length > 0 ? weeklyPromos[0].value : 0,
    weeklyCoupons: weeklyCoupons.length > 0 ? weeklyCoupons[0].value : 0,
  };

  // Monthly Data
  const monthlySales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  const monthlyUsers = await User.aggregate([
    {
      $match: {
        userType: "customer",
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const monthlyOrders = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const monthlyProducts = await Product.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const monthlyPromos = await Promo.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const monthlyCoupons = await Coupon.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const monthlyData = {
    monthlySales: monthlySales.length > 0 ? monthlySales[0].value : 0,
    monthlyOrders: monthlyOrders.length > 0 ? monthlyOrders[0].value : 0,
    monthlyUsers: monthlyUsers.length > 0 ? monthlyUsers[0].value : 0,
    monthlyProducts: monthlyProducts.length > 0 ? monthlyProducts[0].value : 0,
    monthlyPromos: monthlyPromos.length > 0 ? monthlyPromos[0].value : 0,
    monthlyCoupons: monthlyCoupons.length > 0 ? monthlyCoupons[0].value : 0,
  };

  // Yearly Data
  const yearlySales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  const yearlyUsers = await User.aggregate([
    {
      $match: {
        userType: "customer",
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const yearlyOrders = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const yearlyProducts = await Product.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const yearlyPromos = await Promo.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const yearlyCoupons = await Coupon.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("year").toDate(),
          $lte: moment().endOf("year").toDate(),
        },
      },
    },
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const yearlyData = {
    yearlySales: yearlySales.length > 0 ? yearlySales[0].value : 0,
    yearlyOrders: yearlyOrders.length > 0 ? yearlyOrders[0].value : 0,
    yearlyUsers: yearlyUsers.length > 0 ? yearlyUsers[0].value : 0,
    yearlyProducts: yearlyProducts.length > 0 ? yearlyProducts[0].value : 0,
    yearlyPromos: yearlyPromos.length > 0 ? yearlyPromos[0].value : 0,
    yearlyCoupons: yearlyCoupons.length > 0 ? yearlyCoupons[0].value : 0,
  };

  // Total Data
  const totalSales = await Order.aggregate([
    { $group: { _id: null, value: { $sum: "$totalPrice" } } },
  ]);

  const totalUsers = await User.aggregate([
    {
      $match: { userType: "customer" },
    },
    {
      $group: { _id: null, value: { $count: {} } },
    },
  ]);

  const totalOrders = await Order.aggregate([
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const totalProducts = await Product.aggregate([
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const totalPromos = await Promo.aggregate([
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const totalCoupons = await Coupon.aggregate([
    { $group: { _id: null, value: { $count: {} } } },
  ]);

  const totalData = {
    totalSales: totalSales.length > 0 ? totalSales[0].value : 0,
    totalOrders: totalOrders.length > 0 ? totalOrders[0].value : 0,
    totalUsers: totalUsers.length > 0 ? totalUsers[0].value : 0,
    totalProducts: totalProducts.length > 0 ? totalProducts[0].value : 0,
    totalPromos: totalPromos.length > 0 ? totalPromos[0].value : 0,
    totalCoupons: totalCoupons.length > 0 ? totalCoupons[0].value : 0,
  };

  // Modes
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

  const totalMode = await Order.aggregate([
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
    todayData,
    weeklyData,
    monthlyData,
    yearlyData,
    totalData,
    todayMode,
    weekMode,
    monthMode,
    yearMode,
    totalMode,
  });
});

module.exports = {
  getDashboardReport,
};
