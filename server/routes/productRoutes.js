const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");

// optionally use auth middleware for admin-only creation
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct); // create product
router.get("/", getProducts); // get all
router.get("/:id", getProductById); // get one

module.exports = router;
