const express = require("express");
const {
  createIngredient,
  getIngredientById,
  getAllIngredients,
  updateIngredient,
} = require("../controllers/ingredientControllers");

const ingredientRouter = express.Router();

ingredientRouter.post("/", createIngredient);
ingredientRouter.get("/:id", getIngredientById);
ingredientRouter.get("/", getAllIngredients);
ingredientRouter.patch("/:id", updateIngredient);

module.exports = { ingredientRouter };
