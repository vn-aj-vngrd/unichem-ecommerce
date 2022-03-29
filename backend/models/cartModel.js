const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
