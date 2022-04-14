const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "Coupon Code is required"],
    },
    couponType: {
      type: String,
      required: [true, "Coupon Type is required"],
    },
    description: {
      type: String,
      required: [true, "Descriptions is required"],
    },
    discount: {
      type: Number,
      required: [true, "Percent Off is required"],
    },
    limit: {
      type: Number,
      required: [true, "Limit is required"],
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
