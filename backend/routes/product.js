const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post("/", productController.createProduct);         // CREATE
router.get("/", productController.getAllProducts);         // READ ALL + SEARCH
router.get("/:id", productController.getProductById);      // READ ONE
router.put("/:id", productController.updateProduct);      // UPDATE
router.delete("/:id", productController.deleteProduct);   // DELETE

module.exports = router;