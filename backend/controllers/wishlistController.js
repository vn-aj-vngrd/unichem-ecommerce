const asyncHandler = require("express-async-handler");

const Wishlist = require("../models/wishlistModel");
const User = require("../models/userModel");

// @desc    Get Wishlists
// @route   GET /api/Wishlists
// @access  Private
const getWishlists = asyncHandler(async (req, res) => {
  const wishlists = await Wishlist.find({ user: req.user.id });

  res.status(200).json(wishlists);
});

// @desc    Set Wishlist
// @route   POST /api/Wishlists
// @access  Private
const setWishlist = asyncHandler(async (req, res) => {
  const WishlistExists = await Wishlist.findOneAndUpdate({
    productID: req.body.productID,
    productType: req.body.productType,
  });

  if (!WishlistExists) {
    const wishlist = await Wishlist.create({
      userID: req.user.id,
      productID: req.body.productID,
      productType: req.body.productType,
    });

    return res.status(200).json(wishlist);
  }

  return res.status(200).json(WishlistExists);
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
