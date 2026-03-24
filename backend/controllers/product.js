const Product = require("../models/product");

// POST /products → เพิ่มสินค้า
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      imageUrl,
      stock,
      category
    } = req.body;

    if (!title || !price || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      imageUrl,
      stock,
      category
    });

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /products → ดึงสินค้าทั้งหมด
exports.getAllProducts = async (req, res) => {
  try {
    const { search } = req.query; // รับ query string ?search=iphone
    let filter = {};

    if (search) {
      // search ทั้ง title และ category แบบไม่สนตัวพิมพ์
      filter = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }

    const products = await Product.find(filter);
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};