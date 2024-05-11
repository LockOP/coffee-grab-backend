const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
} = require("../controllers/productControllers");

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/", getAllProducts);
productRouter.patch("/:id", updateProduct);

module.exports = { productRouter };
