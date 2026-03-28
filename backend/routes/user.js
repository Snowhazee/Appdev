const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/user"); // เช็คว่าใน models ชื่อ user.js หรือ User.js

// Route สำหรับดึง Profile ตัวเอง
router.get("/profile", protect, async (req, res) => {
  try {
    // req.user ได้มาจาก middleware 'protect'
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;