const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const protect = require("../middleware/authMiddleware");
const {getOrders } = require("../controllers/orderController");
router.post("/", protect, async (req, res) => {
  const { items, totalAmount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ msg: "No items in order" });
  }

  try {
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });

    res.status(201).json({ msg: "Order placed", order });
    console.log(order);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ msg: "Order creation failed" });
  }
});
router.get("/", protect, getOrders);
module.exports = router;
