const Product = require("../models/product");

// CREATE - POST /products
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, imageUrl, stock, category } = req.body;

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

// READ ALL + SEARCH - GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
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

// READ ONE - GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE - PUT /products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Update failed" });
  }
};

// DELETE - DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};