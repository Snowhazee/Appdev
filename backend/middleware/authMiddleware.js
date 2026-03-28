const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose"); // เพิ่มอันนี้เข้ามาครับ

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // ใช้ decoded.id ที่เรา .toString() มาจากหน้า Login
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        // ถ้ายังหาไม่เจอ ให้ลองหาด้วย _id โดยตรง (เผื่อเคส Object)
        req.user = await User.findOne({ _id: decoded.id }).select("-password");
      }

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found in DB" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalid" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};

module.exports = { protect, admin };