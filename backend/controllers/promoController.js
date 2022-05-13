const asyncHandler = require("express-async-handler");
const fs = require("fs");

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
  // // Check for user
  // if (!req.user) {
  //   fs.unlinkSync(req.file.path.path);
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  // // Check if user is not an admin
  // if (req.user.userType !== "admin") {
  //   fs.unlinkSync(req.file.path.path);
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  // if (!req.file.path) {
  //   fs.unlinkSync(req.file.path.path);
  //   res.status(401);
  //   throw new Error("There was a problem uploading the image");
  // }
  let tempImage;
  if (req.file) {
    let removeImagePath = user.image;
    const destination = "frontend\\public";

    if (removeImagePath) {
      fs.unlinkSync(destination + removeImagePath);
    }

    tempImage = req.file.path.slice(destination.length);
  }

  const promo = await Promo.create({
    promoName: req.body.promoName,
    description: req.body.description,
    image: tempImage,
    startDate: req.body.startDate,
    expiryDate: req.body.expiryDate,
  });

  res.status(200).json(promo);
});

const updatePromo = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.body._id);
  if (!promo) {
    fs.unlinkSync(req.file.path.path);
    res.status(400);
    throw new Error("Promo not found");
  }

  // Check for user
  if (!req.user) {
    fs.unlinkSync(req.file.path.path);
    res.status(401);
    throw new Error("User not found");
  }

  // Check for user and admin privilege
  if (!req.user && req.user.userType !== "admin") {
    fs.unlinkSync(req.file.path.path);
    res.status(401);
    throw new Error("User not authorized.");
  }

  let tempImage;

  if (req.file) {
    let removeImagePath = promo.image;
    const destination = "frontend\\public";
    if (removeImagePath) {
      fs.unlinkSync(destination + removeImagePath);
    }
    tempImage = req.file.path.slice(destination.length);
  } else {
    tempImage = promo.image;
  }

  const updatedPromo = await Promo.findByIdAndUpdate(
    {
      _id: req.body._id,
    },
    {
      promoName: req.body.promoName,
      description: req.body.description,
      image: tempImage,
      startDate: req.body.startDate,
      expiryDate: req.body.expiryDate,
    },
    { new: true }
  );

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

  const destination = "frontend\\public";
  if (promo.image !== "") {
    fs.unlinkSync(destination + promo.image);
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
