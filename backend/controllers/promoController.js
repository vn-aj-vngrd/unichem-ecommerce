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
  const promo = await Promo.create({
    promoName: req.body.promoName,
    description: req.body.description,
    image: req.body.image,
    startDate: req.body.startDate,
    expiryDate: req.body.endDate,
  });

  res.status(200).json(promo);
});

// @desc    Update a promo
// @route   PUT /api/promos
// @access  Private
const updatePromo = asyncHandler(async (req, res) => {
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
    throw new Error("Access is denied.");
  }

  const updatedPromo = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

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
    throw new Error("Access is denied.");
  }

  await promo.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPromos,
  setPromo,
  updatePromo,
  deletePromo,
};
