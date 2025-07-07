const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).json({ msg: "Product created", product });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
