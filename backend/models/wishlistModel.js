const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {
    userWish: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    productType: {
      type: Number,
      required: [true, "Product Type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wishlist", wishlistSchema);
