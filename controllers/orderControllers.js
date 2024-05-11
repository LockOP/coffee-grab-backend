const Order = require("../models/orderModel");

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body); // Create a new order using the request body
    res.status(201).json({ order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean(); // Find order by ID
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean(); // Retrieve all orders
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to update an existing order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean(); // Find and update order
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

module.exports = { createOrder, getOrderById, getAllOrders, updateOrder };
