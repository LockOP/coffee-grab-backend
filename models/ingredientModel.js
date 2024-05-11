const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    image: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("ingredient", ingredientSchema);
