const mongoose = require("mongoose");

const promoSchema = mongoose.Schema(
  {
    promoName: {
      type: String,
      required: [true, "Promo Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    cloudinaryID: {
      type: String,
      required: [true, "Cloudinary ID is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promo", promoSchema);
