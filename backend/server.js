require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth"); // ถ้ามี auth

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/products", productRoutes); // GET /products, POST /products
app.use("/api", authRoutes);         

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));