const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// POST /products → เพิ่มสินค้า
router.post("/", productController.createProduct);

// GET /products → ดูสินค้าทั้งหมด
router.get("/", productController.getAllProducts);

module.exports = router;