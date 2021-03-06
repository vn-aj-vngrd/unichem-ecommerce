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
      required: [true, "Product Category is required"],
    },
    types: {
      type: Array,
      required: [true, "Product Type is required"],
    },
    specifications: {
      type: Array,
      required: [true, "Product Specifications is required"],
    },
    quantities: {
      type: Array,
      required: [true, "Product Quantity is required"],
    },
    prices: {
      type: Array,
      required: [true, "Product Price is required"],
    },
    salePercent: {
      type: Number,
    },
    isSale: {
      type: Boolean,
      defualt: false,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    images: {
      type: Array,
      required: [true, "Product Image is required"],
    },
    cloudinaryIDs: {
      type: Array,
      required: [true, "Cloudinary ID is required"],
    },
    minStock: {
      type: Array,
      required: [true, "Low Level is required"],
    },
    featured: {
      type: Boolean,
      defualt: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
