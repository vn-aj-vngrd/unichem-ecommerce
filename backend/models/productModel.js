const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name is required"],
    },
    brand: {
      type: String,
      required: [true, "Product Brand is required"],
    },
    category: {
      type: String,
      required: [true, "Product Brand is required"],
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    type: {
      type: Array,
      required: [true, "Product Type is required"],
    },
    image: {
      type: String,
      required: [true, "Product Image is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
