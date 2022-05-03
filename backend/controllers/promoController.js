const asyncHandler = require("express-async-handler");

const Promo = require("../models/promoModel");

// @desc    Get all promos
// @route   GET /api/promos
// @access  Public
const getPromos = asyncHandler(async (req, res) => {
  const promos = await Promo.find().sort({
    createdAt: "desc",
  });

  res.status(200).json(promos);
});

// @desc    Set a promo
// @route   POST /api/promos
// @access  Private
const setPromo = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

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

  console.log(req.body);
  console.log("precreate");
  const promo = await Promo.create({
    promoName: req.body.promoName,
    description: req.body.description,
    image: "https://images.unsplash.com/photo-1577387196112-579d95312c6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: req.body.startDate,
    expiryDate: req.body.expiryDate,
  });

  console.log("test");
  console.log(promo);
  res.status(200).json(promo);
});

const updatePromo = asyncHandler(async (req, res) => {
  console.log(req.body);
  const promo = await Promo.findById(req.body._id);

  if (!promo) {
    res.status(400);
    throw new Error("Promo not found");
  }

  // Check for user and admin privilege
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedPromo = await Promo.findByIdAndUpdate(
    {
      _id: req.body._id,
    },
    req.body,
    { new: true }
  );

  console.log(updatedPromo);
  res.status(200).json(updatedPromo);
});

// @desc    Delete a promo
// @route   DELETE /api/promos
// @access  Private
const deletePromo = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.params.id);

  if (!promo) {
    res.status(400);
    throw new Error("Promo not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check for user and admin privilege
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await promo.remove();
  res.status(200).json({ _id: req.params.id });
});

module.exports = {
  getPromos,
  setPromo,
  updatePromo,
  deletePromo,
};
