const Product = require("../models/productModel");

// Controller function to create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); // Create a new product using the request body
    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean(); // Find product by ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean(); // Retrieve all products
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to update an existing product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean(); // Find and update product
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
};
