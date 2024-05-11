const express = require("express");
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
} = require("../controllers/orderControllers");

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.get("/", getAllOrders);
orderRouter.patch("/:id", updateOrder);

module.exports = { orderRouter };
