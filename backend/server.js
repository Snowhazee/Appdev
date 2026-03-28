require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order"); // เพิ่ม order
const userRoutes = require("./routes/user"); // ถูกต้องตามชื่อไฟล์ในรูป
const app = express();

// Middleware
app.use(cors()); // frontend
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);