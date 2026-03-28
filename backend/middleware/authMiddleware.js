const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      // 1. เช็คว่าแกะ Token ออกมาได้อะไร
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded); 

      // 2. เช็คว่าหา User เจอไหม
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        console.log("❌ User not found in DB with ID:", decoded.id);
        return res.status(401).json({ message: "User no longer exists" });
      }

      console.log("✅ User found:", req.user.name);
      next();
    } catch (error) {
      console.error("🔥 JWT Error:", error.message);
      return res.status(401).json({ message: "Not authorized" });
    }
  }
  // ... ส่วนที่เหลือเหมือนเดิม
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};

module.exports = { protect, admin };