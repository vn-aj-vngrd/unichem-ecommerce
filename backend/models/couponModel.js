const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "Coupon Code is required"],
    },
    description: {
      type: Number,
      required: [true, "Descriptions is required"],
    },
    discount: {
      type: Number,
      required: [true, "Percent Off is required"],
    },
    requiredAmount: {
      type: Number,
      required: [true, "Required Total is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry Date is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
