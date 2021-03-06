const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Coupon = require("../models/couponModel");
const Couponlog = require("../models/couponlogModel");
const moment = require("moment");

// @desc    Get Coupons
// @route   GET /api/coupons
// @access  Private
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({
    createdAt: "desc",
  });

  res.status(200).json(coupons);
});

// @desc    Validate Coupon
// @route   POST /api/coupons/validateCoupon
// @access  Private
const validateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ couponCode: req.body.couponCode });
  if (!coupon) {
    res.status(400);
    throw new Error("Coupon code is not valid");
  }

  const couponCount = await Couponlog.find({
    couponID: coupon._id,
  }).count();

  const existingCoupon = await Couponlog.find({
    couponID: coupon._id,
    userID: req.user._id,
  }).count();

  const currentDate = moment();
  const startDate = moment(coupon.startDate);
  const expiryDate = moment(coupon.expiryDate);

  if (startDate > currentDate) {
    // return res.status(200).json("notFound");
    res.status(400);
    throw new Error("Coupon is not valid");
  }

  if (currentDate >= expiryDate) {
    // return res.status(200).json("expired");
    res.status(400);
    throw new Error("Coupon has been expired");
  }

  if (coupon.requiredAmount > req.body.subtotal) {
    // return res.status(200).json("requiredAmountError");
    res.status(400);
    throw new Error("Required amount not met");
  }

  if (existingCoupon > 0) {
    // return res.status(200).json("existingCoupon");
    res.status(400);
    throw new Error("Coupon was already used");
  }

  if (couponCount > coupon.limit) {
    // return res.status(200).json("limitError");
    res.status(400);
    throw new Error("Coupon limit exceeded");
  }

  res.status(200).json(coupon);
});

// @desc    Set Coupon
// @route   POST /api/coupons
// @access  Private
const setCoupon = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if user is not an admin
  if (req.user.userType !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  const existingCoupon = await Coupon.findOne({
    couponCode: req.body.couponCode,
  });

  if (existingCoupon) {
    res.status(400);
    throw new Error("Coupon Code already exists.");
  }

  // If Coupon does not exist then create.
  const coupon = await Coupon.create({
    couponCode: req.body.couponCode,
    couponType: req.body.couponType,
    description: req.body.description,
    discount: req.body.discount,
    limit: req.body.limit,
    requiredAmount: req.body.requiredAmount,
    startDate: req.body.startDate,
    expiryDate: req.body.expiryDate,
  });

  res.status(200).json(coupon);
});

// @desc    Update Coupon
// @route   PUT /api/coupons/
// @access  Private
const updateCoupon = asyncHandler(async (req, res) => {
  let coupon = await Coupon.findById(req.body._id);

  // Check for Coupon
  if (!coupon) {
    res.status(400);
    throw new Error("Coupon not found");
  }

  // Check for user and admin privilege
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access is denied.");
  }

  // Update Coupon
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    {
      _id: req.body._id,
    },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCoupon);
});

// @desc    Delete Coupon
// @route   DELETE /api/coupons/:id
// @access  Private
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  // Check for Coupon
  if (!coupon) {
    res.status(400);
    throw new Error("Coupon not found");
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
  await coupon.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Delete All Coupon
// @route   DELETE /api/coupons/deleteAll
// @access  Private
const deleteAllCoupon = asyncHandler(async (req, res) => {
  const Coupon = await Coupon.find();

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  for (let i = 0; i < Coupon.length; i++) {
    await Coupon[i].remove();
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCoupons,
  validateCoupon,
  setCoupon,
  updateCoupon,
  deleteCoupon,
  deleteAllCoupon,
};
