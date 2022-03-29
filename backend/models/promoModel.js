const mongoose = require("mongoose");

const promoSchema = mongoose.Schema(
  {
    promoName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promo", promoSchema);
