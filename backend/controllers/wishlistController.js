const asyncHandler = require("express-async-handler");

const Wishlist = require("../models/wishlistModel");

// @desc    Get Wishlists
// @route   GET /api/Wishlists
// @access  Private
const getWishlists = asyncHandler(async (req, res) => {
  const wishlists = await Wishlist.find({ userID: req.user._id });

  res.status(200).json(wishlists);
});

// @desc    Set Wishlist
// @route   POST /api/Wishlists
// @access  Private
const setWishlist = asyncHandler(async (req, res) => {
  const { productID, productType } = req.body;
  const wishlistExists = await Wishlist.findOne({ productID, productType });

  if (!wishlistExists) {
    const wishlist = await Wishlist.create({
      userID: req.user._id,
      productID: req.body.productID,
      productType: req.body.productType,
    });

    res.status(200).json(wishlist);
  }

  res.status(200).json(wishlistExists);
});

// @desc    Delete Wishlist
// @route   DELETE /api/Wishlists/:id
// @access  Private
const deleteWishlist = asyncHandler(async (req, res) => {});

module.exports = {
  getWishlists,
  setWishlist,
  deleteWishlist,
};
