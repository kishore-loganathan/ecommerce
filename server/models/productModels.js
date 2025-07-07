const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
    },
    description: {
      type: String,
      required: [true, "Please add product description"],
    },
    price: {
      type: Number,
      required: [true, "Please add product price"],
    },
    category: {
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

module.exports = mongoose.model("Product", productSchema);
