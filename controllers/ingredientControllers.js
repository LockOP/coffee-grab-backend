const Ingredient = require("../models/ingredientModel");

// Controller function to create a new ingredient
const createIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body); // Create a new ingredient using the request body
    res.status(201).json({ ingredient });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get a single ingredient by ID
const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id); // Find ingredient by ID
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.status(200).json({ ingredient });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get all ingredients
const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find(); // Retrieve all ingredients
    res.status(200).json({ ingredients });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to update an existing ingredient
const updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Find and update ingredient
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.status(200).json({ ingredient });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

module.exports = {
  createIngredient,
  getIngredientById,
  getAllIngredients,
  updateIngredient,
};
