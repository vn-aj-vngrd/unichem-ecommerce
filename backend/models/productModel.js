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
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    specifications: {
      type: Array,
      required: [true, "Product Specifications is required"],
    },
    image: {
      type: String,
      required: [true, "Product Image is required"],
    },
    quantities: {
      type: Array,
      required: [true, "Product Quantity is required"],
    },
    price: {
      type: Array,
      required: [true, "Product Price is required"],
    },
    featured: {
      type: Boolean,
      defualt: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
