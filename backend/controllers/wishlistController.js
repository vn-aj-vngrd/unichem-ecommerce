const asyncHandler = require("express-async-handler");

const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

// @desc    Get Wishlists
// @route   GET /api/Wishlists
// @access  Private
const getWishlists = asyncHandler(async (req, res) => {
  let wishlists = await Wishlist.find({ userID: req.user._id });

  let retData = [];
  for (let i = 0; i < wishlists.length; i++) {
    const product = await Product.findById(wishlists[i].productID);
    let temp = { ...wishlists[i], product };
    retData.push(temp);
  }

  res.status(200).json(retData);
});

// @desc    Set Wishlist
// @route   POST /api/Wishlists
// @access  Private
const setWishlist = asyncHandler(async (req, res) => {
  const { productID, productType } = req.body;
  const existingWishlist = await Wishlist.findOne({ productID, productType });

  if (!existingWishlist) {
    const wishlist = await Wishlist.create({
      userID: req.user._id,
      productID: req.body.productID,
      productType: req.body.productType,
    });

    res.status(200).json(wishlist);
  }

  res.status(200).json(existingWishlist);
});

// @desc    Delete Wishlist
// @route   DELETE /api/Wishlists/:id
// @access  Private
const deleteWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);

  if (!wishlist) {
    res.status(400);
    throw new Error("Wishlist not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the wishlist user
  if (wishlist.userID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await wishlist.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getWishlists,
  setWishlist,
  deleteWishlist,
};
