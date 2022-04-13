const mongoose = require("mongoose");

const couponlogsSchema = mongoose.Schema(
  {
    couponID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Coupon",
    },
    OrderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Couponlog", couponlogsSchema);
