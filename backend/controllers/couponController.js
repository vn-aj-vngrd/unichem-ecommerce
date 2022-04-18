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
    return res.status(200).json("notFound");
  }

  const couponCount = await Couponlog.find({
    couponID: coupon._id,
  }).count();

  const existingCoupon = await Couponlog.find({
    couponID: coupon._id,
    userID: req.user._id,
  }).count();

  const currentDate = moment();
  const expiryDate = moment(coupon.expiryDate);

  if (currentDate > expiryDate) {
    return res.status(200).json("expired");
  }

  if (coupon.requiredAmount > req.body.subtotal) {
    return res.status(200).json("requiredAmountError");
  }

  if (existingCoupon > 0) {
    return res.status(200).json("existingCoupon");
  }

  if (couponCount > coupon.limit) {
    return res.status(200).json("limitError");
  }

  res.status(200).json(coupon);
});

// @desc    Set Coupon
// @route   POST /api/coupons
// @access  Private
const setCoupon = asyncHandler(async (req, res) => {
  const {
    couponCode,
    couponType,
    description,
    maxUse,
    percentOff,
    requiredTotal,
    expiryDate,
  } = req.body;

  const existingCoupon = await Coupon.findOne({
    couponCode,
  });

  if (existingCoupon) {
    res.status(400);
    throw new Error("Product quantity exceeds maximum quantity");
  }

  // If Coupon does not exist then create.
  const newCoupon = await Coupon.create({
    couponCode,
    couponType,
    description,
    maxUse,
    percentOff,
    requiredTotal,
    expiryDate,
  });

  res.status(200).json(newCoupon);
});

// @desc    Update Coupon
// @route   PUT /api/coupons/
// @access  Private
const updateCoupon = asyncHandler(async (req, res) => {
  const _id = req.body.id;
  let existingCoupon = await Coupon.findById(_id);

  // Check for Coupon
  if (!existingCoupon) {
    res.status(400);
    throw new Error("Coupon not found");
  }

  // Check for user
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access is denied.");
  }

  // Update Coupon
  const updatedCoupon = await Coupon.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

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

  // Make sure the logged in user matches the Coupon
  if (coupon.userID.toString() !== req.user.id) {
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
  const Coupon = await Coupon.find({ userID: req.params.id });

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
