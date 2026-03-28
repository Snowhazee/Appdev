const Order = require("../models/order");

// 1. Create Order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Get Order By ID (เพิ่มอันนี้เข้าไป!)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Update Order Status (เพิ่มอันนี้เข้าไป!)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// สังเกตตรงนี้: ชื่อต้องตรงกับข้างบนทั้งหมด
module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};