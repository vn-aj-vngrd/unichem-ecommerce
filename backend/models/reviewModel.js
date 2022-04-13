const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    review: {
      type: String,
      required: [true, "Review is required."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
    },
    brand: {
      type: String,
      required: [true, "Brand is required."],
    },
    images: {
      type: Array,
      required: [true, "Product image is required"],
    },
    productName: {
      type: String,
      required: [true, "Product name is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
