exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    console.log("Incoming order request:");
    console.log("Items:", items);
    console.log("Total Amount:", totalAmount);
    console.log("User ID:", req.user);

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No items to order" });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });

    console.log("Order created:", order);

    res.status(201).json({ msg: "Order placed", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
