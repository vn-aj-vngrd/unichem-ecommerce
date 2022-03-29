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
    subject: {
      type: String,
      required: [true, "Subject is required."],
    },
    review: {
      type: String,
      required: [true, "Review is required."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
