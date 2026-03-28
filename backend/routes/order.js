const express = require("express");
const router = express.Router();
// 1. นำเข้า protect มาจาก middleware
const { protect } = require("../middleware/authMiddleware"); 

const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order");

// 2. ใส่ protect ลงไปหน้า function ต่างๆ แบบนี้:
router.post("/", protect, createOrder); // <--- ด่านตรวจอยู่ตรงนี้!
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;